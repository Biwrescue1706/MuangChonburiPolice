export default function BasicInfo({
  form,
  handleChange,
  filteredDays,
  months,
  years,
}: any) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white h4 text-center">
        ข้อมูลพื้นฐาน
      </div>

      <div className="card-body row g-3">
        {/* คำนำหน้า */}
        <div className="col-md-2">
          <label className="form-label">คำนำหน้า</label>
          <input
  list="prefix-list"
  name="prefix"
  className="form-control"
  value={form.prefix || ""}
  onChange={handleChange}
/>

<datalist id="prefix-list">
  <option value="นาย" />
  <option value="นางสาว" />
  <option value="นาง" />
</datalist>
        </div>

        {/* ชื่อ */}
        <div className="col-md-5">
          <label className="form-label">ชื่อ</label>
          <input
            name="firstName"
            className="form-control"
            value={form.firstName || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* นามสกุล */}
        <div className="col-md-5">
          <label className="form-label">นามสกุล</label>
          <input
            name="lastName"
            className="form-control"
            value={form.lastName || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* วันเกิด */}
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

        {/* เดือนเกิด */}
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

        {/* ปีเกิด */}
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

        {/* ================= fingerprint ================= */}

        {/* วันพิมพ์ลายนิ้วมือ */}
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
            {filteredDays.map((d: any) => (
              <option key={d} value={d} />
            ))}
          </datalist>
        </div>

        {/* เดือนพิมพ์ลายนิ้วมือ */}
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

        {/* ปีพิมพ์ลายนิ้วมือ */}
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
  );
}
