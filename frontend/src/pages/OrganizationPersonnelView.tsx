import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Users,
  Phone,
  BriefcaseBusiness,
  ShieldCheck,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  SearchX,
  UserRound,
  ClipboardList,
  Contact,
  LogIn,
} from "lucide-react";
import Swal from "sweetalert2";
import api from "../api/axios";

interface Personnel {
  personnelId: string;
  rank: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  fullNameWithRank: string;
  position: string | null;
  duty: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

const rankOptions = [
  "พ.ต.อ.",
  "พ.ต.ท.",
  "พ.ต.ท.หญิง",
  "พ.ต.ต.",
  "พ.ต.ต.หญิง",
  "ร.ต.อ.",
  "ร.ต.อ.หญิง",
  "ร.ต.ท.",
  "ร.ต.ท.หญิง",
  "ร.ต.ต.",
  "ร.ต.ต.หญิง",
  "ด.ต.",
  "ด.ต.หญิง",
  "จ.ส.ต.",
  "จ.ส.ต.หญิง",
  "ส.ต.อ.",
  "ส.ต.อ.หญิง",
  "ส.ต.ท.",
  "ส.ต.ท.หญิง",
  "ส.ต.ต.",
  "ส.ต.ต.หญิง",
];

const rankOrder = rankOptions.reduce<Record<string, number>>(
  (acc, rank, index) => {
    acc[rank] = index;
    return acc;
  },
  {},
);

const pageSizeOptions = [8, 15, 35, 50, -1];

export default function OrganizationPersonnelView() {
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const fetchPersonnel = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get<Personnel[]>("/organization-personnel");

      setPersonnel(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Fetch Personnel Error:", error);

      Swal.fire({
        icon: "error",
        title: "ไม่สามารถโหลดข้อมูลได้",
        text: "กรุณาตรวจสอบการเชื่อมต่อเซิร์ฟเวอร์",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPersonnel();
  }, [fetchPersonnel]);

  const filteredPersonnel = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return [...personnel]
      .filter((item) => {
        if (!keyword) return true;

        return [
          item.rank,
          item.firstName,
          item.lastName,
          item.fullName,
          item.fullNameWithRank,
          item.position,
          item.duty,
          item.phone,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(keyword));
      })
      .sort((a, b) => {
        const rankA = rankOrder[a.rank || ""] ?? 999;
        const rankB = rankOrder[b.rank || ""] ?? 999;

        return rankA - rankB;
      });
  }, [personnel, search]);

  const totalPages =
    pageSize === -1
      ? 1
      : Math.max(1, Math.ceil(filteredPersonnel.length / pageSize));

  const paginatedPersonnel =
    pageSize === -1
      ? filteredPersonnel
      : filteredPersonnel.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize,
        );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startItem =
    filteredPersonnel.length === 0
      ? 0
      : pageSize === -1
        ? 1
        : (currentPage - 1) * pageSize + 1;

  const endItem =
    pageSize === -1
      ? filteredPersonnel.length
      : Math.min(currentPage * pageSize, filteredPersonnel.length);

  const getDisplayName = (item: Personnel) =>
    item.fullNameWithRank ||
    `${item.rank ? `${item.rank} ` : ""}${item.fullName || `${item.firstName} ${item.lastName}`}`;

  const getInitials = (item: Personnel) => item.firstName?.charAt(0) || "บ";

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-5 font-['Kanit'] sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5 sm:space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-blue-800 p-5 shadow-lg sm:p-8">
          <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-blue-400/10" />
          <div className="absolute -bottom-24 right-48 h-56 w-56 rounded-full bg-cyan-300/10" />

          <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-blue-200">
                <ShieldCheck size={20} />
                <span className="text-xs font-medium tracking-wide sm:text-sm">
                  ORGANIZATION PERSONNEL
                </span>
              </div>

              <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                ทำเนียบข้าราชการตำรวจ
              </h1>

              <p className="mt-2 text-sm text-blue-100/80 sm:text-base">
                สถานีตำรวจภูธรเมืองชลบุรี
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* จำนวนเจ้าหน้าที่ */}
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white">
                <Users size={27} />
                <div>
                  <p className="text-xs text-blue-100 sm:text-sm">
                    เจ้าหน้าที่ทั้งหมด
                  </p>
                  <p className="text-xl font-semibold sm:text-2xl">
                    {personnel.length.toLocaleString("th-TH")} คน
                  </p>
                </div>
              </div>

              {/* ปุ่มเข้าสู่ระบบ */}
              <Link
                to="/"
                state={{
                  from: {
                    pathname: "/organization-personnel",
                  },
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-base font-semibold text-blue-900 shadow-md transition hover:bg-blue-50 active:scale-95"
              >
                <LogIn size={20} />
                เข้าสู่ระบบ
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-slate-500 sm:text-sm">
                  เจ้าหน้าที่ทั้งหมด
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-800 sm:text-3xl">
                  {personnel.length.toLocaleString("th-TH")}
                  <span className="ml-1 text-sm font-normal text-slate-400 sm:text-base">
                    คน
                  </span>
                </h2>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:h-12 sm:w-12">
                <Users size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-slate-500 sm:text-sm">ผลการค้นหา</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-800 sm:text-3xl">
                  {filteredPersonnel.length.toLocaleString("th-TH")}
                  <span className="ml-1 text-sm font-normal text-slate-400 sm:text-base">
                    รายการ
                  </span>
                </h2>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 sm:h-12 sm:w-12">
                <ClipboardList size={23} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Search Header */}
          <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 sm:text-xl">
                <UserRound size={22} className="text-blue-600" />
                รายชื่อข้าราชการตำรวจ
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                เรียงลำดับตามยศตั้งแต่ระดับสูงไปต่ำ
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ค้นหาชื่อ ยศ ตำแหน่ง..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-base outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:w-72"
                />
              </div>

              <button
                onClick={fetchPersonnel}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                <RefreshCw
                  size={17}
                  className={loading ? "animate-spin" : ""}
                />
                รีเฟรช
              </button>
            </div>
          </div>

          {/* Page Size */}
          <div className="flex flex-col gap-2 border-b border-slate-100 bg-slate-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-sm font-medium text-slate-600">
              จำนวนรายการต่อหน้า
            </p>

            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 sm:w-auto"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size === -1 ? "ทั้งหมด" : `${size} รายการ`}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 p-3 md:hidden">
            {loading ? (
              <div className="py-16 text-center">
                <RefreshCw
                  size={32}
                  className="mx-auto animate-spin text-blue-500"
                />
                <p className="mt-4 text-base text-slate-500">
                  กำลังโหลดข้อมูล...
                </p>
              </div>
            ) : paginatedPersonnel.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <SearchX size={30} />
                </div>
                <p className="mt-4 text-base font-semibold text-slate-600">
                  ไม่พบข้อมูลเจ้าหน้าที่
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  ลองเปลี่ยนคำค้นหาอีกครั้ง
                </p>
              </div>
            ) : (
              paginatedPersonnel.map((item, index) => (
                <div
                  key={item.personnelId}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition active:bg-slate-50"
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-xl font-semibold text-white shadow-sm">
                      {getInitials(item)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-xs font-medium text-blue-600">
                        ลำดับที่ {startItem + index}
                      </p>

                      <h3 className="break-words text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
                        {getDisplayName(item)}
                      </h3>

                      <span className="mt-1 inline-flex rounded-md bg-blue-100 px-2.5 py-1 text-sm font-semibold text-blue-800">
                        {item.rank || "ไม่ระบุยศ"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <BriefcaseBusiness size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-400">
                          ตำแหน่ง
                        </p>
                        <p className="mt-1 break-words text-base font-semibold leading-relaxed text-slate-800">
                          {item.position || "ไม่ได้ระบุตำแหน่ง"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                        <Contact size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-400">
                          ปฏิบัติหน้าที่
                        </p>
                        <p className="mt-1 break-words text-base font-semibold leading-relaxed text-slate-800">
                          {item.duty || "ไม่ได้ระบุหน้าที่"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <Phone size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-400">
                          หมายเลขโทรศัพท์
                        </p>

                        {item.phone ? (
                          <a
                            href={`tel:${item.phone}`}
                            className="mt-1 inline-flex items-center gap-2 text-lg font-semibold text-emerald-700"
                          >
                            {item.phone}
                          </a>
                        ) : (
                          <p className="mt-1 text-base text-slate-400">
                            ไม่ระบุหมายเลขโทรศัพท์
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="bg-slate-50 text-sm font-medium text-slate-500">
                  <th className="px-5 py-4">ลำดับ</th>
                  <th className="px-5 py-4">ชื่อ - นามสกุล</th>
                  <th className="px-5 py-4">ตำแหน่ง</th>
                  <th className="px-5 py-4">ปฏิบัติหน้าที่</th>
                  <th className="px-5 py-4">หมายเลขโทรศัพท์</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <RefreshCw
                        size={30}
                        className="mx-auto animate-spin text-blue-500"
                      />
                      <p className="mt-3 text-base text-slate-400">
                        กำลังโหลดข้อมูล...
                      </p>
                    </td>
                  </tr>
                ) : paginatedPersonnel.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <SearchX size={32} className="mx-auto text-slate-400" />
                      <p className="mt-3 text-base font-medium text-slate-600">
                        ไม่พบข้อมูลเจ้าหน้าที่
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedPersonnel.map((item, index) => (
                    <tr
                      key={item.personnelId}
                      className="transition hover:bg-blue-50/40"
                    >
                      <td className="px-5 py-4 text-sm text-slate-400">
                        {startItem + index}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-semibold text-white shadow-sm">
                            {getInitials(item)}
                          </div>

                          <div>
                            <p className="font-medium text-slate-800">
                              {getDisplayName(item)}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-400">
                              {item.rank || "ไม่ระบุยศ"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <BriefcaseBusiness
                            size={15}
                            className="shrink-0 text-blue-400"
                          />
                          {item.position || "-"}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex max-w-[220px] rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">
                          {item.duty || "ไม่ได้ระบุ"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {item.phone ? (
                          <a
                            href={`tel:${item.phone}`}
                            className="inline-flex items-center gap-2 text-sm text-emerald-700 transition hover:text-emerald-900"
                          >
                            <Phone size={15} />
                            {item.phone}
                          </a>
                        ) : (
                          <span className="text-sm text-slate-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && filteredPersonnel.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="text-sm text-slate-500">
                แสดง{" "}
                <span className="font-semibold text-slate-800">
                  {startItem}
                </span>
                {" - "}
                <span className="font-semibold text-slate-800">{endItem}</span>
                {" จาก "}
                <span className="font-semibold text-slate-800">
                  {filteredPersonnel.length}
                </span>
                {" รายการ"}
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  disabled={currentPage === 1 || pageSize === -1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>

                <span className="min-w-24 text-center text-sm font-semibold text-slate-700">
                  หน้า {currentPage} / {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages || pageSize === -1}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="pb-4 text-center text-xs text-slate-400">
          Muang Chonburi Police Station | Organization Personnel
        </p>
      </div>
    </div>
  );
}
