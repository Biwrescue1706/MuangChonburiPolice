//src/hooks/usePersonForm.ts
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../api/axios";

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
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const [form, setForm] = useState<any>({
    prefix: "นาย",
    nationality: "ไทย",
    ethnicity: "ไทย",
    bodyType: "สันทัด",
    skinColor: "ดำแดง",
    behavior: "ปกติ",
    spouse: "-",
    money: 100,
    moneyText: "หนึ่งร้อยบาทถ้วน",
    weight: 0,
    height: 0,
    distinguishingMarks: "-",
    fingerprintDate: new Date().toISOString().split("T")[0],
    status: 0,
    receiptBookNo: "",
    receiptNo: "",
    receiptDate: new Date().toISOString().split("T")[0],
  });

  const isLeapYear = (yearBE: string) => {
    const yearAD = Number(yearBE) - 543;
    if (yearAD % 400 === 0) return true;
    if (yearAD % 100 === 0) return false;
    if (yearAD % 4 === 0) return true;
    return false;
  };

  const getDaysInMonth = (month: string, year?: string) => {
    if (!month) return 31;
    if (month === "กุมภาพันธ์") {
      if (year && isLeapYear(year)) return 29;
      return 28;
    }
    if (["เมษายน", "มิถุนายน", "กันยายน", "พฤศจิกายน"].includes(month)) {
      return 30;
    }
    return 31;
  };

  const convertMoneyToText = (amount: number) => {
    if (!amount) return "";
    if (amount === 100) return "หนึ่งร้อยบาทถ้วน";
    return amount + "บาทถ้วน";
  };

  const filteredHeights = heights.filter((h) =>
    form.height ? String(h).startsWith(form.height) : true,
  );

  const filteredWeights = weights.filter((w) =>
    form.weight ? String(w).startsWith(form.weight) : true,
  );

  const maxDay = getDaysInMonth(form.birthMonth, form.birthYear);
  const filteredDays = Array.from({ length: maxDay }, (_, i) => i + 1);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const res = await api.get("/receipt/latest");
        const bookNo = res.data?.bookNo ?? "";
        const usedNumbers = res.data?.usedNumbers ?? [];

        setForm((prev: any) => ({ ...prev, receiptBookNo: bookNo }));

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
    if (!form.receiptBookNo || form.receiptBookNo.length < 3) return;

    const fetchUsedNumbers = async () => {
      try {
        const res = await api.get(`/receipt/used/${form.receiptBookNo}`);
        const usedNumbers = res.data?.usedNumbers ?? [];

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "citizenId") {
      const onlyNumber = value.replace(/\D/g, "").slice(0, 13);
      setForm((prev: any) => ({ ...prev, citizenId: onlyNumber }));
      return;
    }

    if (name === "money") {
      const num = Number(value);
      setForm((prev: any) => ({
        ...prev,
        money: num,
        moneyText: convertMoneyToText(num),
      }));
      return;
    }

    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const firstName = form.firstName?.trim();
    const lastName = form.lastName?.trim();

    if (!firstName || !lastName) {
      Swal.fire("กรอกชื่อ-นามสกุลให้ครบ");
      return;
    }

    try {
      await api.post("/person", form);

      await Swal.fire({ icon: "success", title: "บันทึกสำเร็จ" });

      navigate("/person/status0");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: err.response?.data?.error || "ไม่สามารถบันทึกได้",
      });
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
    filteredDays,
  };
}
