// src/pages/ReceiptDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "../utils/toast";

export default function ReceiptDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/receipt/${id}`);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
      toast("error", "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-5">⏳ กำลังโหลด...</p>;
  }

  if (!data) {
    return (
      <div className="text-center mt-5">
        <p>ไม่พบข้อมูล</p>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/receipt")}
        >
          ← กลับ
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white fw-bold d-flex justify-content-between">
          <span>🧾 รายละเอียดใบเสร็จ</span>
          <span>#{data.receiptNo}</span>
        </div>

        <div className="card-body">
          <div className="row g-3">

            <div className="col-md-6">
              <label className="text-muted">เลขเล่ม</label>
              <div className="fw-semibold">{data.receiptBookNo}</div>
            </div>

            <div className="col-md-6">
              <label className="text-muted">เลขที่</label>
              <div className="fw-semibold">{data.receiptNo}</div>
            </div>

            <div className="col-12">
              <label className="text-muted">ชื่อ-นามสกุล</label>
              <div className="fw-semibold">{data.fullName}</div>
            </div>

            <div className="col-md-6">
              <label className="text-muted">จำนวนเงิน</label>
              <div className="fw-semibold text-success">
                {data.money} บาท
              </div>
            </div>

            <div className="col-md-6">
              <label className="text-muted">จำนวนเงิน (ตัวหนังสือ)</label>
              <div className="fw-semibold">
                {data.moneyText || "-"}
              </div>
            </div>

          </div>

          {/* ACTION */}
          <div className="mt-4">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/receipt")}
            >
              ← กลับ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}