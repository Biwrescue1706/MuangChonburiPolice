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
      .includes(search.toLowerCase())
  );

  /* ================= SORT ================= */
  const sorted = [...filtered].sort((a, b) => {
    const bookA = Number(a.receiptBookNo);
    const bookB = Number(b.receiptBookNo);

    if (bookA !== bookB) return bookA - bookB;

    return Number(a.receiptNo) - Number(b.receiptNo);
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
    <div className="container-fluid py-4 px-3">
      <h3 className="fw-bold mb-4">🧾 รายการใบเสร็จ</h3>

      {/* SEARCH */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 ค้นหา ชื่อ / เลขที่ / เล่ม..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= TABLE (>=1280) ================= */}
      <div className="d-none d-xl-block">
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
                  <th>เล่ม</th>
                  <th>เลขที่</th>
                  <th>วันที่พิมพ์</th>
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
                      <td>{formatDate(item.createdAt)}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-primary"
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

      {/* ================= CARD (<1280) ================= */}
      <div className="d-block d-xl-none">
        {loading ? (
          <p className="text-center">⏳ กำลังโหลด...</p>
        ) : sorted.length === 0 ? (
          <p className="text-center text-muted">ไม่มีข้อมูล</p>
        ) : (
          sorted.map((item) => (
            <div
              key={item.receiptId}
              className="card shadow-sm mb-3 border-0"
            >
              <div className="card-body">
                <h5 className="fw-bold">{item.fullName}</h5>

                <p className="mb-1">📒 เล่ม : {item.receiptBookNo}</p>
                <p className="mb-1">🔢 เลขที่ : {item.receiptNo}</p>
                <p className="mb-1">📅 {formatDate(item.createdAt)}</p>
                <button
                  className="btn btn-primary w-50"
                  onClick={() =>
                    navigate(`/receipt/${item.receiptId}`)
                  }
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