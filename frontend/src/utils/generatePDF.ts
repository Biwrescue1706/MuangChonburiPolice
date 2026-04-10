
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
      .replace(/\s+/g, "-"); // เว้นวรรค → _

  const fixY = (y: number) => 842 - y;

  const draw = (page: any, text: any, x: number, y: number) => {
    page.drawText(safe(text), {
      x,
      y: fixY(y),
      size: 35,
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
  draw(page2, p.purpose, 180, -870);
  draw(page2, p.requestingAgency, 230, -830);

  // บัตรประชาชน
  draw(page2, p.citizenId, 180, -710);

  // ชื่อ
  draw(page2, p.fullName, 225, -440);

  // วันเกิด
  draw(page2, p.birthDay, 110, -400);
  draw(page2, p.birthMonth, 265, -400);
  draw(page2, p.birthYear, 480, -400);

  // สัญชาติ
  draw(page2, p.nationality, 110, -375);
  draw(page2, p.ethnicity, 390, -375);

  // ส่วนสูง/น้ำหนัก
  draw(page2, p.height, 100, -335);
  draw(page2, p.weight, 390, -335);

  // รูปร่าง
  draw(page2, p.bodyType, 100, -300);
  draw(page2, p.skinColor, 370, -300);

  // ตำหนิ
  draw(page2, p.distinguishingMarks, 220, -255);

// ชื่อ
  draw(page2, p.fullName, 900, -240);

  // พฤติกรรม
  draw(page2, p.behavior, 300, -200);

  // ที่อยู่
  draw(page2, p.address, 110, -140);

  // อาชีพ
  draw(page2, p.occupation, 120, -70);
  draw(page2, p.workplaceAddress, 150, -40);

  // ครอบครัว
  draw(page2, p.father, 180, -5);
  draw(page2, p.mother, 190, 30);
  draw(page2, p.spouse, 230, 60);

  draw(page2, p.rank , 200 , 130 );
  draw(page2, p.fullNameOrg , 250 , 170 );
  draw(page2, p.position , 250 , 190 );

  // ===== ใบเสร็จ =====
  draw(page2, p.receiptBookNo, 700, -60);
  draw(page2, p.receiptNo, 950, -60);
  draw(page2, p.receiptDate, 700, -20);

  draw(page2, p.money, 700, 18);
  draw(page2, p.moneyText, 900, 18);

  draw(page2, p.organizationName, 700, 70);
  draw(page2, p.rank, 875, 145);
  draw(page2, p.fullNameOrg, 950, 175);

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