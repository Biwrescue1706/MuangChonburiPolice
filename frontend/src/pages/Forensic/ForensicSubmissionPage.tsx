// src/pages/Forensic/ForensicSubmissionPage.tsx

import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Person {
  personId: string;
  fullName: string;
  purpose?: string;
  receiptBookNo?: string;
  receiptNo?: string;
  receiptDate?: string;
}

interface StatusHistoryItem {
  historyId: string;
  person: Person;
}

export default function ForensicSubmissionPage() {
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [submissionNo, setSubmissionNo] = useState("");

  // ต่ำกว่า 1280px = Card
  // ตั้งแต่ 1280px = Table
  const [isCardView, setIsCardView] = useState(
    window.innerWidth < 1280,
  );

  // =========================================================
  // RESPONSIVE
  // =========================================================

  useEffect(() => {
    const handleResize = () => {
      setIsCardView(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // =========================================================
  // FETCH DATA
  // =========================================================

  const fetchData = async (
    selectedStartDate: string,
    selectedEndDate: string,
  ) => {
    try {
      setLoading(true);

      const res = await api.get(
        "/status-history/range",
        {
          params: {
            startDate: selectedStartDate,
            endDate: selectedEndDate,
          },
        },
      );

      const data = (res.data.data || [])
        .map(
          (item: StatusHistoryItem) =>
            item.person,
        )
        .filter(Boolean);

      const uniquePersons = data.filter(
        (
          person: Person,
          index: number,
          self: Person[],
        ) =>
          index ===
          self.findIndex(
            (p) =>
              p.personId === person.personId,
          ),
      );

      uniquePersons.sort(
        (a: Person, b: Person) => {
          const bookA = Number(
            a.receiptBookNo || 0,
          );

          const bookB = Number(
            b.receiptBookNo || 0,
          );

          if (bookA !== bookB) {
            return bookA - bookB;
          }

          const noA = Number(
            a.receiptNo || 0,
          );

          const noB = Number(
            b.receiptNo || 0,
          );

          return noA - noB;
        },
      );

      setPersons(uniquePersons);
      setSelectedIds([]);
    } catch (err) {
      console.error(
        "โหลดข้อมูลไม่สำเร็จ:",
        err,
      );

      setPersons([]);
      setSelectedIds([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchData(startDate, endDate);
  }, []);

  // =========================================================
  // SELECT PERSON
  // =========================================================

  const togglePerson = (personId: string) => {
    setSelectedIds((prev) =>
      prev.includes(personId)
        ? prev.filter(
            (id) => id !== personId,
          )
        : [...prev, personId],
    );
  };

  // =========================================================
  // SELECT ALL
  // =========================================================

  const toggleAll = () => {
    if (
      selectedIds.length ===
      persons.length
    ) {
      setSelectedIds([]);
    } else {
      setSelectedIds(
        persons.map(
          (person) => person.personId,
        ),
      );
    }
  };

  // =========================================================
  // GENERATE PDF
  // =========================================================

  const handleGenerate = async () => {
    try {
      if (selectedIds.length === 0) {
        await Swal.fire({
          icon: "warning",
          title: "ยังไม่ได้เลือกบุคคล",
          text: "กรุณาเลือกบุคคลที่ต้องการออกหนังสือ",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#800020",
        });

        return;
      }

      if (!submissionNo.trim()) {
        await Swal.fire({
          icon: "warning",
          title: "กรุณากรอกเลขหนังสือนำส่ง",
          text: "ต้องระบุเลขหนังสือนำส่งก่อนออก PDF",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#800020",
        });

        return;
      }

      await api.post(
        "/forensic-submission/create",
        {
          submissionNo:
            submissionNo.trim(),
          personIds: selectedIds,
        },
      );

      await Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "สร้างรายการเรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(
        "/forensic-submission/list",
      );
    } catch (err: any) {
      console.error(err);

      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text:
          err?.response?.data?.error ||
          "ไม่สามารถสร้างรายการได้",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  const LoadingView = () => (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#800020]" />

      <p className="mt-4 text-sm font-semibold text-gray-500">
        กำลังโหลดข้อมูล...
      </p>
    </div>
  );

  // =========================================================
  // EMPTY
  // =========================================================

  const EmptyView = () => (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-gray-300 shadow-sm">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3.5h8l4 4V20H6z" />
          <path d="M14 3.5V8h4" />
          <path d="M9 12h6" />
          <path d="M9 15.5h4" />
        </svg>
      </div>

      <p className="mt-4 text-base font-bold text-gray-700">
        ไม่พบข้อมูล
      </p>

      <p className="mt-1 text-xs text-gray-400">
        ไม่พบรายการบุคคลในช่วงวันที่ที่เลือก
      </p>
    </div>
  );

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="main-content px-3 py-4 sm:px-4">
      <div className="mx-auto w-full max-w-[1600px]">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#650017] to-[#800020] px-5 py-5 text-white shadow-lg sm:px-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">

                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3.5h8l4 4V20H6z" />
                  <path d="M14 3.5V8h4" />
                  <path d="M9 12h6" />
                  <path d="M9 15.5h6" />
                </svg>

              </div>

              <div>

                <h1 className="text-lg font-bold sm:text-xl">
                  ออกหนังสือส่ง ศพฐ.
                </h1>

                <p className="mt-1 text-xs text-white/70">
                  จัดทำรายการบุคคลเพื่อออกหนังสือนำส่ง
                </p>

              </div>

            </div>

            <div className="rounded-xl bg-white/10 px-5 py-2 text-center">

              <p className="text-[10px] text-white/60">
                เลือกแล้ว
              </p>

              <p className="text-2xl font-bold">
                {selectedIds.length}
              </p>

              <p className="text-[10px] text-white/60">
                คน
              </p>

            </div>

          </div>
        </div>

        {/* =====================================================
            CONTROL PANEL
        ===================================================== */}

        <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">

          <div className="mb-4 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#800020]/10 text-[#800020]">

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="17"
                  rx="2"
                />
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <path d="M3 9h18" />
              </svg>

            </div>

            <div>

              <h2 className="text-sm font-bold text-gray-800">
                ค้นหาและสร้างหนังสือ
              </h2>

              <p className="text-[10px] text-gray-400">
                เลือกช่วงวันที่และกรอกเลขหนังสือนำส่ง
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-end">

            {/* START DATE */}

            <div>

              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                วันที่เริ่มต้น
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value,
                  )
                }
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none transition focus:border-[#800020] focus:bg-white focus:ring-2 focus:ring-[#800020]/10"
              />

            </div>

            {/* END DATE */}

            <div>

              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                วันที่สิ้นสุด
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(
                    e.target.value,
                  )
                }
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none transition focus:border-[#800020] focus:bg-white focus:ring-2 focus:ring-[#800020]/10"
              />

            </div>

            {/* SEARCH */}

            <button
              type="button"
              onClick={() =>
                fetchData(
                  startDate,
                  endDate,
                )
              }
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  กำลังค้นหา...
                </>
              ) : (
                <>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                    />
                    <path d="m20 20-4-4" />
                  </svg>

                  ค้นหา
                </>
              )}

            </button>

            {/* GENERATE */}

            <button
              type="button"
              onClick={handleGenerate}
              disabled={
                loading ||
                persons.length === 0
              }
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#800020] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#650017] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >

              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 3.5h8l4 4V20H6z" />
                <path d="M14 3.5V8h4" />
                <path d="M9 13h6" />
                <path d="M12 10v6" />
              </svg>

              ออก PDF ศพฐ.

            </button>

          </div>

          {/* SUBMISSION NUMBER */}

          <div className="mt-4">

            <label className="mb-1.5 block text-xs font-semibold text-gray-600">
              เลขหนังสือนำส่ง
            </label>

            <input
              type="text"
              value={submissionNo}
              onChange={(e) =>
                setSubmissionNo(
                  e.target.value,
                )
              }
              placeholder="กรอกเลขหนังสือนำส่ง เช่น ที่ ชบ 0017/..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#800020] focus:bg-white focus:ring-2 focus:ring-[#800020]/10"
            />

          </div>

        </div>

        {/* =====================================================
            SELECT SUMMARY
        ===================================================== */}

        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 11l3 3L20 6" />
                <path d="M4 12a8 8 0 1 0 16 0" />
              </svg>

            </div>

            <div>

              <p className="text-[10px] font-semibold text-blue-500">
                รายการที่เลือก
              </p>

              <p className="text-sm font-bold text-gray-800">
                เลือกบุคคลเพื่อออกหนังสือ
              </p>

            </div>

          </div>

          <div className="text-left sm:text-right">

            <span className="text-2xl font-bold text-blue-700">
              {selectedIds.length}
            </span>

            <span className="ml-1 text-xs font-semibold text-blue-500">
              / {persons.length} คน
            </span>

          </div>

        </div>

        {/* =====================================================
            SELECT BUTTONS
        ===================================================== */}

        <div className="mb-3 flex flex-wrap gap-2">

          <button
            type="button"
            onClick={toggleAll}
            disabled={persons.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-[#800020] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#650017] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >

            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11l3 3L20 6" />
              <path d="M4 12a8 8 0 1 0 16 0" />
            </svg>

            {selectedIds.length ===
            persons.length
              ? "ยกเลิกเลือกทั้งหมด"
              : "เลือกทั้งหมด"}

          </button>

          {selectedIds.length > 0 && (
            <button
              type="button"
              onClick={() =>
                setSelectedIds([])
              }
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-600 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]"
            >
              ยกเลิกการเลือก
            </button>
          )}

        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        {loading ? (
          <LoadingView />
        ) : persons.length === 0 ? (
          <EmptyView />
        ) : isCardView ? (

          /* ===================================================
             CARD VIEW
          =================================================== */

          <div className="flex flex-col gap-3">

            {persons.map(
              (person, index) => {
                const selected =
                  selectedIds.includes(
                    person.personId,
                  );

                return (
                  <div
                    key={person.personId}
                    onClick={() =>
                      togglePerson(
                        person.personId,
                      )
                    }
                    className={`relative cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
                      selected
                        ? "border-[#800020] bg-[#800020]/[0.02] shadow-md"
                        : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                    }`}
                  >

                    <div
                      className={`absolute left-0 top-0 h-full w-1 ${
                        selected
                          ? "bg-[#800020]"
                          : "bg-gray-200"
                      }`}
                    />

                    <div className="p-4 pl-5 sm:p-5 sm:pl-6">

                      <div className="flex items-start gap-3">

                        {/* CHECKBOX */}

                        <div className="pt-1">

                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() =>
                              togglePerson(
                                person.personId,
                              )
                            }
                            onClick={(e) =>
                              e.stopPropagation()
                            }
                            className="h-5 w-5 cursor-pointer accent-[#800020]"
                          />

                        </div>

                        {/* NUMBER */}

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xs font-bold text-gray-500">

                          {index + 1}

                        </div>

                        {/* NAME */}

                        <div className="min-w-0 flex-1">

                          <h3 className="break-words text-base font-bold text-gray-900">
                            {person.fullName}
                          </h3>

                          <p className="mt-1 text-[10px] text-gray-400">
                            ID:{" "}
                            {person.personId}
                          </p>

                        </div>

                        {/* SELECTED */}

                        {selected && (
                          <span className="shrink-0 rounded-full bg-[#800020]/10 px-3 py-1 text-[10px] font-bold text-[#800020]">
                            เลือกแล้ว
                          </span>
                        )}

                      </div>

                      {/* DETAILS */}

                      <div className="mt-4 ml-[84px] space-y-3">

                        <div>

                          <p className="text-[10px] font-semibold text-gray-400">
                            เรื่องที่ขออนุญาต
                          </p>

                          <p className="mt-1 break-words text-sm font-semibold leading-5 text-gray-800">
                            {person.purpose ||
                              "-"}
                          </p>

                        </div>

                        <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-3">

                          <div className="rounded-xl bg-gray-50 p-3">

                            <p className="text-[9px] text-gray-400">
                              เล่มที่
                            </p>

                            <p className="mt-1 text-sm font-bold text-gray-800">
                              {person.receiptBookNo ||
                                "-"}
                            </p>

                          </div>

                          <div className="rounded-xl bg-gray-50 p-3">

                            <p className="text-[9px] text-gray-400">
                              เลขที่
                            </p>

                            <p className="mt-1 text-sm font-bold text-gray-800">
                              {person.receiptNo ||
                                "-"}
                            </p>

                          </div>

                          <div className="rounded-xl bg-gray-50 p-3">

                            <p className="text-[9px] text-gray-400">
                              ลงวันที่
                            </p>

                            <p className="mt-1 text-xs font-bold text-gray-800">
                              {person.receiptDate ||
                                "-"}
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                );
              },
            )}

          </div>

        ) : (

          /* ===================================================
             TABLE VIEW
          =================================================== */

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            <div className="w-full overflow-x-auto">

              <table className="w-full min-w-[1000px] border-collapse text-sm">

                <thead>

                  <tr className="bg-gradient-to-r from-[#650017] to-[#800020] text-white">

                    <th className="w-[60px] border-r border-white/10 px-3 py-4 text-center">

                      <input
                        type="checkbox"
                        checked={
                          persons.length >
                            0 &&
                          selectedIds.length ===
                            persons.length
                        }
                        onChange={toggleAll}
                        className="h-4 w-4 cursor-pointer accent-[#800020]"
                      />

                    </th>

                    <th className="w-[70px] px-3 py-4 text-center text-xs font-bold">
                      ลำดับ
                    </th>

                    <th className="min-w-[190px] px-4 py-4 text-left text-xs font-bold">
                      ชื่อ และ ชื่อสกุล
                    </th>

                    <th className="min-w-[280px] px-4 py-4 text-left text-xs font-bold">
                      เรื่องที่ขออนุญาต
                    </th>

                    <th className="w-[100px] px-3 py-4 text-center text-xs font-bold">
                      เล่มที่
                    </th>

                    <th className="w-[100px] px-3 py-4 text-center text-xs font-bold">
                      เลขที่
                    </th>

                    <th className="w-[130px] px-3 py-4 text-center text-xs font-bold">
                      ลงวันที่
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {persons.map(
                    (person, index) => {
                      const selected =
                        selectedIds.includes(
                          person.personId,
                        );

                      return (
                        <tr
                          key={
                            person.personId
                          }
                          className={`border-b border-gray-100 transition-colors ${
                            selected
                              ? "bg-[#800020]/5"
                              : index % 2 === 0
                                ? "bg-white"
                                : "bg-gray-50/70"
                          } hover:bg-[#800020]/5`}
                        >

                          <td className="px-3 py-4 text-center">

                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() =>
                                togglePerson(
                                  person.personId,
                                )
                              }
                              className="h-4 w-4 cursor-pointer accent-[#800020]"
                            />

                          </td>

                          <td className="px-3 py-4 text-center text-xs font-semibold text-gray-500">
                            {index + 1}
                          </td>

                          <td className="px-4 py-4">

                            <p className="break-words text-sm font-bold text-gray-900">
                              {person.fullName}
                            </p>

                            <p className="mt-1 text-[9px] text-gray-400">
                              ID:{" "}
                              {person.personId}
                            </p>

                          </td>

                          <td className="max-w-[300px] whitespace-normal break-words px-4 py-4 text-left text-xs leading-5 text-gray-700">
                            {person.purpose ||
                              "-"}
                          </td>

                          <td className="px-3 py-4 text-center text-sm font-bold text-gray-800">
                            {person.receiptBookNo ||
                              "-"}
                          </td>

                          <td className="px-3 py-4 text-center text-sm font-bold text-gray-800">
                            {person.receiptNo ||
                              "-"}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold text-gray-600">
                            {person.receiptDate ||
                              "-"}
                          </td>

                        </tr>
                      );
                    },
                  )}

                </tbody>

                <tfoot>

                  <tr className="border-t border-gray-200 bg-gray-50">

                    <td
                      colSpan={7}
                      className="px-4 py-4 text-right text-sm font-bold text-gray-700"
                    >
                      เลือกแล้ว{" "}
                      <span className="text-[#800020]">
                        {selectedIds.length}
                      </span>{" "}
                      จาก{" "}
                      <span className="text-gray-800">
                        {persons.length}
                      </span>{" "}
                      คน
                    </td>

                  </tr>

                </tfoot>

              </table>

            </div>

            <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 text-[10px] text-gray-400">
              เลื่อนซ้าย-ขวาเพื่อดูข้อมูลเพิ่มเติม
            </div>

          </div>
        )}

      </div>
    </div>
  );
}