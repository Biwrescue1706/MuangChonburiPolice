// src/components/person/BasicInfo.tsx
export default function BasicInfo({
  form,
  handleChange,
  filteredDays,
  months,
  years,
}: any) {
  const inputClass =
    "h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-[#800020]/30 focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-[#800020]/10";
  const labelClass =
    "mb-1.5 block text-xs font-bold text-gray-600";
  const sectionClass =
    "overflow-hidden rounded-2xl border border-[#800020]/10 bg-white shadow-sm";
  const sectionHeaderClass =
    "flex items-center gap-3 border-b border-[#800020]/10 bg-[#800020]/5 px-4 py-3 sm:px-5";
  const titleIconClass =
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#800020] text-white shadow-sm";

  return (
    <div className="space-y-4">
      {/* ข้อมูลบุคคล */}
      <section className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className={titleIconClass}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4.5 20c.7-3.2 3.3-5 7.5-5s6.8 1.8 7.5 5" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#800020]">ข้อมูลบุคคล</h3>
            <p className="mt-0.5 text-[10px] text-gray-400">ข้อมูลชื่อและนามสกุล</p>
          </div>
        </div>

        <div className="p-4 sm:p-5">
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
                ชื่อ <span className="text-red-500">*</span>
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
                นามสกุล <span className="text-red-500">*</span>
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
      </section>

      {/* วันเดือนปีเกิด */}
      <section className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className={titleIconClass}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="5" width="16" height="15" rx="2" />
              <path d="M8 3v4M16 3v4M4 9h16" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#800020]">วันเดือนปีเกิด</h3>
            <p className="mt-0.5 text-[10px] text-gray-400">ข้อมูลวันเกิดของบุคคล</p>
          </div>
        </div>

        <div className="p-4 sm:p-5">
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
      </section>

      {/* วันพิมพ์ลายนิ้วมือ */}
      <section className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className={titleIconClass}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 12a6 6 0 0 1 12 0" />
              <path d="M8 15a4 4 0 0 1 8 0" />
              <path d="M10 18a2 2 0 0 1 4 0" />
              <path d="M4 12a8 8 0 0 1 16 0" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#800020]">วันพิมพ์ลายนิ้วมือ</h3>
            <p className="mt-0.5 text-[10px] text-gray-400">ข้อมูลวันที่พิมพ์ลายนิ้วมือ</p>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="fingerprintDay" className={labelClass}>วันพิมพ์ลายนิ้วมือ</label>
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
              <label htmlFor="fingerprintMonth" className={labelClass}>เดือนพิมพ์ลายนิ้วมือ</label>
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
              <label htmlFor="fingerprintYear" className={labelClass}>ปีพิมพ์ลายนิ้วมือ</label>
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
      </section>
    </div>
  );
}