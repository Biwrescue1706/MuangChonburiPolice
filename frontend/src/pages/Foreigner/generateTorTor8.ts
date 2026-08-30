import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import api from "../../api/axios";
import type { Foreigner } from "../../types/foreigner";

const SHORT_THAI_MONTHS = [
  "",
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

const FULL_THAI_MONTHS: Record<string, string> = {
  "ม.ค.": "มกราคม",
  "ก.พ.": "กุมภาพันธ์",
  "มี.ค.": "มีนาคม",
  "เม.ย.": "เมษายน",
  "พ.ค.": "พฤษภาคม",
  "มิ.ย.": "มิถุนายน",
  "ก.ค.": "กรกฎาคม",
  "ส.ค.": "สิงหาคม",
  "ก.ย.": "กันยายน",
  "ต.ค.": "ตุลาคม",
  "พ.ย.": "พฤศจิกายน",
  "ธ.ค.": "ธันวาคม",
};

// แปลงวันที่เป็นวันที่ไทย
function formatThaiDate(value: string | null | undefined) {
  if (!value) return "-";
  const text = String(value).trim();
  const match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return `${day} ${SHORT_THAI_MONTHS[month]} ${year + 543}`;
    }
  }

  return text;
}

// แยกวันเดือนปีและแปลงเดือนเป็นชื่อเต็ม
function splitThaiDate(value: string | null | undefined) {
  if (!value) return { day: "", month: "", year: "" };

  const text = String(value).trim();
  const match = text.match(/^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/);

  if (!match) return { day: "", month: "", year: "" };

  const day = match[1];
  const shortMonth = match[2];
  const year = match[3];

  return {
    day,
    month: FULL_THAI_MONTHS[shortMonth] || shortMonth,
    year,
  };
}

// จัดรูปแบบจำนวนเงิน
function formatMoney(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "-";

  const number = Number(value);

  if (Number.isNaN(number)) return String(value);

  return number.toLocaleString("th-TH");
}

// สร้างชื่อเต็ม
function getFullName(data: Foreigner) {
  if (data.fullName) return data.fullName;

  return (
    [data.prefix, data.firstName, data.lastName].filter(Boolean).join(" ") ||
    "-"
  );
}

// ดึงลายเซ็นจาก API
async function getSignatureImage(): Promise<{
  bytes: ArrayBuffer;
  type: string;
} | null> {
  try {
    const response = await api.get("/organization");
    const result = response.data;
    const organization = Array.isArray(result)
      ? result[0]
      : (result?.data ?? result);
    const signatureImage = organization?.commander?.signatureImage;

    if (!signatureImage) {
      console.warn("ไม่พบ commander.signatureImage");
      return null;
    }

    if (signatureImage.startsWith("data:image/")) {
      const match = signatureImage.match(/^data:(image\/[^;]+);base64,(.+)$/);

      if (!match) return null;

      const binary = atob(match[2]);
      const bytes = new Uint8Array(binary.length);

      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      return {
        bytes: bytes.buffer,
        type: match[1],
      };
    }

    const imageResponse = await fetch(signatureImage);

    if (!imageResponse.ok) {
      console.error("โหลดลายเซ็นไม่สำเร็จ:", imageResponse.status);
      return null;
    }

    return {
      bytes: await imageResponse.arrayBuffer(),
      type: imageResponse.headers.get("content-type") || "image/png",
    };
  } catch (error) {
    console.error("GET SIGNATURE IMAGE ERROR:", error);
    return null;
  }
}

// สร้าง PDF ทต.8
export async function generateTorTor8(data: Foreigner) {
  try {
    const [pdfResponse, fontResponse, signature] = await Promise.all([
      fetch("/ทต.8.pdf"),
      fetch("/fonts/THSarabunIT9.ttf"),
      getSignatureImage(),
    ]);

    if (!pdfResponse.ok) throw new Error("ไม่พบไฟล์ ทต.8.pdf");
    if (!fontResponse.ok) throw new Error("ไม่พบไฟล์ THSarabunIT9.ttf");

    const pdfBytes = await pdfResponse.arrayBuffer();
    const fontBytes = await fontResponse.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);

    pdfDoc.registerFontkit(fontkit);

    const font = await pdfDoc.embedFont(fontBytes);
    const page = pdfDoc.getPages()[0];
    const size = 16;
    const color = rgb(0, 0, 0.8);

    const text = (
      value: string | number | null | undefined,
      x: number,
      y: number,
    ) => {
      if (value === null || value === undefined || value === "") return;

      page.drawText(String(value), {
        x,
        y,
        size,
        font,
        color,
      });
    };

    const fullName = getFullName(data);
    const applicationDate = formatThaiDate(data.applicationDate);
    const previousExpirationDate = formatThaiDate(data.previousExpirationDate);
    const certificateDate = formatThaiDate(data.certificateDate);
    const expirationDate = formatThaiDate(data.expirationDate);
    const receiptDate = formatThaiDate(data.receiptDate);
    const receiptDateParts = splitThaiDate(receiptDate);

    // ข้อมูลบุคคล
    text(receiptDateParts.day, 290, 625);
    text(receiptDateParts.month, 360, 625);
    text(receiptDateParts.year, 460, 625);
    text(data.prefix, 165, 605);
    text(data.firstName, 185, 605);
    text(data.lastName, 375, 605);
    text(data.age !== null ? data.age : "", 95, 585);
    text(data.ethnicity, 210, 585);
    text(data.nationality, 320, 585);

    // ที่อยู่
    text(data.houseNo, 430, 585);
    text(data.moo || "-", 90, 562);
    text(data.road || "-", 185, 562);
    text(data.subdistrict, 360, 562);

    // ใบสำคัญ
    text(fullName, 320, 482);
    text(data.certificateRegistrationNo, 95, 462);
    text(certificateDate, 260, 462);
    text(data.policeStation?.replace(/^สถานีตำรวจ\s*/, ""), 135, 440);
    text(data.policeProvince, 320, 440);

    // วันหมดอายุก่อนต่ออายุ
    text(previousExpirationDate, 120, 420);

    // การขอรับ
    text(data.applicationType === "ชนิดที่ 1" ? "1" : "2", 250, 397);
    text(data.amount !== null ? formatMoney(data.amount) : "", 440, 397);
    text(data.amountText, 80, 375);
    text(data.fullName, 340, 338);

    // คำสั่งนายทะเบียน
    text(data.applicationType === "ชนิดที่ 1" ? "1" : "2", 410, 239);
    text(applicationDate, 360, 218);
    text(expirationDate, 365, 197);
    text(data.receiptBookNo, 400, 175);
    text(data.receiptNo, 480, 175);
    text(receiptDate, 310, 155);

    // ใส่ลายเซ็น
    if (signature) {
      try {
        let signaturePdfImage;

        if (signature.type.includes("png")) {
          signaturePdfImage = await pdfDoc.embedPng(signature.bytes);
        } else if (
          signature.type.includes("jpeg") ||
          signature.type.includes("jpg")
        ) {
          signaturePdfImage = await pdfDoc.embedJpg(signature.bytes);
        } else {
          throw new Error(`ไม่รองรับชนิดรูปภาพ: ${signature.type}`);
        }

        page.drawImage(signaturePdfImage, {
          x: 350,
          y: 115,
          width: 80,
          height: 30,
        });
      } catch (error) {
        console.error("ADD SIGNATURE ERROR:", error);
      }
    }

    // บันทึก PDF
    const result = await pdfDoc.save();
    const arrayBuffer = new ArrayBuffer(result.byteLength);

    new Uint8Array(arrayBuffer).set(result);

    const blob = new Blob([arrayBuffer], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `ทต.8_${fullName || "คนต่างด้าว"}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    console.error("GENERATE ทต.8 ERROR:", error);
    throw error;
  }
}
