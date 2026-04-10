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

  const clean = (v: any) =>
    safe(v)
      .replace(/[\\/:*?"<>|]/g, "") // กันอักขระต้องห้าม
      .trim()
      .replace(/\s+/g, "_"); // เว้นวรรค → _

  const fixY = (y: number) => 842 - y;

  const draw = (page: any, text: any, x: number, y: number) => {
    page.drawText(safe(text), {
      x,
      y: fixY(y),
      size: 40,
      font,
    });
  };

  // ================= PAGE 1 =================
  draw(page1, p.fingerprintDate, 260, -790);
  draw(page1, p.organizationName, 815, -790);

  draw(page1, p.fullName, 340, -720);
  draw(page1, p.birthDate, 765, -760);

  draw(page1, p.fullNameWithRank, 200, -505);
  draw(page1, p.rank, 175, -470);

  // ================= PAGE 2 =================

  // จุดประสงค์
  draw(page2, p.purpose, 170, -870);
  draw(page2, p.requestingAgency, 230, -830);

  // บัตรประชาชน
  draw(page2, p.citizenId, 180, -710);

  // ชื่อ
  draw(page2, p.fullName, 200, -450);

  // วันเกิด
  draw(page2, p.birthDay, 150, -420);
  draw(page2, p.birthMonth, 240, -420);
  draw(page2, p.birthYear, 400, -420);

  // สัญชาติ
  draw(page2, p.nationality, 180, -350);
  draw(page2, p.ethnicity, 340, -470);

  // ส่วนสูง/น้ำหนัก
  draw(page2, p.height, 180, -400);
  draw(page2, p.weight, 340, -400);

  // รูปร่าง
  draw(page2, p.bodyType, 180, -350);
  draw(page2, p.skinColor, 340, -350);

  // ตำหนิ
  draw(page2, p.distinguishingMarks, 180, -250);

  // พฤติกรรม
  draw(page2, p.behavior, 180, 410);

  // ที่อยู่
  draw(page2, p.address, 180, 440);

  // อาชีพ
  draw(page2, p.occupation, 180, 480);
  draw(page2, p.workplaceAddress, 180, 510);

  // ครอบครัว
  draw(page2, p.father, 180, 540);
  draw(page2, p.mother, 180, 570);
  draw(page2, p.spouse, 180, 600);

  // ===== ใบเสร็จ =====
  draw(page2, p.receiptBookNo, 140, 660);
  draw(page2, p.receiptNo, 360, 660);

  draw(page2, p.receiptDate, 140, 690);

  draw(page2, p.money, 140, 720);
  draw(page2, p.moneyText, 300, 720);

  // ===== เจ้าหน้าที่ =====
  draw(page2, p.organizationName, 140, 770);
  draw(page2, p.rank, 140, 800);
  draw(page2, p.fullNameOrg, 300, 800);

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes as any], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);

  // ✅ ตั้งชื่อไฟล์ตามที่ต้องการ
  const fileName = `${clean(p.receiptBookNo)}-${clean(
    p.receiptNo
  )}-${clean(p.fullName)}.pdf`;

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
};