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
  const [starting, setStarting] = useState(true);

  /* ================= STOP CAMERA ================= */

  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
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

      // รอให้ DOM สร้างตัว scanner ก่อน
      await new Promise((resolve) => setTimeout(resolve, 150));

      const scanner = new Html5Qrcode("forensic-qr-reader");

      scannerRef.current = scanner;

      await scanner.start(
        {
          facingMode: {
            ideal: "environment",
          },
        },
        {
          // จำนวนครั้งที่ตรวจ QR ต่อวินาที
          fps: 15,

          // ขนาดกรอบ QR
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const size = Math.min(viewfinderWidth, viewfinderHeight, 350);

            return {
              width: size,
              height: size,
            };
          },

          aspectRatio: 1,

          disableFlip: false,
        },

        /* ================= QR SUCCESS ================= */

        async (decodedText) => {
          console.log("QR Code:", decodedText);

          // ป้องกันการยิงซ้ำ
          if (!scannerRef.current) {
            return;
          }

          await stopScanner();

          onScan(decodedText);
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

        const capabilities = track.getCapabilities() as {
          focusMode?: string[];
        };

        console.log("Camera capabilities:", capabilities);

        if (
          capabilities.focusMode &&
          Array.isArray(capabilities.focusMode) &&
          capabilities.focusMode.includes("continuous")
        ) {
          /*
           * focusMode ไม่มีอยู่ใน TypeScript
           * MediaTrackConstraintSet ของบาง browser
           * จึง cast object เป็น any
           */
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

      onClose?.();
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
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
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
          แนะนำให้ถือโทรศัพท์ห่างจาก QR Code ประมาณ 15–30 ซม.
        </p>
      </div>
    </div>
  );
}
