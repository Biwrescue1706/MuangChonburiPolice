import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";

export default function CreatePerson() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 70 }, (_, i) => currentYear - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const months = [
    "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
    "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"
  ];

  const convertMoneyToText = (amount: number) => {
    const th = ["ศูนย์","หนึ่ง","สอง","สาม","สี่","ห้า","หก","เจ็ด","แปด","เก้า"];
    if (amount === 100) return "หนึ่งร้อยบาทถ้วน";
    if (amount < 10) return th[amount] + "บาทถ้วน";
    return amount + "บาทถ้วน";
  };

  const [form, setForm] = useState<any>({
    prefix: "นาย",
    firstName: "",
    lastName: "",
    citizenId: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    nationality: "ไทย",
    ethnicity: "ไทย",
    bodyType: "สันทัด",
    skinColor: "ดำแดง",
    behavior: "ปกติ",
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

    try {
      await api.post("/person", {
        ...form,
        fullName: `${form.prefix}${form.firstName} ${form.lastName}`,
        birthDay: Number(form.birthDay),
        birthMonth: Number(form.birthMonth),
        birthYear: Number(form.birthYear),
      });

      await Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ",
        confirmButtonColor: "#3085d6",
      });

      navigate("/person");

    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err.response?.data?.error || "ไม่สามารถบันทึกข้อมูลได้",
      });
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">สร้างข้อมูลบุคคล</h3>

      <form onSubmit={handleSubmit}>

        {/* 👤 ข้อมูลส่วนตัว */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-primary text-white">ข้อมูลส่วนตัว</div>
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

        {/* 🎂 วันเกิด */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-info text-white">วันเกิด</div>
          <div className="card-body row g-3">

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
                <option value="">ปี</option>
                {years.map(y => <option key={y}>{y}</option>)}
              </select>
            </div>

          </div>
        </div>

        {/* 🧾 ใบเสร็จ */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-success text-white">ข้อมูลใบเสร็จ</div>
          <div className="card-body row g-3">

            <div className="col-md-3">
              <label>จำนวนเงิน</label>
              <input
                name="money"
                type="number"
                className="form-control"
                value={form.money}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label>ตัวอักษร</label>
              <input
                name="moneyText"
                className="form-control"
                value={form.moneyText}
                readOnly
              />
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