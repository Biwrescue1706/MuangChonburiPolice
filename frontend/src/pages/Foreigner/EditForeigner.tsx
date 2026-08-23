// src/pages/Foreigner/EditForeigner.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";

interface DateParts {
  day: string;
  month: string;
  year: string;
}

interface FormData {
  year: string;
  foreignerIdNo: string;
  name: string;
  age: string;
  nationality: string;
  ethnicity: string;
  certificateRegistrationNo: string;
  district: string;
  province: string;
  domicile: string;
  applicationType: string;
  amount: string;
  receiptBookNo: string;
  receiptNo: string;
  certificateNo: string;
}

interface ForeignerData {
  id: string;
  sequenceNo: number | null;
  year: number | null;
  foreignerIdNo: string | null;
  name: string;
  age: number | null;
  nationality: string | null;
  ethnicity: string | null;
  certificateRegistrationNo: string | null;
  certificateDate: string | null;
  district: string | null;
  province: string | null;
  domicile: string | null;
  applicationType: string | null;
  applicationDate: string | null;
  expirationDate: string | null;
  amount: string | number | null;
  receiptBookNo: string | null;
  receiptNo: string | null;
  receiptDate: string | null;
  certificateNo: string | null;
  petitionDate: string | null;
}

const MONTHS = [
  { value: "01", label: "ม.ค." },
  { value: "02", label: "ก.พ." },
  { value: "03", label: "มี.ค." },
  { value: "04", label: "เม.ย." },
  { value: "05", label: "พ.ค." },
  { value: "06", label: "มิ.ย." },
  { value: "07", label: "ก.ค." },
  { value: "08", label: "ส.ค." },
  { value: "09", label: "ก.ย." },
  { value: "10", label: "ต.ค." },
  { value: "11", label: "พ.ย." },
  { value: "12", label: "ธ.ค." },
];

/* ======================================================
   แปลงวันที่จาก Backend
   รองรับ:
   13 ก.ค. 2569
   2 ม.ค. 2569
   2026-07-13
====================================================== */

function stringToDateParts(value: string | null | undefined): DateParts {
  if (!value) {
    return {
      day: "",
      month: "",
      year: "",
    };
  }

  const text = String(value).replace(/\s+/g, " ").trim();

  // YYYY-MM-DD
  const isoMatch = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);

  if (isoMatch) {
    const ceYear = Number(isoMatch[1]);
    const month = Number(isoMatch[2]);
    const day = Number(isoMatch[3]);

    return {
      day: String(day),
      month: String(month).padStart(2, "0"),
      year: String(ceYear + 543),
    };
  }

  // DD เดือนย่อ พ.ศ.
  const thaiMatch = text.match(/^(\d{1,2})\s+(.+?)\s+(\d{4})$/);

  if (thaiMatch) {
    const day = Number(thaiMatch[1]);
    const monthText = thaiMatch[2].trim();
    const year = Number(thaiMatch[3]);

    const foundMonth = MONTHS.find((item) => item.label === monthText);

    if (foundMonth) {
      return {
        day: String(day),
        month: foundMonth.value,
        year: String(year),
      };
    }
  }

  console.warn("ไม่สามารถแปลงวันที่:", value);

  return {
    day: "",
    month: "",
    year: "",
  };
}

/* ======================================================
   วัน / เดือน / พ.ศ.
   → String เช่น 13 ก.ค. 2569
====================================================== */

function datePartsToString(value: DateParts): string {
  if (!value.day && !value.month && !value.year) {
    return "";
  }

  if (!value.day || !value.month || !value.year) {
    throw new Error("กรุณากรอก วัน เดือน และปี ให้ครบถ้วน");
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

  const ceYear = buddhistYear - 543;

  const lastDay = new Date(ceYear, month, 0).getDate();

  if (day > lastDay) {
    throw new Error("วันที่ไม่ถูกต้องสำหรับเดือนที่เลือก");
  }

  const monthData = MONTHS.find(
    (item) => item.value === String(month).padStart(2, "0"),
  );

  if (!monthData) {
    throw new Error("เดือนไม่ถูกต้อง");
  }

  return `${day} ${monthData.label} ${buddhistYear}`;
}

/* ======================================================
   DATE INPUT
====================================================== */

function DateInput({
  label,
  required = false,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: DateParts;
  onChange: (value: DateParts) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="grid grid-cols-3 gap-2">
        {/* วัน */}
        <select
          value={value.day}
          onChange={(e) =>
            onChange({
              day: e.target.value,
              month: value.month,
              year: value.year,
            })
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
        >
          <option value="">วัน</option>

          {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
            <option key={day} value={String(day)}>
              {day}
            </option>
          ))}
        </select>

        {/* เดือน */}
        <select
          value={value.month}
          onChange={(e) =>
            onChange({
              day: value.day,
              month: e.target.value,
              year: value.year,
            })
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
        >
          <option value="">เดือน</option>

          {MONTHS.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>

        {/* พ.ศ. */}
        <input
          type="number"
          inputMode="numeric"
          value={value.year}
          onChange={(e) =>
            onChange({
              day: value.day,
              month: value.month,
              year: e.target.value,
            })
          }
          placeholder="พ.ศ."
          className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
        />
      </div>
    </div>
  );
}

/* ======================================================
   SECTION
====================================================== */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <h2 className="mb-5 border-l-4 border-[#800020] pl-3 text-lg font-bold text-[#800020]">
        {title}
      </h2>

      {children}
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10";

/* ======================================================
   PAGE
====================================================== */

export default function EditForeigner() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [sequenceNo, setSequenceNo] = useState<number | null>(null);

  const [form, setForm] = useState<FormData>({
    year: String(new Date().getFullYear() + 543),
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

  const [certificateDate, setCertificateDate] = useState<DateParts>({
    day: "",
    month: "",
    year: "",
  });

  const [applicationDate, setApplicationDate] = useState<DateParts>({
    day: "",
    month: "",
    year: "",
  });

  const [expirationDate, setExpirationDate] = useState<DateParts>({
    day: "",
    month: "",
    year: "",
  });

  const [receiptDate, setReceiptDate] = useState<DateParts>({
    day: "",
    month: "",
    year: "",
  });

  const [petitionDate, setPetitionDate] = useState<DateParts>({
    day: "",
    month: "",
    year: "",
  });

  /* ======================================================
     LOAD
  ====================================================== */

  useEffect(() => {
    if (!id) {
      navigate("/foreigner");
      return;
    }

    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/foreigner/${id}`);

      const data: ForeignerData = response.data.data;

      console.log("EDIT FOREIGNER DATA:", data);

      setSequenceNo(data.sequenceNo);

      setForm({
        year:
          data.year !== null && data.year !== undefined
            ? String(data.year)
            : String(new Date().getFullYear() + 543),

        foreignerIdNo: data.foreignerIdNo || "",

        name: data.name || "",

        age:
          data.age !== null && data.age !== undefined ? String(data.age) : "",

        nationality: data.nationality || "",

        ethnicity: data.ethnicity || "",

        certificateRegistrationNo: data.certificateRegistrationNo || "",

        district: data.district || "",

        province: data.province || "",

        domicile: data.domicile || "",

        applicationType: data.applicationType || "",

        amount:
          data.amount !== null && data.amount !== undefined
            ? String(data.amount)
            : "",

        receiptBookNo: data.receiptBookNo || "",

        receiptNo: data.receiptNo || "",

        certificateNo: data.certificateNo || "",
      });

      setCertificateDate(stringToDateParts(data.certificateDate));

      setApplicationDate(stringToDateParts(data.applicationDate));

      setExpirationDate(stringToDateParts(data.expirationDate));

      setReceiptDate(stringToDateParts(data.receiptDate));

      setPetitionDate(stringToDateParts(data.petitionDate));
    } catch (error) {
      console.error("GET FOREIGNER ERROR:", error);

      await Swal.fire({
        icon: "error",
        title: "โหลดข้อมูลไม่สำเร็จ",
        text: "ไม่สามารถโหลดข้อมูลคนต่างด้าวได้",
        confirmButtonText: "ตกลง",
      });

      navigate("/foreigner");
    } finally {
      setLoading(false);
    }
  };

  /* ======================================================
     CHANGE
  ====================================================== */

  const change = (key: keyof FormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /* ======================================================
     SUBMIT
  ====================================================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    if (!form.name.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "กรุณากรอกชื่อ แซ่",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (!form.age.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "กรุณากรอกอายุ",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (!form.certificateRegistrationNo.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "กรุณากรอกเลขทะเบียนของใบสำคัญ",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    try {
      setSaving(true);

      const payload = {
        year: Number(form.year),

        foreignerIdNo: form.foreignerIdNo.trim() || null,

        name: form.name.trim(),

        age: form.age.trim() ? Number(form.age) : null,

        nationality: form.nationality.trim() || null,

        ethnicity: form.ethnicity.trim() || null,

        certificateRegistrationNo:
          form.certificateRegistrationNo.trim() || null,

        // ส่งเป็น "13 ก.ค. 2569"
        certificateDate: datePartsToString(certificateDate) || null,

        district: form.district.trim() || null,

        province: form.province.trim() || null,

        domicile: form.domicile.trim() || null,

        applicationType: form.applicationType.trim() || null,

        // ส่งเป็น "25 ก.พ. 2569"
        applicationDate: datePartsToString(applicationDate) || null,

        // ส่งเป็น "25 ก.พ. 2570"
        expirationDate: datePartsToString(expirationDate) || null,

        amount: form.amount.trim() || null,

        receiptBookNo: form.receiptBookNo.trim() || null,

        receiptNo: form.receiptNo.trim() || null,

        // ส่งเป็น "2 ม.ค. 2569"
        receiptDate: datePartsToString(receiptDate) || null,

        certificateNo: form.certificateNo.trim() || null,

        petitionDate: datePartsToString(petitionDate) || null,
      };

      console.log("UPDATE FOREIGNER PAYLOAD:", payload);

      await api.put(`/foreigner/${id}`, payload);

      await Swal.fire({
        icon: "success",
        title: "แก้ไขข้อมูลสำเร็จ",
        text: "บันทึกข้อมูลเรียบร้อยแล้ว",
        confirmButtonText: "ตกลง",
      });

      navigate(`/foreigner/${id}`);
    } catch (error: any) {
      console.error("UPDATE FOREIGNER ERROR:", error);

      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "ไม่สามารถแก้ไขข้อมูลได้";

      await Swal.fire({
        icon: "error",
        title: "แก้ไขข้อมูลไม่สำเร็จ",
        text: message,
        confirmButtonText: "ตกลง",
      });
    } finally {
      setSaving(false);
    }
  };

  /* ======================================================
     LOADING
  ====================================================== */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl bg-white px-6 py-5 shadow-sm">
          <div className="text-sm text-slate-500">กำลังโหลดข้อมูล...</div>
        </div>
      </div>
    );
  }

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}

        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate(`/foreigner/${id}`)}
            className="mb-3 text-sm font-medium text-slate-500 hover:text-[#800020]"
          >
            ← กลับรายละเอียด
          </button>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#800020]">
                แก้ไขข้อมูลคนต่างด้าว
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                ลำดับ {sequenceNo ?? "-"}
              </p>
            </div>

            <div className="rounded-xl bg-[#800020]/10 px-4 py-2 text-sm font-semibold text-[#800020]">
              ปี พ.ศ. {form.year}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ข้อมูลบุคคล */}

          <Section title="ข้อมูลบุคคล">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  รหัสประจำตัวคนต่างด้าว
                </label>

                <input
                  type="text"
                  value={form.foreignerIdNo}
                  onChange={(e) => change("foreignerIdNo", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ชื่อ แซ่
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => change("name", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  อายุ
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.age}
                  onChange={(e) => change("age", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  สัญชาติ
                </label>

                <input
                  type="text"
                  value={form.nationality}
                  onChange={(e) => change("nationality", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  เชื้อชาติ
                </label>

                <input
                  type="text"
                  value={form.ethnicity}
                  onChange={(e) => change("ethnicity", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </Section>

          {/* ใบสำคัญ */}

          <Section title="ใบสำคัญ">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  เลขทะเบียนของใบสำคัญ
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={form.certificateRegistrationNo}
                  onChange={(e) =>
                    change("certificateRegistrationNo", e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <DateInput
                label="วัน เดือน ปี ของใบสำคัญ"
                required
                value={certificateDate}
                onChange={setCertificateDate}
              />
            </div>
          </Section>

          {/* ออกให้ ณ */}

          <Section title="ออกให้ ณ">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  อำเภอ
                </label>

                <input
                  type="text"
                  value={form.district}
                  onChange={(e) => change("district", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  จังหวัด
                </label>

                <input
                  type="text"
                  value={form.province}
                  onChange={(e) => change("province", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ภูมิลำเนา
                </label>

                <input
                  type="text"
                  value={form.domicile}
                  onChange={(e) => change("domicile", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </Section>

          {/* การขอรับ */}

          <Section title="การขอรับ / ขอรับใบแทน / ขอต่ออายุ">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  วันที่ขอรับใหม่ / ขอรับใบแทน / ขอต่ออายุ เป็นชนิดนั้น
                </label>

                <input
                  type="text"
                  value={form.applicationType}
                  onChange={(e) => change("applicationType", e.target.value)}
                  placeholder="กรอกชนิด"
                  className={inputClass}
                />
              </div>

              <DateInput
                label="วัน เดือน ปี"
                value={applicationDate}
                onChange={setApplicationDate}
              />

              <DateInput
                label="วันหมดอายุ"
                value={expirationDate}
                onChange={setExpirationDate}
              />
            </div>
          </Section>

          {/* ค่าธรรมเนียม */}

          <Section title="ค่าธรรมเนียมและใบเสร็จรับเงิน">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  จำนวนเงิน
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) => change("amount", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ใบเสร็จเล่มที่
                </label>

                <input
                  type="text"
                  value={form.receiptBookNo}
                  onChange={(e) => change("receiptBookNo", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ใบเสร็จเลขที่
                </label>

                <input
                  type="text"
                  value={form.receiptNo}
                  onChange={(e) => change("receiptNo", e.target.value)}
                  className={inputClass}
                />
              </div>

              <DateInput
                label="วัน เดือน ปี ของใบเสร็จ"
                value={receiptDate}
                onChange={setReceiptDate}
              />
            </div>
          </Section>

          {/* อื่น ๆ */}

          <Section title="อื่น ๆ">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  เลขใบสำคัญฯ
                </label>

                <input
                  type="text"
                  value={form.certificateNo}
                  onChange={(e) => change("certificateNo", e.target.value)}
                  className={inputClass}
                />
              </div>

              <DateInput
                label="วันที่ยื่นคำร้อง"
                value={petitionDate}
                onChange={setPetitionDate}
              />
            </div>
          </Section>

          {/* BUTTON */}

          <div className="flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={saving}
              onClick={() => navigate(`/foreigner/${id}`)}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              ยกเลิก
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-[#800020] px-7 py-3 text-sm font-semibold text-white hover:bg-[#660019] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
