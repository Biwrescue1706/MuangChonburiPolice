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

    // 🔥 filter ค่า ""
    let updateData = {};
    Object.keys(data).forEach((key) => {
      if (data[key] !== "" && data[key] !== undefined) {
        updateData[key] = data[key];
      }
    });

    // 🔥 rebuild name เสมอ
    const { fullName, fullNameWithRank } = buildFullName({
      firstName: updateData.firstName ?? existing.firstName,
      lastName: updateData.lastName ?? existing.lastName,
      rank: updateData.rank ?? existing.rank,
    });

    updateData.fullName = fullName;
    updateData.fullNameWithRank = fullNameWithRank;

    const organization = await prisma.organization.update({
      where: { organizationId: id },
      data: updateData,
    });

    await prisma.person.updateMany({
      where: { organizationId: id },
      data: {
        organizationName: organization.organizationName,
        fullNameOrg: organization.fullName,
        rank: organization.rank,
        position: organization.position,
        fullNameWithRank: organization.fullNameWithRank,
      },
    });

    await prisma.receipt.updateMany({
      where: { organizationId: id },
      data: {
        organizationName: organization.organizationName,
        fullNameOrg: organization.fullName,
        rank: organization.rank,
        position: organization.position,
        fullNameWithRank: organization.fullNameWithRank,
      },
    });

    res.json(organization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Update organization failed" });
  }
});

export default router;