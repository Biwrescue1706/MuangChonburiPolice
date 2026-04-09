import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export const generatePDF = async (p: any) => {
  try {
    // ===== โหลด template =====
    const templateBytes = await fetch("/template.pdf").then((res) =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(templateBytes);
    pdfDoc.registerFontkit(fontkit);

    // ===== โหลด font ไทย =====
    const fontBytes = await fetch("/fonts/THSarabunNew.ttf").then((res) =>
      res.arrayBuffer()
    );

    const font = await pdfDoc.embedFont(fontBytes);

    const pages = pdfDoc.getPages();
    const page1 = pages[0];
    const page2 = pages[1];

    // ===== SAFE =====
    const safe = (v: any) =>
      v === null || v === undefined || v === "" ? "-" : String(v);

    // ===== FIX COORDINATE (สำคัญมาก) =====
    const fixY = (y: number) => 842 - y;

    const draw = (
      page: any,
      text: any,
      x: number,
      y: number,
      size = 14
    ) => {
      page.drawText(safe(text), {
        x,
        y: fixY(y),
        size,
        font,
      });
    };

    // ================= PAGE 1 =================
    draw(page1, p.fingerprintDate, 200, 120);
    draw(page1, p.organizationName, 420, 120);

    draw(page1, p.fullName, 200, 170);
    draw(page1, p.birthDate, 420, 170);

    draw(page1, p.fullNameWithRank || p.fullName, 200, 230);
    draw(page1, p.rank, 200, 260);

    // ================= PAGE 2 =================
    draw(page2, p.citizenId, 200, 120);

    draw(page2, p.fullName, 200, 170);

    draw(page2, p.birthDay, 200, 210);
    draw(page2, p.birthMonth, 260, 210);
    draw(page2, p.birthYear, 330, 210);

    draw(page2, p.nationality, 200, 250);
    draw(page2, p.ethnicity, 350, 250);

    draw(page2, p.height, 200, 290);
    draw(page2, p.weight, 350, 290);

    draw(page2, p.bodyType, 200, 330);
    draw(page2, p.skinColor, 350, 330);

    draw(page2, p.distinguishingMarks, 200, 370);
    draw(page2, p.behavior, 200, 410);

    draw(page2, p.address, 200, 450);

    draw(page2, p.occupation, 200, 500);
    draw(page2, p.workplaceAddress, 200, 540);

    draw(page2, p.father, 200, 580);
    draw(page2, p.mother, 200, 620);
    draw(page2, p.spouse, 200, 660);

    // ===== ใบเสร็จ =====
    draw(page2, p.receiptBookNo, 200, 720);
    draw(page2, p.receiptNo, 350, 720);
    draw(page2, p.receiptDate, 200, 760);

    draw(page2, p.money, 200, 800);
    draw(page2, p.moneyText, 200, 830);

    // ===== เจ้าหน้าที่ =====
    draw(page2, p.organizationName, 200, 880);
    draw(page2, p.rank, 200, 910);
    draw(page2, p.position, 200, 940);
    draw(page2, p.fullNameOrg, 200, 970);

    // ===== SAVE =====
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes as any], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

    // ===== โหลด (มือถือก็ใช้ได้) =====
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safe(p.fullName)}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (err) {
    console.error("PDF ERROR:", err);
    throw err;
  }
};