// routes/statusHistory.js
import { Router } from "express";
import neonPrisma from "../neon.js";

const router = Router();

// วันนี้ส่งกี่คน + รายชื่อ
router.get("/today", async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const data =
      await neonPrisma.personStatusHistory.findMany({
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
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ดูตามวันที่
router.get("/date/:date", async (req, res) => {
  try {
    const { date } = req.params;

    const data =
      await neonPrisma.personStatusHistory.findMany({
        where: {
          oldStatus: 0,
          newStatus: 1,
          changedAt: {
            gte: new Date(
              `${date}T00:00:00.000Z`
            ),
            lt: new Date(
              `${date}T23:59:59.999Z`
            ),
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
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Debug
router.get("/debug", async (req, res) => {
  try {
    const data =
      await neonPrisma.personStatusHistory.findMany({
        include: {
          person: true,
        },
        orderBy: {
          changedAt: "desc",
        },
        take: 20,
      });

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ดูข้อมูลตามช่วงวันที่
router.get("/range", async (req, res) => {
  try {
    const {
      startDate,
      endDate,
    } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message:
          "กรุณาระบุ startDate และ endDate",
      });
    }

    const start = new Date(
      startDate
    );
    start.setHours(0, 0, 0, 0);

    const end = new Date(
      endDate
    );
    end.setHours(23, 59, 59, 999);

    const data =
      await neonPrisma.personStatusHistory.findMany({
        where: {
          oldStatus: 0,
          newStatus: 1,
          changedAt: {
            gte: start,
            lte: end,
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
      startDate,
      endDate,
      total: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;