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
  id: string;
  sequenceNo: number | null;
  year: number | null;
  foreignerIdNo: string | null;
  prefix: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  age: number | null;
  nationality: string | null;
  ethnicity: string | null;
  certificateRegistrationNo: string | null;
  certificateDate: string | null;
  district: string | null;
  province: string | null;
  policeStation: string | null;
  policeProvince: string | null;
  houseNo: string | null;
  moo: string | null;
  road: string | null;
  subdistrict: string | null;
  domicileDistrict: string | null;
  domicileProvince: string | null;
  domicile: string | null;
  applicationType: string | null;
  applicationDate: string | null;
  expirationDate: string | null;
  previousExpirationDate: string | null;
  amount: number | null;
  amountText: string | null;
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

const CHONBURI_DISTRICTS = [
  "เมืองชลบุรี",
  "บ้านบึง",
  "หนองใหญ่",
  "บางละมุง",
  "พานทอง",
  "พนัสนิคม",
  "ศรีราชา",
  "เกาะจันทร์",
  "สัตหีบ",
  "บ่อทอง",
  "เกาะสีชัง",
];

// แปลงวันที่จาก Backend
function stringToDateParts(value: string | null | undefined): DateParts {
  if (!value) {
    return { day: "", month: "", year: "" };
  }

  const text = String(value).replace(/\s+/g, " ").trim();

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

  return { day: "", month: "", year: "" };
}

// แปลงวันที่เป็น String
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

// แปลงวันที่เป็น ISO สำหรับ petitionDate
function datePartsToISO(value: DateParts): string | null {
  if (!value.day && !value.month && !value.year) {
    return null;
  }

  if (!value.day || !value.month || !value.year) {
    throw new Error("กรุณากรอก วัน เดือน และปี ให้ครบถ้วน");
  }

  const day = Number(value.day);
  const month = Number(value.month);
  const buddhistYear = Number(value.year);
  const ceYear = buddhistYear - 543;

  if (
    !Number.isInteger(day) ||
    day < 1 ||
    day > new Date(ceYear, month, 0).getDate()
  ) {
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

  return `${ceYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// ช่องกรอกวันที่
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
        <select
          required={required}
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

        <select
          required={required}
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

        <input
          required={required}
          type="number"
          inputMode="numeric"
          min="2400"
          max="2700"
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

// กล่อง Section
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

export default function EditForeigner() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sequenceNo, setSequenceNo] = useState<number | null>(null);

  const [form, setForm] = useState<FormData>({
    year: String(new Date().getFullYear() + 543),
    foreignerIdNo: "",
    prefix: "",
    firstName: "",
    lastName: "",
    age: "",
    nationality: "",
    ethnicity: "",
    certificateRegistrationNo: "",
    district: "",
    province: "ชลบุรี",
    policeStation: "",
    policeProvince: "ชลบุรี",
    houseNo: "",
    moo: "",
    road: "",
    subdistrict: "",
    domicileDistrict: "",
    domicileProvince: "ชลบุรี",
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

  const [previousExpirationDate, setPreviousExpirationDate] =
    useState<DateParts>({
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

      setSequenceNo(data.sequenceNo);

      setForm({
        year:
          data.year !== null && data.year !== undefined
            ? String(data.year)
            : String(new Date().getFullYear() + 543),
        foreignerIdNo: data.foreignerIdNo || "",
        prefix: data.prefix || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        age:
          data.age !== null && data.age !== undefined ? String(data.age) : "",
        nationality: data.nationality || "",
        ethnicity: data.ethnicity || "",
        certificateRegistrationNo: data.certificateRegistrationNo || "",
        district: data.district || "",
        province: data.province || "ชลบุรี",
        policeStation: data.policeStation || "",
        policeProvince: data.policeProvince || "ชลบุรี",
        houseNo: data.houseNo || "",
        moo: data.moo || "",
        road: data.road || "",
        subdistrict: data.subdistrict || "",
        domicileDistrict: data.domicileDistrict || "",
        domicileProvince: data.domicileProvince || "ชลบุรี",
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
      setPreviousExpirationDate(stringToDateParts(data.previousExpirationDate));
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

  const change = (key: keyof FormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.prefix.trim()) {
      throw new Error("กรุณากรอกคำนำหน้า");
    }

    if (!form.firstName.trim()) {
      throw new Error("กรุณากรอกชื่อ");
    }

    if (!form.lastName.trim()) {
      throw new Error("กรุณากรอกนามสกุล");
    }

    if (!form.age.trim()) {
      throw new Error("กรุณากรอกอายุ");
    }

    if (!Number.isInteger(Number(form.age)) || Number(form.age) < 0) {
      throw new Error("อายุไม่ถูกต้อง");
    }

    if (!form.nationality.trim()) {
      throw new Error("กรุณากรอกสัญชาติ");
    }

    if (!form.ethnicity.trim()) {
      throw new Error("กรุณากรอกเชื้อชาติ");
    }

    if (!form.certificateRegistrationNo.trim()) {
      throw new Error("กรุณากรอกเลขทะเบียนของใบสำคัญ");
    }

    if (!form.district.trim()) {
      throw new Error("กรุณากรอกออกให้ ณ อำเภอ");
    }

    if (!form.province.trim()) {
      throw new Error("กรุณากรอกออกให้ ณ จังหวัด");
    }

    if (!form.policeStation.trim()) {
      throw new Error("กรุณากรอกสถานีตำรวจ");
    }

    if (!form.policeProvince.trim()) {
      throw new Error("กรุณากรอกจังหวัดของสถานีตำรวจ");
    }

    if (!form.houseNo.trim()) {
      throw new Error("กรุณากรอกบ้านเลขที่");
    }

    if (!form.subdistrict.trim()) {
      throw new Error("กรุณากรอกตำบล");
    }

    if (!form.domicileDistrict.trim()) {
      throw new Error("กรุณากรอกอำเภอของภูมิลำเนา");
    }

    if (!form.domicileProvince.trim()) {
      throw new Error("กรุณากรอกจังหวัดของภูมิลำเนา");
    }

    if (!form.applicationType.trim()) {
      throw new Error("กรุณากรอกชนิดการขอรับ");
    }

    if (!form.amount.trim()) {
      throw new Error("กรุณากรอกจำนวนเงิน");
    }

    if (!Number.isInteger(Number(form.amount)) || Number(form.amount) < 0) {
      throw new Error("จำนวนเงินต้องเป็นจำนวนเต็ม");
    }

    if (!form.receiptBookNo.trim()) {
      throw new Error("กรุณากรอกใบเสร็จเล่มที่");
    }

    if (!form.receiptNo.trim()) {
      throw new Error("กรุณากรอกใบเสร็จเลขที่");
    }

    datePartsToString(certificateDate);
    datePartsToString(applicationDate);
    datePartsToString(receiptDate);

    if (
      previousExpirationDate.day ||
      previousExpirationDate.month ||
      previousExpirationDate.year
    ) {
      datePartsToString(previousExpirationDate);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || saving) return;

    try {
      validate();

      setSaving(true);

      const certificateDateValue = datePartsToString(certificateDate);

      const applicationDateValue = datePartsToString(applicationDate);

      const expirationDateValue = datePartsToString(expirationDate);

      const previousExpirationDateValue = datePartsToString(
        previousExpirationDate,
      );

      const receiptDateValue = datePartsToString(receiptDate);

      const petitionDateValue = datePartsToISO(petitionDate);

      const domicileParts = [
        form.houseNo.trim(),
        form.moo.trim() ? `หมู่ ${form.moo.trim()}` : "",
        form.road.trim(),
        form.subdistrict.trim() ? `ตำบล${form.subdistrict.trim()}` : "",
        form.domicileDistrict.trim()
          ? `อำเภอ${form.domicileDistrict.trim()}`
          : "",
        form.domicileProvince.trim(),
      ].filter(Boolean);

      const payload = {
        year: Number(form.year),
        foreignerIdNo: form.foreignerIdNo.trim() || null,
        prefix: form.prefix.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        fullName: [
          form.prefix.trim(),
          form.firstName.trim(),
          form.lastName.trim(),
        ]
          .filter(Boolean)
          .join(" "),
        age: Number(form.age),
        nationality: form.nationality.trim(),
        ethnicity: form.ethnicity.trim(),
        certificateRegistrationNo: form.certificateRegistrationNo.trim(),
        certificateDate: certificateDateValue || null,
        district: form.district.trim(),
        province: form.province.trim(),
        policeStation: form.policeStation.trim(),
        policeProvince: form.policeProvince.trim(),
        houseNo: form.houseNo.trim(),
        moo: form.moo.trim() || null,
        road: form.road.trim() || null,
        subdistrict: form.subdistrict.trim(),
        domicileDistrict: form.domicileDistrict.trim(),
        domicileProvince: form.domicileProvince.trim(),
        domicile: domicileParts.join(" "),
        applicationType: form.applicationType.trim(),
        applicationDate: applicationDateValue || null,
        expirationDate: expirationDateValue || null,
        previousExpirationDate: previousExpirationDateValue || null,
        amount: Number(form.amount),
        amountText: null,
        receiptBookNo: form.receiptBookNo.trim(),
        receiptNo: form.receiptNo.trim(),
        receiptDate: receiptDateValue || null,
        certificateNo: form.certificateNo.trim() || null,
        petitionDate: petitionDateValue,
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl bg-white px-6 py-5 shadow-sm">
          <div className="text-sm text-slate-500">กำลังโหลดข้อมูล...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6">
      <div className="mx-auto max-w-6xl">
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
                  คำนำหน้า
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={form.prefix}
                  onChange={(e) => change("prefix", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ชื่อ
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) => change("firstName", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  นามสกุล
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={(e) => change("lastName", e.target.value)}
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
                  required
                  min="0"
                  step="1"
                  value={form.age}
                  onChange={(e) => change("age", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  สัญชาติ
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={form.nationality}
                  onChange={(e) => change("nationality", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  เชื้อชาติ
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={form.ethnicity}
                  onChange={(e) => change("ethnicity", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </Section>

          <Section title="ใบสำคัญ">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  เลขทะเบียนของใบสำคัญ
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
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

          <Section title="ออกให้ ณ">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ออกให้ ณ อำเภอ
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  list="district-options"
                  type="text"
                  required
                  value={form.district}
                  onChange={(e) => change("district", e.target.value)}
                  placeholder="เลือกหรือกรอกอำเภอ"
                  className={inputClass}
                />

                <datalist id="district-options">
                  {CHONBURI_DISTRICTS.map((district) => (
                    <option key={district} value={district} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ออกให้ ณ จังหวัด
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={form.province}
                  onChange={(e) => change("province", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </Section>

          <Section title="สถานีตำรวจ">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  สถานีตำรวจ
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={form.policeStation}
                  onChange={(e) => change("policeStation", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  จังหวัดของสถานีตำรวจ
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={form.policeProvince}
                  onChange={(e) => change("policeProvince", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </Section>

          <Section title="ภูมิลำเนา">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  บ้านเลขที่
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={form.houseNo}
                  onChange={(e) => change("houseNo", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  หมู่
                </label>

                <input
                  type="text"
                  value={form.moo}
                  onChange={(e) => change("moo", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ถนน
                </label>

                <input
                  type="text"
                  value={form.road}
                  onChange={(e) => change("road", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ตำบล
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={form.subdistrict}
                  onChange={(e) => change("subdistrict", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  อำเภอ
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  list="domicile-district-options"
                  type="text"
                  required
                  value={form.domicileDistrict}
                  onChange={(e) => change("domicileDistrict", e.target.value)}
                  placeholder="เลือกหรือกรอกอำเภอ"
                  className={inputClass}
                />

                <datalist id="domicile-district-options">
                  {CHONBURI_DISTRICTS.map((district) => (
                    <option key={district} value={district} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  จังหวัดของภูมิลำเนา
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={form.domicileProvince}
                  onChange={(e) => change("domicileProvince", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </Section>

          <Section title="การขอรับ / ขอรับใบแทน / ขอต่ออายุ">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ชนิดการขอรับ
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  list="application-type-options"
                  type="text"
                  required
                  value={form.applicationType}
                  onChange={(e) => change("applicationType", e.target.value)}
                  placeholder="เลือกหรือกรอกชนิด"
                  className={inputClass}
                />

                <datalist id="application-type-options">
                  <option value="ชนิดที่ 1" />
                  <option value="ชนิดที่ 2" />
                </datalist>
              </div>

              <DateInput
                label="วัน เดือน ปี ที่ขอรับ / ขอรับใบแทน / ขอต่ออายุ"
                required
                value={applicationDate}
                onChange={setApplicationDate}
              />

              <DateInput
                label="วันหมดอายุก่อนต่ออายุ"
                value={previousExpirationDate}
                onChange={setPreviousExpirationDate}
              />

              <DateInput
                label="วันหมดอายุ"
                value={expirationDate}
                onChange={setExpirationDate}
              />
            </div>
          </Section>

          <Section title="ค่าธรรมเนียมและใบเสร็จรับเงิน">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  จำนวนเงิน
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="number"
                  required
                  min="0"
                  step="1"
                  value={form.amount}
                  onChange={(e) => change("amount", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ใบเสร็จเล่มที่
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={form.receiptBookNo}
                  onChange={(e) => change("receiptBookNo", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ใบเสร็จเลขที่
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={form.receiptNo}
                  onChange={(e) => change("receiptNo", e.target.value)}
                  className={inputClass}
                />
              </div>

              <DateInput
                label="วัน เดือน ปี ของใบเสร็จ"
                required
                value={receiptDate}
                onChange={setReceiptDate}
              />
            </div>
          </Section>

          <Section title="ข้อมูลอื่น ๆ">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ใบสำคัญ
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
