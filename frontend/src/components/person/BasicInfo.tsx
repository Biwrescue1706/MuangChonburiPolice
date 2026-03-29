//src/components/person/BasicInfo.tsx
import { useState } from "react";
export default function BasicInfo({
  form,
  handleChange,
  filteredDays,
  months,
  years,
}: any) {
const [dateValue, setDateValue] = useState("");
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white h4 text-center">
        ข้อมูลพื้นฐาน
      </div>

      <div className="card-body row g-3">
        <div className="col-md-2">
          <label className="form-label">คำนำหน้า</label>
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
          <label className="form-label">ชื่อ</label>
          <input
            name="firstName"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-5">
          <label className="form-label">นามสกุล</label>
          <input
            name="lastName"
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

        <div className="col-md-4">
          <label className="form-label">วัน เดือน ปี ที่พิมพ์ลายนิ้วมือ</label>
          <input
  type="date"
  name="fingerprintDate"
  className="form-control"
  value={dateValue}
  onChange={(e) => {
    setDateValue(e.target.value);
    handleChange(e);
  }}
/>
        </div>
      </div>
    </div>
  );
}
