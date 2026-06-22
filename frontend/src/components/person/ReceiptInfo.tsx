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

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-success text-white">ข้อมูลใบเสร็จ</div>

      <div className="card-body row g-3">
        {/* เล่มที่ */}
        <div className="col-md-3">
          <label>เล่มที่</label>
          <input
            name="receiptBookNo"
            className="form-control"
            value={form.receiptBookNo || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* เลขที่ */}
        <div className="col-md-3">
          <label>เลขที่</label>
          <input
            list="receipt-list"
            name="receiptNo"
            className="form-control"
            value={form.receiptNo || ""}
            onChange={handleChange}
            placeholder="พิมพ์หรือเลือก"
          />

          <datalist id="receipt-list">
            {receiptNumbers.map((num: any) => {
              const formatted = String(num).padStart(2, "0");
              return <option key={formatted} value={formatted} />;
            })}
          </datalist>
        </div>

        {/* จำนวนเงิน */}
        <div className="col-md-3">
          <label>จำนวนเงิน</label>
          <input
            type="number"
            name="money"
            className="form-control"
            value={form.money}
            readOnly
          />
        </div>

        {/* ================= วันที่ ================= */}

        <div className="col-md-4">
          <label>วัน</label>
          <input
            list="receipt-day-list"
            name="receiptDay"
            className="form-control"
            value={form.receiptDay || ""}
            onChange={handleChange}
          />
          <datalist id="receipt-day-list">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d} />
            ))}
          </datalist>
        </div>

        <div className="col-md-4">
          <label>เดือน</label>
          <input
            list="receipt-month-list"
            name="receiptMonth"
            className="form-control"
            value={form.receiptMonth || ""}
            onChange={handleChange}
          />
          <datalist id="receipt-month-list">
            {months.map((m: any) => (
              <option key={m} value={m} />
            ))}
          </datalist>
        </div>

        <div className="col-md-4">
          <label>ปี</label>
          <input
            list="receipt-year-list"
            name="receiptYear"
            className="form-control"
            value={form.receiptYear || ""}
            onChange={handleChange}
          />
          <datalist id="receipt-year-list">
            {years.map((y: any) => (
              <option key={y} value={y} />
            ))}
          </datalist>
        </div>

        {/* ตัวอักษร */}
        <div className="col-md-3">
          <label>ตัวอักษร</label>
          <input
            name="moneyText"
            className="form-control"
            value={form.moneyText}
            readOnly
          />
        </div>

        {/* สถานะ */}
        <div className="col-md-4">
          <label>สถานะ</label>
          <select
            name="status"
            className="form-control"
            value={form.status}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                status: Number(e.target.value),
              }))
            }
          >
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* 🔥 ความเร่งด่วน */}
        <div className="col-md-4">
          <label>ความเร่งด่วน</label>
          <select
            name="priority"
            className="form-control"
            value={form.priority}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                priority: Number(e.target.value),
              }))
            }
          >
            <option value={0}>ไม่ด่วน</option>
            <option value={1}>ด่วน</option>
            <option value={2}>คืนปกติ</option>
            <option value={3}>คืนด่วน</option>
          </select>
        </div>
      </div>
    </div>
  );
}
