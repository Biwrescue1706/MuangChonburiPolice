// src/pages/History/StatusHistoryPage.tsx

import { useEffect, useState } from "react";
import api from "../../api/axios";

interface Person {
  personId: string;
  fullName: string;
  citizenId: string;
  fingerprintDate: string | null;

  purpose?: string;
  receiptBookNo?: string;
  receiptNo?: string;
  receiptDate?: string;

  organizationName?: string;
  status?: number;
  priority?: number;
}

interface StatusHistory {
  historyId: string;
  oldStatus: number;
  newStatus: number;
  changedAt: string;
  person: Person;
}

export default function StatusHistoryPage() {
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [histories, setHistories] = useState<StatusHistory[]>([]);

  const [isCardView, setIsCardView] = useState(
    window.innerWidth < 1280,
  );

  // =========================================================
  // RESPONSIVE
  // =========================================================

  useEffect(() => {
    const handleResize = () => {
      setIsCardView(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatThaiShortDate = (
    dateStr?: string | null,
  ) => {
    if (!dateStr) return "-";

    const months: Record<string, string> = {
      มกราคม: "ม.ค.",
      กุมภาพันธ์: "ก.พ.",
      มีนาคม: "มี.ค.",
      เมษายน: "เม.ย.",
      พฤษภาคม: "พ.ค.",
      มิถุนายน: "มิ.ย.",
      กรกฎาคม: "ก.ค.",
      สิงหาคม: "ส.ค.",
      กันยายน: "ก.ย.",
      ตุลาคม: "ต.ค.",
      พฤศจิกายน: "พ.ย.",
      ธันวาคม: "ธ.ค.",
    };

    const parts = dateStr.trim().split(" ");

    if (parts.length !== 3) {
      return dateStr;
    }

    const [day, month, year] = parts;

    return `${day} ${months[month] || month} ${year.slice(-2)}`;
  };

  // =========================================================
  // FETCH DATA
  // =========================================================

  const fetchData = async (
    selectedStartDate: string,
    selectedEndDate: string,
  ) => {
    try {
      setLoading(true);

      const res = await api.get(
        "/status-history/range",
        {
          params: {
            startDate: selectedStartDate,
            endDate: selectedEndDate,
          },
        },
      );

      setTotal(res.data.total || 0);

      const sortedData = [
        ...(res.data.data || []),
      ].sort((a, b) => {
        const bookA = Number(
          a.person?.receiptBookNo || 0,
        );

        const bookB = Number(
          b.person?.receiptBookNo || 0,
        );

        if (bookA !== bookB) {
          return bookA - bookB;
        }

        const noA = Number(
          a.person?.receiptNo || 0,
        );

        const noB = Number(
          b.person?.receiptNo || 0,
        );

        return noA - noB;
      });

      setHistories(sortedData);
    } catch (err) {
      console.error(
        "โหลดรายงานไม่สำเร็จ:",
        err,
      );

      setHistories([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchData(startDate, endDate);
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = () => {
    fetchData(startDate, endDate);
  };

  // =========================================================
  // LOADING CARD
  // =========================================================

  const LoadingView = () => (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#800020]" />

      <p className="mt-4 text-sm font-semibold text-gray-500">
        กำลังโหลดข้อมูล...
      </p>
    </div>
  );

  // =========================================================
  // EMPTY VIEW
  // =========================================================

  const EmptyView = () => (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-gray-300 shadow-sm">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3.5h8l4 4V20H6z" />
          <path d="M14 3.5V8h4" />
          <path d="M9 12h6" />
          <path d="M9 15.5h4" />
        </svg>
      </div>

      <p className="mt-4 text-base font-bold text-gray-700">
        ไม่พบข้อมูล
      </p>

      <p className="mt-1 text-xs text-gray-400">
        ไม่พบรายการส่งตรวจในช่วงวันที่ที่เลือก
      </p>
    </div>
  );

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="main-content px-3 py-4 sm:px-4">
      <div className="mx-auto w-full max-w-[1600px]">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#650017] to-[#800020] px-5 py-5 text-white shadow-lg sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3.5h8l4 4V20H6z" />
                  <path d="M14 3.5V8h4" />
                  <path d="M9 12h6" />
                  <path d="M9 15.5h6" />
                </svg>
              </div>

              <div>
                <h1 className="text-lg font-bold sm:text-xl">
                  รายงานการส่งตรวจลายนิ้วมือ
                </h1>

                <p className="mt-1 text-xs text-white/70">
                  ตรวจสอบรายการส่งตรวจตามช่วงวันที่
                </p>
              </div>

            </div>

            <div className="rounded-xl bg-white/10 px-5 py-2 text-center">
              <p className="text-[10px] text-white/60">
                จำนวนที่ส่งทั้งหมด
              </p>

              <p className="text-2xl font-bold">
                {total.toLocaleString("th-TH")}
              </p>

              <p className="text-[10px] text-white/60">
                คน
              </p>
            </div>

          </div>
        </div>

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">

          <div className="mb-4 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#800020]/10 text-[#800020]">
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
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="17"
                  rx="2"
                />
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <path d="M3 9h18" />
              </svg>
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-800">
                เลือกช่วงวันที่
              </h2>

              <p className="text-[10px] text-gray-400">
                กำหนดวันที่เริ่มต้นและวันที่สิ้นสุด
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_150px] lg:items-end">

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                วันที่เริ่มต้น
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none transition focus:border-[#800020] focus:bg-white focus:ring-2 focus:ring-[#800020]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                วันที่สิ้นสุด
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(e.target.value)
                }
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none transition focus:border-[#800020] focus:bg-white focus:ring-2 focus:ring-[#800020]/10"
              />
            </div>

            <button
              type="button"
              onClick={handleSearch}
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#800020] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#650017] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  กำลังค้นหา...
                </>
              ) : (
                <>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                    />
                    <path d="m20 20-4-4" />
                  </svg>

                  ค้นหา
                </>
              )}
            </button>

          </div>
        </div>

        {/* =====================================================
            SUMMARY
        ===================================================== */}

        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19V5" />
                <path d="M4 19h16" />
                <path d="M7 16v-4" />
                <path d="M11 16V8" />
                <path d="M15 16v-6" />
                <path d="M19 16V6" />
              </svg>
            </div>

            <div>
              <p className="text-[10px] font-semibold text-blue-500">
                สรุปผลการค้นหา
              </p>

              <p className="text-sm font-bold text-gray-800">
                จำนวนที่ส่งทั้งหมด
              </p>
            </div>

          </div>

          <div className="text-left sm:text-right">
            <span className="text-2xl font-bold text-blue-700">
              {total.toLocaleString("th-TH")}
            </span>

            <span className="ml-1 text-xs font-semibold text-blue-500">
              คน
            </span>
          </div>

        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        {loading ? (
          <LoadingView />
        ) : histories.length === 0 ? (
          <EmptyView />
        ) : isCardView ? (

          /* ===================================================
             CARD VIEW
          =================================================== */

          <div className="flex flex-col gap-3">

            {histories.map((item, index) => (
              <div
                key={item.historyId}
                className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
              >

                <div className="absolute left-0 top-0 h-1 w-full bg-[#800020]" />

                <div className="p-4 sm:p-5">

                  {/* HEADER */}

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#800020]/10 text-sm font-bold text-[#800020]">
                        {index + 1}
                      </div>

                      <div className="min-w-0">

                        <h3 className="break-words text-base font-bold text-gray-900">
                          {item.person?.fullName ?? "-"}
                        </h3>

                        <p className="mt-1 text-[10px] text-gray-400">
                          ID:{" "}
                          {item.person?.personId ?? "-"}
                        </p>

                      </div>

                    </div>

                    {item.person?.priority === 1 ? (
                      <span className="shrink-0 rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold text-red-600">
                        ด่วน
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-500">
                        ไม่ด่วน
                      </span>
                    )}

                  </div>

                  {/* PURPOSE */}

                  <div className="mt-5 rounded-xl bg-gray-50 p-3">

                    <p className="text-[10px] font-semibold text-gray-400">
                      เรื่องที่ขออนุญาต
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold leading-5 text-gray-800">
                      {item.person?.purpose ?? "-"}
                    </p>

                  </div>

                  {/* RECEIPT */}

                  <div className="mt-3">

                    <p className="mb-2 text-[10px] font-bold text-gray-500">
                      ใบเสร็จ
                    </p>

                    <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-3">

                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                        <p className="text-[9px] text-gray-400">
                          เล่มที่
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-800">
                          {item.person?.receiptBookNo ?? "-"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                        <p className="text-[9px] text-gray-400">
                          เลขที่
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-800">
                          {item.person?.receiptNo ?? "-"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                        <p className="text-[9px] text-gray-400">
                          ลงวันที่
                        </p>

                        <p className="mt-1 text-xs font-bold text-gray-800">
                          {formatThaiShortDate(
                            item.person?.receiptDate,
                          )}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              </div>
            ))}

          </div>

        ) : (

          /* ===================================================
             TABLE VIEW
          =================================================== */

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            <div className="w-full overflow-x-auto">

              <table className="w-full min-w-[1000px] border-collapse text-sm">

                <thead>

                  <tr className="bg-gradient-to-r from-[#650017] to-[#800020] text-white">

                    <th
                      rowSpan={2}
                      className="w-[70px] border-r border-white/10 px-3 py-4 text-center text-xs font-bold"
                    >
                      ลำดับ
                    </th>

                    <th
                      rowSpan={2}
                      className="min-w-[190px] border-r border-white/10 px-4 py-4 text-left text-xs font-bold"
                    >
                      ชื่อ และ ชื่อสกุล
                    </th>

                    <th
                      rowSpan={2}
                      className="min-w-[280px] border-r border-white/10 px-4 py-4 text-left text-xs font-bold"
                    >
                      เรื่องที่ขออนุญาต
                    </th>

                    <th
                      colSpan={3}
                      className="border-r border-white/10 px-4 py-3 text-center text-xs font-bold"
                    >
                      ใบเสร็จ
                    </th>

                    <th
                      rowSpan={2}
                      className="min-w-[120px] px-4 py-4 text-center text-xs font-bold"
                    >
                      หมายเหตุ
                    </th>

                  </tr>

                  <tr className="bg-[#650017] text-white">

                    <th className="w-[100px] px-3 py-3 text-center text-[10px] font-bold">
                      เล่มที่
                    </th>

                    <th className="w-[100px] px-3 py-3 text-center text-[10px] font-bold">
                      เลขที่
                    </th>

                    <th className="w-[130px] px-3 py-3 text-center text-[10px] font-bold">
                      ลงวันที่
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {histories.map((item, index) => (
                    <tr
                      key={item.historyId}
                      className={`border-b border-gray-100 transition-colors hover:bg-[#800020]/5 ${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50/70"
                      }`}
                    >

                      <td className="px-3 py-4 text-center text-xs font-semibold text-gray-500">
                        {index + 1}
                      </td>

                      <td className="px-4 py-4 text-left">

                        <p className="break-words text-sm font-bold leading-5 text-gray-900">
                          {item.person?.fullName ?? "-"}
                        </p>

                        <p className="mt-1 text-[9px] text-gray-400">
                          ID:{" "}
                          {item.person?.personId ?? "-"}
                        </p>

                      </td>

                      <td className="max-w-[300px] whitespace-normal break-words px-4 py-4 text-left text-xs leading-5 text-gray-700">
                        {item.person?.purpose ?? "-"}
                      </td>

                      <td className="px-3 py-4 text-center text-sm font-bold text-gray-800">
                        {item.person?.receiptBookNo ?? "-"}
                      </td>

                      <td className="px-3 py-4 text-center text-sm font-bold text-gray-800">
                        {item.person?.receiptNo ?? "-"}
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold text-gray-600">
                        {formatThaiShortDate(
                          item.person?.receiptDate,
                        )}
                      </td>

                      <td className="px-3 py-4 text-center">

                        {item.person?.priority === 1 ? (
                          <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold text-red-600">
                            ด่วน
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-500">
                            ไม่ด่วน
                          </span>
                        )}

                      </td>

                    </tr>
                  ))}

                </tbody>

                <tfoot>

                  <tr className="border-t border-gray-200 bg-gray-50">

                    <td
                      colSpan={7}
                      className="px-4 py-4 text-right text-sm font-bold text-gray-700"
                    >
                      รวมทั้งหมด{" "}
                      <span className="text-[#800020]">
                        {total.toLocaleString(
                          "th-TH",
                        )}
                      </span>{" "}
                      คน
                    </td>

                  </tr>

                </tfoot>

              </table>

            </div>

            <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 text-[10px] text-gray-400">
              เลื่อนซ้าย-ขวาเพื่อดูข้อมูลเพิ่มเติม
            </div>

          </div>
        )}

      </div>
    </div>
  );
}