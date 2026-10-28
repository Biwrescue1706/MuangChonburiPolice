// src/routes/receipt.js
import express from "express";
import neonPrisma from "../neon.js";

const router = express.Router();

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const getUsedNumbers = (receipts) =>
  receipts
    .map((receipt) => toNumber(receipt.receiptNo))
    .filter((number) => number !== null)
    .sort((a, b) => a - b);

// GET LATEST RECEIPT BOOK AND USED NUMBERS
router.get("/latest", async (req, res) => {
  try {
    const books = await neonPrisma.receipt.findMany({
      select: {
        receiptBookNo: true,
      },
      distinct: ["receiptBookNo"],
    });

    const latestBookNo = books
      .map((book) => toNumber(book.receiptBookNo))
      .filter((number) => number !== null)
      .sort((a, b) => b - a)[0];

    if (latestBookNo === undefined) {
      return res.json({
        bookNo: null,
        usedNumbers: [],
      });
    }

    const bookNo = String(latestBookNo).padStart(5, "0");

    const receipts = await neonPrisma.receipt.findMany({
      where: {
        receiptBookNo: bookNo,
      },
      select: {
        receiptNo: true,
      },
    });

    return res.json({
      bookNo,
      usedNumbers: getUsedNumbers(receipts),
    });
  } catch (err) {
    console.error("GET /receipt/latest error:", err);

    return res.status(500).json({
      bookNo: null,
      usedNumbers: [],
      error: "ไม่สามารถดึงข้อมูลเล่มใบเสร็จล่าสุดได้",
    });
  }
});

// GET USED NUMBERS BY BOOK NUMBER
router.get("/used/:bookNo", async (req, res) => {
  try {
    const { bookNo } = req.params;

    if (!/^\d{1,5}$/.test(bookNo)) {
      return res.status(400).json({
        success: false,
        error: "เลขที่เล่มใบเสร็จไม่ถูกต้อง",
      });
    }

    const normalizedBookNo = bookNo.padStart(5, "0");

    const receipts = await neonPrisma.receipt.findMany({
      where: {
        receiptBookNo: normalizedBookNo,
      },
      select: {
        receiptNo: true,
      },
    });

    return res.json({
      usedNumbers: getUsedNumbers(receipts),
    });
  } catch (err) {
    console.error("GET /receipt/used/:bookNo error:", err);

    return res.status(500).json({
      usedNumbers: [],
      error: "ไม่สามารถดึงเลขใบเสร็จที่ใช้แล้วได้",
    });
  }
});

// GET ALL RECEIPTS
router.get("/all", async (req, res) => {
  try {
    const receipts = await neonPrisma.receipt.findMany({
      orderBy: [
        {
          receiptBookNo: "asc",
        },
        {
          receiptNo: "asc",
        },
      ],
    });

    return res.json({
      success: true,
      data: receipts,
      total: receipts.length,
    });
  } catch (err) {
    console.error("GET /receipt/all error:", err);

    return res.status(500).json({
      success: false,
      error: "ไม่สามารถดึงข้อมูลใบเสร็จได้",
    });
  }
});

// GET RECEIPT BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !id.trim()) {
      return res.status(400).json({
        success: false,
        error: "กรุณาระบุรหัสใบเสร็จ",
      });
    }

    const receipt = await neonPrisma.receipt.findUnique({
      where: {
        receiptId: id,
      },
    });

    if (!receipt) {
      return res.status(404).json({
        success: false,
        error: "ไม่พบข้อมูลใบเสร็จ",
      });
    }

    return res.json({
      success: true,
      data: receipt,
    });
  } catch (err) {
    console.error("GET /receipt/:id error:", err);

    return res.status(500).json({
      success: false,
      error: "ดึงข้อมูลไม่สำเร็จ",
    });
  }
});

export default router;