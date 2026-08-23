import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Pencil, Trash2 } from "lucide-react";
import api from "../../api/axios";

import type { Foreigner } from "../../types/foreigner";

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

function formatMoney(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return String(value);
  }

  return number.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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
        <strong>${item.name}</strong>
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

      Swal.fire({
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

          <button
            type="button"
            onClick={() => navigate("/foreigner/create")}
            className="rounded-xl bg-[#800020] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#660019]"
          >
            + เพิ่มบุคคลต่างด้าว
          </button>
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
            <div className="hidden overflow-x-auto min-[1200px]:block">
              <table className="w-full min-w-[1900px] border-collapse text-sm">
                <thead className="bg-[#800020] text-white">
                  <tr>
                    <th
                      rowSpan={2}
                      className="border-r border-white/20 px-4 py-3 text-center"
                    >
                      ลำดับ
                    </th>

                    <th
                      rowSpan={2}
                      className="border-r border-white/20 px-4 py-3 text-center"
                    >
                      รหัสประจำตัว
                      <br />
                      คนต่างด้าว
                    </th>

                    <th
                      rowSpan={2}
                      className="border-r border-white/20 px-4 py-3 text-center"
                    >
                      ชื่อ แซ่
                    </th>

                    <th
                      rowSpan={2}
                      className="border-r border-white/20 px-4 py-3 text-center"
                    >
                      อายุ
                    </th>

                    <th
                      rowSpan={2}
                      className="border-r border-white/20 px-4 py-3 text-center"
                    >
                      สัญชาติ
                    </th>

                    <th
                      rowSpan={2}
                      className="border-r border-white/20 px-4 py-3 text-center"
                    >
                      เชื้อชาติ
                    </th>

                    <th
                      colSpan={2}
                      className="border-r border-white/20 px-4 py-2 text-center"
                    >
                      ใบสำคัญ
                    </th>

                    <th
                      colSpan={2}
                      className="border-r border-white/20 px-4 py-2 text-center"
                    >
                      ออกให้ ณ
                    </th>

                    <th
                      rowSpan={2}
                      className="border-r border-white/20 px-4 py-3 text-center"
                    >
                      ภูมิลำเนา
                    </th>

                    <th
                      colSpan={2}
                      className="border-r border-white/20 px-4 py-2 text-center"
                    >
                      การขอรับ / ขอรับใบแทน / ขอต่ออายุ
                    </th>

                    <th
                      rowSpan={2}
                      className="border-r border-white/20 px-4 py-3 text-center"
                    >
                      จำนวนเงิน
                    </th>

                    <th
                      colSpan={2}
                      className="border-r border-white/20 px-4 py-2 text-center"
                    >
                      ใบเสร็จรับเงิน
                    </th>

                    <th
                      rowSpan={2}
                      className="border-r border-white/20 px-4 py-3 text-center"
                    >
                      วัน เดือน ปี
                      <br />
                      ของใบเสร็จ
                    </th>

                    <th rowSpan={2} className="px-4 py-3 text-center">
                      ดู
                    </th>

                    <th rowSpan={2} className="px-4 py-3 text-center">
                      แก้ไข
                    </th>

                    <th rowSpan={2} className="px-4 py-3 text-center">
                      ลบ
                    </th>
                  </tr>

                  <tr>
                    <th className="border-r border-white/20 px-4 py-2 text-center text-xs">
                      เลขทะเบียน
                    </th>

                    <th className="border-r border-white/20 px-4 py-2 text-center text-xs">
                      วัน เดือน ปี
                    </th>

                    <th className="border-r border-white/20 px-4 py-2 text-center text-xs">
                      อำเภอ
                    </th>

                    <th className="border-r border-white/20 px-4 py-2 text-center text-xs">
                      จังหวัด
                    </th>

                    <th className="border-r border-white/20 px-4 py-2 text-center text-xs">
                      วัน เดือน ปี
                    </th>

                    <th className="border-r border-white/20 px-4 py-2 text-center text-xs">
                      วันหมดอายุ
                    </th>

                    <th className="border-r border-white/20 px-4 py-2 text-center text-xs">
                      ใบเสร็จเล่มที่
                    </th>

                    <th className="border-r border-white/20 px-4 py-2 text-center text-xs">
                      ใบเสร็จเลขที่
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {data.map((item) => (
                    <tr key={item.id} className="transition hover:bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        {item.sequenceNo ?? "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {item.foreignerIdNo || "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-800">
                        {item.name}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        {item.age !== null ? item.age : "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {item.nationality || "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {item.ethnicity || "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {item.certificateRegistrationNo || "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {formatThaiDate(item.certificateDate)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {item.district || "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {item.province || "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {item.domicile || "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {formatThaiDate(item.applicationDate)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {formatThaiDate(item.expirationDate)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right">
                        {formatMoney(item.amount)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {item.receiptBookNo || "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {item.receiptNo || "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {formatThaiDate(item.receiptDate)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={() => navigate(`/foreigner/${item.id}`)}
                            title="ดูรายละเอียด"
                            className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                          >
                            ดู
                          </button>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/foreigner/edit/${item.id}`)
                            }
                            title="แก้ไข"
                            className="rounded-lg bg-blue-50 p-2 text-blue-700 hover:bg-blue-100"
                          >
                            <Pencil size={17} />
                          </button>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            title="ลบ"
                            className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                          >
                            <Trash2 size={17} />
                          </button>
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
                        {item.name}
                      </h3>
                    </div>

                    <span className="rounded-full bg-[#800020]/10 px-3 py-1 text-xs font-semibold text-[#800020]">
                      {item.nationality || "-"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Info
                      label="รหัสประจำตัวคนต่างด้าว"
                      value={item.foreignerIdNo}
                    />

                    <Info
                      label="อายุ"
                      value={item.age !== null ? `${item.age} ปี` : null}
                    />

                    <Info label="เชื้อชาติ" value={item.ethnicity} />

                    <Info label="ภูมิลำเนา" value={item.domicile} />

                    <Info
                      label="เลขทะเบียนของใบสำคัญ"
                      value={item.certificateRegistrationNo}
                    />

                    <Info
                      label="วัน เดือน ปี ของใบสำคัญ"
                      value={formatThaiDate(item.certificateDate)}
                    />

                    <Info label="ออกให้ ณ อำเภอ" value={item.district} />

                    <Info label="ออกให้ ณ จังหวัด" value={item.province} />

                    <Info
                      label="การขอรับ / ขอรับใบแทน / ขอต่ออายุ"
                      value={item.applicationType}
                    />

                    <Info
                      label="วัน เดือน ปี"
                      value={formatThaiDate(item.applicationDate)}
                    />

                    <Info
                      label="วันหมดอายุ"
                      value={formatThaiDate(item.expirationDate)}
                    />

                    <Info
                      label="จำนวนเงิน"
                      value={
                        item.amount !== null
                          ? `${formatMoney(item.amount)} บาท`
                          : null
                      }
                    />

                    <Info label="ใบเสร็จเล่มที่" value={item.receiptBookNo} />

                    <Info label="ใบเสร็จเลขที่" value={item.receiptNo} />

                    <Info
                      label="วัน เดือน ปี ของใบเสร็จ"
                      value={formatThaiDate(item.receiptDate)}
                    />
                  </div>

                  <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => navigate(`/foreigner/${item.id}`)}
                      className="flex-1 rounded-xl bg-slate-100 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                    >
                      ดูรายละเอียด
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/foreigner/edit/${item.id}`)}
                      title="แก้ไข"
                      className="rounded-xl bg-blue-50 p-2.5 text-blue-700 hover:bg-blue-100"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      title="ลบ"
                      className="rounded-xl bg-red-50 p-2.5 text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
                  ลำดับ {selected.sequenceNo ?? "-"} / ปี {selected.year ?? "-"}
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

                  <Info label="ชื่อ แซ่" value={selected.name} />

                  <Info
                    label="อายุ"
                    value={selected.age !== null ? `${selected.age} ปี` : null}
                  />

                  <Info label="สัญชาติ" value={selected.nationality} />

                  <Info label="เชื้อชาติ" value={selected.ethnicity} />
                </div>
              </section>

              <section>
                <h3 className="mb-4 border-l-4 border-[#800020] pl-3 font-bold text-[#800020]">
                  ใบสำคัญ
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <Info
                    label="เลขทะเบียนของใบสำคัญ"
                    value={selected.certificateRegistrationNo}
                  />

                  <Info
                    label="วัน เดือน ปี ของใบสำคัญ"
                    value={formatThaiDate(selected.certificateDate)}
                  />

                  <Info label="เลขใบสำคัญฯ" value={selected.certificateNo} />
                </div>
              </section>

              <section>
                <h3 className="mb-4 border-l-4 border-[#800020] pl-3 font-bold text-[#800020]">
                  ออกให้ ณ
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <Info label="อำเภอ" value={selected.district} />
                  <Info label="จังหวัด" value={selected.province} />
                  <Info label="ภูมิลำเนา" value={selected.domicile} />
                </div>
              </section>

              <section>
                <h3 className="mb-4 border-l-4 border-[#800020] pl-3 font-bold text-[#800020]">
                  การขอรับ / ขอรับใบแทน / ขอต่ออายุ
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <Info label="ชนิด" value={selected.applicationType} />

                  <Info
                    label="วัน เดือน ปี"
                    value={formatThaiDate(selected.applicationDate)}
                  />

                  <Info
                    label="วันหมดอายุ"
                    value={formatThaiDate(selected.expirationDate)}
                  />
                </div>
              </section>

              <section>
                <h3 className="mb-4 border-l-4 border-[#800020] pl-3 font-bold text-[#800020]">
                  ค่าธรรมเนียมและใบเสร็จ
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                  <Info
                    label="จำนวนเงิน"
                    value={
                      selected.amount !== null
                        ? `${formatMoney(selected.amount)} บาท`
                        : null
                    }
                  />

                  <Info label="ใบเสร็จเล่มที่" value={selected.receiptBookNo} />

                  <Info label="ใบเสร็จเลขที่" value={selected.receiptNo} />

                  <Info
                    label="วัน เดือน ปี ของใบเสร็จ"
                    value={formatThaiDate(selected.receiptDate)}
                  />
                </div>
              </section>

              <section>
                <h3 className="mb-4 border-l-4 border-[#800020] pl-3 font-bold text-[#800020]">
                  อื่น ๆ
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <Info label="เลขใบสำคัญฯ" value={selected.certificateNo} />

                  <Info
                    label="วันที่ยื่นคำร้อง"
                    value={formatThaiDate(selected.petitionDate)}
                  />
                </div>
              </section>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={() => handleDelete(selected)}
                title="ลบข้อมูล"
                className="rounded-xl bg-red-50 p-2.5 text-red-600 hover:bg-red-100"
              >
                <Trash2 size={18} />
              </button>

              <button
                type="button"
                onClick={() => navigate(`/foreigner/edit/${selected.id}`)}
                title="แก้ไขข้อมูล"
                className="rounded-xl bg-blue-50 p-2.5 text-blue-700 hover:bg-blue-100"
              >
                <Pencil size={18} />
              </button>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-xl bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-300"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
