import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

/**
 * GET /api/status-history/today
 * วันนี้ส่งกี่คน + รายชื่อ
 */
router.get("/today", async (req, res) => {
    try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const data = await prisma.personStatusHistory.findMany({
            where: {
                oldStatus: 0,
                newStatus: 1,
                changedAt: {
                    gte: start,
                    lte: end,
                },
            },
            include: {
                person: {
                    select: {
                        personId: true,
                        fullName: true,
                        citizenId: true,
                        fingerprintDate: true,
                    },
                },
            },
            orderBy: {
                changedAt: "desc",
            },
        });

        res.json({
            total: data.length,
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.get("/date/:date", async (req, res) => {
  try {
    const { date } = req.params;

    const data = await prisma.personStatusHistory.findMany({
      where: {
        oldStatus: 0,
        newStatus: 1,
        changedAt: {
          gte: new Date(`${date}T00:00:00.000Z`),
          lt: new Date(`${date}T23:59:59.999Z`),
        },
      },
      include: {
        person: true,
      },
      orderBy: {
        changedAt: "desc",
      },
    });

    res.json({
      date,
      total: data.length,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/debug", async (req, res) => {
  const data = await prisma.personStatusHistory.findMany({
    include: {
      person: true,
    },
    orderBy: {
      changedAt: "desc",
    },
    take: 20,
  });

  res.json(data);
});

export default router;