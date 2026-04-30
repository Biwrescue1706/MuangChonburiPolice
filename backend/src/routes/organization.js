import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

/* ================= UTIL ================= */
function buildFullName({ firstName, lastName, rank }) {
  const fullName = `${firstName || ""} ${lastName || ""}`.trim();
  const fullNameWithRank = rank
    ? `${rank}${firstName || ""} ${lastName || ""}`.trim()
    : fullName;

  return { fullName, fullNameWithRank };
}

/* ==== ORGANIZATION ==== */

// GET ALL
router.get("/", async (req, res) => {
  try {
    const data = await prisma.organization.findMany({
      include: {
        commander: true,
        finance: true
      },
      orderBy: { createdAt: "desc" }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// GET ONE (รวม commander + finance)
router.get("/:id", async (req, res) => {
  try {
    const data = await prisma.organization.findUnique({
      where: { organizationId: req.params.id },
      include: {
        commander: true,
        finance: true
      }
    });

    if (!data) return res.status(404).json({ error: "Not found" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// UPDATE ORGANIZATION ONLY
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existing = await prisma.organization.findUnique({
      where: { organizationId: id }
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
      rank: clean.rank ?? existing.rank
    });

    clean.fullName = name.fullName;
    clean.fullNameWithRank = name.fullNameWithRank;

    const result = await prisma.$transaction(async (tx) => {
      const org = await tx.organization.update({
        where: { organizationId: id },
        data: clean
      });

      // sync person
      await tx.person.updateMany({
        where: { organizationId: id },
        data: {
          organizationName: org.organizationName,
          fullNameOrg: org.fullName,
          rank: org.rank,
          position: org.position,
          fullNameWithRank: org.fullNameWithRank
        }
      });

      // sync receipt
      await tx.receipt.updateMany({
        where: { organizationId: id },
        data: {
          organizationName: org.organizationName,
          fullNameOrg: org.fullName,
          rank: org.rank,
          position: org.position,
          fullNameWithRank: org.fullNameWithRank
        }
      });

      return org;
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});

/* ==== COMMANDER ==== */

// GET
router.get("/:id/commander", async (req, res) => {
  try {
    const data = await prisma.organizationCommander.findUnique({
      where: { organizationId: req.params.id }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Fetch commander failed" });
  }
});

// CREATE / UPDATE
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
        fullNameWithRank: name.fullNameWithRank
      },
      create: {
        organizationId: id,
        ...data,
        fullName: name.fullName,
        fullNameWithRank: name.fullNameWithRank
      }
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update commander failed" });
  }
});

/* ==== FINANCE ==== */

// GET
router.get("/:id/finance", async (req, res) => {
  try {
    const data = await prisma.organizationFinance.findUnique({
      where: { organizationId: req.params.id }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Fetch finance failed" });
  }
});

// CREATE / UPDATE
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
        fullNameWithRank: name.fullNameWithRank
      },
      create: {
        organizationId: id,
        ...data,
        fullName: name.fullName,
        fullNameWithRank: name.fullNameWithRank
      }
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update finance failed" });
  }
});

export default router;