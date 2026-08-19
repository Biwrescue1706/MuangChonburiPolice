import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

// GET /api/forensic-status/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const submission =
      await prisma.forensicSubmission.findUnique({
        where: {
          submissionId: id,
        },
        include: {
          persons: {
            include: {
              person: true,
            },
          },
          statusHistories: {
            orderBy: {
              changedAt: "desc",
            },
          },
        },
      });

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: "ไม่พบรายการส่ง ศพฐ.",
      });
    }

    return res.json({
      success: true,
      data: submission,
    });
  } catch (err) {
    console.error("GET FORENSIC STATUS ERROR:", err);

    return res.status(500).json({
      success: false,
      error: "ไม่สามารถโหลดข้อมูลได้",
    });
  }
});

// PATCH /api/forensic-status/:id
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remark, changedBy } = req.body;

    const statusNum = Number(status);

    if (![0, 1, 2, 3, 4].includes(statusNum)) {
      return res.status(400).json({
        success: false,
        error: "สถานะไม่ถูกต้อง",
      });
    }

    const submission =
      await prisma.forensicSubmission.findUnique({
        where: {
          submissionId: id,
        },
        include: {
          persons: {
            select: {
              personId: true,
            },
          },
        },
      });

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: "ไม่พบรายการส่ง ศพฐ.",
      });
    }

    if (submission.status === 4) {
      return res.status(400).json({
        success: false,
        error:
          "รายการนี้ส่งคืนต้นสังกัดแล้ว ไม่สามารถเปลี่ยนสถานะได้อีก",
      });
    }

    if (submission.status === statusNum) {
      return res.status(400).json({
        success: false,
        error: "สถานะนี้เป็นสถานะปัจจุบันอยู่แล้ว",
      });
    }

    const now = new Date();

    const personIds = submission.persons.map(
      (item) => item.personId
    );

    const result =
      await prisma.$transaction(async (tx) => {
        await tx.forensicSubmission.update({
          where: {
            submissionId: id,
          },
          data: {
            status: statusNum,
            statusUpdatedAt: now,
          },
        });

        if (personIds.length > 0) {
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
            },
          });
        }

        await tx.forensicSubmissionStatusHistory.create({
          data: {
            submissionId: id,
            oldStatus: submission.status,
            newStatus: statusNum,
            remark: remark || null,
            changedBy: changedBy || null,
          },
        });

        return await tx.forensicSubmission.findUnique({
          where: {
            submissionId: id,
          },
          include: {
            persons: {
              include: {
                person: true,
              },
            },
            statusHistories: {
              orderBy: {
                changedAt: "desc",
              },
            },
          },
        });
      });

    return res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("PATCH FORENSIC STATUS ERROR:", err);

    return res.status(500).json({
      success: false,
      error: "เปลี่ยนสถานะไม่สำเร็จ",
    });
  }
});

// GET /api/forensic-status/:id/history
router.get("/:id/history", async (req, res) => {
  try {
    const { id } = req.params;

    const history =
      await prisma.forensicSubmissionStatusHistory.findMany({
        where: {
          submissionId: id,
        },
        orderBy: {
          changedAt: "desc",
        },
      });

    return res.json({
      success: true,
      data: history,
    });
  } catch (err) {
    console.error(
      "GET FORENSIC STATUS HISTORY ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      error: "ไม่สามารถโหลดประวัติได้",
    });
  }
});

export default router;