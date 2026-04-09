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
  // 👉 เขียนลงเส้นจริง

  draw(page1, p.fingerprintDate, 160, 12);
  draw(page1, p.organizationName, 680, 12);

  draw(page1, p.fullName, 180, 20);
  draw(page1, p.birthDate, 680, 20);

  draw(page1, p.fullNameWithRank, 180, 30);
  draw(page1, p.rank, 180, 35);

  // ================= PAGE 2 =================

  // จุดประสงค์
  draw(page2, p.purpose, 120, 110);
  draw(page2, p.requestingAgency, 120, 140);

  // บัตรประชาชน
  draw(page2, p.citizenId, 180, 190);

  // ชื่อ
  draw(page2, p.fullName, 180, 230);

  // วันเกิด
  draw(page2, p.birthDay, 150, 260);
  draw(page2, p.birthMonth, 240, 260);
  draw(page2, p.birthYear, 330, 260);

  // สัญชาติ
  draw(page2, p.nationality, 180, 290);
  draw(page2, p.ethnicity, 340, 290);

  // ส่วนสูง/น้ำหนัก
  draw(page2, p.height, 180, 320);
  draw(page2, p.weight, 340, 320);

  // รูปร่าง
  draw(page2, p.bodyType, 180, 350);
  draw(page2, p.skinColor, 340, 350);

  // ตำหนิ
  draw(page2, p.distinguishingMarks, 180, 380);

  // พฤติกรรม
  draw(page2, p.behavior, 180, 410);

  // ที่อยู่ (เส้นยาว)
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

  const link = document.createElement("a");
  link.href = url;
  link.download = "document.pdf";
  link.click();
};