import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Swal from "sweetalert2";

interface ForensicQrScannerProps {
  onScan: (text: string) => void;
  onClose?: () => void;
}

export default function ForensicQrScanner({
  onScan,
  onClose,
}: ForensicQrScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannedRef = useRef(false);

  const [starting, setStarting] = useState(true);

  /* ======================================================
     STOP CAMERA
  ====================================================== */

  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        const scanner = scannerRef.current;

        scannerRef.current = null;

        try {
          await scanner.stop();
        } catch (error) {
          console.warn("Stop camera:", error);
        }

        try {
          await scanner.clear();
        } catch (error) {
          console.warn("Clear scanner:", error);
        }
      }
    } catch (error) {
      console.error("Stop scanner error:", error);
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
          /*
           * เพิ่ม FPS เพื่อให้จับ QR ได้เร็วขึ้น
           */
          fps: 20,

          /*
           * ให้กรอบใหญ่ตามขนาดหน้าจอ
           * เพื่อให้สแกน QR จากกระดาษหรือหน้าจอ
           * ได้โดยไม่จำเป็นต้องซูม
           */
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

          /*
           * กล้องมือถือส่วนใหญ่ใช้ 1:1
           * เพื่อช่วยให้ QR อยู่ในกรอบง่าย
           */
          aspectRatio: 1,

          /*
           * ไม่บังคับกลับภาพ
           */
          disableFlip: false,

          /*
           * ใช้ความละเอียดสูงเมื่อ browser รองรับ
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
          },
        },

        /* ==================================================
           QR SUCCESS
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

          onScan(decodedText);
        },

        /* ==================================================
           QR ERROR
        ================================================== */

        () => {
          /*
           * html5-qrcode จะเรียก callback นี้
           * ทุกครั้งที่ยังจับ QR ไม่ได้
           *
           * ไม่ต้องแสดง Swal
           */
        },
      );

      setStarting(false);

      /* ====================================================
         AUTO FOCUS
      ==================================================== */

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

        /*
         * getCapabilities() บาง browser
         * อาจไม่มี focusMode
         */
        const capabilities =
          track.getCapabilities() as MediaTrackCapabilities & {
            focusMode?: string[];
          };

        console.log("Camera capabilities:", capabilities);

        /*
         * เปิด continuous autofocus
         * เฉพาะกล้องที่รองรับ
         */
        if (
          Array.isArray(capabilities.focusMode) &&
          capabilities.focusMode.includes("continuous")
        ) {
          await track.applyConstraints({
            advanced: [
              {
                focusMode: "continuous",
              } as unknown as MediaTrackConstraintSet,
            ],
          });

          console.log("เปิด Continuous Autofocus แล้ว");
        }
      } catch (focusError) {
        console.warn("ไม่สามารถตั้ง autofocus:", focusError);
      }
    } catch (error) {
      console.error("Start scanner error:", error);

      setStarting(false);

      await stopScanner();

      await Swal.fire({
        icon: "error",
        title: "เปิดกล้องไม่ได้",
        text: "กรุณาอนุญาตให้เว็บไซต์ใช้กล้อง และตรวจสอบว่าเว็บไซต์ใช้ HTTPS",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });

      onClose?.();
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
    <div className="w-full">
      {/* Header */}

      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-gray-800">กำลังสแกน</h2>

          <p className="text-sm text-gray-500">นำ QR Code ให้อยู่ในกรอบ</p>
        </div>

        <button
          type="button"
          onClick={async () => {
            await stopScanner();
            onClose?.();
          }}
          className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
        >
          ปิดกล้อง
        </button>
      </div>

      {/* Camera */}

      <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-black">
        <div id="forensic-qr-reader" className="w-full" />
      </div>

      {/* Status */}

      <div className="mt-4 text-center">
        {starting ? (
          <p className="text-sm text-gray-500">กำลังเปิดกล้อง...</p>
        ) : (
          <p className="text-sm text-gray-500">
            กรุณาให้ QR Code อยู่ตรงกลางกรอบ
          </p>
        )}

        <p className="mt-1 text-xs text-gray-400">
          รองรับ QR Code จากหน้าจอและกระดาษ
        </p>

        <p className="text-xs text-gray-400">แนะนำระยะประมาณ 10 ซม. ขึ้นไป</p>
      </div>
    </div>
  );
}
