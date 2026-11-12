import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import api from "../../api/axios";

interface Person {
  personId: string;
  fullName: string;
  citizenId?: string | null;
  purpose?: string | null;
  receiptBookNo?: string | null;
  receiptNo?: string | null;
  receiptDate?: string | null;
}

interface SubmissionPerson {
  id: string;
  submissionId: string;
  personId: string;
  person: Person | null;
}

interface StatusHistory {
  historyId: string;
  submissionId: string;
  oldStatus: number;
  newStatus: number;
  remark?: string | null;
  changedBy?: string | null;
  changedAt: string;
}

interface SubmissionData {
  submissionId: string;
  submissionNo?: string | null;
  submissionDate?: string | null;
  createdAt?: string | null;
  status: number;
  statusUpdatedAt?: string | null;
  persons?: SubmissionPerson[];
  statusHistories?: StatusHistory[];
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

interface ApiResponse<T> {
  data?: T;
}

const STATUS_LIST = [
  {
    value: 0,
    label: "รอส่ง ศพฐ.",
    description: "ยังไม่ได้เตรียมเอกสาร",
    className: "bg-slate-100 text-slate-700",
    dot: "bg-slate-500",
  },
  {
    value: 1,
    label: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
    description: "เตรียมหนังสือและเอกสารเรียบร้อยแล้ว",
    className: "bg-amber-100 text-amber-800",
    dot: "bg-amber-500",
  },
  {
    value: 2,
    label: "ส่ง ศพฐ. แล้ว",
    description: "ส่งเอกสารให้ ศพฐ. แล้ว",
    className: "bg-sky-100 text-sky-800",
    dot: "bg-sky-500",
  },
  {
    value: 3,
    label: "รับจาก ศพฐ. แล้ว",
    description: "ได้รับเอกสารกลับจาก ศพฐ. แล้ว",
    className: "bg-violet-100 text-violet-800",
    dot: "bg-violet-500",
  },
  {
    value: 4,
    label: "ส่งคืนต้นสังกัดแล้ว",
    description: "ดำเนินการเสร็จสิ้น",
    className: "bg-emerald-100 text-emerald-800",
    dot: "bg-emerald-500",
  },
];

function getStatusInfo(status: number) {
  return (
    STATUS_LIST.find((item) => item.value === Number(status)) ?? {
      value: status,
      label: "ไม่ทราบสถานะ",
      description: "-",
      className: "bg-slate-100 text-slate-700",
      dot: "bg-slate-500",
    }
  );
}

function formatDate(date?: string | null): string {
  if (!date) return "-";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) return date;

  return value.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(date?: string | null): string {
  if (!date) return "-";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) return date;

  return value.toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getErrorMessage(error: unknown): string | undefined {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return error instanceof Error ? error.message : undefined;
  }

  return error.response?.data?.error ?? error.response?.data?.message;
}

function getErrorStatus(error: unknown): number | undefined {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.status;
  }

  return undefined;
}

function normalizeSubmission(value: unknown): SubmissionData | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const response = value as Record<string, unknown>;
  const nestedData = response.data;

  const result =
    nestedData && typeof nestedData === "object"
      ? (nestedData as Record<string, unknown>)
      : response;

  if (
    typeof result.submissionId !== "string" ||
    result.submissionId.length === 0
  ) {
    return null;
  }

  const status = Number(result.status);

  if (!Number.isInteger(status) || status < 0 || status > 4) {
    return null;
  }

  return {
    submissionId: result.submissionId,
    submissionNo:
      typeof result.submissionNo === "string" ? result.submissionNo : null,
    submissionDate:
      typeof result.submissionDate === "string" ? result.submissionDate : null,
    createdAt: typeof result.createdAt === "string" ? result.createdAt : null,
    status,
    statusUpdatedAt:
      typeof result.statusUpdatedAt === "string"
        ? result.statusUpdatedAt
        : null,
    persons: Array.isArray(result.persons)
      ? (result.persons as SubmissionPerson[])
      : [],
    statusHistories: Array.isArray(result.statusHistories)
      ? (result.statusHistories as StatusHistory[])
      : [],
  };
}

export default function ForensicStatusPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [data, setData] = useState<SubmissionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!id) {
      setAuthorized(false);
      setLoading(false);
      return;
    }

    const globalAuthorized = sessionStorage.getItem("forensic_scan_authorized");
    const scannedId = sessionStorage.getItem("forensic_scan_id");
    const perIdAuthorized = sessionStorage.getItem(`forensic-scan-${id}`);

    const isAuthorized =
      globalAuthorized === "true" &&
      scannedId === id &&
      perIdAuthorized === "true";

    setAuthorized(isAuthorized);

    if (!isAuthorized) {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!authorized || !id) return;

    let cancelled = false;

    const loadData = async () => {
      try {
        setLoading(true);

        const response = await api.get<
          ApiResponse<SubmissionData> | SubmissionData
        >(`/forensic-status/${encodeURIComponent(id)}`);

        const result = normalizeSubmission(response.data);

        if (!result) {
          throw new Error("ไม่พบข้อมูลหรือรูปแบบข้อมูลไม่ถูกต้อง");
        }

        if (!cancelled) {
          setData(result);
        }
      } catch (error: unknown) {
        if (cancelled) return;

        const status = getErrorStatus(error);
        const message = getErrorMessage(error);

        if (status === 404) {
          await Swal.fire({
            icon: "error",
            title: "ไม่พบข้อมูล",
            text: "ไม่พบรายการส่ง ศพฐ. นี้ในระบบ",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#800020",
          });
        } else {
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: message || "ไม่สามารถโหลดข้อมูลได้",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#800020",
          });
        }

        setData(null);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      cancelled = true;
    };
  }, [authorized, id]);

  const updateStatus = async (newStatus: number) => {
    if (!id || !data || updating) return;

    const currentStatus = Number(data.status);

    if (currentStatus === 4) {
      await Swal.fire({
        icon: "info",
        title: "รายการเสร็จสิ้นแล้ว",
        text: "รายการนี้ส่งคืนต้นสังกัดแล้ว ไม่สามารถเปลี่ยนสถานะได้อีก",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });

      return;
    }

    if (
      !Number.isInteger(newStatus) ||
      newStatus < 0 ||
      newStatus > 4 ||
      currentStatus === newStatus
    ) {
      return;
    }

    const selectedStatus = getStatusInfo(newStatus);

    const confirm = await Swal.fire({
      icon: "question",
      title: "ยืนยันการเปลี่ยนสถานะ",
      html: `
        <div style="font-size:16px;line-height:1.8">
          สถานะปัจจุบัน
          <br>
          <strong>${getStatusInfo(currentStatus).label}</strong>
          <div style="margin:12px 0;color:#9ca3af">↓</div>
          เปลี่ยนเป็น
          <br>
          <strong style="color:#800020">
            ${selectedStatus.label}
          </strong>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#800020",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      setUpdating(true);

      const response = await api.patch<
        ApiResponse<SubmissionData> | SubmissionData
      >(`/forensic-status/${encodeURIComponent(id)}`, {
        status: newStatus,
      });

      const result = normalizeSubmission(response.data);

      if (!result) {
        throw new Error("Backend ไม่ได้ส่งข้อมูลกลับมาหรือข้อมูลไม่ถูกต้อง");
      }

      setData(result);

      await Swal.fire({
        icon: "success",
        title: "เปลี่ยนสถานะสำเร็จ",
        text: selectedStatus.label,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });
    } catch (error: unknown) {
      const status = getErrorStatus(error);
      const message = getErrorMessage(error);

      if (status === 404) {
        await Swal.fire({
          icon: "error",
          title: "ไม่พบข้อมูล",
          text: message || "ไม่พบรายการส่ง ศพฐ.",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#800020",
        });

        return;
      }

      if (status === 400) {
        await Swal.fire({
          icon: "warning",
          title: "ไม่สามารถเปลี่ยนสถานะได้",
          text: message || "ข้อมูลสถานะไม่ถูกต้อง",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#800020",
        });

        return;
      }

      if (status === 401 || status === 403) {
        await Swal.fire({
          icon: "warning",
          title: "ไม่มีสิทธิ์",
          text: "คุณไม่มีสิทธิ์เปลี่ยนสถานะรายการนี้",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#800020",
        });

        return;
      }

      await Swal.fire({
        icon: "error",
        title: "เปลี่ยนสถานะไม่สำเร็จ",
        text: message || "เกิดข้อผิดพลาดจากระบบ",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#f5f3f1] p-4 sm:p-6">
        <div className="mx-auto flex min-h-[75vh] max-w-lg items-center justify-center">
          <div className="w-full rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-50">
              <span className="text-4xl font-bold text-[#800020]">!</span>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a36b79]">
              Forensic Document
            </p>

            <h1 className="mt-2 text-xl font-bold text-slate-800">
              ไม่สามารถเข้าหน้านี้ได้
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              กรุณาเข้าสู่หน้า
              <br />
              <span className="font-semibold text-[#800020]">สแกน QR Code</span>
              <br />
              ผ่านระบบก่อน
            </p>

            <button
              type="button"
              onClick={() => navigate("/forensic-scan")}
              className="mt-6 w-full rounded-xl bg-[#800020] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#650019]"
            >
              ไปหน้าสแกน QR Code
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-3 block w-full rounded-xl bg-stone-100 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-stone-200"
            >
              กลับหน้าเดิม
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f3f1] p-6">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-[#800020]" />
            <p className="mt-4 text-sm font-medium text-slate-500">
              กำลังโหลดข้อมูล...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f5f3f1] p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
            <p className="text-slate-500">ไม่พบข้อมูล</p>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-5 rounded-xl bg-[#800020] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#650019]"
            >
              กลับหน้าเดิม
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentStatus = getStatusInfo(Number(data.status));
  const persons = data.persons ?? [];
  const histories = data.statusHistories ?? [];

  return (
    <div className="min-h-screen bg-[#f5f3f1] px-4 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative mb-5 overflow-hidden rounded-2xl bg-[#702034] px-6 py-7 text-white shadow-md sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border-[34px] border-white/[0.06]" />
          <div className="pointer-events-none absolute -bottom-24 right-52 h-48 w-48 rounded-full bg-[#c18a73]/20" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#d9b17c]" />
                <p className="text-[11px] font-bold tracking-[0.2em] text-rose-100/80">
                  FORENSIC SUBMISSION
                </p>
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                ตรวจสอบสถานะเอกสาร
              </h1>

              <p className="mt-2 text-sm text-rose-100/80">
                ติดตามความคืบหน้ารายการส่งตรวจ ศพฐ.
              </p>
            </div>

            <div className="relative min-w-[190px] rounded-xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
              <p className="text-[11px] text-rose-100/70">
                สถานะปัจจุบัน
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${currentStatus.dot}`} />
                <p className="text-sm font-bold">{currentStatus.label}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#d9b7bf] hover:text-[#800020]"
          >
            <span>←</span>
            กลับ
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-stone-100 px-5 py-5 sm:px-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8edef] text-[#800020]">
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
                <path d="M6 3h8l4 4v14H6z" />
                <path d="M14 3v5h4" />
                <path d="M9 12h6" />
                <path d="M9 16h6" />
              </svg>
            </div>

            <div>
              <h2 className="font-bold text-slate-800">ข้อมูลหนังสือนำส่ง</h2>
              <p className="mt-1 text-xs text-slate-400">
                รายละเอียดรายการส่งตรวจ
              </p>
            </div>
          </div>

          <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
            <div className="rounded-xl border border-[#eadde0] bg-[#fcf7f8] p-4">
              <p className="text-xs font-medium text-slate-500">
                เลขหนังสือนำส่ง
              </p>
              <p className="mt-2 break-words text-lg font-bold text-[#800020]">
                {data.submissionNo || "-"}
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-[#faf9f7] p-4">
              <p className="text-xs font-medium text-slate-500">
                วันที่สร้างรายการ
              </p>
              <p className="mt-2 font-semibold text-slate-800">
                {formatDate(data.submissionDate || data.createdAt)}
              </p>
            </div>

            <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-4">
              <p className="text-xs font-medium text-slate-500">
                จำนวนบุคคล
              </p>
              <p className="mt-2 text-lg font-bold text-sky-700">
                {persons.length} คน
              </p>
            </div>
          </div>

          <div className="mx-5 mb-5 rounded-lg bg-stone-50 px-4 py-3 sm:mx-6 sm:mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Submission ID
            </p>
            <p className="mt-1 break-all font-mono text-xs text-slate-500">
              {data.submissionId}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400">
                สถานะปัจจุบัน
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${currentStatus.dot}`} />
                <span
                  className={`rounded-lg px-4 py-2 text-sm font-bold ${currentStatus.className}`}
                >
                  {currentStatus.label}
                </span>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                {currentStatus.description}
              </p>
            </div>

            {data.statusUpdatedAt && (
              <div className="rounded-xl bg-stone-50 px-4 py-3 sm:text-right">
                <p className="text-[11px] text-slate-400">อัปเดตล่าสุด</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  {formatDateTime(data.statusUpdatedAt)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-800">
                ความคืบหน้าการดำเนินงาน
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                ลำดับขั้นตอนการส่งตรวจและรับเอกสาร
              </p>
            </div>
            <span className="rounded-lg bg-[#f8edef] px-3 py-1.5 text-xs font-bold text-[#800020]">
              ขั้นตอน {Number(data.status) + 1}/5
            </span>
          </div>

          <div className="space-y-0">
            {STATUS_LIST.map((item, index) => {
              const isCurrent = Number(data.status) === item.value;
              const isDone = Number(data.status) > item.value;

              return (
                <div key={item.value} className="relative flex gap-4">
                  {index !== STATUS_LIST.length - 1 && (
                    <div
                      className={`absolute left-[15px] top-8 h-[calc(100%-8px)] w-0.5 ${
                        isDone ? "bg-[#a65b70]" : "bg-stone-200"
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                      isCurrent
                        ? "bg-[#800020] text-white ring-4 ring-[#800020]/10"
                        : isDone
                          ? "bg-[#a65b70] text-white"
                          : "border-2 border-stone-200 bg-white text-slate-400"
                    }`}
                  >
                    {isDone ? "✓" : index + 1}
                  </div>

                  <div className="pb-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <p
                        className={`text-sm font-bold ${
                          isCurrent
                            ? "text-[#800020]"
                            : isDone
                              ? "text-slate-700"
                              : "text-slate-400"
                        }`}
                      >
                        {item.label}
                      </p>

                      {isCurrent && (
                        <span className="rounded-md bg-[#f8edef] px-2 py-0.5 text-[10px] font-bold text-[#800020]">
                          สถานะปัจจุบัน
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {Number(data.status) !== 4 && (
          <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="font-bold text-slate-800">เปลี่ยนสถานะรายการ</h2>
              <p className="mt-1 text-xs text-slate-400">
                เลือกสถานะใหม่เพื่อบันทึกความคืบหน้าการดำเนินงาน
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {STATUS_LIST.map((item) => {
                const isCurrent = item.value === Number(data.status);

                return (
                  <button
                    key={item.value}
                    type="button"
                    disabled={updating || isCurrent}
                    onClick={() => void updateStatus(item.value)}
                    className={`min-h-[62px] rounded-xl border px-3 py-3 text-xs font-bold transition ${
                      isCurrent
                        ? "cursor-not-allowed border-[#eadde0] bg-[#f8edef] text-[#800020]"
                        : "border-stone-200 bg-white text-slate-600 hover:border-[#c99ba7] hover:bg-[#fcf7f8] hover:text-[#800020] active:scale-[0.98]"
                    } disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    {updating && isCurrent
                      ? "กำลังดำเนินการ..."
                      : item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {Number(data.status) === 4 && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50">
            <div className="flex flex-col items-center px-6 py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <span className="text-3xl font-bold">✓</span>
              </div>

              <h2 className="mt-4 text-xl font-bold text-emerald-800">
                ดำเนินการเสร็จสิ้น
              </h2>
              <p className="mt-2 text-sm text-emerald-700">
                รายการนี้ส่งคืนต้นสังกัดแล้ว
              </p>
              <p className="mt-1 text-xs text-emerald-600/80">
                ไม่สามารถเปลี่ยนสถานะของรายการนี้ได้อีก
              </p>
            </div>
          </div>
        )}

        <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 px-5 py-5 sm:px-6">
            <div>
              <h2 className="font-bold text-slate-800">รายชื่อบุคคล</h2>
              <p className="mt-1 text-xs text-slate-400">
                บุคคลที่อยู่ในหนังสือนำส่งฉบับนี้
              </p>
            </div>

            <span className="rounded-lg bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700">
              ทั้งหมด {persons.length} คน
            </span>
          </div>

          <div className="overflow-x-auto p-4 sm:p-5">
            <table className="w-full min-w-[850px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="bg-[#702034] text-white">
                  <th className="w-[70px] rounded-tl-lg px-3 py-3 text-center font-semibold">
                    ลำดับ
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    ชื่อ - นามสกุล
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    เลขบัตรประชาชน
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    เรื่อง
                  </th>
                  <th className="w-[100px] px-3 py-3 text-center font-semibold">
                    เล่มที่
                  </th>
                  <th className="w-[100px] rounded-tr-lg px-3 py-3 text-center font-semibold">
                    เลขที่
                  </th>
                </tr>
              </thead>

              <tbody>
                {persons.length > 0 ? (
                  persons.map((item, index) => {
                    const person = item.person;

                    return (
                      <tr
                        key={item.id || item.personId || index}
                        className={`transition hover:bg-[#fcf7f8] ${
                          index % 2 === 0 ? "bg-white" : "bg-stone-50/80"
                        }`}
                      >
                        <td className="border-b border-stone-100 px-3 py-3 text-center font-semibold text-slate-400">
                          {index + 1}
                        </td>
                        <td className="border-b border-stone-100 px-4 py-3 font-semibold text-slate-800">
                          {person?.fullName || "-"}
                        </td>
                        <td className="border-b border-stone-100 px-4 py-3 text-slate-600">
                          {person?.citizenId || "-"}
                        </td>
                        <td className="max-w-[350px] whitespace-normal break-words border-b border-stone-100 px-4 py-3 text-slate-600">
                          {person?.purpose || "-"}
                        </td>
                        <td className="border-b border-stone-100 px-3 py-3 text-center font-semibold text-slate-700">
                          {person?.receiptBookNo || "-"}
                        </td>
                        <td className="border-b border-stone-100 px-3 py-3 text-center font-semibold text-slate-700">
                          {person?.receiptNo || "-"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-slate-400"
                    >
                      ไม่มีข้อมูลบุคคล
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="font-bold text-slate-800">
              ประวัติการเปลี่ยนสถานะ
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              ประวัติการดำเนินการของรายการนี้
            </p>
          </div>

          {histories.length > 0 ? (
            <div className="space-y-3">
              {histories.map((history) => {
                const oldStatus = getStatusInfo(Number(history.oldStatus));
                const newStatus = getStatusInfo(Number(history.newStatus));

                return (
                  <div
                    key={history.historyId}
                    className="rounded-xl border border-stone-200 bg-[#faf9f7] p-4 transition hover:border-[#ddc3ca]"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-md px-3 py-1.5 text-xs font-bold ${oldStatus.className}`}
                          >
                            {oldStatus.label}
                          </span>

                          <span className="text-sm text-slate-400">→</span>

                          <span
                            className={`rounded-md px-3 py-1.5 text-xs font-bold ${newStatus.className}`}
                          >
                            {newStatus.label}
                          </span>
                        </div>

                        {history.remark && (
                          <p className="mt-3 text-xs leading-5 text-slate-600">
                            หมายเหตุ: {history.remark}
                          </p>
                        )}

                        {history.changedBy && (
                          <p className="mt-1 text-xs text-slate-400">
                            ผู้ดำเนินการ: {history.changedBy}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 rounded-lg bg-white px-3 py-2 text-xs text-slate-500 sm:text-right">
                        {formatDateTime(history.changedAt)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-10 text-center">
              <p className="text-sm text-slate-400">
                ยังไม่มีประวัติการเปลี่ยนสถานะ
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center pb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-[#c99ba7] hover:bg-[#fcf7f8] hover:text-[#800020]"
          >
            ← กลับหน้าเดิม
          </button>
        </div>

        <div className="border-t border-stone-200 py-5 text-center">
          <p className="text-[11px] font-medium tracking-wide text-slate-400">
            ระบบจัดการเอกสารส่งตรวจ ศพฐ.
          </p>
        </div>
      </div>
    </div>
  );
}