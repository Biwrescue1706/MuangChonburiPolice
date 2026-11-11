// src/components/person/BasicInfo.tsx

import type { ChangeEvent } from "react";

interface BasicInfoForm {
  prefix?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  birthDay?: string | number | null;
  birthMonth?: string | number | null;
  birthYear?: string | number | null;
  fingerprintDay?: string | number | null;
  fingerprintMonth?: string | number | null;
  fingerprintYear?: string | number | null;
}

interface BasicInfoProps {
  form: BasicInfoForm;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  filteredDays: (string | number)[];
  months: (string | number)[];
  years: (string | number)[];
}

export default function BasicInfo({
  form,
  handleChange,
  filteredDays,
  months,
  years,
}: BasicInfoProps) {
  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none transition-all duration-200 placeholder:font-normal placeholder:text-slate-400 hover:border-[#800020]/50 hover:bg-white focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-[#800020]/10";

  const labelClass = "mb-2 block text-sm font-bold text-slate-700";

  const cardClass =
    "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(15,23,42,0.09)]";

  const headerClass =
    "flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-white via-slate-50 to-slate-100/70 px-5 py-4";

  const sectionTitleClass = "text-base font-extrabold tracking-tight text-slate-800";

  const sectionDescriptionClass = "mt-0.5 text-xs font-medium text-slate-500";

  const iconBox = (color: string) =>
    `flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color} shadow-sm`;

  const fieldBox = "rounded-xl p-1 transition-colors";

  const requiredMark = <span className="ml-1 text-rose-500">*</span>;

  return (
    <div className="space-y-6">
      <section className={`${cardClass} border-l-4 border-l-[#800020]`}>
        <div className={headerClass}>
          <div className={iconBox("bg-[#800020]/10 text-[#800020]")}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4.5 20c.7-3.2 3.3-5 7.5-5s6.8 1.8 7.5 5" />
            </svg>
          </div>
          <div>
            <h3 className={sectionTitleClass}>ข้อมูลบุคคล</h3>
            <p className={sectionDescriptionClass}>
              ข้อมูลชื่อและนามสกุลของบุคคล
            </p>
          </div>
          <span className="ml-auto rounded-full bg-[#800020]/10 px-3 py-1 text-[11px] font-bold text-[#800020]">
            PERSONAL
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
            <div className={`${fieldBox} lg:col-span-2`}>
              <label htmlFor="prefix" className={labelClass}>
                คำนำหน้า
              </label>
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

            <div className={`${fieldBox} lg:col-span-5`}>
              <label htmlFor="firstName" className={labelClass}>
                ชื่อ{requiredMark}
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

            <div className={`${fieldBox} lg:col-span-5`}>
              <label htmlFor="lastName" className={labelClass}>
                นามสกุล{requiredMark}
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

      <section className={`${cardClass} border-l-4 border-l-blue-500`}>
        <div className={headerClass}>
          <div className={iconBox("bg-blue-50 text-blue-600")}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="5" width="16" height="15" rx="2" />
              <path d="M8 3v4" />
              <path d="M16 3v4" />
              <path d="M4 9h16" />
            </svg>
          </div>
          <div>
            <h3 className={sectionTitleClass}>วันเดือนปีเกิด</h3>
            <p className={sectionDescriptionClass}>
              ระบุวัน เดือน และปีเกิดของบุคคล
            </p>
          </div>
          <span className="ml-auto rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-600">
            BIRTH DATE
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className={fieldBox}>
              <label htmlFor="birthDay" className={labelClass}>
                วันเกิด
              </label>
              <input
                id="birthDay"
                list="day-list"
                name="birthDay"
                className={inputClass}
                value={form.birthDay ?? ""}
                onChange={handleChange}
                placeholder="เลือกวัน"
                autoComplete="off"
              />
              <datalist id="day-list">
                {filteredDays.map((day) => (
                  <option key={day} value={day} />
                ))}
              </datalist>
            </div>

            <div className={fieldBox}>
              <label htmlFor="birthMonth" className={labelClass}>
                เดือนเกิด
              </label>
              <input
                id="birthMonth"
                list="month-list"
                name="birthMonth"
                className={inputClass}
                value={form.birthMonth ?? ""}
                onChange={handleChange}
                placeholder="เลือกเดือน"
                autoComplete="off"
              />
              <datalist id="month-list">
                {months.map((month) => (
                  <option key={month} value={month} />
                ))}
              </datalist>
            </div>

            <div className={fieldBox}>
              <label htmlFor="birthYear" className={labelClass}>
                ปีเกิด
              </label>
              <input
                id="birthYear"
                list="year-list"
                name="birthYear"
                className={inputClass}
                value={form.birthYear ?? ""}
                onChange={handleChange}
                placeholder="พ.ศ."
                autoComplete="off"
              />
              <datalist id="year-list">
                {years.map((year) => (
                  <option key={year} value={year} />
                ))}
              </datalist>
            </div>
          </div>
        </div>
      </section>

      <section className={`${cardClass} border-l-4 border-l-emerald-500`}>
        <div className={headerClass}>
          <div className={iconBox("bg-emerald-50 text-emerald-600")}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a7 7 0 0 0-7 7" />
              <path d="M12 6a4 4 0 0 0-4 4" />
              <path d="M12 9a1 1 0 0 0-1 1v5" />
              <path d="M8 14v1a4 4 0 0 1-2 3.5" />
              <path d="M16 14v2a6 6 0 0 0 2 4" />
              <path d="M19 12v2a9 9 0 0 0 1 4" />
              <path d="M5 12v1a7 7 0 0 1-2 5" />
            </svg>
          </div>
          <div>
            <h3 className={sectionTitleClass}>วันพิมพ์ลายนิ้วมือ</h3>
            <p className={sectionDescriptionClass}>
              ระบุวันที่ดำเนินการพิมพ์ลายนิ้วมือ
            </p>
          </div>
          <span className="ml-auto rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
            FINGERPRINT
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className={fieldBox}>
              <label htmlFor="fingerprintDay" className={labelClass}>
                วันพิมพ์ลายนิ้วมือ
              </label>
              <input
                id="fingerprintDay"
                list="fp-day-list"
                name="fingerprintDay"
                className={inputClass}
                value={form.fingerprintDay ?? ""}
                onChange={handleChange}
                placeholder="เลือกวัน"
                autoComplete="off"
              />
              <datalist id="fp-day-list">
                {filteredDays.map((day) => (
                  <option key={day} value={day} />
                ))}
              </datalist>
            </div>

            <div className={fieldBox}>
              <label htmlFor="fingerprintMonth" className={labelClass}>
                เดือนพิมพ์ลายนิ้วมือ
              </label>
              <input
                id="fingerprintMonth"
                list="fp-month-list"
                name="fingerprintMonth"
                className={inputClass}
                value={form.fingerprintMonth ?? ""}
                onChange={handleChange}
                placeholder="เลือกเดือน"
                autoComplete="off"
              />
              <datalist id="fp-month-list">
                {months.map((month) => (
                  <option key={month} value={month} />
                ))}
              </datalist>
            </div>

            <div className={fieldBox}>
              <label htmlFor="fingerprintYear" className={labelClass}>
                ปีพิมพ์ลายนิ้วมือ
              </label>
              <input
                id="fingerprintYear"
                list="fp-year-list"
                name="fingerprintYear"
                className={inputClass}
                value={form.fingerprintYear ?? ""}
                onChange={handleChange}
                placeholder="พ.ศ."
                autoComplete="off"
              />
              <datalist id="fp-year-list">
                {years.map((year) => (
                  <option key={year} value={year} />
                ))}
              </datalist>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}