// src/pages/statusPerson/PersonEditPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { toast } from "../../utils/toast";

const currentYear = new Date().getFullYear();
const currentYearTH = currentYear + 543;
const maxYear = currentYearTH - 18;
const minYear = currentYearTH - 100;

const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);
const months = [
  "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
  "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",
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

const getDaysInMonth = (month: string, year?: string) => {
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
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

function SectionCard({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className={`px-5 py-4 ${color}`}>
        <h2 className="text-base font-bold text-white">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
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

export default function PersonEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<any>({});
  const [original, setOriginal] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const fetchPerson = async () => {
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
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  const maxBirthDay = getDaysInMonth(form.birthMonth, form.birthYear);
  const maxFingerprintDay = getDaysInMonth(
    form.fingerprintMonth,
    form.fingerprintYear,
  );
  const maxReceiptDay = getDaysInMonth(
    form.receiptMonth,
    form.receiptYear,
  );

  const birthDays = Array.from({ length: maxBirthDay }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );
  const fingerprintDays = Array.from(
    { length: maxFingerprintDay },
    (_, i) => String(i + 1).padStart(2, "0"),
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
      setForm((prev: any) => ({ ...prev, birthDay: "" }));
    }
  }, [form.birthMonth, form.birthYear]);

  useEffect(() => {
    if (
      form.fingerprintDay &&
      Number(form.fingerprintDay) > maxFingerprintDay
    ) {
      setForm((prev: any) => ({ ...prev, fingerprintDay: "" }));
    }
  }, [form.fingerprintMonth, form.fingerprintYear]);

  useEffect(() => {
    if (form.receiptDay && Number(form.receiptDay) > maxReceiptDay) {
      setForm((prev: any) => ({ ...prev, receiptDay: "" }));
    }
  }, [form.receiptMonth, form.receiptYear]);

  useEffect(() => {
    if (!form.receiptYear) {
      setForm((prev: any) => ({
        ...prev,
        receiptYear: String(currentYearTH),
      }));
    }
  }, [form.receiptYear]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm((prev: any) => ({
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
      confirmButtonColor: "#2563eb",
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
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
          <span className="text-sm font-medium text-slate-600">
            กำลังโหลด...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">PERSON MANAGEMENT</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-800 md:text-3xl">
              แก้ไขข้อมูลบุคคล
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              แก้ไขและปรับปรุงข้อมูลบุคคลในระบบ
            </p>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-100"
          >
            ← กลับ
          </button>
        </div>

        <div className="space-y-5">
          <SectionCard title="ข้อมูลพื้นฐาน" color="bg-blue-600">
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
                />
              </Field>

              <Field label="นามสกุล">
                <input
                  name="lastName"
                  className={inputClass}
                  value={form.lastName || ""}
                  onChange={handleChange}
                />
              </Field>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <p className="mb-4 text-sm font-bold text-slate-700">
                วันเดือนปีเกิด
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Field label="วัน">
                  <input
                    list="birth-day-list"
                    name="birthDay"
                    className={inputClass}
                    value={form.birthDay || ""}
                    onChange={handleChange}
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
                  />
                  <datalist id="birth-month-list">
                    {months.map((m) => (
                      <option key={m} value={m} />
                    ))}
                  </datalist>
                </Field>

                <Field label="ปี">
                  <input
                    list="birth-year-list"
                    name="birthYear"
                    className={inputClass}
                    value={form.birthYear || ""}
                    onChange={handleChange}
                  />
                  <datalist id="birth-year-list">
                    {years.map((y) => (
                      <option key={y} value={y} />
                    ))}
                  </datalist>
                </Field>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <p className="mb-4 text-sm font-bold text-slate-700">
                วันพิมพ์ลายนิ้วมือ
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Field label="วัน">
                  <input
                    list="fp-day-list"
                    name="fingerprintDay"
                    className={inputClass}
                    value={form.fingerprintDay || ""}
                    onChange={handleChange}
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
                  />
                  <datalist id="fp-month-list">
                    {months.map((m) => (
                      <option key={m} value={m} />
                    ))}
                  </datalist>
                </Field>

                <Field label="ปี">
                  <input
                    list="fp-year-list"
                    name="fingerprintYear"
                    className={inputClass}
                    value={form.fingerprintYear || ""}
                    onChange={handleChange}
                  />
                  <datalist id="fp-year-list">
                    {years.map((y) => (
                      <option key={y} value={y} />
                    ))}
                  </datalist>
                </Field>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="ขอตรวจสอบประวัติบุคคลเพื่อ" color="bg-slate-700">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="ตรวจสอบประวัติเพื่อ">
                <input
                  name="purpose"
                  className={inputClass}
                  value={form.purpose || ""}
                  onChange={handleChange}
                />
              </Field>

              <Field label="ของส่วนราชการ/หน่วยงาน">
                <input
                  name="requestingAgency"
                  className={inputClass}
                  value={form.requestingAgency || ""}
                  onChange={handleChange}
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="ข้อมูลเพิ่มเติม" color="bg-cyan-600">
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
                />
              </Field>

              <Field label="สัญชาติ">
                <input
                  list="nationality-list"
                  name="nationality"
                  className={inputClass}
                  value={form.nationality || ""}
                  onChange={handleChange}
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
                />
                <datalist id="ethnicity-list">
                  {ethnicities.map((e) => (
                    <option key={e} value={e} />
                  ))}
                </datalist>
              </Field>

              <Field label="ส่วนสูง">
                <input
                  type="number"
                  list="height-list"
                  name="height"
                  className={inputClass}
                  value={form.height || ""}
                  onChange={handleChange}
                />
                <datalist id="height-list">
                  {filteredHeights.map((h) => (
                    <option key={h} value={h} />
                  ))}
                </datalist>
              </Field>

              <Field label="น้ำหนัก">
                <input
                  type="number"
                  list="weight-list"
                  name="weight"
                  className={inputClass}
                  value={form.weight || ""}
                  onChange={handleChange}
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
                />
              </Field>

              <Field label="ลักษณะนิสัยและนิสัยอันเป็นที่น่าสังเกต">
                <input
                  name="behavior"
                  className={inputClass}
                  value={form.behavior || ""}
                  onChange={handleChange}
                />
              </Field>

              <Field label="ที่อยู่ปัจจุบัน">
                <input
                  name="address"
                  className={inputClass}
                  value={form.address || ""}
                  onChange={handleChange}
                />
              </Field>

              <Field label="อาชีพ">
                <input
                  name="occupation"
                  className={inputClass}
                  value={form.occupation || ""}
                  onChange={handleChange}
                />
              </Field>

              <Field label="สถานที่ทำงาน">
                <input
                  name="workplaceAddress"
                  className={inputClass}
                  value={form.workplaceAddress || ""}
                  onChange={handleChange}
                />
              </Field>

              <Field label="ชื่อตัว ชื่อสกุล บิดา">
                <input
                  name="father"
                  className={inputClass}
                  value={form.father || ""}
                  onChange={handleChange}
                />
              </Field>

              <Field label="ชื่อตัว ชื่อสกุล มารดา">
                <input
                  name="mother"
                  className={inputClass}
                  value={form.mother || ""}
                  onChange={handleChange}
                />
              </Field>

              <Field label="ชื่อตัว ชื่อสกุล ภรรยา/สามี">
                <input
                  name="spouse"
                  className={inputClass}
                  value={form.spouse || ""}
                  onChange={handleChange}
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="ข้อมูลใบเสร็จ" color="bg-emerald-600">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Field label="เล่มที่">
                <input
                  name="receiptBookNo"
                  className={inputClass}
                  value={form.receiptBookNo || ""}
                  onChange={handleChange}
                />
              </Field>

              <Field label="เลขที่">
                <input
                  name="receiptNo"
                  className={inputClass}
                  value={form.receiptNo || ""}
                  onChange={handleChange}
                />
              </Field>

              <Field label="จำนวนเงิน">
                <input
                  type="number"
                  name="money"
                  className={inputClass}
                  value={form.money || ""}
                  onChange={handleChange}
                />
              </Field>

              <Field label="ความเร่งด่วน">
                <select
                  name="priority"
                  className={inputClass}
                  value={form.priority ?? 0}
                  onChange={(e) => {
                    const priority = Number(e.target.value);

                    setForm((prev: any) => ({
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

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <p className="mb-4 text-sm font-bold text-slate-700">
                วันที่ใบเสร็จ
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Field label="วัน">
                  <input
                    list="receipt-day-list"
                    name="receiptDay"
                    className={inputClass}
                    value={form.receiptDay || ""}
                    onChange={handleChange}
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
                  />
                  <datalist id="receipt-month-list">
                    {months.map((m) => (
                      <option key={m} value={m} />
                    ))}
                  </datalist>
                </Field>

                <Field label="ปี">
                  <input
                    list="receipt-year-list"
                    name="receiptYear"
                    className={inputClass}
                    value={form.receiptYear || ""}
                    onChange={handleChange}
                  />
                  <datalist id="receipt-year-list">
                    {years.map((y) => (
                      <option key={y} value={y} />
                    ))}
                  </datalist>
                </Field>
              </div>
            </div>

            <div className="mt-5">
              <Field label="สถานะ">
                <select
                  name="status"
                  className={inputClass}
                  value={form.status ?? 0}
                  onChange={(e) =>
                    setForm((prev: any) => ({
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

        <div className="sticky bottom-0 z-10 mt-6 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              ยกเลิก
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}