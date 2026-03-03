// src/routes/person.js
import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

// helper แปลงวันเกิดให้ปลอดภัย
function toStringOrNull(value) {
  if (value === undefined || value === null || value === "") return null;
  return String(value);
}

function formatBirthFields(data) {
  return {
    birthDate: toStringOrNull(data.birthDate),

    birthDay:
      data.birthDay !== undefined && data.birthDay !== null
        ? String(data.birthDay).padStart(2, "0")
        : null,

    birthMonth: toStringOrNull(data.birthMonth),
    birthYear: toStringOrNull(data.birthYear),
  };
}

// CREATE PERSON
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const existing = await prisma.person.findUnique({
      where: { citizenId: data.citizenId },
    });

    if (existing) {
      return res.status(400).json({ error: "เลขบัตรประชาชนซ้ำ" });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Create Person
      const person = await tx.person.create({
        data: {
          ...data,
          ...formatBirthFields(data),

          receiptBookNo: toStringOrNull(data.receiptBookNo),
          receiptNo: toStringOrNull(data.receiptNo),
          receiptDate: toStringOrNull(data.receiptDate),
          fingerprintDate: toStringOrNull(data.fingerprintDate),

          updatedAt: new Date(),
        },
      });

      // 2️⃣ Identity Snapshot
      await tx.identitySnapshot.create({
        data: {
          personId: person.personId,
          nationality: person.nationality,
          ethnicity: person.ethnicity,
        },
      });

      // 3️⃣ Appearance Snapshot
      await tx.appearanceSnapshot.create({
        data: {
          personId: person.personId,
          bodyType: person.bodyType,
          skinColor: person.skinColor,
        },
      });

      // 4️⃣ Request Info Snapshot
      await tx.requestInfo.create({
        data: {
          personId: person.personId,
          purpose: person.purpose,
          requestingAgency: person.requestingAgency,
          organizationId: data.organizationId || null,
          organizationName: data.organizationName || null,
        },
      });

      // 5️⃣ Receipt Snapshot (รองรับ model ใหม่)
      await tx.receipt.create({
        data: {
          personId: person.personId,

          organizationId: data.organizationId || null,
          organizationName: data.organizationName || null,
          fullName: data.fullName || null,
          rank: data.rank || null,
          position: data.position || null,

          receiptBookNo: person.receiptBookNo,
          receiptNo: person.receiptNo,
          receiptDate: toDateOrNull(data.receiptDate),

          money: person.money,
          moneyText: person.moneyText,
        },
      });

      return person;
    });

    res.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET ALL + SEARCH + FILTER
router.get("/getall", async (req, res) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;

    const where = { AND: [] };

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

    if (status !== undefined) {
      where.AND.push({ status: Number(status) });
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [persons, total] = await Promise.all([
      prisma.person.findMany({
        where: where.AND.length ? where : {},
        skip,
        take: Number(limit),
        orderBy: { createdAt: "desc" },
      }),
      prisma.person.count({
        where: where.AND.length ? where : {},
      }),
    ]);

    res.json({
      success: true,
      data: persons,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    res.status(500).json({ error: "ดึงข้อมูลไม่สำเร็จ" });
  }
});

// GET PERSON BY ID
router.get("/:id", async (req, res) => {
  try {
    const person = await prisma.person.findUnique({
      where: { personId: req.params.id },
      include: {
        files: true,
        identitySnapshots: true,
        appearanceSnapshots: true,
        requestInfos: true,
        receipts: true,
      },
    });

    if (!person) {
      return res.status(404).json({ error: "ไม่พบข้อมูล" });
    }

    res.json({ success: true, data: person });
  } catch {
    res.status(500).json({ error: "ดึงข้อมูลไม่สำเร็จ" });
  }
});

// ================= UPDATE PERSON =================
router.put("/:id", async (req, res) => {
  try {
    const data = req.body;

    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ อัปเดต Person ก่อน
      const person = await tx.person.update({
        where: { personId: req.params.id },
        data: {
          ...data,
          ...formatBirthFields(data),

          receiptBookNo: toStringOrNull(data.receiptBookNo),
          receiptNo: toStringOrNull(data.receiptNo),
          receiptDate: toStringOrNull(data.receiptDate),
          fingerprintDate: toStringOrNull(data.fingerprintDate),

          updatedAt: new Date(),
        },
      });

      // 5️⃣ Receipt Snapshot
      await tx.receipt.create({
        data: {
          personId: person.personId,

          organizationId: data.organizationId || null,
          organizationName: data.organizationName || null,
          fullName: data.fullName || null,
          rank: data.rank || null,
          position: data.position || null,

          receiptBookNo: person.receiptBookNo,
          receiptNo: person.receiptNo,
          receiptDate: toDateOrNull(person.receiptDate),

          money: person.money,
          moneyText: person.moneyText,
        },
      });

      // 4️⃣ Request Info Snapshot
      await tx.requestInfo.create({
        data: {
          personId: person.personId,
          purpose: person.purpose,
          requestingAgency: person.requestingAgency,
          organizationId: data.organizationId || null,
          organizationName: data.organizationName || null,
        },
      });

      // 3️⃣ Appearance Snapshot
      await tx.appearanceSnapshot.create({
        data: {
          personId: person.personId,
          bodyType: person.bodyType,
          skinColor: person.skinColor,
        },
      });

      // 2️⃣ Identity Snapshot
      await tx.identitySnapshot.create({
        data: {
          personId: person.personId,
          nationality: person.nationality,
          ethnicity: person.ethnicity,
        },
      });

      return person;
    });

    res.json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE PERSON
router.delete("/:id", async (req, res) => {
  try {
    await prisma.person.delete({
      where: { personId: req.params.id },
    });

    res.json({ success: true, message: "ลบข้อมูลเรียบร้อย" });
  } catch {
    res.status(500).json({ error: "ลบข้อมูลไม่สำเร็จ" });
  }
});

// UPDATE STATUS (Single) status อย่างเดียว
router.patch("/:id/status", async (req, res) => {
  try {
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

    await prisma.$transaction(async (tx) => {
      await tx.person.update({
        where: { personId: req.params.id },
        data: {
          status,
          statusUpdatedAt: status === 3 ? new Date() : person.statusUpdatedAt,
          updatedAt: new Date(),
        },
      });

      // Snapshot อัตโนมัติ
      await tx.identitySnapshot.create({
        data: {
          personId: person.personId,
          nationality: person.nationality,
          ethnicity: person.ethnicity,
        },
      });

      await tx.appearanceSnapshot.create({
        data: {
          personId: person.personId,
          bodyType: person.bodyType,
          skinColor: person.skinColor,
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
          receiptBookNo: person.receiptBookNo,
          receiptNo: person.receiptNo,
          receiptDate: person.receiptDate,
          money: person.money,
          moneyText: person.moneyText,
        },
      });
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "เปลี่ยนสถานะไม่สำเร็จ" });
  }
});

// UPDATE STATUS (Bulk) status อย่างเดียว 
router.patch("/bulk/status", async (req, res) => {
  try {
    const { personIds, status } = req.body;

    if (![0, 1, 2, 3].includes(status)) {
      return res.status(400).json({ error: "สถานะไม่ถูกต้อง" });
    }

    if (!Array.isArray(personIds) || personIds.length === 0) {
      return res.status(400).json({ error: "ไม่มีรายการบุคคล" });
    }

    const updateData = {
      status,
      updatedAt: new Date(),
    };

    if (status === 3) {
      updateData.statusUpdatedAt = new Date();
    }

    const result = await prisma.person.updateMany({
      where: {
        personId: { in: personIds },
      },
      data: updateData,
    });

    res.json({ success: true, updated: result.count });
  } catch (err) {
    res.status(500).json({ error: "อัปเดตหลายรายการไม่สำเร็จ" });
  }
});

export default router;