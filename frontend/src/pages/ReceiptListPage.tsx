// src/pages/ReceiptListPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "../utils/toast";

interface Receipt {
  receiptId: string;
  receiptBookNo: string;
  receiptNo: string;
  fullName: string;
  money: number;
  createdAt: string;
  receiptDate?: string;
}

export default function ReceiptListPage() {
  const navigate = useNavigate();

  const [data, setData] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/receipt/all");
      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast("error", "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= SEARCH ================= */
  const filtered = data.filter((item) =>
    `${item.fullName} ${item.receiptNo} ${item.receiptBookNo}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  /* ================= SORT (ตาม receiptDate) ================= */
  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(a.receiptDate || a.createdAt).getTime();
    const dateB = new Date(b.receiptDate || b.createdAt).getTime();
    return dateB - dateA; // ล่าสุดขึ้นบน
  });

  /* ================= DATE ================= */
  const formatDate = (date: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div className="container-fluid py-4 main-content">
      <h2 className="fw-bold mb-4 text-center">🧾 รายการใบเสร็จ</h2>

      {/* SEARCH */}
      <div className="mb-3 d-flex justify-content-center">
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <div className="input-group">
            <span className="input-group-text">🔍</span>

            <input
              type="text"
              className="form-control"
              placeholder="ค้นหา ชื่อ / เลขที่ / เล่ม..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="btn btn-outline-secondary"
                onClick={() => setSearch("")}
              >
                ❌
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= TABLE (>=1200) ================= */}
      <div className="d-none d-xl-block">
        <div className="d-flex justify-content-center">
          <div style={{ width: "100%", maxWidth: "1000px" }}>
            <div className="card shadow-sm border-0">
              <div className="card-header bg-dark text-white fw-bold">
                📋 รายการทั้งหมด
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>ชื่อ</th>
                      <th>เล่มที่</th>
                      <th>เลขที่</th>
                      <th>วันที่</th>
                      <th className="text-center">ดู</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4">
                          ⏳ กำลังโหลด...
                        </td>
                      </tr>
                    ) : sorted.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-muted">
                          ไม่มีข้อมูล
                        </td>
                      </tr>
                    ) : (
                      sorted.map((item, index) => (
                        <tr key={item.receiptId}>
                          <td>{index + 1}</td>
                          <td className="fw-semibold">{item.fullName}</td>
                          <td>{item.receiptBookNo}</td>
                          <td>{item.receiptNo}</td>
                          <td>
                            {formatDate(
                              item.receiptDate || item.createdAt,
                            )}
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-primary px-3"
                              onClick={() =>
                                navigate(`/receipt/${item.receiptId}`)
                              }
                            >
                              ดู
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CARD (<1200) ================= */}
      <div className="d-block d-xl-none">
        {loading ? (
          <p className="text-center">⏳ กำลังโหลด...</p>
        ) : sorted.length === 0 ? (
          <p className="text-center text-muted">ไม่มีข้อมูล</p>
        ) : (
          sorted.map((item) => (
            <div key={item.receiptId} className="card shadow-sm mb-3 border-0">
              <div className="card-body">

                {/* ชื่อ */}
                <h5 className="fw-bold mb-3">{item.fullName}</h5>

                {/* ข้อมูลแบบมี label */}
                <div className="row small mb-2">
                  <div className="col-5 text-muted">📒 เล่มที่</div>
                  <div className="col-7 fw-semibold">{item.receiptBookNo}</div>
                </div>

                <div className="row small mb-2">
                  <div className="col-5 text-muted">🔢 เลขที่</div>
                  <div className="col-7 fw-semibold">{item.receiptNo}</div>
                </div>

                <div className="row small mb-3">
                  <div className="col-5 text-muted">📅 วันที่</div>
                  <div className="col-7 fw-semibold">
                    {formatDate(item.receiptDate || item.createdAt)}
                  </div>
                </div>

                {/* ปุ่ม */}
                <button
                  className="btn btn-primary w-100"
                  onClick={() => navigate(`/receipt/${item.receiptId}`)}
                >
                  ดูรายละเอียด
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}