//src/components/person/AdditionalInfo.tsx
export default function AdditionalInfo({
  form,
  handleChange,
  nationalities,
  ethnicities,
  bodyTypes,
  skinColors,
  filteredHeights,
  filteredWeights,
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
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={13}
            />
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
            <label>ตำหนิ/พิการ/ลายสัก</label>
            <input
              name="distinguishingMarks"
              className="form-control"
              value={form.distinguishingMarks}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>ลักษณะนิสัยและนิสัยอันเป็นที่น่าสังเกต</label>
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
              value={form.address || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>อาชีพ</label>
            <input
              name="occupation"
              className="form-control"
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
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label>ชื่อตัว ชื่อสกุล มารดา</label>
            <input
              name="mother"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label>ชื่อตัว ชื่อสกุล ภรรยา/สามี</label>
            <input
              name="spouse"
              className="form-control"
              value={form.spouse}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
