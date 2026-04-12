import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";
import { toast } from "../utils/toast";
import { generatePDF } from "../utils/generatePDF";

// ===== helper =====
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

const renderStatus = (status: number) => {
  switch (status) {
    case 0:
      return <span className="badge bg-warning text-dark">รอส่ง ศพฐ.</span>;
    case 1:
      return <span className="badge bg-primary">ส่ง ศพฐ. แล้ว</span>;
    case 2:
      return <span className="badge bg-success">รับจาก ศพฐ. แล้ว</span>;
    case 3:
      return <span className="badge bg-danger">ส่งคืนแล้ว</span>;
    default:
      return "-";
  }
};

const getStatusButton = (status: number) => {
  switch (status) {
    case 0:
      return "ส่ง ศพฐ.";
    case 1:
      return "รับผลจาก ศพฐ.";
    case 2:
      return "ส่งคืน";
    default:
      return null;
  }
};

export default function PersonHistoryPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status");

  const [persons, setPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const isMobile = window.innerWidth < 1280;

  const active = (value: string | null) =>
    statusParam === value ? "btn-dark" : "btn-outline-secondary";

  // ===== fetch =====
  const fetchPersons = async () => {
    try {
      setLoading(true);

      let url = "/person/getall";
      if (statusParam !== null) {
        url += `?status=${statusParam}`;
      }

      const res = await api.get(url);
      setPersons(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, [statusParam]);

  // ===== actions =====
  const handleDelete = async (p: any) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการลบ?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/person/${p.personId}`);
      toast("success", "ลบเรียบร้อย");
      fetchPersons();
    } catch (err: any) {
      toast("error", "ลบไม่สำเร็จ", err?.response?.data?.error);
    }
  };

  const handleUpdateStatus = async (p: any) => {
    if (p.status === 3) return;

    const nextStatus = p.status + 1;

    const confirm = await Swal.fire({
      title: "ยืนยันการเปลี่ยนสถานะ?",
      text: `${p.status} → ${nextStatus}`,
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.patch(`/person/${p.personId}/status`, {
        status: nextStatus,
      });

      toast("success", "อัปเดตสถานะแล้ว");
      fetchPersons();
    } catch (err: any) {
      toast("error", "ไม่สำเร็จ", err?.response?.data?.error);
    }
  };

  const handleExportPDF = async (p: any) => {
    try {
      await generatePDF(p);
    } catch {
      toast("error", "สร้าง PDF ไม่สำเร็จ");
    }
  };

  return (
    <div className="p-4">
      <h4 className="mb-3">📄 ประวัติทั้งหมด</h4>

      {/* ===== FILTER ===== */}
      <div className="mb-3 d-flex gap-2 flex-wrap">
        <button
          className={`btn btn-sm ${active(null)}`}
          onClick={() => setSearchParams({})}
        >
          ทั้งหมด
        </button>
        <button
          className={`btn btn-sm ${active("0")}`}
          onClick={() => setSearchParams({ status: "0" })}
        >
          รอส่ง
        </button>
        <button
          className={`btn btn-sm ${active("1")}`}
          onClick={() => setSearchParams({ status: "1" })}
        >
          ส่งแล้ว
        </button>
        <button
          className={`btn btn-sm ${active("2")}`}
          onClick={() => setSearchParams({ status: "2" })}
        >
          รับแล้ว
        </button>
        <button
          className={`btn btn-sm ${active("3")}`}
          onClick={() => setSearchParams({ status: "3" })}
        >
          ส่งคืน
        </button>
      </div>

      {/* ===== MOBILE ===== */}
      {isMobile && (
        <div className="d-flex flex-column gap-3">
          {loading && <div>กำลังโหลด...</div>}
          {!loading && persons.length === 0 && <div>ไม่พบข้อมูล</div>}

          {persons.map((p) => (
            <div key={p.personId} className="card p-3">
              <strong>{p.fullName}</strong>

              <div>📘 {p.receiptBookNo || "-"}</div>
              <div>🧾 {p.receiptNo || "-"}</div>
              <div>📅 {formatThaiDate(p.receiptDate)}</div>

              <div className="mt-2">{renderStatus(p.status)}</div>

              <div className="d-flex gap-2 mt-2 flex-wrap">
                <button
                  className="btn btn-info w-100"
                  onClick={() => navigate(`/person/${p.personId}`)}
                >
                  ดู
                </button>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleExportPDF(p)}
                >
                  PDF แบบพิมพ์มือ
                </button>

                {p.status === 0 && (
                  <button
                    className="btn btn-warning w-100"
                    onClick={() => navigate(`/person/edit/${p.personId}`)}
                  >
                    แก้ไข
                  </button>
                )}

                <button
                  className="btn btn-danger w-100"
                  onClick={() => handleDelete(p)}
                >
                  ลบ
                </button>
              </div>

              {p.status < 3 && (
                <button
                  className="btn btn-success mt-2 w-100"
                  onClick={() => handleUpdateStatus(p)}
                >
                  {getStatusButton(p.status)}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ===== DESKTOP ===== */}
      {!isMobile && (
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>ชื่อ</th>
                  <th>เล่ม</th>
                  <th>เลข</th>
                  <th>วันที่</th>
                  <th>สถานะ</th>
                  <th>ดู</th>
                  <th>แบบพิมพ์มือ</th>
                  <th>แก้ไข</th>
                  <th>ลบ</th>
                  <th>ส่ง</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={11}>กำลังโหลด...</td>
                  </tr>
                )}

                {!loading && persons.length === 0 && (
                  <tr>
                    <td colSpan={11}>ไม่พบข้อมูล</td>
                  </tr>
                )}

                {!loading &&
                  persons.map((p, i) => (
                    <tr key={p.personId}>
                      <td>{i + 1}</td>
                      <td>{p.fullName}</td>
                      <td>{p.receiptBookNo || "-"}</td>
                      <td>{p.receiptNo || "-"}</td>
                      <td>{formatThaiDate(p.receiptDate)}</td>
                      <td>{renderStatus(p.status)}</td>

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
                          className="btn btn-primary btn-sm"
                          onClick={() => handleExportPDF(p)}
                        >
                          PDF 
                        </button>
                      </td>

                      <td>
                        {p.status === 0 && (
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() =>
                              navigate(`/person/edit/${p.personId}`)
                            }
                          >
                            แก้ไข
                          </button>
                        )}
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
                        {p.status < 3 && (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleUpdateStatus(p)}
                          >
                            {getStatusButton(p.status)}
                          </button>
                        )}
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
