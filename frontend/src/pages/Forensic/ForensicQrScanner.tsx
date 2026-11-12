import { useCallback, useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Camera,
  CameraOff,
  ScanLine,
  ShieldCheck,
  FileSearch,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  CircleAlert,
  Scan,
} from "lucide-react";
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

  if (UUID_REGEX.test(value)) {
    return value;
  }

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
    <div className="min-h-screen bg-[#f4f6fa] px-4 py-6 sm:px-6 lg:py-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="relative mb-6 overflow-hidden rounded-[28px] bg-[#78243b] px-6 py-8 text-white shadow-xl shadow-rose-950/10 sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/5" />

          <div className="relative flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 shadow-inner">
              <ScanLine size={30} strokeWidth={1.8} />
            </div>

            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/90">
                  FORENSIC DOCUMENT
                </span>
                <span className="flex items-center gap-1.5 text-xs text-rose-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  ระบบสแกนเอกสาร
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                สแกนเอกสารส่งตรวจ ศพฐ.
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-rose-100 sm:text-base">
                สแกน QR Code บนเอกสารเพื่อตรวจสอบสถานะและแสดงรายละเอียด
                การดำเนินงาน
              </p>
            </div>
          </div>

          <div className="relative mt-7 flex flex-wrap gap-5 border-t border-white/15 pt-5 text-sm text-rose-100">
            <div className="flex items-center gap-2">
              <ShieldCheck size={17} />
              ตรวจสอบข้อมูลจากระบบ
            </div>
            <div className="flex items-center gap-2">
              <Camera size={17} />
              รองรับกล้องมือถือและคอมพิวเตอร์
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-lg shadow-slate-900/5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-[#78243b]">
                <Scan size={22} />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  พื้นที่สแกน QR Code
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  {starting
                    ? "กำลังเตรียมกล้อง..."
                    : cameraError
                      ? "ไม่สามารถเชื่อมต่อกล้องได้"
                      : "กล้องพร้อมใช้งาน กรุณาจัด QR Code ให้อยู่ในกรอบ"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void handleClose()}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-[#78243b]"
            >
              <ArrowLeft size={16} />
              ย้อนกลับ
            </button>
          </div>

          <div className="p-4 sm:p-7">
            <div className="relative overflow-hidden rounded-[22px] bg-[#111827]">
              <div
                id="forensic-qr-reader"
                className="min-h-[320px] w-full overflow-hidden sm:min-h-[420px]"
              />

              {!cameraError && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="relative h-64 w-64 sm:h-80 sm:w-80">
                    <div className="absolute left-0 top-0 h-12 w-12 rounded-tl-xl border-l-[5px] border-t-[5px] border-rose-400" />
                    <div className="absolute right-0 top-0 h-12 w-12 rounded-tr-xl border-r-[5px] border-t-[5px] border-rose-400" />
                    <div className="absolute bottom-0 left-0 h-12 w-12 rounded-bl-xl border-b-[5px] border-l-[5px] border-rose-400" />
                    <div className="absolute bottom-0 right-0 h-12 w-12 rounded-br-xl border-b-[5px] border-r-[5px] border-rose-400" />

                    {!starting && (
                      <div className="absolute left-3 right-3 top-1/2 h-0.5 animate-pulse bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.9)]" />
                    )}
                  </div>
                </div>
              )}

              {starting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 text-white">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                    <Camera size={32} className="animate-pulse" />
                  </div>
                  <p className="font-semibold">กำลังเปิดกล้อง</p>
                  <p className="mt-1 text-sm text-white/60">
                    กรุณารอสักครู่...
                  </p>
                </div>
              )}

              {cameraError && !starting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 px-5 text-center text-white">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400">
                    <CameraOff size={32} />
                  </div>

                  <h3 className="text-lg font-bold">ไม่สามารถเปิดกล้องได้</h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-300">
                    กรุณาตรวจสอบการอนุญาตใช้งานกล้อง
                    และตรวจสอบว่าเว็บไซต์เชื่อมต่อผ่าน HTTPS
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-col items-center text-center">
              {starting ? (
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <RefreshCw size={16} className="animate-spin" />
                  กำลังเชื่อมต่อกล้อง...
                </div>
              ) : cameraError ? (
                <div className="flex items-center gap-2 text-sm font-medium text-rose-600">
                  <CircleAlert size={17} />
                  กล้องยังไม่พร้อมใช้งาน
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <CheckCircle2 size={17} />
                  พร้อมสแกน QR Code
                </div>
              )}

              <p className="mt-2 text-xs leading-5 text-slate-400">
                รองรับ QR Code จากเอกสารกระดาษและหน้าจออุปกรณ์
              </p>

              {cameraError && (
                <button
                  type="button"
                  onClick={() => void startScanner()}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#78243b] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-rose-950/10 transition hover:bg-[#641d31] active:scale-[0.98]"
                >
                  <RefreshCw size={17} />
                  ลองเปิดกล้องอีกครั้ง
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-[#78243b]">
              <Camera size={19} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">1. เปิดกล้อง</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                อนุญาตให้เว็บไซต์เข้าถึงกล้อง
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <ScanLine size={19} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                2. สแกน QR Code
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                จัด QR Code ให้อยู่ตรงกลางกรอบ
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <FileSearch size={19} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                3. ตรวจสอบข้อมูล
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                ระบบจะแสดงข้อมูลเอกสารโดยอัตโนมัติ
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-slate-200 px-2 pt-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-400">ระบบจัดการเอกสารส่งตรวจ ศพฐ.</p>
          <p className="text-xs font-medium text-slate-400">
            Forensic Document Management System
          </p>
        </div>
      </div>
    </div>
  );
}
