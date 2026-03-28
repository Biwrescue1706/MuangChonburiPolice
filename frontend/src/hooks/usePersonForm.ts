//src/hooks/usePersonForm.ts
import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "../utils/toast";

export default function usePersonForm(navigate: any) {
  const currentYear = new Date().getFullYear();
  const currentYearTH = currentYear + 543;

  const [receiptNumbers, setReceiptNumbers] = useState<number[]>([]);

  const maxYear = currentYearTH - 18;
  const minYear = currentYearTH - 100;

  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => maxYear - i,
  );

  const nationalities = ["ไทย", "ลาว", "กัมพูชา", "พม่า", "จีน", "อื่นๆ"];
  const ethnicities = ["ไทย", "จีน", "ลาว", "มอญ", "กะเหรี่ยง", "อื่นๆ"];
  const bodyTypes = ["ผอม", "สันทัด", "ท้วม", "อ้วน"];
  const skinColors = ["ขาว", "ขาวเหลือง", "สองสี", "ดำแดง", "ดำ"];

  const heights = Array.from({ length: 121 }, (_, i) => i + 100);
  const weights = Array.from({ length: 151 }, (_, i) => i + 30);
  const allReceiptNumbers = Array.from({ length: 50 }, (_, i) => i + 1);

  const months = [
    "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน",
    "พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม",
    "กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",
  ];

  const [form, setForm] = useState<any>({
    prefix: "นาย",
    nationality: "ไทย",
    ethnicity: "ไทย",
    bodyType: "สันทัด",
    skinColor: "ดำแดง",
    behavior: "ปกติ",
    distinguishingMarks: "-",
    father: "",
    mother: "",
    spouse: "-",
    money: 100,
    moneyText: "หนึ่งร้อยบาทถ้วน",
    weight: null,
    height: null,
    workplaceAddress: "",
    occupation: "",
    fingerprintDate: "",
    receiptDate: "",
    status: 0,
    receiptBookNo: "",
    receiptNo: "",
  });

  // ================= RECEIPT =================

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const res = await api.get("/receipt/latest");

        const bookNo = res.data?.bookNo ?? "";
        const usedNumbers = Array.isArray(res.data?.usedNumbers)
          ? res.data.usedNumbers
          : [];

        setForm((prev: any) => ({
          ...prev,
          receiptBookNo: bookNo,
        }));

        const available = allReceiptNumbers.filter(
          (n) => !usedNumbers.includes(n),
        );

        setReceiptNumbers(available);
      } catch {
        setReceiptNumbers([]);
      }
    };

    fetchReceipts();
  }, []);

  useEffect(() => {
    if (!form.receiptBookNo) return;

    const fetchUsedNumbers = async () => {
      try {
        const res = await api.get(`/receipt/used/${form.receiptBookNo}`);

        const usedNumbers = Array.isArray(res.data?.usedNumbers)
          ? res.data.usedNumbers
          : [];

        const available = allReceiptNumbers.filter(
          (n) => !usedNumbers.includes(n),
        );

        setReceiptNumbers(available);
      } catch {
        setReceiptNumbers(allReceiptNumbers);
      }
    };

    fetchUsedNumbers();
  }, [form.receiptBookNo]);

  // ================= UTIL =================

  const convertMoneyToText = (amount: number) => {
    if (!amount) return "";
    if (amount === 100) return "หนึ่งร้อยบาทถ้วน";
    return amount + "บาทถ้วน";
  };

  const isEmpty = (value: any) => {
    return (
      value === undefined ||
      value === null ||
      value === "" ||
      (typeof value === "number" && isNaN(value))
    );
  };

  // ================= FILTER =================

  const filteredHeights = heights.filter((h) =>
    form.height ? String(h).startsWith(form.height) : true,
  );

  const filteredWeights = weights.filter((w) =>
    form.weight ? String(w).startsWith(form.weight) : true,
  );

  // ================= HANDLE CHANGE =================

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // citizenId
    if (name === "citizenId") {
      const onlyNumber = value.replace(/\D/g, "").slice(0, 13);
      setForm((prev: any) => ({ ...prev, citizenId: onlyNumber }));
      return;
    }

    // money
    if (name === "money") {
      const num = Number(value);
      setForm((prev: any) => ({
        ...prev,
        money: num,
        moneyText: convertMoneyToText(num),
      }));
      return;
    }

    // number fields
    if (["weight", "height"].includes(name)) {
      setForm((prev: any) => ({
        ...prev,
        [name]: value === "" ? null : Number(value),
      }));
      return;
    }

    // 🔥 date → ไทย
    if (name === "receiptDate" || name === "fingerprintDate") {
      if (!value) {
        setForm((prev: any) => ({
          ...prev,
          [name]: "",
        }));
        return;
      }

      const date = new Date(value);
      if (isNaN(date.getTime())) return;

      const thaiDate = `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear() + 543}`;

      setForm((prev: any) => ({
        ...prev,
        [name]: thaiDate,
      }));
      return;
    }

    // default
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log("FINAL DATE:", form.receiptDate);

    const fullName = [form.prefix, form.firstName, form.lastName]
      .filter(Boolean)
      .join(" ");

    const finalForm = { ...form, fullName };

    const requiredFields = [
      "receiptBookNo","prefix","firstName","lastName","citizenId",
      "birthDay","birthMonth","birthYear","nationality","ethnicity",
      "weight","height","bodyType","skinColor","behavior",
      "distinguishingMarks","address","occupation","workplaceAddress",
      "father","mother","spouse","fingerprintDate","purpose",
      "requestingAgency","receiptNo","receiptDate",
    ];

    const missingFields = requiredFields.filter((f) => isEmpty(finalForm[f]));

    if (missingFields.length > 0) {
      toast("warning","กรอกข้อมูลไม่ครบ",`ยังขาด ${missingFields.length} ช่อง`);
      return;
    }

    if (!finalForm.citizenId || finalForm.citizenId.length !== 13) {
      toast("warning","เลขบัตรประชาชนต้องเป็น 13 หลัก");
      return;
    }

    try {
      await api.post("/person", finalForm);
      toast("success","บันทึกสำเร็จ");
      navigate("/person/status0");
    } catch (err: any) {
      toast("error","ผิดพลาด",err.response?.data?.error || "ไม่สามารถบันทึกได้");
    }
  };

  return {
    form,
    setForm,
    handleChange,
    handleSubmit,
    receiptNumbers,
    months,
    years,
    nationalities,
    ethnicities,
    bodyTypes,
    skinColors,
    filteredHeights,
    filteredWeights,
  };
}