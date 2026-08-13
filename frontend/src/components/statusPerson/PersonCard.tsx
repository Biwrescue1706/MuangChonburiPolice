// src/components/PersonCard.tsx

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  formatThaiDate,
  renderStatus,
  renderPriority,
  getStatusButton,
  getStatusButtonStyle,
} from "../utils/personHelper";

interface Props {
  persons: any[];
  loading: boolean;
  selectMode: boolean;
  selectedIds: string[];
  toggleSelect: (id: string, status: number) => void;
  handleDelete: (p: any) => void;
  handleUpdateStatus: (p: any) => void;
  handleExportPDF: (p: any) => void;
}

export default function PersonCard({
  persons,
  loading,
  selectMode,
  selectedIds,
  toggleSelect,
  handleDelete,
  handleUpdateStatus,
  handleExportPDF,
}: Props) {
  const navigate = useNavigate();

  const sortedPersons = [...persons].sort((a, b) => {
    const bookA = Number(a.receiptBookNo || 0);
    const bookB = Number(b.receiptBookNo || 0);

    if (bookA !== bookB) {
      return bookA - bookB;
    }

    const noA = Number(a.receiptNo || 0);
    const noB = Number(b.receiptNo || 0);

    return noA - noB;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-12 shadow-lg">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

        <p className="mt-4 font-semibold text-gray-600">
          กำลังโหลดข้อมูล...
        </p>
      </div>
    );
  }

  if (sortedPersons.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-lg">
        <div className="text-5xl">📂</div>

        <h3 className="mt-3 text-lg font-bold text-gray-700">
          ไม่พบข้อมูล
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          ลองเปลี่ยนเงื่อนไขการค้นหา
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {sortedPersons.map((p: any, index: number) => (
        <div
          key={p.personId}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition hover:shadow-xl"
        >
          {/* ================= HEADER ================= */}
          <div className="flex items-start justify-between gap-3 border-b bg-gray-50 px-4 py-4">
            <div className="flex min-w-0 items-start gap-3">
              {/* Number */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm">
                {index + 1}
              </div>

              <div className="min-w-0">
                <h3 className="break-words text-base font-bold text-gray-900">
                  {p.fullName || "-"}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  รหัสข้อมูล: {p.personId || "-"}
                </p>
              </div>
            </div>

            {selectMode && p.status < 4 && (
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
                checked={selectedIds.includes(p.personId)}
                onChange={() =>
                  toggleSelect(p.personId, p.status)
                }
              />
            )}
          </div>

          {/* ================= BODY ================= */}
          <div className="px-4 py-4">
            {/* Receipt */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-lg">🧾</span>

                <span className="font-bold text-gray-800">
                  ข้อมูลใบเสร็จ
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500">
                    เล่มใบเสร็จ
                  </p>

                  <p className="mt-1 font-bold text-gray-800">
                    {p.receiptBookNo || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    เลขที่
                  </p>

                  <p className="mt-1 font-bold text-gray-800">
                    {p.receiptNo || "-"}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-xs text-gray-500">
                    วันที่พิมพ์มือ
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {formatThaiDate(p.receiptDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Purpose */}
            <div className="mt-3">
              <p className="text-xs font-semibold text-gray-500">
                เรื่องที่ขออนุญาต
              </p>

              <p className="mt-1 break-words text-sm leading-6 text-gray-800">
                {p.purpose || "-"}
              </p>
            </div>

            {/* Agency */}
            <div className="mt-3">
              <p className="text-xs font-semibold text-gray-500">
                หน่วยงาน
              </p>

              <p className="mt-1 break-words text-sm leading-6 text-gray-800">
                {p.requestingAgency || "-"}
              </p>
            </div>

            {/* Status */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                <p className="mb-2 text-xs font-semibold text-gray-500">
                  สถานะ
                </p>

                {renderStatus(p.status)}
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                <p className="mb-2 text-xs font-semibold text-gray-500">
                  ความเร่งด่วน
                </p>

                {renderPriority(p.priority ?? 0)}
              </div>
            </div>

            {/* Return date */}
            {p.status === 4 && (
              <div className="mt-3 rounded-xl border border-red-100 bg-red-50 p-3">
                <p className="text-xs font-semibold text-red-600">
                  📅 วันคืน
                </p>

                <p className="mt-1 font-semibold text-red-700">
                  {formatThaiDate(p.returnDate)}
                </p>
              </div>
            )}

            {/* Delete date */}
            {p.status === 4 && p.deleteAt && (
              <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50 p-3">
                <p className="text-xs font-semibold text-orange-600">
                  📅 วันหมดอายุเอกสาร
                </p>

                <p className="mt-1 font-semibold text-orange-700">
                  {formatThaiDate(p.deleteAt)}
                </p>
              </div>
            )}

            {/* ================= ACTIONS ================= */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {/* ดู */}
              <button
                type="button"
                className="rounded-xl bg-sky-500 px-3 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sky-600 active:scale-95"
                onClick={() =>
                  navigate(`/person/${p.personId}`)
                }
              >
                👁️ ดูข้อมูล
              </button>

              {/* PDF */}
              <button
                type="button"
                className="rounded-xl bg-blue-600 px-3 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
                onClick={() => {
                  if (p.status < 1) {
                    Swal.fire({
                      icon: "warning",
                      title: "ไม่สามารถดำเนินการได้",
                      text: "กรุณากดปุ่ม 'เตรียมเอกสารส่ง พฐ' ก่อน",
                      confirmButtonText: "ตกลง",
                    });

                    return;
                  }

                  handleExportPDF(p);
                }}
              >
                📄 PDF
              </button>

              {/* แก้ไข */}
              {p.status < 4 && (
                <button
                  type="button"
                  className="rounded-xl bg-amber-500 px-3 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-amber-600 active:scale-95"
                  onClick={() =>
                    navigate(`/person/edit/${p.personId}`)
                  }
                >
                  ✏️ แก้ไข
                </button>
              )}

              {/* ลบ */}
              <button
                type="button"
                className="rounded-xl bg-red-600 px-3 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 active:scale-95"
                onClick={() => handleDelete(p)}
              >
                🗑️ ลบ
              </button>

              {/* ส่งสถานะ */}
              {p.status < 4 && (
                <button
                  type="button"
                  className={`col-span-2 rounded-xl px-3 py-3 text-sm font-bold shadow-sm transition active:scale-95 ${getStatusButtonStyle(
                    p.status,
                  )}`}
                  onClick={() =>
                    handleUpdateStatus(p)
                  }
                >
                  {getStatusButton(p.status)}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}