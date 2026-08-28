// src/pages/Forensic/ForensicSubmissionListPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Swal from "sweetalert2";

export default function ForensicSubmissionListPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);

  // Load data
  useEffect(() => {
    fetchData();

    const handleResize = () => setIsDesktop(window.innerWidth >= 1200);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = async () => {
  try {
    setLoading(true);

    const res = await api.get("/forensic-submission");

    console.log("FORENSIC SUBMISSION RESPONSE:", res.data);

    const result = res?.data?.data ?? res?.data;

    setData(Array.isArray(result) ? result : []);
  } catch (err) {
    console.error("LOAD FORENSIC SUBMISSION ERROR:", err);
    setData([]);
  } finally {
    setLoading(false);
  }
};

  // Date
  const formatThaiDate = (dateString: string) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Delete
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "ต้องการลบรายการนี้ใช่หรือไม่?",
      text: "เมื่อลบแล้วจะไม่สามารถกู้คืนข้อมูลได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบรายการ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/forensic-submission/${id}`);
      setData((prev) => prev.filter((item) => item.submissionId !== id));

      await Swal.fire({
        title: "ลบข้อมูลสำเร็จ",
        text: "ข้อมูลถูกลบเรียบร้อยแล้ว",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);

      await Swal.fire({
        title: "ลบข้อมูลไม่สำเร็จ",
        text: "เกิดข้อผิดพลาดขณะลบข้อมูล",
        icon: "error",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });
    }
  };

  // Loading
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
      <div className="mx-auto w-full max-w-[1400px] px-4">
        {/* Header */}
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
                  รายการหนังสือ ศพฐ.
                </h1>
                <p className="mt-0.5 text-xs text-white/70 sm:text-sm">
                  รายการหนังสือนำส่งตรวจประวัติ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
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
                <p className="text-xs text-gray-400">จำนวนหนังสือ</p>
                <p className="text-xl font-bold text-gray-800">
                  {data.length}
                  <span className="ml-1 text-sm font-medium text-gray-400">
                    รายการ
                  </span>
                </p>
              </div>
            </div>
          </div>

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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>

              <div>
                <p className="text-xs text-gray-400">จำนวนบุคคลทั้งหมด</p>
                <p className="text-xl font-bold text-gray-800">
                  {data.reduce(
                    (total, item) => total + (item.persons?.length || 0),
                    0,
                  )}
                  <span className="ml-1 text-sm font-medium text-gray-400">
                    คน
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty */}
        {data.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <svg
                width="26"
                height="26"
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

            <h2 className="text-base font-bold text-gray-700">
              ยังไม่มีรายการหนังสือ
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              ยังไม่มีข้อมูลหนังสือส่ง ศพฐ.
            </p>
          </div>
        ) : isDesktop ? (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="w-[80px] border border-gray-700 px-4 py-3 text-center font-semibold">
                      ลำดับ
                    </th>
                    <th className="border border-gray-700 px-4 py-3 text-center font-semibold">
                      เลขหนังสือ
                    </th>
                    <th className="border border-gray-700 px-4 py-3 text-center font-semibold">
                      วันที่สร้าง
                    </th>
                    <th className="w-[150px] border border-gray-700 px-4 py-3 text-center font-semibold">
                      จำนวนรายชื่อ
                    </th>
                    <th className="w-[130px] border border-gray-700 px-4 py-3 text-center font-semibold">
                      จัดการ
                    </th>
                    <th className="w-[100px] border border-gray-700 px-4 py-3 text-center font-semibold">
                      ลบ
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={item.submissionId}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-600">
                        {index + 1}
                      </td>

                      <td className="border border-gray-200 px-4 py-3 text-center">
                        <span className="font-semibold text-[#800020]">
                          {item.submissionNo || "-"}
                        </span>
                      </td>

                      <td className="border border-gray-200 px-4 py-3 text-center text-gray-700">
                        {formatThaiDate(item.submissionDate)}
                      </td>

                      <td className="border border-gray-200 px-4 py-3 text-center">
                        <span className="inline-flex min-w-[50px] justify-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          {item.persons?.length || 0} คน
                        </span>
                      </td>

                      <td className="border border-gray-200 px-4 py-3 text-center">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700 active:scale-95"
                          onClick={() =>
                            navigate(
                              `/forensic-submission/pdf/${item.submissionId}`,
                            )
                          }
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          ดู PDF
                        </button>
                      </td>

                      <td className="border border-gray-200 px-4 py-3 text-center">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-700 active:scale-95"
                          onClick={() => handleDelete(item.submissionId)}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14H6L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4h6v2" />
                          </svg>
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {data.map((item, index) => (
              <div
                key={item.submissionId}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#800020]/10 text-xs font-bold text-[#800020]">
                      {index + 1}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      หนังสือส่ง ศพฐ.
                    </span>
                  </div>

                  <span className="rounded-full bg-[#800020]/10 px-3 py-1 text-[10px] font-bold text-[#800020]">
                    รายการที่ {index + 1}
                  </span>
                </div>

                <div className="space-y-4 p-4">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold text-gray-400">
                      เลขหนังสือ
                    </p>
                    <p className="text-base font-bold text-[#800020]">
                      {item.submissionNo || "-"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-[10px] font-semibold text-gray-400">
                        วันที่สร้าง
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-700">
                        {formatThaiDate(item.submissionDate)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="text-[10px] font-semibold text-gray-400">
                        จำนวนรายชื่อ
                      </p>
                      <p className="mt-1 text-sm font-bold text-blue-600">
                        {item.persons?.length || 0} คน
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                    <button
                      type="button"
                      className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                      onClick={() =>
                        navigate(
                          `/forensic-submission/pdf/${item.submissionId}`,
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
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      ดู PDF
                    </button>

                    <button
                      type="button"
                      className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 active:scale-[0.98]"
                      onClick={() => handleDelete(item.submissionId)}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                      ลบรายการ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
