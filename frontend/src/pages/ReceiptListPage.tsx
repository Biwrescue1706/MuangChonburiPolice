// src/pages/ReceiptListPage.tsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "../utils/toast";

interface Receipt {
  receiptId: string;
  receiptBookNo: string;
  receiptNo: string;
  fullName: string;
  money: number;
}

export default function ReceiptListPage() {
  const [data, setData] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="container-fluid py-4 px-3">
      <h3 className="fw-bold mb-4">🧾 รายการใบเสร็จ</h3>

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
                  <th>เล่ม</th>
                  <th>เลขที่</th>
                  <th>ชื่อ</th>
                  <th>จำนวนเงิน</th>
                  <th className="text-center">จัดการ</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      ⏳ กำลังโหลด...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-muted">
                      ไม่มีข้อมูล
                    </td>
                  </tr>
                ) : (
                  data.map((item, i) => (
                    <tr key={item.receiptId}>
                      <td>{i + 1}</td>
                      <td>{item.receiptBookNo}</td>
                      <td>{item.receiptNo}</td>
                      <td>{item.fullName}</td>
                      <td>{item.money}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() =>
                            (window.location.href = `/receipt/${item.receiptId}`)
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
        ) : data.length === 0 ? (
          <p className="text-center text-muted">ไม่มีข้อมูล</p>
        ) : (
          data.map((item) => (
            <div
              key={item.receiptId}
              className="card shadow-sm mb-3 border-0"
            >
              <div className="card-body">
                <h5 className="fw-bold mb-2">
                  {item.fullName}
                </h5>

                <p className="mb-1">
                  📒 เล่ม: {item.receiptBookNo}
                </p>
                <p className="mb-1">
                  🔢 เลขที่: {item.receiptNo}
                </p>
                <p className="mb-2">
                  💰 {item.money} บาท
                </p>

                <button
                  className="btn btn-primary w-100"
                  onClick={() =>
                    (window.location.href = `/receipt/${item.receiptId}`)
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
