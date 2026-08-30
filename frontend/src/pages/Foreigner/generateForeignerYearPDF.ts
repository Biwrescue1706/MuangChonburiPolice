import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import type { Foreigner } from "../../types/foreigner";

type Column = {
  key: string;
  label: string;
  width: number;
  group?: string;
};

const MONTHS = [
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

function formatThaiDate(value: string | null | undefined) {
  if (!value) return "";

  const text = String(value).trim();
  const match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);

  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return `${day} ${MONTHS[month]} ${year + 543}`;
    }
  }

  return text;
}

function getFullName(data: Foreigner) {
  if (data.fullName) return data.fullName;

  return [data.prefix, data.firstName, data.lastName].filter(Boolean).join(" ");
}

function formatMoney(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return String(value);
  }

  return number.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function getDomicile(data: Foreigner) {
  if (data.domicile) return data.domicile;

  return [
    data.houseNo,
    data.moo ? `หมู่ ${data.moo}` : "",
    data.road,
    data.subdistrict ? `ตำบล${data.subdistrict}` : "",
    data.domicileDistrict ? `อำเภอ${data.domicileDistrict}` : "",
    data.domicileProvince,
  ]
    .filter(Boolean)
    .join(" ");
}

function getApplicationType(value: string | null | undefined) {
  if (!value) return "";

  if (value === "ชนิดที่ 1") return "ชนิดที่ 1";
  if (value === "ชนิดที่ 2") return "ชนิดที่ 2";

  return value;
}

function wrapText(text: string, font: any, maxWidth: number, size: number) {
  if (!text) return [];

  const lines: string[] = [];

  for (const paragraph of text.split("\n")) {
    if (!paragraph) {
      lines.push("");
      continue;
    }

    let current = "";

    for (const char of paragraph) {
      const test = current + char;

      if (font.widthOfTextAtSize(test, size) <= maxWidth) {
        current = test;
      } else {
        if (current) {
          lines.push(current);
        }

        current = char;
      }
    }

    if (current) {
      lines.push(current);
    }
  }

  return lines;
}

function drawTextCentered(
  page: any,
  value: string,
  x: number,
  y: number,
  width: number,
  height: number,
  font: any,
  size: number,
) {
  if (!value) return;

  const lines = wrapText(value, font, width - 6, size);

  if (!lines.length) return;

  const lineHeight = size + 2;
  const maxLines = Math.max(1, Math.floor((height - 4) / lineHeight));

  let visibleLines = lines;

  if (lines.length > maxLines) {
    visibleLines = lines.slice(0, maxLines);

    let last = visibleLines[visibleLines.length - 1];

    while (
      last.length > 1 &&
      font.widthOfTextAtSize(`${last}...`, size) > width - 6
    ) {
      last = last.slice(0, -1);
    }

    visibleLines[visibleLines.length - 1] = `${last}...`;
  }

  const totalHeight = visibleLines.length * lineHeight;

  let startY = y + (height + totalHeight) / 2 - lineHeight;

  visibleLines.forEach((line) => {
    const textWidth = font.widthOfTextAtSize(line, size);

    page.drawText(line, {
      x: x + (width - textWidth) / 2,
      y: startY,
      size,
      font,
      color: rgb(0, 0, 0),
    });

    startY -= lineHeight;
  });
}

function drawCell(
  page: any,
  x: number,
  y: number,
  width: number,
  height: number,
  value: string,
  font: any,
  size: number,
) {
  page.drawRectangle({
    x,
    y,
    width,
    height,
    borderWidth: 0.5,
    borderColor: rgb(0, 0, 0),
  });

  drawTextCentered(page, value, x, y, width, height, font, size);
}

export async function generateForeignerYearPDF(
  data: Foreigner[],
  year: number,
) {
  if (!data || data.length === 0) {
    throw new Error(`ไม่พบข้อมูลบุคคลในปี พ.ศ. ${year}`);
  }

  const fontResponse = await fetch("/fonts/THSarabunIT9.ttf");

  if (!fontResponse.ok) {
    throw new Error("ไม่พบไฟล์ THSarabunIT9.ttf");
  }

  const fontBytes = await fontResponse.arrayBuffer();

  const pdfDoc = await PDFDocument.create();

  pdfDoc.registerFontkit(fontkit);

  const font = await pdfDoc.embedFont(fontBytes);

  const boldFont = await pdfDoc.embedFont(fontBytes);

  const A4_LANDSCAPE: [number, number] = [841.89, 595.28];

  const pageWidth = A4_LANDSCAPE[0];

  const pageHeight = A4_LANDSCAPE[1];

  const marginLeft = 10;
  const marginRight = 10;
  const marginTop = 12;
  const marginBottom = 12;

  const tableWidth = pageWidth - marginLeft - marginRight;

  const titleHeight = 25;
  const groupHeaderHeight = 22;
  const subHeaderHeight = 30;

  // ขนาดแถวข้อมูล
  const rowHeight = 65;

  const columns: Column[] = [
    {
      key: "no",
      label: "ลำดับ",
      width: 27,
    },
    {
      key: "foreignerIdNo",
      label: "เลขรหัส\nคนต่างด้าว",
      width: 40,
    },
    {
      key: "name",
      label: "ชื่อแซ่",
      width: 65,
    },
    {
      key: "age",
      label: "อายุ",
      width: 25,
    },
    {
      key: "nationality",
      label: "สัญชาติ",
      width: 40,
    },
    {
      key: "ethnicity",
      label: "เชื้อชาติ",
      width: 40,
    },
    {
      key: "certificateNo",
      label: "เลขทะเบียน",
      width: 58,
      group: "certificate",
    },
    {
      key: "certificateDate",
      label: "วัน เดือน ปี",
      width: 58,
      group: "certificate",
    },
    {
      key: "district",
      label: "อำเภอ",
      width: 42,
      group: "issued",
    },
    {
      key: "province",
      label: "จังหวัด",
      width: 42,
      group: "issued",
    },
    {
      key: "domicile",
      label: "ภูมิลำเนา",
      width: 70,
    },
    {
      key: "applicationType",
      label: "วันรับใหม่\nขอรับใบแทน\nขอต่ออายุ",
      width: 52,
    },
    {
      key: "applicationDate",
      label: "วัน เดือน ปี",
      width: 54,
    },
    {
      key: "expirationDate",
      label: "หมดอายุ\nวัน เดือน ปี",
      width: 54,
    },
    {
      key: "amount",
      label: "จำนวนเงิน",
      width: 48,
    },
    {
      key: "receiptBookNo",
      label: "เล่มที่",
      width: 34,
      group: "receipt",
    },
    {
      key: "receiptNo",
      label: "เลขที่",
      width: 34,
      group: "receipt",
    },
    {
      key: "receiptDate",
      label: "วัน เดือน ปี",
      width: 55,
    },
    {
      key: "certificate",
      label: "เลขใบสำคัญ ฯ",
      width: 30,
    },
    {
      key: "petitionDate",
      label: "วัน เดือน ปี\nยื่นคำร้อง",
      width: 40,
    },
  ];

  const totalWidth = columns.reduce((sum, column) => sum + column.width, 0);

  const scale = tableWidth / totalWidth;

  columns.forEach((column) => {
    column.width *= scale;
  });

  const groups = [
    {
      key: "certificate",
      label: "ใบสำคัญ",
    },
    {
      key: "issued",
      label: "ออกให้ ณ",
    },
    {
      key: "receipt",
      label: "ใบเสร็จรับเงิน",
    },
  ];

  const drawHeader = (page: any, topY: number) => {
    const bottomY = topY - groupHeaderHeight - subHeaderHeight;

    let x = marginLeft;

    columns.forEach((column) => {
      if (!column.group) {
        drawCell(
          page,
          x,
          bottomY,
          column.width,
          groupHeaderHeight + subHeaderHeight,
          column.label,
          boldFont,
          10,
        );

        x += column.width;
        return;
      }

      const firstColumn = columns.find((item) => item.group === column.group);

      if (column.key !== firstColumn?.key) {
        return;
      }

      const groupColumns = columns.filter(
        (item) => item.group === column.group,
      );

      const groupWidth = groupColumns.reduce(
        (sum, item) => sum + item.width,
        0,
      );

      const groupLabel =
        groups.find((group) => group.key === column.group)?.label || "";

      drawCell(
        page,
        x,
        topY - groupHeaderHeight,
        groupWidth,
        groupHeaderHeight,
        groupLabel,
        boldFont,
        10,
      );

      let subX = x;

      groupColumns.forEach((subColumn) => {
        drawCell(
          page,
          subX,
          bottomY,
          subColumn.width,
          subHeaderHeight,
          subColumn.label,
          boldFont,
          10,
        );

        subX += subColumn.width;
      });

      x += groupWidth;
    });
  };

  const getValue = (item: Foreigner, key: string, index: number): string => {
    switch (key) {
      case "no":
        return String(index + 1);

      case "foreignerIdNo":
        return item.foreignerIdNo || "";

      case "name":
        return getFullName(item);

      case "age":
        return item.age !== null && item.age !== undefined
          ? String(item.age)
          : "";

      case "nationality":
        return item.nationality || "";

      case "ethnicity":
        return item.ethnicity || "";

      case "certificateNo":
        return item.certificateRegistrationNo || "";

      case "certificateDate":
        return formatThaiDate(item.certificateDate);

      case "district":
        return item.district || "";

      case "province":
        return item.province || "";

      case "domicile":
        return getDomicile(item);

      case "applicationType":
        return getApplicationType(item.applicationType);

      case "applicationDate":
        return formatThaiDate(item.applicationDate);

      case "expirationDate":
        return formatThaiDate(item.expirationDate);

      case "amount":
        return formatMoney(item.amount);

      case "receiptBookNo":
        return item.receiptBookNo || "";

      case "receiptNo":
        return item.receiptNo || "";

      case "receiptDate":
        return formatThaiDate(item.receiptDate);

      case "certificate":
        return item.certificateNo || "";

      case "petitionDate":
        return formatThaiDate(
          item.petitionDate ? String(item.petitionDate).slice(0, 10) : "",
        );

      default:
        return "";
    }
  };

  let page: any = null;
  let currentY = 0;
  let globalIndex = 0;

  const createPage = () => {
    page = pdfDoc.addPage(A4_LANDSCAPE);

    currentY = pageHeight - marginTop;

    drawTextCentered(
      page,
      `รายงานข้อมูลบุคคลต่างด้าว ปี พ.ศ. ${year}`,
      0,
      currentY - titleHeight,
      pageWidth,
      titleHeight,
      boldFont,
      18,
    );

    currentY -= titleHeight + 4;

    currentY -= 13;

    drawHeader(page, currentY);

    currentY -= groupHeaderHeight + subHeaderHeight;
  };

  createPage();

  data.forEach((item) => {
    if (currentY - rowHeight < marginBottom) {
      createPage();
    }

    let x = marginLeft;

    columns.forEach((column) => {
      const value = getValue(item, column.key, globalIndex);

      drawCell(
        page,
        x,
        currentY - rowHeight,
        column.width,
        rowHeight,
        value,
        font,
        11,
      );

      x += column.width;
    });

    currentY -= rowHeight;

    globalIndex++;
  });

  const result = await pdfDoc.save();

  const arrayBuffer = new ArrayBuffer(result.byteLength);

  new Uint8Array(arrayBuffer).set(result);

  const blob = new Blob([arrayBuffer], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `รายงานบุคคลต่างด้าว_ปี_${year}.pdf`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
