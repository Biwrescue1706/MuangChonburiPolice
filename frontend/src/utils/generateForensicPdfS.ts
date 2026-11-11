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
    return `${parts[1]}  ${parts[2]}`;
  }

  return dateString;
}

export async function generateForensicPdfs(data: ForensicPdfData) {
  try {
    // โหลด Template PDF
    const response = await fetch("/forensic-template2.pdf");

    if (!response.ok) {
      throw new Error(`โหลด Template PDF ไม่สำเร็จ (${response.status})`);
    }

    const templateBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(templateBytes);

    pdfDoc.registerFontkit(fontkit);

    // โหลดฟอนต์ปกติ
    const fontResponse = await fetch("/fonts/THSarabunIT9.ttf");

    if (!fontResponse.ok) {
      throw new Error("ไม่พบไฟล์ THSarabunIT9.ttf");
    }

    const fontBytes = await fontResponse.arrayBuffer();
    const font = await pdfDoc.embedFont(fontBytes);

    // โหลดฟอนต์ตัวหนา
    const boldFontResponse = await fetch("/fonts/THSarabunIT9-Bold.ttf");

    if (!boldFontResponse.ok) {
      throw new Error("ไม่พบไฟล์ THSarabunIT9-Bold.ttf");
    }

    const boldFontBytes = await boldFontResponse.arrayBuffer();
    const boldFont = await pdfDoc.embedFont(boldFontBytes);

    const page = pdfDoc.getPages()[0];
    const black = rgb(0, 0, 0);

    // ดึงข้อมูลหน่วยงาน
    const orgRes = await fetch(`${api.defaults.baseURL}/organization`);

    if (!orgRes.ok) {
      throw new Error("ไม่สามารถดึงข้อมูลหน่วยงานได้");
    }

    const orgData = await orgRes.json();

    // API ส่งข้อมูลในรูปแบบ { data: [], pagination: {} }
    const org = orgData?.data?.[0];

    if (!org) {
      throw new Error("ไม่พบข้อมูลหน่วยงาน");
    }

    // วันที่
    const day = data.submissionDate
      ? new Date(data.submissionDate).getDate().toString()
      : "";

    page.drawText(day, {
      x: 315,
      y: 732,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 1),
    });

    page.drawText(formatThaiMonthYear(data.submissionDate), {
      x: 337,
      y: 732,
      size: 16,
      font,
      color: black,
    });

    // เจ้าหน้าที่พิมพ์มือ
    page.drawText(org.rank || "-", {
      x: 322,
      y: 479.5,
      size: 16,
      font,
      color: black,
    });

    page.drawText(`( ${org.fullName || "-"} )`, {
      x: 349,
      y: 458.5,
      size: 16,
      font,
      color: black,
    });

    page.drawText(org.position || "-", {
      x: 325.5,
      y: 437.5,
      size: 16,
      font,
      color: black,
    });

    // ผู้บังคับบัญชา
    if (org.commander?.signatureImage) {
      const imageResponse = await fetch(org.commander.signatureImage);

      if (!imageResponse.ok) {
        throw new Error("ไม่สามารถโหลดรูปภาพลายเซ็นผู้บังคับบัญชาได้");
      }

      const imageBytes = await imageResponse.arrayBuffer();
      const signatureImage = await pdfDoc.embedPng(imageBytes);

      page.drawImage(signatureImage, {
        x: 170,
        y: 375,
        width: 100,
        height: 50,
      });
    }

    page.drawText(org.commander?.rank || "-", {
      x: 138,
      y: 375,
      size: 16,
      font,
      color: black,
    });

    page.drawText(`( ${org.commander?.fullName || "-"} )`, {
      x: 166,
      y: 354,
      size: 16,
      font,
      color: black,
    });

    page.drawText(org.commander?.position || "-", {
      x: 163,
      y: 333,
      size: 16,
      font,
      color: black,
    });

    // เจ้าหน้าที่ผู้รับผิดชอบ
    page.drawText(org.rank || "-", {
      x: 292.5,
      y: 196.5,
      size: 16,
      font,
      color: black,
    });

    page.drawText(`( ${org.fullName || "-"} )`, {
      x: 335,
      y: 175.5,
      size: 16,
      font,
      color: black,
    });

    page.drawText(org.position || "-", {
      x: 311.5,
      y: 154.5,
      size: 16,
      font,
      color: black,
    });

    // เจ้าหน้าที่การเงิน
    page.drawText(org.finance?.rank || "-", {
      x: 292.5,
      y: 113,
      size: 16,
      font,
      color: black,
    });

    page.drawText(`( ${org.finance?.fullName || "-"} )`, {
      x: 335,
      y: 92,
      size: 16,
      font,
      color: black,
    });

    page.drawText(org.finance?.position || "-", {
      x: 321.5,
      y: 71,
      size: 16,
      font,
      color: black,
    });

    // บันทึก PDF
    const pdfBytes = await pdfDoc.save();

    // แปลงเป็น ArrayBuffer เพื่อแก้ TypeScript TS2322
    const pdfArrayBuffer = new ArrayBuffer(pdfBytes.byteLength);
    new Uint8Array(pdfArrayBuffer).set(pdfBytes);

    const blob = new Blob([pdfArrayBuffer], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `ปะหน้าส่งการเงิน-${data.submissionNo || "document"}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PDF Error:", error);

    alert(error instanceof Error ? error.message : "สร้าง PDF ไม่สำเร็จ");
  }
}
