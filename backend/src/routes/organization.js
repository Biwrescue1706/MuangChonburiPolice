import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

/* ================= UTIL ================= */

function buildFullName({ firstName, lastName, rank }) {
    const fullName = `${firstName} ${lastName}`;
    const fullNameWithRank = rank
        ? `${rank}${firstName} ${lastName}`
        : fullName;

    return { fullName, fullNameWithRank };
}

/* ================= READ ALL ================= */
router.get("/", async (req, res) => {
    try {
        const organizations = await prisma.organization.findMany({
            orderBy: { createdAt: "desc" },
        });

        res.json(organizations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fetch organizations failed" });
    }
});

router.get("/key/:key", async (req, res) => {
  try {
    const org = await prisma.organization.findFirst({
      where: { key: req.params.key },
    });

    if (!org) {
      return res.status(404).json({ error: "ไม่พบหน่วยงาน" });
    }

    res.json({ success: true, data: org });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "โหลดข้อมูลไม่สำเร็จ" });
  }
});

/* ================= READ ONE ================= */
router.get("/:id", async (req, res) => {
    try {
        const organization = await prisma.organization.findUnique({
            where: { organizationId: req.params.id },
        });

        if (!organization) {
            return res.status(404).json({ error: "Organization not found" });
        }

        res.json(organization);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fetch organization failed" });
    }
});

/* ================= UPDATE ================= */
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

    /* ================= CLEAN DATA ================= */
    const updateData = {};
    for (const key in data) {
      if (data[key] !== "" && data[key] !== undefined && data[key] !== null) {
        updateData[key] = data[key];
      }
    }

    /* ================= BUILD NAME ================= */
    const mainName = buildFullName({
      firstName: updateData.firstName ?? existing.firstName,
      lastName: updateData.lastName ?? existing.lastName,
      rank: updateData.rank ?? existing.rank,
    });

    updateData.fullName = mainName.fullName;
    updateData.fullNameWithRank = mainName.fullNameWithRank;

    /* ================= COMMANDER ================= */
    if (
      updateData.commanderFirstName ||
      updateData.commanderLastName ||
      updateData.commanderRank
    ) {
      const commander = buildFullName({
        firstName:
          updateData.commanderFirstName ?? existing.commanderFirstName,
        lastName:
          updateData.commanderLastName ?? existing.commanderLastName,
        rank: updateData.commanderRank ?? existing.commanderRank,
      });

      updateData.commanderFullName = commander.fullName;
      updateData.commanderFullNameWithRank =
        commander.fullNameWithRank;
    }

    /* ================= FINANCE ================= */
    if (
      updateData.financeFirstName ||
      updateData.financeLastName ||
      updateData.financeRank
    ) {
      const finance = buildFullName({
        firstName:
          updateData.financeFirstName ?? existing.financeFirstName,
        lastName:
          updateData.financeLastName ?? existing.financeLastName,
        rank: updateData.financeRank ?? existing.financeRank,
      });

      updateData.financeFullName = finance.fullName;
      updateData.financeFullNameWithRank =
        finance.fullNameWithRank;
    }

    /* ================= TRANSACTION ================= */
    const result = await prisma.$transaction(async (tx) => {
      const organization = await tx.organization.update({
        where: { organizationId: id },
        data: updateData,
      });

      await tx.person.updateMany({
        where: { organizationId: id },
        data: {
          organizationName: organization.organizationName,
          fullNameOrg: organization.fullName,
          rank: organization.rank,
          position: organization.position,
          fullNameWithRank: organization.fullNameWithRank,
        },
      });

      await tx.receipt.updateMany({
        where: { organizationId: id },
        data: {
          organizationName: organization.organizationName,
          fullNameOrg: organization.fullName,
          rank: organization.rank,
          position: organization.position,
          fullNameWithRank: organization.fullNameWithRank,
        },
      });

      return organization;
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Update organization failed" });
  }
});

export default router;