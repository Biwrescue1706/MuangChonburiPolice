// src/components/person/BasicInfo.tsx
export default function BasicInfo({
  form,
  handleChange,
  filteredDays,
  months,
  years,
}: any) {
  const inputClass =
    "h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#800020] focus:bg-white focus:ring-2 focus:ring-[#800020]/10";
  const labelClass = "mb-1.5 block text-xs font-semibold text-gray-600";

  return (
    <div className="space-y-6">
      {/* ข้อมูลบุคคล */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-[#800020]" />
          <h3 className="text-sm font-bold text-gray-800">ข้อมูลบุคคล</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-2">
            <label htmlFor="prefix" className={labelClass}>คำนำหน้า</label>
            <input
              id="prefix"
              list="prefix-list"
              name="prefix"
              className={inputClass}
              value={form.prefix || ""}
              onChange={handleChange}
              placeholder="เช่น นาย"
              autoComplete="off"
            />
            <datalist id="prefix-list">
              <option value="นาย" />
              <option value="นางสาว" />
              <option value="นาง" />
            </datalist>
          </div>

          <div className="lg:col-span-5">
            <label htmlFor="firstName" className={labelClass}>
              ชื่อ<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              className={inputClass}
              value={form.firstName || ""}
              onChange={handleChange}
              placeholder="กรอกชื่อ"
              required
            />
          </div>

          <div className="lg:col-span-5">
            <label htmlFor="lastName" className={labelClass}>
              นามสกุล<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              className={inputClass}
              value={form.lastName || ""}
              onChange={handleChange}
              placeholder="กรอกนามสกุล"
              required
            />
          </div>
        </div>
      </div>

      {/* วันเดือนปีเกิด */}
      <div className="border-t border-gray-100 pt-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-blue-500" />
          <h3 className="text-sm font-bold text-gray-800">วันเดือนปีเกิด</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="birthDay" className={labelClass}>วันเกิด</label>
            <input
              id="birthDay"
              list="day-list"
              name="birthDay"
              className={inputClass}
              value={form.birthDay || ""}
              onChange={handleChange}
              placeholder="วัน"
              autoComplete="off"
            />
            <datalist id="day-list">
              {filteredDays.map((d: any) => <option key={d} value={d} />)}
            </datalist>
          </div>

          <div>
            <label htmlFor="birthMonth" className={labelClass}>เดือนเกิด</label>
            <input
              id="birthMonth"
              list="month-list"
              name="birthMonth"
              className={inputClass}
              value={form.birthMonth || ""}
              onChange={handleChange}
              placeholder="เดือน"
              autoComplete="off"
            />
            <datalist id="month-list">
              {months.map((m: any) => <option key={m} value={m} />)}
            </datalist>
          </div>

          <div>
            <label htmlFor="birthYear" className={labelClass}>ปีเกิด</label>
            <input
              id="birthYear"
              list="year-list"
              name="birthYear"
              className={inputClass}
              value={form.birthYear || ""}
              onChange={handleChange}
              placeholder="พ.ศ."
              autoComplete="off"
            />
            <datalist id="year-list">
              {years.map((y: any) => <option key={y} value={y} />)}
            </datalist>
          </div>
        </div>
      </div>

      {/* วันพิมพ์ลายนิ้วมือ */}
      <div className="border-t border-gray-100 pt-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-emerald-500" />
          <h3 className="text-sm font-bold text-gray-800">วันพิมพ์ลายนิ้วมือ</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="fingerprintDay" className={labelClass}>
              วันพิมพ์ลายนิ้วมือ
            </label>
            <input
              id="fingerprintDay"
              list="fp-day-list"
              name="fingerprintDay"
              className={inputClass}
              value={form.fingerprintDay || ""}
              onChange={handleChange}
              placeholder="วัน"
              autoComplete="off"
            />
            <datalist id="fp-day-list">
              {filteredDays.map((d: any) => <option key={d} value={d} />)}
            </datalist>
          </div>

          <div>
            <label htmlFor="fingerprintMonth" className={labelClass}>
              เดือนพิมพ์ลายนิ้วมือ
            </label>
            <input
              id="fingerprintMonth"
              list="fp-month-list"
              name="fingerprintMonth"
              className={inputClass}
              value={form.fingerprintMonth || ""}
              onChange={handleChange}
              placeholder="เดือน"
              autoComplete="off"
            />
            <datalist id="fp-month-list">
              {months.map((m: any) => <option key={m} value={m} />)}
            </datalist>
          </div>

          <div>
            <label htmlFor="fingerprintYear" className={labelClass}>
              ปีพิมพ์ลายนิ้วมือ
            </label>
            <input
              id="fingerprintYear"
              list="fp-year-list"
              name="fingerprintYear"
              className={inputClass}
              value={form.fingerprintYear || ""}
              onChange={handleChange}
              placeholder="พ.ศ."
              autoComplete="off"
            />
            <datalist id="fp-year-list">
              {years.map((y: any) => <option key={y} value={y} />)}
            </datalist>
          </div>
        </div>
      </div>
    </div>
  );
}