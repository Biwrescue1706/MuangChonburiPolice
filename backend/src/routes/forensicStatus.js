// routes/forensicStatus.js

import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

/* =========================================================
   GET /api/forensic-status/:id/history
   ประวัติการเปลี่ยนสถานะ
   ========================================================= */

router.get("/:id/history", async (req, res) => {
  try {
    const id = String(req.params.id).trim();

    console.log("====================================");
    console.log("GET FORENSIC STATUS HISTORY");
    console.log("Submission ID:", id);
    console.log("====================================");

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
      "GET FORENSIC STATUS HISTORY ERROR"
    );

    console.error("Message:", err?.message);
    console.error("Code:", err?.code);
    console.error("Meta:", err?.meta);
    console.error("Stack:", err?.stack);

    return res.status(500).json({
      success: false,
      error:
        err?.message ||
        "ไม่สามารถโหลดประวัติได้",
    });
  }
});


/* =========================================================
   GET /api/forensic-status/:id
   ดูข้อมูลรายการส่ง ศพฐ.
   ========================================================= */

router.get("/:id", async (req, res) => {
  try {
    const id = String(req.params.id).trim();

    console.log("====================================");
    console.log("GET FORENSIC STATUS");
    console.log("Received Submission ID:", id);
    console.log("ID Length:", id.length);
    console.log("====================================");

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

    /* =====================================================
       DEBUG
    ===================================================== */

    if (!submission) {
      console.log("❌ SUBMISSION NOT FOUND");
      console.log("Searching latest submissions...");

      const latest =
        await prisma.forensicSubmission.findMany({
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

      console.log(
        "Latest submissions:",
        latest
      );

      return res.status(404).json({
        success: false,

        error:
          "ไม่พบรายการส่ง ศพฐ.",

        submissionId: id,

        debug: {
          receivedId: id,
          latestSubmissions: latest,
        },
      });
    }

    console.log("✅ SUBMISSION FOUND");

    console.log({
      submissionId:
        submission.submissionId,

      submissionNo:
        submission.submissionNo,

      status:
        submission.status,

      persons:
        submission.persons?.length || 0,

      histories:
        submission.statusHistories?.length || 0,
    });

    return res.json({
      success: true,
      data: submission,
    });

  } catch (err) {
    console.error(
      "===================================="
    );

    console.error(
      "GET FORENSIC STATUS ERROR"
    );

    console.error(
      "Message:",
      err?.message
    );

    console.error(
      "Code:",
      err?.code
    );

    console.error(
      "Meta:",
      err?.meta
    );

    console.error(
      "Stack:",
      err?.stack
    );

    console.error(
      "===================================="
    );

    return res.status(500).json({
      success: false,

      error:
        err?.message ||
        "ไม่สามารถโหลดข้อมูลได้",

      code:
        err?.code || null,

      meta:
        err?.meta || null,
    });
  }
});


/* =========================================================
   PATCH /api/forensic-status/:id
   เปลี่ยนสถานะรายการส่ง ศพฐ.
   ========================================================= */

router.patch("/:id", async (req, res) => {
  try {
    const id = String(req.params.id).trim();

    const {
      status,
      remark,
      changedBy,
    } = req.body;

    const statusNum = Number(status);

    /* =====================================================
       ตรวจสอบสถานะ
    ===================================================== */

    if (![0, 1, 2, 3, 4].includes(statusNum)) {
      return res.status(400).json({
        success: false,
        error: "สถานะไม่ถูกต้อง",
      });
    }

    /* =====================================================
       ค้นหา Submission
    ===================================================== */

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

    /* =====================================================
       Status 4 จบแล้ว
    ===================================================== */

    if (submission.status === 4) {
      return res.status(400).json({
        success: false,

        error:
          "รายการนี้ส่งคืนต้นสังกัดแล้ว ไม่สามารถเปลี่ยนสถานะได้อีก",
      });
    }

    /* =====================================================
       สถานะเดิม
    ===================================================== */

    if (submission.status === statusNum) {
      return res.status(400).json({
        success: false,

        error:
          "สถานะนี้เป็นสถานะปัจจุบันอยู่แล้ว",
      });
    }

    const now = new Date();

    /* =====================================================
       Person ทั้งหมดใน Submission
    ===================================================== */

    const personIds =
      submission.persons.map(
        (item) => item.personId
      );

    /* =====================================================
       TRANSACTION
    ===================================================== */

    const result =
      await prisma.$transaction(async (tx) => {

        /* -------------------------------------------------
           1. Update Submission
        ------------------------------------------------- */

        await tx.forensicSubmission.update({
          where: {
            submissionId: id,
          },

          data: {
            status: statusNum,

            statusUpdatedAt: now,
          },
        });


        /* -------------------------------------------------
           2. Update Person
        ------------------------------------------------- */

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


        /* -------------------------------------------------
           3. บันทึก History
        ------------------------------------------------- */

        await tx.forensicSubmissionStatusHistory.create({
          data: {
            submissionId: id,

            oldStatus:
              submission.status,

            newStatus:
              statusNum,

            remark:
              remark?.trim() || null,

            changedBy:
              changedBy?.trim() || null,
          },
        });


        /* -------------------------------------------------
           4. ดึงข้อมูลล่าสุด
        ------------------------------------------------- */

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


    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.json({
      success: true,
      data: result,
    });

  } catch (err) {
    console.error(
      "===================================="
    );

    console.error(
      "PATCH FORENSIC STATUS ERROR"
    );

    console.error(
      "Message:",
      err?.message
    );

    console.error(
      "Code:",
      err?.code
    );

    console.error(
      "Meta:",
      err?.meta
    );

    console.error(
      "Stack:",
      err?.stack
    );

    console.error(
      "===================================="
    );

    return res.status(500).json({
      success: false,

      error:
        err?.message ||
        "เปลี่ยนสถานะไม่สำเร็จ",

      code:
        err?.code || null,

      meta:
        err?.meta || null,
    });
  }
});


export default router;