// src/pages/ReceiptListPage.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "../../utils/toast";

interface Receipt {
  receiptId: string;
  receiptBookNo: string;
  receiptNo: string;
  fullName: string;
  money: number;
  createdAt: string;
  receiptDate?: string;
}

export default function ReceiptListPage() {
  const navigate = useNavigate();

  const [data, setData] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= 1200,
  );

  // RESPONSIVE

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // FETCH

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await api.get("/receipt/all");

      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast("error", "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // PARSE THAI DATE

  const parseThaiDate = (dateStr?: string) => {
    if (!dateStr) return 0;

    const months: Record<string, number> = {
      มกราคม: 0,
      กุมภาพันธ์: 1,
      มีนาคม: 2,
      เมษายน: 3,
      พฤษภาคม: 4,
      มิถุนายน: 5,
      กรกฎาคม: 6,
      สิงหาคม: 7,
      กันยายน: 8,
      ตุลาคม: 9,
      พฤศจิกายน: 10,
      ธันวาคม: 11,
    };

    const parts = dateStr.trim().split(" ");

    if (parts.length !== 3) return 0;

    const day = Number(parts[0]);
    const month = months[parts[1]];
    const year = Number(parts[2]) - 543;

    if (
      Number.isNaN(day) ||
      month === undefined ||
      Number.isNaN(year)
    ) {
      return 0;
    }

    return new Date(year, month, day).getTime();
  };

  // SEARCH

  const filtered = data.filter((item) =>
    `${item.fullName} ${item.receiptNo} ${item.receiptBookNo}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // SORT

  const sorted = [...filtered].sort((a, b) => {
    const dateA = a.receiptDate
      ? parseThaiDate(a.receiptDate)
      : new Date(a.createdAt).getTime();

    const dateB = b.receiptDate
      ? parseThaiDate(b.receiptDate)
      : new Date(b.createdAt).getTime();

    return dateB - dateA;
  });

  // FORMAT DATE

  const formatDate = (date?: string) => {
    if (!date) return "-";

    if (date.includes(" ")) {
      return date;
    }

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "-";
    }

    return parsed.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  // TOTAL MONEY

  const totalMoney = sorted.reduce(
    (sum, item) => sum + Number(item.money || 0),
    0,
  );

  // LOADING

  if (loading) {
    return (
      <div className="main-content min-h-screen bg-gray-50 px-3 py-5 sm:px-4 lg:px-6">
        <div className="mx-auto flex min-h-[60vh] max-w-[1400px] items-center justify-center">
          <div className="rounded-2xl border border-gray-100 bg-white px-10 py-8 text-center shadow-sm">

            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#800020]" />

            <p className="text-sm font-semibold text-gray-600">
              กำลังโหลดข้อมูล...
            </p>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content min-h-screen bg-gray-50 px-3 py-4 sm:px-4 lg:px-6">
      <div className="mx-auto px-4 w-full max-w-[1400px]">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#650017] to-[#800020] shadow-lg">

          <div className="px-5 py-5 sm:px-7">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">

                <svg
                  width="24"
                  height="24"
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
                  <path d="M9 15h4" />
                </svg>

              </div>

              <div>

                <h1 className="text-lg font-bold text-white sm:text-xl">
                  รายการใบเสร็จ
                </h1>

                <p className="mt-0.5 text-xs text-white/70 sm:text-sm">
                  รายการใบเสร็จรับเงินทั้งหมด
                </p>

              </div>

            </div>

          </div>
        </div>

        {/* ===================================================
            SUMMARY
        =================================================== */}

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

          {/* จำนวนรายการ */}

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                <svg
                  width="21"
                  height="21"
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
                  <path d="M9 15h4" />
                </svg>

              </div>

              <div>

                <p className="text-xs text-gray-400">
                  จำนวนใบเสร็จ
                </p>

                <p className="text-xl font-bold text-gray-800">
                  {sorted.length}
                  <span className="ml-1 text-sm font-medium text-gray-400">
                    รายการ
                  </span>
                </p>

              </div>

            </div>

          </div>

          {/* ยอดเงิน */}

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">

                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v10" />
                  <path d="M15 9.5c0-1-1.2-1.8-3-1.8s-3 .8-3 1.8 1.2 1.5 3 2 3 1 3 2-1.2 1.8-3 1.8-3-.8-3-1.8" />
                </svg>

              </div>

              <div>

                <p className="text-xs text-gray-400">
                  ยอดรวม
                </p>

                <p className="text-xl font-bold text-green-600">
                  {totalMoney.toLocaleString("th-TH")}
                  <span className="ml-1 text-sm font-medium text-gray-400">
                    บาท
                  </span>
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            SEARCH
        =================================================== */}

        <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

          <div className="relative">

            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">

              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>

            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหา ชื่อ / เลขที่ / เล่ม..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-11 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#800020] focus:bg-white focus:ring-2 focus:ring-[#800020]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 transition hover:text-gray-700"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12" />
                  <path d="M18 6 6 18" />
                </svg>
              </button>
            )}

          </div>

          {search && (
            <div className="mt-2 text-xs text-gray-400">
              พบข้อมูล{" "}
              <span className="font-bold text-[#800020]">
                {sorted.length}
              </span>{" "}
              รายการ
            </div>
          )}

        </div>

        {/* ===================================================
            EMPTY
        =================================================== */}

        {sorted.length === 0 ? (

          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">

              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" />
                <path d="M9 7h6" />
                <path d="M9 11h6" />
              </svg>

            </div>

            <h2 className="text-base font-bold text-gray-700">
              ไม่พบข้อมูล
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              ลองค้นหาด้วยชื่อ เลขที่ หรือเล่มใบเสร็จ
            </p>

          </div>

        ) : isDesktop ? (

          /* =================================================
             DESKTOP >= 1200px
          ================================================= */

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full border-collapse text-sm">

                <thead>

                  <tr className="bg-gray-800 text-white">

                    <th className="w-[70px] border border-gray-700 px-4 py-3 text-center font-semibold">
                      #
                    </th>

                    <th className="border border-gray-700 px-4 py-3 text-left font-semibold">
                      ชื่อ
                    </th>

                    <th className="w-[120px] border border-gray-700 px-4 py-3 text-center font-semibold">
                      เล่มที่
                    </th>

                    <th className="w-[120px] border border-gray-700 px-4 py-3 text-center font-semibold">
                      เลขที่
                    </th>

                    <th className="w-[180px] border border-gray-700 px-4 py-3 text-center font-semibold">
                      วันที่
                    </th>

                    <th className="w-[110px] border border-gray-700 px-4 py-3 text-center font-semibold">
                      ดู
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {sorted.map((item, index) => (

                    <tr
                      key={item.receiptId}
                      className="transition hover:bg-gray-50"
                    >

                      <td className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-500">
                        {index + 1}
                      </td>

                      <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-800">
                        {item.fullName}
                      </td>

                      <td className="border border-gray-200 px-4 py-3 text-center">
                        {item.receiptBookNo || "-"}
                      </td>

                      <td className="border border-gray-200 px-4 py-3 text-center font-semibold text-[#800020]">
                        {item.receiptNo || "-"}
                      </td>

                      <td className="border border-gray-200 px-4 py-3 text-center text-gray-600">
                        {formatDate(
                          item.receiptDate ||
                            item.createdAt,
                        )}
                      </td>

                      <td className="border border-gray-200 px-4 py-3 text-center">

                        <button
                          type="button"
                          className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700 active:scale-95"
                          onClick={() =>
                            navigate(
                              `/receipt/${item.receiptId}`,
                            )
                          }
                        >
                          ดู
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        ) : (

          /* =================================================
             MOBILE / TABLET < 1200px
          ================================================= */

          <div className="flex flex-col gap-3">

            {sorted.map((item, index) => (

              <div
                key={item.receiptId}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >

                {/* CARD HEADER */}

                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">

                  <div className="flex items-center gap-2">

                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#800020]/10 text-xs font-bold text-[#800020]">
                      {index + 1}
                    </span>

                    <span className="text-xs font-semibold text-gray-500">
                      ใบเสร็จรับเงิน
                    </span>

                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-[10px] font-bold text-green-700">
                    #{item.receiptNo || "-"}
                  </span>

                </div>

                {/* CARD BODY */}

                <div className="space-y-4 p-4">

                  <div>

                    <p className="mb-1 text-[10px] font-semibold text-gray-400">
                      ชื่อ
                    </p>

                    <p className="text-base font-bold text-gray-800">
                      {item.fullName || "-"}
                    </p>

                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-gray-50 p-3">

                      <p className="text-[10px] font-semibold text-gray-400">
                        เล่มที่
                      </p>

                      <p className="mt-1 text-sm font-bold text-gray-700">
                        {item.receiptBookNo || "-"}
                      </p>

                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">

                      <p className="text-[10px] font-semibold text-gray-400">
                        เลขที่
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#800020]">
                        {item.receiptNo || "-"}
                      </p>

                    </div>

                  </div>

                  <div className="rounded-xl bg-gray-50 p-3">

                    <p className="text-[10px] font-semibold text-gray-400">
                      วันที่
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-700">
                      {formatDate(
                        item.receiptDate ||
                          item.createdAt,
                      )}
                    </p>

                  </div>

                  <button
                    type="button"
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                    onClick={() =>
                      navigate(
                        `/receipt/${item.receiptId}`,
                      )
                    }
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
                      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>

                    ดูรายละเอียด

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}