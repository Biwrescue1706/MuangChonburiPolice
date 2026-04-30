//src/pages/statusPerson/PersonEditPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { toast } from "../../utils/toast";

// ================= CONSTANT =================
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

// ================= DATE =================
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

// ✅ NEW
const splitFingerprint = (value: string) => {
  if (!value) return {};
  const parts = value.split(" ");
  if (parts.length !== 3) return {};
  return {
    fingerprintDay: parts[0],
    fingerprintMonth: parts[1],
    fingerprintYear: parts[2],
  };
};

// ✅ split receipt
const splitReceiptDate = (value: string) => {
  if (!value) return {};
  const parts = value.split(" ");
  if (parts.length !== 3) return {};
  return {
    receiptDay: parts[0],
    receiptMonth: parts[1],
    receiptYear: parts[2],
  };
};

const buildReceiptDateTH = (form: any) => {
  const { receiptDay, receiptMonth, receiptYear } = form;

  if (!receiptDay || !receiptMonth || !receiptYear) return null;

  const day = String(receiptDay).padStart(2, "0");
  return `${day} ${receiptMonth} ${receiptYear}`;
};

const buildThaiDate = (day?: string, month?: string, year?: string) => {
  if (!day || !month || !year) return null;
  return `${day} ${month} ${year}`;
};

const buildFingerprintDateTH = (form: any) => {
  const { fingerprintDay, fingerprintMonth, fingerprintYear } = form;

  if (!fingerprintDay || !fingerprintMonth || !fingerprintYear) {
    return null;
  }

  const day = String(fingerprintDay).padStart(2, "0");

  return `${day} ${fingerprintMonth} ${fingerprintYear}`;
};

const nationalities = ["ไทย", "ลาว", "กัมพูชา", "พม่า", "จีน", "อื่นๆ"];
const ethnicities = ["ไทย", "จีน", "ลาว", "มอญ", "กะเหรี่ยง", "อื่นๆ"];
const bodyTypes = ["ผอม", "สันทัด", "ท้วม", "อ้วน"];
const skinColors = ["ขาว", "ขาวเหลือง", "สองสี", "ดำแดง", "ดำ"];

// ================= COMPONENT =================
export default function PersonEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({});
  const [original, setOriginal] = useState<any>({});
  const [loading, setLoading] = useState(false);


  // ================= FETCH =================
  const fetchPerson = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/person/${id}`);
      const data = res.data.data;

      const fp = splitFingerprint(data.fingerprintDate);
      const rc = splitReceiptDate(data.receiptDate); // 👈 เพิ่ม

      const newData = {
        ...data,
        birthDay: data.birthDay,
        birthMonth: data.birthMonth,
        birthYear: data.birthYear,
        ...fp,
        ...rc,
      };

      setForm({ ...newData });
      setOriginal({ ...newData });
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

  // ================= DERIVED =================
  const maxDay = getDaysInMonth(form.birthMonth, form.birthYear);
  const filteredDays = Array.from({ length: maxDay }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  // ✅ fingerprint logic
  const maxDayFP = getDaysInMonth(form.fingerprintMonth, form.fingerprintYear);

  const maxDayRC = getDaysInMonth(form.receiptMonth, form.receiptYear);

  const daysRC = Array.from({ length: maxDayRC }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );


  const filteredDaysFP = Array.from({ length: maxDayFP }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  const filteredHeights = heights.filter((h) =>
    form.height ? String(h).startsWith(form.height) : true,
  );

  const filteredWeights = weights.filter((w) =>
    form.weight ? String(w).startsWith(form.weight) : true,
  );

  // reset birth
  useEffect(() => {
    if (form.birthDay && Number(form.birthDay) > maxDay) {
      setForm((prev: any) => ({ ...prev, birthDay: "" }));
    }
  }, [form.birthMonth, form.birthYear]);

  // ✅ reset fingerprint
  useEffect(() => {
    if (form.fingerprintDay && Number(form.fingerprintDay) > maxDayFP) {
      setForm((prev: any) => ({
        ...prev,
        fingerprintDay: "",
      }));
    }
  }, [form.fingerprintMonth, form.fingerprintYear]);

  useEffect(() => {
    if (form.receiptDay && Number(form.receiptDay) > maxDayRC) {
      setForm((prev: any) => ({
        ...prev,
        receiptDay: "",
      }));
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

  // ================= CHANGE =================
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "priority" || name === "money"
          ? Number(value)
          : value,
    });
  };

  const handleCancel = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/person/history");
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (loading) return;

    const fingerprintDate = buildFingerprintDateTH(form);
    const receiptDate = buildReceiptDateTH(form);

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
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      const finalData = {
        ...original,
        ...form,
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

  if (loading) return <div className="p-4">กำลังโหลด...</div>;

  return (
    <div className="p-4 main-content" >
      <h4>แก้ไขข้อมูล</h4>

      <div className="row g-3">
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-primary text-white h4 text-center">
            ข้อมูลพื้นฐาน
          </div>

          <div className="card-body row g-3">
            <div className="col-md-3">
              <label>คำนำหน้า</label>
              <input
                list="prefix-options"
                name="prefix"
                className="form-control"
                value={form.prefix || ""}
                onChange={handleChange}
              />

              <datalist id="prefix-options">
                <option value="นาย" />
                <option value="นาง" />
                <option value="นางสาว" />
              </datalist>
            </div>

            {/* NAME */}
            <div className="col-md-3">
              <label>ชื่อ</label>
              <input
                name="firstName"
                className="form-control"
                value={form.firstName || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <label>นามสกุล</label>
              <input
                name="lastName"
                className="form-control"
                value={form.lastName || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label>วันเกิด</label>
              <input
                list="day-list"
                name="birthDay"
                className="form-control"
                value={form.birthDay || ""}
                onChange={handleChange}
              />
              <datalist id="day-list">
                {filteredDays.map((d: any) => (
                  <option key={d} value={d} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>เดือนเกิด</label>
              <input
                list="month-list"
                name="birthMonth"
                className="form-control"
                value={form.birthMonth || ""}
                onChange={handleChange}
              />
              <datalist id="month-list">
                {months.map((m: any) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>ปีเกิด</label>
              <input
                list="year-list"
                name="birthYear"
                className="form-control"
                value={form.birthYear || ""}
                onChange={handleChange}
              />
              <datalist id="year-list">
                {years.map((y: any) => (
                  <option key={y} value={y} />
                ))}
              </datalist>
            </div>

            {/* fingerprint */}
            <div className="col-md-4">
              <label>วันพิมพ์ลายนิ้วมือ</label>
              <input
                list="fp-day-list"
                name="fingerprintDay"
                className="form-control"
                value={form.fingerprintDay || ""}
                onChange={handleChange}
              />
              <datalist id="fp-day-list">
                {filteredDaysFP.map((d: any) => (
                  <option key={d} value={d} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>เดือนพิมพ์ลายนิ้วมือ</label>
              <input
                list="fp-month-list"
                name="fingerprintMonth"
                className="form-control"
                value={form.fingerprintMonth || ""}
                onChange={handleChange}
              />
              <datalist id="fp-month-list">
                {months.map((m: any) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>ปีพิมพ์ลายนิ้วมือ</label>
              <input
                list="fp-year-list"
                name="fingerprintYear"
                className="form-control"
                value={form.fingerprintYear || ""}
                onChange={handleChange}
              />
              <datalist id="fp-year-list">
                {years.map((y: any) => (
                  <option key={y} value={y} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        {/* 🔥 card 2 */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-secondary text-white">
            ขอตรวจสอบประวัติบุคคลเพื่อ
          </div>

          <div className="card-body row g-3">
            <div className="col-md-6">
              <label>ตรวจสอบประวัติเพื่อ</label>
              <input
                name="purpose"
                className="form-control"
                value={form.purpose || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label>ของส่วนราชการ/หน่วยงาน</label>
              <input
                name="requestingAgency"
                className="form-control"
                value={form.requestingAgency || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        {/* 🔥 card ใหญ่ */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-info text-white">ข้อมูลเพิ่มเติม</div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <label>เลขบัตรประชาชน</label>
              <input
                name="citizenId"
                className="form-control"
                value={form.citizenId || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setForm({ ...form, citizenId: value });
                }}
                inputMode="numeric"
                maxLength={13}
              />
            </div>

            <div className="col-md-4">
              <label>สัญชาติ</label>
              <input
                list="nationality-list"
                name="nationality"
                className="form-control"
                value={form.nationality || ""}
                onChange={handleChange}
              />
              <datalist id="nationality-list">
                {nationalities.map((n: any) => (
                  <option key={n} value={n} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>เชื้อชาติ</label>
              <input
                list="ethnicity-list"
                name="ethnicity"
                className="form-control"
                value={form.ethnicity || ""}
                onChange={handleChange}
              />
              <datalist id="ethnicity-list">
                {ethnicities.map((e: any) => (
                  <option key={e} value={e} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>ส่วนสูง</label>
              <input
                type="number"
                list="height-list"
                name="height"
                className="form-control"
                value={form.height || ""}
                onChange={handleChange}
              />
              <datalist id="height-list">
                {filteredHeights.map((h: any) => (
                  <option key={h} value={h} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>น้ำหนัก</label>
              <input
                type="number"
                list="weight-list"
                name="weight"
                className="form-control"
                value={form.weight || ""}
                pattern="[0-9]*"
                onChange={handleChange}
              />
              <datalist id="weight-list">
                {filteredWeights.map((w: any) => (
                  <option key={w} value={w} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>รูปร่าง</label>
              <input
                list="bodyType-list"
                name="bodyType"
                className="form-control"
                value={form.bodyType || ""}
                onChange={handleChange}
              />
              <datalist id="bodyType-list">
                {bodyTypes.map((b: any) => (
                  <option key={b} value={b} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>สีผิว</label>
              <input
                list="skinColor-list"
                name="skinColor"
                className="form-control"
                value={form.skinColor || ""}
                onChange={handleChange}
              />
              <datalist id="skinColor-list">
                {skinColors.map((s: any) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>ตำหนิ/พิการ/ลายสัก</label>
              <input
                name="distinguishingMarks"
                className="form-control"
                value={form.distinguishingMarks || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label>ลักษณะนิสัยและนิสัยอันเป็นที่น่าสังเกต</label>
              <input
                name="behavior"
                className="form-control"
                value={form.behavior || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label>ที่อยู่ปัจจุบัน</label>
              <input
                name="address"
                className="form-control"
                value={form.address || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label>อาชีพ</label>
              <input
                name="occupation"
                className="form-control"
                value={form.occupation || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label>สถานที่ทำงาน</label>
              <input
                name="workplaceAddress"
                className="form-control"
                value={form.workplaceAddress || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label>ชื่อตัว ชื่อสกุล บิดา</label>
              <input
                name="father"
                className="form-control"
                value={form.father || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label>ชื่อตัว ชื่อสกุล มารดา</label>
              <input
                name="mother"
                className="form-control"
                value={form.mother || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label>ชื่อตัว ชื่อสกุล ภรรยา/สามี</label>
              <input
                name="spouse"
                className="form-control"
                value={form.spouse || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ===== RECEIPT ===== */}
        <div className="card mb-3">
          <div className="card-header">ข้อมูลใบเสร็จ</div>
          <div className="card-body row g-3">

            <div className="col-md-3">
              <label>เล่มที่</label>
              <input
                name="receiptBookNo"
                className="form-control"
                value={form.receiptBookNo || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <label>เลขที่</label>
              <input
                name="receiptNo"
                className="form-control"
                value={form.receiptNo || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2">
              <label>วัน</label>
              <input
                list="rc-day"
                name="receiptDay"
                className="form-control"
                value={form.receiptDay || ""}
                onChange={handleChange}
              />
              <datalist id="rc-day">
                {daysRC.map((d) => (
                  <option key={d} value={d} />
                ))}
              </datalist>
            </div>

            <div className="col-md-3">
              <label>เดือน</label>
              <input
                list="rc-month"
                name="receiptMonth"
                className="form-control"
                value={form.receiptMonth || ""}
                onChange={handleChange}
              />
              <datalist id="rc-month">
                {months.map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </div>

            <div className="col-md-2">
              <label>ปี</label>
              <input
                list="rc-year"
                name="receiptYear"
                className="form-control"
                value={form.receiptYear || ""}
                onChange={handleChange}
              />
              <datalist id="rc-year">
                {years.map((y) => (
                  <option key={y} value={y} />
                ))}
              </datalist>
            </div>

            <div className="col-md-3">
              <label>จำนวนเงิน</label>
              <input
                type="number"
                name="money"
                className="form-control"
                value={form.money || ""}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <label>ความเร่งด่วน</label>
              <select
                name="priority"
                className="form-select"
                value={form.priority ?? 0}
                onChange={handleChange}
              >
                <option value={0}>ไม่ด่วน</option>
                <option value={1}>ด่วน</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      <button className="btn btn-secondary me-2" onClick={handleCancel}>
        ยกเลิก
      </button>
      <button className="btn btn-success" onClick={handleSubmit}>
        บันทึก
      </button>

    </div>
  );
}