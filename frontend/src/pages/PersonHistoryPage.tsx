import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

// แปลงวันที่ไทย
const formatThaiDate = (value: any) => {
  if (!value) return "-";

  const d = new Date(value);
  if (isNaN(d.getTime())) return value;

  const months = [
    "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน",
    "พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม",
    "กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"
  ];

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
};

// แสดงสถานะ
const renderStatus = (status: number) => {
  switch (status) {
    case 0:
      return <span className="badge bg-warning text-dark">รอส่ง ศพฐ.</span>;
    case 1:
      return <span className="badge bg-primary">ส่ง ศพฐ. แล้ว</span>;
    case 2:
      return <span className="badge bg-success">รับแล้วจาก ศพฐ. แล้ว </span>;
    case 3:
      return <span className="badge bg-danger">ส่งคืน หน่วยงาน</span>;
    default:
      return "-";
  }
};

export default function PersonHistoryPage() {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const isMobile = window.innerWidth < 1280;

  const fetchPersons = async () => {
    try {
      setLoading(true);
      const res = await api.get("/person/getall");
      setPersons(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div
      className="p-4"
    >
      <h4 className="mb-3">📄 ประวัติทั้งหมด</h4>

      {/* ================= MOBILE CARD ================= */}
      {isMobile && (
        <div className="d-flex flex-column gap-3">
          {loading && <div className="text-center">กำลังโหลด...</div>}

          {!loading && persons.length === 0 && (
            <div className="text-center">ไม่พบข้อมูล</div>
          )}

          {persons.map((p) => (
            <div key={p.personId} className="card shadow-sm p-3">
              <div className="fw-bold">{p.fullName}</div>

              <div className="small text-muted">
                เล่ม: {p.receiptBookNo || "-"} | เลข: {p.receiptNo || "-"}
              </div>

              <div className="small">
                วันที่: {formatThaiDate(p.receiptDate)}
              </div>

              <div className="mt-2">
                {renderStatus(p.status)}
              </div>

              <button
                className="btn btn-sm btn-info mt-2"
                onClick={() => navigate(`/person/${p.personId}`)}
              >
                ดูรายละเอียด
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= DESKTOP TABLE ================= */}
      {!isMobile && (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <table className="table table-bordered table-hover m-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>ชื่อ</th>
                  <th>เล่ม</th>
                  <th>เลข</th>
                  <th>วันที่</th>
                  <th>สถานะ</th>
                  <th>จัดการ</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={7} className="text-center">
                      กำลังโหลด...
                    </td>
                  </tr>
                )}

                {!loading && persons.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center">
                      ไม่พบข้อมูล
                    </td>
                  </tr>
                )}

                {!loading &&
                  persons.map((p, index) => (
                    <tr key={p.personId}>
                      <td>{index + 1}</td>
                      <td>{p.fullName}</td>
                      <td>{p.receiptBookNo || "-"}</td>
                      <td>{p.receiptNo || "-"}</td>
                      <td>{formatThaiDate(p.receiptDate)}</td>
                      <td>{renderStatus(p.status)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() =>
                            navigate(`/person/${p.personId}`)
                          }
                        >
                          ดู
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}