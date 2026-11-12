import { useCallback, useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import Swal from "sweetalert2";

import api from "../../api/axios";

interface FormData {
  year: string;

  foreignerIdNo: string;

  prefix: string;

  firstName: string;

  lastName: string;

  age: string;

  nationality: string;

  ethnicity: string;

  certificateRegistrationNo: string;

  district: string;

  province: string;

  policeStation: string;

  policeProvince: string;

  houseNo: string;

  moo: string;

  road: string;

  subdistrict: string;

  domicileDistrict: string;

  domicileProvince: string;

  applicationType: string;

  amount: string;

  receiptBookNo: string;

  receiptNo: string;

  certificateNo: string;
}

interface ForeignerData {
  id: string | number;

  sequenceNo?: number | string;

  year?: number | string;

  foreignerIdNo?: string | null;

  prefix?: string | null;

  firstName?: string | null;

  lastName?: string | null;

  fullName?: string | null;

  age?: number | string | null;

  nationality?: string | null;

  ethnicity?: string | null;

  certificateRegistrationNo?: string | null;

  certificateDate?: string | null;

  district?: string | null;

  province?: string | null;

  policeStation?: string | null;

  policeProvince?: string | null;

  houseNo?: string | null;

  moo?: string | null;

  road?: string | null;

  subdistrict?: string | null;

  domicileDistrict?: string | null;

  domicileProvince?: string | null;

  domicile?: string | null;

  applicationType?: string | null;

  applicationDate?: string | null;

  expirationDate?: string | null;

  previousExpirationDate?: string | null;

  amount?: number | string | null;

  amountText?: string | null;

  receiptBookNo?: string | null;

  receiptNo?: string | null;

  receiptDate?: string | null;

  certificateNo?: string | null;

  petitionDate?: string | null;
}

interface ApiResponse<T> {
  data?: T;

  message?: string;

  error?: string;
}

const EMPTY_FORM: FormData = {
  year: "",

  foreignerIdNo: "",

  prefix: "",

  firstName: "",

  lastName: "",

  age: "",

  nationality: "",

  ethnicity: "",

  certificateRegistrationNo: "",

  district: "",

  province: "",

  policeStation: "",

  policeProvince: "",

  houseNo: "",

  moo: "",

  road: "",

  subdistrict: "",

  domicileDistrict: "",

  domicileProvince: "",

  applicationType: "",

  amount: "",

  receiptBookNo: "",

  receiptNo: "",

  certificateNo: "",
};

type DateField =
  | "certificateDate"
  | "applicationDate"
  | "expirationDate"
  | "previousExpirationDate"
  | "receiptDate"
  | "petitionDate";

type DateState = Record<DateField, string>;

const EMPTY_DATES: DateState = {
  certificateDate: "",

  applicationDate: "",

  expirationDate: "",

  previousExpirationDate: "",

  receiptDate: "",

  petitionDate: "",
};

const MONTHS_TH = [
  "ม.ค.",

  "ก.พ.",

  "มี.ค.",

  "เม.ย.",

  "พ.ค.",

  "มิ.ย.",

  "ก.ค.",

  "ส.ค.",

  "ก.ย.",

  "ต.ค.",

  "พ.ย.",

  "ธ.ค.",
];

const THAI_MONTHS = [
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

/**

 * แปลงวันที่ที่ได้รับจาก API เป็น YYYY-MM-DD

 * รองรับวันที่ ISO และวันที่ภาษาไทยรูปแบบ d MMM. YYYY

 */

function toDateInputValue(value?: string | null): string {
  if (!value) return "";

  const input = value.trim();

  if (/^\d{4}-\d{2}-\d{2}/.test(input)) {
    return input.slice(0, 10);
  }

  const thaiMatch = input.match(/^(\d{1,2})\s+([ก-๙.]+)\s+(\d{4})$/);

  if (thaiMatch) {
    const day = Number(thaiMatch[1]);

    const monthText = thaiMatch[2].replace(/\./g, "");

    let year = Number(thaiMatch[3]);

    const monthIndex = MONTHS_TH.findIndex(
      (month) => month.replace(/\./g, "") === monthText,
    );

    if (monthIndex !== -1) {
      if (year > 2400) year -= 543;

      return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(
        day,
      ).padStart(2, "0")}`;
    }
  }

  // รองรับวันที่ที่ JavaScript สามารถอ่านได้

  const parsed = new Date(input);

  if (!Number.isNaN(parsed.getTime())) {
    const year = parsed.getFullYear();

    const month = String(parsed.getMonth() + 1).padStart(2, "0");

    const day = String(parsed.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return "";
}

function formatThaiDate(value: string): string {
  if (!value) return "";

  const [year, month, day] = value.split("-").map(Number);

  if (
    !year ||
    !month ||
    !day ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return "";
  }

  return `${day} ${THAI_MONTHS[month - 1]} ${year + 543}`;
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
    return (
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ";
}

function InputField({
  label,

  value,

  onChange,

  required = false,

  placeholder,

  type = "text",

  min,

  step,
}: {
  label: string;

  value: string;

  onChange: (value: string) => void;

  required?: boolean;

  placeholder?: string;

  type?: string;

  min?: string;

  step?: string;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}

        {required && <span className="ml-1 text-rose-500">*</span>}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder ?? `กรอก${label}`}
        min={min}
        step={step}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-indigo-300 hover:bg-white focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
      />
    </label>
  );
}

function SelectField({
  label,

  value,

  onChange,

  options,

  required = false,
}: {
  label: string;

  value: string;

  onChange: (value: string) => void;

  options: string[];

  required?: boolean;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}

        {required && <span className="ml-1 text-rose-500">*</span>}
      </span>

      <select
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 hover:border-indigo-300 hover:bg-white focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
      >
        <option value="">-- เลือก{label} --</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function DateFieldInput({
  label,

  value,

  onChange,
}: {
  label: string;

  value: string;

  onChange: (value: string) => void;
}) {
  const dateRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    const input = dateRef.current;

    if (!input) return;

    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.focus();

      input.click();
    }
  };

  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <div className="relative">
        <button
          type="button"
          onClick={openDatePicker}
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-left text-sm text-slate-800 shadow-sm transition-all duration-200 hover:border-indigo-300 hover:bg-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
        >
          <span
            className={value ? "font-medium text-slate-800" : "text-slate-400"}
          >
            {value ? formatThaiDate(value) : "เลือกวันที่"}
          </span>

          <span
            className="ml-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600"
            aria-hidden="true"
          >
            ▦
          </span>
        </button>

        <input
          ref={dateRef}
          type="date"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={label}
          className="pointer-events-none absolute left-1/2 top-1/2 h-px w-px opacity-0"
          tabIndex={-1}
        />
      </div>
    </label>
  );
}

function Section({
  title,

  description,

  children,
}: {
  title: string;

  description?: string;

  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50/80 via-white to-cyan-50/50 px-5 py-5 sm:px-7">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-8 w-1 shrink-0 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-400" />

          <div>
            <h2 className="text-base font-bold text-slate-800 sm:text-lg">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7">{children}</div>
    </section>
  );
}

export default function EditForeigner() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>(EMPTY_FORM);

  const [dates, setDates] = useState<DateState>(EMPTY_DATES);

  const [sequenceNo, setSequenceNo] = useState<string>("");

  const [domicile, setDomicile] = useState<string>("");

  const [amountText, setAmountText] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);

  const [saving, setSaving] = useState<boolean>(false);

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setForm((previous) => ({
      ...previous,

      [field]: value,
    }));
  }, []);

  const updateDate = useCallback((field: DateField, value: string) => {
    setDates((previous) => ({
      ...previous,

      [field]: value,
    }));
  }, []);

  const loadData = useCallback(async () => {
    if (!id) {
      navigate("/foreigner", { replace: true });

      return;
    }

    setLoading(true);

    try {
      const response = await api.get<ApiResponse<ForeignerData>>(
        `/foreigner/${id}`,
      );

      // รองรับทั้ง response รูปแบบ { data: {...} }

      // และ response ที่ส่งข้อมูลรายการมาโดยตรง

      const result = response.data?.data ?? response.data;

      if (!result || typeof result !== "object" || !("id" in result)) {
        throw new Error("ไม่พบข้อมูลบุคคลต่างด้าว");
      }

      const person = result as ForeignerData;

      setSequenceNo(
        person.sequenceNo !== undefined && person.sequenceNo !== null
          ? String(person.sequenceNo)
          : "",
      );

      setForm({
        year: String(person.year ?? ""),

        foreignerIdNo: person.foreignerIdNo ?? "",

        prefix: person.prefix ?? "",

        firstName: person.firstName ?? "",

        lastName: person.lastName ?? "",

        age: person.age != null ? String(person.age) : "",

        nationality: person.nationality ?? "",

        ethnicity: person.ethnicity ?? "",

        certificateRegistrationNo: person.certificateRegistrationNo ?? "",

        district: person.district ?? "",

        province: person.province ?? "",

        policeStation: person.policeStation ?? "",

        policeProvince: person.policeProvince ?? "",

        houseNo: person.houseNo ?? "",

        moo: person.moo ?? "",

        road: person.road ?? "",

        subdistrict: person.subdistrict ?? "",

        domicileDistrict: person.domicileDistrict ?? "",

        domicileProvince: person.domicileProvince ?? "",

        applicationType: person.applicationType ?? "",

        amount: person.amount != null ? String(person.amount) : "",

        receiptBookNo: person.receiptBookNo ?? "",

        receiptNo: person.receiptNo ?? "",

        certificateNo: person.certificateNo ?? "",
      });

      setDates({
        certificateDate: toDateInputValue(person.certificateDate),

        applicationDate: toDateInputValue(person.applicationDate),

        expirationDate: toDateInputValue(person.expirationDate),

        previousExpirationDate: toDateInputValue(person.previousExpirationDate),

        receiptDate: toDateInputValue(person.receiptDate),

        petitionDate: toDateInputValue(person.petitionDate),
      });

      setDomicile(person.domicile ?? "");

      setAmountText(person.amountText ?? "");
    } catch (error: unknown) {
      console.error("Load foreigner error:", error);

      await Swal.fire({
        icon: "error",

        title: "โหลดข้อมูลไม่สำเร็จ",

        text: getErrorMessage(error),

        confirmButtonText: "ตกลง",
      });

      navigate("/foreigner");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!id) {
      navigate("/foreigner", { replace: true });

      return;
    }

    void loadData();
  }, [id, navigate, loadData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      await Swal.fire({
        icon: "error",

        title: "ไม่พบรหัสรายการ",

        text: "กรุณากลับไปเลือกข้อมูลที่ต้องการแก้ไขใหม่",
      });

      return;
    }

    if (!form.firstName.trim() || !form.lastName.trim()) {
      await Swal.fire({
        icon: "warning",

        title: "กรอกข้อมูลไม่ครบ",

        text: "กรุณากรอกชื่อและนามสกุล",
      });

      return;
    }

    if (
      form.amount.trim() !== "" &&
      (!Number.isFinite(Number(form.amount)) || Number(form.amount) < 0)
    ) {
      await Swal.fire({
        icon: "warning",

        title: "จำนวนเงินไม่ถูกต้อง",

        text: "กรุณากรอกจำนวนเงินเป็นตัวเลขตั้งแต่ 0 ขึ้นไป",
      });

      return;
    }

    if (
      form.age.trim() !== "" &&
      (!Number.isFinite(Number(form.age)) || Number(form.age) < 0)
    ) {
      await Swal.fire({
        icon: "warning",

        title: "อายุไม่ถูกต้อง",

        text: "กรุณากรอกอายุเป็นตัวเลขตั้งแต่ 0 ขึ้นไป",
      });

      return;
    }

    setSaving(true);

    try {
      const fullName = [
        form.prefix.trim(),

        form.firstName.trim(),

        form.lastName.trim(),
      ]

        .filter(Boolean)

        .join(" ");

      const payload = {
        year: form.year.trim(),

        foreignerIdNo: form.foreignerIdNo.trim(),

        prefix: form.prefix.trim(),

        firstName: form.firstName.trim(),

        lastName: form.lastName.trim(),

        fullName,

        age: form.age.trim() === "" ? null : Number(form.age),

        nationality: form.nationality.trim(),

        ethnicity: form.ethnicity.trim(),

        certificateRegistrationNo: form.certificateRegistrationNo.trim(),

        certificateDate: dates.certificateDate || null,

        district: form.district.trim(),

        province: form.province.trim(),

        policeStation: form.policeStation.trim(),

        policeProvince: form.policeProvince.trim(),

        houseNo: form.houseNo.trim(),

        moo: form.moo.trim(),

        road: form.road.trim(),

        subdistrict: form.subdistrict.trim(),

        domicileDistrict: form.domicileDistrict.trim(),

        domicileProvince: form.domicileProvince.trim(),

        domicile: domicile.trim(),

        applicationType: form.applicationType.trim(),

        applicationDate: dates.applicationDate || null,

        expirationDate: dates.expirationDate || null,

        previousExpirationDate: dates.previousExpirationDate || null,

        amount: form.amount.trim() === "" ? null : Number(form.amount),

        amountText: amountText.trim(),

        receiptBookNo: form.receiptBookNo.trim(),

        receiptNo: form.receiptNo.trim(),

        receiptDate: dates.receiptDate || null,

        certificateNo: form.certificateNo.trim(),

        petitionDate: dates.petitionDate || null,
      };

      await api.put(`/foreigner/${id}`, payload);

      await Swal.fire({
        icon: "success",

        title: "บันทึกสำเร็จ",

        text: "แก้ไขข้อมูลบุคคลต่างด้าวเรียบร้อยแล้ว",

        confirmButtonText: "ดูรายละเอียด",
      });

      navigate(`/foreigner/${id}`);
    } catch (error: unknown) {
      console.error("Update foreigner error:", error);

      await Swal.fire({
        icon: "error",

        title: "บันทึกไม่สำเร็จ",

        text: getErrorMessage(error),

        confirmButtonText: "ตกลง",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center">
        <div className="rounded-2xl border border-slate-100 bg-white px-10 py-9 text-center shadow-sm">
          <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

          <p className="mt-4 text-sm font-medium text-slate-600">
            กำลังโหลดข้อมูล...
          </p>

          <p className="mt-1 text-xs text-slate-400">กรุณารอสักครู่</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-cyan-600 px-5 py-6 text-white shadow-lg shadow-indigo-900/10 sm:px-7 sm:py-8">
          <button
            type="button"
            onClick={() => navigate(`/foreigner/${id}`)}
            className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/20 hover:text-white"
          >
            <span aria-hidden="true">←</span>
            กลับไปหน้ารายละเอียด
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 text-xs font-semibold tracking-widest text-indigo-100">
                FOREIGNER REGISTRATION
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                แก้ไขข้อมูลบุคคลต่างด้าว
              </h1>

              <p className="mt-2 text-sm text-indigo-100">
                ตรวจสอบและปรับปรุงข้อมูลทะเบียนให้ถูกต้องก่อนบันทึก
              </p>
            </div>

            {sequenceNo && (
              <div className="w-fit rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <div className="text-xs text-indigo-100">เลขลำดับทะเบียน</div>

                <div className="mt-1 text-xl font-bold">{sequenceNo}</div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Section
            title="ข้อมูลส่วนบุคคล"
            description="ข้อมูลระบุตัวบุคคลและข้อมูลสัญชาติ"
          >
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <InputField
                label="ปี"
                value={form.year}
                onChange={(value) => updateField("year", value)}
                placeholder="เช่น 2569"
              />

              <InputField
                label="เลขประจำตัวคนต่างด้าว"
                value={form.foreignerIdNo}
                onChange={(value) => updateField("foreignerIdNo", value)}
              />

              <SelectField
                label="คำนำหน้า"
                value={form.prefix}
                onChange={(value) => updateField("prefix", value)}
                options={["นาย", "นาง", "นางสาว", "เด็กชาย", "เด็กหญิง"]}
              />

              <InputField
                label="ชื่อ"
                value={form.firstName}
                onChange={(value) => updateField("firstName", value)}
                required
              />

              <InputField
                label="นามสกุล"
                value={form.lastName}
                onChange={(value) => updateField("lastName", value)}
                required
              />

              <InputField
                label="อายุ"
                value={form.age}
                onChange={(value) => updateField("age", value)}
                type="number"
                min="0"
              />

              <InputField
                label="สัญชาติ"
                value={form.nationality}
                onChange={(value) => updateField("nationality", value)}
              />

              <InputField
                label="เชื้อชาติ"
                value={form.ethnicity}
                onChange={(value) => updateField("ethnicity", value)}
              />
            </div>
          </Section>

          <Section
            title="ข้อมูลหนังสือรับรอง"
            description="รายละเอียดเลขทะเบียนและวันที่ออกหนังสือรับรอง"
          >
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <InputField
                label="เลขทะเบียนหนังสือรับรอง"
                value={form.certificateRegistrationNo}
                onChange={(value) =>
                  updateField("certificateRegistrationNo", value)
                }
              />

              <DateFieldInput
                label="วันที่ออกหนังสือรับรอง"
                value={dates.certificateDate}
                onChange={(value) => updateDate("certificateDate", value)}
              />

              <InputField
                label="เลขที่หนังสือรับรอง"
                value={form.certificateNo}
                onChange={(value) => updateField("certificateNo", value)}
              />
            </div>
          </Section>

          <Section
            title="ข้อมูลหน่วยงานและสถานีตำรวจ"
            description="ข้อมูลอำเภอ จังหวัด และสถานีตำรวจที่เกี่ยวข้อง"
          >
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <InputField
                label="อำเภอ"
                value={form.district}
                onChange={(value) => updateField("district", value)}
              />

              <InputField
                label="จังหวัด"
                value={form.province}
                onChange={(value) => updateField("province", value)}
              />

              <InputField
                label="สถานีตำรวจ"
                value={form.policeStation}
                onChange={(value) => updateField("policeStation", value)}
              />

              <InputField
                label="จังหวัดของสถานีตำรวจ"
                value={form.policeProvince}
                onChange={(value) => updateField("policeProvince", value)}
              />
            </div>
          </Section>

          <Section
            title="ข้อมูลที่อยู่"
            description="ที่อยู่และภูมิลำเนาของบุคคลต่างด้าว"
          >
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <InputField
                label="บ้านเลขที่"
                value={form.houseNo}
                onChange={(value) => updateField("houseNo", value)}
              />

              <InputField
                label="หมู่ที่"
                value={form.moo}
                onChange={(value) => updateField("moo", value)}
              />

              <InputField
                label="ถนน"
                value={form.road}
                onChange={(value) => updateField("road", value)}
              />

              <InputField
                label="ตำบล"
                value={form.subdistrict}
                onChange={(value) => updateField("subdistrict", value)}
              />

              <InputField
                label="อำเภอภูมิลำเนา"
                value={form.domicileDistrict}
                onChange={(value) => updateField("domicileDistrict", value)}
              />

              <InputField
                label="จังหวัดภูมิลำเนา"
                value={form.domicileProvince}
                onChange={(value) => updateField("domicileProvince", value)}
              />
            </div>
          </Section>

          <Section
            title="ข้อมูลคำขอและวันหมดอายุ"
            description="ประเภทคำขอ วันที่ยื่นคำขอ และข้อมูลการต่ออายุ"
          >
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField
                label="ประเภทคำขอ"
                value={form.applicationType}
                onChange={(value) => {
                  updateField("applicationType", value);

                  if (value === "ชนิดที่ 1") {
                    updateField("amount", "200");
                  } else if (value === "ชนิดที่ 2") {
                    updateField("amount", "800");
                  } else {
                    updateField("amount", "");
                  }
                }}
                options={["ชนิดที่ 1", "ชนิดที่ 2"]}
              />

              <DateFieldInput
                label="วันที่ยื่นคำขอ"
                value={dates.applicationDate}
                onChange={(value) => updateDate("applicationDate", value)}
              />

              <DateFieldInput
                label="วันหมดอายุเดิมก่อนต่ออายุ"
                value={dates.previousExpirationDate}
                onChange={(value) =>
                  updateDate("previousExpirationDate", value)
                }
              />

              <DateFieldInput
                label="วันหมดอายุ"
                value={dates.expirationDate}
                onChange={(value) => updateDate("expirationDate", value)}
              />

              <DateFieldInput
                label="วันที่คำร้อง"
                value={dates.petitionDate}
                onChange={(value) => updateDate("petitionDate", value)}
              />
            </div>
          </Section>

          <Section
            title="ข้อมูลค่าธรรมเนียมและใบเสร็จ"
            description="จำนวนเงินและข้อมูลอ้างอิงใบเสร็จ"
          >
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <InputField
                label="จำนวนเงิน"
                value={form.amount}
                onChange={(value) => updateField("amount", value)}
                type="number"
                min="0"
                step="0.01"
              />

              <InputField
                label="เล่มที่ใบเสร็จ"
                value={form.receiptBookNo}
                onChange={(value) => updateField("receiptBookNo", value)}
              />

              <InputField
                label="เลขที่ใบเสร็จ"
                value={form.receiptNo}
                onChange={(value) => updateField("receiptNo", value)}
              />

              <DateFieldInput
                label="วันที่ออกใบเสร็จ"
                value={dates.receiptDate}
                onChange={(value) => updateDate("receiptDate", value)}
              />
            </div>
          </Section>

          <div className="sticky bottom-0 z-10 -mx-3 border-t border-slate-200/80 bg-white/95 px-3 py-4 shadow-[0_-8px_25px_rgba(15,23,42,0.05)] backdrop-blur-md sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none sm:backdrop-blur-none">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate(`/foreigner/${id}`)}
                disabled={saving}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-32"
              >
                ยกเลิก
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:from-indigo-700 hover:to-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-44"
              >
                {saving && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}

                {saving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
