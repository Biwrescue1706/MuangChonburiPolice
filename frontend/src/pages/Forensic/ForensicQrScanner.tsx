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
  const mountedRef = useRef(true);

  const [starting, setStarting] = useState(true);
  const [cameraError, setCameraError] = useState(false);

  /* ======================================================
     UUID
  ====================================================== */

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  /* ======================================================
     STOP CAMERA
  ====================================================== */

  const stopScanner = async () => {
    scanningRef.current = false;

    const scanner = scannerRef.current;

    if (!scanner) {
      return;
    }

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
  };

  /* ======================================================
     GET SUBMISSION ID FROM QR
  ====================================================== */

  const getSubmissionIdFromQr = (
    decodedText: string,
  ): string | null => {
    const value = decodedText.trim();

    console.log("================================");
    console.log("QR RAW VALUE:");
    console.log(value);
    console.log("================================");

    if (!value) {
      return null;
    }

    /* ====================================================
       1. QR เป็น UUID ตรง ๆ

       เช่น
       15ab6ebf-3098-444e-88d3-e3229afd216c
    ==================================================== */

    if (uuidRegex.test(value)) {
      console.log("QR TYPE: UUID");

      return value;
    }

    /* ====================================================
       2. QR เป็น URL

       เช่น
       https://xxx.com/forensic-status/UUID

       หรือ
       https://xxx.com/forensic-status/UUID?xxx=xxx
    ==================================================== */

    try {
      const url = new URL(value);

      console.log("QR URL:", url.href);
      console.log("QR PATH:", url.pathname);

      /* -----------------------------------------------
         /forensic-status/:id
      ------------------------------------------------ */

      const pathMatch =
        url.pathname.match(
          /\/forensic-status\/([^/]+)$/i,
        );

      if (pathMatch?.[1]) {
        const id = decodeURIComponent(
          pathMatch[1],
        );

        if (uuidRegex.test(id)) {
          console.log(
            "QR TYPE: FORENSIC STATUS URL",
          );

          return id;
        }
      }

      /* -----------------------------------------------
         /forensic-submission/:id
      ------------------------------------------------ */

      const submissionMatch =
        url.pathname.match(
          /\/forensic-submission\/([^/]+)$/i,
        );

      if (submissionMatch?.[1]) {
        const id = decodeURIComponent(
          submissionMatch[1],
        );

        if (uuidRegex.test(id)) {
          console.log(
            "QR TYPE: FORENSIC SUBMISSION URL",
          );

          return id;
        }
      }

      /* -----------------------------------------------
         Query String

         ?id=UUID
         ?submissionId=UUID
      ------------------------------------------------ */

      const queryId =
        url.searchParams.get("submissionId") ||
        url.searchParams.get("id");

      if (
        queryId &&
        uuidRegex.test(queryId)
      ) {
        console.log(
          "QR TYPE: QUERY STRING",
        );

        return queryId;
      }
    } catch {
      console.log(
        "QR ไม่ใช่ URL",
      );
    }

    /* ====================================================
       3. เผื่อ QR มีข้อความอื่นปนมา

       เช่น

       submissionId:
       15ab6ebf-3098-444e-88d3-e3229afd216c
    ==================================================== */

    const uuidMatch =
      value.match(
        /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i,
      );

    if (uuidMatch?.[0]) {
      console.log(
        "QR TYPE: UUID INSIDE TEXT",
      );

      return uuidMatch[0];
    }

    return null;
  };

  /* ======================================================
     SAVE SCAN AUTHORIZATION
  ====================================================== */

  const authorizeScan = (
    submissionId: string,
  ) => {
    sessionStorage.setItem(
      "forensic_scan_authorized",
      "true",
    );

    sessionStorage.setItem(
      "forensic_scan_id",
      submissionId,
    );

    sessionStorage.setItem(
      `forensic-scan-${submissionId}`,
      "true",
    );

    console.log(
      "================================",
    );

    console.log(
      "FORENSIC SCAN AUTHORIZED",
    );

    console.log(
      "Submission ID:",
      submissionId,
    );

    console.log(
      "================================",
    );
  };

  /* ======================================================
     LOAD SUBMISSION
  ====================================================== */

  const loadSubmission = async (
    submissionId: string,
  ) => {
    console.log(
      "================================",
    );

    console.log(
      "GET FORENSIC STATUS",
    );

    console.log(
      "Submission ID:",
      submissionId,
    );

    console.log(
      "URL:",
      `/forensic-status/${submissionId}`,
    );

    console.log(
      "================================",
    );

    try {
      const response =
        await api.get(
          `/forensic-status/${encodeURIComponent(
            submissionId,
          )}`,
        );

      console.log(
        "FORENSIC STATUS RESPONSE:",
        response.data,
      );

      const submission =
        response?.data?.data ??
        response?.data;

      if (!submission) {
        throw new Error(
          "ไม่พบข้อมูล Submission",
        );
      }

      return submission;
    } catch (error: any) {
      console.error(
        "FORENSIC STATUS API ERROR:",
        error,
      );

      console.error(
        "STATUS:",
        error?.response?.status,
      );

      console.error(
        "RESPONSE:",
        error?.response?.data,
      );

      throw error;
    }
  };

  /* ======================================================
     START CAMERA
  ====================================================== */

  const startScanner = async () => {
    try {
      await stopScanner();

      if (!mountedRef.current) {
        return;
      }

      setStarting(true);
      setCameraError(false);

      await new Promise((resolve) =>
        setTimeout(resolve, 300),
      );

      if (!mountedRef.current) {
        return;
      }

      const element =
        document.getElementById(
          "forensic-qr-reader",
        );

      if (!element) {
        throw new Error(
          "ไม่พบพื้นที่กล้อง",
        );
      }

      const scanner =
        new Html5Qrcode(
          "forensic-qr-reader",
        );

      scannerRef.current = scanner;
      scanningRef.current = true;

      await scanner.start(
        {
          facingMode: {
            ideal: "environment",
          },
        },
        {
          fps: 15,

          qrbox: (
            viewfinderWidth,
            viewfinderHeight,
          ) => {
            const size = Math.min(
              viewfinderWidth * 0.8,
              viewfinderHeight * 0.8,
              420,
            );

            return {
              width: Math.floor(
                Math.max(size, 220),
              ),
              height: Math.floor(
                Math.max(size, 220),
              ),
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
           QR SUCCESS
        ================================================== */

        async (decodedText) => {
          if (!scanningRef.current) {
            return;
          }

          scanningRef.current = false;

          console.log(
            "================================",
          );

          console.log(
            "QR SCANNED:",
          );

          console.log(
            decodedText,
          );

          console.log(
            "================================",
          );

          await stopScanner();

          try {
            /* ==============================================
               ดึง Submission ID
            ============================================== */

            const submissionId =
              getSubmissionIdFromQr(
                decodedText,
              );

            console.log(
              "EXTRACTED SUBMISSION ID:",
              submissionId,
            );

            if (!submissionId) {
              await Swal.fire({
                icon: "error",
                title: "QR Code ไม่ถูกต้อง",
                text:
                  "ไม่พบ Submission ID ใน QR Code",
                confirmButtonText: "ตกลง",
                confirmButtonColor:
                  "#800020",
              });

              await startScanner();

              return;
            }

            /* ==============================================
               โหลดข้อมูล
            ============================================== */

            const submission =
              await loadSubmission(
                submissionId,
              );

            const status =
              Number(
                submission.status,
              );

            console.log(
              "SUBMISSION:",
              submission,
            );

            console.log(
              "STATUS:",
              status,
            );

            /* ==============================================
               บันทึกสิทธิ์
            ============================================== */

            authorizeScan(
              submissionId,
            );

            /* ==============================================
               STATUS 4
            ============================================== */

            if (status === 4) {
              await Swal.fire({
                icon: "info",
                title:
                  "เอกสารดำเนินการเสร็จสิ้น",
                text:
                  "รายการนี้ส่งคืนต้นสังกัดแล้ว",
                confirmButtonText:
                  "ดูข้อมูล",
                confirmButtonColor:
                  "#800020",
              });
            }

            /* ==============================================
               ไปหน้า Status
            ============================================== */

            navigate(
              `/forensic-status/${encodeURIComponent(
                submissionId,
              )}`,
              {
                replace: true,

                state: {
                  status,

                  completed:
                    status === 4,
                },
              },
            );
          } catch (error: any) {
            console.error(
              "QR Error:",
              error,
            );

            const httpStatus =
              error?.response?.status;

            const backendError =
              error?.response?.data
                ?.error ||
              error?.response?.data
                ?.message;

            /* ==============================================
               404
            ============================================== */

            if (httpStatus === 404) {
              await Swal.fire({
                icon: "error",
                title: "ไม่พบข้อมูล",
                html: `
                  <div style="font-size:14px">
                    <p>ไม่พบข้อมูลเอกสารนี้ในระบบ</p>

                    <p style="
                      margin-top:12px;
                      padding:10px;
                      background:#f5f5f5;
                      border-radius:8px;
                      word-break:break-all;
                      font-family:monospace;
                    ">
                      ${getSubmissionIdFromQr(
                        decodedText,
                      ) || "-"}
                    </p>
                  </div>
                `,
                confirmButtonText:
                  "ตกลง",
                confirmButtonColor:
                  "#800020",
              });
            }

            /* ==============================================
               400
            ============================================== */

            else if (
              httpStatus === 400
            ) {
              await Swal.fire({
                icon: "warning",
                title: "ข้อมูลไม่ถูกต้อง",
                text:
                  backendError ||
                  "ข้อมูล QR Code ไม่ถูกต้อง",
                confirmButtonText:
                  "ตกลง",
                confirmButtonColor:
                  "#800020",
              });
            }

            /* ==============================================
               500
            ============================================== */

            else if (
              httpStatus === 500
            ) {
              await Swal.fire({
                icon: "error",
                title:
                  "ระบบเกิดข้อผิดพลาด",
                text:
                  backendError ||
                  "เซิร์ฟเวอร์ไม่สามารถโหลดข้อมูลได้",
                confirmButtonText:
                  "ตกลง",
                confirmButtonColor:
                  "#800020",
              });
            }

            /* ==============================================
               Network / อื่น ๆ
            ============================================== */

            else {
              await Swal.fire({
                icon: "error",
                title:
                  "ไม่สามารถโหลดข้อมูล",
                text:
                  backendError ||
                  "ไม่สามารถโหลดข้อมูลเอกสารนี้ได้",
                confirmButtonText:
                  "ตกลง",
                confirmButtonColor:
                  "#800020",
              });
            }

            if (mountedRef.current) {
              await startScanner();
            }
          }
        },

        /* ==================================================
           QR ERROR
        ================================================== */

        () => {
          // ไม่ต้องแสดง error ทุก frame
        },
      );

      if (!mountedRef.current) {
        await stopScanner();
        return;
      }

      setStarting(false);

      /* ====================================================
         AUTO FOCUS
      ==================================================== */

      setTimeout(async () => {
        try {
          const video =
            document.querySelector(
              "#forensic-qr-reader video",
            ) as HTMLVideoElement | null;

          if (!video?.srcObject) {
            return;
          }

          const stream =
            video.srcObject as MediaStream;

          const track =
            stream.getVideoTracks()[0];

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

          console.log(
            "Camera capabilities:",
            capabilities,
          );

          if (
            Array.isArray(
              capabilities.focusMode,
            ) &&
            capabilities.focusMode.includes(
              "continuous",
            )
          ) {
            await track.applyConstraints({
              advanced: [
                {
                  focusMode:
                    "continuous",
                } as any,
              ],
            });

            console.log(
              "เปิด Continuous Autofocus แล้ว",
            );
          }
        } catch (error) {
          console.log(
            "ไม่สามารถตั้ง autofocus:",
            error,
          );
        }
      }, 700);
    } catch (error) {
      console.error(
        "Start scanner error:",
        error,
      );

      if (!mountedRef.current) {
        return;
      }

      setStarting(false);
      setCameraError(true);

      await stopScanner();

      await Swal.fire({
        icon: "error",
        title: "เปิดกล้องไม่ได้",
        text:
          "กรุณาอนุญาตให้เว็บไซต์ใช้กล้อง และตรวจสอบว่าเว็บไซต์ใช้ HTTPS",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });
    }
  };

  /* ======================================================
     USE EFFECT
  ====================================================== */

  useEffect(() => {
    mountedRef.current = true;

    startScanner();

    return () => {
      mountedRef.current = false;

      stopScanner();
    };
  }, []);

  /* ======================================================
     UI
  ====================================================== */

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">

        {/* HEADER */}

        <div className="mb-6 rounded-3xl bg-[#800020] p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold">
            สแกนเอกสารส่งตรวจ ศพฐ.
          </h1>

          <p className="mt-2 text-lg text-white/80">
            สแกน QR Code จากเอกสารเพื่อแสดงข้อมูล
          </p>
        </div>

        {/* CAMERA CARD */}

        <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-lg">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {starting
                  ? "กำลังเปิดกล้อง..."
                  : "กำลังสแกน"}
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

          {/* CAMERA */}

          <div className="relative overflow-hidden rounded-3xl bg-black">

            <div
              id="forensic-qr-reader"
              className="w-full"
            />

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

          {/* STATUS */}

          <div className="mt-5 text-center">

            {starting ? (
              <p className="text-sm text-gray-500">
                กำลังเปิดกล้อง...
              </p>
            ) : cameraError ? (
              <p className="text-sm text-red-500">
                ไม่สามารถเปิดกล้องได้
              </p>
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

          {/* RETRY */}

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