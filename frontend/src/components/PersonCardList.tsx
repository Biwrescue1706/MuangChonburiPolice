//src/components/PersonCardList.tsx
import { useNavigate } from "react-router-dom";
import {
  formatThaiDate,
  renderStatus,
  renderPriority,
  getStatusButton,
  getStatusButtonStyle,
} from "../utils/personHelper";

export default function PersonCardList({
  persons,
  loading,
  selectMode,
  selectedIds,
  toggleSelect,
  handleDelete,
  handleUpdateStatus,
  handleExportPDF,
}: any) {
  const navigate = useNavigate();

  const sortedPersons = [...persons].sort((a, b) => {
    if (a.receiptBookNo !== b.receiptBookNo) {
      return (a.receiptBookNo || "").localeCompare(b.receiptBookNo || "");
    }
    return (a.receiptNo || "").localeCompare(b.receiptNo || "", undefined, {
      numeric: true,
    });
  });

  return (
    <div className="d-flex flex-column gap-3">
      {loading && <div>กำลังโหลด...</div>}
      {!loading && persons.length === 0 && <div>ไม่พบข้อมูล</div>}

      {sortedPersons.map((p: any) => (
        <div key={p.personId} className="card p-3">
          {selectMode && p.status < 3 && (
            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={selectedIds.includes(p.personId)}
                onChange={() => toggleSelect(p.personId, p.status)}
              />
            </div>
          )}

          <h5>
            <strong>{p.fullName}</strong>
          </h5>

          <div className="mt-1">
            ใบเสร็จรับเงิน
            <div className="mt-1">
              📘 เล่มใบเสร็จ : {p.receiptBookNo || "-"}
            </div>
            <div>🧾 เลขที่ : {p.receiptNo || "-"}</div>
            <div>📅 วันที่ พิมพ์มือ : {formatThaiDate(p.receiptDate)}</div>
          </div>

          <div className="mt-1 mb-1">
            <strong>เรื่องที่ขออนุญาต </strong> : {p.purpose || "-"}
          </div>

          <div className="mt-2">สถานะ : {renderStatus(p.status)}</div>

          <div className="mt-1">
            ความเร่งด่วน : {renderPriority(p.priority ?? 0)}
          </div>

          {p.status === 3 && (
            <div className="mt-1 text-danger">
              📅 วันคืน : {formatThaiDate(p.returnDate)}
            </div>
          )}

          <div className="d-flex gap-2 mt-2 flex-wrap">
            <button
              className="btn btn-info w-50"
              onClick={() => navigate(`/person/${p.personId}`)}
            >
              ดู
            </button>

            <button
              className="btn btn-primary w-50"
              onClick={() => handleExportPDF(p)}
            >
              PDF แบบพิมพ์มือ
            </button>

            {p.status < 3 && (
              <button
                className="btn btn-warning w-50"
                onClick={() => navigate(`/person/edit/${p.personId}`)}
              >
                ✏️
              </button>
            )}

            <button
              className="btn btn-danger w-50"
              onClick={() => handleDelete(p)}
            >
              🗑️
            </button>
          </div>

          {p.status < 3 && (
            <button
              className={`btn mt-2 w-50 ${getStatusButtonStyle(p.status)}`}
              onClick={() => handleUpdateStatus(p)}
            >
              {getStatusButton(p.status)}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}