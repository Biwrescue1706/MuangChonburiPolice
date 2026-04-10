import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export const generatePDF = async (p: any) => {
  const templateBytes = await fetch("/template.pdf").then((r) =>
    r.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(templateBytes);
  pdfDoc.registerFontkit(fontkit);

  // ===== โหลดฟอนต์ปกติ =====
  const fontBytes = await fetch("/fonts/THSarabunNew.ttf").then((r) =>
    r.arrayBuffer()
  );
  const font = await pdfDoc.embedFont(fontBytes);

  // ===== โหลดฟอนต์ตัวหนา =====
  const fontBoldBytes = await fetch("/fonts/THSarabunNew-Bold.ttf").then((r) =>
    r.arrayBuffer()
  );
  const fontBold = await pdfDoc.embedFont(fontBoldBytes);

  const [page1, page2] = pdfDoc.getPages();

  const safe = (v: any) =>
    v === null || v === undefined || v === "" ? "-" : String(v);

  const clean = (v: any) =>
    safe(v)
      .replace(/[\\/:*?"<>|]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const fixY = (y: number) => 842 - y;

  // ===== draw รองรับ size + font =====
  const draw = (
    page: any,
    text: any,
    x: number,
    y: number,
    options?: { size?: number; font?: any }
  ) => {
    page.drawText(safe(text), {
      x,
      y: fixY(y),
      size: options?.size || 28,
      font: options?.font || font,
    });
  };

  // ================= PAGE 1 =================
  draw(page1, p.fingerprintDate, 270, -800);
  draw(page1, p.organizationName, 825, -800);

  draw(page1, p.fullName, 350, -730);
  draw(page1, p.birthDate, 800, -760);

  draw(page1, p.fullNameWithRank, 200, -510);
  draw(page1, p.rank, 175, -480);

  // ================= PAGE 2 =================

  // จุดประสงค์
  draw(page2, p.purpose, 210, -900);
  draw(page2, p.requestingAgency, 270, -840);

  // 🔥 บัตรประชาชน (ใหญ่ + หนา)
  draw(page2, p.citizenId, 180, -720, {
    size: 40,
    font: fontBold,
  });

  // ชื่อ
  draw(page2, p.fullName, 225, -440);

  // วันเกิด
  draw(page2, p.birthDay, 120, -405);
  draw(page2, p.birthMonth, 300, -405);
  draw(page2, p.birthYear, 500, -405);

  // สัญชาติ
  draw(page2, p.nationality, 120, -375);
  draw(page2, p.ethnicity, 410, -375);

  // ส่วนสูง/น้ำหนัก
  draw(page2, p.height, 100, -335);
  draw(page2, p.weight, 430, -335);

  // รูปร่าง
  draw(page2, p.bodyType, 110, -300);
  draw(page2, p.skinColor, 400, -300);

  // ตำหนิ
  draw(page2, p.distinguishingMarks, 250, -275);

  // ชื่อ (ขวา)
  draw(page2, p.fullName, 950, -240);

  // พฤติกรรม
  draw(page2, p.behavior, 300, -200);

  // ที่อยู่
  draw(page2, p.address, 135, -140);

  // อาชีพ
  draw(page2, p.occupation, 110, -70);
  draw(page2, p.workplaceAddress, 150, -40);

  // ครอบครัว
  draw(page2, p.father, 190, -4);
  draw(page2, p.mother, 200, 35);
  draw(page2, p.spouse, 245, 65);

  draw(page2, p.rank, 215, 140);
  draw(page2, p.fullNameOrg, 260, 170);
  draw(page2, p.position, 240, 210);

  // ===== ใบเสร็จ =====
  draw(page2, p.receiptBookNo, 720, -60);
  draw(page2, p.receiptNo, 970, -60);
  draw(page2, p.receiptDate, 730, -20);

  draw(page2, p.money, 730, 15);
  draw(page2, p.moneyText, 920, 15);

  draw(page2, p.organizationName, 700, 80);
  draw(page2, p.rank, 900, 155);
  draw(page2, p.fullNameOrg, 950, 190);

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes as any], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);

  const fileName = `${clean(p.receiptBookNo)}-${clean(
    p.receiptNo
  )}-${clean(p.fullName)}.pdf`;

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
};