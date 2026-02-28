import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

/* =========================
   CREATE PERSON
========================= */
router.post("/create", async (req, res) => {
  try {
    const data = req.body;

    // เช็ค citizenId ซ้ำ
    const existing = await prisma.person.findUnique({
      where: { citizenId: data.citizenId },
    });

    if (existing) {
      return res.status(400).json({ error: "เลขบัตรประชาชนซ้ำ" });
    }

    const person = await prisma.person.create({
      data: {
        prefix: data.prefix,
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: data.fullName,
        citizenId: data.citizenId,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        birthDay: data.birthDay,
        birthMonth: data.birthMonth,
        birthYear: data.birthYear,
        nationality: data.nationality,
        ethnicity: data.ethnicity,
        weight: data.weight,
        height: data.height,
        distinguishingMarks: data.distinguishingMarks,
        address: data.address,
        occupation: data.occupation,
        workplaceAddress: data.workplaceAddress,
        father: data.father,
        mother: data.mother,
        spouse: data.spouse,
      },
    });

    res.json({ success: true, data: person });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "สร้างข้อมูลไม่สำเร็จ" });
  }
});

/* =========================
   GET ALL PERSON
========================= */
router.get("/getall", async (req, res) => {
  try {
    const persons = await prisma.person.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: persons });
  } catch (err) {
    res.status(500).json({ error: "ดึงข้อมูลไม่สำเร็จ" });
  }
});

/* =========================
   GET PERSON BY ID (พร้อมคำร้อง)
========================= */
router.get("/:personId", async (req, res) => {
  try {
    const { personId } = req.params;

    const person = await prisma.person.findUnique({
      where: { personId },
      include: {
        requests: {
          include: {
            organization: true,
            files: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!person) {
      return res.status(404).json({ error: "ไม่พบข้อมูล" });
    }

    res.json({ success: true, data: person });
  } catch (err) {
    res.status(500).json({ error: "ดึงข้อมูลไม่สำเร็จ" });
  }
});

/* =========================
   UPDATE PERSON
========================= */
router.put("/:personId", async (req, res) => {
  try {
    const { personId } = req.params;
    const data = req.body;

    const person = await prisma.person.update({
      where: { personId },
      data: {
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        updatedAt: new Date(),
      },
    });

    res.json({ success: true, data: person });
  } catch (err) {
    res.status(500).json({ error: "แก้ไขข้อมูลไม่สำเร็จ" });
  }
});

/* =========================
   DELETE PERSON (ลบคำร้องด้วย)
========================= */
router.delete("/:personId", async (req, res) => {
  try {
    const { personId } = req.params;

    await prisma.$transaction([
      prisma.verificationFile.deleteMany({
        where: {
          request: {
            personId,
          },
        },
      }),
      prisma.verificationRequest.deleteMany({
        where: { personId },
      }),
      prisma.person.delete({
        where: { personId },
      }),
    ]);

    res.json({ success: true, message: "ลบข้อมูลเรียบร้อย" });
  } catch (err) {
    res.status(500).json({ error: "ลบข้อมูลไม่สำเร็จ" });
  }
});

/* =========================
   CREATE VERIFICATION REQUEST
========================= */
router.post("/:personId/request", async (req, res) => {
  try {
    const { personId } = req.params;
    const data = req.body;

    const request = await prisma.verificationRequest.create({
      data: {
        personId,
        organizationId: data.organizationId,
        purpose: data.purpose,
        requestingAgency: data.requestingAgency,
        receiptBookNo: data.receiptBookNo,
        receiptNo: data.receiptNo,
        receiptDate: data.receiptDate ? new Date(data.receiptDate) : null,
        submittedDate: data.submittedDate
          ? new Date(data.submittedDate)
          : null,
        expireAt: new Date(data.expireAt),
        status: 0,
      },
    });

    res.json({ success: true, data: request });
  } catch (err) {
    res.status(500).json({ error: "สร้างคำร้องไม่สำเร็จ" });
  }
});

/* =========================
   UPDATE REQUEST
========================= */
router.put("/request/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;
    const data = req.body;

    const request = await prisma.verificationRequest.update({
      where: { requestId },
      data: {
        ...data,
        expireAt: data.expireAt ? new Date(data.expireAt) : undefined,
        updatedAt: new Date(),
      },
    });

    res.json({ success: true, data: request });
  } catch (err) {
    res.status(500).json({ error: "แก้ไขคำร้องไม่สำเร็จ" });
  }
});

/* =========================
   DELETE REQUEST
========================= */
router.delete("/request/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;

    await prisma.verificationFile.deleteMany({
      where: { requestId },
    });

    await prisma.verificationRequest.delete({
      where: { requestId },
    });

    res.json({ success: true, message: "ลบคำร้องเรียบร้อย" });
  } catch (err) {
    res.status(500).json({ error: "ลบคำร้องไม่สำเร็จ" });
  }
});

export default router;