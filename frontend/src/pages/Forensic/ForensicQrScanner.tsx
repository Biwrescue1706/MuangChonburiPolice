// src/pages/ForensicScanPage.tsx

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Swal from "sweetalert2";
import api from "../../api/axios";

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
  id: string;
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

interface Submission {
  submissionId: string;
  submissionNo?: string;
  submissionDate: string;
  createdAt: string;
  status: number;
  statusName: string;
  statusUpdatedAt?: string;
  persons: SubmissionPerson[];
  statusHistories: StatusHistory[];
}

const STATUS = [
  "รอส่ง ศพฐ.",
  "เตรียมเอกสารส่ง ศพฐ. แล้ว",
  "ส่ง ศพฐ. แล้ว",
  "รับจาก ศพฐ. แล้ว",
  "ส่งคืนต้นสังกัดแล้ว",
];

export default function ForensicScanPage() {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const [scanning, setScanning] = useState(false);
  const [data, setData] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);

  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
        scannerRef.current = null;
      }
    } catch (err) {
      console.error("Stop scanner error:", err);
    }

    setScanning(false);
  };

  const getSubmissionId = (text: string) => {
    try {
      const url = new URL(text);

      const match = url.pathname.match(/\/forensic-status\/([^/]+)/);

      if (match?.[1]) {
        return match[1];
      }

      return null;
    } catch {
      // กรณี QR เก็บ submissionId ตรง ๆ
      if (text.trim()) {
        return text.trim();
      }

      return null;
    }
  };

  const loadSubmission = async (qrText: string) => {
    const submissionId = getSubmissionId(qrText);

    if (!submissionId) {
      await Swal.fire({
        icon: "error",
        title: "QR Code ไม่ถูกต้อง",
        text: "ไม่พบรหัสรายการส่งตรวจ",
        confirmButtonText: "ตกลง",
      });

      return;
    }

    try {
      setLoading(true);

      const response = await api.get(`/forensic-status/${submissionId}`);

      setData(response.data.data);

      await Swal.fire({
        icon: "success",
        title: "สแกนสำเร็จ",
        text: "โหลดข้อมูลรายการส่งตรวจแล้ว",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error: any) {
      console.error(error);

      setData(null);

      await Swal.fire({
        icon: "error",
        title: "ไม่พบข้อมูล",
        text: error?.response?.data?.error || "ไม่สามารถโหลดข้อมูลได้",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setLoading(false);
    }
  };

  const startScanner = async () => {
    try {
      setData(null);
      setScanning(true);

      // รอ DOM
      await new Promise((resolve) => setTimeout(resolve, 100));

      const scanner = new Html5Qrcode("forensic-reader");

      scannerRef.current = scanner;

      await scanner.start(
        {
          facingMode: "environment",
        },
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
        },
        async (decodedText) => {
          console.log("QR:", decodedText);

          await stopScanner();

          await loadSubmission(decodedText);
        },
        () => {
          // ไม่ต้องแสดง error ทุก frame
        },
      );
    } catch (error) {
      console.error("Start scanner error:", error);

      setScanning(false);

      await Swal.fire({
        icon: "error",
        title: "เปิดกล้องไม่ได้",
        text: "กรุณาอนุญาตให้เว็บไซต์ใช้กล้อง",
        confirmButtonText: "ตกลง",
      });
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#720019] to-[#800020] p-6 text-white shadow-lg">
          <h1 className="text-2xl font-bold">สแกนเอกสารส่งตรวจ ศพฐ.</h1>

          <p className="mt-1 text-sm text-white/70">
            สแกน QR Code จากเอกสารเพื่อแสดงข้อมูล
          </p>
        </div>

        {/* SCANNER CARD */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          {!scanning && (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#800020]/10 text-4xl">
                📷
              </div>

              <h2 className="text-xl font-bold text-gray-800">สแกน QR Code</h2>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                กดปุ่มด้านล่างเพื่อเปิดกล้อง จากนั้นนำกล้องไปสแกน QR Code
                บนเอกสารส่งตรวจ
              </p>

              <button
                onClick={startScanner}
                className="mt-6 rounded-xl bg-[#800020] px-6 py-3 font-semibold text-white shadow transition hover:bg-[#680019]"
              >
                📷 เปิดกล้องสแกน
              </button>
            </div>
          )}

          {scanning && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-800">กำลังสแกน</h2>

                  <p className="text-sm text-gray-500">
                    นำ QR Code ให้อยู่ในกรอบ
                  </p>
                </div>

                <button
                  onClick={stopScanner}
                  className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
                >
                  ปิดกล้อง
                </button>
              </div>

              <div
                id="forensic-reader"
                className="mx-auto max-w-md overflow-hidden rounded-2xl"
              />

              <p className="mt-4 text-center text-sm text-gray-500">
                กรุณาให้ QR Code อยู่ตรงกลางกรอบ
              </p>
            </div>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-5 rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#800020]/20 border-t-[#800020]" />

            <p className="mt-4 text-sm text-gray-500">กำลังโหลดข้อมูล...</p>
          </div>
        )}

        {/* DATA */}
        {data && !loading && (
          <div className="mt-5 space-y-5">
            {/* INFO */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-gray-500">เลขที่ส่งตรวจ</p>

                  <h2 className="mt-1 text-2xl font-bold text-[#800020]">
                    {data.submissionNo || "-"}
                  </h2>
                </div>

                <div className="rounded-xl bg-[#800020]/10 px-5 py-3 text-center">
                  <p className="text-xs text-gray-500">สถานะ</p>

                  <p className="mt-1 font-bold text-[#800020]">
                    {data.statusName || STATUS[data.status] || "-"}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">วันที่ส่งตรวจ</p>

                  <p className="mt-1 font-semibold">
                    {new Date(data.submissionDate).toLocaleDateString("th-TH")}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">จำนวนบุคคล</p>

                  <p className="mt-1 font-semibold">
                    {data.persons.length} ราย
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">อัปเดตล่าสุด</p>

                  <p className="mt-1 font-semibold">
                    {data.statusUpdatedAt
                      ? new Date(data.statusUpdatedAt).toLocaleString("th-TH")
                      : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* STATUS */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="mb-5 font-bold text-gray-800">
                สถานะการดำเนินการ
              </h2>

              <div className="grid gap-3 md:grid-cols-5">
                {STATUS.map((status, index) => (
                  <div
                    key={status}
                    className={`rounded-xl border p-4 text-center ${
                      index <= data.status
                        ? "border-[#800020] bg-[#800020]/5"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div
                      className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                        index <= data.status
                          ? "bg-[#800020] text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {index}
                    </div>

                    <p
                      className={`mt-3 text-sm font-semibold ${
                        index <= data.status
                          ? "text-[#800020]"
                          : "text-gray-400"
                      }`}
                    >
                      {status}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* PERSON */}
            <div className="rounded-2xl bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <h2 className="font-bold text-gray-800">รายชื่อบุคคล</h2>

                <p className="mt-1 text-sm text-gray-500">
                  จำนวน {data.persons.length} ราย
                </p>
              </div>

              <div className="divide-y">
                {data.persons.map((item, index) => (
                  <div key={item.id} className="p-5">
                    <div className="flex gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#800020]/10 font-bold text-[#800020]">
                        {index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-gray-800">
                          {item.person.fullName}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {item.person.purpose || "-"}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                          <span className="rounded-lg bg-gray-100 px-3 py-1">
                            เล่มที่ {item.person.receiptBookNo || "-"}
                          </span>

                          <span className="rounded-lg bg-gray-100 px-3 py-1">
                            เลขที่ {item.person.receiptNo || "-"}
                          </span>

                          <span className="rounded-lg bg-gray-100 px-3 py-1">
                            {item.person.receiptDate || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SCAN AGAIN */}
            <div className="flex justify-center pb-6">
              <button
                onClick={() => {
                  setData(null);
                  startScanner();
                }}
                className="rounded-xl bg-[#800020] px-6 py-3 font-semibold text-white shadow hover:bg-[#680019]"
              >
                📷 สแกนเอกสารรายการอื่น
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
