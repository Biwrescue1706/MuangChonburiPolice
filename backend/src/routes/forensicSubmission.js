import { Router } from "express";
import neonPrisma from "../neon.js";

const router = Router();

// Create forensic submission
router.post("/create", async (req, res) => {
  try {
    const {
      personIds,
      submissionNo,
    } = req.body;

    // Validate person IDs
    if (
      !Array.isArray(personIds) ||
      personIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        error: "กรุณาเลือกบุคคล",
      });
    }

    // Validate submission number
    if (!submissionNo?.trim()) {
      return res.status(400).json({
        success: false,
        error: "กรุณาระบุเลขที่ส่งตรวจ",
      });
    }

    const cleanSubmissionNo =
      submissionNo.trim();

    // Check duplicate submission number
    const exists =
      await neonPrisma.forensicSubmission.findFirst({
        where: {
          submissionNo:
            cleanSubmissionNo,
        },
      });

    if (exists) {
      return res.status(400).json({
        success: false,
        error:
          "เลขที่ส่งตรวจนี้มีอยู่แล้ว",
      });
    }

    // Transaction
    const result =
      await neonPrisma.$transaction(
        async (tx) => {
          // Create forensic submission
          const submission =
            await tx.forensicSubmission.create({
              data: {
                submissionNo:
                  cleanSubmissionNo,

                persons: {
                  create:
                    personIds.map(
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

          // Update person status from 1 to 2
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

          return submission;
        }
      );

    // Success
    return res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "สร้างรายการไม่สำเร็จ",
    });
  }
});

// Get all forensic submissions
router.get("/", async (_, res) => {
  try {
    const data =
      await neonPrisma.forensicSubmission.findMany({
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

    // Sort persons by receipt book and receipt number
    data.forEach((submission) => {
      submission.persons.sort((a, b) => {
        const bookA =
          Number(a.receiptBookNo || 0);

        const bookB =
          Number(b.receiptBookNo || 0);

        if (bookA !== bookB) {
          return bookA - bookB;
        }

        const noA =
          Number(a.receiptNo || 0);

        const noB =
          Number(b.receiptNo || 0);

        return noA - noB;
      });
    });

    // Return response
    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "โหลดข้อมูลไม่สำเร็จ",
    });
  }
});

// Get forensic submission by ID
router.get("/:id", async (req, res) => {
  try {
    const data =
      await neonPrisma.forensicSubmission.findUnique({
        where: {
          submissionId:
            req.params.id,
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

    // Sort persons
    data.persons.sort((a, b) => {
      const bookA =
        Number(a.receiptBookNo || 0);

      const bookB =
        Number(b.receiptBookNo || 0);

      if (bookA !== bookB) {
        return bookA - bookB;
      }

      const noA =
        Number(a.receiptNo || 0);

      const noB =
        Number(b.receiptNo || 0);

      return noA - noB;
    });

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "โหลดข้อมูลไม่สำเร็จ",
    });
  }
});

// Delete forensic submission
router.delete("/:id", async (req, res) => {
  try {
    await neonPrisma.forensicSubmission.delete({
      where: {
        submissionId:
          req.params.id,
      },
    });

    return res.json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "ลบไม่สำเร็จ",
    });
  }
});

export default router;