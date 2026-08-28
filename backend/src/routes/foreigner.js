// src/routes/foreigner.js

import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

/* ======================================================
   GET ALL
   GET /api/foreigner
====================================================== */

router.get("/", async (req, res) => {
    try {
        const {
            search,
            nationality,
            province,
            year,
        } = req.query;

        const where = {};

        // ================= SEARCH =================

        if (search?.trim()) {
            where.OR = [
                {
                    foreignerIdNo: {
                        contains: search.trim(),
                        mode: "insensitive",
                    },
                },
                {
                    name: {
                        contains: search.trim(),
                        mode: "insensitive",
                    },
                },
                {
                    certificateRegistrationNo: {
                        contains: search.trim(),
                        mode: "insensitive",
                    },
                },
                {
                    certificateNo: {
                        contains: search.trim(),
                        mode: "insensitive",
                    },
                },
                {
                    receiptNo: {
                        contains: search.trim(),
                        mode: "insensitive",
                    },
                },
            ];
        }

        // ================= NATIONALITY =================

        if (nationality?.trim()) {
            where.nationality = {
                contains: nationality.trim(),
                mode: "insensitive",
            };
        }

        // ================= PROVINCE =================

        if (province?.trim()) {
            where.province = {
                contains: province.trim(),
                mode: "insensitive",
            };
        }

        // ================= YEAR =================

        if (year !== undefined && year !== "") {
            const yearNumber = Number(year);

            if (!Number.isNaN(yearNumber)) {
                where.year = yearNumber;
            }
        }

        // ================= GET =================

        const data = await prisma.foreigner.findMany({
            where,

            orderBy: [
                {
                    year: "desc",
                },
                {
                    sequenceNo: "asc",
                },
            ],
        });

        return res.json({
            success: true,
            data,
            total: data.length,
        });
    } catch (err) {
        console.error("GET FOREIGNER ERROR:", err);

        return res.status(500).json({
            success: false,
            error: "ดึงข้อมูลคนต่างด้าวไม่สำเร็จ",
        });
    }
});

/* ======================================================
   GET BY ID
   GET /api/foreigner/:id
====================================================== */

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

        return res.json({
            success: true,
            data,
        });
    } catch (err) {
        console.error("GET FOREIGNER BY ID ERROR:", err);

        return res.status(500).json({
            success: false,
            error: "ดึงข้อมูลไม่สำเร็จ",
        });
    }
});

/* ======================================================
   CREATE
   POST /api/foreigner

   sequenceNo รัน +1 แยกตามปี

   2569
   1
   2
   3

   2570
   1
   2
====================================================== */

router.post("/", async (req, res) => {
    try {
        const data = req.body;

        // ================= YEAR =================

        if (
            data.year === undefined ||
            data.year === null ||
            data.year === ""
        ) {
            return res.status(400).json({
                success: false,
                error: "กรุณาระบุปี พ.ศ.",
            });
        }

        const year = Number(data.year);

        if (
            Number.isNaN(year) ||
            !Number.isInteger(year)
        ) {
            return res.status(400).json({
                success: false,
                error: "ปี พ.ศ. ไม่ถูกต้อง",
            });
        }

        // ================= NAME =================

        if (
            !data.name ||
            !String(data.name).trim()
        ) {
            return res.status(400).json({
                success: false,
                error: "กรุณากรอกชื่อ แซ่",
            });
        }

        const name = String(data.name).trim();

        // ================= AGE =================

        if (
            data.age === undefined ||
            data.age === null ||
            data.age === ""
        ) {
            return res.status(400).json({
                success: false,
                error: "กรุณากรอกอายุ",
            });
        }

        const age = Number(data.age);

        if (
            Number.isNaN(age) ||
            !Number.isInteger(age) ||
            age < 0
        ) {
            return res.status(400).json({
                success: false,
                error: "อายุไม่ถูกต้อง",
            });
        }

        // ==================================================
        // TRANSACTION
        // ==================================================

        const foreigner = await prisma.$transaction(
            async (tx) => {
                // ===============================
                // หาเลขล่าสุดของปีนั้น
                // ===============================

                const last = await tx.foreigner.findFirst({
                    where: {
                        year,
                    },

                    orderBy: {
                        sequenceNo: "desc",
                    },

                    select: {
                        sequenceNo: true,
                    },
                });

                // ===============================
                // สร้างเลขลำดับใหม่
                // ===============================

                const sequenceNo =
                    (last?.sequenceNo ?? 0) + 1;

                // ===============================
                // CREATE
                // ===============================

                return await tx.foreigner.create({
                    data: {
                        // ===============================
                        // ลำดับ
                        // ===============================

                        sequenceNo,
                        year,

                        // ===============================
                        // ข้อมูลบุคคล
                        // ===============================

                        foreignerIdNo:
                            data.foreignerIdNo
                                ? String(
                                    data.foreignerIdNo
                                ).trim()
                                : null,

                        name,

                        age,

                        nationality:
                            data.nationality
                                ? String(
                                    data.nationality
                                ).trim()
                                : null,

                        ethnicity:
                            data.ethnicity
                                ? String(
                                    data.ethnicity
                                ).trim()
                                : null,

                        // ===============================
                        // ใบสำคัญ
                        // ===============================

                        certificateRegistrationNo:
                            data.certificateRegistrationNo
                                ? String(
                                    data.certificateRegistrationNo
                                ).trim()
                                : null,

                        // เก็บเป็น String
                        certificateDate:
                            data.certificateDate
                                ? String(
                                    data.certificateDate
                                )
                                : null,

                        // ===============================
                        // ออกให้ ณ
                        // ===============================

                        district:
                            data.district
                                ? String(
                                    data.district
                                ).trim()
                                : null,

                        province:
                            data.province
                                ? String(
                                    data.province
                                ).trim()
                                : null,

                        // ===============================
                        // ภูมิลำเนา
                        // ===============================

                        domicile:
                            data.domicile
                                ? String(
                                    data.domicile
                                ).trim()
                                : null,

                        // ===============================
                        // การขอรับ
                        // ===============================

                        applicationType:
                            data.applicationType
                                ? String(
                                    data.applicationType
                                ).trim()
                                : null,

                        // เก็บเป็น String
                        applicationDate:
                            data.applicationDate
                                ? String(
                                    data.applicationDate
                                )
                                : null,

                        // เก็บเป็น String
                        expirationDate:
                            data.expirationDate
                                ? String(
                                    data.expirationDate
                                )
                                : null,

                        // ===============================
                        // ค่าธรรมเนียม
                        // ===============================

                        amount:
                            data.amount !== undefined &&
                                data.amount !== null &&
                                data.amount !== ""
                                ? Number(data.amount)
                                : null,

                        // ===============================
                        // ใบเสร็จ
                        // ===============================

                        receiptBookNo:
                            data.receiptBookNo
                                ? String(
                                    data.receiptBookNo
                                ).trim()
                                : null,

                        receiptNo:
                            data.receiptNo
                                ? String(
                                    data.receiptNo
                                ).trim()
                                : null,

                        // เก็บเป็น String
                        receiptDate:
                            data.receiptDate
                                ? String(
                                    data.receiptDate
                                )
                                : null,

                        // ===============================
                        // ใบสำคัญ
                        // ===============================

                        certificateNo:
                            data.certificateNo
                                ? String(
                                    data.certificateNo
                                ).trim()
                                : null,

                        // ===============================
                        // วันที่ยื่นคำร้อง
                        // ===============================

                        petitionDate:
                            data.petitionDate
                                ? new Date(
                                    data.petitionDate
                                )
                                : null,
                    },
                });
            }
        );

        console.log(
            `CREATE FOREIGNER: ${foreigner.name} | ปี ${foreigner.year} | ลำดับ ${foreigner.sequenceNo}`
        );

        return res.status(201).json({
            success: true,
            data: foreigner,
        });
    } catch (err) {
        console.error(
            "CREATE FOREIGNER ERROR:",
            err
        );

        return res.status(500).json({
            success: false,
            error:
                err?.message ||
                "เพิ่มข้อมูลคนต่างด้าวไม่สำเร็จ",
        });
    }
});

/* ======================================================
   UPDATE
   PUT /api/foreigner/:id
====================================================== */

router.put("/:id", async (req, res) => {
    try {
        const data = req.body;

        // ================= FIND =================

        const existing =
            await prisma.foreigner.findUnique({
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

        // ================= YEAR =================

        let year = existing.year;

        if (
            data.year !== undefined &&
            data.year !== ""
        ) {
            year = Number(data.year);

            if (
                Number.isNaN(year) ||
                !Number.isInteger(year)
            ) {
                return res.status(400).json({
                    success: false,
                    error: "ปี พ.ศ. ไม่ถูกต้อง",
                });
            }
        }

        // ================= NAME =================

        let name = existing.name;

        if (data.name !== undefined) {
            name = String(data.name).trim();
        }

        if (!name) {
            return res.status(400).json({
                success: false,
                error: "กรุณากรอกชื่อ แซ่",
            });
        }

        // ================= AGE =================

        let age = existing.age;

        if (
            data.age !== undefined &&
            data.age !== ""
        ) {
            age = Number(data.age);

            if (
                Number.isNaN(age) ||
                !Number.isInteger(age) ||
                age < 0
            ) {
                return res.status(400).json({
                    success: false,
                    error: "อายุไม่ถูกต้อง",
                });
            }
        }

        // ================= UPDATE =================

        const foreigner =
            await prisma.foreigner.update({
                where: {
                    id: req.params.id,
                },

                data: {
                    // ปี
                    year,

                    // ไม่เปลี่ยนลำดับ
                    sequenceNo:
                        existing.sequenceNo,

                    // ===============================
                    // ข้อมูลบุคคล
                    // ===============================

                    foreignerIdNo:
                        data.foreignerIdNo !== undefined
                            ? data.foreignerIdNo || null
                            : existing.foreignerIdNo,

                    name,

                    age,

                    nationality:
                        data.nationality !== undefined
                            ? data.nationality || null
                            : existing.nationality,

                    ethnicity:
                        data.ethnicity !== undefined
                            ? data.ethnicity || null
                            : existing.ethnicity,

                    // ===============================
                    // ใบสำคัญ
                    // ===============================

                    certificateRegistrationNo:
                        data.certificateRegistrationNo !==
                            undefined
                            ? data.certificateRegistrationNo ||
                            null
                            : existing.certificateRegistrationNo,

                    certificateDate:
                        data.certificateDate !== undefined
                            ? data.certificateDate || null
                            : existing.certificateDate,

                    // ===============================
                    // ออกให้ ณ
                    // ===============================

                    district:
                        data.district !== undefined
                            ? data.district || null
                            : existing.district,

                    province:
                        data.province !== undefined
                            ? data.province || null
                            : existing.province,

                    // ===============================
                    // ภูมิลำเนา
                    // ===============================

                    domicile:
                        data.domicile !== undefined
                            ? data.domicile || null
                            : existing.domicile,

                    // ===============================
                    // การขอรับ
                    // ===============================

                    applicationType:
                        data.applicationType !== undefined
                            ? data.applicationType || null
                            : existing.applicationType,

                    applicationDate:
                        data.applicationDate !== undefined
                            ? data.applicationDate || null
                            : existing.applicationDate,

                    expirationDate:
                        data.expirationDate !== undefined
                            ? data.expirationDate || null
                            : existing.expirationDate,

                    // ===============================
                    // ค่าธรรมเนียม
                    // ===============================

                    amount:
                        data.amount !== undefined
                            ? data.amount !== null &&
                                data.amount !== ""
                                ? Number(data.amount)
                                : null
                            : existing.amount,

                    // ===============================
                    // ใบเสร็จ
                    // ===============================

                    receiptBookNo:
                        data.receiptBookNo !== undefined
                            ? data.receiptBookNo || null
                            : existing.receiptBookNo,

                    receiptNo:
                        data.receiptNo !== undefined
                            ? data.receiptNo || null
                            : existing.receiptNo,

                    receiptDate:
                        data.receiptDate !== undefined
                            ? data.receiptDate || null
                            : existing.receiptDate,

                    // ===============================
                    // ใบสำคัญ
                    // ===============================

                    certificateNo:
                        data.certificateNo !== undefined
                            ? data.certificateNo || null
                            : existing.certificateNo,

                    // ===============================
                    // วันที่ยื่นคำร้อง
                    // ===============================

                    petitionDate:
                        data.petitionDate !== undefined
                            ? data.petitionDate
                                ? new Date(
                                    data.petitionDate
                                )
                                : null
                            : existing.petitionDate,
                },
            });

        console.log(
            `UPDATE FOREIGNER: ${foreigner.id}`
        );

        return res.json({
            success: true,
            data: foreigner,
        });
    } catch (err) {
        console.error(
            "UPDATE FOREIGNER ERROR:",
            err
        );

        return res.status(500).json({
            success: false,
            error:
                err?.message ||
                "แก้ไขข้อมูลไม่สำเร็จ",
        });
    }
});

/* ======================================================
   DELETE
   DELETE /api/foreigner/:id
====================================================== */

router.delete("/:id", async (req, res) => {
    try {
        const existing =
            await prisma.foreigner.findUnique({
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

        console.log(
            `DELETE FOREIGNER: ${existing.name}`
        );

        return res.json({
            success: true,
            message: "ลบข้อมูลสำเร็จ",
        });
    } catch (err) {
        console.error(
            "DELETE FOREIGNER ERROR:",
            err
        );

        return res.status(500).json({
            success: false,
            error:
                err?.message ||
                "ลบข้อมูลไม่สำเร็จ",
        });
    }
});

export default router;