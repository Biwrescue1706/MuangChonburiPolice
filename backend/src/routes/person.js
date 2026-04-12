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

function formatCitizenId(id) {
  if (!id) return null;

  const clean = String(id).replace(/\D/g, "");

  if (clean.length !== 13) return id;

  return `${clean[0]} - ${clean.slice(1, 5)} - ${clean.slice(5, 10)} - ${clean.slice(10, 12)} - ${clean.slice(12)}`;
}

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

/* ================= CREATE ================= */
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName) {
      return res.status(400).json({ error: "กรอกชื่อ-นามสกุล" });
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
            `${data.prefix ? data.prefix : ""}${data.firstName} ${data.lastName}`,

          citizenId: formatCitizenId(data.citizenId),
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

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET ALL + SEARCH + FILTER
router.get("/getall", async (req, res) => {
  try {
    const {
      search,
      firstName,
      lastName,
      status,
      page = 1,
      limit = 20,
    } = req.query;

    let where = {}; // ✅ ต้องมีอันนี้ก่อน

    // 🔍 filter status
    if (status !== undefined && status !== "") {
      const statusNum = Number(status);

      if (!isNaN(statusNum)) {
        where.status = statusNum;

        // ❗ ถ้าไม่ใช่ status 3 → ซ่อนของลบ
        if (statusNum !== 3) {
          where.deleteAt = null;
        }
      }
    }

    // 🔍 ค้นรวม
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { fullName: { contains: search, mode: "insensitive" } },
        { citizenId: { contains: search } },
      ];
    }

    // 🔍 ค้นแยกชื่อ
    if (firstName) {
      where.firstName = {
        contains: firstName,
        mode: "insensitive",
      };
    }

    // 🔍 ค้นแยกนามสกุล
    if (lastName) {
      where.lastName = {
        contains: lastName,
        mode: "insensitive",
      };
    }

    // 🔍 filter status
    if (status !== undefined && status !== "") {
      const statusNum = Number(status);
      if (!isNaN(statusNum)) {
        where.status = statusNum;
      }
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [persons, total] = await Promise.all([
      prisma.person.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: "desc" },
      }),
      prisma.person.count({ where }),
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
        requestInfos: true,
        receipts: true,
      },
    });

    if (!person) {
      return res.status(404).json({ error: "ไม่พบข้อมูล" });
    }

    // 🔥 map ข้อมูลให้อยู่ในรูปที่ต้องการ
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

      nationality:
        person.nationalitySnapshot?.name || person.nationality,
      ethnicity:
        person.ethnicitySnapshot?.name || person.ethnicity,

      weight: person.weight,
      height: person.height,
      bodyType:
        person.bodyTypeSnapshot?.name || person.bodyType,
      skinColor:
        person.skinColorSnapshot?.name || person.skinColor,
      behavior: person.behavior,
      distinguishingMarks: person.distinguishingMarks,

      address: person.address,
      occupation: person.occupation,
      workplaceAddress: person.workplaceAddress,
      father: person.father,
      mother: person.mother,
      spouse: person.spouse,

      fingerprintDate: person.fingerprintDate,

      // 🔥 request info
      purpose: person.requestInfos?.[0]?.purpose || null,
      requestingAgency: person.requestInfos?.[0]?.requestingAgency || null,

      // 🔥 receipt
      receiptBookNo: person.receipts?.[0]?.receiptBookNo || null,
      receiptNo: person.receipts?.[0]?.receiptNo || null,
      receiptDate: person.receipts?.[0]?.receiptDate || null,
      money: person.receipts?.[0]?.money || 100,
      moneyText: person.receipts?.[0]?.moneyText || null,

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

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ดึงข้อมูลไม่สำเร็จ" });
  }
});

/* ================= UPDATE PERSON ================= */
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

      // 🔥 update person (ไม่ต้องใส่ org ตรงนี้)
      const person = await tx.person.update({
        where: { personId: req.params.id },
        data: {
          prefix: data.prefix ?? oldPerson.prefix,
          firstName: data.firstName ?? oldPerson.firstName,
          lastName: data.lastName ?? oldPerson.lastName,

          fullName:
            data.fullName ||
            `${data.prefix ?? oldPerson.prefix ? (data.prefix ?? oldPerson.prefix) + " " : ""}${data.firstName ?? oldPerson.firstName} ${data.lastName ?? oldPerson.lastName}`,

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

          weight: data.weight !== undefined ? Number(data.weight) : oldPerson.weight,
          height: data.height !== undefined ? Number(data.height) : oldPerson.height,

          bodyType: data.bodyType ?? oldPerson.bodyType,
          skinColor: data.skinColor ?? oldPerson.skinColor,
          behavior: data.behavior ?? oldPerson.behavior,
          distinguishingMarks: data.distinguishingMarks ?? oldPerson.distinguishingMarks,

          address: data.address ?? oldPerson.address,
          occupation: data.occupation ?? oldPerson.occupation,
          workplaceAddress: data.workplaceAddress ?? oldPerson.workplaceAddress,
          father: data.father ?? oldPerson.father,
          mother: data.mother ?? oldPerson.mother,
          spouse: data.spouse ?? oldPerson.spouse,

          fingerprintDate: data.fingerprintDate ?? oldPerson.fingerprintDate,

          purpose: data.purpose ?? oldPerson.purpose,
          requestingAgency: data.requestingAgency ?? oldPerson.requestingAgency,

          receiptBookNo: data.receiptBookNo ?? oldPerson.receiptBookNo,
          receiptNo: data.receiptNo ?? oldPerson.receiptNo,
          receiptDate: data.receiptDate ?? oldPerson.receiptDate,

          money: data.money !== undefined ? data.money : oldPerson.money,
          moneyText: data.moneyText ?? oldPerson.moneyText,

          statusUpdatedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // 🔥 sync organization (ตัวสำคัญสุด)
      if (org) {
        await syncOrganization(tx, person, org);
      }

      // 🔥 request info
      await tx.requestInfo.updateMany({
        where: { personId: person.personId },
        data: {
          purpose: person.purpose,
          requestingAgency: person.requestingAgency,
        },
      });

      // 🔥 receipt
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
router.patch("/bulk/status", async (req, res) => {
  try {
    const { personIds, status } = req.body;
    const statusNum = Number(status);

    if (![0, 1, 2, 3].includes(statusNum)) {
      return res.status(400).json({ error: "สถานะไม่ถูกต้อง" });
    }

    if (!Array.isArray(personIds) || personIds.length === 0) {
      return res.status(400).json({ error: "ไม่มีรายการบุคคล" });
    }

    const now = new Date();

    const result = await prisma.person.updateMany({
      where: {
        personId: { in: personIds },
      },
      data: {
        status: statusNum,
        statusUpdatedAt: now,
        updatedAt: now,

        deleteAt:
          statusNum === 3
            ? new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000)
            : null,

        returnDate:
          statusNum === 3 ? now : null,
      },
    });

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

    const statusNum = Number(req.body.status);

    if (![0, 1, 2, 3].includes(statusNum)) {
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
        status: statusNum, // ✅ แก้ตรงนี้
        statusUpdatedAt: new Date(),

        deleteAt:
          statusNum === 3 // ✅ แก้ตรงนี้
            ? new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
            : null,

        returnDate:
          statusNum === 3
            ? (person.returnDate ?? new Date())
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
