import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export const generatePDF = async (p: any) => {
  try {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetch("/fonts/THSarabunNew.ttf").then(res =>
      res.arrayBuffer()
    );

    const font = await pdfDoc.embedFont(fontBytes);

    // ===== helper =====
    const safe = (v: any) =>
      v === null || v === undefined || v === "" ? "-" : String(v);

    const clean = (v: any) =>
      safe(v).replace(/[\\/:*?"<>|]/g, "");

    const fullName =
      p.fullName ||
      `${safe(p.prefix)}${safe(p.firstName)} ${safe(p.lastName)}`;

    const drawText = (
      page: any,
      text: any,
      x: number,
      y: number,
      size = 14
    ) => {
      page.drawText(safe(text), { x, y, size, font });
    };

    const drawLine = (page: any, x1: number, y1: number, x2: number, y2: number) => {
      page.drawLine({
        start: { x: x1, y: y1 },
        end: { x: x2, y: y2 },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
    };

    // ================= PAGE 1 =================
    const page1 = pdfDoc.addPage([595, 842]);

    drawText(page1, "FINGERPRINT FORM", 200, 800, 18);

    drawText(page1, "Fingerprint Date:", 50, 750);
    drawText(page1, p.fingerprintDate, 200, 750);

    drawText(page1, "Organization:", 50, 720);
    drawText(page1, p.organizationName, 200, 720);

    drawText(page1, "Full Name:", 50, 690);
    drawText(page1, fullName, 200, 690);

    drawText(page1, "Birth Date:", 50, 660);
    drawText(page1, p.birthDate, 200, 660);

    drawText(page1, "Rank:", 50, 630);
    drawText(page1, p.rank, 200, 630);

    drawText(page1, "Officer Name:", 50, 600);
    drawText(page1, p.fullNameOrg, 200, 600);

    // ===== fingerprint grid =====
    let startX = 50;
    let startY = 500;
    let boxSize = 80;

    for (let i = 0; i < 5; i++) {
      drawLine(page1, startX + i * boxSize, startY, startX + i * boxSize, startY - boxSize);
      drawLine(page1, startX + i * boxSize, startY - boxSize, startX + (i + 1) * boxSize, startY - boxSize);
      drawLine(page1, startX + (i + 1) * boxSize, startY, startX + (i + 1) * boxSize, startY - boxSize);
      drawLine(page1, startX + i * boxSize, startY, startX + (i + 1) * boxSize, startY);
    }

    // ================= PAGE 2 =================
    const page2 = pdfDoc.addPage([595, 842]);

    drawText(page2, "PERSONAL INFORMATION", 180, 800, 18);

    let y = 750;

    const field = (label: string, value: any) => {
      drawText(page2, label, 50, y);
      drawText(page2, value, 250, y);
      y -= 28;
    };

    // 🔥 ลำดับถูกต้องตามฟอร์ม
    field("Purpose:", p.purpose);
    field("Requesting Agency:", p.requestingAgency);

    field("Citizen ID:", p.citizenId);
    field("Full Name:", fullName);

    field(
      "Birth Date:",
      `${safe(p.birthDay)} / ${safe(p.birthMonth)} / ${safe(p.birthYear)}`
    );

    field("Nationality:", p.nationality);
    field("Ethnicity:", p.ethnicity);
    field("Height:", p.height);
    field("Weight:", p.weight);
    field("Body Type:", p.bodyType);
    field("Skin Color:", p.skinColor);
    field("Behavior:", p.behavior);
    field("Distinguishing Marks:", p.distinguishingMarks);
    field("Address:", p.address);
    field("Occupation:", p.occupation);
    field("Workplace:", p.workplaceAddress);
    field("Father:", p.father);
    field("Mother:", p.mother);
    field("Spouse:", p.spouse);

    // ===== RECEIPT =====
    y -= 10;
    drawText(page2, "RECEIPT", 240, y, 16);
    y -= 25;

    field("Book No:", p.receiptBookNo);
    field("Receipt No:", p.receiptNo);
    field("Date:", p.receiptDate);
    field("Amount:", p.money);
    field("Amount (Text):", p.moneyText);

    // ===== OFFICER =====
    y -= 10;
    drawText(page2, "OFFICER", 240, y, 16);
    y -= 25;

    field("Organization:", p.organizationName);
    field("Rank:", p.rank);
    field("Position:", p.position);
    field("Name:", p.fullNameOrg);

    // ===== SAVE =====
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes as any], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

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
