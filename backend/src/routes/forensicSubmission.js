import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

//สร้างรายการเตรียมออก PDF ศพฐ.

router.post("/create", async (req, res) => {
  try {
    const { personIds } = req.body;

    if (!Array.isArray(personIds) || personIds.length === 0) {
      return res.status(400).json({
        error: "กรุณาเลือกบุคคล",
      });
    }

    const now = new Date();

    // ปี พ.ศ.
    const thaiYear = now.getFullYear() + 543;

    // หาเลขล่าสุดของปีนี้
    const lastSubmission =
      await prisma.forensicSubmission.findFirst({
        where: {
          submissionNo: {
            endsWith: `/${thaiYear}`,
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    let runningNo = 1;

    if (lastSubmission?.submissionNo) {
      const currentNo = parseInt(
        lastSubmission.submissionNo.split("/")[0]
      );

      runningNo = currentNo + 1;
    }

    const submissionNo =
      `${String(runningNo).padStart(4, "0")}/${thaiYear}`;

    const submission =
      await prisma.forensicSubmission.create({
        data: {
          submissionNo,

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

    res.json({
      success: true,
      data: submission,
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