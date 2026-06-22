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
    const response = await fetch("/forensic-template2.pdf");

    const templateBytes = await response.arrayBuffer();

    if (!response.ok) {
      throw new Error(`โหลด Template PDF ไม่สำเร็จ (${response.status})`);
    }

    const pdfDoc = await PDFDocument.load(templateBytes);

    pdfDoc.registerFontkit(fontkit);

    const fontResponse = await fetch("/fonts/THSarabunIT9.ttf");

    const fontBytes = await fontResponse.arrayBuffer();

    if (!fontResponse.ok) {
      throw new Error("ไม่พบไฟล์ THSarabunIT9.ttf");
    }

    const font = await pdfDoc.embedFont(fontBytes);

    const page = pdfDoc.getPages()[0];

    const black = rgb(0, 0, 0);

    const orgRes = await fetch(`${api.defaults.baseURL}/organization`);
    const orgData = await orgRes.json();

    const org = orgData[0];

    const day = data.submissionDate
      ? new Date(data.submissionDate).getDate().toString()
      : "";

    page.drawText(day, {
      x: 312,
      y: 732,
      size: 16,
      font,
      color: rgb(0 / 255, 0 / 255, 255 / 255),
    });

    page.drawText(formatThaiMonthYear(data.submissionDate), {
      x: 327,
      y: 732,
      size: 16,
      font,
      color: black,
    });


    // จนท.พิมพ์มือ
    page.drawText(org?.rank || "-", {
      x: 322,
      y: 479.5,
      size: 16,
      font,
      color: black,
    });

    page.drawText(`( ${org?.fullName || "-"} )`, {
      x: 349,
      y: 458.5,
      size: 16,
      font,
      color: black,
    });
    page.drawText(org?.position || "-", {
      x: 325.5,
      y: 437.5,
      size: 16,
      font,
      color: black,
    });

    // ผู้บังคับบัญชา
    if (org?.commander?.signatureImage) {
      const imageResponse = await fetch(org.commander.signatureImage);

      const imageBytes = await imageResponse.arrayBuffer();

      const signatureImage = await pdfDoc.embedPng(imageBytes);

      page.drawImage(signatureImage, {
        x: 185,
        y: 375,
        width: 55,
        height: 55,
      });
    }

    page.drawText(org?.commander?.rank || "-", {
      x: 138,
      y: 375,
      size: 16,
      font,
      color: black,
    });

    page.drawText(`( ${org?.commander?.fullName || "-"} )`, {
      x: 166,
      y: 354,
      size: 16,
      font,
      color: black,
    });

    page.drawText(org?.commander?.position || "-", {
      x: 163,
      y: 333,
      size: 16,
      font,
      color: black,
    });

    // จนท.ผู้รับผิดชอบ
    page.drawText(org?.rank || "-", {
      x: 292.5,
      y: 196.5,
      size: 16,
      font,
      color: black,
    });

    page.drawText(`( ${org?.fullName || "-"} )`, {
      x: 335,
      y: 175.5,
      size: 16,
      font,
      color: black,
    });

    page.drawText(org?.position || "-", {
      x: 311.5,
      y: 154.5,
      size: 16,
      font,
      color: black,
    });

    // จนท.การเงิน
    page.drawText(org?.finance?.rank || "-", {
      x: 292.5,
      y: 113,
      size: 16,
      font,
      color: black,
    });

    page.drawText(`( ${org?.finance?.fullName || "-"} )`, {
      x: 335,
      y: 92,
      size: 16,
      font,
      color: black,
    });

    page.drawText(org?.finance?.position || "-", {
      x: 321.5,
      y: 71,
      size: 16,
      font,
      color: black,
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
