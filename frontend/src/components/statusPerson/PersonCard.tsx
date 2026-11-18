import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Eye,
  FileText,
  Pencil,
  Trash2,
  Send,
  CalendarDays,
  Building2,
  Receipt,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";

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
  [key: string]: unknown;
}

interface Props {
  persons: Person[];
  loading: boolean;
  selectMode: boolean;
  selectedIds: string[];
  toggleSelect: (id: string, status: number) => void;
  handleSelectAll: () => void;
  handleDelete: (person: Person) => void | Promise<void>;
  handleUpdateStatus: (person: Person) => void | Promise<void>;
  handleExportPDF: (person: Person) => void | Promise<void>;
}

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className: string;
  disabled?: boolean;
}

function ActionButton({
  icon,
  label,
  onClick,
  className,
  disabled = false,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-slate-400">{label}</p>
        <div className="mt-0.5 break-words text-sm font-medium leading-relaxed text-slate-700">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function PersonCard({
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

  const handlePDF = async (person: Person) => {
    if (person.status < 1) {
      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถดำเนินการได้",
        text: "กรุณากดปุ่ม 'เตรียมเอกสารส่ง พฐ' ก่อน",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    await handleExportPDF(person);
  };

  if (loading) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#812440]" />
        <p className="mt-4 text-sm font-medium text-slate-500">
          กำลังโหลดข้อมูล...
        </p>
      </div>
    );
  }

  if (persons.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <UserRound size={30} />
        </div>

        <h3 className="mt-4 text-base font-bold text-slate-700">
          ไม่พบข้อมูลบุคคล
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          ลองเปลี่ยนเงื่อนไขการค้นหา
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selectMode && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
          <div>
            <p className="text-sm font-bold text-blue-800">
              เลือกรายการที่ต้องการ
            </p>

            <p className="mt-1 text-xs text-blue-600">
              เลือกแล้ว {selectedSelectableCount} / {selectablePersons.length}{" "}
              รายการ
            </p>
          </div>

          <button
            type="button"
            onClick={handleSelectAll}
            disabled={selectablePersons.length === 0}
            className="rounded-xl border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {allSelected ? "ยกเลิกการเลือกทั้งหมด" : "เลือกทั้งหมด"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {persons.map((person, index) => {
          const isSelected = selectedIds.includes(person.personId);
          const canEdit = person.status < 4;
          const canExportPDF = person.status < 2;

          return (
            <article
              key={person.personId}
              className={`min-w-0 overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? "border-blue-400 ring-2 ring-blue-100"
                  : "border-slate-200"
              }`}
            >
              <div className="border-b border-slate-100 bg-gradient-to-r from-[#641b35] to-[#a13b50] px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white">
                      <UserRound size={23} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium text-white/70">
                        รายการที่ {index + 1}
                      </p>

                      <h3 className="mt-1 break-words text-base font-bold leading-snug text-white">
                        {person.fullName || "ไม่ระบุชื่อ"}
                      </h3>
                    </div>
                  </div>

                  {selectMode && canEdit && (
                    <label className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/20 bg-white/15">
                      <input
                        type="checkbox"
                        aria-label={`เลือก ${person.fullName || "รายการนี้"}`}
                        checked={isSelected}
                        onChange={() =>
                          toggleSelect(person.personId, person.status)
                        }
                        className="h-5 w-5 cursor-pointer accent-amber-400"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  {renderStatus(person.status)}
                  {renderPriority(person.priority ?? 0)}
                </div>

                <div className="mt-4 divide-y divide-slate-100">
                  <InfoRow
                    icon={<FileText size={16} />}
                    label="เรื่องที่ขออนุญาต"
                  >
                    {person.purpose || "-"}
                  </InfoRow>

                  <InfoRow icon={<Building2 size={16} />} label="หน่วยงาน">
                    {person.requestingAgency || "-"}
                  </InfoRow>

                  <InfoRow icon={<Receipt size={16} />} label="ข้อมูลใบเสร็จ">
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span>
                        เล่มที่{" "}
                        <strong className="text-[#812440]">
                          {person.receiptBookNo || "-"}
                        </strong>
                      </span>

                      <span>
                        เลขที่{" "}
                        <strong className="text-[#812440]">
                          {person.receiptNo || "-"}
                        </strong>
                      </span>
                    </div>
                  </InfoRow>

                  <InfoRow
                    icon={<CalendarDays size={16} />}
                    label="วันที่ออกใบเสร็จ"
                  >
                    {formatThaiDate(person.receiptDate)}
                  </InfoRow>

                  {person.status === 4 && (
                    <>
                      <InfoRow
                        icon={<CalendarDays size={16} />}
                        label="วันที่คืน"
                      >
                        {formatThaiDate(person.returnDate)}
                      </InfoRow>

                      {person.deleteAt && (
                        <InfoRow
                          icon={<CalendarDays size={16} />}
                          label="วันหมดอายุเอกสาร"
                        >
                          {formatThaiDate(person.deleteAt)}
                        </InfoRow>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 bg-slate-50/80 px-4 py-4">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  จัดการข้อมูล
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <ActionButton
                    icon={<Eye size={16} />}
                    label="ดูรายละเอียด"
                    className="bg-sky-600 hover:bg-sky-700"
                    onClick={() => navigate(`/person/${person.personId}`)}
                  />

                  <ActionButton
                    icon={<Trash2 size={16} />}
                    label="ลบ"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => void handleDelete(person)}
                  />

                  {canExportPDF && (
                    <ActionButton
                      icon={<FileText size={16} />}
                      label="PDF แบบพิมพ์มือ"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => void handlePDF(person)}
                    />
                  )}

                  {canEdit && (
                    <ActionButton
                      icon={<Pencil size={16} />}
                      label="แก้ไข"
                      className="bg-amber-500 hover:bg-amber-600"
                      onClick={() =>
                        navigate(`/person/edit/${person.personId}`)
                      }
                    />
                  )}
                </div>

                {canEdit && (
                  <button
                    type="button"
                    title={getStatusButton(person.status) ?? ""}
                    onClick={() => void handleUpdateStatus(person)}
                    className={`mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 ${getStatusButtonStyle(
                      person.status,
                    )}`}
                  >
                    <Send size={17} />
                    <span>{getStatusButton(person.status)}</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-right text-xs text-slate-500">
        แสดงทั้งหมด{" "}
        <span className="font-bold text-slate-800">{persons.length}</span>{" "}
        รายการ
      </div>
    </div>
  );
}
