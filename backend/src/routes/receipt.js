import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

//////////////////////////////////////////////////////
// GET LATEST RECEIPT
//////////////////////////////////////////////////////

router.get("/latest", async (req, res) => {
  try {
    const receipt = await prisma.receipt.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!receipt) {
      return res.json({
        success: true,
        data: null,
      });
    }

    res.json({
      success: true,
      data: receipt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "โหลดใบเสร็จล่าสุดไม่สำเร็จ" });
  }
});

export default router;