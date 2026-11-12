import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Search,
  RotateCcw,
  Plus,
  FileText,
  Eye,
  Copy,
  Pencil,
  Trash2,
  Users,
  CalendarDays,
  Globe2,
  LoaderCircle,
  ClipboardList,
  UserRound,
  X,
  Filter,
  Download,
} from "lucide-react";

import api from "../../api/axios";
import type { Foreigner } from "../../types/foreigner";
import { generateTorTor8 } from "./generateTorTor8";
import { generateForeignerYearPDF } from "./generateForeignerYearPDF";

const MONTHS = [
  "",
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

function formatThaiDate(value: string | null | undefined) {
  if (!value) return "-";

  const text = String(value).trim();
  if (!text) return "-";

  const match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

  if (!match) return text;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return text;
  }

  return `${day} ${MONTHS[month]} ${year + 543}`;
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-1 text-xs font-medium text-slate-400">{label}</p>
      <p className="break-words text-sm font-semibold text-slate-700">
        {value !== null && value !== undefined && value !== "" ? value : "-"}
      </p>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
  title,
  className,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  title: string;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`inline-flex min-w-[62px] flex-col items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition duration-200 hover:-translate-y-0.5 ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tone}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ForeignerHistory() {
  const navigate = useNavigate();

  const [data, setData] = useState<Foreigner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [selected, setSelected] = useState<Foreigner | null>(null);

  const loadData = useCallback(
    async (searchValue = search, yearValue = year) => {
      try {
        setLoading(true);

        const params: Record<string, string> = {};

        if (searchValue.trim()) {
          params.search = searchValue.trim();
        }

        if (yearValue) {
          params.year = yearValue;
        }

        const response = await api.get("/foreigner", { params });

        if (response.data?.success) {
          setData(response.data.data || []);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("GET FOREIGNER ERROR:", error);

        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถดึงข้อมูลบุคคลต่างด้าวได้",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#85263f",
        });
      } finally {
        setLoading(false);
      }
    },
    [search, year],
  );

  useEffect(() => {
    loadData("", "");
    // โหลดข้อมูลครั้งแรก
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const years = useMemo(() => {
    return Array.from(
      new Set(
        data
          .map((item) => item.year)
          .filter(
            (item): item is number => item !== null && item !== undefined,
          ),
      ),
    ).sort((a, b) => b - a);
  }, [data]);

  const handleSearch = () => {
    loadData(search, year);
  };

  const clearFilter = () => {
    setSearch("");
    setYear("");
    loadData("", "");
  };

  const handleDelete = async (item: Foreigner) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "ยืนยันการลบข้อมูล",
      html: `
        <div style="font-size:15px;color:#64748b;margin-top:8px">
          คุณต้องการลบข้อมูลของ
        </div>
        <div style="font-size:18px;font-weight:700;color:#85263f;margin-top:8px">
          ${item.fullName || "-"}
        </div>
        <div style="font-size:13px;color:#94a3b8;margin-top:8px">
          เมื่อลบแล้วจะไม่สามารถเรียกคืนข้อมูลได้
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "ยืนยันลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/foreigner/${item.id}`);

      await Swal.fire({
        icon: "success",
        title: "ลบข้อมูลสำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });

      setSelected(null);
      await loadData();
    } catch (error) {
      console.error("DELETE FOREIGNER ERROR:", error);

      Swal.fire({
        icon: "error",
        title: "ลบข้อมูลไม่สำเร็จ",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#85263f",
      });
    }
  };

  const handleGenerateTorTor8 = async (item: Foreigner) => {
    try {
      await generateTorTor8(item);
    } catch (error) {
      console.error("GENERATE ทต.8 ERROR:", error);

      Swal.fire({
        icon: "error",
        title: "สร้าง PDF ไม่สำเร็จ",
        text:
          error instanceof Error
            ? error.message
            : "ไม่สามารถสร้างเอกสาร ทต.8 ได้",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#85263f",
      });
    }
  };

  const handleGenerateYearPDF = async () => {
    try {
      if (years.length === 0) {
        await Swal.fire({
          icon: "warning",
          title: "ไม่พบปี",
          text: "ยังไม่มีข้อมูลปี พ.ศ. สำหรับออก PDF",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#85263f",
        });
        return;
      }

      const inputOptions = years.reduce(
        (options, item) => {
          options[String(item)] = `ปี พ.ศ. ${item}`;
          return options;
        },
        {} as Record<string, string>,
      );

      const result = await Swal.fire({
        title: "ส่งออกรายงานบุคคลต่างด้าว",
        text: "เลือกปี พ.ศ. ที่ต้องการจัดทำรายงาน",
        input: "select",
        inputOptions,
        inputPlaceholder: "เลือกปี พ.ศ.",
        showCancelButton: true,
        confirmButtonText: "สร้าง PDF",
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "#85263f",
        cancelButtonColor: "#64748b",
        inputValidator: (value) => {
          if (!value) return "กรุณาเลือกปี พ.ศ.";
          return null;
        },
      });

      if (!result.isConfirmed || !result.value) return;

      const selectedYear = Number(result.value);

      const response = await api.get("/foreigner", {
        params: {
          year: String(selectedYear),
        },
      });

      if (!response.data?.success) {
        throw new Error("ไม่สามารถดึงข้อมูลบุคคลในปีที่เลือกได้");
      }

      const yearData: Foreigner[] = response.data.data || [];

      if (yearData.length === 0) {
        await Swal.fire({
          icon: "warning",
          title: "ไม่พบข้อมูล",
          text: `ไม่พบข้อมูลบุคคลต่างด้าวในปี พ.ศ. ${selectedYear}`,
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#85263f",
        });
        return;
      }

      await generateForeignerYearPDF(yearData, selectedYear);
    } catch (error) {
      console.error("GENERATE YEAR PDF ERROR:", error);

      await Swal.fire({
        icon: "error",
        title: "สร้าง PDF ไม่สำเร็จ",
        text:
          error instanceof Error
            ? error.message
            : "ไม่สามารถสร้าง PDF รายปีได้",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#85263f",
      });
    }
  };

  const handleCreateNew = (item: Foreigner) => {
    navigate(`/foreigner/create?copyId=${item.id}`);
  };

  const renderActions = (item: Foreigner) => (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <ActionButton
        icon={<Eye size={17} />}
        label="ดูข้อมูล"
        title="ดูรายละเอียดบุคคล"
        onClick={() => navigate(`/foreigner/${item.id}`)}
        className="bg-slate-100 text-slate-700 hover:bg-slate-200"
      />

      <ActionButton
        icon={<FileText size={17} />}
        label="PDF ทต.8"
        title="ออกเอกสาร ทต.8"
        onClick={() => handleGenerateTorTor8(item)}
        className="bg-rose-50 text-rose-700 hover:bg-rose-100"
      />

      <ActionButton
        icon={<Copy size={17} />}
        label="สร้างใหม่"
        title="สร้างข้อมูลใหม่จากรายการนี้"
        onClick={() => handleCreateNew(item)}
        className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
      />

      <ActionButton
        icon={<Pencil size={17} />}
        label="แก้ไข"
        title="แก้ไขข้อมูล"
        onClick={() => navigate(`/foreigner/edit/${item.id}`)}
        className="bg-sky-50 text-sky-700 hover:bg-sky-100"
      />

      <ActionButton
        icon={<Trash2 size={17} />}
        label="ลบ"
        title="ลบข้อมูล"
        onClick={() => handleDelete(item)}
        className="bg-red-50 text-red-600 hover:bg-red-100"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f5f3] px-3 py-5 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-[1800px]">
        {/* Header */}
        <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#6f1933] via-[#85263f] to-[#a34456] px-6 py-7 text-white shadow-lg shadow-[#85263f]/10 sm:px-8">
          <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border-[35px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-28 right-48 h-64 w-64 rounded-full bg-white/5" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                <Users size={25} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  ประวัติบุคคลต่างด้าว
                </h1>
                <p className="mt-1 text-sm text-white/75">
                  จัดการ ตรวจสอบ และเรียกดูข้อมูลบุคคลต่างด้าวในระบบ
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleGenerateYearPDF}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <Download size={18} />
                PDF รายปี
              </button>

              <button
                type="button"
                onClick={() => navigate("/foreigner/create")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#85263f] shadow-md transition hover:-translate-y-0.5 hover:bg-rose-50"
              >
                <Plus size={19} />
                เพิ่มบุคคลต่างด้าว
              </button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            icon={<Users size={23} />}
            label="จำนวนรายการที่แสดง"
            value={data.length.toLocaleString("th-TH")}
            tone="bg-rose-50 text-[#85263f]"
          />

          <StatCard
            icon={<CalendarDays size={23} />}
            label="ปีที่มีข้อมูล"
            value={years.length.toLocaleString("th-TH")}
            tone="bg-amber-50 text-amber-700"
          />

          <StatCard
            icon={<Globe2 size={23} />}
            label="สถานะการแสดงผล"
            value={loading ? "กำลังโหลด" : "พร้อมใช้งาน"}
            tone="bg-emerald-50 text-emerald-700"
          />
        </div>

        {/* Search */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#85263f]/10 text-[#85263f]">
                <Filter size={18} />
              </div>
              <div>
                <h2 className="font-bold text-slate-800">ค้นหาและกรองข้อมูล</h2>
                <p className="text-xs text-slate-400">
                  ค้นหาจากชื่อ รหัส หรือเลือกปีที่ต้องการ
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={clearFilter}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-[#85263f]"
            >
              <RotateCcw size={14} />
              ล้างตัวกรอง
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1fr_240px_auto] lg:items-end">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                ค้นหาข้อมูล
              </label>
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  placeholder="ชื่อ / รหัส / เลขทะเบียน / ใบสำคัญ"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#85263f] focus:bg-white focus:ring-4 focus:ring-[#85263f]/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                ปี พ.ศ.
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-[#85263f] focus:bg-white focus:ring-4 focus:ring-[#85263f]/10"
              >
                <option value="">ทุกปี</option>
                {years.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleSearch}
              disabled={loading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#85263f] px-7 text-sm font-bold text-white shadow-sm transition hover:bg-[#6f1933] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <Search size={17} />
              )}
              ค้นหา
            </button>
          </div>
        </div>

        {/* Result heading */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ClipboardList size={19} className="text-[#85263f]" />
            <h2 className="font-bold text-slate-800">รายการข้อมูล</h2>
            <span className="rounded-full bg-[#85263f]/10 px-2.5 py-1 text-xs font-bold text-[#85263f]">
              {data.length.toLocaleString("th-TH")} รายการ
            </span>
          </div>

          <p className="text-xs text-slate-400">
            แสดงข้อมูลบุคคลต่างด้าวตามเงื่อนไขที่เลือก
          </p>
        </div>

        {/* Data */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#85263f]/10 text-[#85263f]">
                <LoaderCircle size={25} className="animate-spin" />
              </div>
              <p className="text-sm font-medium text-slate-500">
                กำลังโหลดข้อมูล...
              </p>
            </div>
          ) : data.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <UserRound size={30} />
              </div>
              <h3 className="font-bold text-slate-700">ไม่พบข้อมูล</h3>
              <p className="mt-1 max-w-sm text-sm text-slate-400">
                ยังไม่มีรายการบุคคลต่างด้าวที่ตรงกับเงื่อนไขการค้นหา
              </p>
              <button
                type="button"
                onClick={clearFilter}
                className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-[#85263f] transition hover:bg-[#85263f]/5"
              >
                <RotateCcw size={15} />
                ล้างตัวกรอง
              </button>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden min-[1200px]:block">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px] border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#85263f] text-white">
                        <th className="w-[100px] px-4 py-4 text-center font-semibold">
                          ลำดับ
                        </th>
                        <th className="min-w-[120px] px-4 py-4 text-left font-semibold">
                          ชื่อ - แซ่
                        </th>
                        <th className="w-[50px] px-3 py-4 text-center font-semibold">
                          อายุ
                        </th>
                        <th className="w-[100px] px-3 py-4 text-center font-semibold">
                          สัญชาติ
                        </th>
                        <th className="w-[100px] px-3 py-4 text-center font-semibold">
                          เชื้อชาติ
                        </th>
                        <th className="w-[100px] px-3 py-4 text-center font-semibold">
                          วันที่ต่ออายุ
                        </th>
                        <th className="w-[100px] px-3 py-4 text-center font-semibold">
                          วันหมดอายุ
                        </th>
                        <th className="min-w-[100px] px-4 py-4 text-center font-semibold">
                          ดูข้อมูล
                        </th>
                        <th className="w-[100px] px-4 py-4 text-center font-semibold">
                          พิมพ์ ใบคำร้อง / ทต.8
                        </th>
                        <th className="w-[100px] px-4 py-4 text-center font-semibold">
                          สร้างใหม่
                        </th>
                        <th className="w-[100px] px-4 py-4 text-center font-semibold">
                          แก้ไข
                        </th>
                        <th className="w-[100px] px-4 py-4 text-center font-semibold">
                          ลบ
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {data.map((item, index) => (
                        <tr
                          key={item.id}
                          className={`transition-colors hover:bg-rose-50/40 ${
                            index % 2 === 1 ? "bg-slate-50/40" : "bg-white"
                          }`}
                        >
                          <td className="px-4 py-4 text-center">
                            <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-600">
                              {`${item.sequenceNo ?? "-"} / ${item.year ?? "-"}`}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <div className="font-semibold text-slate-800">
                              {item.fullName || "-"}
                            </div>
                          </td>

                          <td className="px-3 py-4 text-center text-slate-600">
                            {item.age !== null && item.age !== undefined
                              ? `${item.age}`
                              : "-"}
                          </td>

                          <td className="px-3 py-4 text-center text-slate-600">
                            {item.nationality || "-"}
                          </td>

                          <td className="px-3 py-4 text-center text-slate-600">
                            {item.ethnicity || "-"}
                          </td>

                          <td className="px-3 py-4 text-center text-slate-600">
                            {formatThaiDate(item.applicationDate)}
                          </td>

                          <td className="px-3 py-4 text-center text-slate-600">
                            {formatThaiDate(item.expirationDate)}
                          </td>

                          <td className="px-2 py-3 text-center">
                            <ActionButton
                              icon={<Eye size={17} />}
                              label="ดูข้อมูล"
                              title="ดูรายละเอียดบุคคล"
                              onClick={() => navigate(`/foreigner/${item.id}`)}
                              className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                            />
                          </td>

                          <td className="px-2 py-3 text-center">
                            <ActionButton
                              icon={<FileText size={17} />}
                              label="PDF ทต.8"
                              title="ออกเอกสาร ทต.8"
                              onClick={() => handleGenerateTorTor8(item)}
                              className="bg-rose-50 text-rose-700 hover:bg-rose-100"
                            />
                          </td>

                          <td className="px-2 py-3 text-center">
                            <ActionButton
                              icon={<Copy size={17} />}
                              label="สร้างใหม่"
                              title="สร้างข้อมูลใหม่จากรายการนี้"
                              onClick={() => handleCreateNew(item)}
                              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            />
                          </td>

                          <td className="px-2 py-3 text-center">
                            <ActionButton
                              icon={<Pencil size={17} />}
                              label="แก้ไข"
                              title="แก้ไขข้อมูล"
                              onClick={() =>
                                navigate(`/foreigner/edit/${item.id}`)
                              }
                              className="bg-sky-50 text-sky-700 hover:bg-sky-100"
                            />
                          </td>

                          <td className="px-2 py-3 text-center">
                            <ActionButton
                              icon={<Trash2 size={17} />}
                              label="ลบ"
                              title="ลบข้อมูล"
                              onClick={() => handleDelete(item)}
                              className="bg-red-50 text-red-600 hover:bg-red-100"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile and tablet cards */}
              <div className="grid grid-cols-1 gap-3 p-3 sm:p-4 min-[1200px]:hidden">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-[#85263f]/30 hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-rose-50/80 to-white px-4 py-4 sm:px-5">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-400">
                          ลำดับ {item.sequenceNo ?? "-"} / ปี พ.ศ.{" "}
                          {item.year ?? "-"}
                        </p>
                        <h3 className="mt-1 break-words text-base font-bold text-slate-800 sm:text-lg">
                          {item.fullName || "-"}
                        </h3>
                      </div>

                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#85263f]/10 px-3 py-1.5 text-xs font-bold text-[#85263f]">
                        <Globe2 size={13} />
                        {item.nationality || "-"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-4 px-4 py-4 sm:grid-cols-4 sm:px-5">
                      <Info
                        label="อายุ"
                        value={
                          item.age !== null && item.age !== undefined
                            ? `${item.age} ปี`
                            : null
                        }
                      />

                      <Info label="เชื้อชาติ" value={item.ethnicity} />

                      <Info
                        label="วันที่ต่ออายุ"
                        value={formatThaiDate(item.applicationDate)}
                      />

                      <Info
                        label="วันหมดอายุ"
                        value={formatThaiDate(item.expirationDate)}
                      />
                    </div>

                    <div className="border-t border-slate-100 bg-slate-50/60 px-3 py-3 sm:px-4">
                      {renderActions(item)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!loading && data.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-400">
            <span>
              พบข้อมูลทั้งหมด {data.length.toLocaleString("th-TH")} รายการ
            </span>
            <span>ระบบจัดการข้อมูลบุคคลต่างด้าว</span>
          </div>
        )}

        {/* Detail modal */}
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5"
            onClick={() => setSelected(null)}
          >
            <div
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between bg-gradient-to-r from-[#6f1933] to-[#a34456] px-5 py-4 text-white sm:px-6">
                <div>
                  <h2 className="text-lg font-bold">ข้อมูลบุคคลต่างด้าว</h2>
                  <p className="mt-1 text-xs text-white/75">
                    ลำดับ {selected.sequenceNo ?? "-"} / ปี พ.ศ.{" "}
                    {selected.year ?? "-"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
                  aria-label="ปิดหน้าต่าง"
                >
                  <X size={21} />
                </button>
              </div>

              <div className="space-y-6 p-5 sm:p-7">
                <section>
                  <h3 className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 font-bold text-[#85263f]">
                    <UserRound size={18} />
                    ข้อมูลบุคคล
                  </h3>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <Info
                      label="รหัสประจำตัวคนต่างด้าว"
                      value={selected.foreignerIdNo}
                    />

                    <Info
                      label="ชื่อ - แซ่"
                      value={
                        selected.fullName ||
                        [selected.prefix, selected.firstName, selected.lastName]
                          .filter(Boolean)
                          .join(" ") ||
                        "-"
                      }
                    />

                    <Info
                      label="อายุ"
                      value={
                        selected.age !== null && selected.age !== undefined
                          ? `${selected.age} ปี`
                          : null
                      }
                    />
                  </div>
                </section>

                <section>
                  <h3 className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 font-bold text-[#85263f]">
                    <CalendarDays size={18} />
                    ข้อมูลการต่ออายุ
                  </h3>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <Info
                      label="วันที่ต่ออายุ"
                      value={formatThaiDate(selected.applicationDate)}
                    />

                    <Info
                      label="วันหมดอายุ"
                      value={formatThaiDate(selected.expirationDate)}
                    />
                  </div>
                </section>

                <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={() => navigate(`/foreigner/${selected.id}`)}
                    className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    ดูรายละเอียด
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCreateNew(selected)}
                    className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    สร้างรายการใหม่
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(`/foreigner/edit/${selected.id}`)}
                    className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
                  >
                    แก้ไขข้อมูล
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(selected)}
                    className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    ลบข้อมูล
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
