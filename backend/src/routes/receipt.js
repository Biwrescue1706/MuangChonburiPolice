// src/routes/receipt.js
import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

/* ================= GET LATEST RECEIPT ================= */
router.get("/latest", async (req, res) => {
  try {
    // 👉 ดึงเลขเล่มทั้งหมด (ไม่ซ้ำ)
    const books = await prisma.receipt.findMany({
      select: { receiptBookNo: true },
      distinct: ["receiptBookNo"],
    });

    if (!books.length) {
      return res.json({
        bookNo: null,
        usedNumbers: [],
      });
    }

    // 👉 หาเล่มล่าสุดจาก "เลข"
    const latestBookNo = books
      .map((b) => Number(b.receiptBookNo))
      .filter((n) => !isNaN(n))
      .sort((a, b) => b - a)[0]
      ?.toString()
      .padStart(5, "0");

    // 👉 ดึงเลขที่ใช้ในเล่มนั้น
    const receipts = await prisma.receipt.findMany({
      where: { receiptBookNo: latestBookNo },
      select: { receiptNo: true },
    });

    const usedNumbers = receipts
      .map((r) => Number(r.receiptNo))
      .filter((n) => !isNaN(n))
      .sort((a, b) => a - b); // เรียงเลขสวย ๆ

    res.json({
      bookNo: latestBookNo,
      usedNumbers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      bookNo: null,
      usedNumbers: [],
    });
  }
});

/* ================= GET USED BY BOOK ================= */
router.get("/used/:bookNo", async (req, res) => {
  try {
    const { bookNo } = req.params;

    const receipts = await prisma.receipt.findMany({
      where: { receiptBookNo: bookNo },
      select: { receiptNo: true },
    });

    const usedNumbers = receipts
      .map((r) => Number(r.receiptNo))
      .filter((n) => !isNaN(n))
      .sort((a, b) => a - b);

    res.json({ usedNumbers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ usedNumbers: [] });
  }
});

/* ================= GET ALL ================= */
router.get("/all", async (req, res) => {
  try {
    const receipts = await prisma.receipt.findMany();

    const sorted = receipts.sort((a, b) => {
      const bookA = Number(a.receiptBookNo || 0);
      const bookB = Number(b.receiptBookNo || 0);

      if (bookA !== bookB) return bookA - bookB;

      return Number(a.receiptNo || 0) - Number(b.receiptNo || 0);
    });

    res.json({
      success: true,
      data: sorted,
      total: sorted.length,
    });
  } catch (err) {
    console.error("ERROR /receipt/all:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* ================= GET BY ID ================= */
router.get("/:id", async (req, res) => {
  try {
    const receipt = await prisma.receipt.findUnique({
      where: { receiptId: req.params.id },
    });

    if (!receipt) {
      return res.status(404).json({
        success: false,
        error: "ไม่พบข้อมูลใบเสร็จ",
      });
    }

    res.json({
      success: true,
      data: receipt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "ดึงข้อมูลไม่สำเร็จ",
    });
  }
});

export default router;