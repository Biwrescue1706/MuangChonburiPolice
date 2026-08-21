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
  const startingRef = useRef(false);

  const [starting, setStarting] = useState(true);
  const [cameraError, setCameraError] = useState(false);

  /* ======================================================
     UUID
  ====================================================== */

  const UUID_REGEX =
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

    if (!value) {
      return null;
    }

    console.log(
      "====================================",
    );

    console.log(
      "QR RAW:",
      decodedText,
    );

    console.log(
      "QR CLEAN:",
      value,
    );

    /* ==================================================
       QR แบบ UUID โดยตรง

       เช่น

       15ab6ebf-3098-444e-88d3-e3229afd216c
    ================================================== */

    if (UUID_REGEX.test(value)) {
      console.log(
        "QR TYPE: UUID",
      );

      console.log(
        "Submission ID:",
        value,
      );

      return value;
    }

    /* ==================================================
       QR แบบ URL

       https://domain.com/forensic-status/:id
    ================================================== */

    try {
      const url = new URL(value);

      const match =
        url.pathname.match(
          /\/forensic-status\/([^/]+)\/?$/i,
        );

      if (match?.[1]) {
        const id = decodeURIComponent(
          match[1],
        ).trim();

        if (UUID_REGEX.test(id)) {
          console.log(
            "QR TYPE: URL",
          );

          console.log(
            "Submission ID:",
            id,
          );

          return id;
        }
      }
    } catch {
      // ไม่ใช่ URL
    }

    /* ==================================================
       รองรับ QR ที่มีข้อความต่อท้าย

       เช่น

       forensic-status:UUID
    ================================================== */

    const prefixMatch =
      value.match(
        /(?:forensic-status:|submissionId=)([0-9a-f-]{36})/i,
      );

    if (
      prefixMatch?.[1] &&
      UUID_REGEX.test(prefixMatch[1])
    ) {
      console.log(
        "QR TYPE: PREFIX",
      );

      console.log(
        "Submission ID:",
        prefixMatch[1],
      );

      return prefixMatch[1];
    }

    console.log(
      "QR TYPE: UNKNOWN",
    );

    console.log(
      "====================================",
    );

    return null;
  };

  /* ======================================================
     AUTHORIZE SCAN
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
      "====================================",
    );

    console.log(
      "FORENSIC SCAN AUTHORIZED",
    );

    console.log(
      "Submission ID:",
      submissionId,
    );

    console.log(
      "Global:",
      sessionStorage.getItem(
        "forensic_scan_authorized",
      ),
    );

    console.log(
      "Scan ID:",
      sessionStorage.getItem(
        "forensic_scan_id",
      ),
    );

    console.log(
      "Per ID:",
      sessionStorage.getItem(
        `forensic-scan-${submissionId}`,
      ),
    );

    console.log(
      "====================================",
    );
  };

  /* ======================================================
     LOAD SUBMISSION
  ====================================================== */

  const loadSubmission = async (
    submissionId: string,
  ) => {
    const encodedId =
      encodeURIComponent(
        submissionId,
      );

    console.log(
      "====================================",
    );

    console.log(
      "LOAD FORENSIC SUBMISSION",
    );

    console.log(
      "Submission ID:",
      submissionId,
    );

    console.log(
      "Encoded ID:",
      encodedId,
    );

    console.log(
      "API:",
      `/forensic-status/${encodedId}`,
    );

    console.log(
      "====================================",
    );

    const response =
      await api.get(
        `/forensic-status/${encodedId}`,
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

    if (
      !submission.submissionId
    ) {
      throw new Error(
        "ข้อมูล Submission ไม่มี submissionId",
      );
    }

    return submission;
  };

  /* ======================================================
     START CAMERA
  ====================================================== */

  const startScanner = async () => {
    if (startingRef.current) {
      return;
    }

    startingRef.current = true;

    try {
      await stopScanner();

      setStarting(true);
      setCameraError(false);

      await new Promise(
        (resolve) =>
          setTimeout(resolve, 300),
      );

      const element =
        document.getElementById(
          "forensic-qr-reader",
        );

      if (!element) {
        throw new Error(
          "ไม่พบพื้นที่กล้อง",
        );
      }

      element.innerHTML = "";

      const scanner =
        new Html5Qrcode(
          "forensic-qr-reader",
        );

      scannerRef.current =
        scanner;

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
            const size =
              Math.min(
                viewfinderWidth *
                  0.78,

                viewfinderHeight *
                  0.78,

                420,
              );

            const finalSize =
              Math.max(
                220,
                Math.floor(size),
              );

            return {
              width: finalSize,
              height: finalSize,
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
          if (
            !scanningRef.current
          ) {
            return;
          }

          /*
           * ป้องกัน QR ยิงซ้ำ
           */
          scanningRef.current =
            false;

          console.log(
            "QR DECODED:",
            decodedText,
          );

          await stopScanner();

          try {
            /* ==================================================
               1. อ่าน Submission ID
            ================================================== */

            const submissionId =
              getSubmissionIdFromQr(
                decodedText,
              );

            if (!submissionId) {
              await Swal.fire({
                icon: "error",

                title:
                  "QR Code ไม่ถูกต้อง",

                text:
                  "QR Code นี้ไม่ใช่เอกสารส่งตรวจ ศพฐ.",

                confirmButtonText:
                  "ตกลง",

                confirmButtonColor:
                  "#800020",
              });

              await startScanner();

              return;
            }

            /* ==================================================
               2. โหลดข้อมูลจาก Backend
            ================================================== */

            let submission;

            try {
              submission =
                await loadSubmission(
                  submissionId,
                );
            } catch (error: any) {
              console.error(
                "LOAD SUBMISSION ERROR:",
                error,
              );

              const httpStatus =
                error?.response?.status;

              const backendData =
                error?.response?.data;

              console.error(
                "HTTP STATUS:",
                httpStatus,
              );

              console.error(
                "BACKEND DATA:",
                backendData,
              );

              if (
                httpStatus === 404
              ) {
                await Swal.fire({
                  icon: "error",

                  title:
                    "ไม่พบข้อมูล",

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
                      ">
                        ${submissionId}
                      </div>
                    </div>
                  `,

                  confirmButtonText:
                    "ตกลง",

                  confirmButtonColor:
                    "#800020",
                });
              } else {
                await Swal.fire({
                  icon: "error",

                  title:
                    "ไม่สามารถโหลดข้อมูล",

                  text:
                    backendData?.error ||
                    "ไม่สามารถโหลดข้อมูลเอกสารนี้ได้",

                  confirmButtonText:
                    "ตกลง",

                  confirmButtonColor:
                    "#800020",
                });
              }

              await startScanner();

              return;
            }

            /* ==================================================
               3. ตรวจ Submission ID
            ================================================== */

            if (
              submission.submissionId !==
              submissionId
            ) {
              console.error(
                "Submission ID ไม่ตรงกัน",
                {
                  qrId:
                    submissionId,

                  apiId:
                    submission.submissionId,
                },
              );

              await Swal.fire({
                icon: "error",

                title:
                  "ข้อมูลเอกสารไม่ตรงกัน",

                text:
                  "QR Code และข้อมูลในระบบมีรหัสไม่ตรงกัน",

                confirmButtonText:
                  "ตกลง",

                confirmButtonColor:
                  "#800020",
              });

              await startScanner();

              return;
            }

            /* ==================================================
               4. Status
            ================================================== */

            const status =
              Number(
                submission.status,
              );

            console.log(
              "Submission Status:",
              status,
            );

            /* ==================================================
               5. บันทึกสิทธิ์
            ================================================== */

            authorizeScan(
              submissionId,
            );

            /* ==================================================
               6. Status 4
            ================================================== */

            if (
              status === 4
            ) {
              const result =
                await Swal.fire({
                  icon: "info",

                  title:
                    "เอกสารดำเนินการเสร็จสิ้น",

                  text:
                    "รายการนี้ส่งคืนต้นสังกัดแล้ว",

                  showCancelButton:
                    true,

                  confirmButtonText:
                    "ดูข้อมูล",

                  cancelButtonText:
                    "ปิด",

                  confirmButtonColor:
                    "#800020",

                  cancelButtonColor:
                    "#6b7280",
                });

              if (
                !result.isConfirmed
              ) {
                await startScanner();

                return;
              }
            }

            /* ==================================================
               7. ไปหน้า Status
            ================================================== */

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

                  submission,
                },
              },
            );
          } catch (error: any) {
            console.error(
              "QR PROCESS ERROR:",
              error,
            );

            await Swal.fire({
              icon: "error",

              title:
                "เกิดข้อผิดพลาด",

              text:
                error?.message ||
                "ไม่สามารถดำเนินการกับ QR Code ได้",

              confirmButtonText:
                "ตกลง",

              confirmButtonColor:
                "#800020",
            });

            await startScanner();
          }
        },

        /* ==================================================
           QR ERROR
        ================================================== */

        () => {
          /*
           * ไม่แสดง Error ทุก frame
           */
        },
      );

      setStarting(false);

      /* ====================================================
         AUTO FOCUS
      ==================================================== */

      setTimeout(
        async () => {
          try {
            const video =
              document.querySelector(
                "#forensic-qr-reader video",
              ) as HTMLVideoElement | null;

            if (
              !video?.srcObject
            ) {
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

            /* ==================================================
               Continuous autofocus
            ================================================== */

            if (
              Array.isArray(
                capabilities.focusMode,
              ) &&
              capabilities.focusMode.includes(
                "continuous",
              )
            ) {
              await track.applyConstraints(
                {
                  advanced: [
                    {
                      focusMode:
                        "continuous",
                    } as any,
                  ],
                },
              );

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
        },
        700,
      );
    } catch (error) {
      console.error(
        "START SCANNER ERROR:",
        error,
      );

      setStarting(false);
      setCameraError(true);

      await stopScanner();

      await Swal.fire({
        icon: "error",

        title:
          "เปิดกล้องไม่ได้",

        text:
          "กรุณาอนุญาตให้เว็บไซต์ใช้กล้อง และตรวจสอบว่าเว็บไซต์ใช้ HTTPS",

        confirmButtonText:
          "ตกลง",

        confirmButtonColor:
          "#800020",
      });
    } finally {
      startingRef.current =
        false;
    }
  };

  /* ======================================================
     USE EFFECT
  ====================================================== */

  useEffect(() => {
    let mounted = true;

    const initialize =
      async () => {
        if (!mounted) {
          return;
        }

        await startScanner();
      };

    initialize();

    return () => {
      mounted = false;

      void stopScanner();
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

          <h1 className="text-3xl font-bold">
            สแกนเอกสารส่งตรวจ ศพฐ.
          </h1>

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


          {/* =================================================
              CAMERA
          ================================================= */}

          <div className="relative overflow-hidden rounded-3xl bg-black">

            <div
              id="forensic-qr-reader"
              className="w-full"
            />

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