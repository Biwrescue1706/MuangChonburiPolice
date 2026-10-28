
// src/routes/forensicStatus.js
import { Router } from "express";
import neonPrisma from "../neon.js";

const router = Router();

const VALID_STATUSES = [0, 1, 2, 3, 4];

const STATUS_LABELS = {
  0: "รอดำเนินการส่ง ศพฐ.",
  1: "เตรียมเอกสาร ส่ง ศพฐ",
  2: "ส่งตรวจ ศพฐ แล้ว",
  3: "ได้รับผลตรวจ ศพฐ.แล้ว",
  4: "ส่งคืนต้นสังกัดแล้ว",
};

const normalizeId = (value) =>
  typeof value === "string" ? value.trim() : "";

const sortPersons = (persons = []) =>
  [...persons].sort((a, b) => {
    const bookA = Number(a.receiptBookNo || 0);
    const bookB = Number(b.receiptBookNo || 0);

    if (bookA !== bookB) {
      return bookA - bookB;
    }

    return (
      Number(a.receiptNo || 0) -
      Number(b.receiptNo || 0)
    );
  });

const getErrorResponse = (err, fallbackMessage) => {
  console.error(fallbackMessage, err);

  return {
    success: false,
    error: fallbackMessage,
  };
};

// GET STATUS HISTORY
router.get("/:id/history", async (req, res) => {
  try {
    const id = normalizeId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "กรุณาระบุรหัสรายการ",
      });
    }

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
    return res.status(500).json(
      getErrorResponse(err, "ไม่สามารถโหลดประวัติได้")
    );
  }
});

// GET FORENSIC SUBMISSION BY ID
router.get("/:id", async (req, res) => {
  try {
    const id = normalizeId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "กรุณาระบุรหัสรายการ",
      });
    }

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

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: "ไม่พบรายการส่ง ศพฐ.",
      });
    }

    return res.json({
      success: true,
      data: {
        ...submission,
        persons: sortPersons(submission.persons),
      },
    });
  } catch (err) {
    return res.status(500).json(
      getErrorResponse(err, "ไม่สามารถโหลดข้อมูลได้")
    );
  }
});

// UPDATE FORENSIC STATUS
router.patch("/:id", async (req, res) => {
  try {
    const id = normalizeId(req.params.id);
    const { status, remark } = req.body ?? {};

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "กรุณาระบุรหัสรายการ",
      });
    }

    // Validate status without accepting empty strings or null.
    if (
      status === "" ||
      status === null ||
      status === undefined ||
      !Number.isInteger(Number(status)) ||
      !VALID_STATUSES.includes(Number(status))
    ) {
      return res.status(400).json({
        success: false,
        error: "สถานะไม่ถูกต้อง",
      });
    }

    if (
      remark !== undefined &&
      remark !== null &&
      typeof remark !== "string"
    ) {
      return res.status(400).json({
        success: false,
        error: "รูปแบบหมายเหตุไม่ถูกต้อง",
      });
    }

    const statusNum = Number(status);
    const cleanRemark = remark?.trim() || null;

    const result = await neonPrisma.$transaction(
      async (tx) => {
        const submission =
          await tx.forensicSubmission.findUnique({
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
          const error = new Error(
            "ไม่พบรายการส่ง ศพฐ."
          );
          error.statusCode = 404;
          throw error;
        }

        if (submission.status === 4) {
          const error = new Error(
            "รายการนี้ส่งคืนต้นสังกัดแล้ว ไม่สามารถเปลี่ยนสถานะได้อีก"
          );
          error.statusCode = 400;
          throw error;
        }

        if (submission.status === statusNum) {
          const error = new Error(
            "สถานะนี้เป็นสถานะปัจจุบันอยู่แล้ว"
          );
          error.statusCode = 400;
          throw error;
        }

        const now = new Date();

        const personIds = submission.persons.map(
          (item) => item.personId
        );

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
            remark: cleanRemark,
          },
        });

        return tx.forensicSubmission.findUnique({
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
      }
    );

    return res.json({
      success: true,
      data: {
        ...result,
        persons: sortPersons(result?.persons),
      },
    });
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    }

    return res.status(500).json(
      getErrorResponse(err, "เปลี่ยนสถานะไม่สำเร็จ")
    );
  }
});

export default router;
