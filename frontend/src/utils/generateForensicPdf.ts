// src/utils/generateForensicPdf.ts

import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import api from "../api/axios";

export interface ForensicPerson {
  fullName: string;
  purpose?: string;
  receiptBookNo?: string;
  receiptNo?: string;
  receiptDate?: string;
  priority?: number;
}

export interface ForensicPdfData {
  submissionNo?: string;
  submissionDate?: string;
  persons: ForensicPerson[];
}

function formatShortThaiDate(dateString?: string): string {
  if (!dateString) return "-";

  const months: Record<string, string> = {
    มกราคม: "ม.ค.",
    กุมภาพันธ์: "ก.พ.",
    มีนาคม: "มี.ค.",
    เมษายน: "เม.ย.",
    พฤษภาคม: "พ.ค.",
    มิถุนายน: "มิ.ย.",
    กรกฎาคม: "ก.ค.",
    สิงหาคม: "ส.ค.",
    กันยายน: "ก.ย.",
    ตุลาคม: "ต.ค.",
    พฤศจิกายน: "พ.ย.",
    ธันวาคม: "ธ.ค.",
  };

  const parts = dateString.trim().split(" ");

  if (parts.length !== 3) {
    return dateString;
  }

  const [day, month, year] = parts;

  return `${day} ${months[month] || month} ${year.slice(-2)}`;
}

function formatThaiMonthYear(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (!isNaN(date.getTime())) {
    return date.toLocaleDateString("th-TH", {
      month: "long",
      year: "numeric",
    });
  }

  const parts = dateString.split(" ");

  if (parts.length === 3) {
    return `${parts[1]} ${parts[2]}`;
  }

  return dateString;
}

export async function generateForensicPdf(data: ForensicPdfData) {
  try {
    const response = await fetch("/forensic-template.pdf");

    if (!response.ok) {
      throw new Error(`โหลด Template PDF ไม่สำเร็จ (${response.status})`);
    }

    const templateBytes = await response.arrayBuffer();

    const fontResponse = await fetch("/fonts/THSarabunIT9.ttf");

    if (!fontResponse.ok) {
      throw new Error("ไม่พบไฟล์ THSarabunIT9.ttf");
    }

    const fontBytes = await fontResponse.arrayBuffer();

    const pdfDoc = await PDFDocument.load(templateBytes);

    pdfDoc.registerFontkit(fontkit);

    const font = await pdfDoc.embedFont(fontBytes);

    const page = pdfDoc.getPages()[0];

    const black = rgb(0, 0, 0);

    const orgRes = await fetch(`${api.defaults.baseURL}/organization`);
    const orgData = await orgRes.json();

    const org = orgData[0];

    console.log("signature =", org?.commander?.signatureImage);

    page.drawText(formatThaiMonthYear(data.submissionDate), {
      x: 330,
      y: 731,
      size: 16,
      font,
      color: black,
    });

    if (org?.commander?.signatureImage) {
      const imageResponse = await fetch(org.commander.signatureImage);

      const imageBytes = await imageResponse.arrayBuffer();

      const signatureImage = await pdfDoc.embedPng(imageBytes);

      page.drawImage(signatureImage, {
        x: 330,
        y: 570,
        width: 55,
        height: 25,
      });
    }

    // หัวตาราง

    const headerTop = 475;

    page.drawRectangle({
      x: 10,
      y: headerTop,
      width: 580,
      height: 40,
      borderWidth: 1,
      borderColor: rgb(0, 0, 0),
      color: rgb(1, 1, 1), // พื้นขาว
    });

    [43, 215, 375, 540].forEach((x) => {
      page.drawLine({
        start: { x, y: headerTop },
        end: { x, y: headerTop + 40 },
        thickness: 1,
      });
    });

    // เส้นย่อยของใบเสร็จรับเงิน
    [430, 475].forEach((x) => {
      page.drawLine({
        start: { x, y: headerTop },
        end: { x, y: headerTop + 20 },
        thickness: 1,
      });
    });

    page.drawLine({
      start: { x: 378, y: headerTop + 20 },
      end: { x: 540, y: headerTop + 20 },
      thickness: 1,
    });

    page.drawText("ลำดับ", {
      x: 15,
      y: headerTop + 16,
      size: 15,
      font,
    });

    page.drawText("ชื่อ และ ชื่อสกุล", {
      x: 70,
      y: headerTop + 16,
      size: 15,
      font,
    });

    page.drawText("เรื่องที่ขออนุญาต", {
      x: 255,
      y: headerTop + 16,
      size: 15,
      font,
    });

    page.drawText("ใบเสร็จรับเงิน", {
      x: 435,
      y: headerTop + 25,
      size: 15,
      font,
    });

    page.drawText("หมายเหตุ", {
      x: 543,
      y: headerTop + 12,
      size: 15,
      font,
    });

    // ====================
    // หัวข้อย่อย
    // ====================

    page.drawText("เล่มที่", {
      x: 390,
      y: headerTop + 4,
      size: 15,
      font,
    });

    page.drawText("เลขที่", {
      x: 435,
      y: headerTop + 4,
      size: 15,
      font,
    });

    page.drawText("ลงวันที่", {
      x: 490,
      y: headerTop + 4,
      size: 15,
      font,
    });

    // ======================================================
    // ข้อมูล
    // ======================================================

    let y = 457;

    const rowHeight = 22;

    const borders = [10, 43, 215, 375, 430, 475, 540, 590];

    data.persons.forEach((person, index) => {
      page.drawLine({
        start: {
          x: 10,
          y: y + 18,
        },
        end: {
          x: 590,
          y: y + 18,
        },
        thickness: 0.5,
      });

      borders.forEach((x) => {
        page.drawLine({
          start: {
            x,
            y: y + 18,
          },
          end: {
            x,
            y: y - 5,
          },
          thickness: 0.5,
        });
      });

      page.drawText(String(index + 1), {
        x: 20,
        y,
        size: 13,
        font,
      });

      page.drawText(person.fullName || "", {
        x: 47,
        y,
        size: 13,
        font,
      });

      page.drawText(person.purpose || "-", {
        x: 225,
        y,
        size: 13,
        font,
      });

      page.drawText(person.receiptBookNo || "-", {
        x: 385,
        y,
        size: 13,
        font,
      });

      page.drawText(person.receiptNo || "-", {
        x: 440,
        y,
        size: 13,
        font,
      });

      page.drawText(formatShortThaiDate(person.receiptDate), {
        x: 480,
        y,
        size: 13,
        font,
      });

      page.drawText(person.priority === 1 ? "*" : "", {
        x: 565,
        y,
        size: 13,
        font,
      });

      y -= rowHeight;
    });

    page.drawLine({
      start: {
        x: 10,
        y: y + 18,
      },
      end: {
        x: 590,
        y: y + 18,
      },
      thickness: 0.5,
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `forensic-${data.submissionNo || "document"}.pdf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PDF Error:", error);

    alert(error instanceof Error ? error.message : "สร้าง PDF ไม่สำเร็จ");
  }
}
