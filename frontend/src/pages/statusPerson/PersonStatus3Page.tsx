import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

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

export default function PersonStatus3Page() {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPersons = async () => {
    try {
      setLoading(true);
      const res = await api.get("/person/getall?status=3");
      setPersons(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div className="p-4" style={{ marginTop: 65 }}>
      <h4>❌ รายการส่งคืน</h4>

      <div className="card mt-3">
        <div className="card-body p-0">
          <table className="table m-0">
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
                  <td colSpan={7} className="text-center">กำลังโหลด...</td>
                </tr>
              )}

              {!loading && persons.map((p, i) => (
                <tr key={p.personId}>
                  <td>{i + 1}</td>
                  <td>{p.fullName}</td>
                  <td>{p.receiptBookNo || "-"}</td>
                  <td>{p.receiptNo || "-"}</td>
                  <td>{formatThaiDate(p.receiptDate)}</td>

                  <td>
                    <span className="badge bg-danger">
                      ส่งคืน
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => navigate(`/person/${p.personId}`)}
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
    </div>
  );
}