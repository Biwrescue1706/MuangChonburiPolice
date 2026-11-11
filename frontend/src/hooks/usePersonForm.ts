// src/hooks/usePersonForm.ts
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { NavigateFunction } from "react-router-dom";
import type { AxiosError } from "axios";
import api from "../api/axios";
import { toast } from "../utils/toast";

interface PersonForm {
  [key: string]: string | number | null;
  prefix: string;
  firstName: string;
  lastName: string;
  fullName: string;
  citizenId: string;
  nationality: string;
  ethnicity: string;
  bodyType: string;
  skinColor: string;
  behavior: string;
  distinguishingMarks: string;
  father: string;
  mother: string;
  spouse: string;
  money: number;
  moneyText: string;
  weight: number | null;
  height: number | null;
  workplaceAddress: string;
  occupation: string;
  address: string;
  purpose: string;
  requestingAgency: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  fingerprintDay: string;
  fingerprintMonth: string;
  fingerprintYear: string;
  receiptDay: string;
  receiptMonth: string;
  receiptYear: string;
  fingerprintDate: string;
  receiptDate: string;
  priority: number;
  status: number;
  receiptBookNo: string;
  receiptNo: string;
}

interface ApiErrorResponse {
  error?: string;
}

interface ReceiptResponse {
  bookNo?: string | number;
  usedNumbers?: number[];
}

const ALL_RECEIPT_NUMBERS = Array.from({ length: 50 }, (_, index) => index + 1);

const getAvailableReceiptNumbers = (usedNumbers: number[]) =>
  ALL_RECEIPT_NUMBERS.filter((number) => !usedNumbers.includes(number));

const MONTHS = [
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

const getTodayTH = () => {
  const now = new Date();

  return {
    day: String(now.getDate()),
    month: MONTHS[now.getMonth()],
    year: String(now.getFullYear() + 543),
  };
};

const isLeapYear = (yearBE: string) => {
  const yearAD = Number(yearBE) - 543;

  if (yearAD % 400 === 0) return true;
  if (yearAD % 100 === 0) return false;

  return yearAD % 4 === 0;
};

const getDaysInMonth = (month: string, year?: string) => {
  if (!month) return 31;

  if (month === "กุมภาพันธ์") {
    return year && isLeapYear(year) ? 29 : 28;
  }

  if (["เมษายน", "มิถุนายน", "กันยายน", "พฤศจิกายน"].includes(month)) {
    return 30;
  }

  return 31;
};

const convertMoneyToText = (amount: number) => {
  if (!amount) return "";
  if (amount === 100) return "หนึ่งร้อยบาทถ้วน";

  return `${amount}บาทถ้วน`;
};

const isEmpty = (value: unknown): boolean =>
  value === undefined ||
  value === null ||
  value === "" ||
  (typeof value === "number" && Number.isNaN(value));

export default function usePersonForm(navigate: NavigateFunction) {
  const currentYearTH = new Date().getFullYear() + 543;

  const [receiptNumbers, setReceiptNumbers] = useState<number[]>([]);

  const maxYear = currentYearTH - 18;
  const minYear = currentYearTH - 100;

  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, index) => maxYear - index,
  );

  const nationalities = ["ไทย", "ลาว", "กัมพูชา", "พม่า", "จีน", "อื่นๆ"];
  const ethnicities = ["ไทย", "จีน", "ลาว", "มอญ", "กะเหรี่ยง", "อื่นๆ"];
  const bodyTypes = ["ผอม", "สันทัด", "ท้วม", "อ้วน"];
  const skinColors = ["ขาว", "ขาวเหลือง", "สองสี", "ดำแดง", "ดำ"];

  const heights = Array.from({ length: 121 }, (_, index) => index + 100);
  const weights = Array.from({ length: 151 }, (_, index) => index + 30);

  const today = getTodayTH();

  const [form, setForm] = useState<PersonForm>({
    prefix: "นาย",
    firstName: "",
    lastName: "",
    fullName: "",
    citizenId: "",
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
    address: "",
    purpose: "",
    requestingAgency: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    fingerprintDay: today.day,
    fingerprintMonth: today.month,
    fingerprintYear: today.year,
    receiptDay: today.day,
    receiptMonth: today.month,
    receiptYear: today.year,
    fingerprintDate: "",
    receiptDate: "",
    priority: 0,
    status: 0,
    receiptBookNo: "",
    receiptNo: "",
  });

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await api.get<ReceiptResponse>("/receipt/latest");

        const bookNo = String(response.data?.bookNo ?? "");
        const usedNumbers = Array.isArray(response.data?.usedNumbers)
          ? response.data.usedNumbers
          : [];

        setForm((previous) => {
          if (previous.receiptBookNo === bookNo) return previous;

          return {
            ...previous,
            receiptBookNo: bookNo,
          };
        });

        setReceiptNumbers(getAvailableReceiptNumbers(usedNumbers));
      } catch {
        setReceiptNumbers([]);
      }
    };

    void fetchReceipts();
  }, []);

  useEffect(() => {
    if (!form.receiptBookNo) return;

    let cancelled = false;

    const fetchUsedNumbers = async () => {
      try {
        const response = await api.get<ReceiptResponse>(
          `/receipt/used/${encodeURIComponent(form.receiptBookNo)}`,
        );

        const usedNumbers = Array.isArray(response.data?.usedNumbers)
          ? response.data.usedNumbers
          : [];

        if (!cancelled) {
          setReceiptNumbers(getAvailableReceiptNumbers(usedNumbers));
        }
      } catch {
        if (!cancelled) {
          setReceiptNumbers(ALL_RECEIPT_NUMBERS);
        }
      }
    };

    void fetchUsedNumbers();

    return () => {
      cancelled = true;
    };
  }, [form.receiptBookNo]);

  const filteredHeights = heights.filter((height) =>
    form.height !== null && form.height !== 0
      ? String(height).startsWith(String(form.height))
      : true,
  );

  const filteredWeights = weights.filter((weight) =>
    form.weight !== null && form.weight !== 0
      ? String(weight).startsWith(String(form.weight))
      : true,
  );

  const maxDay = getDaysInMonth(form.birthMonth, form.birthYear);

  const filteredDays = Array.from({ length: maxDay }, (_, index) => index + 1);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    if (name === "citizenId") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 13);

      setForm((previous) => ({
        ...previous,
        citizenId: onlyNumbers,
      }));

      return;
    }

    if (name === "money") {
      const amount = Number(value);

      setForm((previous) => ({
        ...previous,
        money: amount,
        moneyText: convertMoneyToText(amount),
      }));

      return;
    }

    if (name === "weight" || name === "height") {
      setForm((previous) => ({
        ...previous,
        [name]: value === "" ? null : Number(value),
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fingerprintDate =
      form.fingerprintDay && form.fingerprintMonth && form.fingerprintYear
        ? `${form.fingerprintDay} ${form.fingerprintMonth} ${form.fingerprintYear}`
        : "";

    const receiptDate =
      form.receiptDay && form.receiptMonth && form.receiptYear
        ? `${form.receiptDay} ${form.receiptMonth} ${form.receiptYear}`
        : "";

    const fullName = [form.prefix, form.firstName, form.lastName]
      .filter(Boolean)
      .join(" ");

    const finalForm: PersonForm = {
      ...form,
      fullName,
      fingerprintDate,
      receiptDate,
    };

    const requiredFields = [
      "receiptBookNo",
      "prefix",
      "firstName",
      "lastName",
      "citizenId",
      "birthDay",
      "birthMonth",
      "birthYear",
      "nationality",
      "ethnicity",
      "weight",
      "height",
      "bodyType",
      "skinColor",
      "behavior",
      "distinguishingMarks",
      "address",
      "occupation",
      "workplaceAddress",
      "father",
      "mother",
      "spouse",
      "fingerprintDay",
      "fingerprintMonth",
      "fingerprintYear",
      "purpose",
      "requestingAgency",
      "receiptNo",
      "receiptDay",
      "receiptMonth",
      "receiptYear",
    ] as const;

    const missingFields = requiredFields.filter((field) =>
      isEmpty(finalForm[field]),
    );

    if (missingFields.length > 0) {
      toast(
        "warning",
        "กรอกข้อมูลไม่ครบ",
        `ยังขาด ${missingFields.length} ช่อง`,
      );

      return;
    }

    if (
      typeof finalForm.citizenId !== "string" ||
      finalForm.citizenId.length !== 13
    ) {
      toast("warning", "เลขบัตรประชาชนต้องเป็น 13 หลัก");
      return;
    }

    try {
      await api.post("/person", finalForm);

      toast("success", "บันทึกสำเร็จ");
      navigate("/person/history");
    } catch (err: unknown) {
      const error = err as AxiosError<ApiErrorResponse>;

      toast(
        "error",
        "ผิดพลาด",
        error.response?.data?.error || "ไม่สามารถบันทึกได้",
      );
    }
  };

  return {
    form,
    setForm,
    handleChange,
    handleSubmit,
    receiptNumbers,
    months: MONTHS,
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
