// src/utils/generateForensicPdfs.ts
import {
  PDFDocument,
  type PDFPage,
  type PDFFont,
  rgb,
} from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import QRCode from "qrcode";
import api from "../api/axios";

interface ForensicPerson {
  id?: string | number;
  prefix?: string | null;
  fullName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  age?: string | number | null;
  nationality?: string | null;
  fingerprintDate?: string | number | null;
  receiptBookNo?: string | number | null;
  receiptNo?: string | number | null;
  submissionNo?: string | number | null;
  [key: string]: unknown;
}

interface ForensicPdfData {
  submissionId: string | number;
  submissionNo: string | number;
  submissionDate: string | number;
  persons: ForensicPerson[];
}

interface CommanderData {
  rank?: string | null;
  fullName?: string | null;
  position?: string | null;
  signatureImage?: string | null;
}

interface OrganizationData {
  rank?: string | null;
  fullName?: string | null;
  position?: string | null;
  commander?: CommanderData | null;
  finance?: {
    rank?: string | null;
    fullName?: string | null;
    position?: string | null;
  } | null;
}

const TEMPLATE_PATH = "/forensic-template2.pdf";
const FONT_PATH = "/fonts/THSarabunIT9.ttf";
const FONT_BOLD_PATH = "/fonts/THSarabunIT9-Bold.ttf";

const PERSONS_PER_PAGE = 20;
const TOTAL_ROUNDS = 3;

const formatThaiDate = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === "") return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const toText = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "-";
  return String(value);
};

const getPersonName = (person: ForensicPerson): string => {
  if (person.fullName) return person.fullName;

  return [
    person.prefix,
    person.firstName,
    person.lastName,
  ]
    .filter(Boolean)
    .join(" ") || "-";
};

const fetchBytes = async (url: string): Promise<Uint8Array> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`ไม่สามารถโหลดไฟล์ได้: ${url}`);
  }

  return new Uint8Array(await response.arrayBuffer());
};

const embedSignature = async (
  pdfDoc: PDFDocument,
  signatureImage?: string | null,
) => {
  if (!signatureImage) return null;

  try {
    let bytes: Uint8Array;
    let contentType = "";

    if (signatureImage.startsWith("data:")) {
      const [metadata, base64] = signatureImage.split(",", 2);
      contentType = metadata.match(/^data:(.*?);base64$/)?.[1] ?? "";
      const binary = atob(base64);
      bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    } else {
      const response = await fetch(signatureImage);

      if (!response.ok) {
        throw new Error("ไม่สามารถโหลดรูปลายเซ็นได้");
      }

      contentType = response.headers.get("content-type") ?? "";
      bytes = new Uint8Array(await response.arrayBuffer());
    }

    if (
      contentType.includes("png") ||
      signatureImage.toLowerCase().includes(".png")
    ) {
      return await pdfDoc.embedPng(bytes);
    }

    if (
      contentType.includes("jpeg") ||
      contentType.includes("jpg") ||
      /\.(jpe?g)(?:[?#]|$)/i.test(signatureImage)
    ) {
      return await pdfDoc.embedJpg(bytes);
    }

    try {
      return await pdfDoc.embedPng(bytes);
    } catch {
      return await pdfDoc.embedJpg(bytes);
    }
  } catch (error) {
    console.error("โหลดรูปลายเซ็นไม่สำเร็จ:", error);
    return null;
  }
};

const drawText = (
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  size = 12,
) => {
  page.drawText(text, {
    x,
    y,
    size,
    font,
    color: rgb(0, 0, 0),
  });
};

const drawForensicPage = async (
  page: PDFPage,
  data: ForensicPdfData,
  persons: ForensicPerson[],
  font: PDFFont,
  boldFont: PDFFont,
  org: OrganizationData | undefined,
  signatureImage: Awaited<ReturnType<typeof embedSignature>>,
  qrDataUrl?: string,
) => {
  const commander = org?.commander;

  drawText(
    page,
    toText(data.submissionNo),
    173,
    728,
    font,
    14,
  );

  drawText(
    page,
    formatThaiDate(data.submissionDate),
    315,
    728,
    font,
    14,
  );

  drawText(
    page,
    toText(data.submissionNo),
    337,
    728,
    font,
    14,
  );

  if (signatureImage) {
    page.drawImage(signatureImage, {
      x: 315,
      y: 570,
      width: 100,
      height: 50,
    });
  }

  drawText(
    page,
    [commander?.rank, commander?.fullName]
      .filter(Boolean)
      .join(" ") || "-",
    315,
    569,
    font,
    12,
  );

  drawText(
    page,
    toText(commander?.position),
    315,
    551,
    font,
    12,
  );

  drawText(
    page,
    toText(org?.rank),
    430,
    569,
    font,
    12,
  );

  drawText(
    page,
    toText(org?.fullName),
    430,
    551,
    font,
    12,
  );

  drawText(
    page,
    toText(org?.position),
    430,
    533,
    font,
    12,
  );

  const finance = org?.finance;

  drawText(
    page,
    [finance?.rank, finance?.fullName]
      .filter(Boolean)
      .join(" ") || "-",
    475,
    533,
    font,
    12,
  );

  const columns = [10, 43, 180, 375, 430, 475, 540, 590];
  const headerY = 475;

  const headers = [
    "ลำดับ",
    "เลขที่",
    "ชื่อ-สกุล",
    "อายุ",
    "สัญชาติ",
    "วันที่พิมพ์",
    "เล่มใบเสร็จ",
    "เลขที่ใบเสร็จ",
  ];

  headers.forEach((header, index) => {
    drawText(
      page,
      header,
      columns[index],
      headerY,
      boldFont,
      10,
    );
  });

  const rowStartY = 457;
  const rowHeight = 22;

  persons.forEach((person, index) => {
    const y = rowStartY - index * rowHeight;

    const values = [
      String(index + 1),
      toText(person.submissionNo ?? person.id),
      getPersonName(person),
      toText(person.age),
      toText(person.nationality),
      formatThaiDate(person.fingerprintDate),
      toText(person.receiptBookNo),
      toText(person.receiptNo),
    ];

    values.forEach((value, columnIndex) => {
      drawText(
        page,
        value,
        columns[columnIndex],
        y,
        font,
        10,
      );
    });
  });

  if (qrDataUrl) {
    const base64 = qrDataUrl.split(",")[1];

    if (base64) {
      const binary = atob(base64);
      const qrBytes = Uint8Array.from(
        binary,
        (char) => char.charCodeAt(0),
      );

      const qrImage = await page.doc.embedPng(qrBytes);

      page.drawImage(qrImage, {
        x: 530,
        y: 35,
        width: 55,
        height: 55,
      });
    }
  }
};

export async function generateForensicPdfs(
  data: ForensicPdfData,
): Promise<void> {
  if (!data || !Array.isArray(data.persons)) {
    throw new Error("ข้อมูลสำหรับสร้าง PDF ไม่ถูกต้อง");
  }

  const templateBytes = await fetchBytes(TEMPLATE_PATH);
  const fontBytes = await fetchBytes(FONT_PATH);
  const boldFontBytes = await fetchBytes(FONT_BOLD_PATH);

  const orgResponse = await fetch(
    `${api.defaults.baseURL}/organization`,
  );

  if (!orgResponse.ok) {
    throw new Error("ไม่สามารถโหลดข้อมูลองค์กรได้");
  }

  const orgData: OrganizationData[] = await orgResponse.json();
  const org = Array.isArray(orgData) ? orgData[0] : undefined;

  const persons = data.persons;
  const chunks: ForensicPerson[][] = [];

  for (let i = 0; i < persons.length; i += PERSONS_PER_PAGE) {
    chunks.push(persons.slice(i, i + PERSONS_PER_PAGE));
  }

  if (chunks.length === 0) {
    chunks.push([]);
  }

  const outputPdf = await PDFDocument.create();
  outputPdf.registerFontkit(fontkit);

  const font = await outputPdf.embedFont(fontBytes);
  const boldFont = await outputPdf.embedFont(boldFontBytes);

  const signatureImage = await embedSignature(
    outputPdf,
    org?.commander?.signatureImage,
  );

  const qrDataUrl = await QRCode.toDataURL(
    JSON.stringify({
      submissionId: data.submissionId,
      submissionNo: data.submissionNo,
    }),
    {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 200,
    },
  );

  for (let round = 0; round < TOTAL_ROUNDS; round++) {
    const templatePdf = await PDFDocument.load(templateBytes);
    const templatePages = templatePdf.getPages();

    if (templatePages.length === 0) {
      throw new Error("ไฟล์ PDF ต้นแบบไม่มีหน้าเอกสาร");
    }

    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      const sourcePageIndex = Math.min(
        chunkIndex,
        templatePages.length - 1,
      );

      const [copiedPage] = await outputPdf.copyPages(
        templatePdf,
        [sourcePageIndex],
      );

      outputPdf.addPage(copiedPage);

      await drawForensicPage(
        copiedPage,
        data,
        chunks[chunkIndex],
        font,
        boldFont,
        org,
        signatureImage,
        round === 2 && chunkIndex === 0 ? qrDataUrl : undefined,
      );
    }
  }

  const pdfBytes = await outputPdf.save();
  const blob = new Blob([pdfBytes], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `forensic-submission-${data.submissionNo}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}