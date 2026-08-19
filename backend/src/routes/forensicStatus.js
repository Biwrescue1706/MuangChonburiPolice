import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

/**
 * GET /api/forensic-status/:id
 * ดูข้อมูลรายการส่ง ศพฐ.
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await prisma.forensicSubmission.findUnique({
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

    res.json({
      success: true,
      data: submission,
    });
  } catch (err) {
    console.error("GET FORENSIC STATUS ERROR:", err);

    res.status(500).json({
      success: false,
      error: "ไม่สามารถโหลดข้อมูลได้",
    });
  }
});

/**
 * PATCH /api/forensic-status/:id
 * เปลี่ยนสถานะรายการส่ง ศพฐ.
 */
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

    const submission = await prisma.forensicSubmission.findUnique({
      where: {
        submissionId: id,
      },
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: "ไม่พบรายการส่ง ศพฐ.",
      });
    }

    const now = new Date();

    const result = await prisma.$transaction(async (tx) => {
      const updated = await tx.forensicSubmission.update({
        where: {
          submissionId: id,
        },
        data: {
          status: statusNum,
          statusUpdatedAt: now,
        },
        include: {
          persons: {
            include: {
              person: true,
            },
          },
        },
      });

      await tx.forensicSubmissionStatusHistory.create({
        data: {
          submissionId: id,
          oldStatus: submission.status,
          newStatus: statusNum,
          remark: remark || null,
          changedBy: changedBy || null,
        },
      });

      return updated;
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("PATCH FORENSIC STATUS ERROR:", err);

    res.status(500).json({
      success: false,
      error: "เปลี่ยนสถานะไม่สำเร็จ",
    });
  }
});

/**
 * GET /api/forensic-status/:id/history
 * ประวัติการเปลี่ยนสถานะ
 */
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

    res.json({
      success: true,
      data: history,
    });
  } catch (err) {
    console.error("GET FORENSIC STATUS HISTORY ERROR:", err);

    res.status(500).json({
      success: false,
      error: "ไม่สามารถโหลดประวัติได้",
    });
  }
});

export default router;