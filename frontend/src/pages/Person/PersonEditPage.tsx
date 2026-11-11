// src/pages/statusPerson/PersonEditPage.tsx
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { toast } from "../../utils/toast";

const currentYear = new Date().getFullYear();
const currentYearTH = currentYear + 543;
const maxYear = currentYearTH - 18;
const minYear = currentYearTH - 100;

const years = Array.from(
  { length: maxYear - minYear + 1 },
  (_, i) => maxYear - i,
);

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

const heights = Array.from({ length: 121 }, (_, i) => i + 100);
const weights = Array.from({ length: 151 }, (_, i) => i + 30);

const nationalities = ["ไทย", "ลาว", "กัมพูชา", "พม่า", "จีน", "อื่นๆ"];
const ethnicities = ["ไทย", "จีน", "ลาว", "มอญ", "กะเหรี่ยง", "อื่นๆ"];
const bodyTypes = ["ผอม", "สันทัด", "ท้วม", "อ้วน"];
const skinColors = ["ขาว", "ขาวเหลือง", "สองสี", "ดำแดง", "ดำ"];

const statusOptions = [
  { value: 0, label: "รอส่ง ศพฐ" },
  { value: 1, label: "เตรียมเอกสาร ส่ง พฐ" },
  { value: 2, label: "ส่ง ศพฐ แล้ว" },
  { value: 3, label: "รับจาก ศพฐ แล้ว" },
  { value: 4, label: "ส่งคืนต้นสังกัด" },
];

const isLeapYear = (yearBE: string) => {
  const yearAD = Number(yearBE) - 543;
  if (yearAD % 400 === 0) return true;
  if (yearAD % 100 === 0) return false;
  return yearAD % 4 === 0;
};

const getDaysInMonth = (month?: string, year?: string) => {
  if (!month) return 31;
  if (month === "กุมภาพันธ์") return year && isLeapYear(year) ? 29 : 28;
  if (["เมษายน", "มิถุนายน", "กันยายน", "พฤศจิกายน"].includes(month)) return 30;
  return 31;
};

const splitDate = (value: string) => {
  if (!value) return {};
  const parts = value.split(" ");
  if (parts.length !== 3) return {};

  return {
    day: parts[0],
    month: parts[1],
    year: parts[2],
  };
};

const buildThaiDate = (day?: string, month?: string, year?: string) => {
  if (!day || !month || !year) return null;
  return `${String(day).padStart(2, "0")} ${month} ${year}`;
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100";

const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

function SectionCard({
  title,
  subtitle,
  number,
  color,
  children,
}: {
  title: string;
  subtitle?: string;
  number: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center gap-4 border-b border-slate-100 px-5 py-5 md:px-6">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm ${color}`}
        >
          {number}
        </div>

        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-800 md:text-lg">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-500 md:text-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="p-5 md:p-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function DateGroup({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        <h3 className="text-sm font-bold text-slate-700">{title}</h3>
      </div>
      {children}
    </div>
  );
}

type PersonForm = {
  [key: string]: string | number | undefined;

  prefix?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  citizenId?: string;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  fingerprintDay?: string;
  fingerprintMonth?: string;
  fingerprintYear?: string;
  receiptDay?: string;
  receiptMonth?: string;
  receiptYear?: string;
  purpose?: string;
  requestingAgency?: string;
  nationality?: string;
  ethnicity?: string;
  height?: string | number;
  weight?: string | number;
  bodyType?: string;
  skinColor?: string;
  distinguishingMarks?: string;
  behavior?: string;
  address?: string;
  occupation?: string;
  workplaceAddress?: string;
  father?: string;
  mother?: string;
  spouse?: string;
  receiptBookNo?: string;
  receiptNo?: string;
  money?: string | number;
  priority?: number;
  status?: number;
};

export default function PersonEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<PersonForm>({});
  const [original, setOriginal] = useState<PersonForm>({});
  const [loading, setLoading] = useState(false);

  const fetchPerson = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get(`/person/${id}`);
      const data = res.data.data;

      const fingerprint = splitDate(data.fingerprintDate);
      const receipt = splitDate(data.receiptDate);

      const newData = {
        ...data,
        citizenId: data.citizenId ? data.citizenId.replace(/\D/g, "") : "",
        birthDay: data.birthDay,
        birthMonth: data.birthMonth,
        birthYear: data.birthYear,
        fingerprintDay: fingerprint.day,
        fingerprintMonth: fingerprint.month,
        fingerprintYear: fingerprint.year,
        receiptDay: receipt.day,
        receiptMonth: receipt.month,
        receiptYear: receipt.year,
      };

      setForm(newData);
      setOriginal(newData);
    } catch {
      toast("error", "โหลดข้อมูลไม่สำเร็จ");
      navigate("/person/history");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    void fetchPerson();
  }, [fetchPerson]);

  const maxBirthDay = getDaysInMonth(form.birthMonth, form.birthYear);
  const maxFingerprintDay = getDaysInMonth(
    form.fingerprintMonth,
    form.fingerprintYear,
  );
  const maxReceiptDay = getDaysInMonth(form.receiptMonth, form.receiptYear);

  const birthDays = Array.from({ length: maxBirthDay }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  const fingerprintDays = Array.from({ length: maxFingerprintDay }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  const receiptDays = Array.from({ length: maxReceiptDay }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  const filteredHeights = heights.filter((h) =>
    form.height ? String(h).startsWith(String(form.height)) : true,
  );

  const filteredWeights = weights.filter((w) =>
    form.weight ? String(w).startsWith(String(form.weight)) : true,
  );

  useEffect(() => {
    if (form.birthDay && Number(form.birthDay) > maxBirthDay) {
      setForm((prev) => ({ ...prev, birthDay: "" }));
    }
  }, [form.birthDay, form.birthMonth, form.birthYear, maxBirthDay]);

  useEffect(() => {
    if (
      form.fingerprintDay &&
      Number(form.fingerprintDay) > maxFingerprintDay
    ) {
      setForm((prev) => ({ ...prev, fingerprintDay: "" }));
    }
  }, [
    form.fingerprintDay,
    form.fingerprintMonth,
    form.fingerprintYear,
    maxFingerprintDay,
  ]);

  useEffect(() => {
    if (form.receiptDay && Number(form.receiptDay) > maxReceiptDay) {
      setForm((prev) => ({ ...prev, receiptDay: "" }));
    }
  }, [form.receiptDay, form.receiptMonth, form.receiptYear, maxReceiptDay]);

  useEffect(() => {
    if (!form.receiptYear) {
      setForm((prev) => ({
        ...prev,
        receiptYear: String(currentYearTH),
      }));
    }
  }, [form.receiptYear]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "money" ? Number(value) : value,
    }));
  };

  const handleCancel = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/person/history");
  };

  const handleSubmit = async () => {
    if (loading) return;

    if (!form.firstName || !form.lastName) {
      toast("error", "กรุณากรอกชื่อ-นามสกุล");
      return;
    }

    if (form.citizenId && form.citizenId.length !== 13) {
      toast("error", "เลขบัตรประชาชนต้อง 13 หลัก");
      return;
    }

    const confirm = await Swal.fire({
      title: "บันทึกข้อมูล?",
      text: "กรุณาตรวจสอบข้อมูลก่อนยืนยัน",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#881337",
      cancelButtonColor: "#64748b",
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      const fingerprintDate = buildThaiDate(
        form.fingerprintDay,
        form.fingerprintMonth,
        form.fingerprintYear,
      );

      const receiptDate = buildThaiDate(
        form.receiptDay,
        form.receiptMonth,
        form.receiptYear,
      );

      const finalData = {
        ...original,
        ...form,
        priority: Number(form.priority ?? 0),
        status:
          Number(form.priority) === 2 || Number(form.priority) === 3
            ? 1
            : Number(form.status ?? 0),
        birthDate: buildThaiDate(
          form.birthDay,
          form.birthMonth,
          form.birthYear,
        ),
        fingerprintDate: fingerprintDate || original.fingerprintDate,
        receiptDate: receiptDate || original.receiptDate,
        fullName: [form.prefix, form.firstName, form.lastName]
          .filter(Boolean)
          .join(" "),
      };

      await api.put(`/person/${id}`, finalData);

      toast("success", "บันทึกข้อมูลสำเร็จ");
      navigate("/person/history");
    } catch {
      toast("error", "บันทึกข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center bg-slate-50">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-7 py-5 shadow-sm">
          <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-rose-100 border-t-rose-800" />
          <div>
            <p className="text-sm font-bold text-slate-700">กำลังโหลดข้อมูล</p>
            <p className="mt-0.5 text-xs text-slate-400">กรุณารอสักครู่...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7f9] px-3 py-5 sm:px-5 md:px-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#501326] via-[#721b36] to-[#912d49] px-5 py-6 text-white shadow-md md:px-8 md:py-8">
          <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[28px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-24 right-36 h-48 w-48 rounded-full bg-white/5" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-md bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-[0.18em] text-rose-100">
                  PERSON MANAGEMENT
                </span>
                <span className="h-1 w-1 rounded-full bg-amber-300" />
                <span className="text-xs text-rose-100/80">
                  ระบบจัดการข้อมูลบุคคล
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                แก้ไขข้อมูลบุคคล
              </h1>

              <p className="mt-2 text-sm text-rose-100/80">
                ตรวจสอบและปรับปรุงรายละเอียดข้อมูลบุคคลในระบบ
              </p>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 sm:self-center"
            >
              <span aria-hidden="true">←</span>
              กลับหน้าก่อนหน้า
            </button>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-slate-700">
              แบบฟอร์มแก้ไขข้อมูล
            </span>
          </div>

          <p className="text-xs text-slate-400">
            กรุณาตรวจสอบความถูกต้องก่อนบันทึก
          </p>
        </div>

        <div className="space-y-5">
          <SectionCard
            number="01"
            title="ข้อมูลพื้นฐาน"
            subtitle="รายละเอียดชื่อและข้อมูลวันที่สำคัญ"
            color="bg-gradient-to-br from-blue-600 to-blue-800"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Field label="คำนำหน้า">
                <input
                  list="prefix-options"
                  name="prefix"
                  className={inputClass}
                  value={form.prefix || ""}
                  onChange={handleChange}
                />
                <datalist id="prefix-options">
                  <option value="นาย" />
                  <option value="นาง" />
                  <option value="นางสาว" />
                </datalist>
              </Field>

              <Field label="ชื่อ">
                <input
                  name="firstName"
                  className={inputClass}
                  value={form.firstName || ""}
                  onChange={handleChange}
                  placeholder="กรอกชื่อ"
                />
              </Field>

              <Field label="นามสกุล">
                <input
                  name="lastName"
                  className={inputClass}
                  value={form.lastName || ""}
                  onChange={handleChange}
                  placeholder="กรอกนามสกุล"
                />
              </Field>
            </div>

            <div className="mt-6 space-y-4">
              <DateGroup title="วันเดือนปีเกิด" color="bg-blue-500">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Field label="วัน">
                    <input
                      list="birth-day-list"
                      name="birthDay"
                      className={inputClass}
                      value={form.birthDay || ""}
                      onChange={handleChange}
                      placeholder="เลือกวัน"
                    />
                    <datalist id="birth-day-list">
                      {birthDays.map((d) => (
                        <option key={d} value={d} />
                      ))}
                    </datalist>
                  </Field>

                  <Field label="เดือน">
                    <input
                      list="birth-month-list"
                      name="birthMonth"
                      className={inputClass}
                      value={form.birthMonth || ""}
                      onChange={handleChange}
                      placeholder="เลือกเดือน"
                    />
                    <datalist id="birth-month-list">
                      {months.map((m) => (
                        <option key={m} value={m} />
                      ))}
                    </datalist>
                  </Field>

                  <Field label="ปี พ.ศ.">
                    <input
                      list="birth-year-list"
                      name="birthYear"
                      className={inputClass}
                      value={form.birthYear || ""}
                      onChange={handleChange}
                      placeholder="กรอกปี พ.ศ."
                    />
                    <datalist id="birth-year-list">
                      {years.map((y) => (
                        <option key={y} value={y} />
                      ))}
                    </datalist>
                  </Field>
                </div>
              </DateGroup>

              <DateGroup title="วันพิมพ์ลายนิ้วมือ" color="bg-violet-500">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Field label="วัน">
                    <input
                      list="fp-day-list"
                      name="fingerprintDay"
                      className={inputClass}
                      value={form.fingerprintDay || ""}
                      onChange={handleChange}
                      placeholder="เลือกวัน"
                    />
                    <datalist id="fp-day-list">
                      {fingerprintDays.map((d) => (
                        <option key={d} value={d} />
                      ))}
                    </datalist>
                  </Field>

                  <Field label="เดือน">
                    <input
                      list="fp-month-list"
                      name="fingerprintMonth"
                      className={inputClass}
                      value={form.fingerprintMonth || ""}
                      onChange={handleChange}
                      placeholder="เลือกเดือน"
                    />
                    <datalist id="fp-month-list">
                      {months.map((m) => (
                        <option key={m} value={m} />
                      ))}
                    </datalist>
                  </Field>

                  <Field label="ปี พ.ศ.">
                    <input
                      list="fp-year-list"
                      name="fingerprintYear"
                      className={inputClass}
                      value={form.fingerprintYear || ""}
                      onChange={handleChange}
                      placeholder="กรอกปี พ.ศ."
                    />
                    <datalist id="fp-year-list">
                      {years.map((y) => (
                        <option key={y} value={y} />
                      ))}
                    </datalist>
                  </Field>
                </div>
              </DateGroup>
            </div>
          </SectionCard>

          <SectionCard
            number="02"
            title="รายละเอียดการขอตรวจสอบ"
            subtitle="ข้อมูลวัตถุประสงค์และหน่วยงานที่ร้องขอ"
            color="bg-gradient-to-br from-slate-600 to-slate-800"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="ตรวจสอบประวัติเพื่อ">
                <input
                  name="purpose"
                  className={inputClass}
                  value={form.purpose || ""}
                  onChange={handleChange}
                  placeholder="ระบุวัตถุประสงค์"
                />
              </Field>

              <Field label="ของส่วนราชการ/หน่วยงาน">
                <input
                  name="requestingAgency"
                  className={inputClass}
                  value={form.requestingAgency || ""}
                  onChange={handleChange}
                  placeholder="ระบุชื่อหน่วยงาน"
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard
            number="03"
            title="ข้อมูลเพิ่มเติม"
            subtitle="ข้อมูลส่วนบุคคล ลักษณะรูปพรรณ และที่อยู่"
            color="bg-gradient-to-br from-cyan-600 to-teal-700"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Field label="เลขบัตรประชาชน">
                <input
                  name="citizenId"
                  inputMode="numeric"
                  maxLength={13}
                  className={inputClass}
                  value={form.citizenId || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      citizenId: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  placeholder="เลขบัตรประชาชน 13 หลัก"
                />
                <p className="mt-1.5 text-xs text-slate-400">
                  {(form.citizenId || "").length}/13 หลัก
                </p>
              </Field>

              <Field label="สัญชาติ">
                <input
                  list="nationality-list"
                  name="nationality"
                  className={inputClass}
                  value={form.nationality || ""}
                  onChange={handleChange}
                  placeholder="เลือกหรือกรอกสัญชาติ"
                />
                <datalist id="nationality-list">
                  {nationalities.map((n) => (
                    <option key={n} value={n} />
                  ))}
                </datalist>
              </Field>

              <Field label="เชื้อชาติ">
                <input
                  list="ethnicity-list"
                  name="ethnicity"
                  className={inputClass}
                  value={form.ethnicity || ""}
                  onChange={handleChange}
                  placeholder="เลือกหรือกรอกเชื้อชาติ"
                />
                <datalist id="ethnicity-list">
                  {ethnicities.map((e) => (
                    <option key={e} value={e} />
                  ))}
                </datalist>
              </Field>

              <Field label="ส่วนสูง (เซนติเมตร)">
                <input
                  type="number"
                  list="height-list"
                  name="height"
                  className={inputClass}
                  value={form.height || ""}
                  onChange={handleChange}
                  placeholder="ระบุส่วนสูง"
                />
                <datalist id="height-list">
                  {filteredHeights.map((h) => (
                    <option key={h} value={h} />
                  ))}
                </datalist>
              </Field>

              <Field label="น้ำหนัก (กิโลกรัม)">
                <input
                  type="number"
                  list="weight-list"
                  name="weight"
                  className={inputClass}
                  value={form.weight || ""}
                  onChange={handleChange}
                  placeholder="ระบุน้ำหนัก"
                />
                <datalist id="weight-list">
                  {filteredWeights.map((w) => (
                    <option key={w} value={w} />
                  ))}
                </datalist>
              </Field>

              <Field label="รูปร่าง">
                <input
                  list="body-type-list"
                  name="bodyType"
                  className={inputClass}
                  value={form.bodyType || ""}
                  onChange={handleChange}
                  placeholder="เลือกรูปร่าง"
                />
                <datalist id="body-type-list">
                  {bodyTypes.map((b) => (
                    <option key={b} value={b} />
                  ))}
                </datalist>
              </Field>

              <Field label="สีผิว">
                <input
                  list="skin-color-list"
                  name="skinColor"
                  className={inputClass}
                  value={form.skinColor || ""}
                  onChange={handleChange}
                  placeholder="เลือกสีผิว"
                />
                <datalist id="skin-color-list">
                  {skinColors.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </Field>

              <Field label="ตำหนิ/พิการ/ลายสัก">
                <input
                  name="distinguishingMarks"
                  className={inputClass}
                  value={form.distinguishingMarks || ""}
                  onChange={handleChange}
                  placeholder="ระบุตำหนิหรือลักษณะพิเศษ"
                />
              </Field>

              <Field label="ลักษณะนิสัยและนิสัยอันเป็นที่น่าสังเกต">
                <input
                  name="behavior"
                  className={inputClass}
                  value={form.behavior || ""}
                  onChange={handleChange}
                  placeholder="ระบุรายละเอียด"
                />
              </Field>

              <Field label="ที่อยู่ปัจจุบัน">
                <input
                  name="address"
                  className={inputClass}
                  value={form.address || ""}
                  onChange={handleChange}
                  placeholder="ระบุที่อยู่ปัจจุบัน"
                />
              </Field>

              <Field label="อาชีพ">
                <input
                  name="occupation"
                  className={inputClass}
                  value={form.occupation || ""}
                  onChange={handleChange}
                  placeholder="ระบุอาชีพ"
                />
              </Field>

              <Field label="สถานที่ทำงาน">
                <input
                  name="workplaceAddress"
                  className={inputClass}
                  value={form.workplaceAddress || ""}
                  onChange={handleChange}
                  placeholder="ระบุสถานที่ทำงาน"
                />
              </Field>

              <Field label="ชื่อตัว ชื่อสกุล บิดา">
                <input
                  name="father"
                  className={inputClass}
                  value={form.father || ""}
                  onChange={handleChange}
                  placeholder="ชื่อ-นามสกุลบิดา"
                />
              </Field>

              <Field label="ชื่อตัว ชื่อสกุล มารดา">
                <input
                  name="mother"
                  className={inputClass}
                  value={form.mother || ""}
                  onChange={handleChange}
                  placeholder="ชื่อ-นามสกุลมารดา"
                />
              </Field>

              <Field label="ชื่อตัว ชื่อสกุล ภรรยา/สามี">
                <input
                  name="spouse"
                  className={inputClass}
                  value={form.spouse || ""}
                  onChange={handleChange}
                  placeholder="ชื่อ-นามสกุลคู่สมรส"
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard
            number="04"
            title="ข้อมูลใบเสร็จและสถานะ"
            subtitle="รายละเอียดใบเสร็จ ความเร่งด่วน และขั้นตอนดำเนินการ"
            color="bg-gradient-to-br from-emerald-600 to-green-800"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Field label="เล่มที่">
                <input
                  name="receiptBookNo"
                  className={inputClass}
                  value={form.receiptBookNo || ""}
                  onChange={handleChange}
                  placeholder="ระบุเลขเล่ม"
                />
              </Field>

              <Field label="เลขที่">
                <input
                  name="receiptNo"
                  className={inputClass}
                  value={form.receiptNo || ""}
                  onChange={handleChange}
                  placeholder="ระบุเลขที่ใบเสร็จ"
                />
              </Field>

              <Field label="จำนวนเงิน (บาท)">
                <input
                  type="number"
                  name="money"
                  className={inputClass}
                  value={form.money || ""}
                  onChange={handleChange}
                  placeholder="ระบุจำนวนเงิน"
                />
              </Field>

              <Field label="ความเร่งด่วน">
                <select
                  name="priority"
                  className={inputClass}
                  value={form.priority ?? 0}
                  onChange={(e) => {
                    const priority = Number(e.target.value);

                    setForm((prev) => ({
                      ...prev,
                      priority,
                      ...(priority === 2 || priority === 3
                        ? { status: 1 }
                        : {}),
                    }));
                  }}
                >
                  <option value="0">ไม่ด่วน</option>
                  <option value="1">ด่วน</option>
                  <option value="2">คืนปกติ</option>
                  <option value="3">คืนด่วน</option>
                </select>
              </Field>
            </div>

            <div className="mt-6">
              <DateGroup title="วันที่ใบเสร็จ" color="bg-emerald-500">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Field label="วัน">
                    <input
                      list="receipt-day-list"
                      name="receiptDay"
                      className={inputClass}
                      value={form.receiptDay || ""}
                      onChange={handleChange}
                      placeholder="เลือกวัน"
                    />
                    <datalist id="receipt-day-list">
                      {receiptDays.map((d) => (
                        <option key={d} value={d} />
                      ))}
                    </datalist>
                  </Field>

                  <Field label="เดือน">
                    <input
                      list="receipt-month-list"
                      name="receiptMonth"
                      className={inputClass}
                      value={form.receiptMonth || ""}
                      onChange={handleChange}
                      placeholder="เลือกเดือน"
                    />
                    <datalist id="receipt-month-list">
                      {months.map((m) => (
                        <option key={m} value={m} />
                      ))}
                    </datalist>
                  </Field>

                  <Field label="ปี พ.ศ.">
                    <input
                      list="receipt-year-list"
                      name="receiptYear"
                      className={inputClass}
                      value={form.receiptYear || ""}
                      onChange={handleChange}
                      placeholder="กรอกปี พ.ศ."
                    />
                    <datalist id="receipt-year-list">
                      {years.map((y) => (
                        <option key={y} value={y} />
                      ))}
                    </datalist>
                  </Field>
                </div>
              </DateGroup>
            </div>

            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 md:p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <h3 className="text-sm font-bold text-slate-700">
                  สถานะการดำเนินงาน
                </h3>
              </div>

              <Field label="สถานะ">
                <select
                  name="status"
                  className={inputClass}
                  value={form.status ?? 0}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      status: Number(e.target.value),
                    }))
                  }
                >
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </SectionCard>
        </div>

        <div className="sticky bottom-0 z-20 mt-6 border-t border-slate-200 bg-white/95 px-4 py-4 shadow-[0_-5px_20px_rgba(15,23,42,0.06)] backdrop-blur-md sm:rounded-2xl sm:border sm:px-5">
          <div className="mx-auto flex max-w-7xl flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="hidden text-xs text-slate-400 md:block">
              ตรวจสอบข้อมูลให้ครบถ้วนก่อนกดบันทึก
            </p>

            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                ยกเลิก
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-xl bg-gradient-to-r from-[#68172f] to-[#8d2948] px-8 py-3 text-sm font-bold text-white shadow-md shadow-rose-900/15 transition hover:-translate-y-0.5 hover:from-[#541126] hover:to-[#76203a] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
