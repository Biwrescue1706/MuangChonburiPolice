import { PDFDocument, StandardFonts } from "pdf-lib";

export const generatePDF = async (p: any) => {
  console.log("PERSON >>>", p); // 👈 ดูข้อมูลจริง

  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // ===== SAFE =====
    const safe = (v: any) => {
      if (v === null || v === undefined || v === "") return "-";
      return String(v);
    };

    const draw = (page: any, text: any, x: number, y: number) => {
      try {
        page.drawText(safe(text), {
          x,
          y,
          size: 12,
          font,
        });
      } catch (err) {
        console.error("DRAW ERROR:", text, err);
      }
    };

    // ===== PAGE 1 =====
    const page1 = pdfDoc.addPage([595, 842]);

    draw(page1, p.organizationName, 200, 780);
    draw(page1, p.fingerprintDate, 400, 780);

    draw(page1, p.fullNameWithRank || p.fullName, 200, 730);
    draw(page1, p.rank, 100, 730);

    draw(page1, p.birthDate, 200, 700);

    // ===== PAGE 2 =====
    const page2 = pdfDoc.addPage([595, 842]);

    draw(page2, p.citizenId, 150, 780);
    draw(page2, p.fullName, 150, 750);

    draw(page2, p.birthDay, 150, 720);
    draw(page2, p.birthMonth, 250, 720);
    draw(page2, p.birthYear, 350, 720);

    draw(page2, p.nationality, 150, 690);
    draw(page2, p.ethnicity, 300, 690);

    draw(page2, p.height, 150, 660);
    draw(page2, p.weight, 300, 660);

    draw(page2, p.bodyType, 150, 630);
    draw(page2, p.skinColor, 300, 630);

    draw(page2, p.behavior, 150, 600);
    draw(page2, p.distinguishingMarks, 150, 570);

    draw(page2, p.address, 150, 540);

    draw(page2, p.occupation, 150, 510);
    draw(page2, p.workplaceAddress, 150, 480);

    draw(page2, p.father, 150, 450);
    draw(page2, p.mother, 150, 420);
    draw(page2, p.spouse, 150, 390);

    draw(page2, p.receiptBookNo, 150, 350);
    draw(page2, p.receiptNo, 300, 350);
    draw(page2, p.receiptDate, 150, 320);

    draw(page2, p.money, 150, 290);
    draw(page2, p.moneyText, 150, 260);

    draw(page2, p.organizationName, 150, 200);
    draw(page2, p.rank, 150, 170);
    draw(page2, p.position, 150, 140);
    draw(page2, p.fullNameOrg, 150, 110);

    // ===== SAVE =====
    const pdfBytes = await pdfDoc.save();

    console.log("PDF BYTES OK");

    const blob = new Blob([pdfBytes as any], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

    console.log("PDF URL:", url);

    // ✅ มือถือก็โหลดได้
    const link = document.createElement("a");
    link.href = url;
    link.download = "person.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (err) {
    console.error("PDF ERROR FULL:", err);
    throw err;
  }
};