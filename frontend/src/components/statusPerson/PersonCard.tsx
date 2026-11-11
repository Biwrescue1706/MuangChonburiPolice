import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  formatThaiDate,
  renderStatus,
  renderPriority,
  getStatusButton,
  getStatusButtonStyle,
} from "../../utils/personHelper";

type Person = {
  personId: string;
  fullName?: string | null;
  receiptBookNo?: string | number | null;
  receiptNo?: string | number | null;
  receiptDate?: string | null;
  purpose?: string | null;
  requestingAgency?: string | null;
  status: number;
  priority?: number | null;
  returnDate?: string | null;
  deleteAt?: string | null;
};

interface Props {
  persons: Person[];
  loading: boolean;
  selectMode: boolean;
  selectedIds: string[];
  toggleSelect: (id: string, status: number) => void;
  handleDelete: (person: Person) => void;
  handleUpdateStatus: (person: Person) => void;
  handleExportPDF: (person: Person) => void;
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

    if (bookA !== bookB) return bookA - bookB;

    const noA = Number(a.receiptNo || 0);
    const noB = Number(b.receiptNo || 0);

    return noA - noB;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-14 shadow-sm">
        <div className="h-11 w-11 animate-spin rounded-full border-4 border-slate-200 border-t-[#800020]" />
        <p className="mt-4 text-sm font-bold text-slate-600">
          กำลังโหลดข้อมูล...
        </p>
      </div>
    );
  }

  if (sortedPersons.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5h16v14H4z" />
            <path d="M8 9h8M8 13h5" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-extrabold text-slate-700">
          ไม่พบข้อมูล
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          ลองเปลี่ยนเงื่อนไขการค้นหา
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {sortedPersons.map((person, index) => {
        const selected = selectedIds.includes(person.personId);

        return (
          <article
            key={person.personId}
            className={`group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
              selected
                ? "border-blue-400 ring-2 ring-blue-100"
                : "border-slate-200 hover:border-[#800020]/30"
            }`}
          >
            <div className="relative overflow-hidden bg-gradient-to-r from-[#800020] via-[#700019] to-[#4a0012] px-4 py-4 text-white sm:px-5">
              <div className="pointer-events-none absolute -right-8 -top-12 h-32 w-32 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-2 -top-8 h-20 w-20 rounded-full bg-white/[0.04]" />

              <div className="relative flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-sm font-extrabold shadow-inner">
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                      PERSON RECORD
                    </p>
                    <h3 className="mt-1 break-words text-base font-extrabold leading-6 text-white sm:text-lg">
                      {person.fullName || "-"}
                    </h3>
                  </div>
                </div>

                {selectMode && person.status < 4 && (
                  <label className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/20 bg-white/10 transition hover:bg-white/20">
                    <input
                      type="checkbox"
                      aria-label={`เลือก ${person.fullName || person.personId}`}
                      className="h-5 w-5 cursor-pointer rounded accent-blue-500"
                      checked={selected}
                      onChange={() =>
                        toggleSelect(person.personId, person.status)
                      }
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-4 p-4 sm:p-5">
              <section className="overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white">
                <div className="flex items-center gap-2 border-b border-emerald-100 bg-emerald-50/80 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 3h12a2 2 0 0 1 2 2v16H4V5a2 2 0 0 1 2-2Z" />
                      <path d="M8 8h8M8 12h8M8 16h4" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-extrabold text-emerald-800">
                    ข้อมูลใบเสร็จ
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4">
                  <div className="rounded-lg border border-emerald-100 bg-white p-3">
                    <p className="text-xs font-semibold text-slate-500">
                      เล่มใบเสร็จ
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-emerald-800">
                      {person.receiptBookNo || "-"}
                    </p>
                  </div>

                  <div className="rounded-lg border border-emerald-100 bg-white p-3">
                    <p className="text-xs font-semibold text-slate-500">
                      เลขที่
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-emerald-800">
                      {person.receiptNo || "-"}
                    </p>
                  </div>

                  <div className="col-span-2 rounded-lg border border-emerald-100 bg-white p-3">
                    <p className="text-xs font-semibold text-slate-500">
                      วันที่ใบเสร็จ
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {formatThaiDate(person.receiptDate)}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-5 w-1 rounded-full bg-blue-500" />
                  <h4 className="text-sm font-extrabold text-blue-800">
                    เรื่องที่ขออนุญาต
                  </h4>
                </div>
                <p className="mt-2 break-words text-sm font-semibold leading-6 text-slate-800">
                  {person.purpose || "-"}
                </p>
              </section>

              <section className="rounded-xl border border-violet-100 bg-violet-50/50 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-5 w-1 rounded-full bg-violet-500" />
                  <h4 className="text-sm font-extrabold text-violet-800">
                    หน่วยงาน
                  </h4>
                </div>
                <p className="mt-2 break-words text-sm font-semibold leading-6 text-slate-800">
                  {person.requestingAgency || "-"}
                </p>
              </section>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
                  <p className="mb-2 text-xs font-bold text-blue-800">สถานะ</p>
                  {renderStatus(person.status)}
                </div>

                <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
                  <p className="mb-2 text-xs font-bold text-amber-800">
                    ความเร่งด่วน
                  </p>
                  {renderPriority(person.priority ?? 0)}
                </div>
              </div>

              {person.status === 4 && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                  <p className="text-xs font-extrabold text-rose-800">วันคืน</p>
                  <p className="mt-1 text-sm font-bold text-rose-900">
                    {formatThaiDate(person.returnDate)}
                  </p>
                </div>
              )}

              {person.status === 4 && person.deleteAt && (
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                  <p className="text-xs font-extrabold text-orange-800">
                    วันหมดอายุเอกสาร
                  </p>
                  <p className="mt-1 text-sm font-bold text-orange-900">
                    {formatThaiDate(person.deleteAt)}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  className="flex min-h-[58px] items-center justify-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-3 text-sm font-bold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100 active:scale-[0.98]"
                  onClick={() => navigate(`/person/${person.personId}`)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>
                  ดูข้อมูลส่วนบุคคล
                </button>

                <button
                  type="button"
                  className="flex min-h-[58px] items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-3 text-sm font-bold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100 active:scale-[0.98]"
                  onClick={() => {
                    if (person.status < 1) {
                      void Swal.fire({
                        icon: "warning",
                        title: "ไม่สามารถดำเนินการได้",
                        text: "กรุณากดปุ่ม 'เตรียมเอกสารส่ง พฐ' ก่อน",
                        confirmButtonText: "ตกลง",
                        confirmButtonColor: "#800020",
                      });
                      return;
                    }

                    handleExportPDF(person);
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3h9l4 4v14H6z" />
                    <path d="M14 3v5h5M9 13h6M9 17h6" />
                  </svg>
                  PDF แบบพิมพ์มือ
                </button>

                {person.status < 4 && (
                  <button
                    type="button"
                    className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-sm font-bold text-amber-700 transition hover:border-amber-300 hover:bg-amber-100 active:scale-[0.98]"
                    onClick={() => navigate(`/person/edit/${person.personId}`)}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m14 5 5 5M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
                    </svg>
                    แก้ไข
                  </button>
                )}

                <button
                  type="button"
                  className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-3 text-sm font-bold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100 active:scale-[0.98]"
                  onClick={() => handleDelete(person)}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 7h16M10 11v6M14 11v6M5 7l1 14h12l1-14M9 7V4h6v3" />
                  </svg>
                  ลบ
                </button>

                {person.status < 4 && (
                  <button
                    type="button"
                    className={`col-span-2 flex min-h-[54px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] ${getStatusButtonStyle(
                      person.status,
                    )}`}
                    onClick={() => handleUpdateStatus(person)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                    {getStatusButton(person.status)}
                  </button>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
