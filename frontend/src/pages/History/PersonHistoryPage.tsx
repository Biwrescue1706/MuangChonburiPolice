//src/pages/History/PersonHistoryPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePersonHistory from "../../hooks/usePersonHistory";
import useSelection from "../../hooks/useSelection";
import usePersonActions from "../../hooks/usePersonActions";
import PersonCard from "../../components/statusPerson/PersonCard";
import PersonTable from "../../components/statusPerson/PersonTable";

type IconProps = {
  type: string;
  size?: number;
};

function Icon({ type, size = 20 }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "grid") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg {...common}>
        <path d="M6 3.5h8l4 4V20H6z" />
        <path d="M14 3.5V8h4M9 12h6M9 15.5h6" />
      </svg>
    );
  }

  if (type === "send") {
    return (
      <svg {...common}>
        <path d="m21 3-7.5 18-3.5-8L3 9.5z" />
        <path d="M21 3 10 13" />
      </svg>
    );
  }

  if (type === "check") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m8.5 12 2.5 2.5 4.8-5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="m9 6-5 5 5 5" />
      <path d="M4 11h10a5 5 0 0 1 5 5v2" />
    </svg>
  );
}

export default function PersonHistoryPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 1280,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { persons, allPersons, loading, fetchPersons } = usePersonHistory(
    statusParam,
    firstName,
    lastName,
  );

  const {
    selectMode,
    setSelectMode,
    selectedIds,
    setSelectedIds,
    toggleSelect,
    handleSelectAll,
  } = useSelection(persons);

  const { handleDelete, handleUpdateStatus, handleBulkSend, handleExportPDF } =
    usePersonActions({
      persons,
      selectedIds,
      setSelectedIds,
      selectMode,
      setSelectMode,
      fetchPersons,
    });

  const statusCounts = {
    all: allPersons.length,
    s0: allPersons.filter((p) => p.status === 0).length,
    s1: allPersons.filter((p) => p.status === 1).length,
    s2: allPersons.filter((p) => p.status === 2).length,
    s3: allPersons.filter((p) => p.status === 3).length,
    s4: allPersons.filter((p) => p.status === 4).length,
  };

  const sortedPersons = [...persons].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status - b.status;
    }

    const bookA = Number(a.receiptBookNo) || 0;
    const bookB = Number(b.receiptBookNo) || 0;

    if (bookA !== bookB) {
      return bookA - bookB;
    }

    const noA = Number(a.receiptNo) || 0;
    const noB = Number(b.receiptNo) || 0;

    return noA - noB;
  });

  const statusFilters = [
    {
      value: null,
      label: "ทั้งหมด",
      count: statusCounts.all,
      icon: "grid",
      active:
        "border-[#800020] bg-[#800020] text-white shadow-lg shadow-[#800020]/20",
      inactive:
        "border-[#800020]/20 bg-white text-[#800020] hover:border-[#800020] hover:bg-[#800020]/5",
      color: "text-[#800020]",
    },
    {
      value: "0",
      label: "รอส่ง ศพฐ.",
      count: statusCounts.s0,
      icon: "clock",
      active:
        "border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-500/20",
      inactive:
        "border-amber-200 bg-white text-amber-700 hover:border-amber-400 hover:bg-amber-50",
      color: "text-amber-600",
    },
    {
      value: "1",
      label: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
      count: statusCounts.s1,
      icon: "document",
      active:
        "border-cyan-600 bg-cyan-600 text-white shadow-lg shadow-cyan-600/20",
      inactive:
        "border-cyan-200 bg-white text-cyan-700 hover:border-cyan-400 hover:bg-cyan-50",
      color: "text-cyan-600",
    },
    {
      value: "2",
      label: "ส่ง ศพฐ. แล้ว",
      count: statusCounts.s2,
      icon: "send",
      active:
        "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20",
      inactive:
        "border-blue-200 bg-white text-blue-700 hover:border-blue-400 hover:bg-blue-50",
      color: "text-blue-600",
    },
    {
      value: "3",
      label: "รับจาก ศพฐ. แล้ว",
      count: statusCounts.s3,
      icon: "check",
      active:
        "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-600/20",
      inactive:
        "border-emerald-200 bg-white text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50",
      color: "text-emerald-600",
    },
    {
      value: "4",
      label: "ส่งคืนต้นสังกัดแล้ว",
      count: statusCounts.s4,
      icon: "return",
      active:
        "border-rose-600 bg-rose-600 text-white shadow-lg shadow-rose-600/20",
      inactive:
        "border-rose-200 bg-white text-rose-700 hover:border-rose-400 hover:bg-rose-50",
      color: "text-rose-600",
    },
  ];

  const clearSearch = () => {
    setFirstName("");
    setLastName("");
  };

  const hasSearch = firstName.trim() !== "" || lastName.trim() !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#f8f7f8] to-blue-50/50">
      <main className="min-h-screen px-4 pb-10 pt-6 min-[480px]:px-5 min-[768px]:px-8 min-[768px]:pt-8 min-[1200px]:px-8">
        <div className="mx-auto w-full max-w-[1500px] px-2 sm:px-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 hidden h-12 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#800020] to-[#a52a4a] px-5 text-base font-bold text-white shadow-lg shadow-[#800020]/15 transition hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] max-[1199px]:flex"
          >
            <Icon type="return" size={22} />
            กลับหน้าเดิม
          </button>

          <section className="relative overflow-hidden rounded-[26px] border border-[#800020]/10 bg-gradient-to-br from-[#800020] via-[#700019] to-[#3d0010] px-5 py-7 text-white shadow-xl shadow-[#800020]/15 min-[480px]:px-7 min-[768px]:px-9 min-[768px]:py-8">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-8 -top-12 h-52 w-52 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-white/[0.05] blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-1/4 h-1 w-40 rounded-full bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />

            <div className="relative flex flex-col gap-6 min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-white/80 backdrop-blur">
                  <Icon type="document" size={15} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    PERSON HISTORY
                  </span>
                </div>

                <h1 className="mt-4 text-2xl font-extrabold tracking-tight min-[480px]:text-3xl min-[768px]:text-4xl">
                  ประวัติบุคคล
                </h1>

                <p className="mt-2 text-sm text-white/70">
                  ตรวจสอบ ค้นหา และจัดการข้อมูลบุคคลทั้งหมด
                </p>
              </div>

              <div className="flex items-center gap-4 self-start rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md min-[768px]:self-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950 shadow-lg shadow-black/10">
                  <Icon type="grid" size={23} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/65">
                    รายการทั้งหมด
                  </p>
                  <p className="mt-0.5 text-2xl font-extrabold">
                    {statusCounts.all.toLocaleString("th-TH")}
                    <span className="ml-1 text-xs font-medium text-white/60">
                      รายการ
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#800020]/10 text-[#800020]">
                  <svg
                    width="20"
                    height="20"
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
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-800">
                    ค้นหาข้อมูลบุคคล
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    ค้นหาจากชื่อหรือชื่อสกุล
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 min-[640px]:grid-cols-2 min-[900px]:grid-cols-[1fr_1fr_auto]">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  ชื่อ
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="ค้นหาชื่อ..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:font-normal placeholder:text-slate-400 hover:border-[#800020]/40 hover:bg-white focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-[#800020]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  นามสกุล
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="ค้นหานามสกุล..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:font-normal placeholder:text-slate-400 hover:border-[#800020]/40 hover:bg-white focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-[#800020]/10"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={clearSearch}
                  disabled={!hasSearch}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40 min-[900px]:w-auto"
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
                    <path d="M3 12a9 9 0 1 0 3-6.7" />
                    <path d="M3 4v6h6" />
                  </svg>
                  ล้าง
                </button>
              </div>
            </div>
          </section>

          <section className="mt-6 flex flex-col gap-4 min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-[#800020]" />
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#800020]">
                  Management
                </p>
              </div>
              <h2 className="mt-1 text-lg font-extrabold text-slate-800">
                จัดการรายการ
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectMode((prev) => !prev);
                  setSelectedIds([]);
                }}
                className={`flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-bold transition-all ${
                  selectMode
                    ? "bg-slate-800 text-white shadow-lg shadow-slate-800/15"
                    : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50"
                }`}
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
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="m8 12 2.5 2.5L16 9" />
                </svg>
                {selectMode ? "ยกเลิกเลือก" : "เลือก"}
              </button>

              {selectMode && (
                <>
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="flex h-11 items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 text-sm font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                  >
                    {selectedIds.length ===
                    persons.filter((p) => p.status < 4).length
                      ? "ยกเลิกทั้งหมด"
                      : "เลือกทั้งหมด"}
                  </button>

                  <button
                    type="button"
                    onClick={handleBulkSend}
                    disabled={selectedIds.length === 0}
                    className="flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-4 text-sm font-bold text-white shadow-md shadow-emerald-600/15 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Icon type="send" size={17} />
                    อัปเดต +1 ({selectedIds.length})
                  </button>
                </>
              )}
            </div>
          </section>

          <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-extrabold text-slate-800">
                    สถานะข้อมูล
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    เลือกสถานะเพื่อกรองรายการบุคคล
                  </p>
                </div>

                {statusParam && (
                  <button
                    type="button"
                    onClick={() => setSearchParams({})}
                    className="rounded-lg bg-[#800020]/5 px-3 py-2 text-xs font-bold text-[#800020] transition hover:bg-[#800020]/10"
                  >
                    ดูทั้งหมด
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {statusFilters.map((filter) => {
                const active = statusParam === filter.value;

                return (
                  <button
                    key={filter.label}
                    type="button"
                    onClick={() => {
                      if (filter.value === null) {
                        setSearchParams({});
                      } else {
                        setSearchParams({ status: filter.value });
                      }
                    }}
                    className={`flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-3 text-xs font-bold transition-all duration-200 ${
                      active ? filter.active : filter.inactive
                    }`}
                  >
                    <Icon type={filter.icon} size={17} />
                    <span>{filter.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {filter.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="mb-4 mt-7 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-slate-800">
                รายการข้อมูล
              </h2>
              <p className="mt-1 text-xs font-medium text-slate-500">
                พบ{" "}
                <span className="font-extrabold text-[#800020]">
                  {sortedPersons.length.toLocaleString("th-TH")}
                </span>{" "}
                รายการ
              </p>
            </div>

            <div
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold ${
                isMobile
                  ? "border-violet-200 bg-violet-50 text-violet-700"
                  : "border-indigo-200 bg-indigo-50 text-indigo-700"
              }`}
            >
              <Icon type={isMobile ? "grid" : "document"} size={16} />
              {isMobile ? "มุมมองการ์ด" : "มุมมองตาราง"}
            </div>
          </div>

          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_5px_25px_rgba(15,23,42,0.05)]">
            {isMobile ? (
              <div className="bg-gradient-to-b from-slate-50/70 to-white p-3 min-[480px]:p-4">
                <PersonCard
                  persons={sortedPersons}
                  loading={loading}
                  selectMode={selectMode}
                  selectedIds={selectedIds}
                  toggleSelect={toggleSelect}
                  handleDelete={handleDelete}
                  handleUpdateStatus={handleUpdateStatus}
                  handleExportPDF={handleExportPDF}
                />
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <PersonTable
                  persons={sortedPersons}
                  loading={loading}
                  selectMode={selectMode}
                  selectedIds={selectedIds}
                  toggleSelect={toggleSelect}
                  handleSelectAll={handleSelectAll}
                  handleDelete={(person) =>
                    handleDelete(
                      person as unknown as Parameters<typeof handleDelete>[0],
                    )
                  }
                  handleUpdateStatus={(person) =>
                    handleUpdateStatus(
                      person as unknown as Parameters<
                        typeof handleUpdateStatus
                      >[0],
                    )
                  }
                  handleExportPDF={(person) =>
                    handleExportPDF(
                      person as unknown as Parameters<
                        typeof handleExportPDF
                      >[0],
                    )
                  }
                />
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
