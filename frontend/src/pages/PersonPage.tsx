import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";

export default function CreatePerson() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const currentYearTH = currentYear + 543;

  const years = Array.from({ length: 70 }, (_, i) => currentYearTH - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const months = [
    "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
    "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"
  ];

  const convertMoneyToText = (amount: number) => {
    if (!amount) return "";
    if (amount === 100) return "หนึ่งร้อยบาทถ้วน";
    return amount + "บาทถ้วน";
  };

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
  });

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
        birthYear: form.birthYear
          ? Number(form.birthYear) - 543
          : null,
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
    <div className="container mt-4">
      <h3 className="mb-4">สร้างข้อมูลบุคคล</h3>

      <form onSubmit={handleSubmit}>

        {/* ข้อมูลพื้นฐาน */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-primary text-white">ข้อมูลพื้นฐาน</div>
          <div className="card-body row g-3">

            <div className="col-md-2">
              <label>คำนำหน้า</label>
              <select name="prefix" className="form-control" value={form.prefix} onChange={handleChange}>
                <option>นาย</option>
                <option>นางสาว</option>
                <option>นาง</option>
              </select>
            </div>

            <div className="col-md-5">
              <label>ชื่อ</label>
              <input name="firstName" className="form-control" onChange={handleChange} required />
            </div>

            <div className="col-md-5">
              <label>นามสกุล</label>
              <input name="lastName" className="form-control" onChange={handleChange} required />
            </div>

            <div className="col-md-4">
              <label>เลขบัตรประชาชน</label>
              <input name="citizenId" className="form-control" onChange={handleChange} required />
            </div>

          </div>
        </div>

        {/* วันเกิด */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-info text-white">วันเกิด</div>
          <div className="card-body row g-3">

            <div className="col-md-4">
              <label>วันเกิดเต็ม</label>
              <input type="date" name="birthDate" className="form-control" onChange={handleChange}/>
            </div>

            <div className="col-md-2">
              <select name="birthDay" className="form-control" onChange={handleChange}>
                <option value="">วัน</option>
                {days.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            <div className="col-md-3">
              <select name="birthMonth" className="form-control" onChange={handleChange}>
                <option value="">เดือน</option>
                {months.map((m, i) => <option key={i+1} value={i+1}>{m}</option>)}
              </select>
            </div>

            <div className="col-md-3">
              <select name="birthYear" className="form-control" onChange={handleChange}>
                <option value="">ปี (พ.ศ.)</option>
                {years.map(y => <option key={y}>{y}</option>)}
              </select>
            </div>

          </div>
        </div>

        {/* ครอบครัว */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-secondary text-white">ข้อมูลครอบครัว</div>
          <div className="card-body row g-3">

            <div className="col-md-4">
              <label>ชื่อบิดา</label>
              <input name="father" className="form-control" onChange={handleChange}/>
            </div>

            <div className="col-md-4">
              <label>ชื่อมารดา</label>
              <input name="mother" className="form-control" onChange={handleChange}/>
            </div>

            <div className="col-md-4">
              <label>ชื่อคู่สมรส</label>
              <input name="spouse" className="form-control" value={form.spouse} onChange={handleChange}/>
            </div>

          </div>
        </div>

        {/* อาชีพ / ที่อยู่ */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-dark text-white">ข้อมูลเพิ่มเติม</div>
          <div className="card-body row g-3">

            <div className="col-md-6">
              <label>อาชีพ</label>
              <input name="occupation" className="form-control" onChange={handleChange}/>
            </div>

            <div className="col-md-6">
              <label>สถานที่ทำงาน</label>
              <input name="workplaceAddress" className="form-control" onChange={handleChange}/>
            </div>

            <div className="col-md-12">
              <label>ที่อยู่ปัจจุบัน</label>
              <input name="address" className="form-control" onChange={handleChange}/>
            </div>

            <div className="col-md-6">
              <label>ตรวจสอบประวัติเพื่อ</label>
              <input name="purpose" className="form-control" onChange={handleChange}/>
            </div>

            <div className="col-md-6">
              <label>ของส่วนราชการ/หน่วยงาน</label>
              <input name="requestingAgency" className="form-control" onChange={handleChange}/>
            </div>

            <div className="col-md-12">
              <label>ลักษณะและนิสัยอันเป็นที่น่าสังเกต</label>
              <input name="behavior" className="form-control" value={form.behavior} onChange={handleChange}/>
            </div>

          </div>
        </div>

        {/* ใบเสร็จ */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-success text-white">ข้อมูลใบเสร็จ</div>
          <div className="card-body row g-3">

            <div className="col-md-3">
              <label>เล่มที่ใบเสร็จ</label>
              <input name="receiptBookNo" className="form-control" onChange={handleChange}/>
            </div>

            <div className="col-md-3">
              <label>เลขที่ใบเสร็จ</label>
              <input name="receiptNo" className="form-control" onChange={handleChange}/>
            </div>

            <div className="col-md-3">
              <label>ลงวันที่</label>
              <input type="date" name="receiptDate" className="form-control" onChange={handleChange}/>
            </div>

            <div className="col-md-3">
              <label>จำนวนเงิน</label>
              <input type="number" name="money" className="form-control" value={form.money} onChange={handleChange}/>
            </div>

            <div className="col-md-6">
              <label>ตัวอักษร</label>
              <input name="moneyText" className="form-control" value={form.moneyText} readOnly/>
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