// components/statusPerson/PersonCard.tsx
import { useNavigate } from "react-router-dom";

const formatThaiDate = (value: any) => {
  if (!value) return "-";

  const d = new Date(value);
  if (isNaN(d.getTime())) return value;

  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
};

export default function PersonCard({
  persons,
  loading,
  selectedIds,
  selectMode,
  toggleSelect,
  handleUpdateStatus,
  handleDelete,
}: any) {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column gap-3">
      {loading && <div>กำลังโหลด...</div>}

      {!loading && persons.length === 0 && <div>ไม่พบข้อมูล</div>}

      {!loading &&
        persons.map((p: any) => (
          <div key={p.personId} className="card p-3">
            {selectMode && (
              <input
                type="checkbox"
                checked={selectedIds.includes(p.personId)}
                onChange={() => toggleSelect(p.personId)}
              />
            )}

            <strong>{p.fullName}</strong>

            <div>📘 {p.receiptBookNo || "-"}</div>
            <div>🧾 {p.receiptNo || "-"}</div>
            <div>📅 {formatThaiDate(p.receiptDate)}</div>

            <div className="d-flex gap-2 mt-2">
              <button
                className="btn btn-info w-100"
                onClick={() => navigate(`/person/${p.personId}`)}
              >
                ดู
              </button>

              <button
                className="btn btn-warning w-100"
                onClick={() => navigate(`/person/edit/${p.personId}`)}
              >
                แก้ไข
              </button>

              <button
                className="btn btn-danger w-100"
                onClick={() => handleDelete(p)}
              >
                ลบ
              </button>
            </div>

            <button
              className="btn btn-success mt-2 w-100"
              onClick={() => handleUpdateStatus(p)}
            >
              ส่ง ศพฐ
            </button>
          </div>
        ))}
    </div>
  );
}
