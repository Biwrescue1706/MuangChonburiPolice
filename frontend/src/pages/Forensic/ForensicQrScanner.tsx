// src/pages/Forensic/ForensicQrScanner.tsx

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import Swal from "sweetalert2";

export default function ForensicQrScanner() {
  const navigate = useNavigate();

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannedRef = useRef(false);

  const [starting, setStarting] = useState(true);

  /* ======================================================
     STOP CAMERA
  ====================================================== */

  const stopScanner = async () => {
    const scanner = scannerRef.current;

    if (!scanner) {
      return;
    }

    scannerRef.current = null;

    try {
      await scanner.stop();
    } catch (error) {
      console.log("Stop scanner:", error);
    }

    try {
      await scanner.clear();
    } catch (error) {
      console.log("Clear scanner:", error);
    }
  };

  /* ======================================================
     START CAMERA
  ====================================================== */

  const startScanner = async () => {
    try {
      setStarting(true);

      scannedRef.current = false;

      await new Promise((resolve) => setTimeout(resolve, 150));

      const element = document.getElementById("forensic-qr-reader");

      if (!element) {
        throw new Error("ไม่พบพื้นที่สำหรับเปิดกล้อง");
      }

      const scanner = new Html5Qrcode("forensic-qr-reader");

      scannerRef.current = scanner;

      await scanner.start(
        {
          facingMode: {
            ideal: "environment",
          },
        },
        {
          fps: 20,

          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const size = Math.min(
              Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.8),
              420,
            );

            return {
              width: Math.max(size, 220),
              height: Math.max(size, 220),
            };
          },

          aspectRatio: 1,

          disableFlip: false,

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
           SCAN SUCCESS
        ================================================== */

        async (decodedText) => {
          if (scannedRef.current) {
            return;
          }

          if (!decodedText) {
            return;
          }

          scannedRef.current = true;

          console.log("QR Code:", decodedText);

          await stopScanner();

          /*
           * QR ตอนนี้เก็บแค่ submissionId
           *
           * เช่น
           * 15ab6ebf-3098-444e-88d3-e3229afd216c
           */

          const submissionId = decodedText.trim();

          if (!submissionId) {
            scannedRef.current = false;

            await Swal.fire({
              icon: "error",
              title: "QR Code ไม่ถูกต้อง",
              text: "ไม่พบ Submission ID",
              confirmButtonText: "ตกลง",
              confirmButtonColor: "#800020",
            });

            return;
          }

          /*
           * บันทึกว่า ID นี้ถูกสแกน
           * ผ่านระบบ Scanner ของเว็บไซต์
           */
          sessionStorage.setItem(`forensic-scan-${submissionId}`, "true");

          /*
           * เข้า Status
           */
          navigate(`/forensic-status/${encodeURIComponent(submissionId)}`);
        },

        /* ==================================================
           SCAN ERROR
        ================================================== */

        () => {
          // ไม่แสดง error ทุก frame
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
            };

          console.log("Camera capabilities:", capabilities);

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

            console.log("Continuous autofocus enabled");
          }
        } catch (error) {
          console.log("Autofocus ไม่รองรับ:", error);
        }
      }, 700);
    } catch (error) {
      console.error("Start scanner error:", error);

      setStarting(false);

      await stopScanner();

      await Swal.fire({
        icon: "error",
        title: "เปิดกล้องไม่ได้",
        text: "กรุณาอนุญาตให้เว็บไซต์ใช้กล้อง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });

      navigate(-1);
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
    <div className="main-content min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}

        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-gray-800">สแกน QR Code</h1>

            <p className="mt-1 text-sm text-gray-500">
              สแกน QR จากเอกสารหรือหน้าจอ
            </p>
          </div>

          <button
            type="button"
            onClick={async () => {
              await stopScanner();
              navigate(-1);
            }}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100"
          >
            ปิด
          </button>
        </div>

        {/* Camera */}

        <div className="overflow-hidden rounded-2xl bg-black shadow-lg">
          <div id="forensic-qr-reader" className="w-full" />
        </div>

        {/* Status */}

        <div className="mt-4 rounded-2xl bg-white p-5 text-center shadow-sm">
          {starting ? (
            <p className="text-sm font-semibold text-gray-600">
              กำลังเปิดกล้อง...
            </p>
          ) : (
            <>
              <p className="text-sm font-semibold text-gray-700">
                นำ QR Code ให้อยู่ในกรอบ
              </p>

              <p className="mt-2 text-xs text-gray-400">
                รองรับ QR จากกระดาษและหน้าจอ
              </p>

              <p className="mt-1 text-xs text-gray-400">
                แนะนำระยะประมาณ 10 ซม. ขึ้นไป
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
