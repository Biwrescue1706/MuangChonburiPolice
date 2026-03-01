// src/pages/PersonPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";

export default function CreatePerson() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const currentYearTH = currentYear + 543;

  const [receiptNumbers, setReceiptNumbers] = useState<number[]>([]);
  const [, setReceiptBookNo] = useState<string>("");

  const years = Array.from({ length: 75 }, (_, i) => currentYearTH - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const nationalities = ["ไทย", "ลาว", "กัมพูชา", "พม่า", "จีน", "อื่นๆ"];
  const ethnicities = ["ไทย", "จีน", "ลาว", "มอญ", "กะเหรี่ยง", "อื่นๆ"];
  const bodyTypes = ["ผอม", "สันทัด", "ท้วม", "อ้วน"];
  const skinColors = ["ขาว", "ขาวเหลือง", "สองสี", "ดำแดง", "ดำ"];

  const heights = Array.from({ length: 121 }, (_, i) => i + 100);
  const weights = Array.from({ length: 151 }, (_, i) => i + 30);

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

  const convertMoneyToText = (amount: number) => {
    if (!amount) return "";
    if (amount === 100) return "หนึ่งร้อยบาทถ้วน";
    return amount + "บาทถ้วน";
  };

  const statusOptions = [
    { value: 0, label: "รอส่ง ศพฐ" },
    { value: 1, label: "ส่ง ศพฐ แล้ว" },
    { value: 2, label: "รับจาก ศพฐ แล้ว" },
    { value: 3, label: "ส่งคืน" },
  ];

  const [form, setForm] = useState<any>({
    prefix: "นาย",
    nationality: "ไทย",
    ethnicity: "ไทย",
    bodyType: "สันทัด",
    skinColor: "ดำแดง",
    behavior: "ปกติ",
    spouse: "-",
    money: 100,
    moneyText: "หนึ่งร้อยบาทถ้วน",
    weight: "",
    height: "",
    distinguishingMarks: "-",
    fingerprintDate: new Date().toISOString().split("T")[0],
    status: 0,
  });

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const res = await api.get("/receipt/latest");
        const { bookNo, usedNumbers } = res.data;

        setReceiptBookNo(bookNo);

        const allNumbers = Array.from({ length: 50 }, (_, i) => i + 1);

        const availableNumbers = allNumbers.filter(
          (num) => !usedNumbers.includes(num),
        );

        setReceiptNumbers(availableNumbers);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReceipts();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "money") {
      const num = Number(value);
      setForm({
        ...form,
        money: num,
        moneyText: convertMoneyToText(num),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName) {
      Swal.fire("กรอกชื่อ-นามสกุลให้ครบ");
      return;
    }

    try {
      await api.post("/person", {
        ...form,
        fullName: `${form.prefix}${form.firstName} ${form.lastName}`,
        birthDay: form.birthDay ? Number(form.birthDay) : null,
        birthMonth: form.birthMonth ? Number(form.birthMonth) : null,
        birthYear: form.birthYear ? Number(form.birthYear) - 543 : null,
        birthDate: form.birthDate || null,
        weight: form.weight ? Number(form.weight) : null,
        height: form.height ? Number(form.height) : null,
        money: form.money ? Number(form.money) : 100,
      });

      await Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ",
      });

      navigate("/person");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: err.response?.data?.error || "ไม่สามารถบันทึกได้",
      });
    }
  };

  return (
    <div
      className="p-4 "
      style={{
        marginTop: 60,
        marginLeft: window.innerWidth > 1280 ? 200 : 0,
      }}
    >
      <h3 className="mb-4">สร้างข้อมูลบุคคล</h3>

      <form onSubmit={handleSubmit}>
        {/* ข้อมูลพื้นฐาน */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-primary text-white">ข้อมูลพื้นฐาน</div>
          <div className="card-body row g-3">
            <div className="col-md-2">
              <label>คำนำหน้า</label>
              <select
                name="prefix"
                className="form-control"
                value={form.prefix}
                onChange={handleChange}
              >
                <option>นาย</option>
                <option>นางสาว</option>
                <option>นาง</option>
              </select>
            </div>
            <div className="col-md-5">
              <label>ชื่อ</label>
              <input
                name="firstName"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-5">
              <label>นามสกุล</label>
              <input
                name="lastName"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label>วันเกิดเต็ม</label>
              <input
                type="date"
                name="birthDate"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label>วันที่พิมพ์มือ</label>
              <input
                type="date"
                name="fingerprintDate"
                className="form-control"
                value={form.fingerprintDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

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
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label>ของส่วนราชการ/หน่วยงาน</label>
              <input
                name="requestingAgency"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* วันเกิด */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-info text-white">ข้อมูลเพิ่มเติม</div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <label>เลขบัตรประชาชน</label>
              <input
                name="citizenId"
                className="form-control"
                onChange={handleChange}
                required
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
                {days.map((d) => (
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
                {months.map((m) => (
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
                {years.map((y) => (
                  <option key={y} value={y} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>สัญชาติ</label>
              <input
                list="nationality-list"
                name="nationality"
                className="form-control"
                value={form.nationality}
                onChange={handleChange}
              />
              <datalist id="nationality-list">
                {nationalities.map((y) => (
                  <option key={y} value={y} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>เชื้อชาติ</label>
              <input
                list="ethnicity-list"
                name="ethnicity"
                className="form-control"
                value={form.ethnicity}
                onChange={handleChange}
              />
              <datalist id="ethnicity-list">
                {ethnicities.map((y) => (
                  <option key={y} value={y} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>ส่วนสูง</label>
              <select
                name="height"
                className="form-control"
                onChange={handleChange}
              >
                <option value="">ส่วนสูง</option>
                {heights.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label>น้ำหนัก</label>
              <select
                name="weight"
                className="form-control"
                onChange={handleChange}
              >
                <option value="">น้ำหนัก</option>
                {weights.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label>รูปร่าง</label>
              <input
                list="bodyType-list"
                name="bodyType"
                className="form-control"
                value={form.bodyType}
                onChange={handleChange}
              />
              <datalist id="bodyType-list">
                {bodyTypes.map((y) => (
                  <option key={y} value={y} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>สีผิว</label>
              <input
                list="skinColor-list"
                name="skinColor"
                className="form-control"
                value={form.skinColor}
                onChange={handleChange}
              />
              <datalist id="skinColor-list">
                {skinColors.map((y) => (
                  <option key={y} value={y} />
                ))}
              </datalist>
            </div>

            <div className="col-md-4">
              <label>ลักษณะและนิสัยอันเป็นที่น่าสังเกต</label>
              <input
                name="behavior"
                className="form-control"
                value={form.behavior}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label>ที่อยู่ปัจจุบัน</label>
              <input
                name="address"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* อาชีพ / ที่อยู่ */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-dark text-white">ข้อมูลเพิ่มเติม</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <label>อาชีพ</label>
              <input
                name="occupation"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label>สถานที่ทำงาน</label>
              <input
                name="workplaceAddress"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ครอบครัว */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-secondary text-white">
            ข้อมูลครอบครัว
          </div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <label>ชื่อบิดา</label>
              <input
                name="father"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label>ชื่อมารดา</label>
              <input
                name="mother"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label>ชื่อคู่สมรส</label>
              <input
                name="spouse"
                className="form-control"
                value={form.spouse}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ใบเสร็จ */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-success text-white">ข้อมูลใบเสร็จ</div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <label>เล่มที่ใบเสร็จ</label>
              <input
                name="receiptBookNo"
                className="form-control"
                onChange={handleChange}
              />
              ต้องดึงข้อมูลใบเสร็จก่อนหน้ามาใส่
            </div>

            <div className="col-md-3">
              <label>เลขที่ใบเสร็จ</label>
              <select
                name="receiptNo"
                className="form-control"
                value={form.receiptNo || ""}
                onChange={handleChange}
                required
              >
                <option value="">เลือกเลขที่ใบเสร็จ</option>
                {receiptNumbers.map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              มีให้ เลือกเลขที่ใบเสร็จ 1-50 ต้องดึงข้อมูลใบเสร็จก่อนหน้ามาใส่
              และถ้าเลขไหนมีแล้วจะไม่ขึ้นให้เห็น ของ เล่มที่ใบเสร็จ
            </div>

            <div className="col-md-3">
              <label>ลงวันที่</label>
              <input
                type="date"
                name="receiptDate"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <label>จำนวนเงิน</label>
              <input
                type="number"
                name="money"
                className="form-control"
                value={form.money}
                readOnly
              />
            </div>

            <div className="col-md-3">
              <label>ตัวอักษร</label>
              <input
                name="moneyText"
                className="form-control"
                value={form.moneyText}
                readOnly
              />
            </div>

            <div className="col-md-4">
              <label>สถานะ</label>
              <select
                name="status"
                className="form-control"
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: Number(e.target.value) })
                }
              >
                {statusOptions.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="text-end">
          <button className="btn btn-primary px-4">บันทึกข้อมูล</button>
        </div>
      </form>
    </div>
  );
}
