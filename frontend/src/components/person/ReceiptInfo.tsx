// src/components/person/ReceiptInfo.tsx

export default function ReceiptInfo({
  form,
  handleChange,
  receiptNumbers,
  setForm,
  months,
  years,
}: any) {
  const statusOptions = [
    { value: 0, label: "รอส่ง ศพฐ" },
    { value: 1, label: "เตรียมเอกสาร ส่ง พฐ" },
    { value: 2, label: "ส่ง ศพฐ แล้ว" },
    { value: 3, label: "รับจาก ศพฐ แล้ว" },
    { value: 4, label: "ส่งคืนต้นสังกัด" },
  ];

  const inputClass =
    "h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none transition focus:border-[#800020] focus:bg-white focus:ring-2 focus:ring-[#800020]/10";

  const labelClass =
    "mb-1.5 block text-xs font-semibold text-gray-600";

  return (
    <div className="space-y-6">

      {/* =====================================================
          ข้อมูลใบเสร็จ
      ===================================================== */}

      <div>

        <div className="mb-3 flex items-center gap-2">

          <div className="h-1 w-1 rounded-full bg-emerald-500" />

          <h3 className="text-sm font-bold text-gray-800">
            รายละเอียดใบเสร็จ
          </h3>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">

          {/* =================================================
              เล่มที่
          ================================================= */}

          <div className="sm:col-span-1 lg:col-span-3">

            <label
              htmlFor="receiptBookNo"
              className={labelClass}
            >
              เล่มที่
              <span className="ml-1 text-red-500">*</span>
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

          {/* =================================================
              เลขที่
          ================================================= */}

          <div className="sm:col-span-1 lg:col-span-3">

            <label
              htmlFor="receiptNo"
              className={labelClass}
            >
              เลขที่
            </label>

            <input
              id="receiptNo"
              list="receipt-list"
              name="receiptNo"
              className={inputClass}
              value={form.receiptNo || ""}
              onChange={handleChange}
              placeholder="พิมพ์หรือเลือก"
              autoComplete="off"
            />

            <datalist id="receipt-list">
              {receiptNumbers.map(
                (num: any) => {
                  const formatted =
                    String(num).padStart(
                      2,
                      "0",
                    );

                  return (
                    <option
                      key={formatted}
                      value={formatted}
                    />
                  );
                },
              )}
            </datalist>

          </div>

          {/* =================================================
              จำนวนเงิน
          ================================================= */}

          <div className="sm:col-span-1 lg:col-span-3">

            <label
              htmlFor="money"
              className={labelClass}
            >
              จำนวนเงิน
            </label>

            <div className="relative">

              <input
                id="money"
                type="number"
                name="money"
                className={`${inputClass} pr-14`}
                value={form.money ?? ""}
                readOnly
              />

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                บาท
              </span>

            </div>

          </div>

          {/* =================================================
              ตัวอักษร
          ================================================= */}

          <div className="sm:col-span-1 lg:col-span-3">

            <label
              htmlFor="moneyText"
              className={labelClass}
            >
              จำนวนเงินตัวอักษร
            </label>

            <input
              id="moneyText"
              name="moneyText"
              className={`${inputClass} bg-gray-100`}
              value={form.moneyText || ""}
              readOnly
            />

          </div>

        </div>

      </div>

      {/* =====================================================
          วันที่ใบเสร็จ
      ===================================================== */}

      <div className="border-t border-gray-100 pt-5">

        <div className="mb-3 flex items-center gap-2">

          <div className="h-1 w-1 rounded-full bg-blue-500" />

          <h3 className="text-sm font-bold text-gray-800">
            วันที่ใบเสร็จ
          </h3>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* วัน */}

          <div>

            <label
              htmlFor="receiptDay"
              className={labelClass}
            >
              วัน
            </label>

            <input
              id="receiptDay"
              list="receipt-day-list"
              name="receiptDay"
              className={inputClass}
              value={
                form.receiptDay || ""
              }
              onChange={handleChange}
              placeholder="วัน"
              autoComplete="off"
            />

            <datalist id="receipt-day-list">
              {Array.from(
                { length: 31 },
                (_, i) => i + 1,
              ).map((d) => (
                <option
                  key={d}
                  value={d}
                />
              ))}
            </datalist>

          </div>

          {/* เดือน */}

          <div>

            <label
              htmlFor="receiptMonth"
              className={labelClass}
            >
              เดือน
            </label>

            <input
              id="receiptMonth"
              list="receipt-month-list"
              name="receiptMonth"
              className={inputClass}
              value={
                form.receiptMonth || ""
              }
              onChange={handleChange}
              placeholder="เดือน"
              autoComplete="off"
            />

            <datalist id="receipt-month-list">
              {months.map(
                (m: any) => (
                  <option
                    key={m}
                    value={m}
                  />
                ),
              )}
            </datalist>

          </div>

          {/* ปี */}

          <div>

            <label
              htmlFor="receiptYear"
              className={labelClass}
            >
              ปี
            </label>

            <input
              id="receiptYear"
              list="receipt-year-list"
              name="receiptYear"
              className={inputClass}
              value={
                form.receiptYear || ""
              }
              onChange={handleChange}
              placeholder="พ.ศ."
              autoComplete="off"
            />

            <datalist id="receipt-year-list">
              {years.map(
                (y: any) => (
                  <option
                    key={y}
                    value={y}
                  />
                ),
              )}
            </datalist>

          </div>

        </div>

      </div>

      {/* =====================================================
          สถานะและความเร่งด่วน
      ===================================================== */}

      <div className="border-t border-gray-100 pt-5">

        <div className="mb-3 flex items-center gap-2">

          <div className="h-1 w-1 rounded-full bg-[#800020]" />

          <h3 className="text-sm font-bold text-gray-800">
            สถานะการดำเนินการ
          </h3>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* =================================================
              สถานะ
          ================================================= */}

          <div>

            <label
              htmlFor="status"
              className={labelClass}
            >
              สถานะ
            </label>

            <select
              id="status"
              name="status"
              className={inputClass}
              value={
                form.status ?? 0
              }
              onChange={(e) =>
                setForm(
                  (prev: any) => ({
                    ...prev,
                    status: Number(
                      e.target.value,
                    ),
                  }),
                )
              }
            >
              {statusOptions.map(
                (status) => (
                  <option
                    key={status.value}
                    value={
                      status.value
                    }
                  >
                    {status.label}
                  </option>
                ),
              )}
            </select>

          </div>

          {/* =================================================
              ความเร่งด่วน
          ================================================= */}

          <div>

            <label
              htmlFor="priority"
              className={labelClass}
            >
              ความเร่งด่วน
            </label>

            <select
              id="priority"
              name="priority"
              className={inputClass}
              value={
                form.priority ?? 0
              }
              onChange={(e) =>
                setForm(
                  (prev: any) => ({
                    ...prev,
                    priority: Number(
                      e.target.value,
                    ),
                  }),
                )
              }
            >
              <option value={0}>
                ไม่ด่วน
              </option>

              <option value={1}>
                ด่วน
              </option>

              <option value={2}>
                คืนปกติ
              </option>

              <option value={3}>
                คืนด่วน
              </option>
            </select>

          </div>

        </div>

      </div>

      {/* =====================================================
          สรุปสถานะ
      ===================================================== */}

      <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">

        <div className="flex items-start gap-3">

          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">

            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              />

              <path d="M12 8v4" />

              <path d="M12 16h.01" />
            </svg>

          </div>

          <div>

            <p className="text-xs font-bold text-blue-700">
              ข้อมูลใบเสร็จ
            </p>

            <p className="mt-0.5 text-[10px] leading-5 text-blue-600/80">
              ตรวจสอบเลขเล่ม เลขที่ วันที่
              และสถานะก่อนกดบันทึกข้อมูล
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}