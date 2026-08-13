// src/components/PersonTable.tsx

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  formatThaiDate,
  renderStatus,
  renderPriority,
  getStatusButton,
  getStatusButtonStyle,
} from "../../utils/personHelper";

interface Props {
  persons: any[];
  loading: boolean;
  selectMode: boolean;
  selectedIds: string[];
  toggleSelect: (id: string, status: number) => void;
  handleSelectAll: () => void;
  handleDelete: (p: any) => void;
  handleUpdateStatus: (p: any) => void;
  handleExportPDF: (p: any) => void;
}

export default function PersonTable({
  persons,
  loading,
  selectMode,
  selectedIds,
  toggleSelect,
  handleSelectAll,
  handleDelete,
  handleUpdateStatus,
  handleExportPDF,
}: Props) {
  const navigate = useNavigate();

  const hasReturnDate = persons.some(
    (p) => p.status === 4,
  );

  const hasDeleteDate = persons.some(
    (p) => p.status === 4 && p.deleteAt,
  );

  const hasSendButton = persons.some(
    (p) => p.status < 4,
  );

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gray-50 px-5 py-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            รายการข้อมูลบุคคล
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            ทั้งหมด {persons.length} รายการ
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1450px] border-collapse text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              {selectMode && (
                <th className="whitespace-nowrap border border-gray-700 px-3 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer accent-blue-600"
                    checked={
                      persons.length > 0 &&
                      selectedIds.length ===
                        persons.filter(
                          (p) => p.status < 4,
                        ).length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
              )}

              <th className="whitespace-nowrap border border-gray-700 px-3 py-3">
                #
              </th>

              <th className="whitespace-nowrap border border-gray-700 px-4 py-3">
                ชื่อ และชื่อสกุล
              </th>

              <th className="whitespace-nowrap border border-gray-700 px-4 py-3">
                เรื่องที่ขออนุญาต
              </th>

              <th className="whitespace-nowrap border border-gray-700 px-4 py-3">
                หน่วยงาน
              </th>

              <th className="whitespace-nowrap border border-gray-700 px-3 py-3">
                เล่มที่
              </th>

              <th className="whitespace-nowrap border border-gray-700 px-3 py-3">
                เลขที่
              </th>

              <th className="whitespace-nowrap border border-gray-700 px-4 py-3">
                ลงวันที่
              </th>

              <th className="whitespace-nowrap border border-gray-700 px-4 py-3">
                สถานะ
              </th>

              <th className="whitespace-nowrap border border-gray-700 px-4 py-3">
                ความเร่งด่วน
              </th>

              {hasReturnDate && (
                <th className="whitespace-nowrap border border-gray-700 px-4 py-3">
                  วันคืน
                </th>
              )}

              {hasDeleteDate && (
                <th className="whitespace-nowrap border border-gray-700 px-4 py-3">
                  วันหมดอายุเอกสาร
                </th>
              )}

              <th className="whitespace-nowrap border border-gray-700 px-3 py-3">
                ดู
              </th>

              <th className="whitespace-nowrap border border-gray-700 px-3 py-3">
                PDF
              </th>

              <th className="whitespace-nowrap border border-gray-700 px-3 py-3">
                แก้ไข
              </th>

              <th className="whitespace-nowrap border border-gray-700 px-3 py-3">
                ลบ
              </th>

              {hasSendButton && (
                <th className="whitespace-nowrap border border-gray-700 px-3 py-3">
                  ส่ง
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {/* Loading */}
            {loading && (
              <tr>
                <td
                  colSpan={20}
                  className="border px-4 py-10 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                    <span>กำลังโหลดข้อมูล...</span>
                  </div>
                </td>
              </tr>
            )}

            {/* Empty */}
            {!loading && persons.length === 0 && (
              <tr>
                <td
                  colSpan={20}
                  className="border px-4 py-10 text-center text-gray-500"
                >
                  <div className="text-4xl">📂</div>

                  <div className="mt-2 font-semibold">
                    ไม่พบข้อมูล
                  </div>

                  <div className="mt-1 text-sm text-gray-400">
                    ลองเปลี่ยนเงื่อนไขการค้นหา
                  </div>
                </td>
              </tr>
            )}

            {/* Data */}
            {!loading &&
              persons.map((p, i) => (
                <tr
                  key={p.personId}
                  className="transition hover:bg-blue-50"
                >
                  {/* Select */}
                  {selectMode && (
                    <td className="border border-gray-200 px-3 py-3 text-center">
                      {p.status < 4 && (
                        <input
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer accent-blue-600"
                          checked={selectedIds.includes(
                            p.personId,
                          )}
                          onChange={() =>
                            toggleSelect(
                              p.personId,
                              p.status,
                            )
                          }
                        />
                      )}
                    </td>
                  )}

                  {/* Number */}
                  <td className="border border-gray-200 px-3 py-3 text-center font-semibold text-gray-600">
                    {i + 1}
                  </td>

                  {/* Name */}
                  <td className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-800">
                    {p.fullName || "-"}
                  </td>

                  {/* Purpose */}
                  <td className="max-w-[300px] border border-gray-200 px-4 py-3 text-left">
                    <div
                      className="line-clamp-2"
                      title={p.purpose || ""}
                    >
                      {p.purpose || "-"}
                    </div>
                  </td>

                  {/* Agency */}
                  <td className="max-w-[250px] border border-gray-200 px-4 py-3 text-left">
                    <div
                      className="line-clamp-2"
                      title={p.requestingAgency || ""}
                    >
                      {p.requestingAgency || "-"}
                    </div>
                  </td>

                  {/* Book */}
                  <td className="border border-gray-200 px-3 py-3 text-center font-semibold">
                    {p.receiptBookNo || "-"}
                  </td>

                  {/* Receipt */}
                  <td className="border border-gray-200 px-3 py-3 text-center font-semibold">
                    {p.receiptNo || "-"}
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap border border-gray-200 px-4 py-3 text-center">
                    {formatThaiDate(p.receiptDate)}
                  </td>

                  {/* Status */}
                  <td className="border border-gray-200 px-4 py-3 text-center">
                    {renderStatus(p.status)}
                  </td>

                  {/* Priority */}
                  <td className="border border-gray-200 px-4 py-3 text-center">
                    {renderPriority(p.priority ?? 0)}
                  </td>

                  {/* Return date */}
                  {hasReturnDate && (
                    <td className="whitespace-nowrap border border-gray-200 px-4 py-3 text-center">
                      {p.status === 4
                        ? formatThaiDate(p.returnDate)
                        : "-"}
                    </td>
                  )}

                  {/* Delete date */}
                  {hasDeleteDate && (
                    <td className="whitespace-nowrap border border-gray-200 px-4 py-3 text-center">
                      {p.status === 4 && p.deleteAt
                        ? formatThaiDate(p.deleteAt)
                        : "-"}
                    </td>
                  )}

                  {/* View */}
                  <td className="border border-gray-200 px-3 py-3 text-center">
                    <button
                      type="button"
                      className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-sky-600 active:scale-95"
                      onClick={() =>
                        navigate(`/person/${p.personId}`)
                      }
                    >
                      👁️ ดู
                    </button>
                  </td>

                  {/* PDF */}
                  <td className="border border-gray-200 px-3 py-3 text-center">
                    <button
                      type="button"
                      className="whitespace-nowrap rounded-lg bg-blue-600 px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
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
                  </td>

                  {/* Edit */}
                  <td className="border border-gray-200 px-3 py-3 text-center">
                    {p.status < 4 ? (
                      <button
                        type="button"
                        className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-amber-600 active:scale-95"
                        onClick={() =>
                          navigate(
                            `/person/edit/${p.personId}`,
                          )
                        }
                      >
                        ✏️
                      </button>
                    ) : (
                      <span className="text-gray-400">
                        -
                      </span>
                    )}
                  </td>

                  {/* Delete */}
                  <td className="border border-gray-200 px-3 py-3 text-center">
                    <button
                      type="button"
                      className="rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 active:scale-95"
                      onClick={() => handleDelete(p)}
                    >
                      🗑️
                    </button>
                  </td>

                  {/* Status button */}
                  {hasSendButton && (
                    <td className="border border-gray-200 px-3 py-3 text-center">
                      {p.status < 4 && (
                        <button
                          type="button"
                          className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-bold shadow-sm transition active:scale-95 ${getStatusButtonStyle(
                            p.status,
                          )}`}
                          onClick={() =>
                            handleUpdateStatus(p)
                          }
                        >
                          {getStatusButton(p.status)}
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {!loading && persons.length > 0 && (
        <div className="border-t bg-gray-50 px-5 py-3 text-right text-sm text-gray-600">
          แสดงทั้งหมด{" "}
          <span className="font-bold text-gray-900">
            {persons.length}
          </span>{" "}
          รายการ
        </div>
      )}
    </div>
  );
}