//src/routes/person.js
import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

/* ================= ORGANIZATION ================= */

// 🔥 ดึง MAIN จาก DB เท่านั้น
async function getOrganization(tx) {
  return await tx.organization.findFirst({
    where: { key: "MAIN" },
  });
}

/* ================= UTIL ================= */

function formatThaiFullDate(value) {
  if (!value) return null;

  const date = new Date(value);
  if (isNaN(date.getTime())) return null;

  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
    "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
    "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear() + 543;

  return `${day} ${month} ${year}`;
}

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

/* ================= BIRTH ================= */

function formatBirthFields(data) {
  let birthDate = null;

  if (data.birthDay && data.birthMonth && data.birthYear) {
    const monthsFull = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    const monthsShort = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.",
      "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.",
      "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];

    const day = String(data.birthDay).padStart(2, "0");
    const monthIndex = monthsFull.indexOf(data.birthMonth);
    const month = monthsShort[monthIndex] || null;
    const year = Number(data.birthYear);

    if (month !== null) {
      birthDate = `${day} ${month} ${year}`;
    }
  }

  return {
    birthDate,
    birthDay: data.birthDay ? String(data.birthDay).padStart(2, "0") : null,
    birthMonth: data.birthMonth,
    birthYear: data.birthYear,
  };
}

/* ================= CREATE ================= */
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName) {
      return res.status(400).json({ error: "กรอกชื่อ-นามสกุล" });
    }

    const existing = await prisma.person.findFirst({
      where: { citizenId: data.citizenId },
    });

    if (existing) {
      return res.status(400).json({ error: "เลขบัตรประชาชนซ้ำ" });
    }

    const result = await prisma.$transaction(async (tx) => {
      const org = await getOrganization(tx);
      if (!org) throw new Error("ไม่พบ organization MAIN");

      const person = await tx.person.create({
        data: {
          prefix: data.prefix,
          firstName: data.firstName,
          lastName: data.lastName,
          fullName:
            data.fullName ||
            [data.prefix, data.firstName, data.lastName].filter(Boolean).join(" "),

          citizenId: data.citizenId,
          ...formatBirthFields(data),

          nationality: data.nationality,
          ethnicity: data.ethnicity,

          weight: data.weight ? Number(data.weight) : null,
          height: data.height ? Number(data.height) : null,
          bodyType: data.bodyType ?? "สันทัด",
          skinColor: data.skinColor ?? "ดำแดง",
          behavior: data.behavior ?? "ปกติ",
          distinguishingMarks: data.distinguishingMarks ?? "-",

          address: data.address,
          occupation: data.occupation,
          workplaceAddress: data.workplaceAddress,
          father: data.father,
          mother: data.mother,
          spouse: data.spouse ?? "-",
          fingerprintDate:data.fingerprintDate,

          purpose: data.purpose,
          requestingAgency: data.requestingAgency,

          receiptBookNo: data.receiptBookNo,
          receiptNo: data.receiptNo,
          receiptDate:data.receiptDate,
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

      await createSnapshotIfChanged(tx, "nationalitySnapshot", "nationality", person.personId, person.nationality);
      await createSnapshotIfChanged(tx, "ethnicitySnapshot", "ethnicity", person.personId, person.ethnicity);
      await createSnapshotIfChanged(tx, "bodyTypeSnapshot", "bodyType", person.personId, person.bodyType);
      await createSnapshotIfChanged(tx, "skinColorSnapshot", "skinColor", person.personId, person.skinColor);

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

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET ALL + SEARCH + FILTER
router.get("/getall", async (req, res) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;

    const where = {
      deleteAt: null,
      AND: [],
    };

    if (search) {
      where.AND.push({
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { fullName: { contains: search, mode: "insensitive" } },
          { citizenId: { contains: search } },
        ],
      });
    }

    if (status !== undefined && status !== "") {
      const statusNum = Number(status);

      if (!isNaN(statusNum)) {
        where.AND.push({ status: statusNum });
      }
    }

    const skip = (Number(page) - 1) * Number(limit);

    const finalWhere = where.AND.length
      ? where
      : { deleteAt: null };

    const [persons, total] = await Promise.all([
      prisma.person.findMany({
        where: finalWhere,
        skip,
        take: Number(limit),
        orderBy: { createdAt: "desc" },
      }),
      prisma.person.count({
        where: finalWhere,
      }),
    ]);

    res.json({
      success: true,
      data: persons,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ดึงข้อมูลไม่สำเร็จ" });
  }
});

/* ================= GET BY ID ================= */
router.get("/:id", async (req, res) => {
  try {
    const person = await prisma.person.findUnique({
      where: { personId: req.params.id },
      include: {
        files: true,
        nationalitySnapshot: true,
        ethnicitySnapshot: true,
        bodyTypeSnapshot: true,
        skinColorSnapshot: true,
        requestInfos: true,
        receipts: true,
      },
    });

    if (!person) {
  return res.status(404).json({ error: "ไม่พบข้อมูล" });
}

    res.json({ success: true, data: person });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ดึงข้อมูลไม่สำเร็จ" });
  }
});

// UPDATE PERSON
router.put("/:id", async (req, res) => {
  try {
    const data = req.body;

    const result = await prisma.$transaction(async (tx) => {
      const oldPerson = await tx.person.findUnique({
        where: { personId: req.params.id },
      });

      if (!oldPerson) {
  throw new Error("ไม่พบข้อมูล");
}

      const org = await getOrganization(tx);

      const person = await tx.person.update({
        where: { personId: req.params.id },
        data: {
          prefix: data.prefix,
          firstName: data.firstName,
          lastName: data.lastName,
          fullName:
            data.fullName ||
            [data.prefix, data.firstName, data.lastName].filter(Boolean).join(" "),

          ...formatBirthFields(data),

          nationality: data.nationality,
          ethnicity: data.ethnicity,

          weight: data.weight ? Number(data.weight) : null,
          height: data.height ? Number(data.height) : null,
          bodyType: data.bodyType,
          skinColor: data.skinColor,
          behavior: data.behavior,
          distinguishingMarks: data.distinguishingMarks,

          address: data.address,
          occupation: data.occupation,
          workplaceAddress: data.workplaceAddress,
          father: data.father,
          mother: data.mother,
          spouse: data.spouse,

          fingerprintDate: data.fingerprintDate,

          purpose: data.purpose,
          requestingAgency: data.requestingAgency,

          receiptBookNo: data.receiptBookNo,
          receiptNo: data.receiptNo,
          receiptDate:data.receiptDate,
          money: data.money ?? oldPerson.money,
          moneyText: data.moneyText,

          organizationId: org?.organizationId || null,
          organizationName: org?.organizationName || null,
          fullNameOrg: org?.fullName || null,
          rank: org?.rank || null,
          position: org?.position || null,
          fullNameWithRank: org?.fullNameWithRank || null,

          statusUpdatedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      await createSnapshotIfChanged(tx, "nationalitySnapshot", "nationality", person.personId, person.nationality);
      await createSnapshotIfChanged(tx, "ethnicitySnapshot", "ethnicity", person.personId, person.ethnicity);
      await createSnapshotIfChanged(tx, "bodyTypeSnapshot", "bodyType", person.personId, person.bodyType);
      await createSnapshotIfChanged(tx, "skinColorSnapshot", "skinColor", person.personId, person.skinColor);

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
          receiptDate: data.receiptDate,
          money: person.money,
          moneyText: person.moneyText,
          organizationId: person.organizationId,
          organizationName: person.organizationName,
          fullNameOrg: person.fullNameOrg,
          rank: person.rank,
          position: person.position,
          fullNameWithRank: person.fullNameWithRank,
        },
      });

      return person;
    });

    res.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    if (err.message === "ไม่พบข้อมูล") {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    await prisma.$transaction([
      prisma.receipt.deleteMany({
        where: { personId },
      }),
      prisma.requestInfo.deleteMany({
        where: { personId },
      }),
      prisma.nationalitySnapshot.deleteMany({
        where: { personId },
      }),
      prisma.ethnicitySnapshot.deleteMany({
        where: { personId },
      }),
      prisma.bodyTypeSnapshot.deleteMany({
        where: { personId },
      }),
      prisma.skinColorSnapshot.deleteMany({
        where: { personId },
      }),
      prisma.person.delete({
        where: { personId },
      }),
    ]);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ลบไม่สำเร็จ" });
  }
});
// UPDATE STATUS (Bulk)
router.patch("/bulk/status", async (req, res) => {
  try {
    const { personIds, status } = req.body;

    if (![0, 1, 2, 3].includes(status)) {
      return res.status(400).json({ error: "สถานะไม่ถูกต้อง" });
    }

    if (!Array.isArray(personIds) || personIds.length === 0) {
      return res.status(400).json({ error: "ไม่มีรายการบุคคล" });
    }

    const result = await prisma.person.updateMany({
  where: {
    personId: { in: personIds },
  },
  data: {
    status,
    statusUpdatedAt: new Date(),
    updatedAt: new Date(),
    deleteAt:
      status === 3
        ? new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
        : null,
  },
});

// ✅ เพิ่มตรงนี้
if (result.count === 0) {
  return res.status(400).json({ error: "ไม่มีข้อมูลที่อัปเดตได้" });
}

    res.json({ success: true, updated: result.count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "อัปเดตหลายรายการไม่สำเร็จ" });
  }
});

// UPDATE STATUS (SINGLE)
router.patch("/:id/status", async (req, res) => {
  try {
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);

    const { status } = req.body;

    if (![0, 1, 2, 3].includes(status)) {
      return res.status(400).json({ error: "สถานะไม่ถูกต้อง" });
    }

    const person = await prisma.person.findUnique({
      where: { personId: req.params.id },
    });

    if (!person) {
  return res.status(404).json({ error: "ไม่พบข้อมูล" });
}

    await prisma.person.update({
      where: { personId: req.params.id },
      data: {
        status,
        statusUpdatedAt: new Date(),

        deleteAt:
          status === 3
            ? new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
            : null,

        updatedAt: new Date(),
      },
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "เปลี่ยนสถานะไม่สำเร็จ" });
  }
});

/* ================= AUTO DELETE ================= */

// setInterval(async () => {
//   await prisma.person.deleteMany({
//     where: {
//       deleteAt: {
//         lte: new Date(),
//       },
//     },
//   });
// }, 60000);

export default router;