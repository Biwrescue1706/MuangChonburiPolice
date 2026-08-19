// src/pages/Forensic/ForensicQrScanner.tsx
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

  /* ======================================================
     STOP CAMERA
  ====================================================== */

  const stopScanner = async () => {
    try {
      scanningRef.current = false;

      if (!scannerRef.current) {
        return;
      }

      const scanner = scannerRef.current;

      scannerRef.current = null;

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
    } catch (error) {
      console.error("Stop scanner error:", error);
    }
  };

  /* ======================================================
     GET SUBMISSION ID FROM QR
  ====================================================== */

  const getSubmissionIdFromQr = (decodedText: string): string | null => {
    const value = decodedText.trim();

    if (!value) {
      return null;
    }

    /*
     * ==================================================
     * แบบใหม่
     *
     * QR เก็บแค่
     * 15ab6ebf-3098-444e-88d3-e3229afd216c
     * ==================================================
     */

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (uuidRegex.test(value)) {
      return value;
    }

    /*
     * ==================================================
     * รองรับ QR แบบเก่า
     *
     * https://.../forensic-status/:id
     * ==================================================
     */

    try {
      const url = new URL(value);

      const match = url.pathname.match(/^\/forensic-status\/([^/]+)$/);

      if (match?.[1]) {
        const oldId = decodeURIComponent(match[1]);

        if (uuidRegex.test(oldId)) {
          return oldId;
        }
      }
    } catch {
      // ไม่ใช่ URL
    }

    return null;
  };

  /* ======================================================
     SAVE SCAN AUTHORIZATION
  ====================================================== */

  const authorizeScan = (submissionId: string) => {
    /*
     * สิทธิ์ทั่วไป
     */
    sessionStorage.setItem("forensic_scan_authorized", "true");

    /*
     * ID ที่เพิ่งสแกน
     */
    sessionStorage.setItem("forensic_scan_id", submissionId);

    /*
     * สิทธิ์เฉพาะ Submission
     */
    sessionStorage.setItem(`forensic-scan-${submissionId}`, "true");

    console.log("================================");

    console.log("FORENSIC SCAN AUTHORIZED");

    console.log("Submission ID:", submissionId);

    console.log(
      "Authorized:",
      sessionStorage.getItem("forensic_scan_authorized"),
    );

    console.log("Scan ID:", sessionStorage.getItem("forensic_scan_id"));

    console.log(
      "Per ID:",
      sessionStorage.getItem(`forensic-scan-${submissionId}`),
    );

    console.log("================================");
  };

  /* ======================================================
     START CAMERA
  ====================================================== */

  const startScanner = async () => {
    try {
      await stopScanner();

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
          facingMode: {
            ideal: "environment",
          },
        },
        {
          /*
           * ตรวจ QR 20 ครั้ง / วินาที
           */
          fps: 20,

          /*
           * กรอบใหญ่ขึ้น
           * เพื่อให้สแกนจากกระดาษและหน้าจอได้ง่าย
           */
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const size = Math.min(
              viewfinderWidth * 0.8,
              viewfinderHeight * 0.8,
              420,
            );

            return {
              width: Math.floor(Math.max(size, 220)),
              height: Math.floor(Math.max(size, 220)),
            };
          },

          aspectRatio: 1,

          disableFlip: false,

          /*
           * ขอความละเอียดกล้องสูง
           * เพื่อช่วยตอนถือ QR ห่างประมาณ 10 ซม.+
           */
          videoConstraints: {
            facingMode: {
              ideal: "environment",
            },

            width: {
              ideal: 1920,
            },

            height: {
              ideal: 1080,
            },

            frameRate: {
              ideal: 30,
            },
          },
        },

        /* ==================================================
           QR SUCCESS
        ================================================== */

        async (decodedText) => {
          if (!scanningRef.current) {
            return;
          }

          scanningRef.current = false;

          console.log("QR Code:", decodedText);

          await stopScanner();

          try {
            /*
             * ดึง Submission ID
             */
            const submissionId = getSubmissionIdFromQr(decodedText);

            if (!submissionId) {
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

            console.log("Submission ID:", submissionId);

            /* ==================================================
               โหลดข้อมูลจาก Backend
            ================================================== */

            const response = await api.get(`/forensic-status/${submissionId}`);

            /*
             * รองรับทั้ง
             *
             * response.data
             *
             * และ
             *
             * response.data.data
             */

            const submission = response?.data?.data ?? response?.data;

            if (!submission) {
              throw new Error("ไม่พบข้อมูล Submission");
            }

            const status = Number(submission.status);

            console.log("Submission Status:", status);

            /* ==================================================
               บันทึกสิทธิ์ก่อนเข้า Status
            ================================================== */

            authorizeScan(submissionId);

            /* ==================================================
               STATUS 4
            ================================================== */

            if (status === 4) {
              await Swal.fire({
                icon: "info",
                title: "เอกสารดำเนินการเสร็จสิ้น",
                text: "รายการนี้ส่งคืนต้นสังกัดแล้ว",
                confirmButtonText: "ดูข้อมูล",
                confirmButtonColor: "#800020",
              });
            }

            /* ==================================================
               ไปหน้า Status
            ================================================== */

            navigate(`/forensic-status/${encodeURIComponent(submissionId)}`, {
              replace: true,
              state: {
                status,
                completed: status === 4,
              },
            });
          } catch (error: any) {
            console.error("QR Error:", error);

            /*
             * ถ้า Backend ไม่พบข้อมูล
             */
            const status = error?.response?.status;

            if (status === 404) {
              await Swal.fire({
                icon: "error",
                title: "ไม่พบข้อมูล",
                text: "ไม่พบข้อมูลเอกสารนี้ในระบบ",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#800020",
              });
            } else {
              await Swal.fire({
                icon: "error",
                title: "ไม่สามารถโหลดข้อมูล",
                text: "ไม่สามารถโหลดข้อมูลเอกสารนี้ได้",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#800020",
              });
            }

            await startScanner();
          }
        },

        /* ==================================================
           QR ERROR
        ================================================== */

        () => {
          /*
           * ไม่ต้องแสดง Error ทุก Frame
           */
        },
      );

      setStarting(false);

      /* ====================================================
         AUTO FOCUS
      ==================================================== */

      setTimeout(async () => {
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

          const capabilities =
            track.getCapabilities() as MediaTrackCapabilities & {
              focusMode?: string[];
              zoom?: {
                min?: number;
                max?: number;
                step?: number;
              };
            };

          console.log("Camera capabilities:", capabilities);

          /*
           * Continuous Autofocus
           */

          if (
            Array.isArray(capabilities.focusMode) &&
            capabilities.focusMode.includes("continuous")
          ) {
            await track.applyConstraints({
              advanced: [
                {
                  focusMode: "continuous",
                } as any,
              ],
            });

            console.log("เปิด Continuous Autofocus แล้ว");
          }
        } catch (focusError) {
          console.log("ไม่สามารถตั้ง autofocus:", focusError);
        }
      }, 700);
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

  /* ======================================================
     USE EFFECT
  ====================================================== */

  useEffect(() => {
    startScanner();

    return () => {
      stopScanner();
    };
  }, []);

  /* ======================================================
     UI
  ====================================================== */

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6 rounded-3xl bg-[#800020] p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold">สแกนเอกสารส่งตรวจ ศพฐ.</h1>

          <p className="mt-2 text-lg text-white/80">
            สแกน QR Code จากเอกสารเพื่อแสดงข้อมูล
          </p>
        </div>

        {/* =================================================
            CAMERA CARD
        ================================================= */}

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

          {/* =================================================
              CAMERA
          ================================================= */}

          <div className="relative overflow-hidden rounded-3xl bg-black">
            <div id="forensic-qr-reader" className="w-full" />

            {!cameraError && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative h-72 w-72 sm:h-80 sm:w-80">
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

          {/* =================================================
              STATUS
          ================================================= */}

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
              รองรับ QR Code จากกระดาษและหน้าจอ
            </p>

            <p className="mt-1 text-xs text-gray-400">
              แนะนำระยะประมาณ 10 ซม. ขึ้นไป
            </p>
          </div>

          {/* =================================================
              RETRY
          ================================================= */}

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
