// src/pages/Person/PersonPage.tsx

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

  return (
    <div className="main-content min-h-screen bg-gray-50 px-3 py-4 sm:px-4 lg:px-6">
      <div className="mx-auto px-4 w-full max-w-[1400px]">
        {/* HEADER */}
        <div className="mb-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-3 flex h-12 w-full items-center justify-center gap-3 rounded-2xl bg-[#8f2946] px-5 text-lg font-bold text-white transition hover:bg-[#9f3453] active:scale-[0.98] max-[1199px]:flex min-[1200px]:hidden"
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            กลับหน้าเดิม
          </button>

          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#650017] to-[#800020] shadow-lg">
            <div className="px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white shadow-sm sm:h-14 sm:w-14">
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21a8 8 0 0 0-16 0" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M19 8v6" />
                    <path d="M16 11h6" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <h1 className="text-xl font-bold text-white sm:text-2xl">
                    สร้างข้อมูลบุคคล
                  </h1>

                  <p className="mt-1 text-xs text-white/70 sm:text-sm">
                    บันทึกข้อมูลบุคคลสำหรับการพิมพ์มือตรวจประวัติ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <form onSubmit={handleSubmit}>
          {/* ===================================================
              BASIC INFO
          =================================================== */}

          <section className="mb-5 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#800020]/10 text-[#800020]">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-800 sm:text-base">
                  ข้อมูลพื้นฐาน
                </h2>

                <p className="text-[10px] text-gray-400">
                  ข้อมูลส่วนบุคคลและข้อมูลประจำตัว
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <BasicInfo
                form={form}
                filteredDays={filteredDays}
                months={months}
                years={years}
                handleChange={handleChange}
              />
            </div>
          </section>

          {/* ===================================================
              ADDITIONAL INFO
          =================================================== */}

          <section className="mb-5 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-800 sm:text-base">
                  ข้อมูลเพิ่มเติม
                </h2>

                <p className="text-[10px] text-gray-400">
                  ข้อมูลลักษณะบุคคลและรายละเอียดเพิ่มเติม
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6">
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

          {/* ===================================================
              RECEIPT
          =================================================== */}

          <section className="mb-5 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" />
                  <path d="M9 7h6" />
                  <path d="M9 11h6" />
                  <path d="M9 15h3" />
                </svg>
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-800 sm:text-base">
                  ข้อมูลใบเสร็จ
                </h2>

                <p className="text-[10px] text-gray-400">
                  ข้อมูลเล่มใบเสร็จ เลขที่ และวันที่
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <ReceiptInfo
                form={form}
                handleChange={handleChange}
                receiptNumbers={receiptNumbers}
                setForm={setForm}
                months={months}
                years={years}
              />
            </div>
          </section>

          {/* ===================================================
              ACTIONS
          =================================================== */}

          <div className="sticky bottom-0 z-20 -mx-3 border-t border-gray-200 bg-white/95 px-3 py-3 shadow-[0_-4px_15px_rgba(0,0,0,0.06)] backdrop-blur sm:-mx-4 sm:px-4 lg:-mx-6 lg:px-6">
            <div className="mx-auto flex w-full max-w-[1400px] flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              {/* CANCEL */}

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-6 text-sm font-bold text-gray-600 transition hover:bg-gray-50 active:scale-[0.98] sm:w-auto"
              >
                ยกเลิก
              </button>

              {/* SAVE */}

              <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#800020] px-7 text-sm font-bold text-white shadow-sm transition hover:bg-[#650017] active:scale-[0.98] sm:w-auto"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                บันทึกข้อมูล
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
