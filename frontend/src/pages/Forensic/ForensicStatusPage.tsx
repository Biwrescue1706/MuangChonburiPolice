// src/pages/Forensic/ForensicStatusPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../api/axios";

interface Person {
  personId: string;
  fullName: string;
  citizenId?: string;
  purpose?: string;
  status: number;
}

interface StatusHistory {
  historyId: string;
  oldStatus: number;
  newStatus: number;
  remark?: string | null;
  changedBy?: string | null;
  changedAt: string;
}

interface Submission {
  submissionId: string;
  submissionNo?: string | null;
  submissionDate: string;
  status: number;
  statusName: string;
  statusUpdatedAt?: string | null;

  persons: {
    id: string;
    person: Person;
  }[];

  statusHistories: StatusHistory[];
}

const STATUS_LIST = [
  {
    status: 0,
    name: "รอส่ง ศพฐ.",
  },
  {
    status: 1,
    name: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
  },
  {
    status: 2,
    name: "ส่ง ศพฐ. แล้ว",
  },
  {
    status: 3,
    name: "รับจาก ศพฐ. แล้ว",
  },
  {
    status: 4,
    name: "ส่งคืนต้นสังกัดแล้ว",
  },
];

function formatDate(date?: string | null) {
  if (!date) return "-";

  return new Date(date).toLocaleString("th-TH", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

function getStatusName(status: number) {
  return (
    STATUS_LIST.find((item) => item.status === status)?.name || "ไม่ทราบสถานะ"
  );
}

export default function ForensicStatusPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [data, setData] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [changing, setChanging] = useState(false);
  const [error, setError] = useState("");
  const [remark, setRemark] = useState("");

  /* =========================================================
      LOAD DATA
  ========================================================= */

  async function loadData() {
    if (!id) return;

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`/forensic-status/${id}`);

      setData(response.data.data);
    } catch (err: any) {
      console.error("FORENSIC STATUS ERROR:", err);

      if (err?.response?.status === 401) {
        setError("หน้านี้สำหรับเจ้าหน้าที่ที่ดูแลเท่านั้น");
        return;
      }

      setError(err?.response?.data?.error || "ไม่สามารถโหลดข้อมูลได้");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [id]);

  /* =========================================================
      CHANGE STATUS
  ========================================================= */

  async function changeStatus(status: number) {
    if (!data) return;

    // ถ้าสถานะ 4 แล้ว ห้ามเปลี่ยนอีก
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

    if (status === data.status) return;

    const confirm = await Swal.fire({
      icon: "question",
      title: "ยืนยันการเปลี่ยนสถานะ",
      html: `
        <div style="font-size:16px">
          ต้องการเปลี่ยนสถานะเป็น
          <br/>
          <strong>${getStatusName(status)}</strong>
          ใช่หรือไม่?
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#800020",
      cancelButtonColor: "#6b7280",
    });

    if (!confirm.isConfirmed) return;

    try {
      setChanging(true);

      const response = await axios.patch(
        `/forensic-status/${data.submissionId}/status`,
        {
          status,
          remark: remark.trim() || null,
        },
      );

      setData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          status: response.data.data.status,
          statusName: response.data.data.statusName,
          statusUpdatedAt: response.data.data.statusUpdatedAt,
        };
      });

      setRemark("");

      await loadData();

      await Swal.fire({
        icon: "success",
        title: "เปลี่ยนสถานะสำเร็จ",
        text: response.data?.message || "",
        confirmButtonColor: "#800020",
      });
    } catch (err: any) {
      console.error("CHANGE STATUS ERROR:", err);

      if (err?.response?.status === 401) {
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
        text: err?.response?.data?.error || "เกิดข้อผิดพลาด",
        confirmButtonColor: "#800020",
      });
    } finally {
      setChanging(false);
    }
  }

  /* =========================================================
      LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="animate-spin h-10 w-10 border-4 border-gray-200 border-t-[#800020] rounded-full mx-auto mb-4" />

          <p className="text-gray-600">กำลังตรวจสอบสิทธิ์และโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  /* =========================================================
      NO LOGIN / NO DATA
  ========================================================= */

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-4xl text-red-700">!</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            ไม่สามารถเข้าถึงข้อมูล
          </h1>

          <p className="text-gray-500 mb-6">{error || "ไม่พบรายการส่งตรวจ"}</p>

          {error === "หน้านี้สำหรับเจ้าหน้าที่ที่ดูแลเท่านั้น" && (
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full bg-[#800020] hover:bg-[#660019] text-white font-semibold py-3 px-5 rounded-xl transition"
            >
              เข้าสู่ระบบเจ้าหน้าที่
            </button>
          )}
        </div>
      </div>
    );
  }

  /* =========================================================
      PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-gray-700
              shadow-sm
              transition
              hover:bg-gray-100
              hover:text-[#800020]
            "
          >
            <span className="text-lg">←</span>
            กลับ
          </button>
        </div>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-[#800020] px-6 py-6 text-white">
            <p className="text-sm opacity-80">ระบบติดตามการส่งตรวจลายนิ้วมือ</p>

            <h1 className="text-2xl md:text-3xl font-bold mt-1">
              สถานะการส่งตรวจ ศพฐ.
            </h1>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">เลขที่ส่งตรวจ</p>

                <p className="font-bold text-lg text-gray-800">
                  {data.submissionNo || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">วันที่ส่งรายการ</p>

                <p className="font-medium text-gray-800">
                  {formatDate(data.submissionDate)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">สถานะปัจจุบัน</p>

                <p className="font-bold text-[#800020]">{data.statusName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            STATUS TIMELINE
        ===================================================== */}

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            สถานะการดำเนินการ
          </h2>

          <div className="space-y-5">
            {STATUS_LIST.map((item) => {
              const completed = item.status <= data.status;

              const current = item.status === data.status;

              return (
                <div key={item.status} className="flex items-start gap-4">
                  <div
                    className={`
                      w-10 h-10 rounded-full
                      flex items-center justify-center
                      flex-shrink-0 font-bold
                      ${
                        completed
                          ? "bg-[#800020] text-white"
                          : "bg-gray-200 text-gray-500"
                      }
                    `}
                  >
                    {completed ? "✓" : item.status}
                  </div>

                  <div className="pt-1">
                    <p
                      className={`
                        font-semibold
                        ${
                          current
                            ? "text-[#800020]"
                            : completed
                              ? "text-gray-800"
                              : "text-gray-400"
                        }
                      `}
                    >
                      {item.name}
                    </p>

                    {current && (
                      <p className="text-sm text-gray-500 mt-1">
                        สถานะปัจจุบัน
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {data.statusUpdatedAt && (
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-gray-500">อัปเดตล่าสุด</p>

              <p className="font-medium">{formatDate(data.statusUpdatedAt)}</p>
            </div>
          )}
        </div>

        {/* =====================================================
            CHANGE STATUS
        ===================================================== */}

        {data.status === 4 ? (
          /* ================= STATUS 4 ================= */

          <div className="bg-white rounded-2xl shadow-sm p-6">
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
        ) : (
          /* ================= STATUS 0–3 ================= */

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-800">เปลี่ยนสถานะ</h2>

              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                เจ้าหน้าที่
              </span>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หมายเหตุ
              </label>

              <textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                rows={3}
                placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
                className="
                  w-full
                  border border-gray-300
                  rounded-xl
                  px-4 py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#800020]
                "
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {STATUS_LIST.map((item) => {
                const active = item.status === data.status;

                return (
                  <button
                    key={item.status}
                    type="button"
                    disabled={changing || active}
                    onClick={() => changeStatus(item.status)}
                    className={`
                      rounded-xl px-4 py-3
                      text-sm font-semibold
                      transition
                      ${
                        active
                          ? "bg-[#800020] text-white cursor-default"
                          : "bg-gray-100 text-gray-700 hover:bg-[#800020] hover:text-white"
                      }

                      ${changing ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    {changing && !active ? "กำลังดำเนินการ..." : item.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================
            PERSONS
        ===================================================== */}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">รายชื่อบุคคล</h2>

            <p className="text-sm text-gray-500 mt-1">
              จำนวน {data.persons.length} ราย
            </p>
          </div>

          <div className="divide-y">
            {data.persons.map((item, index) => (
              <div key={item.id} className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#800020] text-white flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>

                  <div className="flex-1">
                    <p className="font-bold text-gray-800">
                      {item.person.fullName}
                    </p>

                    {item.person.purpose && (
                      <p className="text-sm text-gray-500 mt-1">
                        เรื่อง: {item.person.purpose}
                      </p>
                    )}

                    <div className="mt-2">
                      <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-sm">
                        {getStatusName(item.person.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            HISTORY
        ===================================================== */}

        {data.statusHistories.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              ประวัติการเปลี่ยนสถานะ
            </h2>

            <div className="space-y-4">
              {data.statusHistories.map((history) => (
                <div
                  key={history.historyId}
                  className="border-l-4 border-[#800020] pl-4"
                >
                  <p className="font-semibold text-gray-800">
                    {getStatusName(history.oldStatus)}

                    {" → "}

                    {getStatusName(history.newStatus)}
                  </p>

                  <p className="text-sm text-gray-500">
                    {formatDate(history.changedAt)}
                  </p>

                  {history.changedBy && (
                    <p className="text-sm text-gray-600 mt-1">
                      โดย: {history.changedBy}
                    </p>
                  )}

                  {history.remark && (
                    <p className="text-sm text-gray-600 mt-1">
                      หมายเหตุ: {history.remark}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================
            BACK BUTTON BOTTOM
        ===================================================== */}

        <div className="pb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              w-full
              rounded-xl
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-gray-700
              shadow-sm
              transition
              hover:bg-gray-100
              hover:text-[#800020]
            "
          >
            ← กลับหน้าก่อนหน้า
          </button>
        </div>
      </div>
    </div>
  );
}
