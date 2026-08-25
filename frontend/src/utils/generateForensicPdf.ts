// src/utils/generateForensicPdf.ts

import { PDFDocument, PDFPage, PDFFont, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import QRCode from "qrcode";
import Swal from "sweetalert2";
import api from "../api/axios";

/* ======================================================
   TYPES
====================================================== */

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

/* ======================================================
   DATE FORMAT
====================================================== */

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

/* ======================================================
   DRAW FORENSIC PAGE
====================================================== */

async function drawForensicPage(
  pdfDoc: PDFDocument,
  page: PDFPage,
  data: ForensicPdfData,
  font: PDFFont,
  boldFont: PDFFont,
  org: any,
) {
  const black = rgb(0, 0, 0);

  /* ====================================================
     เลขที่ส่งตรวจ
  ==================================================== */

  page.drawText(data.submissionNo || "-", {
    x: 173,
    y: 728,
    size: 16,
    font: boldFont,
    color: rgb(0, 0, 1),
  });

  page.drawText(formatThaiDate(data.submissionDate), {
    x: 315,
    y: 728,
    size: 16,
    font: boldFont,
    color: rgb(0, 0, 1),
  });

  page.drawText(formatThaiMonthYear(data.submissionDate), {
    x: 337,
    y: 728,
    size: 16,
    font,
    color: black,
  });

  /* ====================================================
     ลายเซ็น
  ==================================================== */

  if (org?.commander?.signatureImage) {
      const imageResponse = await fetch(org.commander.signatureImage);

      const imageBytes = await imageResponse.arrayBuffer();

      const signatureImage = await pdfDoc.embedPng(imageBytes);

      page.drawImage(signatureImage, {
        x: 315,
        y: 570,
        width: 100,
        height: 50,
      });
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

  /* ====================================================
     HEADER TABLE
  ==================================================== */

  const headerTop = 475;

  page.drawRectangle({
    x: 10,
    y: headerTop,
    width: 580,
    height: 40,
    borderWidth: 1,
    borderColor: black,
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

  /* ====================================================
     HEADER TEXT
  ==================================================== */

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

  /* ====================================================
     PERSONS
  ==================================================== */

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

  /* ====================================================
     เส้นปิดท้าย
  ==================================================== */

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

/* ======================================================
   GENERATE PDF
====================================================== */

export async function generateForensicPdf(data: ForensicPdfData) {
  try {
    /* ====================================================
       CHECK SUBMISSION ID
    ==================================================== */

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

    /* ====================================================
       LOAD TEMPLATE
    ==================================================== */

    const response = await fetch("/ปะหน้าส่งตรวจลายนิ้วมือ พฐ.pdf");

    if (!response.ok) {
      throw new Error(`โหลด Template PDF ไม่สำเร็จ (${response.status})`);
    }

    const templateBytes = await response.arrayBuffer();

    /* ====================================================
       NORMAL FONT
    ==================================================== */

    const fontResponse = await fetch("/fonts/THSarabunIT9.ttf");

    if (!fontResponse.ok) {
      throw new Error("ไม่พบไฟล์ THSarabunIT9.ttf");
    }

    const fontBytes = await fontResponse.arrayBuffer();

    /* ====================================================
       BOLD FONT
    ==================================================== */

    const boldFontResponse = await fetch("/fonts/THSarabunIT9-Bold.ttf");

    if (!boldFontResponse.ok) {
      throw new Error("ไม่พบไฟล์ THSarabunIT9-Bold.ttf");
    }

    const boldFontBytes = await boldFontResponse.arrayBuffer();

    /* ====================================================
       PDF
    ==================================================== */

    const pdfDoc = await PDFDocument.load(templateBytes);

    pdfDoc.registerFontkit(fontkit);

    const font = await pdfDoc.embedFont(fontBytes);

    const boldFont = await pdfDoc.embedFont(boldFontBytes);

    /* ====================================================
       ORGANIZATION
    ==================================================== */

    const orgRes = await fetch(`${api.defaults.baseURL}/organization`);

    if (!orgRes.ok) {
      throw new Error("โหลดข้อมูลหน่วยงานไม่สำเร็จ");
    }

    const orgData = await orgRes.json();

    const org = orgData[0];

    /* ====================================================
       แบ่งคน 20 คน / หน้า
    ==================================================== */

    const PERSONS_PER_PAGE = 20;

    const personPages: ForensicPerson[][] = [];

    for (let i = 0; i < data.persons.length; i += PERSONS_PER_PAGE) {
      personPages.push(data.persons.slice(i, i + PERSONS_PER_PAGE));
    }

    if (personPages.length === 0) {
      personPages.push([]);
    }

    /* ====================================================
       ทำซ้ำ 3 รอบ
    ==================================================== */

    const TOTAL_ROUNDS = 3;

    let qrPage: PDFPage | null = null;

    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      for (let pageIndex = 0; pageIndex < personPages.length; pageIndex++) {
        let page: PDFPage;

        /* ==================================================
           หน้าแรกของรอบแรก
        ================================================== */

        if (round === 1 && pageIndex === 0) {
          page = pdfDoc.getPages()[0];
        } else {
          /* ==================================================
             Copy Template
          ================================================== */

          const [newPage] = await pdfDoc.copyPages(pdfDoc, [0]);

          page = newPage;

          pdfDoc.addPage(page);
        }

        /* ==================================================
           ข้อมูลของหน้าปัจจุบัน
        ================================================== */

        const pageData: ForensicPdfData = {
          ...data,
          persons: personPages[pageIndex],
        };

        /* ==================================================
           วาดหน้า
        ================================================== */

        await drawForensicPage(pdfDoc, page, pageData, font, boldFont, org);

        /* ==================================================
           QR:
           รอบ 3 หน้าแรกเท่านั้น
        ================================================== */

        if (round === 3 && pageIndex === 0) {
          qrPage = page;
        }
      }
    }

    /* ====================================================
       CREATE QR CODE
       เก็บเฉพาะ submissionId
    ==================================================== */

    if (qrPage) {
      const qrData = data.submissionId;

      console.log("QR Data:", qrData);

      const qrDataUrl = await QRCode.toDataURL(qrData, {
        errorCorrectionLevel: "H",
        type: "image/png",
        margin: 4,
        width: 800,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      /* ==================================================
         Data URL -> Uint8Array
      ================================================== */

      const base64 = qrDataUrl.split(",")[1];

      if (!base64) {
        throw new Error("สร้าง QR Code ไม่สำเร็จ");
      }

      const binary = atob(base64);

      const qrBytes = new Uint8Array(binary.length);

      for (let i = 0; i < binary.length; i++) {
        qrBytes[i] = binary.charCodeAt(i);
      }

      /* ==================================================
         Embed QR
      ================================================== */

      const qrImage = await pdfDoc.embedPng(qrBytes);

      /* ==================================================
         วาง QR
      ================================================== */

      qrPage.drawImage(qrImage, {
        x: 480,
        y: 695,
        width: 105,
        height: 105,
      });

      qrPage.drawText("สแกนเพื่อตรวจสอบสถานะ", {
        x: 475,
        y: 683,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
    }

    /* ====================================================
       SAVE PDF
    ==================================================== */

    const pdfBytes = await pdfDoc.save();

    /*
     * ใช้ Uint8Array ใหม่
     * ป้องกัน TypeScript แจ้ง error
     * ตรง Blob
     */

    const blob = new Blob([new Uint8Array(pdfBytes)], {
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

    /* ====================================================
       SUCCESS
    ==================================================== */

    const totalPages = personPages.length * TOTAL_ROUNDS;

    await Swal.fire({
      icon: "success",
      title: "สร้าง PDF สำเร็จ",
      text: `สร้างเอกสาร ${totalPages} หน้า พร้อม QR Code`,
      confirmButtonColor: "#800020",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error("PDF Error:", error);

    await Swal.fire({
      icon: "error",
      title: "สร้าง PDF ไม่สำเร็จ",
      text:
        error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการสร้าง PDF",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#800020",
    });
  }
}
