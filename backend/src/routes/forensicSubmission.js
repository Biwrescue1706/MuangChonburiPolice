import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

/* ======================================================
   สร้างรายการเตรียมออก PDF ศพฐ.
   POST /api/forensic-submission/create
====================================================== */

router.post("/create", async (req, res) => {
  try {
    const { personIds, submissionNo } = req.body;

    /* ตรวจสอบบุคคล */
    if (!Array.isArray(personIds) || personIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: "กรุณาเลือกบุคคล",
      });
    }

    /* ตรวจสอบเลขที่ส่งตรวจ */
    if (!submissionNo?.trim()) {
      return res.status(400).json({
        success: false,
        error: "กรุณาระบุเลขที่ส่งตรวจ",
      });
    }

    const cleanSubmissionNo = submissionNo.trim();

    /* ตรวจสอบเลขซ้ำ */
    const exists = await prisma.forensicSubmission.findFirst({
      where: {
        submissionNo: cleanSubmissionNo,
      },
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        error: "เลขที่ส่งตรวจนี้มีอยู่แล้ว",
      });
    }

    /* ==================================================
       Transaction
    ================================================== */

    const result = await prisma.$transaction(async (tx) => {
      /* สร้างรายการส่ง ศพฐ. */
      const submission = await tx.forensicSubmission.create({
        data: {
          submissionNo: cleanSubmissionNo,

          persons: {
            create: personIds.map((personId) => ({
              personId,
            })),
          },
        },

        include: {
          persons: {
            include: {
              person: true,
            },
          },
        },
      });

      /* ==================================================
         เปลี่ยนสถานะบุคคล
         
         จาก status 1 -> 2 เท่านั้น
      ================================================== */

      await tx.person.updateMany({
        where: {
          personId: {
            in: personIds,
          },
          status: 1,
        },

        data: {
          status: 2,
          statusUpdatedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return submission;
    });

    /* ==================================================
       สำเร็จ
    ================================================== */

    return res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("CREATE FORENSIC SUBMISSION ERROR:", err);

    return res.status(500).json({
      success: false,
      error: "สร้างรายการไม่สำเร็จ",
    });
  }
});

/* ======================================================
   ดูรายการทั้งหมด
   GET /api/forensic-submission
====================================================== */

router.get("/", async (_, res) => {
  try {
    const data = await prisma.forensicSubmission.findMany({
      include: {
        persons: {
          include: {
            person: true,
          },
        },
      },

      orderBy: {
        submissionDate: "desc",
      },
    });

    /* ==================================================
       เรียงบุคคล
       เล่มที่ -> เลขที่
    ================================================== */

    data.forEach((submission) => {
      submission.persons.sort((a, b) => {
        const bookA = Number(a.receiptBookNo || 0);
        const bookB = Number(b.receiptBookNo || 0);

        if (bookA !== bookB) {
          return bookA - bookB;
        }

        const noA = Number(a.receiptNo || 0);
        const noB = Number(b.receiptNo || 0);

        return noA - noB;
      });
    });

    /* ==================================================
       สำคัญ
       ส่งกลับเป็น { success, data }
    ================================================== */

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("GET FORENSIC SUBMISSION ERROR:", err);

    return res.status(500).json({
      success: false,
      error: "โหลดข้อมูลไม่สำเร็จ",
    });
  }
});

/* ======================================================
   ดูรายการรายฉบับ
   GET /api/forensic-submission/:id
====================================================== */

router.get("/:id", async (req, res) => {
  try {
    const data = await prisma.forensicSubmission.findUnique({
      where: {
        submissionId: req.params.id,
      },

      include: {
        persons: {
          include: {
            person: true,
          },
        },
      },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        error: "ไม่พบข้อมูล",
      });
    }

    /* เรียงบุคคล */
    data.persons.sort((a, b) => {
      const bookA = Number(a.receiptBookNo || 0);
      const bookB = Number(b.receiptBookNo || 0);

      if (bookA !== bookB) {
        return bookA - bookB;
      }

      const noA = Number(a.receiptNo || 0);
      const noB = Number(b.receiptNo || 0);

      return noA - noB;
    });

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("GET FORENSIC SUBMISSION BY ID ERROR:", err);

    return res.status(500).json({
      success: false,
      error: "โหลดข้อมูลไม่สำเร็จ",
    });
  }
});

/* ======================================================
   ลบรายการ
   DELETE /api/forensic-submission/:id
====================================================== */

router.delete("/:id", async (req, res) => {
  try {
    await prisma.forensicSubmission.delete({
      where: {
        submissionId: req.params.id,
      },
    });

    return res.json({
      success: true,
    });
  } catch (err) {
    console.error("DELETE FORENSIC SUBMISSION ERROR:", err);

    return res.status(500).json({
      success: false,
      error: "ลบไม่สำเร็จ",
    });
  }
});

export default router;