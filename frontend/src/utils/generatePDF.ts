import { PDFDocument, StandardFonts } from "pdf-lib";

export const generatePDF = async (p: any) => {
  const pdfDoc = await PDFDocument.create();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // ===== PAGE 1 =====
  const page1 = pdfDoc.addPage([595, 842]); // A4

  let y = 800;

  const draw = (page: any, label: string, value: any) => {
    page.drawText(`${label}: ${value || "-"}`, {
      x: 50,
      y,
      size: 12,
      font,
    });
    y -= 20;
  };

  draw(page1, "ชื่อ", p.fullName);
  draw(page1, "ยศ", p.rank);
  draw(page1, "ชื่อเต็มพร้อมยศ", p.fullNameWithRank);
  draw(page1, "วันเกิด", p.birthDate);
  draw(page1, "หน่วยงาน", p.organizationName);

  // ===== PAGE 2 =====
  const page2 = pdfDoc.addPage([595, 842]);

  y = 800;

  const draw2 = (label: string, value: any) => {
    page2.drawText(`${label}: ${value || "-"}`, {
      x: 50,
      y,
      size: 12,
      font,
    });
    y -= 20;
  };

  draw2("เลขบัตรประชาชน", p.citizenId);
  draw2("สัญชาติ", p.nationality);
  draw2("เชื้อชาติ", p.ethnicity);
  draw2("ส่วนสูง", p.height);
  draw2("น้ำหนัก", p.weight);
  draw2("รูปร่าง", p.bodyType);
  draw2("สีผิว", p.skinColor);
  draw2("ลักษณะเด่น", p.distinguishingMarks);
  draw2("ที่อยู่", p.address);
  draw2("อาชีพ", p.occupation);

  draw2("บิดา", p.father);
  draw2("มารดา", p.mother);
  draw2("คู่สมรส", p.spouse);

  draw2("เล่มที่", p.receiptBookNo);
  draw2("เลขที่", p.receiptNo);
  draw2("วันที่", p.receiptDate);

  draw2("จำนวนเงิน", p.money);
  draw2("ตัวอักษร", p.moneyText);

  draw2("ตำแหน่ง", p.position);
  draw2("ชื่อหน่วยงาน", p.fullNameOrg);

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  window.open(url);
};