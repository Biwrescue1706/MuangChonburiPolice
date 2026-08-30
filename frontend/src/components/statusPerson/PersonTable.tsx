import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { ReactNode } from "react";
import { Eye, FileText, Pencil, Trash2, Send } from "lucide-react";

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

function ActionButton({
  icon,
  label,
  onClick,
  className,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-w-[62px] flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold text-white shadow-sm transition hover:brightness-95 active:scale-95 ${className}`}
    >
      {icon}
      <span className="whitespace-nowrap text-[10px] leading-tight">
        {label}
      </span>
    </button>
  );
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

  const hasReturnDate = persons.some((p) => p.status === 4);
  const hasDeleteDate = persons.some((p) => p.status === 4 && p.deleteAt);
  const hasSendButton = persons.some((p) => p.status < 4);

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
      <div className="flex min-h-[120px] items-center justify-between border-b bg-gray-50 px-7 py-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">รายการข้อมูลบุคคล</h3>
          <p className="mt-1 text-sm text-gray-500">
            ทั้งหมด {persons.length} รายการ
          </p>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              {selectMode && (
                <th className="w-[4%] border border-gray-700 px-2 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer accent-blue-600"
                    checked={
                      persons.length > 0 &&
                      selectedIds.length ===
                        persons.filter((p) => p.status < 4).length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
              )}

              <th className="w-[4%] border border-gray-700 px-2 py-3">#</th>

              <th className="w-[10%] border border-gray-700 px-2 py-3">
                ชื่อ และชื่อสกุล
              </th>

              <th className="w-[12%] border border-gray-700 px-2 py-3">
                เรื่องที่ขออนุญาต
              </th>

              <th className="w-[10%] border border-gray-700 px-2 py-3">
                หน่วยงาน
              </th>

              <th className="w-[5%] border border-gray-700 px-2 py-3">
                เล่มที่
              </th>

              <th className="w-[5%] border border-gray-700 px-2 py-3">
                เลขที่
              </th>

              <th className="w-[7%] border border-gray-700 px-2 py-3">
                ลงวันที่
              </th>

              <th className="w-[8%] border border-gray-700 px-2 py-3">สถานะ</th>

              <th className="w-[7%] border border-gray-700 px-2 py-3">
                ความเร่งด่วน
              </th>

              {hasReturnDate && (
                <th className="w-[7%] border border-gray-700 px-2 py-3">
                  วันคืน
                </th>
              )}

              {hasDeleteDate && (
                <th className="w-[8%] border border-gray-700 px-2 py-3">
                  วันหมดอายุเอกสาร
                </th>
              )}

              <th className="w-[8%] border border-gray-700 px-2 py-3">
                ดูรายละเอียด
              </th>

              <th className="w-[5%] border border-gray-700 px-2 py-3">PDF แบบ พิมพ์มือ</th>

              {hasSendButton && (
                <th className="w-[5%] border border-gray-700 px-2 py-3">
                  แก้ไข
                </th>
              )}

              <th className="w-[5%] border border-gray-700 px-2 py-3">ลบ</th>

              {hasSendButton && (
                <th className="w-[6%] border border-gray-700 px-2 py-3">ส่ง</th>
              )}
            </tr>
          </thead>

          <tbody>
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

            {!loading && persons.length === 0 && (
              <tr>
                <td
                  colSpan={20}
                  className="border px-4 py-10 text-center text-gray-500"
                >
                  <div className="text-4xl">📂</div>
                  <div className="mt-2 font-semibold">ไม่พบข้อมูล</div>
                  <div className="mt-1 text-sm text-gray-400">
                    ลองเปลี่ยนเงื่อนไขการค้นหา
                  </div>
                </td>
              </tr>
            )}

            {!loading &&
              persons.map((p, i) => (
                <tr key={p.personId} className="transition hover:bg-blue-50">
                  {selectMode && (
                    <td className="border border-gray-200 px-2 py-3 text-center">
                      {p.status < 4 && (
                        <input
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer accent-blue-600"
                          checked={selectedIds.includes(p.personId)}
                          onChange={() => toggleSelect(p.personId, p.status)}
                        />
                      )}
                    </td>
                  )}

                  <td className="border border-gray-200 px-2 py-3 text-center font-semibold text-gray-600">
                    {i + 1}
                  </td>

                  <td className="border border-gray-200 px-2 py-3 text-left font-semibold text-gray-800">
                    <div
                      className="line-clamp-2 break-words"
                      title={p.fullName || ""}
                    >
                      {p.fullName || "-"}
                    </div>
                  </td>

                  <td className="border border-gray-200 px-2 py-3 text-left">
                    <div
                      className="line-clamp-2 break-words"
                      title={p.purpose || ""}
                    >
                      {p.purpose || "-"}
                    </div>
                  </td>

                  <td className="border border-gray-200 px-2 py-3 text-left">
                    <div
                      className="line-clamp-2 break-words"
                      title={p.requestingAgency || ""}
                    >
                      {p.requestingAgency || "-"}
                    </div>
                  </td>

                  <td className="border border-gray-200 px-2 py-3 text-center font-semibold">
                    {p.receiptBookNo || "-"}
                  </td>

                  <td className="border border-gray-200 px-2 py-3 text-center font-semibold">
                    {p.receiptNo || "-"}
                  </td>

                  <td className="border border-gray-200 px-2 py-3 text-center">
                    {formatThaiDate(p.receiptDate)}
                  </td>

                  <td className="border border-gray-200 px-2 py-3 text-center">
                    {renderStatus(p.status)}
                  </td>

                  <td className="border border-gray-200 px-2 py-3 text-center">
                    {renderPriority(p.priority ?? 0)}
                  </td>

                  {hasReturnDate && (
                    <td className="border border-gray-200 px-2 py-3 text-center">
                      {p.status === 4 ? formatThaiDate(p.returnDate) : "-"}
                    </td>
                  )}

                  {hasDeleteDate && (
                    <td className="border border-gray-200 px-2 py-3 text-center">
                      {p.status === 4 && p.deleteAt
                        ? formatThaiDate(p.deleteAt)
                        : "-"}
                    </td>
                  )}

                  {/* ดูรายละเอียด */}
                  <td className="border border-gray-200 px-2 py-3 text-center">
                    <div className="flex justify-center">
                      <ActionButton
                        icon={<Eye size={18} />}
                        label="ดูรายละเอียด"
                        className="bg-sky-500 hover:bg-sky-600"
                        onClick={() => navigate(`/person/${p.personId}`)}
                      />
                    </div>
                  </td>

                  {/* PDF */}
                  <td className="border border-gray-200 px-2 py-3 text-center">
                    <div className="flex justify-center">
                      <ActionButton
                        icon={<FileText size={18} />}
                        label="PDF แบบพิมพ์มือ"
                        className="bg-blue-600 hover:bg-blue-700"
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
                      />
                    </div>
                  </td>

                  {/* แก้ไข */}
                  {hasSendButton && (
                    <td className="border border-gray-200 px-2 py-3 text-center">
                      <div className="flex justify-center">
                        {p.status < 4 ? (
                          <ActionButton
                            icon={<Pencil size={18} />}
                            label="แก้ไข"
                            className="bg-amber-500 hover:bg-amber-600"
                            onClick={() =>
                              navigate(`/person/edit/${p.personId}`)
                            }
                          />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </td>
                  )}

                  {/* ลบ */}
                  <td className="border border-gray-200 px-2 py-3 text-center">
                    <div className="flex justify-center">
                      <ActionButton
                        icon={<Trash2 size={18} />}
                        label="ลบ"
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => handleDelete(p)}
                      />
                    </div>
                  </td>

                  {/* ส่ง */}
                  {hasSendButton && (
                    <td className="border border-gray-200 px-2 py-3 text-center">
                      <div className="flex justify-center">
                        {p.status < 4 ? (
                          <button
                            type="button"
                            className={`flex min-w-[62px] flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-bold text-white shadow-sm transition hover:brightness-95 active:scale-95 ${getStatusButtonStyle(
                              p.status,
                            )}`}
                            onClick={() => handleUpdateStatus(p)}
                          >
                            <Send size={18} />
                            <span className="whitespace-nowrap text-[10px] leading-tight">
                              {getStatusButton(p.status)}
                            </span>
                          </button>
                        ) : null}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {!loading && persons.length > 0 && (
        <div className="border-t bg-gray-50 px-5 py-3 text-right text-sm text-gray-600">
          แสดงทั้งหมด{" "}
          <span className="font-bold text-gray-900">{persons.length}</span>{" "}
          รายการ
        </div>
      )}
    </div>
  );
}
