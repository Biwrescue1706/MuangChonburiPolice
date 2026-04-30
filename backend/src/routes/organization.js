import express from "express";
import prisma from "../prisma.js";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

/* ================= SUPABASE ================= */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY // หรือ SERVICE_ROLE_KEY ก็ได้ แต่ต้องตรงกับ env
);

/* ================= MULTER ================= */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

/* ================= UTIL ================= */
function buildFullName({ firstName, lastName, rank }) {
  const fullName = `${firstName || ""} ${lastName || ""}`.trim();
  const fullNameWithRank = rank
    ? `${rank}${firstName || ""} ${lastName || ""}`.trim()
    : fullName;

  return { fullName, fullNameWithRank };
}

/* ================= ORGANIZATION ================= */

// GET ALL
router.get("/", async (req, res) => {
  try {
    const data = await prisma.organization.findMany({
      include: { commander: true, finance: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(data);
  } catch {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const data = await prisma.organization.findUnique({
      where: { organizationId: req.params.id },
      include: { commander: true, finance: true },
    });
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// UPDATE ORG
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existing = await prisma.organization.findUnique({
      where: { organizationId: id },
    });

    if (!existing) {
      return res.status(404).json({ error: "Organization not found" });
    }

    const clean = {};
    for (const key in data) {
      if (data[key] !== "" && data[key] !== null && data[key] !== undefined) {
        clean[key] = data[key];
      }
    }

    const name = buildFullName({
      firstName: clean.firstName ?? existing.firstName,
      lastName: clean.lastName ?? existing.lastName,
      rank: clean.rank ?? existing.rank,
    });

    clean.fullName = name.fullName;
    clean.fullNameWithRank = name.fullNameWithRank;

    const result = await prisma.organization.update({
      where: { organizationId: id },
      data: clean,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});

/* ================= COMMANDER ================= */

// GET
router.get("/:id/commander", async (req, res) => {
  try {
    const data = await prisma.organizationCommander.findUnique({
      where: { organizationId: req.params.id },
    });
    res.json(data);
  } catch {
    res.status(500).json({ error: "Fetch commander failed" });
  }
});

// PATCH
router.patch("/:id/commander", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const name = buildFullName(data);

    const result = await prisma.organizationCommander.upsert({
      where: { organizationId: id },
      update: {
        ...data,
        fullName: name.fullName,
        fullNameWithRank: name.fullNameWithRank,
      },
      create: {
        organizationId: id,
        ...data,
        fullName: name.fullName,
        fullNameWithRank: name.fullNameWithRank,
      },
    });

    res.json(result);
  } catch (err) {
    console.error("COMMANDER ERROR:", err);
    res.status(500).json({ error: "Update commander failed" });
  }
});

/* ================= UPLOAD SIGNATURE ================= */

router.post(
  "/:id/upload-signature",
  upload.single("file"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      if (!file.mimetype.startsWith("image/")) {
        return res.status(400).json({ error: "Only image allowed" });
      }

      // เช็ค org
      const org = await prisma.organization.findUnique({
        where: { organizationId: id },
      });

      if (!org) {
        return res.status(404).json({ error: "Organization not found" });
      }

      // ลบรูปเก่า (จาก commander)
      const existingCommander =
        await prisma.organizationCommander.findUnique({
          where: { organizationId: id },
        });

      if (existingCommander?.signatureImage) {
        try {
          const oldPath =
            existingCommander.signatureImage.split("/signatures/")[1];
          if (oldPath) {
            await supabase.storage.from("signatures").remove([oldPath]);
          }
        } catch (e) {
          console.warn("Delete old image fail:", e.message);
        }
      }

      // ตั้งชื่อไฟล์
      const ext = file.mimetype.split("/")[1];
      const fileName = `signature_${id}_${Date.now()}.${ext}`;

      // upload
      const { error } = await supabase.storage
        .from("signatures")
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) throw error;

      // get url
      const { data } = supabase.storage
        .from("signatures")
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;

      // ✅ save ไป commander (สำคัญ!)
      await prisma.organizationCommander.upsert({
        where: { organizationId: id },
        update: {
          signatureImage: publicUrl,
        },
        create: {
          organizationId: id,
          signatureImage: publicUrl,
        },
      });

      res.json({
        message: "Upload success",
        url: publicUrl,
      });
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

/* ================= FINANCE ================= */

router.get("/:id/finance", async (req, res) => {
  try {
    const data = await prisma.organizationFinance.findUnique({
      where: { organizationId: req.params.id },
    });
    res.json(data);
  } catch {
    res.status(500).json({ error: "Fetch finance failed" });
  }
});

router.patch("/:id/finance", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const name = buildFullName(data);

    const result = await prisma.organizationFinance.upsert({
      where: { organizationId: id },
      update: {
        ...data,
        fullName: name.fullName,
        fullNameWithRank: name.fullNameWithRank,
      },
      create: {
        organizationId: id,
        ...data,
        fullName: name.fullName,
        fullNameWithRank: name.fullNameWithRank,
      },
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update finance failed" });
  }
});

export default router;