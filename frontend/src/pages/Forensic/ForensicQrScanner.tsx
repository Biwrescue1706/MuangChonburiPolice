import { useCallback, useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type ForensicSubmission = {
  submissionId: string;
  status: number | string;
  [key: string]: unknown;
};

function getSubmissionIdFromQr(decodedText: string): string | null {
  const value = decodedText.trim();

  if (!value) return null;

  // QR ที่เป็น UUID โดยตรง
  if (UUID_REGEX.test(value)) {
    return value;
  }

  // QR ที่เป็น URL เช่น /forensic-status/:id
  try {
    const url = new URL(value);
    const match = url.pathname.match(/\/forensic-status\/([^/]+)\/?$/i);

    if (match?.[1]) {
      const id = decodeURIComponent(match[1]).trim();

      if (UUID_REGEX.test(id)) {
        return id;
      }
    }
  } catch {
    // ข้อมูลไม่ใช่ URL ให้ตรวจสอบรูปแบบอื่นต่อ
  }

  // รองรับ forensic-status:UUID และ submissionId=UUID
  const prefixMatch = value.match(
    /(?:forensic-status:|submissionId=)([0-9a-f-]{36})/i,
  );

  if (prefixMatch?.[1] && UUID_REGEX.test(prefixMatch[1])) {
    return prefixMatch[1];
  }

  return null;
}

export default function ForensicQrScanner() {
  const navigate = useNavigate();

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scanningRef = useRef(false);
  const startingRef = useRef(false);
  const mountedRef = useRef(false);
  const processingRef = useRef(false);

  const [starting, setStarting] = useState(true);
  const [cameraError, setCameraError] = useState(false);

  const stopScanner = useCallback(async () => {
    scanningRef.current = false;

    const scanner = scannerRef.current;

    if (!scanner) return;

    // ป้องกันการเรียก stop ซ้ำจากหลายจุด
    scannerRef.current = null;

    try {
      await scanner.stop();
    } catch (error) {
      console.debug("Scanner stop:", error);
    }

    try {
      await scanner.clear();
    } catch (error) {
      console.debug("Scanner clear:", error);
    }
  }, []);

  const authorizeScan = useCallback((submissionId: string) => {
    sessionStorage.setItem("forensic_scan_authorized", "true");
    sessionStorage.setItem("forensic_scan_id", submissionId);
    sessionStorage.setItem(`forensic-scan-${submissionId}`, "true");
  }, []);

  const loadSubmission = useCallback(
    async (submissionId: string): Promise<ForensicSubmission> => {
      const encodedId = encodeURIComponent(submissionId);

      const response = await api.get(`/forensic-status/${encodedId}`);

      const submission = response?.data?.data ?? response?.data;

      if (!submission) {
        throw new Error("ไม่พบข้อมูล Submission");
      }

      if (!submission.submissionId) {
        throw new Error("ข้อมูล Submission ไม่มี submissionId");
      }

      return submission as ForensicSubmission;
    },
    [],
  );

  const startScanner = useCallback(async () => {
    if (startingRef.current || !mountedRef.current) return;

    startingRef.current = true;

    try {
      await stopScanner();

      if (!mountedRef.current) return;

      setStarting(true);
      setCameraError(false);

      // รอให้พื้นที่กล้องพร้อมก่อนเริ่มสแกน
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 300);
      });

      if (!mountedRef.current) return;

      const element = document.getElementById("forensic-qr-reader");

      if (!element) {
        throw new Error("ไม่พบพื้นที่กล้อง");
      }

      element.innerHTML = "";

      const scanner = new Html5Qrcode("forensic-qr-reader");
      scannerRef.current = scanner;
      scanningRef.current = true;

      await scanner.start(
        {
          facingMode: { ideal: "environment" },
        },
        {
          fps: 15,
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const size = Math.min(
              viewfinderWidth * 0.78,
              viewfinderHeight * 0.78,
              420,
            );

            const finalSize = Math.max(220, Math.floor(size));

            return {
              width: finalSize,
              height: finalSize,
            };
          },
          aspectRatio: 1,
          disableFlip: false,
          videoConstraints: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 },
          },
        },
        async (decodedText) => {
          if (
            !scanningRef.current ||
            processingRef.current ||
            !mountedRef.current
          ) {
            return;
          }

          // ป้องกันการประมวลผล QR เดิมซ้ำหลายครั้ง
          processingRef.current = true;
          scanningRef.current = false;

          try {
            await stopScanner();

            const submissionId = getSubmissionIdFromQr(decodedText);

            if (!submissionId) {
              await Swal.fire({
                icon: "error",
                title: "QR Code ไม่ถูกต้อง",
                text: "QR Code นี้ไม่ใช่เอกสารส่งตรวจ ศพฐ.",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#800020",
              });

              return;
            }

            let submission: ForensicSubmission;

            try {
              submission = await loadSubmission(submissionId);
            } catch (error: unknown) {
              console.error("LOAD SUBMISSION ERROR:", error);

              const apiError = error as {
                response?: {
                  status?: number;
                  data?: { error?: string };
                };
              };

              const httpStatus = apiError.response?.status;
              const backendMessage = apiError.response?.data?.error;

              if (httpStatus === 404) {
                await Swal.fire({
                  icon: "error",
                  title: "ไม่พบข้อมูล",
                  html: `
                    <div style="font-size:15px;line-height:1.7">
                      ไม่พบข้อมูลเอกสารนี้ในระบบ
                      <br/><br/>
                      <div style="
                        padding:10px;
                        background:#f3f4f6;
                        border-radius:10px;
                        word-break:break-all;
                        font-family:monospace;
                        font-size:13px;
                      ">${submissionId}</div>
                    </div>
                  `,
                  confirmButtonText: "ตกลง",
                  confirmButtonColor: "#800020",
                });
              } else {
                await Swal.fire({
                  icon: "error",
                  title: "ไม่สามารถโหลดข้อมูล",
                  text: backendMessage || "ไม่สามารถโหลดข้อมูลเอกสารนี้ได้",
                  confirmButtonText: "ตกลง",
                  confirmButtonColor: "#800020",
                });
              }

              return;
            }

            if (submission.submissionId !== submissionId) {
              await Swal.fire({
                icon: "error",
                title: "ข้อมูลเอกสารไม่ตรงกัน",
                text: "QR Code และข้อมูลในระบบมีรหัสไม่ตรงกัน",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#800020",
              });

              return;
            }

            const status = Number(submission.status);

            authorizeScan(submissionId);

            if (status === 4) {
              const result = await Swal.fire({
                icon: "info",
                title: "เอกสารดำเนินการเสร็จสิ้น",
                text: "รายการนี้ส่งคืนต้นสังกัดแล้ว",
                showCancelButton: true,
                confirmButtonText: "ดูข้อมูล",
                cancelButtonText: "ปิด",
                confirmButtonColor: "#800020",
                cancelButtonColor: "#6b7280",
              });

              if (!result.isConfirmed) return;
            }

            navigate(`/forensic-status/${encodeURIComponent(submissionId)}`, {
              replace: true,
              state: {
                status,
                completed: status === 4,
                submission,
              },
            });
          } catch (error: unknown) {
            console.error("QR PROCESS ERROR:", error);

            const message =
              error instanceof Error
                ? error.message
                : "ไม่สามารถดำเนินการกับ QR Code ได้";

            await Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: message,
              confirmButtonText: "ตกลง",
              confirmButtonColor: "#800020",
            });
          } finally {
            processingRef.current = false;

            // เริ่มสแกนใหม่เฉพาะเมื่อยังอยู่ในหน้านี้
            if (mountedRef.current) {
              void startScanner();
            }
          }
        },
        () => {
          // ไม่แสดง Error ทุกเฟรม เพราะเป็นพฤติกรรมปกติขณะค้นหา QR
        },
      );

      if (!mountedRef.current) {
        await stopScanner();
        return;
      }

      setStarting(false);

      // พยายามเปิด autofocus หากกล้องรองรับ
      window.setTimeout(async () => {
        if (!mountedRef.current) return;

        try {
          const video = document.querySelector(
            "#forensic-qr-reader video",
          ) as HTMLVideoElement | null;

          if (!video?.srcObject) return;

          const stream = video.srcObject as MediaStream;
          const track = stream.getVideoTracks()[0];

          if (!track) return;

          const capabilities =
            track.getCapabilities() as MediaTrackCapabilities & {
              focusMode?: string[];
            };

          if (
            Array.isArray(capabilities.focusMode) &&
            capabilities.focusMode.includes("continuous")
          ) {
            await track.applyConstraints({
              advanced: [
                {
                  focusMode: "continuous",
                } as MediaTrackConstraintSet,
              ],
            });
          }
        } catch {
          // กล้องบางรุ่นไม่รองรับ autofocus ผ่าน API นี้
        }
      }, 700);
    } catch (error: unknown) {
      console.error("START SCANNER ERROR:", error);

      if (mountedRef.current) {
        setStarting(false);
        setCameraError(true);

        await Swal.fire({
          icon: "error",
          title: "เปิดกล้องไม่ได้",
          text: "กรุณาอนุญาตให้เว็บไซต์ใช้กล้อง และตรวจสอบว่าเว็บไซต์ใช้ HTTPS",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#800020",
        });
      }

      await stopScanner();
    } finally {
      startingRef.current = false;
    }
  }, [stopScanner, loadSubmission, authorizeScan, navigate]);

  useEffect(() => {
    mountedRef.current = true;

    void startScanner();

    return () => {
      mountedRef.current = false;
      scanningRef.current = false;
      processingRef.current = false;
      void stopScanner();
    };
  }, [startScanner, stopScanner]);

  const handleClose = useCallback(async () => {
    mountedRef.current = false;
    await stopScanner();
    navigate(-1);
  }, [navigate, stopScanner]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6 rounded-3xl bg-[#800020] p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold">สแกนเอกสารส่งตรวจ ศพฐ.</h1>

          <p className="mt-2 text-lg text-white/80">
            สแกน QR Code จากเอกสารเพื่อแสดงข้อมูล
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between gap-3">
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
              onClick={() => void handleClose()}
              className="shrink-0 rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
            >
              ปิดกล้อง
            </button>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-black">
            <div id="forensic-qr-reader" className="w-full" />

            {!cameraError && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative h-72 w-72 sm:h-80 sm:w-80">
                  <div className="absolute left-0 top-0 h-12 w-12 border-l-4 border-t-4 border-white" />
                  <div className="absolute right-0 top-0 h-12 w-12 border-r-4 border-t-4 border-white" />
                  <div className="absolute bottom-0 left-0 h-12 w-12 border-b-4 border-l-4 border-white" />
                  <div className="absolute bottom-0 right-0 h-12 w-12 border-b-4 border-r-4 border-white" />

                  {!starting && (
                    <div className="absolute left-3 right-3 top-1/2 h-0.5 animate-pulse bg-red-500" />
                  )}
                </div>
              </div>
            )}
          </div>

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

            {cameraError && (
              <button
                type="button"
                onClick={() => void startScanner()}
                className="mt-4 rounded-xl bg-[#800020] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#650019]"
              >
                ลองเปิดกล้องอีกครั้ง
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
