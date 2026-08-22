//src/routes/foreigner.js
// src/routes/foreigner.js
import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
    try {
        const { search, nationality, province } = req.query;
        const where = {};

        if (search) {
            where.OR = [
                {
                    foreignerIdNo: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    certificateRegistrationNo: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    certificateNo: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    receiptNo: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ];
        }

        if (nationality) {
            where.nationality = {
                contains: nationality,
                mode: "insensitive",
            };
        }

        if (province) {
            where.province = {
                contains: province,
                mode: "insensitive",
            };
        }

        const data = await prisma.foreigner.findMany({
            where,
            orderBy: {
                sequenceNo: "asc",
            },
        });

        res.json({
            success: true,
            data,
            total: data.length,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "ดึงข้อมูลคนต่างด้าวไม่สำเร็จ",
        });
    }
});

// GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const data = await prisma.foreigner.findUnique({
            where: {
                id: req.params.id,
            },
        });

        if (!data) {
            return res.status(404).json({
                success: false,
                error: "ไม่พบข้อมูลคนต่างด้าว",
            });
        }

        res.json({
            success: true,
            data,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "ดึงข้อมูลไม่สำเร็จ",
        });
    }
});

// CREATE
router.post("/", async (req, res) => {
    try {
        const data = req.body;

        const foreigner = await prisma.foreigner.create({
            data: {
                sequenceNo:
                    data.sequenceNo !== undefined
                        ? Number(data.sequenceNo)
                        : null,

                foreignerIdNo:
                    data.foreignerIdNo || null,

                name:
                    data.name || "",

                age:
                    data.age !== undefined && data.age !== ""
                        ? Number(data.age)
                        : null,

                nationality:
                    data.nationality || null,

                ethnicity:
                    data.ethnicity || null,

                certificateRegistrationNo:
                    data.certificateRegistrationNo || null,

                certificateDate:
                    data.certificateDate
                        ? new Date(data.certificateDate)
                        : null,

                district:
                    data.district || null,

                province:
                    data.province || null,

                domicile:
                    data.domicile || null,

                applicationDate:
                    data.applicationDate
                        ? new Date(data.applicationDate)
                        : null,

                expirationDate:
                    data.expirationDate
                        ? new Date(data.expirationDate)
                        : null,

                amount:
                    data.amount !== undefined && data.amount !== ""
                        ? data.amount
                        : null,

                receiptBookNo:
                    data.receiptBookNo || null,

                receiptNo:
                    data.receiptNo || null,

                receiptDate:
                    data.receiptDate
                        ? new Date(data.receiptDate)
                        : null,

                certificateNo:
                    data.certificateNo || null,

                petitionDate:
                    data.petitionDate
                        ? new Date(data.petitionDate)
                        : null,
            },
        });

        res.status(201).json({
            success: true,
            data: foreigner,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "เพิ่มข้อมูลคนต่างด้าวไม่สำเร็จ",
        });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const data = req.body;

        const existing = await prisma.foreigner.findUnique({
            where: {
                id: req.params.id,
            },
        });

        if (!existing) {
            return res.status(404).json({
                success: false,
                error: "ไม่พบข้อมูลคนต่างด้าว",
            });
        }

        const foreigner = await prisma.foreigner.update({
            where: {
                id: req.params.id,
            },
            data: {
                sequenceNo:
                    data.sequenceNo !== undefined
                        ? Number(data.sequenceNo)
                        : existing.sequenceNo,

                foreignerIdNo:
                    data.foreignerIdNo ??
                    existing.foreignerIdNo,

                name:
                    data.name ??
                    existing.name,

                age:
                    data.age !== undefined && data.age !== ""
                        ? Number(data.age)
                        : existing.age,

                nationality:
                    data.nationality ??
                    existing.nationality,

                ethnicity:
                    data.ethnicity ??
                    existing.ethnicity,

                certificateRegistrationNo:
                    data.certificateRegistrationNo ??
                    existing.certificateRegistrationNo,

                certificateDate:
                    data.certificateDate
                        ? new Date(data.certificateDate)
                        : existing.certificateDate,

                district:
                    data.district ??
                    existing.district,

                province:
                    data.province ??
                    existing.province,

                domicile:
                    data.domicile ??
                    existing.domicile,

                applicationDate:
                    data.applicationDate
                        ? new Date(data.applicationDate)
                        : existing.applicationDate,

                expirationDate:
                    data.expirationDate
                        ? new Date(data.expirationDate)
                        : existing.expirationDate,

                amount:
                    data.amount !== undefined && data.amount !== ""
                        ? data.amount
                        : existing.amount,

                receiptBookNo:
                    data.receiptBookNo ??
                    existing.receiptBookNo,

                receiptNo:
                    data.receiptNo ??
                    existing.receiptNo,

                receiptDate:
                    data.receiptDate
                        ? new Date(data.receiptDate)
                        : existing.receiptDate,

                certificateNo:
                    data.certificateNo ??
                    existing.certificateNo,

                petitionDate:
                    data.petitionDate
                        ? new Date(data.petitionDate)
                        : existing.petitionDate,
            },
        });

        res.json({
            success: true,
            data: foreigner,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "แก้ไขข้อมูลไม่สำเร็จ",
        });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const existing = await prisma.foreigner.findUnique({
            where: {
                id: req.params.id,
            },
        });

        if (!existing) {
            return res.status(404).json({
                success: false,
                error: "ไม่พบข้อมูลคนต่างด้าว",
            });
        }

        await prisma.foreigner.delete({
            where: {
                id: req.params.id,
            },
        });

        res.json({
            success: true,
            message: "ลบข้อมูลสำเร็จ",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "ลบข้อมูลไม่สำเร็จ",
        });
    }
});

export default router;