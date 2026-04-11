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
  const [organization, setOrganization] = useState<any>(null);

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

  const fetchorganization = async () => {
    try {
      const res = await api.get(`/organization/key/MAIN`);
      setOrganization(res.data.data);
    } catch (err) {
      console.error(err);
      toast("error", "โหลดข้อมูลหน่วยงานไม่สำเร็จ");
      setOrganization(null);
    }
  };

  useEffect(() => {
    fetchorganization();
  }, []);

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
        {/* ACTION */}
        <div className="mb-4">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/receipt")}
          >
            ← กลับ
          </button>
        </div>
        <div className="card-header bg-primary text-white fw-bold d-flex justify-content-between">
          <span>🧾 รายละเอียดใบเสร็จ</span>
          <span></span>
          <span>
            #{data.receiptBookNo} - {data.receiptNo}
          </span>
        </div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6 text-center">
              <label className="text-muted">เลขเล่ม</label>
              <div className="fw-semibold">{data.receiptBookNo}</div>
            </div>

            <div className="col-md-6 text-center">
              <label className="text-muted">เลขที่</label>
              <div className="fw-semibold">{data.receiptNo}</div>
            </div>
            <div></div>
            <div className="col-md-12 text-center">
              <div className="fw-semibold">{data.organizationName}</div>
            </div>

            <div className="col-md-12 text-center">
              <div className="fw-semibold">{data.receiptDate}</div>
            </div>

            <div className="col-12 text-center">
              <div className="fw-semibold">{data.fullName}</div>
            </div>

            <div className="col-md-8 text-end">
              <div className="fw-semibold text-success">{data.money}</div>
            </div>

            <div className="col-md-12 ">
              <div className="fw-semibold">( {data.moneyText || "-"} )</div>
            </div>
            <div className="col-md-6">
              <div className="fw-semibold">{data.rank}</div>
            </div>
            <div className="col-md-6">
              <div className="fw-semibold">{organization?.firstName}</div>
            </div>
            <div className="col-md-12">
              <div className="fw-semibold">( {data.fullNameOrg} )</div>
            </div>
            <div className="col-md-12">
              <div className="fw-semibold">({data.position})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
