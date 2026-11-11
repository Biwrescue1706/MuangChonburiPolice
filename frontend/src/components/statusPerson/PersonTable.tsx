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

interface Person {
  personId: string;
  fullName?: string | null;
  purpose?: string | null;
  requestingAgency?: string | null;
  receiptBookNo?: string | number | null;
  receiptNo?: string | number | null;
  receiptDate?: string | null;
  status: number;
  priority?: number | null;
  returnDate?: string | null;
  deleteAt?: string | null;
}

interface Props {
  persons: Person[];
  loading: boolean;
  selectMode: boolean;
  selectedIds: string[];
  toggleSelect: (id: string, status: number) => void;
  handleSelectAll: () => void;
  handleDelete: (person: Person) => void;
  handleUpdateStatus: (person: Person) => void;
  handleExportPDF: (person: Person) => void;
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
      title={label}
      className={`flex min-w-[52px] flex-col items-center justify-center gap-1 rounded-lg px-1.5 py-2 text-xs font-bold text-white shadow-sm transition hover:brightness-95 active:scale-95 ${className}`}
    >
      {icon}
      <span className="whitespace-normal break-words text-center text-[10px] leading-tight">
        {label}
      </span>
    </button>
  );
}

const thClass =
  "border border-slate-700 px-2 py-3 text-center text-xs font-bold leading-tight text-white whitespace-normal break-words";

const tdClass =
  "border border-slate-200 px-2 py-3 text-sm leading-relaxed text-slate-700 whitespace-normal break-words";

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

  const selectablePersons = persons.filter((person) => person.status < 4);

  const selectedSelectableCount = selectablePersons.filter((person) =>
    selectedIds.includes(person.personId),
  ).length;

  const allSelected =
    selectablePersons.length > 0 &&
    selectedSelectableCount === selectablePersons.length;

  const hasReturnDate = persons.some((person) => person.status === 4);

  const hasDeleteDate = persons.some(
    (person) => person.status === 4 && person.deleteAt,
  );

  const hasSendButton = persons.some((person) => person.status < 4);

  // ซ่อนคอลัมน์ PDF เมื่อไม่มีรายการที่ status น้อยกว่า 2
  const hasPdfButton = persons.some((person) => person.status < 2);

  const columnCount =
    11 +
    (selectMode ? 1 : 0) +
    (hasReturnDate ? 1 : 0) +
    (hasDeleteDate ? 1 : 0) +
    (hasPdfButton ? 1 : 0) +
    (hasSendButton ? 2 : 0);

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
      <div className="flex min-h-[100px] flex-wrap items-center justify-between gap-3 border-b bg-gradient-to-r from-[#641b35] to-[#a13b50] px-5 py-5 sm:px-7">
        <div>
          <h3 className="text-lg font-bold text-white">รายการข้อมูลบุคคล</h3>
          <p className="mt-1 text-sm text-white/75">
            ทั้งหมด {persons.length} รายการ
          </p>
        </div>

        <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
          จำนวน {persons.length} รายการ
        </div>
      </div>

      {selectMode && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-100 bg-blue-50 px-4 py-3">
          <div className="text-sm font-semibold text-blue-800">
            เลือกแล้ว {selectedSelectableCount} / {selectablePersons.length}{" "}
            รายการ
          </div>

          <button
            type="button"
            onClick={handleSelectAll}
            disabled={selectablePersons.length === 0}
            className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {allSelected ? "ยกเลิกการเลือกทั้งหมด" : "เลือกทั้งหมด"}
          </button>
        </div>
      )}

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1250px] table-fixed border-collapse text-sm">
          <colgroup>
            {selectMode && <col className="w-[38px]" />}
            <col className="w-[38px]" />
            <col className="w-[125px]" />
            <col className="w-[145px]" />
            <col className="w-[145px]" />
            <col className="w-[55px]" />
            <col className="w-[55px]" />
            <col className="w-[90px]" />
            <col className="w-[85px]" />
            <col className="w-[85px]" />

            {hasReturnDate && <col className="w-[80px]" />}
            {hasDeleteDate && <col className="w-[95px]" />}

            <col className="w-[75px]" />

            {hasPdfButton && <col className="w-[78px]" />}
            {hasSendButton && <col className="w-[65px]" />}

            <col className="w-[58px]" />

            {hasSendButton && <col className="w-[75px]" />}
          </colgroup>

          <thead>
            <tr className="bg-slate-800">
              {selectMode && (
                <th className={thClass}>
                  <input
                    type="checkbox"
                    aria-label="เลือกข้อมูลทั้งหมด"
                    className="h-4 w-4 cursor-pointer accent-amber-500"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    disabled={selectablePersons.length === 0}
                  />
                </th>
              )}

              <th className={thClass}>#</th>
              <th className={thClass}>ชื่อและชื่อสกุล</th>
              <th className={thClass}>เรื่องที่ขออนุญาต</th>
              <th className={thClass}>หน่วยงาน</th>
              <th className={thClass}>เล่มที่</th>
              <th className={thClass}>เลขที่</th>
              <th className={thClass}>ลงวันที่</th>
              <th className={thClass}>สถานะ</th>
              <th className={thClass}>ความเร่งด่วน</th>

              {hasReturnDate && <th className={thClass}>วันคืน</th>}

              {hasDeleteDate && <th className={thClass}>วันหมดอายุเอกสาร</th>}

              <th className={thClass}>ดูรายละเอียด</th>

              {hasPdfButton && <th className={thClass}>PDF แบบพิมพ์มือ</th>}

              {hasSendButton && <th className={thClass}>แก้ไข</th>}

              <th className={thClass}>ลบ</th>

              {hasSendButton && <th className={thClass}>ส่ง</th>}
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={columnCount}
                  className="border px-4 py-10 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#812440]" />
                    <span>กำลังโหลดข้อมูล...</span>
                  </div>
                </td>
              </tr>
            )}

            {!loading && persons.length === 0 && (
              <tr>
                <td
                  colSpan={columnCount}
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
              persons.map((person, index) => (
                <tr
                  key={person.personId}
                  className="transition hover:bg-blue-50"
                >
                  {selectMode && (
                    <td className={`${tdClass} text-center`}>
                      {person.status < 4 && (
                        <input
                          type="checkbox"
                          aria-label={`เลือก ${person.fullName || "รายการนี้"}`}
                          className="h-4 w-4 cursor-pointer accent-blue-600"
                          checked={selectedIds.includes(person.personId)}
                          onChange={() =>
                            toggleSelect(person.personId, person.status)
                          }
                        />
                      )}
                    </td>
                  )}

                  <td className={`${tdClass} text-center font-semibold`}>
                    {index + 1}
                  </td>

                  <td
                    className={`${tdClass} text-left font-semibold text-slate-800`}
                  >
                    <div className="break-words" title={person.fullName || ""}>
                      {person.fullName || "-"}
                    </div>
                  </td>

                  <td className={`${tdClass} text-left`}>
                    <div className="break-words" title={person.purpose || ""}>
                      {person.purpose || "-"}
                    </div>
                  </td>

                  <td className={`${tdClass} text-left`}>
                    <div
                      className="break-words"
                      title={person.requestingAgency || ""}
                    >
                      {person.requestingAgency || "-"}
                    </div>
                  </td>

                  <td className={`${tdClass} text-center font-semibold`}>
                    {person.receiptBookNo || "-"}
                  </td>

                  <td className={`${tdClass} text-center font-semibold`}>
                    {person.receiptNo || "-"}
                  </td>

                  <td className={`${tdClass} text-center`}>
                    {formatThaiDate(person.receiptDate)}
                  </td>

                  <td className={`${tdClass} text-center`}>
                    {renderStatus(person.status)}
                  </td>

                  <td className={`${tdClass} text-center`}>
                    {renderPriority(person.priority ?? 0)}
                  </td>

                  {hasReturnDate && (
                    <td className={`${tdClass} text-center`}>
                      {person.status === 4
                        ? formatThaiDate(person.returnDate)
                        : "-"}
                    </td>
                  )}

                  {hasDeleteDate && (
                    <td className={`${tdClass} text-center`}>
                      {person.status === 4 && person.deleteAt
                        ? formatThaiDate(person.deleteAt)
                        : "-"}
                    </td>
                  )}

                  <td className={`${tdClass} text-center`}>
                    <div className="flex justify-center">
                      <ActionButton
                        icon={<Eye size={16} />}
                        label="ดูรายละเอียด"
                        className="bg-sky-500 hover:bg-sky-600"
                        onClick={() => navigate(`/person/${person.personId}`)}
                      />
                    </div>
                  </td>

                  {hasPdfButton && (
                    <td className={`${tdClass} text-center`}>
                      <div className="flex justify-center">
                        {person.status < 2 && (
                          <ActionButton
                            icon={<FileText size={16} />}
                            label="PDF แบบพิมพ์มือ"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => {
                              if (person.status < 1) {
                                void Swal.fire({
                                  icon: "warning",
                                  title: "ไม่สามารถดำเนินการได้",
                                  text: "กรุณากดปุ่ม 'เตรียมเอกสารส่ง พฐ' ก่อน",
                                  confirmButtonText: "ตกลง",
                                });
                                return;
                              }

                              handleExportPDF(person);
                            }}
                          />
                        )}
                      </div>
                    </td>
                  )}

                  {hasSendButton && (
                    <td className={`${tdClass} text-center`}>
                      <div className="flex justify-center">
                        {person.status < 4 ? (
                          <ActionButton
                            icon={<Pencil size={16} />}
                            label="แก้ไข"
                            className="bg-amber-500 hover:bg-amber-600"
                            onClick={() =>
                              navigate(`/person/edit/${person.personId}`)
                            }
                          />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </td>
                  )}

                  <td className={`${tdClass} text-center`}>
                    <div className="flex justify-center">
                      <ActionButton
                        icon={<Trash2 size={16} />}
                        label="ลบ"
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => handleDelete(person)}
                      />
                    </div>
                  </td>

                  {hasSendButton && (
                    <td className={`${tdClass} text-center`}>
                      <div className="flex justify-center">
                        {person.status < 4 ? (
                          <button
                            type="button"
                            title={getStatusButton(person.status) ?? ""}
                            className={`flex min-w-[52px] flex-col items-center justify-center gap-1 rounded-lg px-1.5 py-2 text-xs font-bold text-white shadow-sm transition hover:brightness-95 active:scale-95 ${getStatusButtonStyle(
                              person.status,
                            )}`}
                            onClick={() => handleUpdateStatus(person)}
                          >
                            <Send size={16} />
                            <span className="whitespace-normal break-words text-center text-[10px] leading-tight">
                              {getStatusButton(person.status)}
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
