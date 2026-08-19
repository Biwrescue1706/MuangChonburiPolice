import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";

export default function ForensicQrScanner() {
  const navigate = useNavigate();

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scanningRef = useRef(false);

  const [starting, setStarting] = useState(true);
  const [cameraError, setCameraError] = useState(false);

  /* ================= STOP CAMERA ================= */

  const stopScanner = async () => {
    try {
      scanningRef.current = false;

      if (scannerRef.current) {
        const scanner = scannerRef.current;

        try {
          await scanner.stop();
        } catch (error) {
          console.log("Scanner stop:", error);
        }

        try {
          await scanner.clear();
        } catch (error) {
          console.log("Scanner clear:", error);
        }

        scannerRef.current = null;
      }
    } catch (error) {
      console.error("Stop scanner error:", error);
    }
  };

  /* ================= START CAMERA ================= */

  const startScanner = async () => {
    try {
      setStarting(true);
      setCameraError(false);

      await new Promise((resolve) => setTimeout(resolve, 300));

      const element = document.getElementById("forensic-qr-reader");

      if (!element) {
        throw new Error("ไม่พบพื้นที่กล้อง");
      }

      const scanner = new Html5Qrcode("forensic-qr-reader");

      scannerRef.current = scanner;
      scanningRef.current = true;

      await scanner.start(
        {
          facingMode: "environment",
        },
        {
          fps: 20,

          qrbox: (viewfinderWidth, viewfinderHeight) => {
            /*
             * กรอบใหญ่ขึ้น เพื่อให้ QR ที่อยู่ใกล้ประมาณ 10 ซม.
             * หรือ QR ที่แสดงบนหน้าจอ/กระดาษอยู่ในพื้นที่ตรวจจับได้ง่าย
             */
            const width = Math.floor(viewfinderWidth * 0.9);
            const height = Math.floor(viewfinderHeight * 0.75);

            return {
              width,
              height,
            };
          },

          aspectRatio: 1.7777778,
          disableFlip: false,
        },

        /* ================= QR SUCCESS ================= */

        async (decodedText) => {
          if (!scanningRef.current) {
            return;
          }

          scanningRef.current = false;

          console.log("QR Code:", decodedText);

          await stopScanner();

          try {
            const url = new URL(decodedText);

            const match = url.pathname.match(/^\/forensic-status\/([^/]+)$/);

            if (!match) {
              await Swal.fire({
                icon: "error",
                title: "QR Code ไม่ถูกต้อง",
                text: "QR Code นี้ไม่ใช่เอกสารส่งตรวจ ศพฐ.",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#800020",
              });

              await startScanner();
              return;
            }

            const submissionId = match[1];

            /* ================= ดึงข้อมูล ================= */

            const response = await api.get(`/forensic-status/${submissionId}`);

            const submission = response.data;

            const status = Number(submission?.status);

            console.log("Submission ID:", submissionId);
            console.log("Submission Status:", status);

            /*
             * STATUS
             *
             * 0 = รอส่ง ศพฐ.
             * 1 = เตรียมเอกสารส่ง ศพฐ. แล้ว
             * 2 = ส่ง ศพฐ. แล้ว
             * 3 = รับจาก ศพฐ. แล้ว
             * 4 = ส่งคืนต้นสังกัดแล้ว
             */

            /* ================= STATUS 4 ================= */

            if (status === 4) {
              await Swal.fire({
                icon: "info",
                title: "เอกสารดำเนินการเสร็จสิ้น",
                text: "รายการนี้ส่งคืนต้นสังกัดแล้ว",
                confirmButtonText: "ดูข้อมูล",
                confirmButtonColor: "#800020",
              });

              navigate(`/forensic-status/${submissionId}`, {
                state: {
                  status: 4,
                  completed: true,
                },
              });

              return;
            }

            /* ================= STATUS อื่น ================= */

            navigate(`/forensic-status/${submissionId}`, {
              state: {
                status,
                completed: false,
              },
            });
          } catch (error) {
            console.error("QR Error:", error);

            await Swal.fire({
              icon: "error",
              title: "ไม่พบข้อมูล",
              text: "ไม่สามารถโหลดข้อมูลเอกสารนี้ได้",
              confirmButtonText: "ตกลง",
              confirmButtonColor: "#800020",
            });

            await startScanner();
          }
        },

        /* ================= QR ERROR ================= */

        () => {
          // ไม่ต้องแสดง error ทุก frame
        },
      );

      setStarting(false);

      /* ================= AUTO FOCUS ================= */

      try {
        const video = document.querySelector(
          "#forensic-qr-reader video",
        ) as HTMLVideoElement | null;

        if (!video?.srcObject) {
          return;
        }

        const stream = video.srcObject as MediaStream;

        const track = stream.getVideoTracks()[0];

        if (!track) {
          return;
        }

        const capabilities = track.getCapabilities();

        console.log("Camera capabilities:", capabilities);

        const cameraCapabilities = capabilities as MediaTrackCapabilities & {
          focusMode?: string[];
        };

        if (cameraCapabilities.focusMode?.includes("continuous")) {
          await track.applyConstraints({
            advanced: [
              {
                focusMode: "continuous",
              } as any,
            ],
          });

          console.log("เปิด Continuous Autofocus แล้ว");

          // กระตุ้น autofocus ซ้ำหลังเปิดกล้อง
          setTimeout(async () => {
            try {
              await track.applyConstraints({
                advanced: [
                  {
                    focusMode: "continuous",
                  } as any,
                ],
              });

              console.log("Refresh autofocus แล้ว");
            } catch (error) {
              console.log("Refresh autofocus:", error);
            }
          }, 500);
        }
      } catch (focusError) {
        console.log("ไม่สามารถตั้ง autofocus:", focusError);
      }
    } catch (error) {
      console.error("Start scanner error:", error);

      setStarting(false);
      setCameraError(true);

      await stopScanner();

      await Swal.fire({
        icon: "error",
        title: "เปิดกล้องไม่ได้",
        text: "กรุณาอนุญาตให้เว็บไซต์ใช้กล้อง และตรวจสอบว่าเว็บไซต์ใช้ HTTPS",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });
    }
  };

  /* ================= USE EFFECT ================= */

  useEffect(() => {
    startScanner();

    return () => {
      stopScanner();
    };
  }, []);

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        {/* ================= HEADER ================= */}

        <div className="mb-6 rounded-3xl bg-[#800020] p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold">สแกนเอกสารส่งตรวจ ศพฐ.</h1>

          <p className="mt-2 text-lg text-white/80">
            สแกน QR Code จากเอกสารเพื่อแสดงข้อมูล
          </p>
        </div>

        {/* ================= CAMERA CARD ================= */}

        <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {starting ? "กำลังเปิดกล้อง..." : "กำลังสแกน"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                นำ QR Code ให้อยู่ในกรอบ
              </p>
            </div>

            <button
              type="button"
              onClick={async () => {
                await stopScanner();
                navigate(-1);
              }}
              className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
            >
              ปิดกล้อง
            </button>
          </div>

          {/* ================= CAMERA ================= */}

          <div className="relative overflow-hidden rounded-3xl bg-black">
            <div id="forensic-qr-reader" className="w-full" />

            {!cameraError && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative h-64 w-64 sm:h-72 sm:w-72">
                  {/* มุมซ้ายบน */}
                  <div className="absolute left-0 top-0 h-12 w-12 border-l-4 border-t-4 border-white" />

                  {/* มุมขวาบน */}
                  <div className="absolute right-0 top-0 h-12 w-12 border-r-4 border-t-4 border-white" />

                  {/* มุมซ้ายล่าง */}
                  <div className="absolute bottom-0 left-0 h-12 w-12 border-b-4 border-l-4 border-white" />

                  {/* มุมขวาล่าง */}
                  <div className="absolute bottom-0 right-0 h-12 w-12 border-b-4 border-r-4 border-white" />

                  {/* เส้นสแกน */}
                  {!starting && (
                    <div className="absolute left-3 right-3 top-1/2 h-0.5 animate-pulse bg-red-500" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ================= STATUS ================= */}

          <div className="mt-5 text-center">
            {starting ? (
              <p className="text-sm text-gray-500">กำลังเปิดกล้อง...</p>
            ) : cameraError ? (
              <p className="text-sm text-red-500">ไม่สามารถเปิดกล้องได้</p>
            ) : (
              <p className="text-sm text-gray-600">
                กรุณาให้ QR Code อยู่ตรงกลางกรอบ
              </p>
            )}

            <p className="mt-2 text-xs text-gray-400">
              รองรับการสแกนตั้งแต่ประมาณ 10 ซม. ขึ้นไป • ไม่จำเป็นต้องซูม
            </p>
          </div>

          {/* ================= RETRY ================= */}

          {cameraError && (
            <button
              type="button"
              onClick={startScanner}
              className="mt-5 w-full rounded-xl bg-[#800020] px-5 py-3 font-semibold text-white transition hover:bg-[#680019]"
            >
              เปิดกล้องอีกครั้ง
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
