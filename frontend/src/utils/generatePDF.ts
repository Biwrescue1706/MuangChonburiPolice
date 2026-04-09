import { PDFDocument, StandardFonts } from "pdf-lib";

export const generatePDF = async (p: any) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // ================= SAFE =================
    const safe = (v: any) => {
      if (v === null || v === undefined || v === "") return "-";
      return String(v);
    };

    const formatDate = (d: any) => {
      if (!d) return "-";
      const date = new Date(d);
      if (isNaN(date.getTime())) return d;
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() + 543}`;
    };

    const fullName =
      p.fullName ||
      `${safe(p.prefix)}${safe(p.firstName)} ${safe(p.lastName)}`;

    // ================= PAGE 1 =================
    const page1 = pdfDoc.addPage([595, 842]);

    const draw1 = (text: any, x: number, y: number, size = 12) => {
      page1.drawText(safe(text), { x, y, size, font });
    };

    draw1(p.organizationName, 200, 780);
    draw1(p.fingerprintDate, 400, 780);

    draw1(p.fullNameWithRank || fullName, 200, 730);
    draw1(p.rank, 100, 730);

    draw1(formatDate(p.birthDate), 200, 700);

    // ================= PAGE 2 =================
    const page2 = pdfDoc.addPage([595, 842]);

    const draw2 = (text: any, x: number, y: number, size = 12) => {
      page2.drawText(safe(text), { x, y, size, font });
    };

    // 🔥 ข้อมูลหลัก
    draw2(p.citizenId, 150, 780);
    draw2(fullName, 150, 750);

    draw2(p.birthDay, 150, 720);
    draw2(p.birthMonth, 250, 720);
    draw2(p.birthYear, 350, 720);

    draw2(p.nationality, 150, 690);
    draw2(p.ethnicity, 300, 690);

    draw2(p.height, 150, 660);
    draw2(p.weight, 300, 660);

    draw2(p.bodyType, 150, 630);
    draw2(p.skinColor, 300, 630);

    draw2(p.behavior, 150, 600);
    draw2(p.distinguishingMarks, 150, 570);

    draw2(p.address, 150, 540);

    draw2(p.occupation, 150, 510);
    draw2(p.workplaceAddress, 150, 480);

    draw2(p.father, 150, 450);
    draw2(p.mother, 150, 420);
    draw2(p.spouse, 150, 390);

    // 🔥 ใบเสร็จ
    draw2(p.receiptBookNo, 150, 350);
    draw2(p.receiptNo, 300, 350);
    draw2(formatDate(p.receiptDate), 150, 320);

    draw2(p.money, 150, 290);
    draw2(p.moneyText, 150, 260);

    // 🔥 เจ้าหน้าที่
    draw2(p.organizationName, 150, 200);
    draw2(p.rank, 150, 170);
    draw2(p.position, 150, 140);
    draw2(p.fullNameOrg, 150, 110);

    // ================= SAVE =================
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([new Uint8Array(pdfBytes)], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

    // ✅ รองรับมือถือ
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safe(fullName)}.pdf`;
    link.click();

  } catch (err) {
    console.error("PDF ERROR:", err);
    throw err;
  }
};