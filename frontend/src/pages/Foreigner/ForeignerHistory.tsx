import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Pencil, Trash2, FileText, Eye, Copy, Files } from "lucide-react";
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
    <div>
      <div className="mb-1 text-xs font-medium text-slate-400">{label}</div>
      <div className="min-h-[22px] text-sm font-medium text-slate-700">
        {value !== null && value !== undefined && value !== "" ? value : "-"}
      </div>
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
  icon: React.ReactNode;
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
      className={`flex min-w-[68px] flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 transition ${className}`}
    >
      {icon}
      <span className="text-[11px] font-semibold leading-tight">{label}</span>
    </button>
  );
}

export default function ForeignerHistory() {
  const navigate = useNavigate();

  const [data, setData] = useState<Foreigner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [selected, setSelected] = useState<Foreigner | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);

      const params: Record<string, string> = {};

      if (search.trim()) {
        params.search = search.trim();
      }

      if (year) {
        params.year = year;
      }

      const response = await api.get("/foreigner", {
        params,
      });

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
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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

  const clearFilter = () => {
    setSearch("");
    setYear("");

    setTimeout(() => {
      loadData();
    }, 0);
  };

  const handleDelete = async (item: Foreigner) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "ยืนยันการลบ",
      html: `
        ต้องการลบข้อมูล<br>
        <strong>${item.fullName || "-"}</strong>
        ใช่หรือไม่?
      `,
      showCancelButton: true,
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#dc2626",
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
        title: "เลือกปี พ.ศ.",
        input: "select",
        inputOptions,
        inputPlaceholder: "กรุณาเลือกปี พ.ศ.",
        showCancelButton: true,
        confirmButtonText: "ออก PDF",
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "#800020",
        inputValidator: (value) => {
          if (!value) {
            return "กรุณาเลือกปี พ.ศ.";
          }

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
      });
    }
  };

  const handleCreateNew = (item: Foreigner) => {
    navigate(`/foreigner/create?copyId=${item.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#800020]">
              ประวัติบุคคลต่างด้าว
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              รายการข้อมูลบุคคลต่างด้าวทั้งหมดในระบบ
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleGenerateYearPDF}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              <Files size={18} />
              PDF รายปี
            </button>

            <button
              type="button"
              onClick={() => navigate("/foreigner/create")}
              className="rounded-xl bg-[#800020] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#660019]"
            >
              + เพิ่มบุคคลต่างด้าว
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">ค้นหา / กรองข้อมูล</h2>

            <button
              type="button"
              onClick={clearFilter}
              className="text-sm font-medium text-[#800020] hover:underline"
            >
              ล้างตัวกรอง
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                ค้นหา
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    loadData();
                  }
                }}
                placeholder="ชื่อ / รหัส / เลขทะเบียน / ใบสำคัญ"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                ปี พ.ศ.
              </label>

              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
              >
                <option value="">ทุกปี</option>

                {years.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={loadData}
              className="rounded-xl bg-[#800020] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#660019]"
            >
              ค้นหา
            </button>
          </div>
        </div>

        <div className="mb-4 text-sm text-slate-500">
          พบข้อมูล{" "}
          <span className="font-semibold text-[#800020]">{data.length}</span>{" "}
          รายการ
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-sm text-slate-500">กำลังโหลดข้อมูล...</div>
            </div>
          )}

          {!loading && data.length === 0 && (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-3 text-4xl">📋</div>

              <h3 className="font-semibold text-slate-700">ไม่พบข้อมูล</h3>

              <p className="mt-1 text-sm text-slate-400">
                ยังไม่มีข้อมูลบุคคลต่างด้าว
              </p>
            </div>
          )}

          {!loading && data.length > 0 && (
            <div className="hidden min-[1200px]:block">
              <table className="w-full table-fixed border-collapse text-sm">
                <thead className="bg-[#800020] text-white">
                  <tr>
                    <th className="border-r border-black px-4 py-3 text-center">
                      ลำดับ
                    </th>

                    <th className="border-r border-black px-4 py-3 text-center">
                      ชื่อ แซ่
                    </th>

                    <th className="border-r border-black px-4 py-3 text-center">
                      อายุ
                    </th>

                    <th className="border-r border-black px-4 py-3 text-center">
                      สัญชาติ
                    </th>

                    <th className="border-r border-black px-4 py-3 text-center">
                      เชื้อชาติ
                    </th>

                    <th className="border-r border-black px-4 py-3 text-center">
                      ต่ออายุเมื่อ
                    </th>

                    <th className="border-r border-black px-4 py-3 text-center">
                      หมดอายุ
                    </th>

                    <th className="border-r border-black px-4 py-3 text-center">
                      ดูรายละเอียดบุคคล
                    </th>

                    <th className="border-r border-black px-4 py-3 text-center">
                      PDF ทต.8
                    </th>

                    <th className="border-r border-black px-4 py-3 text-center">
                      สร้างใหม่
                    </th>

                    <th className="border-r border-black px-4 py-3 text-center">
                      แก้ไข
                    </th>

                    <th className="border-r border-black px-4 py-3 text-center">
                      ลบ
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-center">
                  {data.map((item) => (
                    <tr key={item.id} className="transition hover:bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4">
                        {`${item.sequenceNo ?? "-"} / ${item.year ?? "-"}`}
                      </td>

                      <td className="px-4 py-4">{item.fullName || "-"}</td>

                      <td className="px-4 py-4">
                        {item.age !== null && item.age !== undefined
                          ? item.age
                          : "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {item.nationality || "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {item.ethnicity || "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {formatThaiDate(item.applicationDate)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {formatThaiDate(item.expirationDate)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex justify-center">
                          <ActionButton
                            icon={<Eye size={20} />}
                            label="ดูรายละเอียดบุคคล"
                            title="ดูรายละเอียด"
                            onClick={() => navigate(`/foreigner/${item.id}`)}
                            className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                          />
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex justify-center">
                          <ActionButton
                            icon={<FileText size={20} />}
                            label="PDF ทต.8"
                            title="ออก PDF ทต.8"
                            onClick={() => handleGenerateTorTor8(item)}
                            className="bg-red-50 text-red-600 hover:bg-red-100"
                          />
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex justify-center">
                          <ActionButton
                            icon={<Copy size={20} />}
                            label="สร้างใหม่"
                            title="สร้างข้อมูลใหม่จากรายการนี้"
                            onClick={() => handleCreateNew(item)}
                            className="bg-green-50 text-green-700 hover:bg-green-100"
                          />
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex justify-center">
                          <ActionButton
                            icon={<Pencil size={20} />}
                            label="แก้ไข"
                            title="แก้ไข"
                            onClick={() =>
                              navigate(`/foreigner/edit/${item.id}`)
                            }
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                          />
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex justify-center">
                          <ActionButton
                            icon={<Trash2 size={20} />}
                            label="ลบ"
                            title="ลบ"
                            onClick={() => handleDelete(item)}
                            className="bg-red-50 text-red-600 hover:bg-red-100"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && data.length > 0 && (
            <div className="grid grid-cols-1 gap-4 p-4 min-[1200px]:hidden">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs text-slate-400">
                        ลำดับ {item.sequenceNo ?? "-"} / ปี {item.year ?? "-"}
                      </div>

                      <h3 className="mt-1 text-lg font-bold text-slate-800">
                        {item.fullName || "-"}
                      </h3>
                    </div>

                    <span className="rounded-full bg-[#800020]/10 px-3 py-1 text-xs font-semibold text-[#800020]">
                      {item.nationality || "-"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      label="วัน เดือน ปี ที่ต่ออายุ"
                      value={formatThaiDate(item.applicationDate)}
                    />

                    <Info
                      label="วันหมดอายุ"
                      value={formatThaiDate(item.expirationDate)}
                    />
                  </div>

                  <div className="mt-5 flex flex-wrap justify-center gap-2 border-t border-slate-100 pt-4">
                    <ActionButton
                      icon={<Eye size={20} />}
                      label="ดู"
                      title="ดูรายละเอียด"
                      onClick={() => navigate(`/foreigner/${item.id}`)}
                      className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                    />

                    <ActionButton
                      icon={<FileText size={20} />}
                      label="PDF ทต.8"
                      title="ออก PDF ทต.8"
                      onClick={() => handleGenerateTorTor8(item)}
                      className="bg-red-50 text-red-600 hover:bg-red-100"
                    />

                    <ActionButton
                      icon={<Copy size={20} />}
                      label="สร้างใหม่"
                      title="สร้างข้อมูลใหม่จากรายการนี้"
                      onClick={() => handleCreateNew(item)}
                      className="bg-green-50 text-green-700 hover:bg-green-100"
                    />

                    <ActionButton
                      icon={<Pencil size={20} />}
                      label="แก้ไข"
                      title="แก้ไข"
                      onClick={() => navigate(`/foreigner/edit/${item.id}`)}
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                    />

                    <ActionButton
                      icon={<Trash2 size={20} />}
                      label="ลบ"
                      title="ลบ"
                      onClick={() => handleDelete(item)}
                      className="bg-red-50 text-red-600 hover:bg-red-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
                <div>
                  <h2 className="text-xl font-bold text-[#800020]">
                    ข้อมูลบุคคลต่างด้าว
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    ลำดับ {selected.sequenceNo ?? "-"} / ปี{" "}
                    {selected.year ?? "-"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-lg px-3 py-2 text-2xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              <div className="space-y-7 p-6">
                <section>
                  <h3 className="mb-4 border-l-4 border-[#800020] pl-3 font-bold text-[#800020]">
                    ข้อมูลบุคคล
                  </h3>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <Info
                      label="รหัสประจำตัวคนต่างด้าว"
                      value={selected.foreignerIdNo}
                    />

                    <Info
                      label="ชื่อ แซ่"
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
                  <h3 className="mb-4 border-l-4 border-[#800020] pl-3 font-bold text-[#800020]">
                    วัน เดือน ปี ที่ต่ออายุ / วันหมดอายุ
                  </h3>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <Info
                      label="วัน เดือน ปี ที่ต่ออายุ"
                      value={formatThaiDate(selected.applicationDate)}
                    />

                    <Info
                      label="วันหมดอายุ"
                      value={formatThaiDate(selected.expirationDate)}
                    />
                  </div>
                </section>

                <div className="flex flex-wrap justify-center gap-3 border-t border-slate-100 pt-5">
                  <ActionButton
                    icon={<FileText size={20} />}
                    label="PDF ทต.8"
                    title="ออก PDF ทต.8"
                    onClick={() => handleGenerateTorTor8(selected)}
                    className="bg-red-50 text-red-600 hover:bg-red-100"
                  />

                  <ActionButton
                    icon={<Copy size={20} />}
                    label="สร้างใหม่"
                    title="สร้างข้อมูลใหม่จากรายการนี้"
                    onClick={() => handleCreateNew(selected)}
                    className="bg-green-50 text-green-700 hover:bg-green-100"
                  />

                  <ActionButton
                    icon={<Pencil size={20} />}
                    label="แก้ไข"
                    title="แก้ไข"
                    onClick={() => navigate(`/foreigner/edit/${selected.id}`)}
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                  />

                  <ActionButton
                    icon={<Trash2 size={20} />}
                    label="ลบ"
                    title="ลบ"
                    onClick={() => handleDelete(selected)}
                    className="bg-red-50 text-red-600 hover:bg-red-100"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
