import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import * as pdfjsLib from "pdfjs-dist";

(pdfjsLib as any).GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

export const generatePDF = async (p: any) => {
  try {
    const templateUrl = "/template (1).pdf";

    // ===== โหลดด้วย pdfjs (อ่านตำแหน่ง text) =====
    const loadingTask = pdfjsLib.getDocument(templateUrl);
    const pdf = await loadingTask.promise;

    // ===== โหลดด้วย pdf-lib (เอาไว้เขียน) =====
    const existingPdfBytes = await fetch(templateUrl).then(res =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetch("/fonts/THSarabunNew.ttf").then(res =>
      res.arrayBuffer()
    );

    const font = await pdfDoc.embedFont(fontBytes);

    // ===== helper =====
    const safe = (v: any) =>
      v === null || v === undefined || v === "" ? "-" : String(v);

    const fullName =
      p.fullName ||
      `${safe(p.prefix)}${safe(p.firstName)} ${safe(p.lastName)}`;

    // ===== map placeholder → value =====
    const map: Record<string, any> = {
      fingerprintDate: p.fingerprintDate,
      organizationName: p.organizationName,
      birthDate: p.birthDate,
      fullName: fullName,
      fullNameWithRank: p.fullNameWithRank,
      rank: p.rank,

      purpose: p.purpose,
      requestingAgency: p.requestingAgency,
      citizenId: p.citizenId,

      birthDay: p.birthDay,
      birthMonth: p.birthMonth,
      birthYear: p.birthYear,

      nationality: p.nationality,
      ethnicity: p.ethnicity,
      height: p.height,
      weight: p.weight,
      bodyType: p.bodyType,
      skinColor: p.skinColor,
      behavior: p.behavior,
      distinguishingMarks: p.distinguishingMarks,
      address: p.address,
      occupation: p.occupation,
      workplaceAddress: p.workplaceAddress,
      father: p.father,
      mother: p.mother,
      spouse: p.spouse,

      receiptBookNo: p.receiptBookNo,
      receiptNo: p.receiptNo,
      receiptDate: p.receiptDate,
      money: p.money,
      moneyText: p.moneyText,

      fullNameOrg: p.fullNameOrg,
      position: p.position,
    };

    // ===== loop ทุกหน้า =====
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const textContent = await page.getTextContent();
      const pdfPage = pdfDoc.getPages()[i];

      textContent.items.forEach((item: any) => {
        const text = item.str?.trim();

        if (map[text]) {
          const [, , , , x, y] = item.transform;

          // 🔥 ลบคำเดิม
          pdfPage.drawRectangle({
            x,
            y: y - 2,
            width: 220,
            height: 18,
            color: rgb(1, 1, 1),
          });

          // 🔥 เขียนค่าจริง
          pdfPage.drawText(safe(map[text]), {
            x,
            y,
            size: 14,
            font,
            color: rgb(0, 0, 0),
          });
        }
      });
    }

    // ===== SAVE =====
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes as any], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

    const clean = (v: any) =>
      safe(v).replace(/[\\/:*?"<>|]/g, "");

    const fileName =
      [
        clean(p.receiptBookNo),
        clean(p.receiptNo),
        clean(fullName),
      ]
        .filter(Boolean)
        .join("-") + ".pdf";

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

  } catch (err) {
    console.error("PDF ERROR:", err);
    throw err;
  }
};