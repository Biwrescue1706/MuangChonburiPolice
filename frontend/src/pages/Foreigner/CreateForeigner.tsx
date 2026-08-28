import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { ArrowLeft } from "lucide-react";

import type { DateParts, ForeignerFormData } from "../../types/foreigner";

const MONTHS = [
  { value: "ม.ค.", label: "ม.ค." },
  { value: "ก.พ.", label: "ก.พ." },
  { value: "มี.ค.", label: "มี.ค." },
  { value: "เม.ย.", label: "เม.ย." },
  { value: "พ.ค.", label: "พ.ค." },
  { value: "มิ.ย.", label: "มิ.ย." },
  { value: "ก.ค.", label: "ก.ค." },
  { value: "ส.ค.", label: "ส.ค." },
  { value: "ก.ย.", label: "ก.ย." },
  { value: "ต.ค.", label: "ต.ค." },
  { value: "พ.ย.", label: "พ.ย." },
  { value: "ธ.ค.", label: "ธ.ค." },
];

const CURRENT_BUDDHIST_YEAR = new Date().getFullYear() + 543;

const emptyDate = (currentYear = true): DateParts => ({
  day: "",
  month: "",
  year: currentYear ? String(CURRENT_BUDDHIST_YEAR) : "",
});

const datePartsToString = (
  value: DateParts,
  required = false,
): string | null => {
  const empty = !value.day && !value.month && !value.year;

  if (empty) {
    if (required) {
      throw new Error("กรุณากรอกวัน เดือน ปี ให้ครบ");
    }

    return null;
  }

  if (!value.day || !value.month || !value.year) {
    throw new Error("กรุณากรอกวัน เดือน ปี ให้ครบ");
  }

  const day = Number(value.day);
  const buddhistYear = Number(value.year);
  const monthIndex = MONTHS.findIndex((item) => item.value === value.month);

  if (monthIndex === -1) {
    throw new Error("เดือนไม่ถูกต้อง");
  }

  const month = monthIndex + 1;

  if (!Number.isInteger(day) || day < 1 || day > 31) {
    throw new Error("วันที่ไม่ถูกต้อง");
  }

  if (
    !Number.isInteger(buddhistYear) ||
    buddhistYear < 2400 ||
    buddhistYear > 2700
  ) {
    throw new Error("ปี พ.ศ. ไม่ถูกต้อง");
  }
  const christianYear = buddhistYear - 543;

  const date = new Date(christianYear, month - 1, day);

  if (
    date.getFullYear() !== christianYear ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error("วัน เดือน ปี ไม่ถูกต้อง");
  }

  return `${day} ${value.month} ${buddhistYear}`;
};

const datePartsToISO = (value: DateParts): string | null => {
  const empty = !value.day && !value.month && !value.year;

  if (empty) {
    return null;
  }

  if (!value.day || !value.month || !value.year) {
    throw new Error("กรุณากรอกวัน เดือน ปี ให้ครบ");
  }

  const day = Number(value.day);
  const month = Number(value.month);
  const buddhistYear = Number(value.year);

  if (!Number.isInteger(day) || day < 1 || day > 31) {
    throw new Error("วันที่ไม่ถูกต้อง");
  }

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error("เดือนไม่ถูกต้อง");
  }

  if (
    !Number.isInteger(buddhistYear) ||
    buddhistYear < 2400 ||
    buddhistYear > 2700
  ) {
    throw new Error("ปี พ.ศ. ไม่ถูกต้อง");
  }

  const christianYear = buddhistYear - 543;

  const date = new Date(christianYear, month - 1, day);

  if (
    date.getFullYear() !== christianYear ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error("วัน เดือน ปี ไม่ถูกต้อง");
  }

  return [
    christianYear,
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-");
};

export default function CreateForeigner() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ForeignerFormData>({
    year: String(CURRENT_BUDDHIST_YEAR),

    foreignerIdNo: "",
    name: "",
    age: "",

    nationality: "",
    ethnicity: "",

    certificateRegistrationNo: "",

    district: "",
    province: "",
    domicile: "",

    applicationType: "",

    amount: "",

    receiptBookNo: "",
    receiptNo: "",

    certificateNo: "",
  });

  const [certificateDate, setCertificateDate] =
    useState<DateParts>(emptyDate());

  const [applicationDate, setApplicationDate] =
    useState<DateParts>(emptyDate());

  const [expirationDate, setExpirationDate] = useState<DateParts>(emptyDate());

  const [receiptDate, setReceiptDate] = useState<DateParts>(emptyDate());

  const [petitionDate, setPetitionDate] = useState<DateParts>(emptyDate(false));

  const updateField = (field: keyof ForeignerFormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    if (!form.year.trim()) {
      throw new Error("กรุณากรอกปี พ.ศ.");
    }

    const year = Number(form.year);

    if (!Number.isInteger(year) || year < 2400 || year > 2700) {
      throw new Error("ปี พ.ศ. ไม่ถูกต้อง");
    }

    if (!form.name.trim()) {
      throw new Error("กรุณากรอกชื่อ แซ่");
    }

    if (!form.age.trim()) {
      throw new Error("กรุณากรอกอายุ");
    }

    const age = Number(form.age);

    if (!Number.isInteger(age) || age < 0) {
      throw new Error("อายุไม่ถูกต้อง");
    }

    if (!form.certificateRegistrationNo.trim()) {
      throw new Error("กรุณากรอกเลขทะเบียนของใบสำคัญ");
    }

    if (!form.amount.trim()) {
      throw new Error("กรุณากรอกจำนวนเงิน");
    }

    if (Number(form.amount) < 0) {
      throw new Error("จำนวนเงินไม่ถูกต้อง");
    }

    if (!form.receiptBookNo.trim()) {
      throw new Error("กรุณากรอกใบเสร็จเล่มที่");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (loading) return;

    try {
      validate();

      setLoading(true);
      const certificateDateString = datePartsToString(certificateDate, true);

      const applicationDateString = datePartsToString(applicationDate, true);

      const expirationDateString = datePartsToString(expirationDate, true);

      const receiptDateString = datePartsToString(receiptDate, true);
      const petitionDateISO = datePartsToISO(petitionDate);

      const payload = {
        year: Number(form.year),

        foreignerIdNo: form.foreignerIdNo.trim() || null,

        name: form.name.trim(),

        age: Number(form.age),

        nationality: form.nationality.trim() || null,

        ethnicity: form.ethnicity.trim() || null,

        certificateRegistrationNo: form.certificateRegistrationNo.trim(),

        certificateDate: certificateDateString,

        district: form.district.trim() || null,

        province: form.province.trim() || null,

        domicile: form.domicile.trim() || null,

        applicationType: form.applicationType.trim() || null,

        applicationDate: applicationDateString,

        expirationDate: expirationDateString,

        amount: form.amount.trim() ? form.amount.trim() : null,

        receiptBookNo: form.receiptBookNo.trim(),

        receiptNo: form.receiptNo.trim() || null,

        receiptDate: receiptDateString,

        certificateNo: form.certificateNo.trim() || null,

        petitionDate: petitionDateISO,
      };

      console.log("CREATE FOREIGNER PAYLOAD:", payload);

      await api.post("/foreigner", payload);

      await Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ",
        text: "เพิ่มข้อมูลบุคคลต่างด้าวเรียบร้อยแล้ว",
        confirmButtonText: "ตกลง",
      });

      navigate("/foreigner");
    } catch (error: any) {
      console.error("CREATE FOREIGNER ERROR:", error);

      const message =
        error?.response?.data?.error ||
        error?.message ||
        "เกิดข้อผิดพลาดในการบันทึกข้อมูล";

      await Swal.fire({
        icon: "error",
        title: "บันทึกไม่สำเร็จ",
        text: message,
        confirmButtonText: "ตกลง",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        {}

        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/foreigner")}
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#800020] hover:bg-[#800020] hover:text-white"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            กลับหน้าประวัติ
          </button>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#800020] md:text-3xl">
            เพิ่มข้อมูลบุคคลต่างด้าว
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">
            เพิ่มข้อมูลบุคคลต่างด้าวเข้าสู่ระบบ
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {}

          <Section title="ข้อมูลรายการ">
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="ปี พ.ศ."
                required
                type="number"
                min="2400"
                max="2700"
                value={form.year}
                onChange={(e) =>
                  updateField("year", e.target.value.slice(0, 4))
                }
              />

              <div className="flex items-end pb-2 text-sm text-gray-500">
                ปี พ.ศ. เริ่มต้นจากปีปัจจุบัน และสามารถแก้ไขได้
              </div>
            </div>
          </Section>

          {}

          <Section title="ข้อมูลบุคคล">
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="รหัสประจำตัวคนต่างด้าว"
                value={form.foreignerIdNo}
                onChange={(e) => updateField("foreignerIdNo", e.target.value)}
              />

              <Input
                label="ชื่อ แซ่"
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />

              <Input
                label="อายุ"
                required
                type="number"
                min="0"
                value={form.age}
                onChange={(e) => updateField("age", e.target.value)}
              />

              <Input
                label="สัญชาติ"
                value={form.nationality}
                onChange={(e) => updateField("nationality", e.target.value)}
                required
              />

              <Input
                label="เชื้อชาติ"
                value={form.ethnicity}
                onChange={(e) => updateField("ethnicity", e.target.value)}
                required
              />
            </div>
          </Section>

          {}

          <Section title="ใบสำคัญ">
            <div className="space-y-5">
              <Input
                label="เลขทะเบียนของใบสำคัญ"
                required
                value={form.certificateRegistrationNo}
                onChange={(e) =>
                  updateField("certificateRegistrationNo", e.target.value)
                }
              />

              <DateInput
                label="วัน เดือน ปี ของใบสำคัญ"
                required
                value={certificateDate}
                setValue={setCertificateDate}
              />
            </div>
          </Section>

          {}

          <Section title="ออกให้ ณ">
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="ออกให้ ณ อำเภอ"
                value={form.district}
                required
                onChange={(e) => updateField("district", e.target.value)}
              />

              <Input
                label="ออกให้ ณ จังหวัด"
                value={form.province}
                required
                onChange={(e) => updateField("province", e.target.value)}
              />
            </div>
          </Section>

          {}

          <Section title="ภูมิลำเนา">
            <Textarea
              label="ภูมิลำเนา"
              required
              value={form.domicile}
              onChange={(e) => updateField("domicile", e.target.value)}
            />
          </Section>

          {}

          <Section title="การขอรับ / ขอรับใบแทน / ขอต่ออายุ">
            <div className="space-y-5">
              <Input
                label="วันที่ขอรับใหม่ / ขอรับใบแทน / ขอต่ออายุ เป็นชนิดนั้น"
                placeholder="เช่น ขอรับใหม่ / ขอรับใบแทน / ขอต่ออายุ"
                value={form.applicationType}
                required
                onChange={(e) => updateField("applicationType", e.target.value)}
              />

              <DateInput
                label="แต่ วัน เดือน ปี"
                required
                value={applicationDate}
                setValue={setApplicationDate}
              />

              <DateInput
                label="วันหมดอายุ"
                required
                value={expirationDate}
                setValue={setExpirationDate}
              />
            </div>
          </Section>

          {}

          <Section title="ค่าธรรมเนียมและใบเสร็จ">
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="จำนวนเงิน"
                required
                type="number"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={(e) => updateField("amount", e.target.value)}
              />

              <Input
                label="ใบเสร็จเล่มที่"
                required
                value={form.receiptBookNo}
                onChange={(e) => updateField("receiptBookNo", e.target.value)}
              />

              <Input
                label="ใบเสร็จเลขที่"
                value={form.receiptNo}
                onChange={(e) => updateField("receiptNo", e.target.value)}
                required
              />

              <DateInput
                label="วัน เดือน ปี ของใบเสร็จ"
                required
                value={receiptDate}
                setValue={setReceiptDate}
              />
            </div>
          </Section>

          {}

          <Section title="อื่น ๆ">
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="เลขใบสำคัญฯ"
                value={form.certificateNo}
                onChange={(e) => updateField("certificateNo", e.target.value)}
              />

              <DateInput
                label="วันที่ยื่นคำร้อง"
                value={petitionDate}
                setValue={setPetitionDate}
              />
            </div>
          </Section>

          {}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={loading}
              onClick={() => navigate("/foreigner")}
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
            >
              ยกเลิก
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#800020] px-6 py-3 font-semibold text-white transition hover:bg-[#650019] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-[#800020] px-5 py-3">
        <h2 className="font-semibold text-white">{title}</h2>
      </div>

      <div className="p-5">{children}</div>
    </section>
  );
}

function Input({
  label,
  required,
  ...props
}: {
  label: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}

        {required && <span className="ml-1 text-red-600">*</span>}
      </label>

      <input
        {...props}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
      />
    </div>
  );
}

function Textarea({
  label,
  required,
  ...props
}: {
  label: string;
  required?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}

        {required && <span className="ml-1 text-red-600">*</span>}
      </label>

      <textarea
        {...props}
        rows={3}
        className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
      />
    </div>
  );
}

function DateInput({
  label,
  required,
  value,
  setValue,
}: {
  label: string;
  required?: boolean;
  value: DateParts;
  setValue: React.Dispatch<React.SetStateAction<DateParts>>;
}) {
  const updateDate = (field: keyof DateParts, newValue: string) => {
    setValue((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}

        {required && <span className="ml-1 text-red-600">*</span>}
      </label>

      <div className="grid grid-cols-3 gap-2">
        {}

        <input
          type="number"
          min="1"
          max="31"
          placeholder="วัน"
          value={value.day}
          onChange={(e) => updateDate("day", e.target.value.slice(0, 2))}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
        />

        {}

        <select
          value={value.month}
          onChange={(e) => updateDate("month", e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
        >
          <option value="">เดือน</option>

          {MONTHS.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>

        {}

        <input
          type="number"
          min="2400"
          max="2700"
          placeholder="พ.ศ."
          value={value.year}
          onChange={(e) => updateDate("year", e.target.value.slice(0, 4))}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
        />
      </div>

      <div className="mt-1 grid grid-cols-3 gap-2 text-center text-xs text-gray-400">
        <span>วัน</span>
        <span>เดือน</span>
        <span>พ.ศ.</span>
      </div>
    </div>
  );
}
