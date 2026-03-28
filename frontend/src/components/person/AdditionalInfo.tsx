export default function AdditionalInfo({
  form,
  handleChange,
  months,
  years,
  nationalities,
  ethnicities,
  bodyTypes,
  skinColors,
  filteredHeights,
  filteredWeights,
  filteredDays,
}: any) {
  return (
    <>
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

      {/* 🔥 card ใหญ่ */}
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
            <label>สัญชาติ</label>
            <input
              list="nationality-list"
              name="nationality"
              className="form-control"
              value={form.nationality}
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
              value={form.ethnicity}
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
              value={form.height || 0}
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
              value={form.weight || 0}
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
              value={form.bodyType}
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
              value={form.skinColor}
              onChange={handleChange}
            />
            <datalist id="skinColor-list">
              {skinColors.map((s: any) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </div>

          <div className="col-md-4">
            <label>ลักษณะนิสัย</label>
            <input
              name="behavior"
              className="form-control"
              value={form.behavior}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>ที่อยู่</label>
            <input
              name="address"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
