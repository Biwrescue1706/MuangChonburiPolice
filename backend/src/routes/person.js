
import express from "express";
import neonPrisma from "../neon.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const VALID_STATUSES = [0, 1, 2, 3, 4];
const DEFAULT_MONEY = 100;
const DELETED_RETENTION_DAYS = 45;
const MAX_BULK_ITEMS = 200;

const THAI_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
  "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
  "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

const THAI_MONTHS_SHORT = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.",
  "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.",
  "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
];

// Apply authentication to every route in this router.
router.use(authMiddleware);

// Get MAIN organization.
async function getOrganization(tx) {
  return tx.organization.findFirst({
    where: { key: "MAIN" },
  });
}

// Convert optional values to strings safely.
function optionalString(value) {
  if (value === undefined || value === null) return null;
  const result = String(value).trim();
  return result === "" ? null : result;
}

// Format a Thai full date.
function formatThaiFullDate(value) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const day = String(date.getDate()).padStart(2, "0");
  const month = THAI_MONTHS[date.getMonth()];
  const year = date.getFullYear() + 543;

  return `${day} ${month} ${year}`;
}

// Format birth fields.
function formatBirthFields(data) {
  const birthDay =
    !data.birthDay || data.birthDay === "-"
      ? "-"
      : String(data.birthDay).padStart(2, "0");

  const birthMonth =
    !data.birthMonth || data.birthMonth === "-"
      ? "-"
      : String(data.birthMonth);

  const birthYear =
    !data.birthYear || data.birthYear === "-"
      ? "-"
      : String(data.birthYear);

  let birthDate = "-";

  if (
    birthDay === "-" &&
    birthMonth === "-" &&
    birthYear === "-"
  ) {
    birthDate = "-";
  } else if (birthMonth !== "-") {
    const monthIndex = THAI_MONTHS.indexOf(birthMonth);
    const monthShort =
      monthIndex >= 0
        ? THAI_MONTHS_SHORT[monthIndex]
        : birthMonth;

    birthDate = `${birthDay} ${monthShort} ${birthYear}`;
  } else {
    birthDate = `${birthDay} - ${birthYear}`;
  }

  return {
    birthDate,
    birthDay,
    birthMonth,
    birthYear,
  };
}

// Format citizen ID without changing invalid-length input.
function formatCitizenId(id) {
  if (id === undefined || id === null || id === "") {
    return null;
  }

  const original = String(id).trim();
  const clean = original.replace(/\D/g, "");

  if (clean.length !== 13) {
    return original;
  }

  return `${clean[0]} - ${clean.slice(1, 5)} - ${clean.slice(5, 10)} - ${clean.slice(10, 12)} - ${clean.slice(12)}`;
}

// Validate optional numeric values.
function parseOptionalNumber(value, fieldName) {
  if (value === undefined) {
    return { provided: false, value: undefined };
  }

  if (value === null || value === "") {
    return { provided: true, value: null };
  }

  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    throw new Error(`${fieldName}ไม่ถูกต้อง`);
  }

  return { provided: true, value: number };
}

// Sync organization information to person and receipts.
async function syncOrganization(tx, personId, org) {
  await tx.person.update({
    where: { personId },
    data: {
      organizationId: org.organizationId,
      organizationName: org.organizationName,
      fullNameOrg: org.fullName,
      rank: org.rank,
      position: org.position,
      fullNameWithRank: org.fullNameWithRank,
    },
  });

  await tx.receipt.updateMany({
    where: { personId },
    data: {
      organizationId: org.organizationId,
      organizationName: org.organizationName,
      fullNameOrg: org.fullName,
      rank: org.rank,
      position: org.position,
      fullNameWithRank: org.fullNameWithRank,
    },
  });
}

// Create a snapshot only when the value changes.
async function createSnapshotIfChanged(
  tx,
  model,
  field,
  personId,
  value
) {
  const last = await tx[model].findFirst({
    where: { personId },
    orderBy: { createdAt: "desc" },
  });

  if (String(last?.[field] ?? "") !== String(value ?? "")) {
    await tx[model].create({
      data: { personId, [field]: value },
    });
  }
}

// Standard API error handler.
function sendError(res, err, fallbackMessage) {
  if (err.message === "ไม่พบข้อมูล") {
    return res.status(404).json({ error: err.message });
  }

  if (
    err.message === "ไม่พบ organization MAIN"
  ) {
    return res.status(500).json({
      error: "ไม่พบข้อมูลหน่วยงานหลัก กรุณาติดต่อผู้ดูแลระบบ",
    });
  }

  if (
    err.message.endsWith("ไม่ถูกต้อง") ||
    err.message === "กรอกชื่อ-นามสกุล"
  ) {
    return res.status(400).json({ error: err.message });
  }

  if (err.code === "P2002") {
    return res.status(409).json({
      error: "ข้อมูลซ้ำกับรายการที่มีอยู่",
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      error: "ไม่พบข้อมูล",
    });
  }

  console.error("[person route]", err.code || err.name || "Error");

  return res.status(500).json({
    error: fallbackMessage,
  });
}

// Create person.
router.post("/", async (req, res) => {
  try {
    const data = req.body ?? {};

    const firstName = optionalString(data.firstName);
    const lastName = optionalString(data.lastName);

    if (!firstName || !lastName) {
      return res.status(400).json({
        error: "กรอกชื่อ-นามสกุล",
      });
    }

    const weight = parseOptionalNumber(data.weight, "น้ำหนัก");
    const height = parseOptionalNumber(data.height, "ส่วนสูง");
    const money = parseOptionalNumber(data.money, "จำนวนเงิน");

    const result = await neonPrisma.$transaction(async (tx) => {
      const org = await getOrganization(tx);

      if (!org) {
        throw new Error("ไม่พบ organization MAIN");
      }

      const person = await tx.person.create({
        data: {
          prefix: optionalString(data.prefix),
          firstName,
          lastName,
          fullName:
            optionalString(data.fullName) ||
            `${data.prefix ? String(data.prefix).trim() : ""}${firstName} ${lastName}`,

          citizenId: formatCitizenId(data.citizenId),
          ...formatBirthFields(data),

          nationality: optionalString(data.nationality),
          ethnicity: optionalString(data.ethnicity),

          weight: weight.value ?? null,
          height: height.value ?? null,

          bodyType: data.bodyType ?? "สันทัด",
          skinColor: data.skinColor ?? "ดำแดง",
          behavior: data.behavior ?? "ปกติ",
          distinguishingMarks: data.distinguishingMarks ?? "-",
          priority: data.priority ?? 0,

          address: data.address,
          occupation: data.occupation,
          workplaceAddress: data.workplaceAddress,
          father: data.father,
          mother: data.mother,
          spouse: data.spouse ?? "-",

          fingerprintDate: data.fingerprintDate,
          purpose: data.purpose,
          requestingAgency: data.requestingAgency,

          receiptBookNo: data.receiptBookNo,
          receiptNo: data.receiptNo,
          receiptDate: data.receiptDate,

          money: money.value ?? DEFAULT_MONEY,
          moneyText: data.moneyText,

          organizationId: org.organizationId,
          organizationName: org.organizationName,
          fullNameOrg: org.fullName,
          rank: org.rank,
          position: org.position,
          fullNameWithRank: org.fullNameWithRank,

          status: 0,
          statusUpdatedAt: new Date(),
        },
      });

      await tx.requestInfo.create({
        data: {
          personId: person.personId,
          purpose: person.purpose,
          requestingAgency: person.requestingAgency,
        },
      });

      await tx.receipt.create({
        data: {
          personId: person.personId,
          prefix: person.prefix,
          firstName: person.firstName,
          lastName: person.lastName,
          fullName: person.fullName,

          organizationId: person.organizationId,
          organizationName: person.organizationName,
          fullNameOrg: person.fullNameOrg,
          rank: person.rank,
          position: person.position,
          fullNameWithRank: person.fullNameWithRank,

          receiptBookNo: person.receiptBookNo,
          receiptNo: person.receiptNo,
          receiptDate: person.receiptDate,
          money: person.money,
          moneyText: person.moneyText,
        },
      });

      return person;
    });

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return sendError(res, err, "เพิ่มข้อมูลไม่สำเร็จ");
  }
});

// Get all persons with search and filters.
router.get("/getall", async (req, res) => {
  try {
    const { search, firstName, lastName, status } = req.query;
    const where = {};

    if (status !== undefined && status !== "") {
      const statusNum = Number(status);

      if (!VALID_STATUSES.includes(statusNum)) {
        return res.status(400).json({
          error: "สถานะไม่ถูกต้อง",
        });
      }

      where.status = statusNum;

      if (statusNum !== 4) {
        where.deleteAt = null;
      }
    }

    if (search) {
      const searchText = String(search).trim().slice(0, 100);

      if (searchText) {
        where.OR = [
          {
            firstName: {
              contains: searchText,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: searchText,
              mode: "insensitive",
            },
          },
          {
            fullName: {
              contains: searchText,
              mode: "insensitive",
            },
          },
          {
            citizenId: {
              contains: searchText,
            },
          },
        ];
      }
    }

    if (firstName) {
      where.firstName = {
        contains: String(firstName).trim().slice(0, 100),
        mode: "insensitive",
      };
    }

    if (lastName) {
      where.lastName = {
        contains: String(lastName).trim().slice(0, 100),
        mode: "insensitive",
      };
    }

    const persons = await neonPrisma.person.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 500,
    });

    return res.json({
      success: true,
      data: persons,
      total: persons.length,
    });
  } catch (err) {
    return sendError(res, err, "ดึงข้อมูลไม่สำเร็จ");
  }
});

// Get person by ID.
router.get("/:id", async (req, res) => {
  try {
    const person = await neonPrisma.person.findUnique({
      where: { personId: req.params.id },
      include: {
        requestInfos: true,
        receipts: true,
      },
    });

    if (!person) {
      return res.status(404).json({
        error: "ไม่พบข้อมูล",
      });
    }

    const requestInfo = person.requestInfos?.[0] ?? null;
    const receipt = person.receipts?.[0] ?? null;

    const data = {
      prefix: person.prefix,
      firstName: person.firstName,
      lastName: person.lastName,
      fullName: person.fullName,
      citizenId: person.citizenId,

      birthDate: person.birthDate,
      birthDay: person.birthDay,
      birthMonth: person.birthMonth,
      birthYear: person.birthYear,

      nationality: person.nationality,
      ethnicity: person.ethnicity,

      weight: person.weight,
      height: person.height,
      bodyType: person.bodyType,
      skinColor: person.skinColor,
      behavior: person.behavior,
      distinguishingMarks: person.distinguishingMarks,

      address: person.address,
      occupation: person.occupation,
      workplaceAddress: person.workplaceAddress,
      father: person.father,
      mother: person.mother,
      spouse: person.spouse,

      fingerprintDate: person.fingerprintDate,

      purpose: requestInfo?.purpose ?? null,
      requestingAgency: requestInfo?.requestingAgency ?? null,

      receiptBookNo: receipt?.receiptBookNo ?? null,
      receiptNo: receipt?.receiptNo ?? null,
      receiptDate: receipt?.receiptDate ?? null,
      money: receipt?.money ?? DEFAULT_MONEY,
      moneyText: receipt?.moneyText ?? null,

      status: person.status,
      statusUpdatedAt: person.statusUpdatedAt,
      deleteAt: person.deleteAt,

      organizationId: person.organizationId,
      organizationName: person.organizationName,
      fullNameOrg: person.fullNameOrg,
      rank: person.rank,
      position: person.position,
      fullNameWithRank: person.fullNameWithRank,
    };

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    return sendError(res, err, "ดึงข้อมูลไม่สำเร็จ");
  }
});

// Update person.
router.put("/:id", async (req, res) => {
  try {
    const data = req.body ?? {};

    const result = await neonPrisma.$transaction(async (tx) => {
      const oldPerson = await tx.person.findUnique({
        where: { personId: req.params.id },
      });

      if (!oldPerson) {
        throw new Error("ไม่พบข้อมูล");
      }

      const org = await getOrganization(tx);

      const firstName = data.firstName ?? oldPerson.firstName;
      const lastName = data.lastName ?? oldPerson.lastName;
      const prefix = data.prefix ?? oldPerson.prefix;

      if (
        !String(firstName ?? "").trim() ||
        !String(lastName ?? "").trim()
      ) {
        throw new Error("กรอกชื่อ-นามสกุล");
      }

      const weight = parseOptionalNumber(data.weight, "น้ำหนัก");
      const height = parseOptionalNumber(data.height, "ส่วนสูง");
      const money = parseOptionalNumber(data.money, "จำนวนเงิน");

      const person = await tx.person.update({
        where: { personId: req.params.id },
        data: {
          prefix,
          firstName,
          lastName,
          fullName:
            optionalString(data.fullName) ||
            `${prefix ? String(prefix).trim() : ""}${firstName} ${lastName}`,

          citizenId:
            data.citizenId !== undefined
              ? formatCitizenId(data.citizenId)
              : oldPerson.citizenId,

          ...formatBirthFields({
            birthDay: data.birthDay ?? oldPerson.birthDay,
            birthMonth: data.birthMonth ?? oldPerson.birthMonth,
            birthYear: data.birthYear ?? oldPerson.birthYear,
          }),

          nationality: data.nationality ?? oldPerson.nationality,
          ethnicity: data.ethnicity ?? oldPerson.ethnicity,

          weight: weight.provided ? weight.value : oldPerson.weight,
          height: height.provided ? height.value : oldPerson.height,

          bodyType: data.bodyType ?? oldPerson.bodyType,
          skinColor: data.skinColor ?? oldPerson.skinColor,
          behavior: data.behavior ?? oldPerson.behavior,
          distinguishingMarks:
            data.distinguishingMarks ?? oldPerson.distinguishingMarks,

          priority: data.priority ?? oldPerson.priority,

          address: data.address ?? oldPerson.address,
          occupation: data.occupation ?? oldPerson.occupation,
          workplaceAddress:
            data.workplaceAddress ?? oldPerson.workplaceAddress,
          father: data.father ?? oldPerson.father,
          mother: data.mother ?? oldPerson.mother,
          spouse: data.spouse ?? oldPerson.spouse,

          fingerprintDate:
            data.fingerprintDate ?? oldPerson.fingerprintDate,

          purpose: data.purpose ?? oldPerson.purpose,
          requestingAgency:
            data.requestingAgency ?? oldPerson.requestingAgency,

          receiptBookNo: data.receiptBookNo ?? oldPerson.receiptBookNo,
          receiptNo: data.receiptNo ?? oldPerson.receiptNo,
          receiptDate: data.receiptDate ?? oldPerson.receiptDate,

          money: money.provided ? money.value : oldPerson.money,
          moneyText: data.moneyText ?? oldPerson.moneyText,

          updatedAt: new Date(),
        },
      });

      if (org) {
        await syncOrganization(tx, person.personId, org);
      }

      await tx.requestInfo.updateMany({
        where: { personId: person.personId },
        data: {
          purpose: person.purpose,
          requestingAgency: person.requestingAgency,
        },
      });

      await tx.receipt.updateMany({
        where: { personId: person.personId },
        data: {
          prefix: person.prefix,
          firstName: person.firstName,
          lastName: person.lastName,
          fullName: person.fullName,
          receiptBookNo: person.receiptBookNo,
          receiptNo: person.receiptNo,
          receiptDate: person.receiptDate,
          money: person.money,
          moneyText: person.moneyText,
        },
      });

      return person;
    });

    return res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    return sendError(res, err, "แก้ไขข้อมูลไม่สำเร็จ");
  }
});

// Delete person and related records.
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    await neonPrisma.$transaction(async (tx) => {
      const person = await tx.person.findUnique({
        where: { personId },
        select: { personId: true },
      });

      if (!person) {
        throw new Error("ไม่พบข้อมูล");
      }

      await tx.receipt.deleteMany({
        where: { personId },
      });

      await tx.requestInfo.deleteMany({
        where: { personId },
      });

      await tx.personStatusHistory.deleteMany({
        where: { personId },
      });

      await tx.person.delete({
        where: { personId },
      });
    });

    return res.json({ success: true });
  } catch (err) {
    return sendError(res, err, "ลบข้อมูลไม่สำเร็จ");
  }
});

// Bulk update status.
router.patch("/bulk/status", async (req, res) => {
  try {
    const { personIds, status } = req.body ?? {};
    const statusNum = Number(status);

    if (!VALID_STATUSES.includes(statusNum)) {
      return res.status(400).json({
        error: "สถานะไม่ถูกต้อง",
      });
    }

    if (
      !Array.isArray(personIds) ||
      personIds.length === 0 ||
      personIds.length > MAX_BULK_ITEMS ||
      personIds.some((id) => typeof id !== "string" || !id.trim())
    ) {
      return res.status(400).json({
        error: `รายการบุคคลต้องมี 1 ถึง ${MAX_BULK_ITEMS} รายการ`,
      });
    }

    const uniqueIds = [...new Set(personIds)];
    const now = new Date();
    const deleteAt =
      statusNum === 4
        ? new Date(
            now.getTime() +
              DELETED_RETENTION_DAYS * 24 * 60 * 60 * 1000
          )
        : null;

    const updated = await neonPrisma.$transaction(async (tx) => {
      const persons = await tx.person.findMany({
        where: { personId: { in: uniqueIds } },
        select: {
          personId: true,
          status: true,
        },
      });

      if (persons.length !== uniqueIds.length) {
        throw new Error("ไม่พบข้อมูล");
      }

      const changedPersons = persons.filter(
        (person) => person.status !== statusNum
      );

      await tx.person.updateMany({
        where: { personId: { in: uniqueIds } },
        data: {
          status: statusNum,
          statusUpdatedAt: now,
          updatedAt: now,
          deleteAt,
          ...(statusNum === 4
            ? {}
            : { returnDate: null }),
        },
      });

      if (changedPersons.length > 0) {
        await tx.personStatusHistory.createMany({
          data: changedPersons.map((person) => ({
            personId: person.personId,
            oldStatus: person.status,
            newStatus: statusNum,
          })),
        });
      }

      return persons.length;
    });

    return res.json({
      success: true,
      updated,
    });
  } catch (err) {
    return sendError(res, err, "อัปเดตหลายรายการไม่สำเร็จ");
  }
});

// Update status for one person.
router.patch("/:id/status", async (req, res) => {
  try {
    const statusNum = Number(req.body?.status);

    if (!VALID_STATUSES.includes(statusNum)) {
      return res.status(400).json({
        error: "สถานะไม่ถูกต้อง",
      });
    }

    await neonPrisma.$transaction(async (tx) => {
      const person = await tx.person.findUnique({
        where: { personId: req.params.id },
      });

      if (!person) {
        throw new Error("ไม่พบข้อมูล");
      }

      if (person.status === statusNum) {
        return;
      }

      const now = new Date();

      await tx.person.update({
        where: { personId: req.params.id },
        data: {
          status: statusNum,
          statusUpdatedAt: now,
          updatedAt: now,

          deleteAt:
            statusNum === 4
              ? new Date(
                  now.getTime() +
                    DELETED_RETENTION_DAYS * 24 * 60 * 60 * 1000
                )
              : null,

          returnDate:
            statusNum === 4
              ? person.returnDate ?? now
              : null,
        },
      });

      await tx.personStatusHistory.create({
        data: {
          personId: person.personId,
          oldStatus: person.status,
          newStatus: statusNum,
        },
      });
    });

    return res.json({ success: true });
  } catch (err) {
    return sendError(res, err, "เปลี่ยนสถานะไม่สำเร็จ");
  }
});

export default router;
