import type { ChangeEvent } from "react";

interface ReceiptInfoForm {
  receiptBookNo?: string | number | null;
  receiptNo?: string | number | null;
  money?: string | number | null;
  moneyText?: string | null;
  receiptDay?: string | number | null;
  receiptMonth?: string | number | null;
  receiptYear?: string | number | null;
  status?: number | null;
  priority?: number | null;
}

interface ReceiptInfoProps {
  form: ReceiptInfoForm;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  receiptNumbers: (string | number)[];
  setStatus: (status: number) => void;
  setPriority: (priority: number) => void;
  months: (string | number)[];
  years: (string | number)[];
}

export default function ReceiptInfo({
  form,
  handleChange,
  receiptNumbers,
  setStatus,
  setPriority,
  months,
  years,
}: ReceiptInfoProps) {
  const statusOptions = [
    { value: 0, label: "รอส่ง ศพฐ" },
    { value: 1, label: "เตรียมเอกสาร ส่ง พฐ" },
    { value: 2, label: "ส่ง ศพฐ แล้ว" },
    { value: 3, label: "รับจาก ศพฐ แล้ว" },
    { value: 4, label: "ส่งคืนต้นสังกัด" },
  ];

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:font-normal placeholder:text-slate-400 hover:border-[#800020]/50 hover:bg-white focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-[#800020]/10";

  const readOnlyClass =
    "h-12 w-full rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-bold text-emerald-800 outline-none cursor-not-allowed";

  const labelClass = "mb-2 block text-sm font-bold text-slate-700";

  const cardClass =
    "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.05)]";

  const headerClass =
    "flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-white via-slate-50 to-slate-100/70 px-5 py-4";

  const titleClass = "text-base font-extrabold tracking-tight text-slate-800";

  const descriptionClass = "mt-0.5 text-xs font-medium text-slate-500";

  const iconBox = (color: string) =>
    `flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`;

  const badgeClass = (color: string) =>
    `ml-auto rounded-full px-3 py-1 text-[10px] font-extrabold tracking-wide ${color}`;

  return (
    <div className="space-y-6">
      <section className={`${cardClass} border-l-4 border-l-emerald-500`}>
        <div className={headerClass}>
          <div className={iconBox("bg-emerald-50 text-emerald-600")}>
            <svg
              width="22"
              height="22"
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
          <div>
            <h3 className={titleClass}>รายละเอียดใบเสร็จ</h3>
            <p className={descriptionClass}>
              เลขเล่ม เลขที่ และจำนวนเงินตามใบเสร็จ
            </p>
          </div>
          <span className={badgeClass("bg-emerald-50 text-emerald-700")}>
            RECEIPT
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <label htmlFor="receiptBookNo" className={labelClass}>
                เล่มที่ <span className="text-rose-500">*</span>
              </label>
              <input
                id="receiptBookNo"
                name="receiptBookNo"
                className={inputClass}
                value={form.receiptBookNo || ""}
                onChange={handleChange}
                placeholder="เลขเล่ม"
                required
              />
            </div>

            <div className="lg:col-span-3">
              <label htmlFor="receiptNo" className={labelClass}>
                เลขที่
              </label>
              <input
                id="receiptNo"
                list="receipt-list"
                name="receiptNo"
                className={inputClass}
                value={form.receiptNo || ""}
                onChange={handleChange}
                placeholder="พิมพ์หรือเลือกเลขที่"
                autoComplete="off"
              />
              <datalist id="receipt-list">
                {receiptNumbers.map((num) => {
                  const formatted = String(num).padStart(2, "0");
                  return <option key={formatted} value={formatted} />;
                })}
              </datalist>
            </div>

            <div className="lg:col-span-3">
              <label htmlFor="money" className={labelClass}>
                จำนวนเงิน
              </label>
              <div className="relative">
                <input
                  id="money"
                  type="number"
                  name="money"
                  className={`${readOnlyClass} pr-14`}
                  value={form.money ?? ""}
                  readOnly
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600">
                  บาท
                </span>
              </div>
            </div>

            <div className="lg:col-span-3">
              <label htmlFor="moneyText" className={labelClass}>
                จำนวนเงินตัวอักษร
              </label>
              <input
                id="moneyText"
                name="moneyText"
                className={readOnlyClass}
                value={form.moneyText || ""}
                readOnly
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${cardClass} border-l-4 border-l-blue-500`}>
        <div className={headerClass}>
          <div className={iconBox("bg-blue-50 text-blue-600")}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="5" width="16" height="15" rx="2" />
              <path d="M8 3v4M16 3v4M4 10h16" />
              <path d="M8 14h3M8 17h5" />
            </svg>
          </div>
          <div>
            <h3 className={titleClass}>วันที่ใบเสร็จ</h3>
            <p className={descriptionClass}>วันที่ออกใบเสร็จรับเงิน</p>
          </div>
          <span className={badgeClass("bg-blue-50 text-blue-700")}>
            RECEIPT DATE
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="receiptDay" className={labelClass}>
                วัน
              </label>
              <input
                id="receiptDay"
                list="receipt-day-list"
                name="receiptDay"
                className={inputClass}
                value={form.receiptDay || ""}
                onChange={handleChange}
                placeholder="เลือกวัน"
                autoComplete="off"
              />
              <datalist id="receipt-day-list">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day} />
                ))}
              </datalist>
            </div>

            <div>
              <label htmlFor="receiptMonth" className={labelClass}>
                เดือน
              </label>
              <input
                id="receiptMonth"
                list="receipt-month-list"
                name="receiptMonth"
                className={inputClass}
                value={form.receiptMonth || ""}
                onChange={handleChange}
                placeholder="เลือกเดือน"
                autoComplete="off"
              />
              <datalist id="receipt-month-list">
                {months.map((month) => (
                  <option key={month} value={month} />
                ))}
              </datalist>
            </div>

            <div>
              <label htmlFor="receiptYear" className={labelClass}>
                ปี
              </label>
              <input
                id="receiptYear"
                list="receipt-year-list"
                name="receiptYear"
                className={inputClass}
                value={form.receiptYear || ""}
                onChange={handleChange}
                placeholder="พ.ศ."
                autoComplete="off"
              />
              <datalist id="receipt-year-list">
                {years.map((year) => (
                  <option key={year} value={year} />
                ))}
              </datalist>
            </div>
          </div>
        </div>
      </section>

      <section className={`${cardClass} border-l-4 border-l-[#800020]`}>
        <div className={headerClass}>
          <div className={iconBox("bg-[#800020]/10 text-[#800020]")}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
              <circle cx="12" cy="12" r="5" />
              <path d="m10 12 1.5 1.5L14.5 10" />
            </svg>
          </div>
          <div>
            <h3 className={titleClass}>สถานะการดำเนินการ</h3>
            <p className={descriptionClass}>ติดตามขั้นตอนการส่งตรวจและรับผล</p>
          </div>
          <span className={badgeClass("bg-[#800020]/10 text-[#800020]")}>
            WORKFLOW
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="status" className={labelClass}>
                สถานะ
              </label>
              <select
                id="status"
                name="status"
                className={inputClass}
                value={form.status ?? 0}
                onChange={(event) => setStatus(Number(event.target.value))}
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="priority" className={labelClass}>
                ความเร่งด่วน
              </label>
              <select
                id="priority"
                name="priority"
                className={inputClass}
                value={form.priority ?? 0}
                onChange={(event) => setPriority(Number(event.target.value))}
              >
                <option value={0}>ไม่ด่วน</option>
                <option value={1}>ด่วน</option>
                <option value={2}>คืนปกติ</option>
                <option value={3}>คืนด่วน</option>
              </select>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
              <p className="text-xs font-bold text-blue-700">สถานะปัจจุบัน</p>
              <p className="mt-1 text-sm font-semibold text-blue-900">
                {statusOptions.find((item) => item.value === (form.status ?? 0))
                  ?.label ?? "ไม่ระบุ"}
              </p>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
              <p className="text-xs font-bold text-amber-700">
                ระดับความเร่งด่วน
              </p>
              <p className="mt-1 text-sm font-semibold text-amber-900">
                {["ไม่ด่วน", "ด่วน", "คืนปกติ", "คืนด่วน"][
                  form.priority ?? 0
                ] ?? "ไม่ระบุ"}
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
