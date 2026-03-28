export default function ReceiptInfo({
  form,
  handleChange,
  receiptNumbers,
  setForm,
}: any) {
  const statusOptions = [
    { value: 0, label: "รอส่ง ศพฐ" },
    { value: 1, label: "ส่ง ศพฐ แล้ว" },
    { value: 2, label: "รับจาก ศพฐ แล้ว" },
    { value: 3, label: "ส่งคืน" },
  ];

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-success text-white">ข้อมูลใบเสร็จ</div>
      <div className="card-body row g-3">
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

        <div className="col-md-3">
          <label>ลงวันที่</label>
          <input
            type="date"
            placeholder="วว/ดด/ปปป"
            name="receiptDate"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label>ตัวอักษร</label>
          <input
            name="moneyText"
            className="form-control"
            value={form.moneyText}
            readOnly
          />
        </div>

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
      </div>
    </div>
  );
}
