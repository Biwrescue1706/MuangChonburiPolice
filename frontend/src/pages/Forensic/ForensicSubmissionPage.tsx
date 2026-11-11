import { useCallback, useEffect, useState } from "react";
import axios from "axios";
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

interface StatusHistoryResponse {
  data?: StatusHistoryItem[];
}

interface ApiErrorResponse {
  error?: string;
}

export default function ForensicSubmissionPage() {
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [loading, setLoading] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [submissionNo, setSubmissionNo] = useState("");
  const [isCardView, setIsCardView] = useState(() => window.innerWidth < 1280);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsCardView(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchData = useCallback(
    async (selectedStartDate: string, selectedEndDate: string) => {
      try {
        setLoading(true);

        const res = await api.get<StatusHistoryResponse>(
          "/status-history/range",
          {
            params: {
              startDate: selectedStartDate,
              endDate: selectedEndDate,
            },
          },
        );

        const data = (res.data.data ?? [])
          .map((item: StatusHistoryItem) => item.person)
          .filter((person): person is Person => Boolean(person));

        const uniquePersons = data.filter(
          (person, index, self) =>
            index ===
            self.findIndex((item) => item.personId === person.personId),
        );

        uniquePersons.sort((a, b) => {
          const bookA = Number(a.receiptBookNo || 0);
          const bookB = Number(b.receiptBookNo || 0);

          if (bookA !== bookB) {
            return bookA - bookB;
          }

          const noA = Number(a.receiptNo || 0);
          const noB = Number(b.receiptNo || 0);

          return noA - noB;
        });

        setPersons(uniquePersons);
        setSelectedIds([]);
      } catch (err: unknown) {
        console.error("โหลดข้อมูลไม่สำเร็จ:", err);

        setPersons([]);
        setSelectedIds([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    void fetchData(today, today);
  }, [fetchData, today]);

  const togglePerson = (personId: string) => {
    setSelectedIds((prev) =>
      prev.includes(personId)
        ? prev.filter((id) => id !== personId)
        : [...prev, personId],
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === persons.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(persons.map((person) => person.personId));
    }
  };

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

      await api.post("/forensic-submission/create", {
        submissionNo: submissionNo.trim(),
        personIds: selectedIds,
      });

      await Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "สร้างรายการเรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/forensic-submission/list");
    } catch (err: unknown) {
      console.error(err);

      const errorMessage = axios.isAxiosError<ApiErrorResponse>(err)
        ? err.response?.data?.error
        : undefined;

      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: errorMessage || "ไม่สามารถสร้างรายการได้",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#800020",
      });
    }
  };

  const LoadingView = () => (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-rose-100 opacity-60" />
        <div className="relative h-10 w-10 animate-spin rounded-full border-4 border-rose-100 border-t-[#800020]" />
      </div>

      <p className="mt-5 text-sm font-bold text-gray-700">กำลังโหลดข้อมูล...</p>
      <p className="mt-1 text-xs text-gray-400">กรุณารอสักครู่</p>
    </div>
  );

  const EmptyView = () => (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-5 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50 text-[#800020]">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3.5h8l4 4V20H6z" />
          <path d="M14 3.5V8h4" />
          <path d="M9 12h6" />
          <path d="M9 15.5h4" />
        </svg>
      </div>

      <p className="mt-5 text-base font-bold text-gray-700">ไม่พบข้อมูล</p>

      <p className="mt-1 max-w-sm text-xs leading-5 text-gray-400">
        ไม่พบรายการบุคคลในช่วงวันที่ที่เลือก
        กรุณาตรวจสอบช่วงวันที่แล้วลองค้นหาอีกครั้ง
      </p>
    </div>
  );

  const selectedAll =
    persons.length > 0 && selectedIds.length === persons.length;

  return (
    <div className="main-content min-h-screen bg-[#f7f7fa] px-3 py-4 sm:px-5 sm:py-6">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="relative mb-5 overflow-hidden rounded-2xl bg-gradient-to-br from-[#650017] via-[#800020] to-[#a52b49] px-5 py-6 text-white shadow-lg shadow-rose-950/10 sm:px-7 sm:py-7">
          <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full border-[25px] border-white/[0.04]" />
          <div className="absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-white/[0.04]" />

          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-inner">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
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
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-100/70">
                  Forensic Submission
                </p>
                <h1 className="text-xl font-bold sm:text-2xl">
                  ออกหนังสือส่ง ศพฐ.
                </h1>
                <p className="mt-1 text-xs text-white/70 sm:text-sm">
                  จัดทำรายการบุคคลเพื่อออกหนังสือนำส่ง
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm sm:self-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="10" cy="7" r="4" />
                  <path d="M20 8v6" />
                  <path d="M23 11h-6" />
                </svg>
              </div>

              <div>
                <p className="text-[10px] text-white/60">เลือกบุคคลแล้ว</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">
                    {selectedIds.length}
                  </span>
                  <span className="text-xs text-white/70">คน</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-4 sm:px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-[#800020]">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <path d="M3 9h18" />
              </svg>
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-800">
                ค้นหาและสร้างหนังสือ
              </h2>
              <p className="mt-0.5 text-[11px] text-gray-400">
                เลือกช่วงวันที่และกรอกเลขหนังสือนำส่ง
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <label className="mb-2 block text-xs font-bold text-gray-600">
                  วันที่เริ่มต้น
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none transition focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-rose-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-gray-600">
                  วันที่สิ้นสุด
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none transition focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-rose-100"
                />
              </div>

              <div className="flex flex-col justify-end">
                <button
                  type="button"
                  onClick={() => void fetchData(startDate, endDate)}
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
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-4-4" />
                      </svg>
                      ค้นหาข้อมูล
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-col justify-end">
                <button
                  type="button"
                  onClick={() => void handleGenerate()}
                  disabled={loading || persons.length === 0}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#800020] to-[#a52b49] px-4 text-sm font-bold text-white shadow-md shadow-rose-900/10 transition hover:from-[#650017] hover:to-[#800020] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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
            </div>

            <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50/60 p-4">
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-amber-800">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 6h13" />
                  <path d="M8 12h13" />
                  <path d="M8 18h13" />
                  <path d="M3 6h.01" />
                  <path d="M3 12h.01" />
                  <path d="M3 18h.01" />
                </svg>
                เลขหนังสือนำส่ง
                <span className="text-rose-600">*</span>
              </label>

              <input
                type="text"
                value={submissionNo}
                onChange={(e) => setSubmissionNo(e.target.value)}
                placeholder="กรอกเลขหนังสือนำส่ง เช่น ที่ ชบ 0017/..."
                className="h-11 w-full rounded-xl border border-amber-200 bg-white px-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#800020] focus:ring-4 focus:ring-rose-100"
              />
              <p className="mt-2 text-[10px] text-amber-700/70">
                กรุณาระบุเลขหนังสือนำส่งก่อนดำเนินการออก PDF
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-gray-400">
                  บุคคลทั้งหมด
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {persons.length}
                </p>
                <p className="mt-1 text-[10px] text-gray-400">รายการที่ค้นพบ</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="10" cy="7" r="4" />
                  <path d="M20 8v6" />
                  <path d="M23 11h-6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-gray-400">
                  เลือกแล้ว
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-700">
                  {selectedIds.length}
                </p>
                <p className="mt-1 text-[10px] text-gray-400">
                  บุคคลที่ต้องการส่งตรวจ
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 4 4L19 6" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-gray-400">
                  ยังไม่ได้เลือก
                </p>
                <p className="mt-1 text-2xl font-bold text-amber-600">
                  {Math.max(persons.length - selectedIds.length, 0)}
                </p>
                <p className="mt-1 text-[10px] text-gray-400">บุคคลที่เหลือ</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-[#800020]">
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
              <p className="text-sm font-bold text-gray-800">รายการบุคคล</p>
              <p className="mt-0.5 text-[10px] text-gray-400">
                เลือกบุคคลที่ต้องการนำไปออกหนังสือส่ง ศพฐ.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={toggleAll}
              disabled={persons.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#800020] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#650017] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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
                <path d="m5 12 4 4L19 6" />
              </svg>
              {selectedAll ? "ยกเลิกเลือกทั้งหมด" : "เลือกทั้งหมด"}
            </button>

            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-[#800020] active:scale-[0.98]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                ยกเลิกการเลือก
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <LoadingView />
        ) : persons.length === 0 ? (
          <EmptyView />
        ) : isCardView ? (
          <div className="flex flex-col gap-3">
            {persons.map((person, index) => {
              const selected = selectedIds.includes(person.personId);

              return (
                <div
                  key={person.personId}
                  onClick={() => togglePerson(person.personId)}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                    selected
                      ? "border-[#800020] bg-rose-50/20 shadow-md shadow-rose-900/5"
                      : "border-gray-100 hover:border-rose-200"
                  }`}
                >
                  <div
                    className={`absolute left-0 top-0 h-full w-1 transition-colors ${
                      selected ? "bg-[#800020]" : "bg-gray-200"
                    }`}
                  />

                  <div className="p-4 pl-5 sm:p-5 sm:pl-6">
                    <div className="flex items-start gap-3">
                      <div className="pt-1">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => togglePerson(person.personId)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-5 w-5 cursor-pointer accent-[#800020]"
                          aria-label={`เลือก ${person.fullName}`}
                        />
                      </div>

                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition ${
                          selected
                            ? "bg-[#800020] text-white"
                            : "bg-gray-100 text-gray-500 group-hover:bg-rose-50 group-hover:text-[#800020]"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="break-words text-sm font-bold leading-6 text-gray-900 sm:text-base">
                          {person.fullName}
                        </h3>
                        <p className="mt-1 break-all text-[10px] text-gray-400">
                          ID: {person.personId}
                        </p>
                      </div>

                      {selected && (
                        <span className="shrink-0 rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-[10px] font-bold text-[#800020]">
                          เลือกแล้ว
                        </span>
                      )}
                    </div>

                    <div className="ml-[84px] mt-4 space-y-3">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400">
                          เรื่องที่ขออนุญาต
                        </p>
                        <p className="mt-1 break-words text-sm font-semibold leading-6 text-gray-800">
                          {person.purpose || "-"}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-3">
                        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3">
                          <p className="text-[9px] font-medium text-blue-500">
                            เล่มที่
                          </p>
                          <p className="mt-1 text-sm font-bold text-gray-800">
                            {person.receiptBookNo || "-"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                          <p className="text-[9px] font-medium text-emerald-600">
                            เลขที่
                          </p>
                          <p className="mt-1 text-sm font-bold text-gray-800">
                            {person.receiptNo || "-"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3">
                          <p className="text-[9px] font-medium text-amber-600">
                            ลงวันที่
                          </p>
                          <p className="mt-1 text-xs font-bold text-gray-800">
                            {person.receiptDate || "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-[#650017] to-[#800020] text-white">
                    <th className="w-[60px] border-r border-white/10 px-3 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedAll}
                        onChange={toggleAll}
                        className="h-4 w-4 cursor-pointer accent-[#800020]"
                        aria-label="เลือกบุคคลทั้งหมด"
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
                  {persons.map((person, index) => {
                    const selected = selectedIds.includes(person.personId);

                    return (
                      <tr
                        key={person.personId}
                        className={`border-b border-gray-100 transition-colors ${
                          selected
                            ? "bg-rose-50/70"
                            : index % 2 === 0
                              ? "bg-white"
                              : "bg-gray-50/70"
                        } hover:bg-rose-50/70`}
                      >
                        <td className="px-3 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => togglePerson(person.personId)}
                            className="h-4 w-4 cursor-pointer accent-[#800020]"
                            aria-label={`เลือก ${person.fullName}`}
                          />
                        </td>

                        <td className="px-3 py-4 text-center">
                          <span
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                              selected
                                ? "bg-[#800020] text-white"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {index + 1}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <p className="break-words text-sm font-bold text-gray-900">
                            {person.fullName}
                          </p>
                          <p className="mt-1 break-all text-[9px] text-gray-400">
                            ID: {person.personId}
                          </p>
                        </td>

                        <td className="max-w-[300px] whitespace-normal break-words px-4 py-4 text-left text-xs leading-5 text-gray-700">
                          {person.purpose || "-"}
                        </td>

                        <td className="px-3 py-4 text-center">
                          <span className="inline-flex min-w-10 justify-center rounded-lg bg-blue-50 px-2 py-1.5 text-sm font-bold text-blue-700">
                            {person.receiptBookNo || "-"}
                          </span>
                        </td>

                        <td className="px-3 py-4 text-center">
                          <span className="inline-flex min-w-10 justify-center rounded-lg bg-emerald-50 px-2 py-1.5 text-sm font-bold text-emerald-700">
                            {person.receiptNo || "-"}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold text-gray-600">
                          {person.receiptDate || "-"}
                        </td>
                      </tr>
                    );
                  })}
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
                      <span className="text-gray-800">{persons.length}</span> คน
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-[10px] text-gray-400">
                เลื่อนซ้าย-ขวาเพื่อดูข้อมูลเพิ่มเติม
              </p>
              <p className="text-[10px] font-semibold text-gray-500">
                {selectedIds.length} / {persons.length} รายการ
              </p>
            </div>
          </div>
        )}

        {persons.length > 0 && !loading && (
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <p className="text-sm font-bold text-gray-800">
                สรุปรายการที่เลือก
              </p>
              <p className="mt-1 text-xs text-gray-400">
                ตรวจสอบจำนวนบุคคลก่อนออกหนังสือนำส่ง
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <div className="text-right">
                <p className="text-[10px] text-gray-400">จำนวนที่เลือก</p>
                <p className="text-xl font-bold text-[#800020]">
                  {selectedIds.length}{" "}
                  <span className="text-xs font-medium text-gray-400">คน</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => void handleGenerate()}
                disabled={loading || selectedIds.length === 0}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#800020] px-5 text-sm font-bold text-white shadow-md shadow-rose-900/10 transition hover:bg-[#650017] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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
          </div>
        )}

        <div className="mt-5 flex flex-col items-center justify-between gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-[10px] text-gray-400 sm:flex-row">
          <span>ระบบจัดการข้อมูลตรวจสอบประวัติบุคคล</span>
          <span>Forensic Submission</span>
        </div>
      </div>
    </div>
  );
}
