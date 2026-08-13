// src/components/person/AdditionalInfo.tsx

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
  const inputClass =
    "h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none transition focus:border-[#800020] focus:bg-white focus:ring-2 focus:ring-[#800020]/10";

  const labelClass =
    "mb-1.5 block text-xs font-semibold text-gray-600";

  return (
    <div className="space-y-6">

      {/* =====================================================
          วัตถุประสงค์
      ===================================================== */}

      <div>

        <div className="mb-3 flex items-center gap-2">

          <div className="h-1 w-1 rounded-full bg-purple-500" />

          <h3 className="text-sm font-bold text-gray-800">
            ขอตรวจสอบประวัติบุคคลเพื่อ
          </h3>

        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* ตรวจสอบประวัติเพื่อ */}

          <div>

            <label
              htmlFor="purpose"
              className={labelClass}
            >
              ตรวจสอบประวัติเพื่อ
            </label>

            <input
              id="purpose"
              name="purpose"
              className={inputClass}
              value={form.purpose || ""}
              onChange={handleChange}
              placeholder="ระบุวัตถุประสงค์ในการตรวจสอบ"
            />

          </div>

          {/* หน่วยงาน */}

          <div>

            <label
              htmlFor="requestingAgency"
              className={labelClass}
            >
              ของส่วนราชการ / หน่วยงาน
            </label>

            <input
              id="requestingAgency"
              name="requestingAgency"
              className={inputClass}
              value={form.requestingAgency || ""}
              onChange={handleChange}
              placeholder="ระบุชื่อส่วนราชการหรือหน่วยงาน"
            />

          </div>

        </div>

      </div>

      {/* =====================================================
          ข้อมูลส่วนบุคคล
      ===================================================== */}

      <div className="border-t border-gray-100 pt-5">

        <div className="mb-3 flex items-center gap-2">

          <div className="h-1 w-1 rounded-full bg-blue-500" />

          <h3 className="text-sm font-bold text-gray-800">
            ข้อมูลเพิ่มเติม
          </h3>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">

          {/* =================================================
              เลขบัตรประชาชน
          ================================================= */}

          <div className="sm:col-span-2 lg:col-span-4">

            <label
              htmlFor="citizenId"
              className={labelClass}
            >
              เลขบัตรประชาชน
            </label>

            <input
              id="citizenId"
              name="citizenId"
              className={inputClass}
              value={form.citizenId || ""}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={13}
              placeholder="เลขบัตรประชาชน 13 หลัก"
            />

          </div>

          {/* =================================================
              สัญชาติ
          ================================================= */}

          <div className="lg:col-span-4">

            <label
              htmlFor="nationality"
              className={labelClass}
            >
              สัญชาติ
            </label>

            <input
              id="nationality"
              list="nationality-list"
              name="nationality"
              className={inputClass}
              value={form.nationality || ""}
              onChange={handleChange}
              placeholder="ระบุสัญชาติ"
              autoComplete="off"
            />

            <datalist id="nationality-list">
              {nationalities.map(
                (n: any) => (
                  <option
                    key={n}
                    value={n}
                  />
                ),
              )}
            </datalist>

          </div>

          {/* =================================================
              เชื้อชาติ
          ================================================= */}

          <div className="lg:col-span-4">

            <label
              htmlFor="ethnicity"
              className={labelClass}
            >
              เชื้อชาติ
            </label>

            <input
              id="ethnicity"
              list="ethnicity-list"
              name="ethnicity"
              className={inputClass}
              value={form.ethnicity || ""}
              onChange={handleChange}
              placeholder="ระบุเชื้อชาติ"
              autoComplete="off"
            />

            <datalist id="ethnicity-list">
              {ethnicities.map(
                (e: any) => (
                  <option
                    key={e}
                    value={e}
                  />
                ),
              )}
            </datalist>

          </div>

          {/* =================================================
              ส่วนสูง
          ================================================= */}

          <div className="lg:col-span-4">

            <label
              htmlFor="height"
              className={labelClass}
            >
              ส่วนสูง
              <span className="ml-1 text-gray-400">
                (ซม.)
              </span>
            </label>

            <input
              id="height"
              type="number"
              list="height-list"
              name="height"
              className={inputClass}
              value={form.height || ""}
              onChange={handleChange}
              placeholder="เช่น 170"
            />

            <datalist id="height-list">
              {filteredHeights.map(
                (h: any) => (
                  <option
                    key={h}
                    value={h}
                  />
                ),
              )}
            </datalist>

          </div>

          {/* =================================================
              น้ำหนัก
          ================================================= */}

          <div className="lg:col-span-4">

            <label
              htmlFor="weight"
              className={labelClass}
            >
              น้ำหนัก
              <span className="ml-1 text-gray-400">
                (กก.)
              </span>
            </label>

            <input
              id="weight"
              type="number"
              list="weight-list"
              name="weight"
              className={inputClass}
              value={form.weight || ""}
              pattern="[0-9]*"
              onChange={handleChange}
              placeholder="เช่น 65"
            />

            <datalist id="weight-list">
              {filteredWeights.map(
                (w: any) => (
                  <option
                    key={w}
                    value={w}
                  />
                ),
              )}
            </datalist>

          </div>

          {/* =================================================
              รูปร่าง
          ================================================= */}

          <div className="lg:col-span-4">

            <label
              htmlFor="bodyType"
              className={labelClass}
            >
              รูปร่าง
            </label>

            <input
              id="bodyType"
              list="bodyType-list"
              name="bodyType"
              className={inputClass}
              value={form.bodyType || ""}
              onChange={handleChange}
              placeholder="ระบุรูปร่าง"
              autoComplete="off"
            />

            <datalist id="bodyType-list">
              {bodyTypes.map(
                (b: any) => (
                  <option
                    key={b}
                    value={b}
                  />
                ),
              )}
            </datalist>

          </div>

          {/* =================================================
              สีผิว
          ================================================= */}

          <div className="lg:col-span-4">

            <label
              htmlFor="skinColor"
              className={labelClass}
            >
              สีผิว
            </label>

            <input
              id="skinColor"
              list="skinColor-list"
              name="skinColor"
              className={inputClass}
              value={form.skinColor || ""}
              onChange={handleChange}
              placeholder="ระบุสีผิว"
              autoComplete="off"
            />

            <datalist id="skinColor-list">
              {skinColors.map(
                (s: any) => (
                  <option
                    key={s}
                    value={s}
                  />
                ),
              )}
            </datalist>

          </div>

          {/* =================================================
              ตำหนิ
          ================================================= */}

          <div className="lg:col-span-4">

            <label
              htmlFor="distinguishingMarks"
              className={labelClass}
            >
              ตำหนิ / พิการ / ลายสัก
            </label>

            <input
              id="distinguishingMarks"
              name="distinguishingMarks"
              className={inputClass}
              value={
                form.distinguishingMarks ||
                ""
              }
              onChange={handleChange}
              placeholder="ระบุรายละเอียด"
            />

          </div>

          {/* =================================================
              ลักษณะนิสัย
          ================================================= */}

          <div className="sm:col-span-2 lg:col-span-4">

            <label
              htmlFor="behavior"
              className={labelClass}
            >
              ลักษณะนิสัยและนิสัยอันเป็นที่น่าสังเกต
            </label>

            <input
              id="behavior"
              name="behavior"
              className={inputClass}
              value={form.behavior || ""}
              onChange={handleChange}
              placeholder="ระบุลักษณะนิสัย"
            />

          </div>

          {/* =================================================
              ที่อยู่
          ================================================= */}

          <div className="sm:col-span-2 lg:col-span-4">

            <label
              htmlFor="address"
              className={labelClass}
            >
              ที่อยู่ปัจจุบัน
            </label>

            <input
              id="address"
              name="address"
              className={inputClass}
              value={form.address || ""}
              onChange={handleChange}
              placeholder="ที่อยู่ปัจจุบัน"
            />

          </div>

          {/* =================================================
              อาชีพ
          ================================================= */}

          <div className="lg:col-span-4">

            <label
              htmlFor="occupation"
              className={labelClass}
            >
              อาชีพ
            </label>

            <input
              id="occupation"
              name="occupation"
              className={inputClass}
              value={form.occupation || ""}
              onChange={handleChange}
              placeholder="ระบุอาชีพ"
            />

          </div>

          {/* =================================================
              สถานที่ทำงาน
          ================================================= */}

          <div className="sm:col-span-2 lg:col-span-4">

            <label
              htmlFor="workplaceAddress"
              className={labelClass}
            >
              สถานที่ทำงาน
            </label>

            <input
              id="workplaceAddress"
              name="workplaceAddress"
              className={inputClass}
              value={
                form.workplaceAddress ||
                ""
              }
              onChange={handleChange}
              placeholder="ระบุสถานที่ทำงาน"
            />

          </div>

        </div>

      </div>

      {/* =====================================================
          ข้อมูลครอบครัว
      ===================================================== */}

      <div className="border-t border-gray-100 pt-5">

        <div className="mb-3 flex items-center gap-2">

          <div className="h-1 w-1 rounded-full bg-orange-500" />

          <h3 className="text-sm font-bold text-gray-800">
            ข้อมูลครอบครัว
          </h3>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">

          {/* บิดา */}

          <div className="lg:col-span-4">

            <label
              htmlFor="father"
              className={labelClass}
            >
              ชื่อตัว ชื่อสกุล บิดา
            </label>

            <input
              id="father"
              name="father"
              className={inputClass}
              value={form.father || ""}
              onChange={handleChange}
              placeholder="ชื่อ - นามสกุลบิดา"
            />

          </div>

          {/* มารดา */}

          <div className="lg:col-span-4">

            <label
              htmlFor="mother"
              className={labelClass}
            >
              ชื่อตัว ชื่อสกุล มารดา
            </label>

            <input
              id="mother"
              name="mother"
              className={inputClass}
              value={form.mother || ""}
              onChange={handleChange}
              placeholder="ชื่อ - นามสกุลมารดา"
            />

          </div>

          {/* คู่สมรส */}

          <div className="lg:col-span-4">

            <label
              htmlFor="spouse"
              className={labelClass}
            >
              ชื่อตัว ชื่อสกุล ภรรยา / สามี
            </label>

            <input
              id="spouse"
              name="spouse"
              className={inputClass}
              value={form.spouse || ""}
              onChange={handleChange}
              placeholder="ชื่อ - นามสกุลคู่สมรส"
            />

          </div>

        </div>

      </div>

    </div>
  );
}