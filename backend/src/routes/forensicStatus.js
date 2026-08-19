import { Router } from "express";
import prisma from "../prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET รายการส่งตรวจตาม ID
|--------------------------------------------------------------------------
| ต้อง Login ก่อนเท่านั้น
| คนนอกสแกน QR แล้วเปิด URL โดยตรง → 401
|--------------------------------------------------------------------------
*/

router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const data = await prisma.forensicSubmission.findUnique({
            where: {
                submissionId: id,
            },

            include: {
                persons: {
                    include: {
                        person: true,
                    },
                },

                statusHistories: {
                    orderBy: {
                        changedAt: "desc",
                    },
                },
            },
        });

        if (!data) {
            return res.status(404).json({
                error: "ไม่พบรายการส่งตรวจ",
            });
        }

        const STATUS_LIST = [
            {
                status: 0,
                name: "รอส่ง ศพฐ.",
            },
            {
                status: 1,
                name: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
            },
            {
                status: 2,
                name: "ส่ง ศพฐ. แล้ว",
            },
            {
                status: 3,
                name: "รับจาก ศพฐ. แล้ว",
            },
            {
                status: 4,
                name: "ส่งคืนต้นสังกัดแล้ว",
            },
        ];

        const statusName =
            STATUS_LIST.find(
                (item) => item.status === data.status
            )?.name || "ไม่ทราบสถานะ";

        /*
         * เรียงบุคคล
         * ตามเล่มที่ → เลขที่ใบเสร็จ
         */

        data.persons.sort((a, b) => {
            const bookA = Number(
                a.person?.receiptBookNo || 0
            );

            const bookB = Number(
                b.person?.receiptBookNo || 0
            );

            if (bookA !== bookB) {
                return bookA - bookB;
            }

            const noA = Number(
                a.person?.receiptNo || 0
            );

            const noB = Number(
                b.person?.receiptNo || 0
            );

            return noA - noB;
        });

        res.json({
            success: true,

            data: {
                ...data,

                statusName,

                persons: data.persons.map((item) => ({
                    id: item.id,

                    person: {
                        ...item.person,

                        status: item.person.status,
                    },
                })),
            },
        });
    } catch (err) {
        console.error(
            "GET FORENSIC STATUS ERROR:",
            err
        );

        res.status(500).json({
            error: "โหลดข้อมูลสถานะไม่สำเร็จ",
        });
    }
});

/*
|--------------------------------------------------------------------------
| PATCH เปลี่ยนสถานะ
|--------------------------------------------------------------------------
| ต้อง Login ก่อน
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/status",
    authMiddleware,
    async (req, res) => {
        try {
            const { id } = req.params;

            const { status, remark } = req.body;

            const statusNum = Number(status);

            if (![0, 1, 2, 3, 4].includes(statusNum)) {
                return res.status(400).json({
                    error: "สถานะไม่ถูกต้อง",
                });
            }

            const submission =
                await prisma.forensicSubmission.findUnique({
                    where: {
                        submissionId: id,
                    },
                });

            if (!submission) {
                return res.status(404).json({
                    error: "ไม่พบรายการส่งตรวจ",
                });
            }

            const oldStatus = submission.status;

            /*
             * ถ้าสถานะเหมือนเดิม
             */

            if (oldStatus === statusNum) {
                return res.status(400).json({
                    error: "สถานะเหมือนเดิม",
                });
            }

            const now = new Date();

            /*
             * ชื่อเจ้าหน้าที่จาก Token
             */

            const changedBy =
                req.admin?.name ||
                req.admin?.username ||
                "admin";

            const result =
                await prisma.$transaction(async (tx) => {
                    /*
                     * 1. เปลี่ยนสถานะ ForensicSubmission
                     */

                    const updated =
                        await tx.forensicSubmission.update({
                            where: {
                                submissionId: id,
                            },

                            data: {
                                status: statusNum,
                                statusUpdatedAt: now,
                            },
                        });

                    /*
                     * 2. เพิ่มประวัติสถานะ
                     */

                    await tx.forensicSubmissionStatusHistory.create(
                        {
                            data: {
                                submissionId: id,

                                oldStatus,

                                newStatus: statusNum,

                                remark:
                                    remark?.trim() || null,

                                changedBy,
                            },
                        }
                    );

                    /*
                     * 3. เปลี่ยนสถานะ Person
                     *
                     * บุคคลทั้งหมดในรายการนี้
                     */

                    const submissionPersons =
                        await tx.forensicSubmissionPerson.findMany(
                            {
                                where: {
                                    submissionId: id,
                                },

                                select: {
                                    personId: true,
                                },
                            }
                        );

                    const personIds =
                        submissionPersons.map(
                            (item) => item.personId
                        );

                    if (personIds.length > 0) {
                        /*
                         * ดึงสถานะเดิมของ Person
                         */

                        const persons =
                            await tx.person.findMany({
                                where: {
                                    personId: {
                                        in: personIds,
                                    },
                                },

                                select: {
                                    personId: true,
                                    status: true,
                                },
                            });

                        /*
                         * เปลี่ยนสถานะ Person
                         */

                        await tx.person.updateMany({
                            where: {
                                personId: {
                                    in: personIds,
                                },
                            },

                            data: {
                                status: statusNum,

                                statusUpdatedAt: now,

                                updatedAt: now,
                            },
                        });

                        /*
                         * บันทึกประวัติ Person
                         */

                        await tx.personStatusHistory.createMany(
                            {
                                data: persons.map((person) => ({
                                    personId:
                                        person.personId,

                                    oldStatus:
                                        person.status,

                                    newStatus:
                                        statusNum,

                                    changedAt: now,
                                })),
                            }
                        );
                    }

                    return updated;
                });

            const STATUS_LIST = [
                {
                    status: 0,
                    name: "รอส่ง ศพฐ.",
                },
                {
                    status: 1,
                    name: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
                },
                {
                    status: 2,
                    name: "ส่ง ศพฐ. แล้ว",
                },
                {
                    status: 3,
                    name: "รับจาก ศพฐ. แล้ว",
                },
                {
                    status: 4,
                    name: "ส่งคืนต้นสังกัดแล้ว",
                },
            ];

            const statusName =
                STATUS_LIST.find(
                    (item) =>
                        item.status === result.status
                )?.name || "ไม่ทราบสถานะ";

            res.json({
                success: true,

                data: {
                    ...result,

                    statusName,
                },
            });
        } catch (err) {
            console.error(
                "PATCH FORENSIC STATUS ERROR:",
                err
            );

            res.status(500).json({
                error: "เปลี่ยนสถานะไม่สำเร็จ",
            });
        }
    }
);
