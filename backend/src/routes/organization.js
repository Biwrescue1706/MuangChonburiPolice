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

        let updateData = { ...data };

        // rebuild fullName
        if (data.firstName || data.lastName || data.rank) {
            const { fullName, fullNameWithRank } = buildFullName({
                firstName: data.firstName ?? existing.firstName,
                lastName: data.lastName ?? existing.lastName,
                rank: data.rank ?? existing.rank,
            });

            updateData.fullName = fullName;
            updateData.fullNameWithRank = fullNameWithRank;
        }

        // check key ซ้ำ
        if (data.key && data.key !== existing.key) {
            const existKey = await prisma.organization.findUnique({
                where: { key: data.key },
            });

            if (existKey) {
                return res.status(400).json({ error: "Key already exists" });
            }
        }

        const organization = await prisma.organization.update({
            where: { organizationId: id },
            data: updateData,
        });

        // 🔥 SYNC ไป person + receipt
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