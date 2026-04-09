import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export const generatePDF = async (p: any) => {
  try {
    const existingPdfBytes = await fetch("/template (1).pdf").then(res =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetch("/fonts/THSarabunNew.ttf").then(res =>
      res.arrayBuffer()
    );

    const font = await pdfDoc.embedFont(fontBytes);

    const pages = pdfDoc.getPages();
    const page1 = pages[0];
    const page2 = pages[1];

    const safe = (v: any) =>
      v === null || v === undefined || v === "" ? "-" : String(v);

    const fullName =
      p.fullName ||
      `${safe(p.prefix)}${safe(p.firstName)} ${safe(p.lastName)}`;

    // 🔥 ลบ + เขียนใหม่
    const replace = (
      page: any,
      value: any,
      x: number,
      y: number,
      width = 250,
      height = 18
    ) => {
      // ลบคำเดิม
      page.drawRectangle({
        x,
        y: y - 2,
        width,
        height,
        color: rgb(1, 1, 1),
      });

      // ใส่ค่าใหม่
      page.drawText(safe(value), {
        x,
        y,
        size: 14,
        font,
        color: rgb(0, 0, 0),
      });
    };

    // ================= PAGE 1 =================
    replace(page1, p.fingerprintDate, 200, 780);
    replace(page1, p.organizationName, 400, 780);

    replace(page1, fullName, 200, 740);
    replace(page1, p.birthDate, 400, 740);

    replace(page1, p.fullNameWithRank || fullName, 200, 700);
    replace(page1, p.rank, 200, 670);

    // ================= PAGE 2 =================
    replace(page2, p.purpose, 150, 780);
    replace(page2, p.requestingAgency, 150, 750);

    replace(page2, p.citizenId, 150, 720);
    replace(page2, fullName, 150, 690);

    replace(
      page2,
      `${safe(p.birthDay)}/${safe(p.birthMonth)}/${safe(p.birthYear)}`,
      150,
      660
    );

    replace(page2, p.nationality, 150, 630);
    replace(page2, p.ethnicity, 300, 630);

    replace(page2, p.height, 150, 600);
    replace(page2, p.weight, 300, 600);

    replace(page2, p.bodyType, 150, 570);
    replace(page2, p.skinColor, 300, 570);

    replace(page2, p.behavior, 150, 540);
    replace(page2, p.distinguishingMarks, 150, 510);

    replace(page2, p.address, 150, 480);
    replace(page2, p.occupation, 150, 450);
    replace(page2, p.workplaceAddress, 150, 420);

    replace(page2, p.father, 150, 390);
    replace(page2, p.mother, 150, 360);
    replace(page2, p.spouse, 150, 330);

    replace(page2, p.receiptBookNo, 150, 280);
    replace(page2, p.receiptNo, 300, 280);
    replace(page2, p.receiptDate, 150, 250);

    replace(page2, p.money, 150, 220);
    replace(page2, p.moneyText, 150, 190);

    replace(page2, p.organizationName, 150, 140);
    replace(page2, p.rank, 150, 110);
    replace(page2, p.position, 150, 80);
    replace(page2, p.fullNameOrg, 150, 50);

    // ===== SAVE =====
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes as any], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

    const clean = (v: any) =>
      safe(v).replace(/[\\/:*?"<>|]/g, "");

    const fileName =
      [
        clean(p.receiptBookNo),
        clean(p.receiptNo),
        clean(fullName),
      ]
        .filter(Boolean)
        .join("-") + ".pdf";

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

  } catch (err) {
    console.error("PDF ERROR:", err);
    throw err;
  }
};
