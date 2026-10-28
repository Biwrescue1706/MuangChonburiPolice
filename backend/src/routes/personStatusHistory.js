
// src/routes/statusHistory.js
import { Router } from "express";
import neonPrisma from "../neon.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

const TIME_ZONE_OFFSET = 7 * 60 * 60 * 1000;
const MAX_RANGE_DAYS = 366;

// Require authentication for all status history endpoints.
router.use(authMiddleware);

// Parse YYYY-MM-DD strictly.
function parseDateString(value) {
  if (typeof value !== "string") return null;

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const check = new Date(Date.UTC(year, month - 1, day));

  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    return null;
  }

  return { year, month, day };
}

// Convert a Thai local calendar date to its UTC start instant.
function bangkokDayStart(value) {
  const parsed = parseDateString(value);
  if (!parsed) return null;

  return new Date(
    Date.UTC(
      parsed.year,
      parsed.month - 1,
      parsed.day
    ) - TIME_ZONE_OFFSET
  );
}

// Use an exclusive end boundary to avoid millisecond edge cases.
function getDateRange(startDate, endDate) {
  const start = bangkokDayStart(startDate);
  const endStart = bangkokDayStart(endDate);

  if (!start || !endStart) return null;
  if (start > endStart) return null;

  const days =
    (endStart.getTime() - start.getTime()) /
    (24 * 60 * 60 * 1000);

  if (days > MAX_RANGE_DAYS - 1) return null;

  return {
    gte: start,
    lt: new Date(endStart.getTime() + 24 * 60 * 60 * 1000),
  };
}

// Format the current date in Asia/Bangkok.
function getTodayBangkok() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

// Shared query for people whose status changed from 0 to 1.
async function findSubmittedPeople(dateRange, includeFullPerson = false) {
  return neonPrisma.personStatusHistory.findMany({
    where: {
      oldStatus: 0,
      newStatus: 1,
      changedAt: dateRange,
    },
    include: {
      person: includeFullPerson
        ? true
        : {
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
}

// GET /today - today's submitted people in Thailand.
router.get("/today", async (req, res) => {
  try {
    const today = getTodayBangkok();
    const range = getDateRange(today, today);

    const data = await findSubmittedPeople(range);

    return res.json({
      total: data.length,
      data,
    });
  } catch (error) {
    console.error(
      "[statusHistory/today]",
      error.code || error.name || "Error"
    );

    return res.status(500).json({
      message: "ดึงประวัติวันนี้ไม่สำเร็จ",
    });
  }
});

// GET /date/:date - history for a specific Bangkok calendar date.
router.get("/date/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const range = getDateRange(date, date);

    if (!range) {
      return res.status(400).json({
        message: "รูปแบบวันที่ไม่ถูกต้อง กรุณาใช้ YYYY-MM-DD",
      });
    }

    const data = await findSubmittedPeople(range, true);

    return res.json({
      date,
      total: data.length,
      data,
    });
  } catch (error) {
    console.error(
      "[statusHistory/date]",
      error.code || error.name || "Error"
    );

    return res.status(500).json({
      message: "ดึงประวัติตามวันที่ไม่สำเร็จ",
    });
  }
});

// GET /debug - most recent history records.
// Keep this endpoint authenticated; restrict it further if needed.
router.get("/debug", async (req, res) => {
  try {
    const data = await neonPrisma.personStatusHistory.findMany({
      include: {
        person: true,
      },
      orderBy: {
        changedAt: "desc",
      },
      take: 20,
    });

    return res.json(data);
  } catch (error) {
    console.error(
      "[statusHistory/debug]",
      error.code || error.name || "Error"
    );

    return res.status(500).json({
      message: "ดึงข้อมูลประวัติไม่สำเร็จ",
    });
  }
});

// GET /range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
router.get("/range", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (
      typeof startDate !== "string" ||
      typeof endDate !== "string"
    ) {
      return res.status(400).json({
        message: "กรุณาระบุ startDate และ endDate",
      });
    }

    const range = getDateRange(startDate, endDate);

    if (!range) {
      return res.status(400).json({
        message:
          "ช่วงวันที่ไม่ถูกต้อง ต้องใช้ YYYY-MM-DD และไม่เกิน 366 วัน",
      });
    }

    const data = await findSubmittedPeople(range, true);

    return res.json({
      startDate,
      endDate,
      total: data.length,
      data,
    });
  } catch (error) {
    console.error(
      "[statusHistory/range]",
      error.code || error.name || "Error"
    );

    return res.status(500).json({
      message: "ดึงประวัติตามช่วงวันที่ไม่สำเร็จ",
    });
  }
});

export default router;
