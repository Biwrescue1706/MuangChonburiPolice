import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

//สร้างรายการเตรียมออก PDF ศพฐ.

router.post("/create", async (req, res) => {
  try {
    const { personIds, submissionNo } = req.body;

    if (!Array.isArray(personIds) || personIds.length === 0) {
      return res.status(400).json({
        error: "กรุณาเลือกบุคคล",
      });
    }

    if (!submissionNo?.trim()) {
      return res.status(400).json({
        error: "กรุณาระบุเลขที่ส่งตรวจ",
      });
    }

    const exists = await prisma.forensicSubmission.findFirst({
      where: {
        submissionNo: submissionNo.trim(),
      },
    });

    if (exists) {
      return res.status(400).json({
        error: "เลขที่ส่งตรวจนี้มีอยู่แล้ว",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const submission = await tx.forensicSubmission.create({
        data: {
          submissionNo: submissionNo.trim(),

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

      // เปลี่ยนสถานะจาก 1 -> 2 เท่านั้น
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

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "สร้างรายการไม่สำเร็จ",
    });
  }
});

//  ดูรายการทั้งหมด
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

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "โหลดข้อมูลไม่สำเร็จ",
    });
  }
});

//ดูรายการรายฉบับ

router.get("/:id", async (req, res) => {
  try {
    const data =
      await prisma.forensicSubmission.findUnique({
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
        error: "ไม่พบข้อมูล",
      });
    }

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "โหลดข้อมูลไม่สำเร็จ",
    });
  }
});

//ลบรายการ

router.delete("/:id", async (req, res) => {
  try {
    await prisma.forensicSubmission.delete({
      where: {
        submissionId: req.params.id,
      },
    });

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "ลบไม่สำเร็จ",
    });
  }
});

export default router;