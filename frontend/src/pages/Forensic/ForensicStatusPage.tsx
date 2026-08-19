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
  citizenId?: string;
  purpose?: string;
}

interface SubmissionPerson {
  id: string;
  submissionId: string;
  personId: string;
  person: Person;
}

interface StatusHistory {
  historyId: string;
  oldStatus: number;
  newStatus: number;
  remark?: string;
  changedBy?: string;
  changedAt: string;
}

interface SubmissionData {
  submissionId: string;
  submissionNo?: string;
  submissionDate?: string;
  createdAt?: string;
  status: number;
  statusUpdatedAt?: string;
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
  },
  {
    value: 1,
    label: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
  },
  {
    value: 2,
    label: "ส่ง ศพฐ. แล้ว",
  },
  {
    value: 3,
    label: "รับจาก ศพฐ. แล้ว",
  },
  {
    value: 4,
    label: "ส่งคืนต้นสังกัดแล้ว",
  },
];

/* ======================================================
   DATE
====================================================== */

function formatDate(date?: string) {
  if (!date) {
    return "-";
  }

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return date;
  }

  return d.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatDateTime(date?: string) {
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
   STATUS LABEL
====================================================== */

function getStatusLabel(status: number) {
  return STATUS_LIST.find((item) => item.value === status)?.label || "-";
}

/* ======================================================
   STATUS CLASS
====================================================== */

function getStatusClass(status: number) {
  switch (status) {
    case 0:
      return "bg-gray-100 text-gray-700";

    case 1:
      return "bg-yellow-100 text-yellow-700";

    case 2:
      return "bg-blue-100 text-blue-700";

    case 3:
      return "bg-purple-100 text-purple-700";

    case 4:
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

/* ======================================================
   PAGE
====================================================== */

export default function ForensicStatusPage() {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const [data, setData] = useState<SubmissionData | null>(null);

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(false);

  const [authorized, setAuthorized] = useState(false);

  /* ====================================================
     ตรวจสอบสิทธิ์จาก Scanner
  ==================================================== */

  useEffect(() => {
    if (!id) {
      console.log("ไม่มี Submission ID");

      setAuthorized(false);
      setLoading(false);

      return;
    }

    const globalAuthorized = sessionStorage.getItem("forensic_scan_authorized");

    const scannedId = sessionStorage.getItem("forensic_scan_id");

    const perIdAuthorized = sessionStorage.getItem(`forensic-scan-${id}`);

    console.log("================================");
    console.log("FORENSIC STATUS AUTH CHECK");
    console.log("URL ID:", id);
    console.log("Global Authorized:", globalAuthorized);
    console.log("Scanned ID:", scannedId);
    console.log("Per ID Authorized:", perIdAuthorized);
    console.log("================================");

    if (
      globalAuthorized === "true" &&
      scannedId === id &&
      perIdAuthorized === "true"
    ) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
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

    const loadData = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/forensic-status/${id}`);

        const result = response?.data?.data ?? response?.data;

        if (!result) {
          throw new Error("ไม่พบข้อมูล");
        }

        console.log("FORENSIC DATA:", result);

        setData(result);
      } catch (error: any) {
        console.error("Load forensic status error:", error);

        const status = error?.response?.status;

        if (status === 404) {
          await Swal.fire({
            icon: "error",
            title: "ไม่พบข้อมูล",
            text: "ไม่พบข้อมูลเอกสารนี้ในระบบ",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#800020",
          });
        } else if (status === 401) {
          await Swal.fire({
            icon: "warning",
            title: "ไม่มีสิทธิ์เข้าถึง",
            text: "หน้านี้สำหรับเจ้าหน้าที่ที่ดูแลเท่านั้น",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#800020",
          });
        } else {
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: error?.response?.data?.error || "ไม่สามารถโหลดข้อมูลได้",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#800020",
          });
        }

        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [authorized, id]);

  /* ====================================================
     NOT AUTHORIZED
  ==================================================== */

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
        <div className="mx-auto flex min-h-[70vh] max-w-lg items-center justify-center">
          <div className="w-full rounded-3xl bg-white p-8 text-center shadow-lg">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <span className="text-4xl font-bold text-red-500">!</span>
            </div>

            <h1 className="text-xl font-bold text-gray-800">
              ไม่สามารถเข้าหน้านี้ได้
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              กรุณาเข้าสู่หน้า
              <br />
              <span className="font-semibold text-[#800020]">สแกน QR Code</span>
              <br />
              ผ่านระบบก่อน
            </p>

            <button
              type="button"
              onClick={() => navigate("/forensic-scan")}
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

            <p className="mt-4 text-sm text-gray-500">กำลังโหลดข้อมูล...</p>
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
            <p className="text-gray-500">ไม่พบข้อมูล</p>

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

  /* ====================================================
     UPDATE STATUS
  ==================================================== */

  const updateStatus = async (newStatus: number) => {
    if (data.status === 4) {
      await Swal.fire({
        icon: "info",
        title: "รายการเสร็จสิ้นแล้ว",
        text: "รายการนี้ส่งคืนต้นสังกัดแล้ว ไม่สามารถเปลี่ยนสถานะได้อีก",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });

      return;
    }

    const selected = STATUS_LIST.find((item) => item.value === newStatus);

    if (!selected) {
      return;
    }

    if (newStatus === data.status) {
      return;
    }

    const result = await Swal.fire({
      icon: "question",
      title: "ยืนยันการเปลี่ยนสถานะ",
      html: `
        <div style="font-size:16px">
          ต้องการเปลี่ยนสถานะเป็น
          <br/>
          <strong>${selected.label}</strong>
          <br/>
          ใช่หรือไม่?
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#800020",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setUpdating(true);

      const response = await api.patch(`/forensic-status/${id}`, {
        status: newStatus,
      });

      const resultData = response?.data?.data ?? response?.data;

      setData(resultData);

      await Swal.fire({
        icon: "success",
        title: "เปลี่ยนสถานะสำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error: any) {
      console.error("Update status error:", error);

      if (error?.response?.status === 401) {
        await Swal.fire({
          icon: "warning",
          title: "กรุณาเข้าสู่ระบบ",
          text: "หน้านี้สำหรับเจ้าหน้าที่ที่ดูแลเท่านั้น",
          confirmButtonText: "เข้าสู่ระบบ",
          confirmButtonColor: "#800020",
        });

        navigate("/");

        return;
      }

      await Swal.fire({
        icon: "error",
        title: "ไม่สามารถเปลี่ยนสถานะได้",
        text: error?.response?.data?.error || "เกิดข้อผิดพลาด",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });
    } finally {
      setUpdating(false);
    }
  };

  /* ====================================================
     UI
  ==================================================== */

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow transition hover:bg-gray-50"
          >
            ← กลับ
          </button>

          <h1 className="text-xl font-bold text-gray-800">
            ตรวจสอบสถานะเอกสาร
          </h1>

          <div />
        </div>

        {/* =================================================
            DOCUMENT INFO
        ================================================= */}

        <div className="rounded-2xl bg-white p-5 shadow">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">เลขที่ส่งตรวจ</p>

              <p className="mt-1 font-semibold text-gray-800">
                {data.submissionNo || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">วันที่ส่งตรวจ</p>

              <p className="mt-1 font-semibold text-gray-800">
                {formatDate(data.submissionDate)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Submission ID</p>

              <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                {data.submissionId}
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            CURRENT STATUS
        ================================================= */}

        <div className="mt-5 rounded-2xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">สถานะปัจจุบัน</p>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span
              className={`w-fit rounded-full px-5 py-2 text-sm font-bold ${getStatusClass(
                data.status,
              )}`}
            >
              {getStatusLabel(data.status)}
            </span>

            {data.status === 4 && (
              <span className="text-sm font-semibold text-green-600">
                ✓ ดำเนินการเสร็จสิ้นแล้ว
              </span>
            )}
          </div>

          {data.statusUpdatedAt && (
            <p className="mt-3 text-xs text-gray-400">
              อัปเดตล่าสุด: {formatDateTime(data.statusUpdatedAt)}
            </p>
          )}
        </div>

        {/* =================================================
            STATUS CHANGE
        ================================================= */}

        {data.status !== 4 && (
          <div className="mt-5 rounded-2xl bg-white p-5 shadow">
            <h2 className="font-bold text-gray-800">เปลี่ยนสถานะ</h2>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {STATUS_LIST.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  disabled={updating || item.value === data.status}
                  onClick={() => updateStatus(item.value)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    item.value === data.status
                      ? "cursor-not-allowed bg-gray-200 text-gray-400"
                      : "bg-[#800020] text-white hover:bg-[#660019]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* =================================================
            STATUS 4
        ================================================= */}

        {data.status === 4 && (
          <div className="mt-5 rounded-2xl bg-white p-5 shadow">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <span className="text-3xl text-green-600">✓</span>
              </div>

              <h2 className="text-xl font-bold text-green-700">
                ดำเนินการเสร็จสิ้น
              </h2>

              <p className="mt-2 text-gray-600">รายการนี้ส่งคืนต้นสังกัดแล้ว</p>

              <p className="mt-1 text-sm text-gray-500">
                ไม่สามารถเปลี่ยนสถานะของรายการนี้ได้อีก
              </p>
            </div>
          </div>
        )}

        {/* =================================================
            PERSONS
        ================================================= */}

        <div className="mt-5 rounded-2xl bg-white p-5 shadow">
          <h2 className="font-bold text-gray-800">รายชื่อบุคคล</h2>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm">
                  <th className="border p-3">ลำดับ</th>

                  <th className="border p-3">ชื่อ - นามสกุล</th>

                  <th className="border p-3">เลขบัตรประชาชน</th>

                  <th className="border p-3">เรื่อง</th>
                </tr>
              </thead>

              <tbody>
                {data.persons && data.persons.length > 0 ? (
                  data.persons.map((item, index) => {
                    const person = item.person;

                    return (
                      <tr key={item.id} className="text-sm">
                        <td className="border p-3 text-center">{index + 1}</td>

                        <td className="border p-3">
                          {person?.fullName || "-"}
                        </td>

                        <td className="border p-3">
                          {person?.citizenId || "-"}
                        </td>

                        <td className="border p-3">{person?.purpose || "-"}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="border p-6 text-center text-sm text-gray-400"
                    >
                      ไม่มีข้อมูล
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* =================================================
            STATUS HISTORY
        ================================================= */}

        <div className="mt-5 rounded-2xl bg-white p-5 shadow">
          <h2 className="font-bold text-gray-800">ประวัติการเปลี่ยนสถานะ</h2>

          <div className="mt-4 space-y-3">
            {data.statusHistories && data.statusHistories.length > 0 ? (
              data.statusHistories.map((history) => (
                <div
                  key={history.historyId}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {getStatusLabel(history.oldStatus)}

                        {" → "}

                        {getStatusLabel(history.newStatus)}
                      </p>

                      {history.remark && (
                        <p className="mt-1 text-sm text-gray-500">
                          หมายเหตุ: {history.remark}
                        </p>
                      )}
                    </div>

                    <div className="text-xs text-gray-400">
                      {formatDateTime(history.changedAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">ยังไม่มีประวัติ</p>
            )}
          </div>
        </div>

        {/* =================================================
            BACK
        ================================================= */}

        <div className="mt-6 pb-6 text-center">
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
