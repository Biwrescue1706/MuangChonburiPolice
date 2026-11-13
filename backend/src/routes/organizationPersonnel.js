
import express from "express";
import neonPrisma from "../neon.js";

const router = express.Router();

// ดึงข้อมูลเจ้าหน้าที่ทั้งหมด
router.get("/", async (req, res) => {
    try {
        const personnel = await neonPrisma.organizationpersonnel.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        res.json(personnel);
    } catch (error) {
        console.error("Get Organization Personnel Error:", error);
        res.status(500).json({ message: "ไม่สามารถดึงข้อมูลเจ้าหน้าที่ได้" });
    }
});

// ดึงข้อมูลเจ้าหน้าที่รายบุคคล
router.get("/:id", async (req, res) => {
    try {
        const personnel = await neonPrisma.organizationpersonnel.findUnique({
            where: {
                personnelId: req.params.id,
            },
        });

        if (!personnel) {
            return res.status(404).json({ message: "ไม่พบข้อมูลเจ้าหน้าที่" });
        }

        res.json(personnel);
    } catch (error) {
        console.error("Get Personnel Detail Error:", error);
        res.status(500).json({ message: "ไม่สามารถดึงข้อมูลได้" });
    }
});

// เพิ่มข้อมูลเจ้าหน้าที่
router.post("/", async (req, res) => {
    try {
        const {
            rank,
            firstName,
            lastName,
            position,
            duty,
            phone,
        } = req.body;

        if (!firstName?.trim() || !lastName?.trim()) {
            return res.status(400).json({
                message: "กรุณากรอกชื่อและนามสกุล",
            });
        }

        const fullName = `${firstName.trim()} ${lastName.trim()}`;
        const fullNameWithRank = rank?.trim()
            ? `${rank.trim()} ${fullName}`
            : fullName;

        const personnel = await neonPrisma.organizationpersonnel.create({
            data: {
                rank: rank?.trim() || null,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                fullName,
                fullNameWithRank,
                position: position?.trim() || null,
                duty: duty?.trim() || null,
                phone: phone?.trim() || null,
            },
        });

        res.status(201).json({
            message: "เพิ่มข้อมูลเจ้าหน้าที่สำเร็จ",
            data: personnel,
        });
    } catch (error) {
        console.error("Create Personnel Error:", error);
        res.status(500).json({ message: "ไม่สามารถเพิ่มข้อมูลได้" });
    }
});

// แก้ไขข้อมูลเจ้าหน้าที่
router.put("/:id", async (req, res) => {
    try {
        const {
            rank,
            firstName,
            lastName,
            position,
            duty,
            phone,
        } = req.body;

        const existing = await neonPrisma.organizationpersonnel.findUnique({
            where: {
                personnelId: req.params.id,
            },
        });

        if (!existing) {
            return res.status(404).json({ message: "ไม่พบข้อมูลเจ้าหน้าที่" });
        }

        const updatedFirstName = firstName?.trim() ?? existing.firstName;
        const updatedLastName = lastName?.trim() ?? existing.lastName;
        const updatedRank = rank !== undefined
            ? rank?.trim() || null
            : existing.rank;

        const fullName = `${updatedFirstName} ${updatedLastName}`;
        const fullNameWithRank = updatedRank
            ? `${updatedRank} ${fullName}`
            : fullName;

        const personnel = await neonPrisma.organizationpersonnel.update({
            where: {
                personnelId: req.params.id,
            },
            data: {
                rank: updatedRank,
                firstName: updatedFirstName,
                lastName: updatedLastName,
                fullName,
                fullNameWithRank,
                ...(position !== undefined && {
                    position: position?.trim() || null,
                }),
                ...(duty !== undefined && {
                    duty: duty?.trim() || null,
                }),
                ...(phone !== undefined && {
                    phone: phone?.trim() || null,
                }),
            },
        });

        res.json({
            message: "แก้ไขข้อมูลเจ้าหน้าที่สำเร็จ",
            data: personnel,
        });
    } catch (error) {
        console.error("Update Personnel Error:", error);
        res.status(500).json({ message: "ไม่สามารถแก้ไขข้อมูลได้" });
    }
});

// ลบข้อมูลเจ้าหน้าที่
router.delete("/:id", async (req, res) => {
    try {
        const existing = await neonPrisma.organizationpersonnel.findUnique({
            where: {
                personnelId: req.params.id,
            },
        });

        if (!existing) {
            return res.status(404).json({ message: "ไม่พบข้อมูลเจ้าหน้าที่" });
        }

        await neonPrisma.organizationpersonnel.delete({
            where: {
                personnelId: req.params.id,
            },
        });

        res.json({ message: "ลบข้อมูลเจ้าหน้าที่สำเร็จ" });
    } catch (error) {
        console.error("Delete Personnel Error:", error);
        res.status(500).json({ message: "ไม่สามารถลบข้อมูลได้" });
    }
});

export default router;
