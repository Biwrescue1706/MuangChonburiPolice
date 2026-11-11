// src/components/person/AdditionalInfo.tsx

import type { ChangeEvent } from "react";

interface AdditionalInfoForm {
  purpose?: string | null;
  requestingAgency?: string | null;
  citizenId?: string | null;
  nationality?: string | null;
  ethnicity?: string | null;
  height?: string | number | null;
  weight?: string | number | null;
  bodyType?: string | null;
  skinColor?: string | null;
  distinguishingMarks?: string | null;
  behavior?: string | null;
  address?: string | null;
  occupation?: string | null;
  workplaceAddress?: string | null;
  father?: string | null;
  mother?: string | null;
  spouse?: string | null;
}

interface AdditionalInfoProps {
  form: AdditionalInfoForm;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  nationalities: string[];
  ethnicities: string[];
  bodyTypes: string[];
  skinColors: string[];
  filteredHeights: (string | number)[];
  filteredWeights: (string | number)[];
}

export default function AdditionalInfo({
  form,
  handleChange,
  nationalities,
  ethnicities,
  bodyTypes,
  skinColors,
  filteredHeights,
  filteredWeights,
}: AdditionalInfoProps) {
  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:font-normal placeholder:text-slate-400 hover:border-[#800020]/50 hover:bg-white focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-[#800020]/10";

  const labelClass = "mb-2 block text-sm font-bold text-slate-700";

  const cardClass =
    "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.05)]";

  const headerClass =
    "flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-white via-slate-50 to-slate-100/70 px-5 py-4";

  const titleClass = "text-base font-extrabold tracking-tight text-slate-800";

  const descriptionClass = "mt-0.5 text-xs font-medium text-slate-500";

  const iconBox = (color: string) =>
    `flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`;

  const sectionHeading = (color: string) =>
    `mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 text-sm font-extrabold ${color}`;

  const fieldBox = "min-w-0";

  return (
    <div className="space-y-6">
      <section className={`${cardClass} border-l-4 border-l-purple-500`}>
        <div className={headerClass}>
          <div className={iconBox("bg-purple-50 text-purple-600")}>
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
              <path d="M12 3v18" />
              <path d="M5 10h14" />
              <path d="M7 6h10" />
              <path d="M7 14h10" />
              <path d="M7 18h10" />
            </svg>
          </div>
          <div>
            <h3 className={titleClass}>วัตถุประสงค์การตรวจสอบ</h3>
            <p className={descriptionClass}>
              ข้อมูลเหตุผลและหน่วยงานที่ขอตรวจสอบประวัติ
            </p>
          </div>
          <span className="ml-auto rounded-full bg-purple-50 px-3 py-1 text-[10px] font-extrabold tracking-wide text-purple-700">
            PURPOSE
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className={fieldBox}>
              <label htmlFor="purpose" className={labelClass}>
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

            <div className={fieldBox}>
              <label htmlFor="requestingAgency" className={labelClass}>
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
              <rect x="4" y="3" width="16" height="18" rx="2" />
              <path d="M8 8h8M8 12h8M8 16h5" />
            </svg>
          </div>
          <div>
            <h3 className={titleClass}>ข้อมูลส่วนบุคคลเพิ่มเติม</h3>
            <p className={descriptionClass}>
              ข้อมูลประจำตัว สัญชาติ และลักษณะทางกายภาพ
            </p>
          </div>
          <span className="ml-auto rounded-full bg-blue-50 px-3 py-1 text-[10px] font-extrabold tracking-wide text-blue-700">
            PERSONAL INFO
          </span>
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          <div>
            <h4 className={sectionHeading("text-blue-700")}>
              <span className="h-5 w-1 rounded-full bg-blue-500" />
              ข้อมูลประจำตัว
            </h4>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
              <div className="sm:col-span-2 lg:col-span-4">
                <label htmlFor="citizenId" className={labelClass}>
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

              <div className="lg:col-span-4">
                <label htmlFor="nationality" className={labelClass}>
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
                  {nationalities.map((nationality) => (
                    <option key={nationality} value={nationality} />
                  ))}
                </datalist>
              </div>

              <div className="lg:col-span-4">
                <label htmlFor="ethnicity" className={labelClass}>
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
                  {ethnicities.map((ethnicity) => (
                    <option key={ethnicity} value={ethnicity} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-4 sm:p-5">
            <h4 className={sectionHeading("text-indigo-700")}>
              <span className="h-5 w-1 rounded-full bg-indigo-500" />
              ลักษณะทางกายภาพ
            </h4>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <label htmlFor="height" className={labelClass}>
                  ส่วนสูง{" "}
                  <span className="font-medium text-slate-400">(ซม.)</span>
                </label>
                <input
                  id="height"
                  type="number"
                  list="height-list"
                  name="height"
                  className={inputClass}
                  value={form.height ?? ""}
                  onChange={handleChange}
                  placeholder="เช่น 170"
                />
                <datalist id="height-list">
                  {filteredHeights.map((height) => (
                    <option key={height} value={height} />
                  ))}
                </datalist>
              </div>

              <div className="lg:col-span-4">
                <label htmlFor="weight" className={labelClass}>
                  น้ำหนัก{" "}
                  <span className="font-medium text-slate-400">(กก.)</span>
                </label>
                <input
                  id="weight"
                  type="number"
                  list="weight-list"
                  name="weight"
                  className={inputClass}
                  value={form.weight ?? ""}
                  pattern="[0-9]*"
                  onChange={handleChange}
                  placeholder="เช่น 65"
                />
                <datalist id="weight-list">
                  {filteredWeights.map((weight) => (
                    <option key={weight} value={weight} />
                  ))}
                </datalist>
              </div>

              <div className="lg:col-span-4">
                <label htmlFor="bodyType" className={labelClass}>
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
                  {bodyTypes.map((bodyType) => (
                    <option key={bodyType} value={bodyType} />
                  ))}
                </datalist>
              </div>

              <div className="lg:col-span-4">
                <label htmlFor="skinColor" className={labelClass}>
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
                  {skinColors.map((skinColor) => (
                    <option key={skinColor} value={skinColor} />
                  ))}
                </datalist>
              </div>

              <div className="sm:col-span-2 lg:col-span-8">
                <label htmlFor="distinguishingMarks" className={labelClass}>
                  ตำหนิ / พิการ / ลายสัก
                </label>
                <input
                  id="distinguishingMarks"
                  name="distinguishingMarks"
                  className={inputClass}
                  value={form.distinguishingMarks || ""}
                  onChange={handleChange}
                  placeholder="ระบุรายละเอียด"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className={sectionHeading("text-cyan-700")}>
              <span className="h-5 w-1 rounded-full bg-cyan-500" />
              ข้อมูลที่อยู่และการประกอบอาชีพ
            </h4>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
              <div className="sm:col-span-2 lg:col-span-4">
                <label htmlFor="behavior" className={labelClass}>
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

              <div className="sm:col-span-2 lg:col-span-4">
                <label htmlFor="address" className={labelClass}>
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

              <div className="lg:col-span-4">
                <label htmlFor="occupation" className={labelClass}>
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

              <div className="sm:col-span-2 lg:col-span-12">
                <label htmlFor="workplaceAddress" className={labelClass}>
                  สถานที่ทำงาน
                </label>
                <input
                  id="workplaceAddress"
                  name="workplaceAddress"
                  className={inputClass}
                  value={form.workplaceAddress || ""}
                  onChange={handleChange}
                  placeholder="ระบุสถานที่ทำงาน"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${cardClass} border-l-4 border-l-orange-500`}>
        <div className={headerClass}>
          <div className={iconBox("bg-orange-50 text-orange-600")}>
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M20 8v6M23 11h-6" />
            </svg>
          </div>
          <div>
            <h3 className={titleClass}>ข้อมูลครอบครัว</h3>
            <p className={descriptionClass}>ข้อมูลบิดา มารดา และคู่สมรส</p>
          </div>
          <span className="ml-auto rounded-full bg-orange-50 px-3 py-1 text-[10px] font-extrabold tracking-wide text-orange-700">
            FAMILY
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <label htmlFor="father" className={labelClass}>
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

            <div className="lg:col-span-4">
              <label htmlFor="mother" className={labelClass}>
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

            <div className="lg:col-span-4">
              <label htmlFor="spouse" className={labelClass}>
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
      </section>
    </div>
  );
}
