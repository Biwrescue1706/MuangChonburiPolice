// components/statusPerson/PersonTable.tsx
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

export default function PersonTable({
  persons,
  loading,
  selectedIds,
  selectMode,
  toggleSelect,
  toggleSelectAll,
  handleUpdateStatus,
  handleDelete,
}: any) {
  const navigate = useNavigate();

  return (
    <div className="card shadow-sm">
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              {selectMode && (
                <th>
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === persons.length &&
                      persons.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
              )}
              <th>#</th>
              <th>ชื่อ</th>
              <th>เล่ม</th>
              <th>เลขที่</th>
              <th>วันที่</th>
              <th>สถานะ</th>
              <th>ดู</th>
              <th>แก้ไข</th>
              <th>ลบ</th>
              <th>ส่ง</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={selectMode ? 11 : 10}>กำลังโหลด...</td>
              </tr>
            )}

            {!loading && persons.length === 0 && (
              <tr>
                <td colSpan={selectMode ? 11 : 10}>ไม่พบข้อมูล</td>
              </tr>
            )}

            {!loading &&
              persons.map((p: any, i: number) => (
                <tr key={p.personId}>
                  {selectMode && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(p.personId)}
                        onChange={() => toggleSelect(p.personId)}
                      />
                    </td>
                  )}

                  <td>{i + 1}</td>
                  <td>{p.fullName}</td>
                  <td>{p.receiptBookNo || "-"}</td>
                  <td>{p.receiptNo || "-"}</td>
                  <td>{formatThaiDate(p.receiptDate)}</td>

                  <td>
                    <span className="badge bg-warning text-dark">รอส่ง</span>
                  </td>

                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => navigate(`/person/${p.personId}`)}
                    >
                      ดู
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigate(`/person/edit/${p.personId}`)}
                    >
                      แก้ไข
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p)}
                    >
                      ลบ
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleUpdateStatus(p)}
                    >
                      ส่ง ศพฐ แล้ว
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
