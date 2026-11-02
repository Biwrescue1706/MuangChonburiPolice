// src/utils/generatePDF.ts
import {
  PDFDocument,
  type PDFPage,
  type PDFFont,
} from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

interface GeneratePDFData {
  fingerprintDate?: string | number | null;
  organizationName?: string | number | null;
  prefix?: string | null;
  fullName?: string | number | null;
  birthDate?: string | number | null;
  fullNameWithRank?: string | number | null;
  rank?: string | number | null;
  purpose?: string | number | null;
  requestingAgency?: string | number | null;
  citizenId?: string | number | null;
  birthDay?: string | number | null;
  birthMonth?: string | number | null;
  birthYear?: string | number | null;
  nationality?: string | number | null;
  ethnicity?: string | number | null;
  height?: string | number | null;
  weight?: string | number | null;
  bodyType?: string | number | null;
  skinColor?: string | number | null;
  distinguishingMarks?: string | number | null;
  behavior?: string | number | null;
  address?: string | number | null;
  occupation?: string | number | null;
  workplaceAddress?: string | number | null;
  father?: string | number | null;
  mother?: string | number | null;
  spouse?: string | number | null;
  fullNameOrg?: string | number | null;
  position?: string | number | null;
  receiptBookNo?: string | number | null;
  receiptNo?: string | number | null;
  receiptDate?: string | number | null;
  money?: string | number | null;
  moneyText?: string | number | null;
}

export const generatePDF = async (
  p: GeneratePDFData,
): Promise<void> => {
  const templateResponse = await fetch("/แบบพิมพ์มือ.pdf");

  if (!templateResponse.ok) {
    throw new Error("ไม่สามารถโหลดแบบพิมพ์มือ.pdf ได้");
  }

  const templateBytes = await templateResponse.arrayBuffer();
  const pdfDoc = await PDFDocument.load(templateBytes);

  pdfDoc.registerFontkit(fontkit);

  const fontResponse = await fetch("/fonts/THSarabunNew.ttf");

  if (!fontResponse.ok) {
    throw new Error("ไม่สามารถโหลดฟอนต์ THSarabunNew.ttf ได้");
  }

  const fontBytes = await fontResponse.arrayBuffer();
  const font = await pdfDoc.embedFont(fontBytes);

  const fontBoldResponse = await fetch(
    "/fonts/THSarabunNew-Bold.ttf",
  );

  if (!fontBoldResponse.ok) {
    throw new Error("ไม่สามารถโหลดฟอนต์ THSarabunNew-Bold.ttf ได้");
  }

  const fontBoldBytes = await fontBoldResponse.arrayBuffer();
  const fontBold = await pdfDoc.embedFont(fontBoldBytes);

  const [page1, page2] = pdfDoc.getPages();

  if (!page1 || !page2) {
    throw new Error("ไฟล์ PDF ต้องมีอย่างน้อย 2 หน้า");
  }

  const safe = (
    value: string | number | null | undefined,
  ): string =>
    value === null || value === undefined || value === ""
      ? "-"
      : String(value);

  const clean = (
    value: string | number | null | undefined,
  ): string =>
    safe(value)
      .replace(/[\\/:*?"<>|]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  // รักษาวันที่ตามส่วนวันที่ต้นทาง ไม่แปลงผ่านเขตเวลา
  const formatFingerprintDate = (
    value: string | number | null | undefined,
  ): string => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    const text = String(value).trim();

    const match = text.match(
      /^(\d{4})-(\d{2})-(\d{2})(?:$|T|\s)/,
    );

    if (!match) {
      return text;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    const date = new Date(Date.UTC(year, month - 1, day));

    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) {
      return text;
    }

    const thaiMonth = new Intl.DateTimeFormat("th-TH", {
      month: "long",
      timeZone: "UTC",
    }).format(date);

    return `${day} ${thaiMonth} ${year + 543}`;
  };

  const fixY = (y: number): number => 842 - y;

  const draw = (
    page: PDFPage,
    text: string | number | null | undefined,
    x: number,
    y: number,
    options?: {
      size?: number;
      font?: PDFFont;
    },
  ): void => {
    page.drawText(safe(text), {
      x,
      y: fixY(y),
      size: options?.size ?? 28,
      font: options?.font ?? font,
    });
  };

  // PAGE 1
  draw(page1, formatFingerprintDate(p.fingerprintDate), 270, -800);
  draw(page1, p.organizationName, 825, -800);

  if (p.prefix === "นาย") {
    draw(page1, "/", 340, -760, {
      size: 60,
      font: fontBold,
    });
  } else {
    draw(page1, "/", 475, -760, {
      size: 60,
      font: fontBold,
    });
  }

  draw(page1, p.fullName, 350, -730);
  draw(page1, p.birthDate, 800, -760);

  draw(page1, p.fullNameWithRank, 210, -510);
  draw(page1, p.rank, 175, -480);

  // PAGE 2
  draw(page2, p.purpose, 210, -875);
  draw(page2, p.requestingAgency, 270, -840);

  draw(page2, p.citizenId, 180, -720, {
    size: 40,
    font: fontBold,
  });

  if (p.prefix === "นาย") {
    draw(page2, "/", 150, -470, {
      size: 60,
      font: fontBold,
    });
  } else {
    draw(page2, "/", 325, -470, {
      size: 60,
      font: fontBold,
    });
  }

  draw(page2, p.fullName, 225, -440, {
    size: 32,
    font: fontBold,
  });

  draw(page2, p.birthDay, 120, -405);
  draw(page2, p.birthMonth, 300, -405);
  draw(page2, p.birthYear, 500, -405);

  draw(page2, p.nationality, 120, -375);
  draw(page2, p.ethnicity, 410, -375);

  draw(page2, p.height, 100, -335);
  draw(page2, p.weight, 430, -335);

  draw(page2, p.bodyType, 110, -300);
  draw(page2, p.skinColor, 400, -300);

  draw(page2, p.distinguishingMarks, 250, -275);

  draw(page2, p.fullName, 950, -240);

  draw(page2, p.behavior, 300, -200);

  draw(page2, p.address, 135, -140);

  draw(page2, p.occupation, 110, -70);
  draw(page2, p.workplaceAddress, 150, -40);

  draw(page2, p.father, 190, -4);
  draw(page2, p.mother, 200, 35);
  draw(page2, p.spouse, 245, 65);

  draw(page2, p.rank, 215, 140);
  draw(page2, p.fullNameOrg, 260, 170);
  draw(page2, p.position, 240, 210);

  draw(page2, p.receiptBookNo, 720, -58);
  draw(page2, p.receiptNo, 1050, -58);
  draw(page2, p.receiptDate, 730, -20);

  draw(page2, p.money, 730, 15);
  draw(page2, p.moneyText, 920, 15);

  draw(page2, p.organizationName, 700, 80);
  draw(page2, p.rank, 900, 155);
  draw(page2, p.fullNameOrg, 950, 190);

  const pdfBytes = await pdfDoc.save();

  const pdfArrayBuffer = new ArrayBuffer(pdfBytes.byteLength);
  new Uint8Array(pdfArrayBuffer).set(pdfBytes);

  const blob = new Blob([pdfArrayBuffer], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);

  const fileName = `${clean(p.receiptBookNo)}-${clean(
    p.receiptNo,
  )}-${clean(p.fullName)}.pdf`;

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
};