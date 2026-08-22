// src/routes/person.js
import express from "express";
import neonPrisma from "../neon.js";

const router = express.Router();

// Get MAIN organization
async function getOrganization(tx) {
  return await tx.organization.findFirst({
    where: { key: "MAIN" },
  });
}

// Format Thai full date
function formatThaiFullDate(value) {
  if (!value) return null;

  const date = new Date(value);
  if (isNaN(date.getTime())) return null;

  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
    "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
    "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear() + 543;

  return `${day} ${month} ${year}`;
}

// Create snapshot if changed
async function createSnapshotIfChanged(tx, model, field, personId, value) {
  const last = await tx[model].findFirst({
    where: { personId },
    orderBy: { createdAt: "desc" },
  });

  if (!last || String(last[field] ?? "") !== String(value ?? "")) {
    await tx[model].create({
      data: { personId, [field]: value },
    });
  }
}

// Format birth fields
function formatBirthFields(data) {
  const birthDay =
    !data.birthDay || data.birthDay === "-"
      ? "-"
      : String(data.birthDay).padStart(2, "0");

  const birthMonth =
    !data.birthMonth || data.birthMonth === "-"
      ? "-"
      : data.birthMonth;

  const birthYear =
    !data.birthYear || data.birthYear === "-"
      ? "-"
      : data.birthYear;

  const monthsFull = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
    "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
    "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ];

  const monthsShort = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.",
    "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.",
    "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
  ];

  let birthDate = "-";

  if (birthDay === "-" && birthMonth === "-" && birthYear === "-") {
    birthDate = "-";
  } else if (birthMonth !== "-") {
    const monthIndex = monthsFull.indexOf(birthMonth);
    const monthShort = monthsShort[monthIndex] || birthMonth;
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

// Format citizen ID
function formatCitizenId(id) {
  if (!id) return null;

  const clean = String(id).replace(/\D/g, "");
  if (clean.length !== 13) return id;

  return `${clean[0]} - ${clean.slice(1, 5)} - ${clean.slice(5, 10)} - ${clean.slice(10, 12)} - ${clean.slice(12)}`;
}

// Sync organization
async function syncOrganization(tx, person, org) {
  await tx.person.update({
    where: { personId: person.personId },
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
    where: { personId: person.personId },
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

// Create person
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName) {
      return res.status(400).json({
        error: "กรอกชื่อ-นามสกุล",
      });
    }

    const result = await neonPrisma.$transaction(async (tx) => {
      const org = await getOrganization(tx);

      if (!org) {
        throw new Error("ไม่พบ organization MAIN");
      }

      const person = await tx.person.create({
        data: {
          prefix: data.prefix,
          firstName: data.firstName,
          lastName: data.lastName,
          fullName:
            data.fullName ||
            `${data.prefix ? data.prefix : ""}${data.firstName} ${data.lastName}`,
          citizenId: formatCitizenId(data.citizenId),
          ...formatBirthFields(data),
          nationality: data.nationality,
          ethnicity: data.ethnicity,
          weight: data.weight !== undefined && data.weight !== null && data.weight !== ""
            ? Number(data.weight)
            : null,
          height: data.height !== undefined && data.height !== null && data.height !== ""
            ? Number(data.height)
            : null,
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
          money: data.money ?? 100,
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

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Get all + search + filter
router.get("/getall", async (req, res) => {
  try {
    const { search, firstName, lastName, status } = req.query;
    let where = {};

    // Filter status
    if (status !== undefined && status !== "") {
      const statusNum = Number(status);

      if (!isNaN(statusNum)) {
        where.status = statusNum;

        if (statusNum !== 4) {
          where.deleteAt = null;
        }
      }
    }

    // Search all
    if (search) {
      where.OR = [
        {
          firstName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          fullName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          citizenId: {
            contains: search,
          },
        },
      ];
    }

    // Search first name
    if (firstName) {
      where.firstName = {
        contains: firstName,
        mode: "insensitive",
      };
    }

    // Search last name
    if (lastName) {
      where.lastName = {
        contains: lastName,
        mode: "insensitive",
      };
    }

    const persons = await neonPrisma.person.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 500,
    });

    res.json({
      success: true,
      data: persons,
      total: persons.length,
    });
  } catch (err) {
    res.status(500).json({
      error: "ดึงข้อมูลไม่สำเร็จ",
    });
  }
});

// Get person by ID
router.get("/:id", async (req, res) => {
  try {
    const person = await neonPrisma.person.findUnique({
      where: {
        personId: req.params.id,
      },
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

      purpose: person.requestInfos?.[0]?.purpose || null,
      requestingAgency:
        person.requestInfos?.[0]?.requestingAgency || null,

      receiptBookNo:
        person.receipts?.[0]?.receiptBookNo || null,
      receiptNo:
        person.receipts?.[0]?.receiptNo || null,
      receiptDate:
        person.receipts?.[0]?.receiptDate || null,
      money:
        person.receipts?.[0]?.money ?? 100,
      moneyText:
        person.receipts?.[0]?.moneyText || null,

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

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      error: "ดึงข้อมูลไม่สำเร็จ",
    });
  }
});

// Update person
router.put("/:id", async (req, res) => {
  try {
    const data = req.body;

    const result = await neonPrisma.$transaction(async (tx) => {
      const oldPerson = await tx.person.findUnique({
        where: {
          personId: req.params.id,
        },
      });

      if (!oldPerson) {
        throw new Error("ไม่พบข้อมูล");
      }

      const org = await getOrganization(tx);

      const person = await tx.person.update({
        where: {
          personId: req.params.id,
        },
        data: {
          prefix: data.prefix ?? oldPerson.prefix,
          firstName: data.firstName ?? oldPerson.firstName,
          lastName: data.lastName ?? oldPerson.lastName,

          fullName:
            data.fullName ||
            `${data.prefix ?? oldPerson.prefix ? `${data.prefix ?? oldPerson.prefix}` : ""}${data.firstName ?? oldPerson.firstName} ${data.lastName ?? oldPerson.lastName}`,

          citizenId: data.citizenId
            ? formatCitizenId(data.citizenId)
            : oldPerson.citizenId,

          ...formatBirthFields({
            birthDay: data.birthDay ?? oldPerson.birthDay,
            birthMonth: data.birthMonth ?? oldPerson.birthMonth,
            birthYear: data.birthYear ?? oldPerson.birthYear,
          }),

          nationality: data.nationality ?? oldPerson.nationality,
          ethnicity: data.ethnicity ?? oldPerson.ethnicity,

          weight:
            data.weight !== undefined
              ? data.weight === ""
                ? null
                : Number(data.weight)
              : oldPerson.weight,

          height:
            data.height !== undefined
              ? data.height === ""
                ? null
                : Number(data.height)
              : oldPerson.height,

          bodyType: data.bodyType ?? oldPerson.bodyType,
          skinColor: data.skinColor ?? oldPerson.skinColor,
          behavior: data.behavior ?? oldPerson.behavior,
          distinguishingMarks:
            data.distinguishingMarks ??
            oldPerson.distinguishingMarks,

          status: data.status ?? oldPerson.status,
          priority: data.priority ?? oldPerson.priority,

          address: data.address ?? oldPerson.address,
          occupation: data.occupation ?? oldPerson.occupation,
          workplaceAddress:
            data.workplaceAddress ??
            oldPerson.workplaceAddress,
          father: data.father ?? oldPerson.father,
          mother: data.mother ?? oldPerson.mother,
          spouse: data.spouse ?? oldPerson.spouse,

          fingerprintDate:
            data.fingerprintDate ??
            oldPerson.fingerprintDate,

          purpose: data.purpose ?? oldPerson.purpose,
          requestingAgency:
            data.requestingAgency ??
            oldPerson.requestingAgency,

          receiptBookNo:
            data.receiptBookNo ??
            oldPerson.receiptBookNo,
          receiptNo:
            data.receiptNo ??
            oldPerson.receiptNo,
          receiptDate:
            data.receiptDate ??
            oldPerson.receiptDate,

          money:
            data.money !== undefined
              ? Number(data.money)
              : oldPerson.money,

          moneyText:
            data.moneyText ??
            oldPerson.moneyText,

          statusUpdatedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // Sync organization
      if (org) {
        await syncOrganization(tx, person, org);
      }

      // Update request info
      await tx.requestInfo.updateMany({
        where: {
          personId: person.personId,
        },
        data: {
          purpose: person.purpose,
          requestingAgency:
            person.requestingAgency,
        },
      });

      // Update receipt
      await tx.receipt.updateMany({
        where: {
          personId: person.personId,
        },
        data: {
          prefix: person.prefix,
          firstName: person.firstName,
          lastName: person.lastName,
          fullName: person.fullName,
          receiptBookNo:
            person.receiptBookNo,
          receiptNo:
            person.receiptNo,
          receiptDate:
            person.receiptDate,
          money: person.money,
          moneyText: person.moneyText,
        },
      });

      return person;
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    if (err.message === "ไม่พบข้อมูล") {
      return res.status(404).json({
        error: err.message,
      });
    }

    res.status(500).json({
      error: err.message,
    });
  }
});

// Delete person
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    await neonPrisma.$transaction([
      neonPrisma.receipt.deleteMany({
        where: { personId },
      }),

      neonPrisma.requestInfo.deleteMany({
        where: { personId },
      }),

      neonPrisma.person.delete({
        where: { personId },
      }),
    ]);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "ลบไม่สำเร็จ",
    });
  }
});

// Update status bulk
router.patch("/bulk/status", async (req, res) => {
  try {
    const { personIds, status } = req.body;
    const statusNum = Number(status);

    if (![0, 1, 2, 3, 4].includes(statusNum)) {
      return res.status(400).json({
        error: "สถานะไม่ถูกต้อง",
      });
    }

    if (!Array.isArray(personIds) || personIds.length === 0) {
      return res.status(400).json({
        error: "ไม่มีรายการบุคคล",
      });
    }

    const now = new Date();

    const persons = await neonPrisma.person.findMany({
      where: {
        personId: {
          in: personIds,
        },
      },
      select: {
        personId: true,
        status: true,
        returnDate: true,
      },
    });

    await neonPrisma.$transaction(async (tx) => {
      await tx.person.updateMany({
        where: {
          personId: {
            in: personIds,
          },
        },
        data: {
          status: statusNum,
          statusUpdatedAt: now,
          updatedAt: now,
          deleteAt:
            statusNum === 4
              ? new Date(
                now.getTime() +
                45 * 24 * 60 * 60 * 1000
              )
              : null,
        },
      });

      await tx.personStatusHistory.createMany({
        data: persons.map((person) => ({
          personId: person.personId,
          oldStatus: person.status,
          newStatus: statusNum,
        })),
      });
    });

    res.json({
      success: true,
      updated: persons.length,
    });
  } catch (err) {
    res.status(500).json({
      error:
        "อัปเดตหลายรายการไม่สำเร็จ",
    });
  }
});

// Update status single
router.patch("/:id/status", async (req, res) => {
  try {
    const statusNum = Number(req.body.status);

    if (![0, 1, 2, 3, 4].includes(statusNum)) {
      return res.status(400).json({
        error: "สถานะไม่ถูกต้อง",
      });
    }

    const person = await neonPrisma.person.findUnique({
      where: {
        personId: req.params.id,
      },
    });

    if (!person) {
      return res.status(404).json({
        error: "ไม่พบข้อมูล",
      });
    }

    await neonPrisma.$transaction(async (tx) => {
      await tx.person.update({
        where: {
          personId: req.params.id,
        },
        data: {
          status: statusNum,
          statusUpdatedAt: new Date(),
          updatedAt: new Date(),

          deleteAt:
            statusNum === 4
              ? new Date(
                Date.now() +
                45 * 24 * 60 * 60 * 1000
              )
              : null,

          returnDate:
            statusNum === 4
              ? person.returnDate ?? new Date()
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

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "เปลี่ยนสถานะไม่สำเร็จ",
    });
  }
});

export default router;