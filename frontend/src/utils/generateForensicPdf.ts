
// src/utils/generateForensicPdf.ts

import {
  PDFDocument,
  PDFPage,
  PDFFont,
  PDFImage,
  rgb,
} from "pdf-lib";
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

interface CommanderData {
  fullRank?: string | null;
  fullName?: string | null;
  fullPosition?: string | null;
  signatureImage?: string | null;
}

interface OrganizationData {
  commander?: CommanderData | null;
  [key: string]: unknown;
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

  const parts = dateString.trim().split(/\s+/);

  if (parts.length !== 3) {
    return dateString;
  }

  const [day, month, year] = parts;

  return `${day} ${months[month] || month} ${year.slice(-2)}`;
}

function formatThaiMonthYear(dateString?: string): string {
  if (!dateString) return "";

  const parts = dateString.trim().split(/\s+/);

  if (parts.length === 3) {
    return `${parts[1]} ${parts[2]}`;
  }

  const date = new Date(dateString);

  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleDateString("th-TH", {
      month: "long",
      year: "numeric",
      timeZone: "Asia/Bangkok",
    });
  }

  return dateString;
}

function formatThaiDate(dateString?: string): string {
  if (!dateString) return "";

  const parts = dateString.trim().split(/\s+/);

  return parts[0] || "";
}

/**
 * รองรับข้อมูลหน่วยงานที่ API ส่งกลับมาเป็น Array,
 * Object โดยตรง หรือ Object ที่มี data ห่ออยู่
 */
function getOrganization(
  responseData: unknown,
): OrganizationData | null {
  if (!responseData || typeof responseData !== "object") {
    return null;
  }

  const response = responseData as Record<string, unknown>;

  let organization: unknown = responseData;

  if (Array.isArray(responseData)) {
    organization = responseData[0];
  } else if (Array.isArray(response.data)) {
    organization = response.data[0];
  } else if (
    response.data &&
    typeof response.data === "object"
  ) {
    organization = response.data;
  }

  if (!organization || typeof organization !== "object") {
    return null;
  }

  return organization as OrganizationData;
}

/**
 * ดึงข้อมูลผู้กำกับจากโครงสร้างข้อมูลที่รองรับ
 */
function getCommander(
  organization: OrganizationData | null,
): CommanderData | null {
  if (!organization) return null;

  const org = organization as Record<string, unknown>;

  const possibleCommander =
    org.commander ??
    (org.organization as Record<string, unknown> | undefined)
      ?.commander ??
    (org.data as Record<string, unknown> | undefined)
      ?.commander;

  if (
    possibleCommander &&
    typeof possibleCommander === "object"
  ) {
    return possibleCommander as CommanderData;
  }

  return null;
}

/**
 * โหลดลายเซ็นและแปลงเป็น PNG ก่อนฝังลง PDF
 * รองรับภาพที่เบราว์เซอร์สามารถอ่านได้ เช่น PNG, JPEG และ WebP
 */
async function loadSignatureImage(
  pdfDoc: PDFDocument,
  imageUrl: string,
): Promise<PDFImage> {
  const response = await fetch(imageUrl);

  if (!response.ok) {
    throw new Error(
      `โหลดรูปลายเซ็นไม่สำเร็จ (${response.status})`,
    );
  }

  const contentType = (
    response.headers.get("content-type") || ""
  ).toLowerCase();

  const imageBuffer = await response.arrayBuffer();
  const imageBytes = new Uint8Array(imageBuffer);

  if (imageBytes.length === 0) {
    throw new Error("ไฟล์รูปลายเซ็นว่างเปล่า");
  }

  const isPng =
    imageBytes.length >= 8 &&
    imageBytes[0] === 0x89 &&
    imageBytes[1] === 0x50 &&
    imageBytes[2] === 0x4e &&
    imageBytes[3] === 0x47;

  const isJpeg =
    imageBytes.length >= 3 &&
    imageBytes[0] === 0xff &&
    imageBytes[1] === 0xd8 &&
    imageBytes[2] === 0xff;

  if (isPng || contentType.includes("image/png")) {
    return pdfDoc.embedPng(imageBytes);
  }

  if (isJpeg || contentType.includes("image/jpeg")) {
    return pdfDoc.embedJpg(imageBytes);
  }

  // แปลงภาพรูปแบบอื่นเป็น PNG ด้วย Canvas
  const mimeType = contentType.startsWith("image/")
    ? contentType.split(";")[0]
    : "image/png";

  const imageBlob = new Blob(
    [new Uint8Array(imageBytes)],
    { type: mimeType },
  );

  let bitmap: ImageBitmap | null = null;

  try {
    bitmap = await createImageBitmap(imageBlob);

    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("ไม่สามารถสร้าง Canvas สำหรับรูปลายเซ็นได้");
    }

    context.drawImage(bitmap, 0, 0);

    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("แปลงรูปลายเซ็นเป็น PNG ไม่สำเร็จ"));
        }
      }, "image/png");
    });

    const pngBuffer = await pngBlob.arrayBuffer();

    return await pdfDoc.embedPng(new Uint8Array(pngBuffer));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`ไม่สามารถอ่านรูปลายเซ็นได้: ${error.message}`);
    }

    throw new Error("ไม่สามารถอ่านรูปลายเซ็นได้");
  } finally {
    bitmap?.close();
  }
}

/**
 * วาดลายเซ็นโดยรักษาสัดส่วนภาพ
 */
function drawSignature(
  page: PDFPage,
  signatureImage: PDFImage,
): void {
  const maxWidth = 80;
  const maxHeight = 40;

  const scale = Math.min(
    maxWidth / signatureImage.width,
    maxHeight / signatureImage.height,
  );

  const width = signatureImage.width * scale;
  const height = signatureImage.height * scale;

  page.drawImage(signatureImage, {
    x: 355 - width / 2,
    y: 565,
    width,
    height,
  });
}

async function drawForensicPage(
  pdfDoc: PDFDocument,
  page: PDFPage,
  data: ForensicPdfData,
  font: PDFFont,
  boldFont: PDFFont,
  commander: CommanderData | null,
  signatureImage: PDFImage | null,
): Promise<void> {
  const black = rgb(0, 0, 0);
  const blue = rgb(0, 0, 1);

  // เลขที่ส่งตรวจและวันที่
  page.drawText(data.submissionNo || "-", {
    x: 173,
    y: 728,
    size: 16,
    font: boldFont,
    color: blue,
  });

  page.drawText(formatThaiDate(data.submissionDate), {
    x: 315,
    y: 728,
    size: 16,
    font: boldFont,
    color: blue,
  });

  page.drawText(formatThaiMonthYear(data.submissionDate), {
    x: 337,
    y: 728,
    size: 16,
    font,
    color: black,
  });

  // ลายเซ็นผู้กำกับ
  if (signatureImage) {
    drawSignature(page, signatureImage);
  }

  // ยศ ชื่อ และตำแหน่งผู้กำกับ
  page.drawText(commander?.fullRank || "-", {
    x: 251,
    y: 569,
    size: 16,
    font,
    color: black,
  });

  page.drawText(
    `( ${commander?.fullName || "-"} )`,
    {
      x: 318,
      y: 551,
      size: 16,
      font,
      color: black,
    },
  );

  page.drawText(commander?.fullPosition || "-", {
    x: 276,
    y: 533,
    size: 16,
    font,
    color: black,
  });

  // ตาราง
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
      start: { x, y: headerTop },
      end: { x, y: headerTop + 40 },
      thickness: 1,
      color: black,
    });
  });

  [430, 475].forEach((x) => {
    page.drawLine({
      start: { x, y: headerTop },
      end: { x, y: headerTop + 20 },
      thickness: 1,
      color: black,
    });
  });

  page.drawLine({
    start: { x: 375, y: headerTop + 20 },
    end: { x: 540, y: headerTop + 20 },
    thickness: 1,
    color: black,
  });

  page.drawText("ลำดับ", {
    x: 15,
    y: headerTop + 16,
    size: 15,
    font: boldFont,
    color: black,
  });

  page.drawText("ชื่อ และ ชื่อสกุล", {
    x: 70,
    y: headerTop + 16,
    size: 15,
    font: boldFont,
    color: black,
  });

  page.drawText("เรื่องที่ขออนุญาต", {
    x: 250,
    y: headerTop + 16,
    size: 15,
    font: boldFont,
    color: black,
  });

  page.drawText("ใบเสร็จรับเงิน", {
    x: 435,
    y: headerTop + 25,
    size: 15,
    font: boldFont,
    color: black,
  });

  page.drawText("หมายเหตุ", {
    x: 545,
    y: headerTop + 12,
    size: 15,
    font: boldFont,
    color: black,
  });

  page.drawText("เล่มที่", {
    x: 392,
    y: headerTop + 4,
    size: 15,
    font: boldFont,
    color: black,
  });

  page.drawText("เลขที่", {
    x: 440,
    y: headerTop + 4,
    size: 15,
    font: boldFont,
    color: black,
  });

  page.drawText("ลงวันที่", {
    x: 495,
    y: headerTop + 4,
    size: 15,
    font: boldFont,
    color: black,
  });

  // รายชื่อบุคคล
  let y = 457;

  const rowHeight = 22;
  const borders = [10, 43, 180, 375, 430, 475, 540, 590];

  data.persons.forEach((person, index) => {
    page.drawLine({
      start: { x: 10, y: y + 18 },
      end: { x: 590, y: y + 18 },
      thickness: 0.5,
      color: black,
    });

    borders.forEach((x) => {
      page.drawLine({
        start: { x, y: y + 18 },
        end: { x, y: y - 5 },
        thickness: 0.5,
        color: black,
      });
    });

    page.drawText(String(index + 1), {
      x: 22,
      y,
      size: 16,
      font,
      color: black,
    });

    page.drawText(person.fullName || "", {
      x: 51,
      y,
      size: 13,
      font,
      color: black,
    });

    page.drawText(person.purpose || "-", {
      x: 190,
      y,
      size: 13,
      font,
      color: black,
    });

    page.drawText(person.receiptBookNo || "-", {
      x: 385,
      y,
      size: 16,
      font,
      color: black,
    });

    page.drawText(person.receiptNo || "-", {
      x: 444,
      y,
      size: 16,
      font,
      color: black,
    });

    page.drawText(formatShortThaiDate(person.receiptDate), {
      x: 480,
      y,
      size: 16,
      font,
      color: black,
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
      color: black,
    });

    y -= rowHeight;
  });

  // เส้นปิดท้ายตาราง
  page.drawLine({
    start: { x: 10, y: y + 18 },
    end: { x: 590, y: y + 18 },
    thickness: 0.5,
    color: black,
  });
}

export async function generateForensicPdf(
  data: ForensicPdfData,
): Promise<void> {
  try {
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

    // โหลด PDF Template
    const response = await fetch(
      "/ปะหน้าส่งตรวจลายนิ้วมือ พฐ.pdf",
    );

    if (!response.ok) {
      throw new Error(
        `โหลด Template PDF ไม่สำเร็จ (${response.status})`,
      );
    }

    const templateBytes = await response.arrayBuffer();

    // โหลดฟอนต์ปกติ
    const fontResponse = await fetch(
      "/fonts/THSarabunIT9.ttf",
    );

    if (!fontResponse.ok) {
      throw new Error("ไม่พบไฟล์ THSarabunIT9.ttf");
    }

    const fontBytes = await fontResponse.arrayBuffer();

    // โหลดฟอนต์ตัวหนา
    const boldFontResponse = await fetch(
      "/fonts/THSarabunIT9-Bold.ttf",
    );

    if (!boldFontResponse.ok) {
      throw new Error("ไม่พบไฟล์ THSarabunIT9-Bold.ttf");
    }

    const boldFontBytes =
      await boldFontResponse.arrayBuffer();

    // สร้าง PDF
    const pdfDoc = await PDFDocument.load(templateBytes);

    pdfDoc.registerFontkit(fontkit);

    const font = await pdfDoc.embedFont(fontBytes);
    const boldFont = await pdfDoc.embedFont(boldFontBytes);

    // โหลดข้อมูลหน่วยงาน
    const baseURL = api.defaults.baseURL;

    if (!baseURL) {
      throw new Error("ไม่พบ API baseURL");
    }

    const orgRes = await fetch(
      `${baseURL.replace(/\/+$/, "")}/organization`,
    );

    if (!orgRes.ok) {
      throw new Error(
        `โหลดข้อมูลหน่วยงานไม่สำเร็จ (${orgRes.status})`,
      );
    }

    const orgData: unknown = await orgRes.json();

    console.log("Organization API:", orgData);

    const organization = getOrganization(orgData);
    const commander = getCommander(organization);

    console.log("Organization:", organization);
    console.log("Commander:", commander);

    if (!commander) {
      console.warn(
        "ไม่พบข้อมูล commander จาก API /organization ตรวจสอบโครงสร้างข้อมูลใน Console",
      );
    }

    // โหลดภาพลายเซ็น
    let signatureImage: PDFImage | null = null;

    const signatureUrl = commander?.signatureImage;

    if (signatureUrl) {
      try {
        signatureImage = await loadSignatureImage(
          pdfDoc,
          signatureUrl,
        );
      } catch (error) {
        console.error("Signature Error:", error);

        await Swal.fire({
          icon: "warning",
          title: "โหลดลายเซ็นไม่สำเร็จ",
          text:
            error instanceof Error
              ? error.message
              : "ไม่สามารถโหลดรูปลายเซ็นได้",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#800020",
        });
      }
    } else {
      console.warn(
        "ไม่พบ signatureImage ในข้อมูล commander",
      );
    }

    // แบ่งบุคคลหน้าละ 20 คน
    const PERSONS_PER_PAGE = 20;
    const personPages: ForensicPerson[][] = [];

    for (
      let i = 0;
      i < data.persons.length;
      i += PERSONS_PER_PAGE
    ) {
      personPages.push(
        data.persons.slice(i, i + PERSONS_PER_PAGE),
      );
    }

    if (personPages.length === 0) {
      personPages.push([]);
    }

    // สร้างเอกสาร 3 รอบ
    const TOTAL_ROUNDS = 3;

    let qrPage: PDFPage | null = null;

    for (
      let round = 1;
      round <= TOTAL_ROUNDS;
      round++
    ) {
      for (
        let pageIndex = 0;
        pageIndex < personPages.length;
        pageIndex++
      ) {
        let page: PDFPage;

        if (round === 1 && pageIndex === 0) {
          page = pdfDoc.getPages()[0];
        } else {
          const [newPage] = await pdfDoc.copyPages(
            pdfDoc,
            [0],
          );

          page = newPage;
          pdfDoc.addPage(page);
        }

        const pageData: ForensicPdfData = {
          ...data,
          persons: personPages[pageIndex],
        };

        await drawForensicPage(
          pdfDoc,
          page,
          pageData,
          font,
          boldFont,
          commander,
          signatureImage,
        );

        if (round === 3 && pageIndex === 0) {
          qrPage = page;
        }
      }
    }

    // สร้าง QR Code โดยเก็บ submissionId
    if (qrPage) {
      const qrDataUrl = await QRCode.toDataURL(
        data.submissionId,
        {
          errorCorrectionLevel: "H",
          type: "image/png",
          margin: 4,
          width: 800,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        },
      );

      const base64 = qrDataUrl.split(",")[1];

      if (!base64) {
        throw new Error("สร้าง QR Code ไม่สำเร็จ");
      }

      const binary = atob(base64);
      const qrBytes = new Uint8Array(binary.length);

      for (let i = 0; i < binary.length; i++) {
        qrBytes[i] = binary.charCodeAt(i);
      }

      const qrImage = await pdfDoc.embedPng(qrBytes);

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

    // บันทึก PDF
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob(
      [new Uint8Array(pdfBytes)],
      { type: "application/pdf" },
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `ปะหน้าส่งตรวจลายนิ้วมือ พฐ-${
      data.submissionNo || "document"
    }.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

    // แจ้งผลสำเร็จ
    const totalPages =
      personPages.length * TOTAL_ROUNDS;

    await Swal.fire({
      icon: "success",
      title: "สร้าง PDF สำเร็จ",
      text: `สร้างเอกสาร ${totalPages} หน้า พร้อม QR Code`,
      confirmButtonColor: "#800020",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error: unknown) {
    console.error("PDF Error:", error);

    await Swal.fire({
      icon: "error",
      title: "สร้าง PDF ไม่สำเร็จ",
      text:
        error instanceof Error
          ? error.message
          : "เกิดข้อผิดพลาดในการสร้าง PDF",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#800020",
    });
  }
}

