import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Users,
  CalendarDays,
  Eye,
  Trash2,
  ClipboardList,
  FileSearch,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import api from "../../api/axios";
import Swal from "sweetalert2";

interface ForensicSubmission {
  submissionId: string;
  submissionNo?: string | null;
  submissionDate?: string | null;
  persons?: unknown[];
}

export default function ForensicSubmissionListPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<ForensicSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);

    const loadData = async () => {
      try {
        const res = await api.get("/forensic-submission");
        const result = res?.data?.data ?? res?.data;
        setData(Array.isArray(result) ? result : []);
      } catch (error: unknown) {
        console.error("LOAD FORENSIC SUBMISSION ERROR:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    void loadData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const formatThaiDate = (dateString?: string | null) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const totalPersons = data.reduce(
    (total, item) => total + (item.persons?.length ?? 0),
    0,
  );

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "ต้องการลบรายการนี้ใช่หรือไม่?",
      text: "เมื่อลบแล้วจะไม่สามารถกู้คืนข้อมูลได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบรายการ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
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
    } catch (error: unknown) {
      console.error("DELETE FORENSIC SUBMISSION ERROR:", error);

      await Swal.fire({
        title: "ลบข้อมูลไม่สำเร็จ",
        text: "เกิดข้อผิดพลาดขณะลบข้อมูล",
        icon: "error",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });
    }
  };

  if (loading) {
    return (
      <div className="main-content flex min-h-screen items-center justify-center bg-[#f5f6fa] px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
            <div className="h-7 w-7 animate-spin rounded-full border-[3px] border-gray-200 border-t-[#861b36]" />
          </div>
          <p className="text-sm font-semibold text-gray-500">
            กำลังโหลดข้อมูล...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content min-h-screen bg-[#f5f6fa] px-3 py-5 sm:px-5 lg:px-7">
      <div className="mx-auto w-full max-w-[1450px]">
        {/* Header */}
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-[#781b35] shadow-lg shadow-[#781b35]/10">
          <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[35px] border-white/[0.06]" />
          <div className="absolute -bottom-24 right-48 h-52 w-52 rounded-full bg-[#a83c57]/30" />

          <div className="relative flex flex-col justify-between gap-5 px-5 py-6 sm:flex-row sm:items-center sm:px-8 sm:py-7">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white shadow-inner">
                <FileText size={29} strokeWidth={1.7} />
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-md bg-white/15 px-2 py-1 text-[10px] font-bold tracking-wider text-white/90">
                    FORENSIC DOCUMENTS
                  </span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  รายการหนังสือ ศพฐ.
                </h1>
                <p className="mt-1 text-xs text-white/70 sm:text-sm">
                  จัดการหนังสือนำส่งตรวจประวัติและข้อมูลบุคคล
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 sm:self-center">
              <ShieldCheck size={18} className="text-[#f5d5a5]" />
              <span className="text-xs font-medium text-white/90">
                ระบบงานธุรการ
              </span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl border border-[#e9e5ed] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="absolute -right-5 -top-8 h-28 w-28 rounded-full bg-[#f2e8f1] transition group-hover:scale-110" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  จำนวนหนังสือทั้งหมด
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#76213c]">
                    {data.length.toLocaleString("th-TH")}
                  </span>
                  <span className="text-sm text-gray-400">รายการ</span>
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  หนังสือที่บันทึกไว้ในระบบ
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5eaf1] text-[#8b3156]">
                <ClipboardList size={27} strokeWidth={1.7} />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-[#e3ebf4] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="absolute -right-5 -top-8 h-28 w-28 rounded-full bg-[#e8f1fb] transition group-hover:scale-110" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  จำนวนบุคคลทั้งหมด
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#25619a]">
                    {totalPersons.toLocaleString("th-TH")}
                  </span>
                  <span className="text-sm text-gray-400">คน</span>
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  รายชื่อบุคคลในหนังสือทั้งหมด
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf2fb] text-[#3479b9]">
                <Users size={27} strokeWidth={1.7} />
              </div>
            </div>
          </div>
        </div>

        {/* Section heading */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-base font-bold text-gray-800">
              <span className="h-5 w-1 rounded-full bg-[#861b36]" />
              ข้อมูลหนังสือนำส่ง
            </h2>
            <p className="ml-3 mt-1 text-xs text-gray-400">
              รายการหนังสือที่สร้างไว้ในระบบ
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500">
            ทั้งหมด {data.length.toLocaleString("th-TH")} รายการ
          </div>
        </div>

        {/* Empty state */}
        {data.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f7edf0] text-[#963c56]">
              <FileSearch size={31} strokeWidth={1.6} />
            </div>
            <h3 className="text-base font-bold text-gray-700">
              ยังไม่มีรายการหนังสือ
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              เมื่อมีการสร้างหนังสือนำส่งตรวจประวัติ รายการจะแสดงที่หน้านี้
            </p>
          </div>
        ) : isDesktop ? (
          /* Desktop table */
          <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#f8f5f6] text-gray-600">
                    <th className="w-[85px] border-b border-gray-200 px-4 py-4 text-center font-bold">
                      ลำดับ
                    </th>
                    <th className="border-b border-gray-200 px-5 py-4 text-left font-bold">
                      เลขหนังสือ
                    </th>
                    <th className="border-b border-gray-200 px-5 py-4 text-center font-bold">
                      วันที่สร้าง
                    </th>
                    <th className="w-[160px] border-b border-gray-200 px-4 py-4 text-center font-bold">
                      จำนวนรายชื่อ
                    </th>
                    <th className="w-[150px] border-b border-gray-200 px-4 py-4 text-center font-bold">
                      เปิดเอกสาร
                    </th>
                    <th className="w-[110px] border-b border-gray-200 px-4 py-4 text-center font-bold">
                      จัดการ
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={item.submissionId}
                      className="group transition-colors hover:bg-[#fcf8f9]"
                    >
                      <td className="border-b border-gray-100 px-4 py-4 text-center">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500 group-hover:bg-[#f5e8ed] group-hover:text-[#861b36]">
                          {index + 1}
                        </span>
                      </td>

                      <td className="border-b border-gray-100 px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7edf0] text-[#8b3150]">
                            <FileText size={19} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">
                              {item.submissionNo || "-"}
                            </p>
                            <p className="mt-0.5 text-[11px] text-gray-400">
                              หนังสือนำส่งตรวจประวัติ
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="border-b border-gray-100 px-5 py-4 text-center">
                        <span className="inline-flex items-center gap-2 text-gray-600">
                          <CalendarDays size={15} className="text-gray-400" />
                          {formatThaiDate(item.submissionDate)}
                        </span>
                      </td>

                      <td className="border-b border-gray-100 px-4 py-4 text-center">
                        <span className="inline-flex min-w-[76px] items-center justify-center gap-1.5 rounded-lg bg-[#edf4fc] px-3 py-2 text-xs font-bold text-[#28669f]">
                          <Users size={14} />
                          {item.persons?.length ?? 0} คน
                        </span>
                      </td>

                      <td className="border-b border-gray-100 px-4 py-4 text-center">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#286da8] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#1d588d] active:scale-95"
                          onClick={() =>
                            navigate(
                              `/forensic-submission/pdf/${item.submissionId}`,
                            )
                          }
                        >
                          <Eye size={15} />
                          ดู PDF
                          <ArrowUpRight size={13} />
                        </button>
                      </td>

                      <td className="border-b border-gray-100 px-4 py-4 text-center">
                        <button
                          type="button"
                          title="ลบรายการ"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff0f0] text-[#d14343] transition hover:bg-[#d14343] hover:text-white active:scale-95"
                          onClick={() => handleDelete(item.submissionId)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 bg-[#fbfbfc] px-5 py-3">
              <p className="text-xs text-gray-400">
                แสดงรายการหนังสือนำส่งทั้งหมด
              </p>
              <p className="text-xs font-semibold text-gray-500">
                {data.length.toLocaleString("th-TH")} รายการ
              </p>
            </div>
          </div>
        ) : (
          /* Mobile cards */
          <div className="flex flex-col gap-4">
            {data.map((item, index) => (
              <div
                key={item.submissionId}
                className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between border-b border-gray-100 bg-[#faf7f8] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f1e3e9] text-xs font-bold text-[#861b36]">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-gray-700">
                        หนังสือนำส่ง ศพฐ.
                      </p>
                      <p className="text-[10px] text-gray-400">
                        รายการที่ {index + 1}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#eaf2fb] px-3 py-1.5 text-[10px] font-bold text-[#28669f]">
                    {item.persons?.length ?? 0} คน
                  </span>
                </div>

                <div className="p-4">
                  <p className="mb-1 text-[11px] font-medium text-gray-400">
                    เลขหนังสือ
                  </p>
                  <p className="break-words text-base font-bold text-[#861b36]">
                    {item.submissionNo || "-"}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#f7f8fa] p-3">
                      <div className="mb-2 flex items-center gap-1.5 text-gray-400">
                        <CalendarDays size={13} />
                        <span className="text-[10px] font-medium">
                          วันที่สร้าง
                        </span>
                      </div>
                      <p className="text-xs font-semibold leading-relaxed text-gray-700">
                        {formatThaiDate(item.submissionDate)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#f0f5fb] p-3">
                      <div className="mb-2 flex items-center gap-1.5 text-[#6b91b6]">
                        <Users size={13} />
                        <span className="text-[10px] font-medium">
                          จำนวนรายชื่อ
                        </span>
                      </div>
                      <p className="text-sm font-bold text-[#28669f]">
                        {item.persons?.length ?? 0} คน
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="flex min-h-[45px] items-center justify-center gap-2 rounded-xl bg-[#286da8] px-3 py-2.5 text-sm font-bold text-white transition hover:bg-[#1d588d] active:scale-[0.98]"
                      onClick={() =>
                        navigate(
                          `/forensic-submission/pdf/${item.submissionId}`,
                        )
                      }
                    >
                      <Eye size={17} />
                      ดู PDF
                    </button>

                    <button
                      type="button"
                      className="flex min-h-[45px] items-center justify-center gap-2 rounded-xl border border-[#f2dada] bg-[#fff5f5] px-3 py-2.5 text-sm font-bold text-[#c74444] transition hover:bg-[#c74444] hover:text-white active:scale-[0.98]"
                      onClick={() => handleDelete(item.submissionId)}
                    >
                      <Trash2 size={16} />
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
