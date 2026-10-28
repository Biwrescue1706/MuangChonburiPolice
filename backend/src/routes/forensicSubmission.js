// src/routes/forensicSubmission.js
import { Router } from "express";
import neonPrisma from "../neon.js";

const router = Router();

const sortPersons = (persons = []) => {
  return [...persons].sort((a, b) => {
    const bookA = Number(a.receiptBookNo || 0);
    const bookB = Number(b.receiptBookNo || 0);

    if (bookA !== bookB) {
      return bookA - bookB;
    }

    const noA = Number(a.receiptNo || 0);
    const noB = Number(b.receiptNo || 0);

    return noA - noB;
  });
};

// CREATE FORENSIC SUBMISSION
router.post("/create", async (req, res) => {
  try {
    const { personIds, submissionNo } = req.body ?? {};

    if (
      !Array.isArray(personIds) ||
      personIds.length === 0 ||
      personIds.some(
        (id) => typeof id !== "string" || !id.trim()
      )
    ) {
      return res.status(400).json({
        success: false,
        error: "กรุณาเลือกบุคคลให้ถูกต้อง",
      });
    }

    const uniquePersonIds = [...new Set(personIds)];

    if (uniquePersonIds.length !== personIds.length) {
      return res.status(400).json({
        success: false,
        error: "พบรายการบุคคลซ้ำ กรุณาตรวจสอบอีกครั้ง",
      });
    }

    if (
      typeof submissionNo !== "string" ||
      !submissionNo.trim()
    ) {
      return res.status(400).json({
        success: false,
        error: "กรุณาระบุเลขที่ส่งตรวจ",
      });
    }

    const cleanSubmissionNo = submissionNo.trim();

    const result = await neonPrisma.$transaction(async (tx) => {
      const exists = await tx.forensicSubmission.findFirst({
        where: {
          submissionNo: cleanSubmissionNo,
        },
        select: {
          submissionId: true,
        },
      });

      if (exists) {
        const error = new Error("เลขที่ส่งตรวจนี้มีอยู่แล้ว");
        error.statusCode = 409;
        throw error;
      }

      // Only accept persons currently in status 1.
      const eligiblePersons = await tx.person.findMany({
        where: {
          personId: {
            in: uniquePersonIds,
          },
          status: 1,
        },
        select: {
          personId: true,
        },
      });

      if (eligiblePersons.length !== uniquePersonIds.length) {
        const error = new Error(
          "มีบุคคลบางรายการไม่พบในระบบหรือไม่ได้อยู่ในสถานะที่ส่งตรวจได้"
        );
        error.statusCode = 400;
        throw error;
      }

      const now = new Date();

      const submission = await tx.forensicSubmission.create({
        data: {
          submissionNo: cleanSubmissionNo,
          status: 2,
          statusUpdatedAt: now,
          persons: {
            create: uniquePersonIds.map((personId) => ({
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

      const updated = await tx.person.updateMany({
        where: {
          personId: {
            in: uniquePersonIds,
          },
          status: 1,
        },
        data: {
          status: 2,
          statusUpdatedAt: now,
          updatedAt: now,
        },
      });

      // Guard against a concurrent status change.
      if (updated.count !== uniquePersonIds.length) {
        const error = new Error(
          "สถานะบุคคลมีการเปลี่ยนแปลง กรุณาโหลดข้อมูลใหม่แล้วลองอีกครั้ง"
        );
        error.statusCode = 409;
        throw error;
      }

      return submission;
    });

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("CREATE FORENSIC SUBMISSION ERROR:", err);

    if (err.statusCode) {
      return res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    }

    // Prisma unique constraint violation
    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        error: "เลขที่ส่งตรวจนี้มีอยู่แล้ว",
      });
    }

    return res.status(500).json({
      success: false,
      error: "สร้างรายการส่งตรวจไม่สำเร็จ",
    });
  }
});

// GET ALL FORENSIC SUBMISSIONS
router.get("/", async (req, res) => {
  try {
    const data = await neonPrisma.forensicSubmission.findMany({
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

    const sortedData = data.map((submission) => ({
      ...submission,
      persons: sortPersons(submission.persons),
    }));

    return res.json({
      success: true,
      data: sortedData,
    });
  } catch (err) {
    console.error("GET FORENSIC SUBMISSIONS ERROR:", err);

    return res.status(500).json({
      success: false,
      error: "โหลดข้อมูลไม่สำเร็จ",
    });
  }
});

// GET FORENSIC SUBMISSION BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await neonPrisma.forensicSubmission.findUnique({
      where: {
        submissionId: id,
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

    return res.json({
      success: true,
      data: {
        ...data,
        persons: sortPersons(data.persons),
      },
    });
  } catch (err) {
    console.error("GET FORENSIC SUBMISSION ERROR:", err);

    return res.status(500).json({
      success: false,
      error: "โหลดข้อมูลไม่สำเร็จ",
    });
  }
});

// DELETE FORENSIC SUBMISSION
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await neonPrisma.forensicSubmission.delete({
      where: {
        submissionId: id,
      },
    });

    return res.json({
      success: true,
    });
  } catch (err) {
    console.error("DELETE FORENSIC SUBMISSION ERROR:", err);

    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        error: "ไม่พบรายการที่ต้องการลบ",
      });
    }

    return res.status(500).json({
      success: false,
      error: "ลบไม่สำเร็จ",
    });
  }
});

export default router;