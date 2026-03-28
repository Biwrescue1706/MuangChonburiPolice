import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

export default function PersonStatus2Page() {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPersons = async () => {
    try {
      setLoading(true);
      const res = await api.get("/person/getall?status=2");
      setPersons(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleReturn = async (id: string) => {
    const confirm = await Swal.fire({
      title: "ส่งคืน?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await api.put(`/person/${id}`, { status: 3 });
    fetchPersons();
  };

  return (
    <div className="p-4" style={{ marginTop: 65 }}>
      <h4>✅ รายการรับจาก ศพฐ แล้ว</h4>

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
                    <span className="badge bg-success">
                      รับแล้ว
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => navigate(`/person/${p.personId}`)}
                    >
                      ดู
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleReturn(p.personId)}
                    >
                      ส่งคืน
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