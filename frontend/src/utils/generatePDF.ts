import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export const generatePDF = async (p: any) => {
  try {
    // ===== โหลด template =====
    const existingPdfBytes = await fetch("/template.pdf").then((res) => {
      if (!res.ok) throw new Error("โหลด template ไม่สำเร็จ");
      return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    // ===== โหลดฟอนต์ไทย =====
    const fontBytes = await fetch("/fonts/THSarabunNew.ttf").then((res) => {
      if (!res.ok) throw new Error("โหลดฟอนต์ไม่สำเร็จ");
      return res.arrayBuffer();
    });

    const font = await pdfDoc.embedFont(fontBytes);

    const pages = pdfDoc.getPages();
    const page1 = pages[0];
    const page2 = pages[1];

    // ===== helper =====
    const safe = (v: any) =>
      v === null || v === undefined || v === "" ? "-" : String(v);

    const clean = (v: any) =>
      safe(v).replace(/[\\/:*?"<>|]/g, "");

    const fullName =
      p.fullName ||
      `${safe(p.prefix)}${safe(p.firstName)} ${safe(p.lastName)}`;

    const draw = (page: any, text: any, x: number, y: number) => {
      page.drawText(safe(text), {
        x,
        y,
        size: 14,
        font,
      });
    };

    // ================= PAGE 1 =================
    draw(page1, p.fingerprintDate, 220, 735);
    draw(page1, p.organizationName, 420, 735);

    draw(page1, fullName, 200, 690);
    draw(page1, p.birthDate, 420, 690);

    draw(page1, p.fullNameWithRank || fullName, 200, 640);
    draw(page1, p.rank, 200, 610);

    // ================= PAGE 2 =================
    draw(page2, p.citizenId, 200, 740);

    draw(page2, fullName, 200, 700);

    draw(page2, p.birthDay, 200, 670);
    draw(page2, p.birthMonth, 260, 670);
    draw(page2, p.birthYear, 330, 670);

    draw(page2, p.nationality, 200, 640);
    draw(page2, p.ethnicity, 350, 640);

    draw(page2, p.height, 200, 610);
    draw(page2, p.weight, 350, 610);

    draw(page2, p.bodyType, 200, 580);
    draw(page2, p.skinColor, 350, 580);

    draw(page2, p.distinguishingMarks, 200, 550);
    draw(page2, p.behavior, 200, 520);

    draw(page2, p.address, 200, 490);

    draw(page2, p.occupation, 200, 460);
    draw(page2, p.workplaceAddress, 200, 430);

    draw(page2, p.father, 200, 400);
    draw(page2, p.mother, 200, 370);
    draw(page2, p.spouse, 200, 340);

    // ===== ใบเสร็จ =====
    draw(page2, p.receiptBookNo, 200, 250);
    draw(page2, p.receiptNo, 350, 250);
    draw(page2, p.receiptDate, 200, 220);

    draw(page2, p.money, 200, 190);
    draw(page2, p.moneyText, 200, 160);

    draw(page2, p.organizationName, 200, 120);
    draw(page2, p.rank, 200, 90);
    draw(page2, p.position, 200, 60);
    draw(page2, p.fullNameOrg, 200, 30);

    // ===== SAVE =====
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes as any], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

    // ===== ตั้งชื่อไฟล์ =====
    const fileName =
      [
        clean(p.receiptBookNo),
        clean(p.receiptNo),
        clean(fullName),
      ]
        .filter(Boolean)
        .join("-") + ".pdf";

    // ===== DOWNLOAD =====
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (err) {
    console.error("PDF ERROR:", err);
    throw err;
  }
};