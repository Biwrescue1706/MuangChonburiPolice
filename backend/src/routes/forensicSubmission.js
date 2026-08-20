// routes/forensicSubmission.js

import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

/* =========================================================
   CREATE
   POST /api/forensic-submission/create
   สร้างรายการเตรียมออก PDF ศพฐ.
========================================================= */

router.post("/create", async (req, res) => {
  try {
    const { personIds, submissionNo } = req.body;

    /* =====================================================
       ตรวจสอบ personIds
    ===================================================== */

    if (!Array.isArray(personIds) || personIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: "กรุณาเลือกบุคคล",
      });
    }

    /* =====================================================
       กัน personId ซ้ำ
    ===================================================== */

    const uniquePersonIds = [
      ...new Set(
        personIds
          .map((id) => String(id).trim())
          .filter(Boolean)
      ),
    ];

    if (uniquePersonIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: "ไม่พบข้อมูลบุคคลที่เลือก",
      });
    }

    /* =====================================================
       ตรวจสอบเลขหนังสือนำส่ง
    ===================================================== */

    const cleanSubmissionNo = submissionNo?.trim();

    if (!cleanSubmissionNo) {
      return res.status(400).json({
        success: false,
        error: "กรุณาระบุเลขที่ส่งตรวจ",
      });
    }

    /* =====================================================
       ตรวจสอบเลขหนังสือซ้ำ
    ===================================================== */

    const exists =
      await prisma.forensicSubmission.findFirst({
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

    /* =====================================================
       ตรวจสอบ Person
    ===================================================== */

    const persons =
      await prisma.person.findMany({
        where: {
          personId: {
            in: uniquePersonIds,
          },
        },
        select: {
          personId: true,
          fullName: true,
          status: true,
        },
      });

    if (persons.length !== uniquePersonIds.length) {
      const foundIds = persons.map(
        (person) => person.personId
      );

      const missingIds =
        uniquePersonIds.filter(
          (id) => !foundIds.includes(id)
        );

      return res.status(404).json({
        success: false,
        error: "ไม่พบบุคคลบางรายการ",
        missingIds,
      });
    }

    /* =====================================================
       ตรวจสอบว่าบุคคลถูกส่ง ศพฐ. ไปแล้วหรือยัง
    ===================================================== */

    const existingPersons =
      await prisma.forensicSubmissionPerson.findMany({
        where: {
          personId: {
            in: uniquePersonIds,
          },
        },
        select: {
          personId: true,
          submissionId: true,
        },
      });

    if (existingPersons.length > 0) {
      return res.status(400).json({
        success: false,
        error:
          "มีบุคคลบางรายอยู่ในรายการส่ง ศพฐ. แล้ว",
        data: existingPersons,
      });
    }

    /* =====================================================
       TRANSACTION
    ===================================================== */

    const result =
      await prisma.$transaction(async (tx) => {
        const now = new Date();

        /* ================================================
           1. สร้าง ForensicSubmission

           status
           0 = เตรียมส่ง
        ================================================ */

        const submission =
          await tx.forensicSubmission.create({
            data: {
              submissionNo: cleanSubmissionNo,

              status: 0,

              statusUpdatedAt: now,

              persons: {
                create: uniquePersonIds.map(
                  (personId) => ({
                    personId,
                  })
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
           2. เปลี่ยนสถานะ Person

           1 = รอส่ง ศพฐ.
           2 = เตรียมออกหนังสือ / ส่ง ศพฐ.

           เปลี่ยนเฉพาะคนที่ status = 1
        ================================================ */

        await tx.person.updateMany({
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

        /* ================================================
           3. ส่งข้อมูลกลับ
        ================================================ */

        return submission;
      });

    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(201).json({
      success: true,
      message: "สร้างรายการเตรียมออก PDF ศพฐ. สำเร็จ",
      data: result,
    });
  } catch (err) {
    /* =====================================================
       ERROR LOG
    ===================================================== */

    console.error(
      "=================================================="
    );

    console.error(
      "❌ CREATE FORENSIC SUBMISSION ERROR"
    );

    console.error("Message:", err?.message);
    console.error("Code:", err?.code);
    console.error("Meta:", err?.meta);
    console.error("Stack:", err?.stack);

    console.error(
      "=================================================="
    );

    return res.status(500).json({
      success: false,

      error:
        err?.message ||
        "สร้างรายการไม่สำเร็จ",

      code: err?.code || null,

      meta: err?.meta || null,
    });
  }
});

/* =========================================================
   GET ALL
   GET /api/forensic-submission
========================================================= */

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

          statusHistories: {
            orderBy: {
              changedAt: "desc",
            },
          },
        },

        orderBy: {
          submissionDate: "desc",
        },
      });

    /* =====================================================
       เรียงบุคคล
       เล่มที่ → เลขที่
    ===================================================== */

    data.forEach((submission) => {
      submission.persons.sort((a, b) => {
        const bookA = Number(
          a.receiptBookNo || 0
        );

        const bookB = Number(
          b.receiptBookNo || 0
        );

        if (bookA !== bookB) {
          return bookA - bookB;
        }

        const noA = Number(
          a.receiptNo || 0
        );

        const noB = Number(
          b.receiptNo || 0
        );

        return noA - noB;
      });
    });

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error(
      "❌ GET FORENSIC SUBMISSIONS ERROR"
    );

    console.error("Message:", err?.message);
    console.error("Code:", err?.code);
    console.error("Meta:", err?.meta);

    return res.status(500).json({
      success: false,
      error:
        err?.message ||
        "โหลดข้อมูลไม่สำเร็จ",
    });
  }
});

/* =========================================================
   GET ONE
   GET /api/forensic-submission/:id
========================================================= */

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data =
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

    if (!data) {
      return res.status(404).json({
        success: false,
        error: "ไม่พบข้อมูล",
      });
    }

    /* =====================================================
       เรียงบุคคล
    ===================================================== */

    data.persons.sort((a, b) => {
      const bookA = Number(
        a.receiptBookNo || 0
      );

      const bookB = Number(
        b.receiptBookNo || 0
      );

      if (bookA !== bookB) {
        return bookA - bookB;
      }

      const noA = Number(
        a.receiptNo || 0
      );

      const noB = Number(
        b.receiptNo || 0
      );

      return noA - noB;
    });

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error(
      "❌ GET FORENSIC SUBMISSION ERROR"
    );

    console.error("Message:", err?.message);
    console.error("Code:", err?.code);
    console.error("Meta:", err?.meta);

    return res.status(500).json({
      success: false,
      error:
        err?.message ||
        "โหลดข้อมูลไม่สำเร็จ",
    });
  }
});

/* =========================================================
   DELETE
   DELETE /api/forensic-submission/:id
========================================================= */

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const exists =
      await prisma.forensicSubmission.findUnique({
        where: {
          submissionId: id,
        },
      });

    if (!exists) {
      return res.status(404).json({
        success: false,
        error: "ไม่พบรายการส่ง ศพฐ.",
      });
    }

    await prisma.forensicSubmission.delete({
      where: {
        submissionId: id,
      },
    });

    return res.json({
      success: true,
      message: "ลบรายการส่ง ศพฐ. สำเร็จ",
    });
  } catch (err) {
    console.error(
      "❌ DELETE FORENSIC SUBMISSION ERROR"
    );

    console.error("Message:", err?.message);
    console.error("Code:", err?.code);
    console.error("Meta:", err?.meta);

    return res.status(500).json({
      success: false,
      error:
        err?.message ||
        "ลบไม่สำเร็จ",
    });
  }
});

export default router;