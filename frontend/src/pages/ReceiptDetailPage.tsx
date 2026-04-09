// src/pages/ReceiptDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { toast } from "../utils/toast";

export default function ReceiptDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const res = await api.get(`/receipt/${id}`);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
      toast("error", "โหลดข้อมูลไม่สำเร็จ");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!data) return <p className="text-center mt-4">⏳ กำลังโหลด...</p>;

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white fw-bold">
          🧾 รายละเอียดใบเสร็จ
        </div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <p><b>เลขเล่ม:</b> {data.receiptBookNo}</p>
            </div>

            <div className="col-md-6">
              <p><b>เลขที่:</b> {data.receiptNo}</p>
            </div>

            <div className="col-md-12">
              <p><b>ชื่อ:</b> {data.fullName}</p>
            </div>

            <div className="col-md-6">
              <p><b>จำนวนเงิน:</b> {data.money} บาท</p>
            </div>

            <div className="col-md-6">
              <p><b>ตัวหนังสือ:</b> {data.moneyText}</p>
            </div>
          </div>

          <div className="mt-3 d-flex gap-2">
            <button
              className="btn btn-secondary"
              onClick={() => window.history.back()}
            >
              ← ย้อนกลับ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
