import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";

export default function PersonStatus0Page() {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================
  const fetchPersons = async () => {
    try {
      setLoading(true);
      const res = await api.get("/person/getall?status=0");
      setPersons(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  // ================= UPDATE STATUS =================
  const handleUpdateStatus = async (id: string) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการส่ง?",
      text: "ต้องการส่งไป ศพฐ ใช่หรือไม่",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.patch(`/person/${id}/status`, { status: 1 });

      await Swal.fire({
        icon: "success",
        title: "ส่งเรียบร้อย",
        timer: 1200,
        showConfirmButton: false,
      });

      fetchPersons(); // reload
    } catch (err) {
      Swal.fire("ผิดพลาด", "ไม่สามารถอัปเดตสถานะได้", "error");
    }
  };

  return (
    <div
      className="p-4"
      style={{
        marginTop: 65,
        marginLeft: window.innerWidth > 1280 ? 220 : 0,
      }}
    >
      <h4 className="mb-3">📌 รายการรอส่ง ศพฐ</h4>

      {/* ================= TABLE ================= */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-bordered table-hover m-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>ชื่อ-นามสกุล</th>
                <th>เล่มใบเสร็จ</th>
                <th>เลขที่ใบเสร็จ</th>
                <th>วันที่รับคำขอ</th>
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

                    <td>{p.receiptDate || "-"}</td>

                    {/* STATUS */}
                    <td>
                      <span className="badge bg-warning text-dark">
                        รอส่ง ศพฐ
                      </span>
                    </td>

                    {/* ACTION */}
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() =>
                            navigate(`/person/${p.personId}`)
                          }
                        >
                          ดู
                        </button>

                        <button
                          className="btn btn-sm btn-success"
                          onClick={() =>
                            handleUpdateStatus(p.personId)
                          }
                        >
                          ส่ง ศพฐ
                        </button>
                      </div>
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