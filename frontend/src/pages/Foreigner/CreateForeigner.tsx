import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { ArrowLeft } from "lucide-react";
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
    if (required) {
      throw new Error("กรุณากรอกวัน เดือน ปี ให้ครบ");
    }
    return null;
  }

  if (!value.day || !value.month || !value.year) {
    throw new Error("กรุณากรอกวัน เดือน ปี ให้ครบ");
  }

  const day = Number(value.day);
  const year = Number(value.year);
  const monthIndex = MONTHS.indexOf(value.month);

  if (monthIndex < 0) {
    throw new Error("เดือนไม่ถูกต้อง");
  }

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
  if (!value.day && !value.month && !value.year) {
    return null;
  }

  if (!value.day || !value.month || !value.year) {
    throw new Error("กรุณากรอกวัน เดือน ปี ให้ครบ");
  }

  const day = Number(value.day);
  const month = MONTHS.indexOf(value.month) + 1;
  const year = Number(value.year) - 543;

  if (!Number.isInteger(day) || day < 1 || day > 31) {
    throw new Error("วันที่ไม่ถูกต้อง");
  }

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error("เดือนไม่ถูกต้อง");
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
  if (!value) {
    return {
      day: "",
      month: "",
      year: "",
    };
  }

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

  return {
    day: "",
    month: "",
    year: "",
  };
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

  const updateField = (field: keyof ForeignerFormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (form.applicationType === "ชนิดที่ 1") {
      setForm((prev) => ({
        ...prev,
        amount: "200",
      }));
    } else if (form.applicationType === "ชนิดที่ 2") {
      setForm((prev) => ({
        ...prev,
        amount: "800",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        amount: "",
      }));
    }
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
          year:
            data.year !== null && data.year !== undefined
              ? String(data.year)
              : String(CURRENT_BUDDHIST_YEAR),
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

        setReceiptDate({
          day: "",
          month: "",
          year: "",
        });

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

    if (!form.year.trim()) {
      throw new Error("กรุณากรอกปี พ.ศ.");
    }

    if (!Number.isInteger(year) || year < 2400 || year > 2700) {
      throw new Error("ปี พ.ศ. ไม่ถูกต้อง");
    }

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

    if (!Number.isInteger(age) || age < 0) {
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

    if (!Number.isInteger(amount) || amount < 0) {
      throw new Error("จำนวนเงินต้องเป็นจำนวนเต็ม");
    }

    if (!form.receiptBookNo.trim()) {
      throw new Error("กรุณากรอกใบเสร็จเล่มที่");
    }

    if (!form.receiptNo.trim()) {
      throw new Error("กรุณากรอกใบเสร็จเลขที่");
    }

    datePartsToString(certificateDate, true);

    datePartsToString(previousExpirationDate, true);

    datePartsToString(receiptDate, true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
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
      });

      navigate("/foreigner");
    } catch (error: any) {
      console.error("CREATE FOREIGNER ERROR:", error);

      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
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

  if (copyLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl bg-white px-6 py-5 shadow-sm">
          <div className="text-sm text-gray-500">กำลังโหลดข้อมูลเดิม...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/foreigner")}
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#800020] hover:bg-[#800020] hover:text-white"
          >
            <ArrowLeft size={17} />
            กลับหน้าประวัติ
          </button>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#800020] md:text-3xl">
            {copyId
              ? "สร้างข้อมูลบุคคลต่างด้าวใหม่"
              : "เพิ่มข้อมูลบุคคลต่างด้าว"}
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            {copyId
              ? "ข้อมูลถูกนำมาจากรายการเดิม สามารถแก้ไขก่อนบันทึกได้"
              : "เพิ่มข้อมูลบุคคลต่างด้าวเข้าสู่ระบบ"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Section title="ข้อมูลรายการ">
            <Input
              label="ปี พ.ศ."
              required
              type="number"
              min="2400"
              max="2700"
              value={form.year}
              onChange={(e) => updateField("year", e.target.value.slice(0, 4))}
            />
          </Section>

          <Section title="ข้อมูลบุคคล">
            <div className="grid gap-5 md:grid-cols-3">
              <Input
                label="เลขรหัสคนต่างด้าว"
                value={form.foreignerIdNo}
                onChange={(e) => updateField("foreignerIdNo", e.target.value)}
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  คำนำหน้า <span className="text-red-600">*</span>
                </label>

                <input
                  list="prefix-options"
                  required
                  value={form.prefix}
                  onChange={(e) => updateField("prefix", e.target.value)}
                  placeholder="เลือกหรือกรอกคำนำหน้า"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
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
              />

              <Input
                label="นามสกุล"
                required
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
              />

              <Input
                label="อายุ"
                required
                type="number"
                min="0"
                step="1"
                value={form.age}
                onChange={(e) => updateField("age", e.target.value)}
              />

              <Input
                label="สัญชาติ"
                required
                value={form.nationality}
                onChange={(e) => updateField("nationality", e.target.value)}
              />

              <Input
                label="เชื้อชาติ"
                required
                value={form.ethnicity}
                onChange={(e) => updateField("ethnicity", e.target.value)}
              />
            </div>
          </Section>

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

          <Section title="ออกให้ ณ">
            <div className="grid gap-5 md:grid-cols-2">
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
              />
            </div>
          </Section>

          <Section title="สถานีตำรวจ">
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="สถานีตำรวจ"
                required
                value={form.policeStation}
                onChange={(e) => updateField("policeStation", e.target.value)}
              />

              <Input
                label="จังหวัดของสถานีตำรวจ"
                required
                value={form.policeProvince}
                onChange={(e) => updateField("policeProvince", e.target.value)}
              />
            </div>
          </Section>

          <Section title="ภูมิลำเนา">
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="บ้านเลขที่"
                required
                value={form.houseNo}
                onChange={(e) => updateField("houseNo", e.target.value)}
              />

              <Input
                label="หมู่"
                value={form.moo}
                onChange={(e) => updateField("moo", e.target.value)}
              />

              <Input
                label="ถนน"
                value={form.road}
                onChange={(e) => updateField("road", e.target.value)}
              />

              <Input
                label="ตำบล"
                required
                value={form.subdistrict}
                onChange={(e) => updateField("subdistrict", e.target.value)}
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
              />
            </div>
          </Section>

          <Section title="การขอรับ / ขอรับใบแทน / ขอต่ออายุ">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  ชนิดการขอรับ <span className="text-red-600">*</span>
                </label>

                <input
                  list="application-type-options"
                  required
                  value={form.applicationType}
                  onChange={(e) =>
                    updateField("applicationType", e.target.value)
                  }
                  placeholder="เลือกหรือกรอกชนิด"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
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

          <Section title="ค่าธรรมเนียมและใบเสร็จ">
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="จำนวนเงิน"
                required
                type="number"
                value={form.amount}
                readOnly
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  ใบเสร็จเล่มที่ <span className="text-red-600">*</span>
                </label>

                <input
                  list="receipt-book-options"
                  required
                  value={form.receiptBookNo}
                  onChange={(e) =>
                    updateField("receiptBookNo", e.target.value)
                  }
                  placeholder="เลือกหรือกรอกเลขใบเสร็จเล่มที่"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
                />

                <p className="mt-1 text-xs text-slate-500">
                  สามารถกรอกเลขใบเสร็จเล่มที่เองได้
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  ใบเสร็จเลขที่ <span className="text-red-600">*</span>
                </label>

                <input
                  list="receipt-number-options"
                  required
                  value={form.receiptNo}
                  onChange={(e) => updateField("receiptNo", e.target.value)}
                  placeholder={
                    receiptLoading ? "กำลังโหลด..." : "เลือกหรือกรอกเลขใบเสร็จ"
                  }
                  disabled={receiptLoading}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 disabled:bg-gray-100"
                />

                <datalist id="receipt-number-options">
                  {receiptNos.map((no) => (
                    <option key={no} value={no} />
                  ))}
                </datalist>

                <p className="mt-1 text-xs text-slate-500">
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
          </Section>

          <Section title="ข้อมูลอื่น ๆ">
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="ใบสำคัญ"
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

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={loading}
              onClick={() => navigate("/foreigner")}
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              ยกเลิก
            </button>

            <button
              type="submit"
              disabled={loading || copyLoading || receiptLoading}
              className="rounded-lg bg-[#800020] px-6 py-3 font-semibold text-white hover:bg-[#650019] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "กำลังบันทึก..."
                : copyId
                  ? "สร้างข้อมูลใหม่"
                  : "บันทึกข้อมูล"}
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
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10 disabled:bg-gray-100"
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
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}

        {required && <span className="ml-1 text-red-600">*</span>}
      </label>

      <input
        list={id}
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="เลือกหรือกรอกอำเภอ"
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
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
        <input
          type="number"
          min="1"
          max="31"
          placeholder="วัน"
          required={required}
          value={value.day}
          onChange={(e) => updateDate("day", e.target.value.slice(0, 2))}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
        />

        <select
          required={required}
          value={value.month}
          onChange={(e) => updateDate("month", e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
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
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
        />
      </div>
    </div>
  );
}