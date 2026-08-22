// routes/forensicStatus.js

import { Router } from "express";
import neonPrisma from "../neon.js";

const router = Router();

// Get status history
router.get("/:id/history", async (req, res) => {
  try {
    const id = String(req.params.id).trim();

    const history =
      await neonPrisma.forensicSubmissionStatusHistory.findMany({
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

    return res.status(500).json({
      success: false,
      error:
        err?.message ||
        "ไม่สามารถโหลดประวัติได้",
    });
  }
});

// Get forensic submission
router.get("/:id", async (req, res) => {
  try {
    const id = String(req.params.id).trim();

    const submission =
      await neonPrisma.forensicSubmission.findUnique({
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

    // Debug when submission not found
    if (!submission) {
      console.log("SUBMISSION NOT FOUND");
      console.log("Searching latest submissions...");

      const latest =
        await neonPrisma.forensicSubmission.findMany({
          select: {
            submissionId: true,
            submissionNo: true,
            status: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        });

      console.log("Latest submissions:", latest);

      return res.status(404).json({
        success: false,
        error: "ไม่พบรายการส่ง ศพฐ.",
        submissionId: id,
        debug: {
          receivedId: id,
          latestSubmissions: latest,
        },
      });
    }
    return res.json({
      success: true,
      data: submission,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error:
        err?.message ||
        "ไม่สามารถโหลดข้อมูลได้",
      code: err?.code || null,
      meta: err?.meta || null,
    });
  }
});

// Update forensic status
router.patch("/:id", async (req, res) => {
  try {
    const id = String(req.params.id).trim();

    const {
      status,
      remark,
      changedBy,
    } = req.body;

    const statusNum = Number(status);

    // Validate status
    if (![0, 1, 2, 3, 4].includes(statusNum)) {
      return res.status(400).json({
        success: false,
        error: "สถานะไม่ถูกต้อง",
      });
    }

    // Find submission
    const submission =
      await neonPrisma.forensicSubmission.findUnique({
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

    // Prevent changing completed submission
    if (submission.status === 4) {
      return res.status(400).json({
        success: false,
        error:
          "รายการนี้ส่งคืนต้นสังกัดแล้ว ไม่สามารถเปลี่ยนสถานะได้อีก",
      });
    }

    // Prevent same status
    if (submission.status === statusNum) {
      return res.status(400).json({
        success: false,
        error:
          "สถานะนี้เป็นสถานะปัจจุบันอยู่แล้ว",
      });
    }

    const now = new Date();

    // Get person IDs
    const personIds =
      submission.persons.map(
        (item) => item.personId
      );

    // Transaction
    const result =
      await neonPrisma.$transaction(async (tx) => {
        // Update submission
        await tx.forensicSubmission.update({
          where: {
            submissionId: id,
          },
          data: {
            status: statusNum,
            statusUpdatedAt: now,
          },
        });

        // Update persons
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

        // Create history
        await tx.forensicSubmissionStatusHistory.create({
          data: {
            submissionId: id,
            oldStatus: submission.status,
            newStatus: statusNum,
            remark: remark?.trim() || null,
            changedBy: changedBy?.trim() || null,
          },
        });

        // Get updated submission
        const updated =
          await tx.forensicSubmission.findUnique({
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

        return updated;
      });

    return res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error:
        err?.message ||
        "เปลี่ยนสถานะไม่สำเร็จ",
      code: err?.code || null,
      meta: err?.meta || null,
    });
  }
});

export default router;