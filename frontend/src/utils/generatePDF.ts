import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export const generatePDF = async (p: any) => {
  const templateBytes = await fetch("/template.pdf").then((r) =>
    r.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(templateBytes);
  pdfDoc.registerFontkit(fontkit);

  const fontBytes = await fetch("/fonts/THSarabunNew.ttf").then((r) =>
    r.arrayBuffer()
  );

  const font = await pdfDoc.embedFont(fontBytes);

  const [page1, page2] = pdfDoc.getPages();

  const safe = (v: any) =>
    v === null || v === undefined || v === "" ? "-" : String(v);

  const fixY = (y: number) => 842 - y;

  const draw = (page: any, text: any, x: number, y: number) => {
    page.drawText(safe(text), {
      x,
      y: fixY(y),
      size: 14,
      font,
    });
  };

  // ================= PAGE 1 =================
  // 🔥 ทับคำอังกฤษเลย (จูนจากภาพจริง)

  draw(page1, p.fingerprintDate, 190, 135);
  draw(page1, p.organizationName, 410, 135);

  draw(page1, p.fullName, 200, 180);
  draw(page1, p.birthDate, 420, 180);

  draw(page1, p.fullNameWithRank || p.fullName, 200, 240);
  draw(page1, p.rank, 200, 270);

  // ================= PAGE 2 =================

  draw(page2, p.purpose, 200, 120);
  draw(page2, p.requestingAgency, 200, 150);

  draw(page2, p.citizenId, 200, 200);

  draw(page2, p.fullName, 200, 240);

  draw(page2, p.birthDay, 180, 270);
  draw(page2, p.birthMonth, 250, 270);
  draw(page2, p.birthYear, 330, 270);

  draw(page2, p.nationality, 200, 300);
  draw(page2, p.ethnicity, 350, 300);

  draw(page2, p.height, 200, 330);
  draw(page2, p.weight, 350, 330);

  draw(page2, p.bodyType, 200, 360);
  draw(page2, p.skinColor, 350, 360);

  draw(page2, p.distinguishingMarks, 200, 390);
  draw(page2, p.behavior, 200, 420);

  draw(page2, p.address, 200, 450);

  draw(page2, p.occupation, 200, 490);
  draw(page2, p.workplaceAddress, 200, 520);

  draw(page2, p.father, 200, 550);
  draw(page2, p.mother, 200, 580);
  draw(page2, p.spouse, 200, 610);

  // ===== ใบเสร็จ =====
  draw(page2, p.receiptBookNo, 200, 660);
  draw(page2, p.receiptNo, 350, 660);
  draw(page2, p.receiptDate, 200, 690);

  draw(page2, p.money, 200, 720);
  draw(page2, p.moneyText, 350, 720);

  // ===== เจ้าหน้าที่ =====
  draw(page2, p.organizationName, 200, 760);
  draw(page2, p.rank, 200, 790);
  draw(page2, p.fullNameOrg, 350, 790);

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes as any], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "document.pdf";
  link.click();
};