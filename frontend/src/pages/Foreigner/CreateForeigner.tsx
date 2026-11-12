/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";
import {
  ArrowLeft,
  ClipboardList,
  UserRound,
  FileBadge,
  MapPin,
  Building2,
  Home,
  FileText,
  Receipt,
  CalendarDays,
  Save,
  X,
  LoaderCircle,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Info,
} from "lucide-react";
import type { DateParts, ForeignerFormData } from "../../types/foreigner";

const MONTHS = [
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

const CURRENT_BUDDHIST_YEAR = new Date().getFullYear() + 543;

const fieldClass =
  "block w-full min-h-[46px] rounded-xl border border-solid border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-[#801d35] focus:ring-4 focus:ring-[#801d35]/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 read-only:bg-slate-50 read-only:text-slate-600";

const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

const emptyDate = (): DateParts => ({
  day: "",
  month: "",
  year: String(CURRENT_BUDDHIST_YEAR),
});

const datePartsToString = (
  value: DateParts,
  required = false,
): string | null => {
  if (!value.day && !value.month && !value.year) {
    if (required) throw new Error("กรุณากรอกวัน เดือน ปี ให้ครบ");
    return null;
  }

  if (!value.day || !value.month || !value.year) {
    throw new Error("กรุณากรอกวัน เดือน ปี ให้ครบ");
  }

  const day = Number(value.day);
  const year = Number(value.year);
  const monthIndex = MONTHS.indexOf(value.month);

  if (monthIndex < 0) throw new Error("เดือนไม่ถูกต้อง");
  if (!Number.isInteger(day) || day < 1 || day > 31) {
    throw new Error("วันที่ไม่ถูกต้อง");
  }
  if (!Number.isInteger(year) || year < 2400 || year > 2700) {
    throw new Error("ปี พ.ศ. ไม่ถูกต้อง");
  }

  const date = new Date(year - 543, monthIndex, day);

  if (
    date.getFullYear() !== year - 543 ||
    date.getMonth() !== monthIndex ||
    date.getDate() !== day
  ) {
    throw new Error("วัน เดือน ปี ไม่ถูกต้อง");
  }

  return `${day} ${value.month} ${year}`;
};

const datePartsToISO = (value: DateParts): string | null => {
  if (!value.day && !value.month && !value.year) return null;

  if (!value.day || !value.month || !value.year) {
    throw new Error("กรุณากรอกวัน เดือน ปี ให้ครบ");
  }

  const day = Number(value.day);
  const month = MONTHS.indexOf(value.month) + 1;
  const buddhistYear = Number(value.year);
  const year = buddhistYear - 543;

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
  if (!Number.isInteger(day) || day < 1 || day > 31) {
    throw new Error("วันที่ไม่ถูกต้อง");
  }

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error("วัน เดือน ปี ไม่ถูกต้อง");
  }

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

const stringToDateParts = (value: string | null | undefined): DateParts => {
  if (!value) return { day: "", month: "", year: "" };

  const text = String(value).trim();
  const isoMatch = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);

  if (isoMatch) {
    return {
      day: String(Number(isoMatch[3])),
      month: MONTHS[Number(isoMatch[2]) - 1] || "",
      year: String(Number(isoMatch[1]) + 543),
    };
  }

  const thaiMatch = text.match(/^(\d{1,2})\s+(.+?)\s+(\d{4})$/);

  if (thaiMatch) {
    return {
      day: thaiMatch[1],
      month: thaiMatch[2],
      year: thaiMatch[3],
    };
  }

  return { day: "", month: "", year: "" };
};

export default function CreateForeigner() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const copyId = searchParams.get("copyId");

  const [loading, setLoading] = useState(false);
  const [copyLoading, setCopyLoading] = useState(Boolean(copyId));
  const [receiptLoading, setReceiptLoading] = useState(true);
  const [receiptNos, setReceiptNos] = useState<string[]>([]);

  const [form, setForm] = useState<ForeignerFormData>({
    year: String(CURRENT_BUDDHIST_YEAR),
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

  const [certificateDate, setCertificateDate] =
    useState<DateParts>(emptyDate());

  const [previousExpirationDate, setPreviousExpirationDate] =
    useState<DateParts>({ day: "", month: "", year: "" });

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

  const updateField = (field: keyof ForeignerFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const amount =
      form.applicationType === "ชนิดที่ 1"
        ? "200"
        : form.applicationType === "ชนิดที่ 2"
          ? "800"
          : "";

    setForm((prev) => ({ ...prev, amount }));
  }, [form.applicationType]);

  useEffect(() => {
    const loadReceiptOptions = async () => {
      try {
        setReceiptLoading(true);
        const response = await api.get("/foreigner/receipt-options");
        const data = response.data?.data ?? response.data;

        const availableNos = Array.isArray(data?.receiptNos)
          ? data.receiptNos.map((no: string | number) =>
              String(no).padStart(2, "0"),
            )
          : [];

        setReceiptNos(availableNos);
      } catch (error) {
        console.error("LOAD RECEIPT OPTIONS ERROR:", error);
        setReceiptNos([]);

        await Swal.fire({
          icon: "warning",
          title: "โหลดเลขใบเสร็จไม่สำเร็จ",
          text: "ไม่สามารถดึงเลขใบเสร็จจากระบบได้",
          confirmButtonText: "ตกลง",
        });
      } finally {
        setReceiptLoading(false);
      }
    };

    loadReceiptOptions();
  }, []);

  useEffect(() => {
    if (!copyId) {
      setCopyLoading(false);
      return;
    }

    const loadCopyData = async () => {
      try {
        setCopyLoading(true);
        const response = await api.get(`/foreigner/${copyId}`);
        const data = response.data?.data ?? response.data;

        setForm((prev) => ({
          ...prev,
          year: String(data.year ?? CURRENT_BUDDHIST_YEAR),
          foreignerIdNo: data.foreignerIdNo || "",
          prefix: data.prefix || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          age: data.age != null ? String(data.age) : "",
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
            data.applicationType === "ชนิดที่ 1"
              ? "200"
              : data.applicationType === "ชนิดที่ 2"
                ? "800"
                : "",
          receiptBookNo: "",
          receiptNo: "",
          certificateNo: data.certificateNo || "",
        }));

        setCertificateDate(stringToDateParts(data.certificateDate));
        setPreviousExpirationDate(stringToDateParts(data.expirationDate));
        setReceiptDate({ day: "", month: "", year: "" });
        setPetitionDate(stringToDateParts(data.petitionDate));
      } catch (error) {
        console.error("COPY FOREIGNER ERROR:", error);

        await Swal.fire({
          icon: "error",
          title: "โหลดข้อมูลไม่สำเร็จ",
          text: "ไม่สามารถนำข้อมูลเดิมมาใช้ได้",
          confirmButtonText: "ตกลง",
        });

        navigate("/foreigner");
      } finally {
        setCopyLoading(false);
      }
    };

    loadCopyData();
  }, [copyId, navigate]);

  const validate = () => {
    const year = Number(form.year);
    const age = Number(form.age);
    const amount = Number(form.amount);

    if (!form.year.trim()) throw new Error("กรุณากรอกปี พ.ศ.");
    if (!Number.isInteger(year) || year < 2400 || year > 2700) {
      throw new Error("ปี พ.ศ. ไม่ถูกต้อง");
    }

    const requiredFields: [keyof ForeignerFormData, string][] = [
      ["prefix", "คำนำหน้า"],
      ["firstName", "ชื่อ"],
      ["lastName", "นามสกุล"],
      ["age", "อายุ"],
      ["nationality", "สัญชาติ"],
      ["ethnicity", "เชื้อชาติ"],
      ["certificateRegistrationNo", "เลขทะเบียนของใบสำคัญ"],
      ["district", "ออกให้ ณ อำเภอ"],
      ["province", "ออกให้ ณ จังหวัด"],
      ["policeStation", "สถานีตำรวจ"],
      ["policeProvince", "จังหวัดของสถานีตำรวจ"],
      ["houseNo", "บ้านเลขที่"],
      ["subdistrict", "ตำบล"],
      ["domicileDistrict", "อำเภอของภูมิลำเนา"],
      ["domicileProvince", "จังหวัดของภูมิลำเนา"],
      ["applicationType", "ชนิดการขอรับ"],
      ["amount", "จำนวนเงิน"],
      ["receiptBookNo", "ใบเสร็จเล่มที่"],
      ["receiptNo", "ใบเสร็จเลขที่"],
    ];

    for (const [field, label] of requiredFields) {
      if (!String(form[field] ?? "").trim()) {
        throw new Error(`กรุณากรอก${label}`);
      }
    }

    if (!Number.isInteger(age) || age < 0) {
      throw new Error("อายุไม่ถูกต้อง");
    }

    if (!Number.isInteger(amount) || amount < 0) {
      throw new Error("จำนวนเงินต้องเป็นจำนวนเต็ม");
    }

    datePartsToString(certificateDate, true);
    datePartsToString(previousExpirationDate, true);
    datePartsToString(receiptDate, true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    try {
      validate();

      const certificateDateString = datePartsToString(certificateDate, true);
      const applicationDateString = datePartsToString(
        previousExpirationDate,
        true,
      );
      const receiptDateString = datePartsToString(receiptDate, true);
      const petitionDateISO = datePartsToISO(petitionDate);

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
        certificateDate: certificateDateString,
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
        applicationDate: applicationDateString,
        previousExpirationDate: applicationDateString,
        amount: Number(form.amount),
        amountText: null,
        receiptBookNo: form.receiptBookNo.trim(),
        receiptNo: form.receiptNo.trim(),
        receiptDate: receiptDateString,
        certificateNo: form.certificateNo.trim() || null,
        petitionDate: petitionDateISO,
      };

      setLoading(true);
      await api.post("/foreigner", payload);

      await Swal.fire({
        icon: "success",
        title: copyId ? "สร้างข้อมูลใหม่สำเร็จ" : "บันทึกสำเร็จ",
        text: copyId
          ? "สร้างข้อมูลใหม่จากรายการเดิมเรียบร้อยแล้ว"
          : "เพิ่มข้อมูลบุคคลต่างด้าวเรียบร้อยแล้ว",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#801d35",
      });

      navigate("/foreigner");
    } catch (error: any) {
      console.error("CREATE FOREIGNER ERROR:", error);

      await Swal.fire({
        icon: "error",
        title: "บันทึกไม่สำเร็จ",
        text:
          error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.message ||
          "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#801d35",
      });
    } finally {
      setLoading(false);
    }
  };

  if (copyLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <LoaderCircle className="animate-spin text-[#801d35]" size={22} />
          <span className="text-sm font-medium text-slate-600">
            กำลังโหลดข้อมูลเดิม...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-3 py-5 sm:px-5 md:px-7 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5">
          <button
            type="button"
            onClick={() => navigate("/foreigner")}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#801d35] hover:bg-[#801d35] hover:text-white"
          >
            <ArrowLeft size={17} />
            กลับหน้าประวัติ
          </button>
        </div>

        <div className="relative mb-7 overflow-hidden rounded-2xl bg-gradient-to-r from-[#681329] via-[#801d35] to-[#a33b51] px-5 py-7 text-white shadow-md sm:px-7">
          <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full border-[24px] border-white/5" />
          <div className="absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/5" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 shadow-inner">
              <ShieldCheck size={30} />
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold tracking-[0.15em] text-white/70">
                FOREIGNER INFORMATION SYSTEM
              </p>
              <h1 className="text-xl font-bold sm:text-2xl">
                {copyId
                  ? "สร้างข้อมูลบุคคลต่างด้าวใหม่"
                  : "เพิ่มข้อมูลบุคคลต่างด้าว"}
              </h1>
              <p className="mt-1 text-sm text-white/75">
                {copyId
                  ? "ข้อมูลถูกนำมาจากรายการเดิม สามารถแก้ไขก่อนบันทึกได้"
                  : "กรอกข้อมูลให้ครบถ้วนเพื่อบันทึกเข้าสู่ระบบ"}
              </p>
            </div>

            <div className="sm:ml-auto">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
                <CalendarDays size={16} />
                ปี พ.ศ. {form.year}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Section
            number="01"
            title="ข้อมูลรายการ"
            description="กำหนดปีที่ใช้จัดเก็บข้อมูล"
            icon={ClipboardList}
            color="rose"
          >
            <div className="grid gap-5 sm:grid-cols-2">
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
            </div>
          </Section>

          <Section
            number="02"
            title="ข้อมูลบุคคล"
            description="รายละเอียดและข้อมูลประจำตัวบุคคลต่างด้าว"
            icon={UserRound}
            color="blue"
          >
            <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="เลขรหัสคนต่างด้าว"
                value={form.foreignerIdNo}
                onChange={(e) => updateField("foreignerIdNo", e.target.value)}
                placeholder="กรอกเลขรหัส"
              />

              <div>
                <label className={labelClass}>
                  คำนำหน้า <Required />
                </label>
                <input
                  list="prefix-options"
                  required
                  value={form.prefix}
                  onChange={(e) => updateField("prefix", e.target.value)}
                  placeholder="เลือกหรือกรอกคำนำหน้า"
                  className={fieldClass}
                />
                <datalist id="prefix-options">
                  <option value="นาย" />
                  <option value="นาง" />
                  <option value="นางสาว" />
                  <option value="เด็กชาย" />
                  <option value="เด็กหญิง" />
                </datalist>
              </div>

              <Input
                label="ชื่อ"
                required
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                placeholder="กรอกชื่อ"
              />
              <Input
                label="นามสกุล"
                required
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                placeholder="กรอกนามสกุล"
              />
              <Input
                label="อายุ"
                required
                type="number"
                min="0"
                step="1"
                value={form.age}
                onChange={(e) => updateField("age", e.target.value)}
                placeholder="ระบุอายุ"
              />
              <Input
                label="สัญชาติ"
                required
                value={form.nationality}
                onChange={(e) => updateField("nationality", e.target.value)}
                placeholder="กรอกสัญชาติ"
              />
              <Input
                label="เชื้อชาติ"
                required
                value={form.ethnicity}
                onChange={(e) => updateField("ethnicity", e.target.value)}
                placeholder="กรอกเชื้อชาติ"
              />
            </div>
          </Section>

          <Section
            number="03"
            title="ข้อมูลใบสำคัญ"
            description="เลขทะเบียนและวันที่ออกใบสำคัญ"
            icon={FileBadge}
            color="violet"
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <Input
                label="เลขทะเบียนของใบสำคัญ"
                required
                value={form.certificateRegistrationNo}
                onChange={(e) =>
                  updateField("certificateRegistrationNo", e.target.value)
                }
                placeholder="กรอกเลขทะเบียนของใบสำคัญ"
              />
              <DateInput
                label="วัน เดือน ปี ของใบสำคัญ"
                required
                value={certificateDate}
                setValue={setCertificateDate}
              />
            </div>
          </Section>

          <Section
            number="04"
            title="สถานที่ออกใบสำคัญ"
            description="ระบุอำเภอและจังหวัดที่ออกใบสำคัญ"
            icon={MapPin}
            color="emerald"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <DistrictInput
                label="ออกให้ ณ อำเภอ"
                required
                value={form.district}
                onChange={(value) => updateField("district", value)}
              />
              <Input
                label="ออกให้ ณ จังหวัด"
                required
                value={form.province}
                onChange={(e) => updateField("province", e.target.value)}
                placeholder="กรอกจังหวัด"
              />
            </div>
          </Section>

          <Section
            number="05"
            title="ข้อมูลสถานีตำรวจ"
            description="ระบุสถานีตำรวจผู้ดำเนินการ"
            icon={Building2}
            color="amber"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="สถานีตำรวจ"
                required
                value={form.policeStation}
                onChange={(e) => updateField("policeStation", e.target.value)}
                placeholder="กรอกชื่อสถานีตำรวจ"
              />
              <Input
                label="จังหวัดของสถานีตำรวจ"
                required
                value={form.policeProvince}
                onChange={(e) => updateField("policeProvince", e.target.value)}
                placeholder="กรอกจังหวัด"
              />
            </div>
          </Section>

          <Section
            number="06"
            title="ข้อมูลภูมิลำเนา"
            description="ที่อยู่ตามภูมิลำเนาของบุคคลต่างด้าว"
            icon={Home}
            color="cyan"
          >
            <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="บ้านเลขที่"
                required
                value={form.houseNo}
                onChange={(e) => updateField("houseNo", e.target.value)}
                placeholder="บ้านเลขที่"
              />
              <Input
                label="หมู่"
                value={form.moo}
                onChange={(e) => updateField("moo", e.target.value)}
                placeholder="หมู่ที่"
              />
              <Input
                label="ถนน"
                value={form.road}
                onChange={(e) => updateField("road", e.target.value)}
                placeholder="ชื่อถนน"
              />
              <Input
                label="ตำบล"
                required
                value={form.subdistrict}
                onChange={(e) => updateField("subdistrict", e.target.value)}
                placeholder="กรอกตำบล"
              />
              <DistrictInput
                label="อำเภอ"
                required
                value={form.domicileDistrict}
                onChange={(value) => updateField("domicileDistrict", value)}
              />
              <Input
                label="จังหวัดของภูมิลำเนา"
                required
                value={form.domicileProvince}
                onChange={(e) =>
                  updateField("domicileProvince", e.target.value)
                }
                placeholder="กรอกจังหวัด"
              />
            </div>
          </Section>

          <Section
            number="07"
            title="ประเภทการขอรับ"
            description="รายละเอียดการขอรับ ขอรับใบแทน หรือขอต่ออายุ"
            icon={FileText}
            color="indigo"
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <div>
                <label className={labelClass}>
                  ชนิดการขอรับ <Required />
                </label>
                <input
                  list="application-type-options"
                  required
                  value={form.applicationType}
                  onChange={(e) =>
                    updateField("applicationType", e.target.value)
                  }
                  placeholder="เลือกหรือกรอกชนิดการขอรับ"
                  className={fieldClass}
                />
                <datalist id="application-type-options">
                  <option value="ชนิดที่ 1" />
                  <option value="ชนิดที่ 2" />
                </datalist>
              </div>
              <DateInput
                label="วันหมดอายุก่อนต่ออายุ"
                required
                value={previousExpirationDate}
                setValue={setPreviousExpirationDate}
              />
            </div>
          </Section>

          <Section
            number="08"
            title="ค่าธรรมเนียมและใบเสร็จ"
            description="ข้อมูลจำนวนเงินและรายละเอียดใบเสร็จรับเงิน"
            icon={Receipt}
            color="orange"
          >
            <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
              <Input
                label="จำนวนเงิน"
                required
                type="number"
                value={form.amount}
                readOnly
                placeholder="ระบบคำนวณตามชนิดการขอรับ"
              />

              <div>
                <label className={labelClass}>
                  ใบเสร็จเล่มที่ <Required />
                </label>
                <input
                  required
                  value={form.receiptBookNo}
                  onChange={(e) => updateField("receiptBookNo", e.target.value)}
                  placeholder="กรอกเลขใบเสร็จเล่มที่"
                  className={fieldClass}
                />
                <p className="mt-1.5 text-xs text-slate-500">
                  สามารถกรอกเลขใบเสร็จเล่มที่เองได้
                </p>
              </div>

              <div>
                <label className={labelClass}>
                  ใบเสร็จเลขที่ <Required />
                </label>
                <input
                  list="receipt-number-options"
                  required
                  value={form.receiptNo}
                  onChange={(e) => updateField("receiptNo", e.target.value)}
                  placeholder={
                    receiptLoading
                      ? "กำลังโหลดเลขใบเสร็จ..."
                      : "เลือกหรือกรอกเลขใบเสร็จ"
                  }
                  disabled={receiptLoading}
                  className={fieldClass}
                />
                <datalist id="receipt-number-options">
                  {receiptNos.map((no) => (
                    <option key={no} value={no} />
                  ))}
                </datalist>
                <p className="mt-1.5 text-xs text-slate-500">
                  เลือกเลขที่ยังว่าง หรือกรอกเลขใบเสร็จเองได้
                </p>
              </div>

              <DateInput
                label="วัน เดือน ปี ของใบเสร็จ"
                required
                value={receiptDate}
                setValue={setReceiptDate}
              />
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <Info size={17} className="mt-0.5 shrink-0" />
              <p>จำนวนเงินจะถูกกำหนดโดยอัตโนมัติตามชนิดการขอรับที่เลือก</p>
            </div>
          </Section>

          <Section
            number="09"
            title="ข้อมูลเพิ่มเติม"
            description="ข้อมูลใบสำคัญและวันที่ยื่นคำร้อง"
            icon={Globe2}
            color="slate"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="ใบสำคัญ"
                value={form.certificateNo}
                onChange={(e) => updateField("certificateNo", e.target.value)}
                placeholder="กรอกเลขที่ใบสำคัญ"
              />
              <DateInput
                label="วันที่ยื่นคำร้อง"
                value={petitionDate}
                setValue={setPetitionDate}
              />
            </div>
          </Section>

          <div className="sticky bottom-0 z-10 -mx-3 border-t border-slate-200 bg-white/95 px-3 py-4 shadow-[0_-5px_20px_rgba(15,23,42,0.06)] backdrop-blur sm:-mx-5 sm:px-5 md:-mx-7 md:px-7">
            <div className="mx-auto flex max-w-6xl flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={loading}
                onClick={() => navigate("/foreigner")}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={17} />
                ยกเลิก
              </button>

              <button
                type="submit"
                disabled={loading || copyLoading || receiptLoading}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#801d35] px-7 py-3 text-sm font-bold text-white shadow-md shadow-[#801d35]/20 transition hover:bg-[#681329] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    กำลังบันทึก...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {copyId ? "สร้างข้อมูลใหม่" : "บันทึกข้อมูล"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Required() {
  return <span className="ml-1 text-rose-600">*</span>;
}

function Section({
  number,
  title,
  description,
  icon: Icon,
  color,
  children,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  children: React.ReactNode;
}) {
  const colorStyles: Record<string, string> = {
    rose: "bg-rose-50 text-rose-700",
    blue: "bg-blue-50 text-blue-700",
    violet: "bg-violet-50 text-violet-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    cyan: "bg-cyan-50 text-cyan-700",
    indigo: "bg-indigo-50 text-indigo-700",
    orange: "bg-orange-50 text-orange-700",
    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colorStyles[color] || colorStyles.slate}`}
        >
          <Icon size={21} strokeWidth={1.8} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider text-[#801d35]">
              {number}
            </span>
            <h2 className="text-base font-bold text-slate-800">{title}</h2>
          </div>
          <p className="mt-0.5 text-xs text-slate-400">{description}</p>
        </div>

        <CheckCircle2
          size={17}
          className="hidden shrink-0 text-slate-200 sm:block"
        />
      </div>

      <div className="p-4 sm:p-5 md:p-6">{children}</div>
    </section>
  );
}

function Input({
  label,
  required,
  className,
  ...props
}: {
  label: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>
        {label}
        {required && <Required />}
      </label>
      <input
        {...props}
        required={required}
        className={`${fieldClass} ${className || ""}`}
      />
    </div>
  );
}

function DistrictInput({
  label,
  required,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `district-${label}`
    .replace(/\s+/g, "-")
    .replace(/[^\u0E00-\u0E7Fa-zA-Z0-9-]/g, "");

  return (
    <div className="min-w-0">
      <label className={labelClass}>
        {label}
        {required && <Required />}
      </label>
      <input
        list={id}
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="เลือกหรือกรอกอำเภอ"
        className={fieldClass}
      />
      <datalist id={id}>
        {CHONBURI_DISTRICTS.map((district) => (
          <option key={district} value={district} />
        ))}
      </datalist>
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
    setValue((prev) => ({ ...prev, [field]: newValue }));
  };

  return (
    <div className="min-w-0">
      <label className={labelClass}>
        {label}
        {required && <Required />}
      </label>

      <div className="grid grid-cols-3 gap-2">
        <input
          type="number"
          min="1"
          max="31"
          placeholder="วัน"
          required={required}
          value={value.day}
          onChange={(e) => updateDate("day", e.target.value.slice(0, 2))}
          className={`${fieldClass} min-w-0 px-2 text-center`}
        />

        <select
          required={required}
          value={value.month}
          onChange={(e) => updateDate("month", e.target.value)}
          className={`${fieldClass} min-w-0 px-2`}
        >
          <option value="">เดือน</option>
          {MONTHS.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="2400"
          max="2700"
          placeholder="พ.ศ."
          required={required}
          value={value.year}
          onChange={(e) => updateDate("year", e.target.value.slice(0, 4))}
          className={`${fieldClass} min-w-0 px-2 text-center`}
        />
      </div>
    </div>
  );
}
