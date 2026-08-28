// src/pages/Forensic/ForensicStatusPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";

/* ======================================================
   TYPES
====================================================== */

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

/* ======================================================
   STATUS
====================================================== */

const STATUS_LIST = [
  {
    value: 0,
    label: "รอส่ง ศพฐ.",
    description: "ยังไม่ได้เตรียมเอกสาร",
    className: "bg-gray-100 text-gray-700",
    dot: "bg-gray-500",
  },
  {
    value: 1,
    label: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
    description: "เตรียมหนังสือและเอกสารเรียบร้อยแล้ว",
    className: "bg-yellow-100 text-yellow-700",
    dot: "bg-yellow-500",
  },
  {
    value: 2,
    label: "ส่ง ศพฐ. แล้ว",
    description: "ส่งเอกสารให้ ศพฐ. แล้ว",
    className: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
  {
    value: 3,
    label: "รับจาก ศพฐ. แล้ว",
    description: "ได้รับเอกสารกลับจาก ศพฐ. แล้ว",
    className: "bg-purple-100 text-purple-700",
    dot: "bg-purple-500",
  },
  {
    value: 4,
    label: "ส่งคืนต้นสังกัดแล้ว",
    description: "ดำเนินการเสร็จสิ้น",
    className: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
];

/* ======================================================
   STATUS HELPERS
====================================================== */

function getStatusInfo(status: number) {
  return (
    STATUS_LIST.find((item) => item.value === Number(status)) || {
      value: status,
      label: "ไม่ทราบสถานะ",
      description: "-",
      className: "bg-gray-100 text-gray-700",
      dot: "bg-gray-500",
    }
  );
}

/* ======================================================
   DATE
====================================================== */

function formatDate(date?: string | null) {
  if (!date) {
    return "-";
  }

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return date;
  }

  return d.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(date?: string | null) {
  if (!date) {
    return "-";
  }

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return date;
  }

  return d.toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/* ======================================================
   PAGE
====================================================== */

export default function ForensicStatusPage() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [data, setData] = useState<SubmissionData | null>(null);

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(false);

  const [authorized, setAuthorized] = useState(false);

  /* ====================================================
     CHECK QR AUTHORIZATION
  ==================================================== */

  useEffect(() => {
    if (!id) {
      setAuthorized(false);
      setLoading(false);
      return;
    }

    const globalAuthorized = sessionStorage.getItem(
      "forensic_scan_authorized",
    );

    const scannedId = sessionStorage.getItem("forensic_scan_id");

    const perIdAuthorized = sessionStorage.getItem(
      `forensic-scan-${id}`,
    );

    console.log("================================");
    console.log("FORENSIC STATUS AUTH CHECK");
    console.log("URL ID:", id);
    console.log("Global Authorized:", globalAuthorized);
    console.log("Scanned ID:", scannedId);
    console.log("Per ID Authorized:", perIdAuthorized);
    console.log("================================");

    const isAuthorized =
      globalAuthorized === "true" &&
      scannedId === id &&
      perIdAuthorized === "true";

    setAuthorized(isAuthorized);

    if (!isAuthorized) {
      setLoading(false);
    }
  }, [id]);

  /* ====================================================
     LOAD DATA
  ==================================================== */

  useEffect(() => {
    if (!authorized || !id) {
      return;
    }

    let cancelled = false;

    const loadData = async () => {
      try {
        setLoading(true);

        console.log(
          "GET FORENSIC STATUS:",
          `/forensic-status/${id}`,
        );

        const response = await api.get(
          `/forensic-status/${encodeURIComponent(id)}`,
        );

        console.log("FORENSIC STATUS RESPONSE:", response.data);

        const result =
          response?.data?.data ?? response?.data;

        if (!result) {
          throw new Error("ไม่พบข้อมูล");
        }

        if (!cancelled) {
          setData({
            ...result,
            status: Number(result.status),
            persons: Array.isArray(result.persons)
              ? result.persons
              : [],
            statusHistories: Array.isArray(
              result.statusHistories,
            )
              ? result.statusHistories
              : [],
          });
        }
      } catch (error: any) {
        if (cancelled) {
          return;
        }

        console.error(
          "LOAD FORENSIC STATUS ERROR:",
          error,
        );

        const status = error?.response?.status;

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
            text:
              error?.response?.data?.error ||
              "ไม่สามารถโหลดข้อมูลได้",
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

    loadData();

    return () => {
      cancelled = true;
    };
  }, [authorized, id]);

  /* ====================================================
     UPDATE STATUS
  ==================================================== */

  const updateStatus = async (newStatus: number) => {
    if (!id || !data || updating) {
      return;
    }

    const currentStatus = Number(data.status);

    /* --------------------------------------------------
       STATUS 4 LOCK
    -------------------------------------------------- */

    if (currentStatus === 4) {
      await Swal.fire({
        icon: "info",
        title: "รายการเสร็จสิ้นแล้ว",
        text:
          "รายการนี้ส่งคืนต้นสังกัดแล้ว ไม่สามารถเปลี่ยนสถานะได้อีก",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });

      return;
    }

    /* --------------------------------------------------
       SAME STATUS
    -------------------------------------------------- */

    if (currentStatus === newStatus) {
      return;
    }

    const selectedStatus = getStatusInfo(newStatus);

    /* --------------------------------------------------
       CONFIRM
    -------------------------------------------------- */

    const confirm = await Swal.fire({
      icon: "question",
      title: "ยืนยันการเปลี่ยนสถานะ",
      html: `
        <div style="font-size:16px;line-height:1.8">
          สถานะปัจจุบัน
          <br>
          <strong>${getStatusInfo(currentStatus).label}</strong>

          <div style="margin:12px 0;color:#9ca3af">
            ↓
          </div>

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

    if (!confirm.isConfirmed) {
      return;
    }

    try {
      setUpdating(true);

      console.log(
        "PATCH FORENSIC STATUS:",
        id,
        newStatus,
      );

      const response = await api.patch(
        `/forensic-status/${encodeURIComponent(id)}`,
        {
          status: newStatus,
        },
      );

      console.log(
        "PATCH RESPONSE:",
        response.data,
      );

      const result =
        response?.data?.data ?? response?.data;

      if (!result) {
        throw new Error(
          "Backend ไม่ได้ส่งข้อมูลกลับมา",
        );
      }

      setData({
        ...result,
        status: Number(result.status),
        persons: Array.isArray(result.persons)
          ? result.persons
          : [],
        statusHistories: Array.isArray(
          result.statusHistories,
        )
          ? result.statusHistories
          : [],
      });

      await Swal.fire({
        icon: "success",
        title: "เปลี่ยนสถานะสำเร็จ",
        text: selectedStatus.label,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });
    } catch (error: any) {
      console.error(
        "UPDATE FORENSIC STATUS ERROR:",
        error,
      );

      const status = error?.response?.status;

      if (status === 404) {
        await Swal.fire({
          icon: "error",
          title: "ไม่พบข้อมูล",
          text:
            error?.response?.data?.error ||
            "ไม่พบรายการส่ง ศพฐ.",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#800020",
        });

        return;
      }

      if (status === 400) {
        await Swal.fire({
          icon: "warning",
          title: "ไม่สามารถเปลี่ยนสถานะได้",
          text:
            error?.response?.data?.error ||
            "ข้อมูลสถานะไม่ถูกต้อง",
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
        text:
          error?.response?.data?.error ||
          "เกิดข้อผิดพลาดจากระบบ",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });
    } finally {
      setUpdating(false);
    }
  };

  /* ====================================================
     NOT AUTHORIZED
  ==================================================== */

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
        <div className="mx-auto flex min-h-[70vh] max-w-lg items-center justify-center">
          <div className="w-full rounded-3xl bg-white p-8 text-center shadow-lg">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <span className="text-4xl font-bold text-red-500">
                !
              </span>
            </div>

            <h1 className="text-xl font-bold text-gray-800">
              ไม่สามารถเข้าหน้านี้ได้
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              กรุณาเข้าสู่หน้า
              <br />

              <span className="font-semibold text-[#800020]">
                สแกน QR Code
              </span>

              <br />

              ผ่านระบบก่อน
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/forensic-scan")
              }
              className="mt-6 w-full rounded-xl bg-[#800020] px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-[#660019]"
            >
              ไปหน้าสแกน QR Code
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-3 block w-full rounded-xl bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
            >
              กลับหน้าเดิม
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ====================================================
     LOADING
  ==================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#800020]" />

            <p className="mt-4 text-sm text-gray-500">
              กำลังโหลดข้อมูล...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ====================================================
     NO DATA
  ==================================================== */

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-8 text-center shadow">
            <p className="text-gray-500">
              ไม่พบข้อมูล
            </p>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-5 rounded-xl bg-[#800020] px-6 py-3 text-sm font-semibold text-white"
            >
              กลับหน้าเดิม
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentStatus = getStatusInfo(
    Number(data.status),
  );

  const persons = Array.isArray(data.persons)
    ? data.persons
    : [];

  const histories = Array.isArray(
    data.statusHistories,
  )
    ? data.statusHistories
    : [];

  /* ====================================================
     UI
  ==================================================== */

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-5 rounded-3xl bg-gradient-to-r from-[#650017] to-[#800020] p-5 text-white shadow-lg sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-white/60">
                FORENSIC SUBMISSION
              </p>

              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                ตรวจสอบสถานะเอกสาร
              </h1>

              <p className="mt-2 text-sm text-white/70">
                ตรวจสอบความคืบหน้าของรายการส่งตรวจ ศพฐ.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4 text-center backdrop-blur">
              <p className="text-[10px] text-white/60">
                สถานะปัจจุบัน
              </p>

              <p className="mt-1 text-sm font-bold">
                {currentStatus.label}
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            BACK
        ================================================= */}

        <div className="mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            ← กลับ
          </button>
        </div>

        {/* =================================================
            DOCUMENT INFO
        ================================================= */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#800020]/10 text-[#800020]">
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
              <h2 className="font-bold text-gray-800">
                ข้อมูลหนังสือนำส่ง
              </h2>

              <p className="text-xs text-gray-400">
                รายละเอียดรายการส่งตรวจ
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-400">
                เลขหนังสือนำส่ง
              </p>

              <p className="mt-1 break-words font-bold text-[#800020]">
                {data.submissionNo || "-"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-400">
                วันที่สร้างรายการ
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {formatDate(
                  data.submissionDate ||
                    data.createdAt,
                )}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-400">
                จำนวนบุคคล
              </p>

              <p className="mt-1 font-bold text-blue-600">
                {persons.length} คน
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-gray-100 bg-white p-4">
            <p className="text-xs text-gray-400">
              Submission ID
            </p>

            <p className="mt-1 break-all font-mono text-xs text-gray-600">
              {data.submissionId}
            </p>
          </div>
        </div>

        {/* =================================================
            CURRENT STATUS
        ================================================= */}

        <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400">
                สถานะปัจจุบัน
              </p>

              <div className="mt-2 flex items-center gap-3">
                <span
                  className={`h-3 w-3 rounded-full ${currentStatus.dot}`}
                />

                <span
                  className={`rounded-full px-4 py-2 text-sm font-bold ${currentStatus.className}`}
                >
                  {currentStatus.label}
                </span>
              </div>

              <p className="mt-3 text-xs text-gray-400">
                {currentStatus.description}
              </p>
            </div>

            {data.statusUpdatedAt && (
              <div className="rounded-xl bg-gray-50 px-4 py-3 text-left sm:text-right">
                <p className="text-[10px] text-gray-400">
                  อัปเดตล่าสุด
                </p>

                <p className="mt-1 text-xs font-semibold text-gray-600">
                  {formatDateTime(
                    data.statusUpdatedAt,
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            STATUS TIMELINE
        ================================================= */}

        <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-gray-800">
            ความคืบหน้าสถานะ
          </h2>

          <div className="mt-6">
            {STATUS_LIST.map((item, index) => {
              const isCurrent =
                Number(data.status) === item.value;

              const isDone =
                Number(data.status) > item.value;

              return (
                <div
                  key={item.value}
                  className="relative flex gap-4"
                >
                  {index !==
                    STATUS_LIST.length - 1 && (
                    <div
                      className={`absolute left-[15px] top-8 h-[calc(100%-8px)] w-0.5 ${
                        isDone
                          ? "bg-[#800020]"
                          : "bg-gray-200"
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      isCurrent
                        ? "bg-[#800020] text-white ring-4 ring-[#800020]/10"
                        : isDone
                          ? "bg-[#800020] text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isDone ? "✓" : index + 1}
                  </div>

                  <div className="pb-7">
                    <p
                      className={`text-sm font-bold ${
                        isCurrent
                          ? "text-[#800020]"
                          : isDone
                            ? "text-gray-700"
                            : "text-gray-400"
                      }`}
                    >
                      {item.label}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================
            CHANGE STATUS
        ================================================= */}

        {Number(data.status) !== 4 && (
          <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4">
              <h2 className="font-bold text-gray-800">
                เปลี่ยนสถานะ
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                เลือกสถานะใหม่สำหรับรายการนี้
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {STATUS_LIST.map((item) => {
                const isCurrent =
                  item.value === Number(data.status);

                return (
                  <button
                    key={item.value}
                    type="button"
                    disabled={
                      updating || isCurrent
                    }
                    onClick={() =>
                      updateStatus(item.value)
                    }
                    className={`rounded-xl px-3 py-3 text-xs font-bold transition ${
                      isCurrent
                        ? "cursor-not-allowed bg-gray-200 text-gray-400"
                        : "bg-[#800020] text-white hover:bg-[#650017] active:scale-[0.98]"
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

        {/* =================================================
            COMPLETED
        ================================================= */}

        {Number(data.status) === 4 && (
          <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-3xl font-bold text-green-600">
                ✓
              </span>
            </div>

            <h2 className="mt-4 text-xl font-bold text-green-700">
              ดำเนินการเสร็จสิ้น
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              รายการนี้ส่งคืนต้นสังกัดแล้ว
            </p>

            <p className="mt-1 text-xs text-gray-500">
              ไม่สามารถเปลี่ยนสถานะของรายการนี้ได้อีก
            </p>
          </div>
        )}

        {/* =================================================
            PERSONS
        ================================================= */}

        <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-800">
                รายชื่อบุคคล
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                บุคคลที่อยู่ในหนังสือนำส่งฉบับนี้
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
              {persons.length} คน
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-sm">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="w-[70px] border border-gray-700 px-3 py-3 text-center">
                    ลำดับ
                  </th>

                  <th className="border border-gray-700 px-4 py-3 text-left">
                    ชื่อ - นามสกุล
                  </th>

                  <th className="border border-gray-700 px-4 py-3 text-left">
                    เลขบัตรประชาชน
                  </th>

                  <th className="border border-gray-700 px-4 py-3 text-left">
                    เรื่อง
                  </th>

                  <th className="w-[100px] border border-gray-700 px-3 py-3 text-center">
                    เล่มที่
                  </th>

                  <th className="w-[100px] border border-gray-700 px-3 py-3 text-center">
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
                        key={
                          item.id ||
                          item.personId ||
                          index
                        }
                        className={`border-b border-gray-100 ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50/70"
                        }`}
                      >
                        <td className="border border-gray-200 px-3 py-3 text-center font-semibold text-gray-500">
                          {index + 1}
                        </td>

                        <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-800">
                          {person?.fullName || "-"}
                        </td>

                        <td className="border border-gray-200 px-4 py-3 text-gray-700">
                          {person?.citizenId || "-"}
                        </td>

                        <td className="max-w-[350px] whitespace-normal break-words border border-gray-200 px-4 py-3 text-gray-700">
                          {person?.purpose || "-"}
                        </td>

                        <td className="border border-gray-200 px-3 py-3 text-center font-bold text-gray-700">
                          {person?.receiptBookNo ||
                            "-"}
                        </td>

                        <td className="border border-gray-200 px-3 py-3 text-center font-bold text-gray-700">
                          {person?.receiptNo || "-"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="border border-gray-200 px-6 py-10 text-center text-sm text-gray-400"
                    >
                      ไม่มีข้อมูลบุคคล
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* =================================================
            HISTORY
        ================================================= */}

        <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4">
            <h2 className="font-bold text-gray-800">
              ประวัติการเปลี่ยนสถานะ
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              ประวัติการดำเนินการของรายการนี้
            </p>
          </div>

          {histories.length > 0 ? (
            <div className="space-y-3">
              {histories.map((history) => {
                const oldStatus = getStatusInfo(
                  Number(history.oldStatus),
                );

                const newStatus = getStatusInfo(
                  Number(history.newStatus),
                );

                return (
                  <div
                    key={history.historyId}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${oldStatus.className}`}
                          >
                            {oldStatus.label}
                          </span>

                          <span className="text-gray-400">
                            →
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${newStatus.className}`}
                          >
                            {newStatus.label}
                          </span>
                        </div>

                        {history.remark && (
                          <p className="mt-2 text-xs text-gray-500">
                            หมายเหตุ:{" "}
                            {history.remark}
                          </p>
                        )}

                        {history.changedBy && (
                          <p className="mt-1 text-xs text-gray-400">
                            ผู้ดำเนินการ:{" "}
                            {history.changedBy}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 text-xs text-gray-400 sm:text-right">
                        {formatDateTime(
                          history.changedAt,
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
              <p className="text-sm text-gray-400">
                ยังไม่มีประวัติการเปลี่ยนสถานะ
              </p>
            </div>
          )}
        </div>

        {/* =================================================
            BACK
        ================================================= */}

        <div className="mt-6 pb-8 text-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl bg-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-300"
          >
            ← กลับหน้าเดิม
          </button>
        </div>
      </div>
    </div>
  );
}