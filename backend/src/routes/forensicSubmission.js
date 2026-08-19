import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

/**
 * POST /api/forensic-submission/create
 *
 * สร้างรายการเตรียมออก PDF ศพฐ.
 */
router.post("/create", async (req, res) => {
  try {
    const {
      personIds,
      submissionNo,
    } = req.body;

    /* ====================================================
       ตรวจสอบ personIds
    ==================================================== */

    if (
      !Array.isArray(personIds) ||
      personIds.length === 0
    ) {
      return res.status(400).json({
        error: "กรุณาเลือกบุคคล",
      });
    }

    /* ====================================================
       ตรวจสอบเลขที่ส่งตรวจ
    ==================================================== */

    if (!submissionNo?.trim()) {
      return res.status(400).json({
        error: "กรุณาระบุเลขที่ส่งตรวจ",
      });
    }

    /* ====================================================
       ตรวจสอบเลขที่ซ้ำ
    ==================================================== */

    const exists =
      await prisma.forensicSubmission.findFirst({
        where: {
          submissionNo: submissionNo.trim(),
        },
      });

    if (exists) {
      return res.status(400).json({
        error: "เลขที่ส่งตรวจนี้มีอยู่แล้ว",
      });
    }

    /* ====================================================
       TRANSACTION
    ==================================================== */

    const result =
      await prisma.$transaction(async (tx) => {
        /* ================================================
           1. สร้าง ForensicSubmission
        ================================================ */

        const submission =
          await tx.forensicSubmission.create({
            data: {
              submissionNo:
                submissionNo.trim(),

              status: 2,
              statusUpdatedAt: new Date(),

              persons: {
                create: personIds.map(
                  personIds.map((personId) => ({
                    personId,
                  }))
                ),
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

        /* ================================================
           2. เปลี่ยน Person
           1 -> 2
        ================================================ */

        await tx.person.updateMany({
          where: {
            personId: {
              in: personIds,
            },

            status: 1,
          },

          data: {
            status: 2,
            statusUpdatedAt:
              new Date(),
            updatedAt:
              new Date(),
          },
        });

        /* ================================================
           3. ดึง Person ล่าสุด
        ================================================ */

        const persons =
          await tx.person.findMany({
            where: {
              personId: {
                in: personIds,
              },
            },

            select: {
              personId: true,
              status: true,
            },
          });

        /* ================================================
           4. เอา Status จาก Person
              มาใส่ ForensicSubmission
        ================================================ */

        /*
         * ถ้ามีบุคคลหลายคน
         * ทุกคนควรมีสถานะเดียวกัน
         *
         * เช่น
         *
         * Person 1 = 2
         * Person 2 = 2
         * Person 3 = 2
         *
         * Submission = 2
         */

        const submissionStatus =
          persons.length > 0
            ? persons[0].status
            : 2;

        /* ================================================
           5. Update Submission Status
        ================================================ */

        const updatedSubmission =
          await tx.forensicSubmission.update({
            where: {
              submissionId:
                submission.submissionId,
            },

            data: {
              status:
                submissionStatus,

              statusUpdatedAt:
                new Date(),
            },

            include: {
              persons: {
                include: {
                  person: true,
                },
              },
            },
          });

        return updatedSubmission;
      });

    /* ====================================================
       RESPONSE
    ==================================================== */

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(
      "CREATE FORENSIC SUBMISSION ERROR:",
      err,
    );

    res.status(500).json({
      error: "สร้างรายการไม่สำเร็จ",
    });
  }
});

/**
 * GET /api/forensic-submission
 * ดูทั้งหมด
 */
router.get("/", async (_, res) => {
  try {
    const data =
      await prisma.forensicSubmission.findMany({
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

    data.forEach((submission) => {
      submission.persons.sort((a, b) => {
        const bookA = Number(
          a.receiptBookNo || 0,
        );

        const bookB = Number(
          b.receiptBookNo || 0,
        );

        if (bookA !== bookB) {
          return bookA - bookB;
        }

        const noA = Number(
          a.receiptNo || 0,
        );

        const noB = Number(
          b.receiptNo || 0,
        );

        return noA - noB;
      });
    });

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "โหลดข้อมูลไม่สำเร็จ",
    });
  }
});

/**
 * GET /api/forensic-submission/:id
 * ดูรายการรายฉบับ
 */
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

    data.persons.sort((a, b) => {
      const bookA = Number(
        a.receiptBookNo || 0,
      );

      const bookB = Number(
        b.receiptBookNo || 0,
      );

      if (bookA !== bookB) {
        return bookA - bookB;
      }

      const noA = Number(
        a.receiptNo || 0,
      );

      const noB = Number(
        b.receiptNo || 0,
      );

      return noA - noB;
    });

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "โหลดข้อมูลไม่สำเร็จ",
    });
  }
});

/**
 * DELETE /api/forensic-submission/:id
 * ลบรายการ
 */
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