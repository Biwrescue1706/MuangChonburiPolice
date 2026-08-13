// src/pages/Forensic/ForensicSubmissionPdfPage.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { generateForensicPdf } from "../../utils/generateForensicPdf";
import { generateForensicPdfs } from "../../utils/generateForensicPdfS";

interface Person {
  personId: string;
  fullName: string;
  purpose?: string;
  receiptBookNo?: string;
  receiptNo?: string;
  receiptDate?: string;
  priority?: number;
}

interface SubmissionPerson {
  person: Person;
}

interface Submission {
  submissionId: string;
  submissionNo?: string;
  submissionDate: string;
  persons: SubmissionPerson[];
}

export default function ForensicSubmissionPdfPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Submission | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/forensic-submission/${id}`);

      const persons = [...res.data.persons].sort((a, b) => {
        const bookA = Number(a.person.receiptBookNo || 0);
        const bookB = Number(b.person.receiptBookNo || 0);

        if (bookA !== bookB) {
          return bookA - bookB;
        }

        const receiptA = Number(a.person.receiptNo || 0);
        const receiptB = Number(b.person.receiptNo || 0);

        return receiptA - receiptB;
      });

      setData({
        ...res.data,
        persons,
      });
    } catch (error) {
      console.error(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // PDF ส่ง ศพฐ.
  // =========================================================

  const handleGeneratePdf = async () => {
    if (!data) return;

    await generateForensicPdf({
      submissionNo: data.submissionNo,

      submissionDate: new Date(
        data.submissionDate,
      ).toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),

      persons: data.persons.map((item) => ({
        fullName: item.person.fullName,
        purpose: item.person.purpose,
        receiptBookNo: item.person.receiptBookNo,
        receiptNo: item.person.receiptNo,
        receiptDate: item.person.receiptDate,
        priority: item.person.priority,
      })),
    });
  };

  // =========================================================
  // PDF ส่งเงิน
  // =========================================================

  const handleGeneratePdf2 = async () => {
    if (!data) return;

    await generateForensicPdfs({
      submissionNo: data.submissionNo,

      submissionDate: data.submissionDate,

      persons: data.persons.map((item) => ({
        fullName: item.person.fullName,
        purpose: item.person.purpose,
        receiptBookNo: item.person.receiptBookNo,
        receiptNo: item.person.receiptNo,
        receiptDate: item.person.receiptDate,
        priority: item.person.priority,
      })),
    });
  };

  // =========================================================
  // วันที่ไทยแบบย่อ
  // =========================================================

  const formatShortThaiDate = (
    dateString?: string,
  ) => {
    if (!dateString) return "-";

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

    const parts = dateString.trim().split(" ");

    if (parts.length !== 3) {
      return dateString;
    }

    const [day, month, year] = parts;

    return `${day} ${months[month] || month} ${year.slice(-2)}`;
  };

  // =========================================================
  // Loading
  // =========================================================

  if (loading) {
    return (
      <div className="main-content min-h-screen bg-gray-50 px-3 py-6 sm:px-4 lg:px-6">
        <div className="mx-auto flex min-h-[60vh] max-w-[1400px] items-center justify-center">
          <div className="rounded-2xl bg-white px-8 py-7 text-center shadow-sm">
            <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-[#800020]" />

            <p className="text-sm font-semibold text-gray-600">
              กำลังโหลดข้อมูล...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // ไม่พบข้อมูล
  // =========================================================

  if (!data) {
    return (
      <div className="main-content min-h-screen bg-gray-50 px-3 py-6 sm:px-4 lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>

            <h2 className="text-lg font-bold text-gray-800">
              ไม่พบข้อมูล
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              ไม่พบข้อมูลหนังสือส่งตรวจที่ต้องการ
            </p>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content min-h-screen bg-gray-50 px-3 py-4 sm:px-4 lg:px-6">
      <div className="mx-auto w-full max-w-[1400px]">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#650017] to-[#800020] shadow-lg">

          <div className="px-5 py-5 sm:px-7">

            <div className="flex items-center justify-between gap-4">

              <div className="flex min-w-0 items-center gap-3">

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

                <div className="min-w-0">

                  <h1 className="truncate text-lg font-bold text-white sm:text-xl">
                    หนังสือ ศพฐ.
                  </h1>

                  <p className="mt-0.5 text-xs text-white/70 sm:text-sm">
                    รายละเอียดหนังสือนำส่งตรวจประวัติ
                  </p>

                </div>

              </div>

              <div className="hidden shrink-0 text-right sm:block">

                <p className="text-[10px] text-white/60">
                  เลขหนังสือนำส่ง
                </p>

                <p className="text-sm font-bold text-white">
                  {data.submissionNo || "-"}
                </p>

              </div>

            </div>

          </div>
        </div>

        {/* ===================================================
            SUMMARY
        =================================================== */}

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>

              </div>

              <div>

                <p className="text-xs text-gray-400">
                  จำนวนรายชื่อ
                </p>

                <p className="text-xl font-bold text-gray-800">
                  {data.persons.length}{" "}
                  <span className="text-sm font-medium text-gray-400">
                    คน
                  </span>
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">

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
                  <path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" />
                  <path d="M9 7h6" />
                  <path d="M9 11h6" />
                </svg>

              </div>

              <div>

                <p className="text-xs text-gray-400">
                  เลขหนังสือนำส่ง
                </p>

                <p className="text-sm font-bold text-gray-800">
                  {data.submissionNo || "-"}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            PDF BUTTONS
        =================================================== */}

        <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">

          <div className="mb-4">

            <h2 className="text-sm font-bold text-gray-800">
              สร้างเอกสาร PDF
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              เลือกรูปแบบเอกสารที่ต้องการ
            </p>

          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {/* PDF ศพฐ. */}

            <button
              type="button"
              onClick={handleGeneratePdf}
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#800020] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#650017] active:scale-[0.98]"
            >

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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M8 13h8" />
                <path d="M8 17h6" />
              </svg>

              ดาวน์โหลด PDF ส่ง ศพฐ

            </button>

            {/* PDF ส่งเงิน */}

            <button
              type="button"
              onClick={handleGeneratePdf2}
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
            >

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

              ดาวน์โหลด PDF ส่งเงิน

            </button>

          </div>

        </div>

        {/* ===================================================
            DESKTOP TABLE
            >= 1200px
        =================================================== */}

        <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm min-[1200px]:block">

          <div className="overflow-x-auto">

            <table className="w-full border-collapse text-sm">

              <thead>

                <tr className="bg-gray-800 text-white">

                  <th className="w-[70px] border border-gray-700 px-3 py-3 text-center font-semibold">
                    ลำดับ
                  </th>

                  <th className="border border-gray-700 px-3 py-3 text-left font-semibold">
                    ชื่อ และ ชื่อสกุล
                  </th>

                  <th className="border border-gray-700 px-3 py-3 text-left font-semibold">
                    เรื่องที่ขออนุญาต
                  </th>

                  <th className="w-[90px] border border-gray-700 px-3 py-3 text-center font-semibold">
                    เล่มที่
                  </th>

                  <th className="w-[90px] border border-gray-700 px-3 py-3 text-center font-semibold">
                    เลขที่
                  </th>

                  <th className="w-[120px] border border-gray-700 px-3 py-3 text-center font-semibold">
                    ลงวันที่
                  </th>

                  <th className="w-[90px] border border-gray-700 px-3 py-3 text-center font-semibold">
                    หมายเหตุ
                  </th>

                </tr>

              </thead>

              <tbody>

                {data.persons.map(
                  (item, index) => (
                    <tr
                      key={index}
                      className="transition hover:bg-gray-50"
                    >

                      <td className="border border-gray-200 px-3 py-3 text-center">
                        {index + 1}
                      </td>

                      <td className="border border-gray-200 px-3 py-3 font-medium text-gray-800">
                        {item.person.fullName}
                      </td>

                      <td className="border border-gray-200 px-3 py-3 text-gray-700">
                        {item.person.purpose || "-"}
                      </td>

                      <td className="border border-gray-200 px-3 py-3 text-center">
                        {item.person.receiptBookNo || "-"}
                      </td>

                      <td className="border border-gray-200 px-3 py-3 text-center">
                        {item.person.receiptNo || "-"}
                      </td>

                      <td className="border border-gray-200 px-3 py-3 text-center">
                        {formatShortThaiDate(
                          item.person.receiptDate,
                        )}
                      </td>

                      <td className="border border-gray-200 px-3 py-3 text-center">

                        {item.person.priority ===
                          1 && (
                          <span className="inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-600">
                            ด่วน
                          </span>
                        )}

                      </td>

                    </tr>
                  ),
                )}

              </tbody>

              <tfoot>

                <tr className="bg-gray-50">

                  <td
                    colSpan={6}
                    className="border border-gray-200 px-3 py-3 text-right font-bold text-gray-700"
                  >
                    รวมทั้งหมด
                  </td>

                  <td className="border border-gray-200 px-3 py-3 text-center font-bold text-[#800020]">
                    {data.persons.length} คน
                  </td>

                </tr>

              </tfoot>

            </table>

          </div>

        </div>

        {/* ===================================================
            MOBILE / TABLET
            < 1200px
        =================================================== */}

        <div className="mt-4 flex flex-col gap-3 min-[1200px]:hidden">

          {data.persons.map(
            (item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >

                {/* Card Header */}

                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">

                  <div className="flex items-center gap-2">

                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#800020]/10 text-xs font-bold text-[#800020]">
                      {index + 1}
                    </span>

                    <span className="text-xs font-semibold text-gray-500">
                      รายการ
                    </span>

                  </div>

                  {item.person.priority ===
                    1 && (
                    <span className="rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-bold text-red-600">
                      ด่วน
                    </span>
                  )}

                </div>

                {/* Card Body */}

                <div className="space-y-3 p-4">

                  <div>

                    <p className="mb-1 text-[10px] font-semibold text-gray-400">
                      ชื่อ และ ชื่อสกุล
                    </p>

                    <p className="text-sm font-bold text-gray-800">
                      {item.person.fullName}
                    </p>

                  </div>

                  <div>

                    <p className="mb-1 text-[10px] font-semibold text-gray-400">
                      เรื่องที่ขออนุญาต
                    </p>

                    <p className="text-sm leading-6 text-gray-700">
                      {item.person.purpose || "-"}
                    </p>

                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-gray-50 p-3">

                      <p className="text-[10px] font-semibold text-gray-400">
                        เล่มที่
                      </p>

                      <p className="mt-1 text-sm font-bold text-gray-800">
                        {item.person.receiptBookNo || "-"}
                      </p>

                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">

                      <p className="text-[10px] font-semibold text-gray-400">
                        เลขที่
                      </p>

                      <p className="mt-1 text-sm font-bold text-gray-800">
                        {item.person.receiptNo || "-"}
                      </p>

                    </div>

                  </div>

                  <div className="rounded-xl bg-gray-50 p-3">

                    <p className="text-[10px] font-semibold text-gray-400">
                      ลงวันที่
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-700">
                      {formatShortThaiDate(
                        item.person.receiptDate,
                      )}
                    </p>

                  </div>

                </div>

              </div>
            ),
          )}

          {/* Total */}

          <div className="rounded-2xl bg-[#800020]/5 px-4 py-4 text-center">

            <span className="text-xs font-semibold text-gray-500">
              รวมทั้งหมด{" "}
            </span>

            <span className="text-base font-bold text-[#800020]">
              {data.persons.length}
            </span>

            <span className="text-xs font-semibold text-gray-500">
              {" "}คน
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}