// src/routes/foreigner.js
import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

const MONTHS = {
    "ม.ค.": 0, "ก.พ.": 1, "มี.ค.": 2, "เม.ย.": 3, "พ.ค.": 4, "มิ.ย.": 5,
    "ก.ค.": 6, "ส.ค.": 7, "ก.ย.": 8, "ต.ค.": 9, "พ.ย.": 10, "ธ.ค.": 11
};

// สร้างชื่อเต็ม
const buildFullName = ({ prefix, firstName, lastName }) =>
    [prefix, firstName, lastName].map(v => v ? String(v).trim() : "").filter(Boolean).join(" ");

// สร้างที่อยู่รวม
const buildDomicile = ({ houseNo, moo, road, subdistrict, domicileDistrict, domicileProvince }) =>
    [
        houseNo ? String(houseNo).trim() : "-",
        moo ? `ม. ${String(moo).trim()}` : "ม. -",
        road ? `ถนน ${String(road).trim()}` : "ถนน -",
        subdistrict ? `ต. ${String(subdistrict).trim()}` : "ต. -",
        domicileDistrict ? `อ. ${String(domicileDistrict).trim()}` : "อ. -",
        domicileProvince ? `จ. ${String(domicileProvince).trim()}` : "จ. -"
    ].join(" ");

// แปลงวันที่ไทยเป็น Date
const parseThaiDate = value => {
    if (!value) return null;
    if (value instanceof Date) return value;
    const text = String(value).trim();
    const match = text.match(/^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/);

    if (!match) {
        const date = new Date(text);
        return Number.isNaN(date.getTime()) ? null : date;
    }

    const day = Number(match[1]);
    const month = MONTHS[match[2]];
    const buddhistYear = Number(match[3]);

    if (month === undefined || Number.isNaN(buddhistYear)) return null;

    return new Date(buddhistYear - 543, month, day);
};

// แปลง Date เป็นวันที่ไทย
const formatThaiDate = date => {
    if (!date || Number.isNaN(date.getTime())) return null;

    const day = date.getDate();
    const monthNames = Object.keys(MONTHS);
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear() + 543;

    return `${day} ${month} ${year}`;
};

// คำนวณวันหมดอายุ
const calculateExpirationDate = (applicationType, applicationDate) => {
    const date = parseThaiDate(applicationDate);

    if (!date) return null;

    if (applicationType === "ชนิดที่ 1") {
        date.setFullYear(date.getFullYear() + 1);
    } else if (applicationType === "ชนิดที่ 2") {
        date.setFullYear(date.getFullYear() + 5);
    } else {
        return null;
    }

    return formatThaiDate(date);
};

// แปลงจำนวนเงินเป็นตัวอักษร
const numberToThaiText = number => {
    if (number === null || number === undefined || number === "") return null;

    const amount = Number(number);

    if (!Number.isFinite(amount) || amount < 0) return null;

    const baht = Math.floor(amount);
    const satang = Math.round((amount - baht) * 100);
    const digits = ["ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
    const positions = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน"];

    const convert = num => {
        if (num === 0) return "";

        if (num >= 1000000) {
            const million = Math.floor(num / 1000000);
            const remainder = num % 1000000;
            return convert(million) + "ล้าน" + (remainder ? convert(remainder) : "");
        }

        const str = String(num);
        let text = "";

        for (let i = 0; i < str.length; i++) {
            const digit = Number(str[i]);
            const position = str.length - i - 1;

            if (digit === 0) continue;

            if (position === 0) {
                if (digit === 1 && str.length > 1) {
                    text += "เอ็ด";
                } else {
                    text += digits[digit];
                }
            } else if (position === 1) {
                if (digit === 1) {
                    text += "สิบ";
                } else if (digit === 2) {
                    text += "ยี่สิบ";
                } else {
                    text += digits[digit] + "สิบ";
                }
            } else {
                text += digits[digit] + positions[position];
            }
        }

        return text;
    };

    let result = convert(baht) + "บาท";
    result += satang === 0 ? "ถ้วน" : convert(satang) + "สตางค์";

    return result;
};

// GET ALL
router.get("/", async (req, res) => {
    try {
        const { search, nationality, province, year } = req.query;
        const where = {};

        if (search?.trim()) {
            const keyword = search.trim();

            where.OR = [
                { foreignerIdNo: { contains: keyword, mode: "insensitive" } },
                { fullName: { contains: keyword, mode: "insensitive" } },
                { firstName: { contains: keyword, mode: "insensitive" } },
                { lastName: { contains: keyword, mode: "insensitive" } },
                { certificateRegistrationNo: { contains: keyword, mode: "insensitive" } },
                { certificateNo: { contains: keyword, mode: "insensitive" } },
                { receiptNo: { contains: keyword, mode: "insensitive" } },
                { policeStation: { contains: keyword, mode: "insensitive" } },
                { policeProvince: { contains: keyword, mode: "insensitive" } }
            ];
        }

        if (nationality?.trim()) {
            where.nationality = {
                contains: nationality.trim(),
                mode: "insensitive"
            };
        }

        if (province?.trim()) {
            where.province = {
                contains: province.trim(),
                mode: "insensitive"
            };
        }

        if (year !== undefined && year !== "") {
            const yearNumber = Number(year);

            if (!Number.isNaN(yearNumber)) {
                where.year = yearNumber;
            }
        }

        const data = await prisma.foreigner.findMany({
            where,
            orderBy: [
                { year: "desc" },
                { sequenceNo: "asc" }
            ]
        });

        return res.json({
            success: true,
            data,
            total: data.length
        });
    } catch (err) {
        console.error("GET FOREIGNER ERROR:", err);

        return res.status(500).json({
            success: false,
            error: "ดึงข้อมูลคนต่างด้าวไม่สำเร็จ"
        });
    }
});

// GET ใบเสร็จที่ใช้แล้ว
router.get("/receipt-options", async (req, res) => {
    try {
        const latest = await prisma.foreigner.findFirst({
            where: {
                receiptBookNo: {
                    not: null
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            select: {
                receiptBookNo: true
            }
        });

        const latestReceiptBookNo = latest?.receiptBookNo || "01";

        const used = await prisma.foreigner.findMany({
            where: {
                receiptBookNo: latestReceiptBookNo,
                receiptNo: {
                    not: null
                }
            },
            select: {
                receiptNo: true
            }
        });

        const usedReceiptNos = used
            .map(item => String(item.receiptNo).padStart(2, "0"))
            .filter(Boolean);

        const receiptNos = Array.from({ length: 50 }, (_, index) =>
            String(index + 1).padStart(2, "0")
        ).filter(no => !usedReceiptNos.includes(no));

        return res.json({
            success: true,
            receiptBookNo: latestReceiptBookNo,
            receiptNos
        });
    } catch (err) {
        console.error("GET RECEIPT OPTIONS ERROR:", err);

        return res.status(500).json({
            success: false,
            error: "ดึงข้อมูลใบเสร็จไม่สำเร็จ"
        });
    }
});

// GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const data = await prisma.foreigner.findUnique({
            where: { id: req.params.id }
        });

        if (!data) {
            return res.status(404).json({
                success: false,
                error: "ไม่พบข้อมูลคนต่างด้าว"
            });
        }

        return res.json({
            success: true,
            data
        });
    } catch (err) {
        console.error("GET FOREIGNER BY ID ERROR:", err);

        return res.status(500).json({
            success: false,
            error: "ดึงข้อมูลไม่สำเร็จ"
        });
    }
});

// CREATE
router.post("/", async (req, res) => {
    try {
        const data = req.body;

        if (data.year === undefined || data.year === null || data.year === "") {
            return res.status(400).json({
                success: false,
                error: "กรุณาระบุปี พ.ศ."
            });
        }

        const year = Number(data.year);

        if (!Number.isInteger(year)) {
            return res.status(400).json({
                success: false,
                error: "ปี พ.ศ. ไม่ถูกต้อง"
            });
        }

        const prefix = data.prefix ? String(data.prefix).trim() : null;
        const firstName = data.firstName ? String(data.firstName).trim() : "";
        const lastName = data.lastName ? String(data.lastName).trim() : "";

        if (!firstName) {
            return res.status(400).json({
                success: false,
                error: "กรุณากรอกชื่อ"
            });
        }

        if (!lastName) {
            return res.status(400).json({
                success: false,
                error: "กรุณากรอกนามสกุล"
            });
        }

        const fullName = buildFullName({
            prefix,
            firstName,
            lastName
        });

        if (data.age === undefined || data.age === null || data.age === "") {
            return res.status(400).json({
                success: false,
                error: "กรุณากรอกอายุ"
            });
        }

        const age = Number(data.age);

        if (!Number.isInteger(age) || age < 0) {
            return res.status(400).json({
                success: false,
                error: "อายุไม่ถูกต้อง"
            });
        }

        const applicationType = data.applicationType
            ? String(data.applicationType).trim()
            : null;

        const applicationDate = data.applicationDate
            ? String(data.applicationDate).trim()
            : null;

        const expirationDate = calculateExpirationDate(
            applicationType,
            applicationDate
        );

        const previousExpirationDate = data.previousExpirationDate
            ? String(data.previousExpirationDate).trim()
            : null;

        const houseNo = data.houseNo
            ? String(data.houseNo).trim()
            : null;

        const moo = data.moo
            ? String(data.moo).trim()
            : null;

        const road = data.road
            ? String(data.road).trim()
            : null;

        const subdistrict = data.subdistrict
            ? String(data.subdistrict).trim()
            : null;

        const domicileDistrict = data.domicileDistrict
            ? String(data.domicileDistrict).trim()
            : null;

        const domicileProvince = data.domicileProvince
            ? String(data.domicileProvince).trim()
            : null;

        const domicile = buildDomicile({
            houseNo,
            moo,
            road,
            subdistrict,
            domicileDistrict,
            domicileProvince
        });

        const policeStation = data.policeStation
            ? String(data.policeStation).trim()
            : null;

        const policeProvince = data.policeProvince
            ? String(data.policeProvince).trim()
            : null;

        const amount =
            data.amount !== undefined &&
                data.amount !== null &&
                data.amount !== ""
                ? Number(data.amount)
                : null;

        if (
            amount !== null &&
            (!Number.isInteger(amount) || amount < 0)
        ) {
            return res.status(400).json({
                success: false,
                error: "จำนวนเงินต้องเป็นจำนวนเต็มและไม่ติดลบ"
            });
        }

        const amountText = numberToThaiText(amount);

        const foreigner = await prisma.$transaction(async tx => {
            const last = await tx.foreigner.findFirst({
                where: { year },
                orderBy: { sequenceNo: "desc" },
                select: { sequenceNo: true }
            });

            const sequenceNo = (last?.sequenceNo ?? 0) + 1;

            return tx.foreigner.create({
                data: {
                    sequenceNo,
                    year,
                    foreignerIdNo: data.foreignerIdNo
                        ? String(data.foreignerIdNo).trim()
                        : null,
                    prefix,
                    firstName,
                    lastName,
                    fullName,
                    age,
                    nationality: data.nationality
                        ? String(data.nationality).trim()
                        : null,
                    ethnicity: data.ethnicity
                        ? String(data.ethnicity).trim()
                        : null,
                    certificateRegistrationNo: data.certificateRegistrationNo
                        ? String(data.certificateRegistrationNo).trim()
                        : null,
                    certificateDate: data.certificateDate
                        ? String(data.certificateDate)
                        : null,
                    district: data.district
                        ? String(data.district).trim()
                        : null,
                    province: data.province
                        ? String(data.province).trim()
                        : null,
                    policeStation,
                    policeProvince,
                    houseNo,
                    moo,
                    road,
                    subdistrict,
                    domicileDistrict,
                    domicileProvince,
                    domicile,
                    applicationType,
                    applicationDate,
                    expirationDate,
                    previousExpirationDate,
                    amount,
                    amountText,
                    receiptBookNo: data.receiptBookNo
                        ? String(data.receiptBookNo).trim()
                        : null,
                    receiptNo: data.receiptNo
                        ? String(data.receiptNo).trim()
                        : null,
                    receiptDate: data.receiptDate
                        ? String(data.receiptDate)
                        : null,
                    certificateNo: data.certificateNo
                        ? String(data.certificateNo).trim()
                        : null,
                    petitionDate: data.petitionDate
                        ? new Date(data.petitionDate)
                        : null
                }
            });
        });

        console.log(
            `CREATE FOREIGNER: ${foreigner.fullName} | ปี ${foreigner.year} | ลำดับ ${foreigner.sequenceNo}`
        );

        return res.status(201).json({
            success: true,
            data: foreigner
        });
    } catch (err) {
        console.error("CREATE FOREIGNER ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err?.message || "เพิ่มข้อมูลคนต่างด้าวไม่สำเร็จ"
        });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const data = req.body;

        const existing = await prisma.foreigner.findUnique({
            where: { id: req.params.id }
        });

        if (!existing) {
            return res.status(404).json({
                success: false,
                error: "ไม่พบข้อมูลคนต่างด้าว"
            });
        }

        const year =
            data.year !== undefined && data.year !== ""
                ? Number(data.year)
                : existing.year;

        if (year !== null && !Number.isInteger(year)) {
            return res.status(400).json({
                success: false,
                error: "ปี พ.ศ. ไม่ถูกต้อง"
            });
        }

        const prefix =
            data.prefix !== undefined
                ? data.prefix
                    ? String(data.prefix).trim()
                    : null
                : existing.prefix;

        const firstName =
            data.firstName !== undefined
                ? String(data.firstName).trim()
                : existing.firstName;

        const lastName =
            data.lastName !== undefined
                ? String(data.lastName).trim()
                : existing.lastName;

        if (!firstName) {
            return res.status(400).json({
                success: false,
                error: "กรุณากรอกชื่อ"
            });
        }

        if (!lastName) {
            return res.status(400).json({
                success: false,
                error: "กรุณากรอกนามสกุล"
            });
        }

        const fullName = buildFullName({
            prefix,
            firstName,
            lastName
        });

        const age =
            data.age !== undefined && data.age !== ""
                ? Number(data.age)
                : existing.age;

        if (
            age !== null &&
            (!Number.isInteger(age) || age < 0)
        ) {
            return res.status(400).json({
                success: false,
                error: "อายุไม่ถูกต้อง"
            });
        }

        const applicationType =
            data.applicationType !== undefined
                ? data.applicationType
                    ? String(data.applicationType).trim()
                    : null
                : existing.applicationType;

        const applicationDate =
            data.applicationDate !== undefined
                ? data.applicationDate
                    ? String(data.applicationDate).trim()
                    : null
                : existing.applicationDate;

        let expirationDate = existing.expirationDate;

        if (applicationType && applicationDate) {
            const calculated = calculateExpirationDate(
                applicationType,
                applicationDate
            );

            if (calculated) {
                expirationDate = calculated;
            }
        }

        const previousExpirationDate =
            data.previousExpirationDate !== undefined
                ? data.previousExpirationDate
                    ? String(data.previousExpirationDate).trim()
                    : null
                : existing.previousExpirationDate;

        const policeStation =
            data.policeStation !== undefined
                ? data.policeStation
                    ? String(data.policeStation).trim()
                    : null
                : existing.policeStation;

        const policeProvince =
            data.policeProvince !== undefined
                ? data.policeProvince
                    ? String(data.policeProvince).trim()
                    : null
                : existing.policeProvince;

        const houseNo =
            data.houseNo !== undefined
                ? data.houseNo
                    ? String(data.houseNo).trim()
                    : null
                : existing.houseNo;

        const moo =
            data.moo !== undefined
                ? data.moo
                    ? String(data.moo).trim()
                    : null
                : existing.moo;

        const road =
            data.road !== undefined
                ? data.road
                    ? String(data.road).trim()
                    : null
                : existing.road;

        const subdistrict =
            data.subdistrict !== undefined
                ? data.subdistrict
                    ? String(data.subdistrict).trim()
                    : null
                : existing.subdistrict;

        const domicileDistrict =
            data.domicileDistrict !== undefined
                ? data.domicileDistrict
                    ? String(data.domicileDistrict).trim()
                    : null
                : existing.domicileDistrict;

        const domicileProvince =
            data.domicileProvince !== undefined
                ? data.domicileProvince
                    ? String(data.domicileProvince).trim()
                    : null
                : existing.domicileProvince;

        const domicile = buildDomicile({
            houseNo,
            moo,
            road,
            subdistrict,
            domicileDistrict,
            domicileProvince
        });

        let amount = existing.amount;

        if (data.amount !== undefined) {
            amount =
                data.amount !== null &&
                    data.amount !== ""
                    ? Number(data.amount)
                    : null;

            if (
                amount !== null &&
                (!Number.isInteger(amount) || amount < 0)
            ) {
                return res.status(400).json({
                    success: false,
                    error: "จำนวนเงินต้องเป็นจำนวนเต็มและไม่ติดลบ"
                });
            }
        }

        const amountText = numberToThaiText(amount);

        const foreigner = await prisma.foreigner.update({
            where: { id: req.params.id },
            data: {
                year,
                foreignerIdNo:
                    data.foreignerIdNo !== undefined
                        ? data.foreignerIdNo
                            ? String(data.foreignerIdNo).trim()
                            : null
                        : existing.foreignerIdNo,
                prefix,
                firstName,
                lastName,
                fullName,
                age,
                nationality:
                    data.nationality !== undefined
                        ? data.nationality
                            ? String(data.nationality).trim()
                            : null
                        : existing.nationality,
                ethnicity:
                    data.ethnicity !== undefined
                        ? data.ethnicity
                            ? String(data.ethnicity).trim()
                            : null
                        : existing.ethnicity,
                certificateRegistrationNo:
                    data.certificateRegistrationNo !== undefined
                        ? data.certificateRegistrationNo
                            ? String(data.certificateRegistrationNo).trim()
                            : null
                        : existing.certificateRegistrationNo,
                certificateDate:
                    data.certificateDate !== undefined
                        ? data.certificateDate
                            ? String(data.certificateDate)
                            : null
                        : existing.certificateDate,
                district:
                    data.district !== undefined
                        ? data.district
                            ? String(data.district).trim()
                            : null
                        : existing.district,
                province:
                    data.province !== undefined
                        ? data.province
                            ? String(data.province).trim()
                            : null
                        : existing.province,
                policeStation,
                policeProvince,
                houseNo,
                moo,
                road,
                subdistrict,
                domicileDistrict,
                domicileProvince,
                domicile,
                applicationType,
                applicationDate,
                expirationDate,
                previousExpirationDate,
                amount,
                amountText,
                receiptBookNo:
                    data.receiptBookNo !== undefined
                        ? data.receiptBookNo
                            ? String(data.receiptBookNo).trim()
                            : null
                        : existing.receiptBookNo,
                receiptNo:
                    data.receiptNo !== undefined
                        ? data.receiptNo
                            ? String(data.receiptNo).trim()
                            : null
                        : existing.receiptNo,
                receiptDate:
                    data.receiptDate !== undefined
                        ? data.receiptDate
                            ? String(data.receiptDate)
                            : null
                        : existing.receiptDate,
                certificateNo:
                    data.certificateNo !== undefined
                        ? data.certificateNo
                            ? String(data.certificateNo).trim()
                            : null
                        : existing.certificateNo,
                petitionDate:
                    data.petitionDate !== undefined
                        ? data.petitionDate
                            ? new Date(data.petitionDate)
                            : null
                        : existing.petitionDate
            }
        });

        console.log(`UPDATE FOREIGNER: ${foreigner.fullName}`);

        return res.json({
            success: true,
            data: foreigner
        });
    } catch (err) {
        console.error("UPDATE FOREIGNER ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err?.message || "แก้ไขข้อมูลไม่สำเร็จ"
        });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const existing = await prisma.foreigner.findUnique({
            where: { id: req.params.id }
        });

        if (!existing) {
            return res.status(404).json({
                success: false,
                error: "ไม่พบข้อมูลคนต่างด้าว"
            });
        }

        await prisma.foreigner.delete({
            where: { id: req.params.id }
        });

        console.log(`DELETE FOREIGNER: ${existing.fullName}`);

        return res.json({
            success: true,
            message: "ลบข้อมูลสำเร็จ"
        });
    } catch (err) {
        console.error("DELETE FOREIGNER ERROR:", err);

        return res.status(500).json({
            success: false,
            error: err?.message || "ลบข้อมูลไม่สำเร็จ"
        });
    }
});

export default router;
