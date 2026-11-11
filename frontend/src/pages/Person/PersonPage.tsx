import { useNavigate } from "react-router-dom";

import usePersonForm from "../../hooks/usePersonForm";
import BasicInfo from "../../components/person/BasicInfo";
import AdditionalInfo from "../../components/person/AdditionalInfo";
import ReceiptInfo from "../../components/person/ReceiptInfo";

export default function PersonPage() {
  const navigate = useNavigate();

  const {
    form,
    setForm,
    handleChange,
    handleSubmit,
    receiptNumbers,
    months,
    years,
    nationalities,
    ethnicities,
    bodyTypes,
    skinColors,
    filteredHeights,
    filteredWeights,
    filteredDays,
  } = usePersonForm(navigate);

  const sectionClass =
    "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_18px_rgba(30,41,59,0.045)]";

  const sectionHeaderClass =
    "flex items-center gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:px-7";

  const formFieldsClass = [
    "p-5 sm:p-7",
    "[&_label]:mb-2",
    "[&_label]:block",
    "[&_label]:text-sm",
    "[&_label]:font-semibold",
    "[&_label]:text-slate-700",
    "[&_input]:min-h-[44px]",
    "[&_input]:w-full",
    "[&_input]:rounded-lg",
    "[&_input]:border",
    "[&_input]:border-slate-300",
    "[&_input]:bg-white",
    "[&_input]:px-3.5",
    "[&_input]:py-2.5",
    "[&_input]:text-sm",
    "[&_input]:font-medium",
    "[&_input]:text-slate-800",
    "[&_input]:shadow-sm",
    "[&_input]:outline-none",
    "[&_input]:transition-all",
    "[&_input::placeholder]:text-slate-400",
    "[&_input:focus]:border-[#800020]",
    "[&_input:focus]:ring-4",
    "[&_input:focus]:ring-[#800020]/10",
    "[&_input:focus]:shadow-sm",
    "[&_select]:min-h-[44px]",
    "[&_select]:w-full",
    "[&_select]:cursor-pointer",
    "[&_select]:rounded-lg",
    "[&_select]:border",
    "[&_select]:border-slate-300",
    "[&_select]:bg-white",
    "[&_select]:px-3.5",
    "[&_select]:py-2.5",
    "[&_select]:text-sm",
    "[&_select]:font-medium",
    "[&_select]:text-slate-800",
    "[&_select]:shadow-sm",
    "[&_select]:outline-none",
    "[&_select]:transition-all",
    "[&_select:focus]:border-[#800020]",
    "[&_select:focus]:ring-4",
    "[&_select:focus]:ring-[#800020]/10",
    "[&_textarea]:min-h-[110px]",
    "[&_textarea]:w-full",
    "[&_textarea]:resize-y",
    "[&_textarea]:rounded-lg",
    "[&_textarea]:border",
    "[&_textarea]:border-slate-300",
    "[&_textarea]:bg-white",
    "[&_textarea]:px-3.5",
    "[&_textarea]:py-3",
    "[&_textarea]:text-sm",
    "[&_textarea]:font-medium",
    "[&_textarea]:text-slate-800",
    "[&_textarea]:shadow-sm",
    "[&_textarea]:outline-none",
    "[&_textarea]:transition-all",
    "[&_textarea::placeholder]:text-slate-400",
    "[&_textarea:focus]:border-[#800020]",
    "[&_textarea:focus]:ring-4",
    "[&_textarea:focus]:ring-[#800020]/10",
    "[&_input[type=checkbox]]:h-4",
    "[&_input[type=checkbox]]:min-h-0",
    "[&_input[type=checkbox]]:w-4",
    "[&_input[type=checkbox]]:cursor-pointer",
    "[&_input[type=checkbox]]:accent-[#800020]",
    "[&_input[type=radio]]:h-4",
    "[&_input[type=radio]]:min-h-0",
    "[&_input[type=radio]]:w-4",
    "[&_input[type=radio]]:cursor-pointer",
    "[&_input[type=radio]]:accent-[#800020]",
    "[&_input:disabled]:cursor-not-allowed",
    "[&_input:disabled]:bg-slate-100",
    "[&_input:disabled]:text-slate-500",
    "[&_select:disabled]:cursor-not-allowed",
    "[&_select:disabled]:bg-slate-100",
    "[&_textarea:disabled]:cursor-not-allowed",
    "[&_textarea:disabled]:bg-slate-100",
    "[&_button]:transition-all",
  ].join(" ");

  return (
    <div className="min-h-screen bg-[#f1f4f9] px-3 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#172942] via-[#263f60] to-[#800020] px-5 py-7 text-white shadow-[0_12px_30px_rgba(23,41,66,0.18)] sm:px-8 sm:py-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[40px] border-white/[0.06]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-1/4 h-56 w-56 rounded-full bg-[#d7b36d]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-1 w-32 bg-gradient-to-r from-[#e4c17b] to-transparent"
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-white/75">
                <span>ระบบจัดการข้อมูล</span>
                <span className="text-white/40">/</span>
                <span>ข้อมูลบุคคล</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                บันทึกข้อมูลบุคคล
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">
                กรอกข้อมูลบุคคล ข้อมูลประกอบ และรายละเอียดใบเสร็จ
                ให้ครบถ้วนก่อนบันทึกข้อมูลเข้าสู่ระบบ
              </p>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className={sectionClass}>
            <div className={sectionHeaderClass}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#a00036] to-[#650020] text-white shadow-md shadow-rose-900/15">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                </svg>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-800 sm:text-lg">
                  ข้อมูลพื้นฐาน
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  ข้อมูลส่วนบุคคลและรายละเอียดที่ใช้ประกอบการบันทึก
                </p>
              </div>

              <span className="ml-auto hidden rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-[#800020] sm:block">
                ส่วนที่ 01
              </span>
            </div>

            <div className={formFieldsClass}>
              <BasicInfo
                form={form}
                handleChange={handleChange}
                filteredDays={filteredDays}
                months={months}
                years={years}
              />
            </div>
          </section>

          <section className={sectionClass}>
            <div className={sectionHeaderClass}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#3479e8] to-[#1947a3] text-white shadow-md shadow-blue-900/15">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="4" y="3" width="16" height="18" rx="2" />
                  <path d="M8 8h8M8 12h8M8 16h5" />
                </svg>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-800 sm:text-lg">
                  ข้อมูลเพิ่มเติม
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  ข้อมูลลักษณะบุคคล ครอบครัว อาชีพ และที่อยู่
                </p>
              </div>

              <span className="ml-auto hidden rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800 sm:block">
                ส่วนที่ 02
              </span>
            </div>

            <div className={formFieldsClass}>
              <AdditionalInfo
                form={form}
                handleChange={handleChange}
                nationalities={nationalities}
                ethnicities={ethnicities}
                bodyTypes={bodyTypes}
                skinColors={skinColors}
                filteredHeights={filteredHeights}
                filteredWeights={filteredWeights}
              />
            </div>
          </section>

          <section className={sectionClass}>
            <div className={sectionHeaderClass}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#20a77c] to-[#08724f] text-white shadow-md shadow-emerald-900/15">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Z" />
                  <path d="M9 7h6M9 11h6M9 15h3" />
                </svg>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-800 sm:text-lg">
                  ข้อมูลใบเสร็จและสถานะ
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  เลขที่ใบเสร็จ จำนวนเงิน วันที่ และสถานะการดำเนินการ
                </p>
              </div>

              <span className="ml-auto hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 sm:block">
                ส่วนที่ 03
              </span>
            </div>

            <div className={formFieldsClass}>
              <ReceiptInfo
                form={form}
                handleChange={handleChange}
                receiptNumbers={receiptNumbers}
                setStatus={(status) =>
                  setForm((prev) => ({
                    ...prev,
                    status,
                  }))
                }
                setPriority={(priority) =>
                  setForm((prev) => ({
                    ...prev,
                    priority,
                  }))
                }
                months={months}
                years={years}
              />
            </div>
          </section>

          <div className="sticky bottom-0 z-20 -mx-3 border-t border-slate-200 bg-white/95 px-3 py-4 shadow-[0_-5px_20px_rgba(30,41,59,0.06)] backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-6 text-slate-600">
                กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนบันทึก
                <span className="ml-1 font-bold text-red-600">*</span>{" "}
                หมายถึงข้อมูลที่จำเป็นต้องกรอก
              </p>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  ย้อนกลับ
                </button>

                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#a00036] to-[#650020] px-7 text-sm font-bold text-white shadow-md shadow-rose-900/20 transition hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#800020]/20 active:translate-y-0"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
                    <path d="M17 21v-8H7v8" />
                    <path d="M7 3v5h8" />
                  </svg>
                  บันทึกข้อมูล
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
