import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  RotateCcw,
  ArrowLeft,
  Users,
  Clock3,
  FileText,
  Send,
  CheckCircle2,
  LayoutGrid,
  List,
  Check,
  ChevronRight,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import usePersonHistory from "../../hooks/usePersonHistory";
import useSelection from "../../hooks/useSelection";
import usePersonActions from "../../hooks/usePersonActions";
import PersonCard from "../../components/statusPerson/PersonCard";
import PersonTable from "../../components/statusPerson/PersonTable";

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
    const handleResize = () => setIsMobile(window.innerWidth < 1280);

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
    if (a.status !== b.status) return a.status - b.status;

    const bookA = Number(a.receiptBookNo) || 0;
    const bookB = Number(b.receiptBookNo) || 0;

    if (bookA !== bookB) return bookA - bookB;

    return (Number(a.receiptNo) || 0) - (Number(b.receiptNo) || 0);
  });

  const statusFilters = [
    {
      value: null,
      label: "ทั้งหมด",
      count: statusCounts.all,
      icon: LayoutGrid,
      color: "rose",
    },
    {
      value: "0",
      label: "รอส่ง ศพฐ.",
      count: statusCounts.s0,
      icon: Clock3,
      color: "amber",
    },
    {
      value: "1",
      label: "เตรียมเอกสารส่ง ศพฐ.",
      count: statusCounts.s1,
      icon: FileText,
      color: "cyan",
    },
    {
      value: "2",
      label: "ส่ง ศพฐ. แล้ว",
      count: statusCounts.s2,
      icon: Send,
      color: "blue",
    },
    {
      value: "3",
      label: "รับจาก ศพฐ. แล้ว",
      count: statusCounts.s3,
      icon: CheckCircle2,
      color: "emerald",
    },
    {
      value: "4",
      label: "ส่งคืนต้นสังกัดแล้ว",
      count: statusCounts.s4,
      icon: RotateCcw,
      color: "violet",
    },
  ];

  const colorMap: Record<
    string,
    { active: string; inactive: string; icon: string }
  > = {
    rose: {
      active: "border-rose-700 bg-rose-700 text-white shadow-rose-200",
      inactive:
        "border-rose-100 bg-rose-50/70 text-rose-800 hover:border-rose-300",
      icon: "bg-rose-100 text-rose-700",
    },
    amber: {
      active: "border-amber-500 bg-amber-500 text-white shadow-amber-200",
      inactive:
        "border-amber-100 bg-amber-50 text-amber-800 hover:border-amber-300",
      icon: "bg-amber-100 text-amber-700",
    },
    cyan: {
      active: "border-cyan-600 bg-cyan-600 text-white shadow-cyan-200",
      inactive:
        "border-cyan-100 bg-cyan-50 text-cyan-800 hover:border-cyan-300",
      icon: "bg-cyan-100 text-cyan-700",
    },
    blue: {
      active: "border-blue-600 bg-blue-600 text-white shadow-blue-200",
      inactive:
        "border-blue-100 bg-blue-50 text-blue-800 hover:border-blue-300",
      icon: "bg-blue-100 text-blue-700",
    },
    emerald: {
      active: "border-emerald-600 bg-emerald-600 text-white shadow-emerald-200",
      inactive:
        "border-emerald-100 bg-emerald-50 text-emerald-800 hover:border-emerald-300",
      icon: "bg-emerald-100 text-emerald-700",
    },
    violet: {
      active: "border-violet-600 bg-violet-600 text-white shadow-violet-200",
      inactive:
        "border-violet-100 bg-violet-50 text-violet-800 hover:border-violet-300",
      icon: "bg-violet-100 text-violet-700",
    },
  };

  const clearSearch = () => {
    setFirstName("");
    setLastName("");
  };

  const hasSearch = firstName.trim() !== "" || lastName.trim() !== "";

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <main className="mx-auto max-w-[1600px] px-3 pb-12 pt-5 sm:px-6 sm:pt-7 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>หน้าหลัก</span>
            <ChevronRight size={14} />
            <span className="font-semibold text-[#851b3b]">ประวัติบุคคล</span>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#851b3b] hover:text-[#851b3b] min-[1280px]:flex"
          >
            <ArrowLeft size={17} />
            กลับหน้าก่อนหน้า
          </button>
        </div>

        <section className="relative mb-6 overflow-hidden rounded-[26px] bg-[#70152f] shadow-[0_12px_35px_rgba(112,21,47,0.16)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,210,160,0.22),transparent_30%),radial-gradient(circle_at_65%_110%,rgba(255,255,255,0.10),transparent_35%)]" />
          <div className="absolute -right-12 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-2 -top-14 h-52 w-52 rounded-full border border-white/10" />
          <div className="absolute -bottom-28 right-[35%] h-56 w-56 rounded-full bg-[#d68b70]/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-7 p-5 sm:p-8 lg:flex-row lg:items-center lg:px-10 lg:py-9">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-wider text-white/80">
                <Sparkles size={14} />
                PERSON MANAGEMENT
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-[34px]">
                ประวัติบุคคล
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                ตรวจสอบ ค้นหา และติดตามสถานะการดำเนินงานของข้อมูลบุคคล
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-white/65">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#f1c58d]" />
                  ข้อมูลบุคคลในระบบ
                </span>
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span>จัดการข้อมูลได้ในหน้าเดียว</span>
              </div>
            </div>

            <div className="flex w-full items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm sm:w-auto sm:min-w-[230px] sm:p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f3d9ad] text-[#75431f] shadow-lg">
                <Users size={27} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xs font-medium text-white/65">
                  บุคคลทั้งหมด
                </p>
                <p className="mt-1 text-3xl font-bold text-white">
                  {statusCounts.all.toLocaleString("th-TH")}
                  <span className="ml-2 text-xs font-medium text-white/65">
                    รายการ
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_15px_rgba(15,23,42,0.035)]">
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8eaf0] text-[#851b3b]">
              <Search size={19} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                ค้นหาข้อมูลบุคคล
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                ค้นหาจากชื่อและนามสกุล
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1fr_1fr_auto]">
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                ชื่อ
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="กรอกชื่อที่ต้องการค้นหา"
                className="h-12 w-full rounded-xl border border-slate-200 bg-[#fafbfc] px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#851b3b] focus:bg-white focus:ring-4 focus:ring-[#851b3b]/[0.07]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                นามสกุล
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="กรอกนามสกุลที่ต้องการค้นหา"
                className="h-12 w-full rounded-xl border border-slate-200 bg-[#fafbfc] px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#851b3b] focus:bg-white focus:ring-4 focus:ring-[#851b3b]/[0.07]"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={clearSearch}
                disabled={!hasSearch}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-40 lg:w-auto"
              >
                <RotateCcw size={16} />
                ล้างข้อมูล
              </button>
            </div>
          </div>
        </section>

        <section className="mb-6 rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_15px_rgba(15,23,42,0.035)]">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                สถานะการดำเนินงาน
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                เลือกสถานะที่ต้องการดูข้อมูล
              </p>
            </div>

            {statusParam && (
              <button
                type="button"
                onClick={() => setSearchParams({})}
                className="self-start rounded-lg bg-[#f8eaf0] px-3 py-2 text-xs font-bold text-[#851b3b] transition hover:bg-[#f2dce5]"
              >
                ดูสถานะทั้งหมด
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 sm:p-4 xl:grid-cols-6">
            {statusFilters.map((filter) => {
              const active = statusParam === filter.value;
              const IconComponent = filter.icon;
              const colors = colorMap[filter.color];

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
                  className={`group flex min-h-[88px] flex-col justify-between rounded-xl border p-3 text-left transition-all duration-200 ${
                    active
                      ? `${colors.active} shadow-md`
                      : `${colors.inactive} hover:-translate-y-0.5 hover:shadow-sm`
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        active ? "bg-white/20 text-white" : colors.icon
                      }`}
                    >
                      <IconComponent size={17} />
                    </div>

                    {active && <Check size={15} />}
                  </div>

                  <div className="mt-3 flex items-end justify-between gap-1">
                    <span className="text-[11px] font-semibold leading-4">
                      {filter.label}
                    </span>
                    <span className="text-lg font-bold">
                      {filter.count.toLocaleString("th-TH")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-[#851b3b]" />
                <h2 className="text-base font-bold text-slate-800">
                  รายการข้อมูลบุคคล
                </h2>
              </div>
              <p className="mt-1.5 pl-3 text-xs text-slate-500">
                พบข้อมูลทั้งหมด{" "}
                <span className="font-bold text-[#851b3b]">
                  {sortedPersons.length.toLocaleString("th-TH")}
                </span>{" "}
                รายการ
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-500">
                {isMobile ? <LayoutGrid size={15} /> : <List size={15} />}
                {isMobile ? "มุมมองการ์ด" : "มุมมองตาราง"}
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectMode((prev) => !prev);
                  setSelectedIds([]);
                }}
                className={`flex h-9 items-center gap-2 rounded-lg px-4 text-xs font-bold transition ${
                  selectMode
                    ? "bg-slate-800 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-[#851b3b] hover:text-[#851b3b]"
                }`}
              >
                <ClipboardList size={16} />
                {selectMode ? "ยกเลิกการเลือก" : "เลือกหลายรายการ"}
              </button>
            </div>
          </div>

          {selectMode && (
            <div className="mb-4 flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <ClipboardList size={19} />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-900">
                    เลือกรายการที่ต้องการดำเนินการ
                  </p>
                  <p className="mt-0.5 text-xs text-blue-700">
                    เลือกแล้ว {selectedIds.length} รายการ
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
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
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={15} />
                  อัปเดตสถานะ +1 ({selectedIds.length})
                </button>
              </div>
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            {isMobile ? (
              <div className="bg-[#f8f9fc] p-3 sm:p-4">
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
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            ระบบจัดการประวัติบุคคล
          </div>
        </section>
      </main>
    </div>
  );
}
