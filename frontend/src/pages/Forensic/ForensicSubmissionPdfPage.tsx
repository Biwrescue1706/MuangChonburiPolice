import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FileText,
  Users,
  ReceiptText,
  Download,
  AlertCircle,
  CalendarDays,
  Hash,
  ClipboardList,
  ArrowDownToLine,
  ShieldCheck,
  LoaderCircle,
} from "lucide-react";
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
  id?: string;
  person: Person;
}

interface Submission {
  submissionId: string;
  submissionNo?: string;
  submissionDate: string;
  persons: SubmissionPerson[];
}

interface ApiResponse {
  success?: boolean;
  data?: Submission;
  error?: string;
}

export default function ForensicSubmissionPdfPage() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<"forensic" | "payment" | null>(
    null,
  );
  const [data, setData] = useState<Submission | null>(null);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      if (!id) {
        setData(null);
        setError("ไม่พบรหัสหนังสือนำส่ง");
        return;
      }

      const res = await api.get<ApiResponse | Submission>(
        `/forensic-submission/${encodeURIComponent(id)}`,
      );

      const responseData = res.data;

      const submission: Submission | undefined =
        "submissionId" in responseData ? responseData : responseData.data;

      if (!submission?.submissionId) {
        throw new Error("ไม่พบ Submission ID");
      }

      if (!Array.isArray(submission.persons)) {
        throw new Error("ไม่พบรายชื่อบุคคล");
      }

      const persons = [...submission.persons].sort((a, b) => {
        const bookA = Number(a?.person?.receiptBookNo || 0);
        const bookB = Number(b?.person?.receiptBookNo || 0);

        if (bookA !== bookB) return bookA - bookB;

        const receiptA = Number(a?.person?.receiptNo || 0);
        const receiptB = Number(b?.person?.receiptNo || 0);

        return receiptA - receiptB;
      });

      setData({
        ...submission,
        persons,
      });
    } catch (error: unknown) {
      console.error("Load forensic submission error:", error);

      if (axios.isAxiosError(error)) {
        console.error("Response:", error.response?.data);
      }

      setData(null);
      setError(
        error instanceof Error ? error.message : "ไม่สามารถโหลดข้อมูลได้",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const handleGeneratePdf = async () => {
    if (!data || generating) return;

    try {
      setGenerating("forensic");

      await generateForensicPdf({
        submissionId: data.submissionId,
        submissionNo: data.submissionNo,
        submissionDate: new Date(data.submissionDate).toLocaleDateString(
          "th-TH",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
        ),
        persons: data.persons.map((item) => ({
          fullName: item.person.fullName,
          purpose: item.person.purpose,
          receiptBookNo: item.person.receiptBookNo,
          receiptNo: item.person.receiptNo,
          receiptDate: item.person.receiptDate,
          priority: item.person.priority,
        })),
      });
    } catch (error: unknown) {
      console.error("Generate forensic PDF error:", error);
      window.alert("ไม่สามารถสร้างเอกสาร PDF ได้");
    } finally {
      setGenerating(null);
    }
  };

  const handleGeneratePdf2 = async () => {
    if (!data || generating) return;

    try {
      setGenerating("payment");

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
    } catch (error: unknown) {
      console.error("Generate payment PDF error:", error);
      window.alert("ไม่สามารถสร้างเอกสาร PDF ได้");
    } finally {
      setGenerating(null);
    }
  };

  const formatShortThaiDate = (dateString?: string) => {
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

    if (parts.length !== 3) return dateString;

    const [day, month, year] = parts;

    return `${day} ${months[month] || month} ${year.slice(-2)}`;
  };

  if (loading) {
    return (
      <div className="main-content min-h-screen bg-[#f4f6f9] px-4 py-10">
        <div className="flex min-h-[55vh] flex-col items-center justify-center">
          <LoaderCircle className="mb-4 h-10 w-10 animate-spin text-[#800020]" />
          <p className="text-sm font-semibold text-gray-600">
            กำลังโหลดข้อมูลหนังสือนำส่ง...
          </p>
          <p className="mt-1 text-xs text-gray-400">กรุณารอสักครู่</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="main-content min-h-screen bg-[#f4f6f9] px-4 py-10">
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertCircle size={28} />
          </div>

          <h2 className="text-lg font-bold text-gray-800">
            ไม่พบข้อมูลหนังสือนำส่ง
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {error || "ไม่พบข้อมูลที่ต้องการ กรุณาตรวจสอบอีกครั้ง"}
          </p>

          <button
            onClick={() => void fetchData()}
            className="mt-5 rounded-lg bg-[#800020] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#650019]"
          >
            โหลดข้อมูลอีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  const urgentCount = data.persons.filter(
    (item) => item.person.priority === 1,
  ).length;

  return (
    <div className="main-content min-h-screen bg-[#f4f6f9] px-3 py-5 sm:px-5 lg:px-7">
      <div className="mx-auto w-full max-w-[1450px]">
        <div className="mb-6 overflow-hidden rounded-xl bg-[#75152b] shadow-sm">
          <div className="relative px-5 py-6 sm:px-7 sm:py-7">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-white/[0.04]" />

            <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                  <FileText size={29} strokeWidth={1.7} />
                </div>

                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded bg-white/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                      FORENSIC DOCUMENT
                    </span>
                  </div>

                  <h1 className="text-xl font-bold text-white sm:text-2xl">
                    หนังสือนำส่งตรวจประวัติ
                  </h1>

                  <p className="mt-1 text-xs text-white/70 sm:text-sm">
                    ระบบจัดการเอกสารงานตรวจประวัติบุคคล
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-white/15 bg-black/10 px-4 py-3 sm:min-w-[200px]">
                <p className="text-xs text-white/60">เลขที่หนังสือนำส่ง</p>

                <p className="mt-1 text-lg font-bold text-white">
                  {data.submissionNo || "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="h-1 bg-[#d4a44c]" />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Users size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500">จำนวนรายชื่อทั้งหมด</p>
              <p className="mt-1 text-2xl font-bold text-gray-800">
                {data.persons.length}
                <span className="ml-1 text-sm font-medium text-gray-400">
                  คน
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
              <AlertCircle size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500">รายการเร่งด่วน</p>
              <p className="mt-1 text-2xl font-bold text-gray-800">
                {urgentCount}
                <span className="ml-1 text-sm font-medium text-gray-400">
                  รายการ
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
              <ClipboardList size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500">เลขหนังสือนำส่ง</p>
              <p className="mt-1 truncate text-base font-bold text-gray-800">
                {data.submissionNo || "-"}
              </p>
            </div>
          </div>
        </div>

        <section className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Download size={19} />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-800">
                สร้างเอกสาร PDF
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                เลือกรูปแบบเอกสารที่ต้องการจัดทำ
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5">
            <button
              type="button"
              onClick={handleGeneratePdf}
              disabled={generating !== null}
              className="group flex items-center gap-4 rounded-xl border border-[#ead4d9] bg-[#fff9fa] p-4 text-left transition hover:border-[#800020] hover:bg-[#fff1f3] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#800020] text-white transition group-hover:bg-[#650019]">
                {generating === "forensic" ? (
                  <LoaderCircle className="animate-spin" size={23} />
                ) : (
                  <FileText size={23} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[#75152b]">
                  ดาวน์โหลด PDF ส่ง ศพฐ.
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  เอกสารหนังสือนำส่งตรวจประวัติ
                </p>
              </div>

              <ArrowDownToLine className="shrink-0 text-[#800020]" size={19} />
            </button>

            <button
              type="button"
              onClick={handleGeneratePdf2}
              disabled={generating !== null}
              className="group flex items-center gap-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-left transition hover:border-blue-400 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition group-hover:bg-blue-700">
                {generating === "payment" ? (
                  <LoaderCircle className="animate-spin" size={23} />
                ) : (
                  <ReceiptText size={23} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-blue-800">
                  ดาวน์โหลด PDF ส่งเงิน
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  เอกสารรายละเอียดรายการรับเงิน
                </p>
              </div>

              <ArrowDownToLine className="shrink-0 text-blue-600" size={19} />
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <ClipboardList size={19} />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-800">
                  รายละเอียดรายชื่อบุคคล
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  ข้อมูลบุคคลตามหนังสือนำส่ง
                </p>
              </div>
            </div>

            <span className="w-fit rounded-md bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
              ทั้งหมด {data.persons.length} รายการ
            </span>
          </div>

          <div className="hidden overflow-x-auto min-[1200px]:block">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#f7f8fa] text-gray-600">
                  <th className="w-[75px] border-b border-gray-200 px-4 py-4 text-center font-semibold">
                    ลำดับ
                  </th>
                  <th className="min-w-[200px] border-b border-gray-200 px-4 py-4 text-left font-semibold">
                    ชื่อ - นามสกุล
                  </th>
                  <th className="min-w-[200px] border-b border-gray-200 px-4 py-4 text-left font-semibold">
                    เรื่องที่ขออนุญาต
                  </th>
                  <th className="w-[100px] border-b border-gray-200 px-4 py-4 text-center font-semibold">
                    เล่มที่
                  </th>
                  <th className="w-[100px] border-b border-gray-200 px-4 py-4 text-center font-semibold">
                    เลขที่
                  </th>
                  <th className="w-[130px] border-b border-gray-200 px-4 py-4 text-center font-semibold">
                    ลงวันที่
                  </th>
                  <th className="w-[100px] border-b border-gray-200 px-4 py-4 text-center font-semibold">
                    หมายเหตุ
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.persons.map((item, index) => (
                  <tr
                    key={item.person.personId || index}
                    className="transition-colors hover:bg-[#faf8f9]"
                  >
                    <td className="border-b border-gray-100 px-4 py-4 text-center text-gray-500">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="border-b border-gray-100 px-4 py-4 font-semibold text-gray-800">
                      {item.person.fullName}
                    </td>
                    <td className="border-b border-gray-100 px-4 py-4 text-gray-600">
                      {item.person.purpose || "-"}
                    </td>
                    <td className="border-b border-gray-100 px-4 py-4 text-center text-gray-700">
                      {item.person.receiptBookNo || "-"}
                    </td>
                    <td className="border-b border-gray-100 px-4 py-4 text-center text-gray-700">
                      {item.person.receiptNo || "-"}
                    </td>
                    <td className="border-b border-gray-100 px-4 py-4 text-center text-gray-600">
                      {formatShortThaiDate(item.person.receiptDate)}
                    </td>
                    <td className="border-b border-gray-100 px-4 py-4 text-center">
                      {item.person.priority === 1 ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                          <AlertCircle size={13} />
                          ด่วน
                        </span>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="bg-[#f7f8fa]">
                  <td
                    colSpan={6}
                    className="border-t border-gray-200 px-4 py-4 text-right font-bold text-gray-600"
                  >
                    รวมจำนวนรายชื่อทั้งหมด
                  </td>
                  <td className="border-t border-gray-200 px-4 py-4 text-center font-bold text-[#800020]">
                    {data.persons.length} คน
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="divide-y divide-gray-100 min-[1200px]:hidden">
            {data.persons.map((item, index) => (
              <div
                key={item.person.personId || index}
                className="p-4 transition hover:bg-gray-50 sm:p-5"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f9edf0] text-sm font-bold text-[#800020]">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold text-gray-400">
                        ชื่อ - นามสกุล
                      </p>
                      <p className="mt-0.5 break-words text-sm font-bold text-gray-800">
                        {item.person.fullName}
                      </p>
                    </div>
                  </div>

                  {item.person.priority === 1 && (
                    <span className="shrink-0 rounded-md bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-600">
                      ด่วน
                    </span>
                  )}
                </div>

                <div className="mb-3 rounded-lg bg-gray-50 p-3">
                  <p className="mb-1 text-[10px] font-semibold text-gray-400">
                    เรื่องที่ขออนุญาต
                  </p>
                  <p className="text-sm leading-6 text-gray-700">
                    {item.person.purpose || "-"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <div className="rounded-lg border border-gray-100 p-3">
                    <div className="mb-1 flex items-center gap-1 text-gray-400">
                      <Hash size={12} />
                      <span className="text-[10px]">เล่มที่</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800">
                      {item.person.receiptBookNo || "-"}
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-100 p-3">
                    <div className="mb-1 flex items-center gap-1 text-gray-400">
                      <ReceiptText size={12} />
                      <span className="text-[10px]">เลขที่</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800">
                      {item.person.receiptNo || "-"}
                    </p>
                  </div>

                  <div className="col-span-2 rounded-lg border border-gray-100 p-3 sm:col-span-1">
                    <div className="mb-1 flex items-center gap-1 text-gray-400">
                      <CalendarDays size={12} />
                      <span className="text-[10px]">ลงวันที่</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800">
                      {formatShortThaiDate(item.person.receiptDate)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-2 border-t border-gray-100 bg-[#fafbfc] px-5 py-4 sm:flex-row">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck size={15} className="text-teal-600" />
              ข้อมูลจากระบบจัดการหนังสือนำส่ง
            </div>
            <p className="text-xs font-bold text-gray-700">
              รวมทั้งหมด{" "}
              <span className="text-[#800020]">{data.persons.length}</span> คน
            </p>
          </div>
        </section>

        <div className="mt-5 text-center text-[11px] text-gray-400">
          ระบบงานตรวจประวัติบุคคล · Forensic Management System
        </div>
      </div>
    </div>
  );
}
