export default function BasicInfo({ form, handleChange }: any) {
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
          <label className="form-label">วันที่พิมพ์มือ</label>
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
  );
}
