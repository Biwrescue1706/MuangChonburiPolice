
// src/routes/foreigner.js
import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

const MONTHS = {
    "ม.ค.": 0,
    "ก.พ.": 1,
    "มี.ค.": 2,
    "เม.ย.": 3,
    "พ.ค.": 4,
    "มิ.ย.": 5,
    "ก.ค.": 6,
    "ส.ค.": 7,
    "ก.ย.": 8,
    "ต.ค.": 9,
    "พ.ย.": 10,
    "ธ.ค.": 11,
};

const MONTH_NAMES = Object.keys(MONTHS);
const MAX_TEXT_LENGTH = 500;
const MAX_SEARCH_LENGTH = 200;
const MAX_RETRIES = 3;

// --------------------------------------------------
// Common helpers
// --------------------------------------------------

const sendError = (res, status, error) =>
    res.status(status).json({
        success: false,
        error,
    });

const isPlainObject = (value) =>
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    !(value instanceof Date);

const toText = (value, maxLength = MAX_TEXT_LENGTH) => {
    if (value === undefined || value === null) return null;

    const text = String(value).trim();

    if (!text) return null;

    return text.slice(0, maxLength);
};

const hasOwn = (object, key) =>
    Object.prototype.hasOwnProperty.call(object, key);

const parseInteger = (value) => {
    if (
        value === undefined ||
        value === null ||
        value === "" ||
        typeof value === "boolean"
    ) {
        return null;
    }

    const text = String(value).trim();

    if (!/^-?\d+$/.test(text)) return null;

    const number = Number(text);

    return Number.isSafeInteger(number) ? number : null;
};

const parseOptionalInteger = (value) => {
    if (value === undefined || value === null || value === "") {
        return { valid: true, value: null };
    }

    const number = parseInteger(value);

    return {
        valid: number !== null,
        value: number,
    };
};

const parseOptionalText = (data, key, existingValue) => {
    if (!hasOwn(data, key)) return existingValue;
    return toText(data[key]);
};

const validateId = (id) => {
    if (typeof id !== "string") return false;

    const value = id.trim();

    return value.length > 0 && value.length <= 100;
};

const isValidDate = (date) =>
    date instanceof Date && !Number.isNaN(date.getTime());

const parseDate = (value) => {
    if (value === undefined || value === null || value === "") {
        return null;
    }

    if (value instanceof Date) {
        return isValidDate(value) ? new Date(value.getTime()) : null;
    }

    const text = String(value).trim();

    if (!text) return null;

    // รองรับ YYYY-MM-DD และ ISO date/time
    const isoMatch = text.match(
        /^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/
    );

    if (isoMatch) {
        const year = Number(isoMatch[1]);
        const month = Number(isoMatch[2]);
        const day = Number(isoMatch[3]);

        if (month < 1 || month > 12 || day < 1 || day > 31) {
            return null;
        }

        if (
            isoMatch[4] === undefined &&
            !/^\d{4}-\d{2}-\d{2}$/.test(text)
        ) {
            return null;
        }

        if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
            const date = new Date(year, month - 1, day);

            if (
                date.getFullYear() !== year ||
                date.getMonth() !== month - 1 ||
                date.getDate() !== day
            ) {
                return null;
            }

            return date;
        }

        const date = new Date(text);
        return isValidDate(date) ? date : null;
    }

    // รองรับวันที่ไทย เช่น 15 ม.ค. 2569
    const thaiMatch = text.match(
        /^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/
    );

    if (thaiMatch) {
        const day = Number(thaiMatch[1]);
        const month = MONTHS[thaiMatch[2]];
        let year = Number(thaiMatch[3]);

        if (month === undefined || !Number.isInteger(year)) {
            return null;
        }

        // แปลง พ.ศ. เป็น ค.ศ.
        if (year >= 2400) year -= 543;

        const date = new Date(year, month, day);

        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month ||
            date.getDate() !== day
        ) {
            return null;
        }

        return date;
    }

    return null;
};

const parseOptionalDate = (value) => {
    if (value === undefined || value === null || value === "") {
        return { valid: true, value: null };
    }

    const date = parseDate(value);

    return {
        valid: date !== null,
        value: date,
    };
};

// --------------------------------------------------
// Thai name, address and date helpers
// --------------------------------------------------

const buildFullName = ({ prefix, firstName, lastName }) =>
    [prefix, firstName, lastName]
        .map((value) => (value ? String(value).trim() : ""))
        .filter(Boolean)
        .join(" ");

const buildDomicile = ({
    houseNo,
    moo,
    road,
    subdistrict,
    domicileDistrict,
    domicileProvince,
}) =>
    [
        houseNo ? String(houseNo).trim() : "-",
        moo ? `ม. ${String(moo).trim()}` : "ม. -",
        road ? `ถนน ${String(road).trim()}` : "ถนน -",
        subdistrict ? `ต. ${String(subdistrict).trim()}` : "ต. -",
        domicileDistrict
            ? `อ. ${String(domicileDistrict).trim()}`
            : "อ. -",
        domicileProvince
            ? `จ. ${String(domicileProvince).trim()}`
            : "จ. -",
    ].join(" ");

const formatThaiDate = (date) => {
    if (!isValidDate(date)) return null;

    return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${
        date.getFullYear() + 543
    }`;
};

const calculateExpirationDate = (applicationType, applicationDate) => {
    const date = parseDate(applicationDate);

    if (!date) return null;

    let yearsToAdd;

    if (applicationType === "ชนิดที่ 1") {
        yearsToAdd = 1;
    } else if (applicationType === "ชนิดที่ 2") {
        yearsToAdd = 5;
    } else {
        return null;
    }

    const originalMonth = date.getMonth();
    const originalDay = date.getDate();

    date.setDate(1);
    date.setFullYear(date.getFullYear() + yearsToAdd);
    date.setMonth(originalMonth);

    const lastDayOfMonth = new Date(
        date.getFullYear(),
        originalMonth + 1,
        0
    ).getDate();

    date.setDate(Math.min(originalDay, lastDayOfMonth));

    return formatThaiDate(date);
};

// --------------------------------------------------
// Convert number to Thai text
// --------------------------------------------------

const numberToThaiText = (value) => {
    if (value === undefined || value === null || value === "") {
        return null;
    }

    const amount = Number(value);

    if (!Number.isFinite(amount) || amount < 0) return null;

    const rounded = Math.round((amount + Number.EPSILON) * 100) / 100;
    const baht = Math.floor(rounded);
    const satang = Math.round((rounded - baht) * 100);

    const digits = [
        "ศูนย์",
        "หนึ่ง",
        "สอง",
        "สาม",
        "สี่",
        "ห้า",
        "หก",
        "เจ็ด",
        "แปด",
        "เก้า",
    ];

    const positions = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน"];

    const convertGroup = (number) => {
        if (number === 0) return "";

        const text = String(number);
        let result = "";

        for (let i = 0; i < text.length; i++) {
            const digit = Number(text[i]);
            const position = text.length - i - 1;

            if (digit === 0) continue;

            if (position === 0) {
                if (digit === 1 && text.length > 1) {
                    result += "เอ็ด";
                } else {
                    result += digits[digit];
                }
            } else if (position === 1) {
                if (digit === 1) {
                    result += "สิบ";
                } else if (digit === 2) {
                    result += "ยี่สิบ";
                } else {
                    result += digits[digit] + "สิบ";
                }
            } else {
                result += digits[digit] + positions[position];
            }
        }

        return result;
    };

    const convert = (number) => {
        if (number < 1000000) {
            return convertGroup(number);
        }

        const million = Math.floor(number / 1000000);
        const remainder = number % 1000000;

        return (
            convert(million) +
            "ล้าน" +
            (remainder > 0 ? convert(remainder) : "")
        );
    };

    const bahtText = baht === 0 ? "ศูนย์" : convert(baht);
    const satangText = satang === 0 ? "" : convert(satang);

    return (
        bahtText +
        "บาท" +
        (satang === 0 ? "ถ้วน" : satangText + "สตางค์")
    );
};

// --------------------------------------------------
// Prisma error handling
// --------------------------------------------------

const handlePrismaError = (res, err, operation) => {
    console.error(`${operation}:`, err);

    if (err?.code === "P2025") {
        return sendError(res, 404, "ไม่พบข้อมูลที่ต้องการ");
    }

    if (err?.code === "P2002") {
        return sendError(
            res,
            409,
            "ข้อมูลซ้ำกับรายการที่มีอยู่แล้ว กรุณาตรวจสอบข้อมูล"
        );
    }

    if (err?.code === "P2003") {
        return sendError(
            res,
            409,
            "ไม่สามารถดำเนินการได้ เนื่องจากข้อมูลมีความสัมพันธ์กับรายการอื่น"
        );
    }

    if (err?.code === "P2034") {
        return sendError(
            res,
            409,
            "มีรายการอื่นกำลังแก้ไขข้อมูลพร้อมกัน กรุณาลองใหม่"
        );
    }

    // ไม่ส่ง err.message หรือรายละเอียดฐานข้อมูลให้ผู้ใช้
    return sendError(res, 500, "ระบบไม่สามารถดำเนินการได้");
};

// --------------------------------------------------
// GET ALL
// --------------------------------------------------

router.get("/", async (req, res) => {
    try {
        const { search, nationality, province, year } = req.query;

        if (
            (search !== undefined && typeof search !== "string") ||
            (nationality !== undefined &&
                typeof nationality !== "string") ||
            (province !== undefined && typeof province !== "string") ||
            (year !== undefined && typeof year !== "string")
        ) {
            return sendError(res, 400, "รูปแบบเงื่อนไขค้นหาไม่ถูกต้อง");
        }

        const where = {};

        const keyword = search?.trim();

        if (keyword) {
            if (keyword.length > MAX_SEARCH_LENGTH) {
                return sendError(res, 400, "คำค้นหายาวเกินไป");
            }

            where.OR = [
                { foreignerIdNo: { contains: keyword, mode: "insensitive" } },
                { fullName: { contains: keyword, mode: "insensitive" } },
                { firstName: { contains: keyword, mode: "insensitive" } },
                { lastName: { contains: keyword, mode: "insensitive" } },
                {
                    certificateRegistrationNo: {
                        contains: keyword,
                        mode: "insensitive",
                    },
                },
                { certificateNo: { contains: keyword, mode: "insensitive" } },
                { receiptNo: { contains: keyword, mode: "insensitive" } },
                { policeStation: { contains: keyword, mode: "insensitive" } },
                { policeProvince: { contains: keyword, mode: "insensitive" } },
            ];
        }

        if (nationality?.trim()) {
            where.nationality = {
                contains: nationality.trim().slice(0, MAX_SEARCH_LENGTH),
                mode: "insensitive",
            };
        }

        if (province?.trim()) {
            where.province = {
                contains: province.trim().slice(0, MAX_SEARCH_LENGTH),
                mode: "insensitive",
            };
        }

        if (year !== undefined && year !== "") {
            const yearNumber = parseInteger(year);

            if (yearNumber === null) {
                return sendError(res, 400, "ปี พ.ศ. ไม่ถูกต้อง");
            }

            where.year = yearNumber;
        }

        const data = await prisma.foreigner.findMany({
            where,
            orderBy: [{ year: "desc" }, { sequenceNo: "asc" }],
        });

        return res.json({
            success: true,
            data,
            total: data.length,
        });
    } catch (err) {
        return handlePrismaError(res, err, "GET FOREIGNER ERROR");
    }
});

// --------------------------------------------------
// GET RECEIPT OPTIONS
// --------------------------------------------------

router.get("/receipt-options", async (req, res) => {
    try {
        const latest = await prisma.foreigner.findFirst({
            where: { receiptBookNo: { not: null } },
            orderBy: { createdAt: "desc" },
            select: { receiptBookNo: true },
        });

        const latestReceiptBookNo = latest?.receiptBookNo || "01";

        const used = await prisma.foreigner.findMany({
            where: {
                receiptBookNo: latestReceiptBookNo,
                receiptNo: { not: null },
            },
            select: { receiptNo: true },
        });

        const usedReceiptNos = new Set(
            used.map((item) => String(item.receiptNo).trim().padStart(2, "0"))
        );

        const receiptNos = Array.from({ length: 50 }, (_, index) =>
            String(index + 1).padStart(2, "0")
        ).filter((number) => !usedReceiptNos.has(number));

        return res.json({
            success: true,
            receiptBookNo: latestReceiptBookNo,
            receiptNos,
        });
    } catch (err) {
        return handlePrismaError(
            res,
            err,
            "GET RECEIPT OPTIONS ERROR"
        );
    }
});

// --------------------------------------------------
// GET BY ID
// --------------------------------------------------

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!validateId(id)) {
            return sendError(res, 400, "รหัสข้อมูลไม่ถูกต้อง");
        }

        const data = await prisma.foreigner.findUnique({
            where: { id: id.trim() },
        });

        if (!data) {
            return sendError(res, 404, "ไม่พบข้อมูลคนต่างด้าว");
        }

        return res.json({ success: true, data });
    } catch (err) {
        return handlePrismaError(
            res,
            err,
            "GET FOREIGNER BY ID ERROR"
        );
    }
});

// --------------------------------------------------
// CREATE
// --------------------------------------------------

router.post("/", async (req, res) => {
    try {
        if (!isPlainObject(req.body)) {
            return sendError(res, 400, "รูปแบบข้อมูลไม่ถูกต้อง");
        }

        const data = req.body;

        if (
            data.year === undefined ||
            data.year === null ||
            data.year === ""
        ) {
            return sendError(res, 400, "กรุณาระบุปี พ.ศ.");
        }

        const year = parseInteger(data.year);

        if (year === null || year < 2400 || year > 2700) {
            return sendError(res, 400, "ปี พ.ศ. ไม่ถูกต้อง");
        }

        const prefix = toText(data.prefix);
        const firstName = toText(data.firstName);
        const lastName = toText(data.lastName);

        if (!firstName) {
            return sendError(res, 400, "กรุณากรอกชื่อ");
        }

        if (!lastName) {
            return sendError(res, 400, "กรุณากรอกนามสกุล");
        }

        if (
            data.age === undefined ||
            data.age === null ||
            data.age === ""
        ) {
            return sendError(res, 400, "กรุณากรอกอายุ");
        }

        const age = parseInteger(data.age);

        if (age === null || age < 0 || age > 150) {
            return sendError(res, 400, "อายุไม่ถูกต้อง");
        }

        const applicationType = toText(data.applicationType);
        const applicationDate = toText(data.applicationDate);

        if (
            applicationType &&
            !["ชนิดที่ 1", "ชนิดที่ 2"].includes(applicationType)
        ) {
            return sendError(res, 400, "ประเภทคำขอไม่ถูกต้อง");
        }

        if (applicationDate && !parseDate(applicationDate)) {
            return sendError(res, 400, "วันที่ยื่นคำขอไม่ถูกต้อง");
        }

        const expirationDate =
            calculateExpirationDate(applicationType, applicationDate);

        const previousExpirationDate = toText(
            data.previousExpirationDate
        );

        const houseNo = toText(data.houseNo);
        const moo = toText(data.moo);
        const road = toText(data.road);
        const subdistrict = toText(data.subdistrict);
        const domicileDistrict = toText(data.domicileDistrict);
        const domicileProvince = toText(data.domicileProvince);

        const domicile = buildDomicile({
            houseNo,
            moo,
            road,
            subdistrict,
            domicileDistrict,
            domicileProvince,
        });

        const policeStation = toText(data.policeStation);
        const policeProvince = toText(data.policeProvince);

        const parsedAmount = parseOptionalInteger(data.amount);

        if (!parsedAmount.valid || (parsedAmount.value !== null &&
            parsedAmount.value < 0)) {
            return sendError(
                res,
                400,
                "จำนวนเงินต้องเป็นจำนวนเต็มและไม่ติดลบ"
            );
        }

        const amount = parsedAmount.value;
        const amountText = numberToThaiText(amount);

        const petitionDateResult = parseOptionalDate(data.petitionDate);

        if (!petitionDateResult.valid) {
            return sendError(res, 400, "วันที่คำร้องไม่ถูกต้อง");
        }

        const receiptNo = toText(data.receiptNo);
        const receiptBookNo = toText(data.receiptBookNo);

        if (receiptNo && !/^\d{1,2}$/.test(receiptNo)) {
            return sendError(res, 400, "เลขที่ใบเสร็จไม่ถูกต้อง");
        }

        if (receiptNo) {
            const normalizedReceiptNo = receiptNo.padStart(2, "0");
            const bookNo = receiptBookNo || "01";

            const duplicateReceipt = await prisma.foreigner.findFirst({
                where: {
                    receiptBookNo: bookNo,
                    receiptNo: normalizedReceiptNo,
                },
                select: { id: true },
            });

            if (duplicateReceipt) {
                return sendError(
                    res,
                    409,
                    "เลขที่ใบเสร็จนี้ถูกใช้งานแล้ว"
                );
            }
        }

        const createData = {
            year,
            foreignerIdNo: toText(data.foreignerIdNo),
            prefix,
            firstName,
            lastName,
            fullName: buildFullName({ prefix, firstName, lastName }),
            age,
            nationality: toText(data.nationality),
            ethnicity: toText(data.ethnicity),
            certificateRegistrationNo: toText(
                data.certificateRegistrationNo
            ),
            certificateDate: toText(data.certificateDate),
            district: toText(data.district),
            province: toText(data.province),
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
            receiptBookNo,
            receiptNo: receiptNo ? receiptNo.padStart(2, "0") : null,
            receiptDate: toText(data.receiptDate),
            certificateNo: toText(data.certificateNo),
            petitionDate: petitionDateResult.value,
        };

        let foreigner;

        // Retry เมื่อ transaction ชนกันภายใต้ Serializable isolation
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                foreigner = await prisma.$transaction(
                    async (tx) => {
                        const last = await tx.foreigner.findFirst({
                            where: { year },
                            orderBy: { sequenceNo: "desc" },
                            select: { sequenceNo: true },
                        });

                        const sequenceNo = (last?.sequenceNo ?? 0) + 1;

                        return tx.foreigner.create({
                            data: {
                                ...createData,
                                sequenceNo,
                            },
                        });
                    },
                    { isolationLevel: "Serializable" }
                );

                break;
            } catch (err) {
                if (err?.code === "P2034" && attempt < MAX_RETRIES) {
                    continue;
                }

                throw err;
            }
        }

        console.log(
            `CREATE FOREIGNER: ${foreigner.fullName} | ปี ${foreigner.year} | ลำดับ ${foreigner.sequenceNo}`
        );

        return res.status(201).json({
            success: true,
            data: foreigner,
        });
    } catch (err) {
        return handlePrismaError(res, err, "CREATE FOREIGNER ERROR");
    }
});

// --------------------------------------------------
// UPDATE
// --------------------------------------------------

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!validateId(id)) {
            return sendError(res, 400, "รหัสข้อมูลไม่ถูกต้อง");
        }

        if (!isPlainObject(req.body)) {
            return sendError(res, 400, "รูปแบบข้อมูลไม่ถูกต้อง");
        }

        const data = req.body;

        const existing = await prisma.foreigner.findUnique({
            where: { id: id.trim() },
        });

        if (!existing) {
            return sendError(res, 404, "ไม่พบข้อมูลคนต่างด้าว");
        }

        const yearResult =
            data.year !== undefined
                ? parseOptionalInteger(data.year)
                : { valid: true, value: existing.year };

        if (
            !yearResult.valid ||
            (yearResult.value !== null &&
                (yearResult.value < 2400 || yearResult.value > 2700))
        ) {
            return sendError(res, 400, "ปี พ.ศ. ไม่ถูกต้อง");
        }

        const year = yearResult.value;

        const prefix = parseOptionalText(data, "prefix", existing.prefix);
        const firstName = parseOptionalText(
            data,
            "firstName",
            existing.firstName
        );
        const lastName = parseOptionalText(
            data,
            "lastName",
            existing.lastName
        );

        if (!firstName) {
            return sendError(res, 400, "กรุณากรอกชื่อ");
        }

        if (!lastName) {
            return sendError(res, 400, "กรุณากรอกนามสกุล");
        }

        const ageResult =
            data.age !== undefined
                ? parseOptionalInteger(data.age)
                : { valid: true, value: existing.age };

        if (
            !ageResult.valid ||
            (ageResult.value !== null &&
                (ageResult.value < 0 || ageResult.value > 150))
        ) {
            return sendError(res, 400, "อายุไม่ถูกต้อง");
        }

        const age = ageResult.value;

        const applicationType = parseOptionalText(
            data,
            "applicationType",
            existing.applicationType
        );

        const applicationDate = parseOptionalText(
            data,
            "applicationDate",
            existing.applicationDate
        );

        if (
            applicationType &&
            !["ชนิดที่ 1", "ชนิดที่ 2"].includes(applicationType)
        ) {
            return sendError(res, 400, "ประเภทคำขอไม่ถูกต้อง");
        }

        if (applicationDate && !parseDate(applicationDate)) {
            return sendError(res, 400, "วันที่ยื่นคำขอไม่ถูกต้อง");
        }

        let expirationDate = existing.expirationDate;

        if (applicationType && applicationDate) {
            const calculated = calculateExpirationDate(
                applicationType,
                applicationDate
            );

            if (!calculated) {
                return sendError(res, 400, "ไม่สามารถคำนวณวันหมดอายุได้");
            }

            expirationDate = calculated;
        } else if (!applicationType || !applicationDate) {
            expirationDate = null;
        }

        const previousExpirationDate = parseOptionalText(
            data,
            "previousExpirationDate",
            existing.previousExpirationDate
        );

        const houseNo = parseOptionalText(data, "houseNo", existing.houseNo);
        const moo = parseOptionalText(data, "moo", existing.moo);
        const road = parseOptionalText(data, "road", existing.road);
        const subdistrict = parseOptionalText(
            data,
            "subdistrict",
            existing.subdistrict
        );
        const domicileDistrict = parseOptionalText(
            data,
            "domicileDistrict",
            existing.domicileDistrict
        );
        const domicileProvince = parseOptionalText(
            data,
            "domicileProvince",
            existing.domicileProvince
        );

        const domicile = buildDomicile({
            houseNo,
            moo,
            road,
            subdistrict,
            domicileDistrict,
            domicileProvince,
        });

        const parsedAmount =
            data.amount !== undefined
                ? parseOptionalInteger(data.amount)
                : { valid: true, value: existing.amount };

        if (
            !parsedAmount.valid ||
            (parsedAmount.value !== null && parsedAmount.value < 0)
        ) {
            return sendError(
                res,
                400,
                "จำนวนเงินต้องเป็นจำนวนเต็มและไม่ติดลบ"
            );
        }

        const amount = parsedAmount.value;

        const petitionDateResult =
            data.petitionDate !== undefined
                ? parseOptionalDate(data.petitionDate)
                : { valid: true, value: existing.petitionDate };

        if (!petitionDateResult.valid) {
            return sendError(res, 400, "วันที่คำร้องไม่ถูกต้อง");
        }

        const receiptBookNo = parseOptionalText(
            data,
            "receiptBookNo",
            existing.receiptBookNo
        );

        const rawReceiptNo = parseOptionalText(
            data,
            "receiptNo",
            existing.receiptNo
        );

        if (rawReceiptNo && !/^\d{1,2}$/.test(rawReceiptNo)) {
            return sendError(res, 400, "เลขที่ใบเสร็จไม่ถูกต้อง");
        }

        const receiptNo = rawReceiptNo
            ? rawReceiptNo.padStart(2, "0")
            : null;

        if (receiptNo) {
            const duplicateReceipt = await prisma.foreigner.findFirst({
                where: {
                    receiptBookNo: receiptBookNo || "01",
                    receiptNo,
                    NOT: { id: id.trim() },
                },
                select: { id: true },
            });

            if (duplicateReceipt) {
                return sendError(
                    res,
                    409,
                    "เลขที่ใบเสร็จนี้ถูกใช้งานแล้ว"
                );
            }
        }

        const updateData = {
            year,
            foreignerIdNo: parseOptionalText(
                data,
                "foreignerIdNo",
                existing.foreignerIdNo
            ),
            prefix,
            firstName,
            lastName,
            fullName: buildFullName({ prefix, firstName, lastName }),
            age,
            nationality: parseOptionalText(
                data,
                "nationality",
                existing.nationality
            ),
            ethnicity: parseOptionalText(
                data,
                "ethnicity",
                existing.ethnicity
            ),
            certificateRegistrationNo: parseOptionalText(
                data,
                "certificateRegistrationNo",
                existing.certificateRegistrationNo
            ),
            certificateDate: parseOptionalText(
                data,
                "certificateDate",
                existing.certificateDate
            ),
            district: parseOptionalText(data, "district", existing.district),
            province: parseOptionalText(data, "province", existing.province),
            policeStation: parseOptionalText(
                data,
                "policeStation",
                existing.policeStation
            ),
            policeProvince: parseOptionalText(
                data,
                "policeProvince",
                existing.policeProvince
            ),
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
            amountText: numberToThaiText(amount),
            receiptBookNo,
            receiptNo,
            receiptDate: parseOptionalText(
                data,
                "receiptDate",
                existing.receiptDate
            ),
            certificateNo: parseOptionalText(
                data,
                "certificateNo",
                existing.certificateNo
            ),
            petitionDate: petitionDateResult.value,
        };

        const foreigner = await prisma.foreigner.update({
            where: { id: id.trim() },
            data: updateData,
        });

        console.log(`UPDATE FOREIGNER: ${foreigner.fullName}`);

        return res.json({
            success: true,
            data: foreigner,
        });
    } catch (err) {
        return handlePrismaError(res, err, "UPDATE FOREIGNER ERROR");
    }
});

// --------------------------------------------------
// DELETE
// --------------------------------------------------

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!validateId(id)) {
            return sendError(res, 400, "รหัสข้อมูลไม่ถูกต้อง");
        }

        const existing = await prisma.foreigner.findUnique({
            where: { id: id.trim() },
            select: { id: true, fullName: true },
        });

        if (!existing) {
            return sendError(res, 404, "ไม่พบข้อมูลคนต่างด้าว");
        }

        await prisma.foreigner.delete({
            where: { id: id.trim() },
        });

        console.log(`DELETE FOREIGNER: ${existing.fullName}`);

        return res.json({
            success: true,
            message: "ลบข้อมูลสำเร็จ",
        });
    } catch (err) {
        return handlePrismaError(res, err, "DELETE FOREIGNER ERROR");
    }
});

export default router;
