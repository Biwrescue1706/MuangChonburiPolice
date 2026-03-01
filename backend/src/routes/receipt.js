import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

// GET LATEST RECEIPT
router.get("/latest", async (req, res) => {
  try {
    const latestReceipt = await prisma.receipt.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!latestReceipt) {
      return res.json({
        bookNo: null,
        usedNumbers: [],
      });
    }

    const receipts = await prisma.receipt.findMany({
      where: { receiptBookNo: latestReceipt.receiptBookNo },
      select: { receiptNo: true },
    });

    const usedNumbers = receipts
      .map((r) => Number(r.receiptNo))
      .filter((n) => !isNaN(n));

    res.json({
      bookNo: latestReceipt.receiptBookNo,
      usedNumbers,
    });
  } catch (err) {
    res.status(500).json({
      bookNo: null,
      usedNumbers: [],
    });
  }
});

router.get("/used/:bookNo", async (req, res) => {
    try {
        const { bookNo } = req.params;

        const receipts = await prisma.receipt.findMany({
            where: { receiptBookNo: bookNo },
            select: { receiptNo: true },
        });

        const usedNumbers = receipts
            .map((r) => Number(r.receiptNo))
            .filter((n) => !isNaN(n));

        res.json({ usedNumbers });
    } catch (err) {
        res.status(500).json({ usedNumbers: [] });
    }
});

export default router;