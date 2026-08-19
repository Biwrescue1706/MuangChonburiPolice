// src/utils/generateForensicPdf.ts

import { PDFDocument, PDFPage, PDFFont, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import QRCode from "qrcode";
import Swal from "sweetalert2";
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
  submissionId: string;
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

function formatThaiDate(dateString?: string): string {
  if (!dateString) return "";

  const parts = dateString.trim().split(" ");

  return parts[0] || "";
}

// ======================================================
// วาด PDF 1 หน้า
// ======================================================

async function drawForensicPage(
  pdfDoc: PDFDocument,
  page: PDFPage,
  data: ForensicPdfData,
  font: PDFFont,
  boldFont: PDFFont,
  org: any,
) {
  const black = rgb(0, 0, 0);

  // ====================================================
  // เลขที่ส่งตรวจ
  // ====================================================

  page.drawText(data.submissionNo || "-", {
    x: 173,
    y: 728,
    size: 16,
    font: boldFont,
    color: rgb(0 / 255, 0 / 255, 255 / 255),
  });

  page.drawText(formatThaiDate(data.submissionDate), {
    x: 315,
    y: 728,
    size: 16,
    font: boldFont,
    color: rgb(0 / 255, 0 / 255, 255 / 255),
  });

  page.drawText(formatThaiMonthYear(data.submissionDate), {
    x: 337,
    y: 728,
    size: 16,
    font,
    color: black,
  });

  // ====================================================
  // ลายเซ็น
  // ====================================================

  if (org?.commander?.signatureImage) {
    try {
      const imageResponse = await fetch(org.commander.signatureImage);

      if (imageResponse.ok) {
        const imageBytes = await imageResponse.arrayBuffer();

        const signatureImage = await pdfDoc.embedPng(imageBytes);

        page.drawImage(signatureImage, {
          x: 315,
          y: 570,
          width: 100,
          height: 50,
        });
      }
    } catch (error) {
      console.warn("โหลดลายเซ็นไม่สำเร็จ:", error);
    }
  }

  page.drawText(org?.commander?.fullRank || "-", {
    x: 251,
    y: 569,
    size: 16,
    font,
    color: black,
  });

  page.drawText(`( ${org?.commander?.fullName || "-"} )`, {
    x: 318,
    y: 551,
    size: 16,
    font,
    color: black,
  });

  page.drawText(org?.commander?.fullPosition || "-", {
    x: 276,
    y: 533,
    size: 16,
    font,
    color: black,
  });

  // ====================================================
  // หัวตาราง
  // ====================================================

  const headerTop = 475;

  page.drawRectangle({
    x: 10,
    y: headerTop,
    width: 580,
    height: 40,
    borderWidth: 1,
    borderColor: rgb(0, 0, 0),
    color: rgb(1, 1, 1),
  });

  [43, 180, 375, 540].forEach((x) => {
    page.drawLine({
      start: {
        x,
        y: headerTop,
      },
      end: {
        x,
        y: headerTop + 40,
      },
      thickness: 1,
    });
  });

  // เส้นย่อยใบเสร็จ
  [430, 475].forEach((x) => {
    page.drawLine({
      start: {
        x,
        y: headerTop,
      },
      end: {
        x,
        y: headerTop + 20,
      },
      thickness: 1,
    });
  });

  page.drawLine({
    start: {
      x: 375,
      y: headerTop + 20,
    },
    end: {
      x: 540,
      y: headerTop + 20,
    },
    thickness: 1,
  });

  // ====================================================
  // ชื่อหัวตาราง
  // ====================================================

  page.drawText("ลำดับ", {
    x: 15,
    y: headerTop + 16,
    size: 15,
    font: boldFont,
  });

  page.drawText("ชื่อ และ ชื่อสกุล", {
    x: 70,
    y: headerTop + 16,
    size: 15,
    font: boldFont,
  });

  page.drawText("เรื่องที่ขออนุญาต", {
    x: 250,
    y: headerTop + 16,
    size: 15,
    font: boldFont,
  });

  page.drawText("ใบเสร็จรับเงิน", {
    x: 435,
    y: headerTop + 25,
    size: 15,
    font: boldFont,
  });

  page.drawText("หมายเหตุ", {
    x: 545,
    y: headerTop + 12,
    size: 15,
    font: boldFont,
  });

  page.drawText("เล่มที่", {
    x: 392,
    y: headerTop + 4,
    size: 15,
    font: boldFont,
  });

  page.drawText("เลขที่", {
    x: 440,
    y: headerTop + 4,
    size: 15,
    font: boldFont,
  });

  page.drawText("ลงวันที่", {
    x: 495,
    y: headerTop + 4,
    size: 15,
    font: boldFont,
  });

  // ====================================================
  // รายการบุคคล
  // ====================================================

  let y = 457;

  const rowHeight = 22;

  const borders = [10, 43, 180, 375, 430, 475, 540, 590];

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
      x: 22,
      y,
      size: 16,
      font,
    });

    page.drawText(person.fullName || "", {
      x: 51,
      y,
      size: 13,
      font,
    });

    page.drawText(person.purpose || "-", {
      x: 190,
      y,
      size: 13,
      font,
    });

    page.drawText(person.receiptBookNo || "-", {
      x: 385,
      y,
      size: 16,
      font,
    });

    page.drawText(person.receiptNo || "-", {
      x: 444,
      y,
      size: 16,
      font,
    });

    page.drawText(formatShortThaiDate(person.receiptDate), {
      x: 480,
      y,
      size: 16,
      font,
    });

    let priorityText = "";

    if (person.priority === 1) {
      priorityText = "*";
    } else if (person.priority === 2) {
      priorityText = "คืน";
    } else if (person.priority === 3) {
      priorityText = "คืน*";
    }

    page.drawText(priorityText, {
      x: 560,
      y,
      size: 16,
      font: boldFont,
    });

    y -= rowHeight;
  });

  // ====================================================
  // เส้นปิดท้าย
  // ====================================================

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
}

// ======================================================
// สร้าง PDF
// ======================================================

export async function generateForensicPdf(data: ForensicPdfData) {
  try {
    //onDelete : Cascade    // ตรวจ submissionId

    if (!data.submissionId) {
      await Swal.fire({
        icon: "error",
        title: "ไม่พบข้อมูล",
        text: "ไม่พบ submissionId สำหรับสร้าง QR Code",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });

      return;
    }

    // โหลด Template
    //onDelete : Cascade
    const response = await fetch("/ปะหน้าส่งตรวจลายนิ้วมือ พฐ.pdf");

    if (!response.ok) {
      throw new Error(`โหลด Template PDF ไม่สำเร็จ (${response.status})`);
    }

    const templateBytes = await response.arrayBuffer();

    // Font ปกติ
    //onDelete : Cascade
    const fontResponse = await fetch("/fonts/THSarabunIT9.ttf");

    if (!fontResponse.ok) {
      throw new Error("ไม่พบไฟล์ THSarabunIT9.ttf");
    }

    const fontBytes = await fontResponse.arrayBuffer();

    // Font Bold
    //onDelete : Cascade
    const boldFontResponse = await fetch("/fonts/THSarabunIT9-Bold.ttf");

    if (!boldFontResponse.ok) {
      throw new Error("ไม่พบไฟล์ THSarabunIT9-Bold.ttf");
    }

    const boldFontBytes = await boldFontResponse.arrayBuffer();

    // PDF
    //onDelete : Cascade
    const pdfDoc = await PDFDocument.load(templateBytes);

    pdfDoc.registerFontkit(fontkit);

    const font = await pdfDoc.embedFont(fontBytes);

    const boldFont = await pdfDoc.embedFont(boldFontBytes);

    // Organization
    //onDelete : Cascade
    const orgRes = await fetch(`${api.defaults.baseURL}/organization`);

    if (!orgRes.ok) {
      throw new Error("โหลดข้อมูลหน่วยงานไม่สำเร็จ");
    }

    const orgData = await orgRes.json();

    const org = orgData[0];

    // หน้า 1
    //onDelete : Cascade
    const page1 = pdfDoc.getPages()[0];

    // Copy หน้า Template เป็นหน้า 2 และ 3
    //onDelete : Cascade
    const [page2, page3] = await pdfDoc.copyPages(pdfDoc, [0, 0]);

    pdfDoc.addPage(page2);
    pdfDoc.addPage(page3);

    //     // วาดหน้า 1
    ////onDelete : Cascade
    await drawForensicPage(pdfDoc, page1, data, font, boldFont, org);

    // วาดหน้า 2
    //onDelete : Cascade
    await drawForensicPage(pdfDoc, page2, data, font, boldFont, org);

    // วาดหน้า 3
    //onDelete : Cascade
    await drawForensicPage(pdfDoc, page3, data, font, boldFont, org);

    // QR CODE เฉพาะหน้า 3
    //onDelete : Cascade
    const statusUrl = `https://policy-muangchonburi.smartdorm-biwboong.shop/forensic-status/${data.submissionId}`;

    console.log("Forensic Status URL:", statusUrl);

    const qrDataUrl = await QRCode.toDataURL(statusUrl, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 300,
    });

    const qrResponse = await fetch(qrDataUrl);

    const qrBytes = await qrResponse.arrayBuffer();

    const qrImage = await pdfDoc.embedPng(qrBytes);

    //onDelete : Cascade    // QR หน้า 3

    page3.drawImage(qrImage, {
      x: 500,
      y: 720,
      width: 75,
      height: 75,
    });

    page3.drawText("สแกนเพื่อตรวจสอบสถานะ", {
      x: 490,
      y: 710,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    });

    //onDelete : Cascade    // Save
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `ปะหน้าส่งตรวจลายนิ้วมือ พฐ-${
      data.submissionNo || "document"
    }.pdf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    //onDelete : Cascade    // SweetAlert สำเร็จ

    await Swal.fire({
      icon: "success",
      title: "สร้าง PDF สำเร็จ",
      text: "สร้างเอกสาร 3 หน้า พร้อม QR Code เรียบร้อยแล้ว",
      confirmButtonColor: "#800020",
      timer: 2000,
    });
  } catch (error) {
    console.error("PDF Error:", error);

    await Swal.fire({
      icon: "error",
      title: "สร้าง PDF ไม่สำเร็จ",
      text:
        error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการสร้าง PDF",
      confirmButtonColor: "#800020",
      timer: 2000,
    });
  }
}
