import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "../../utils/toast";

export default function ReceiptDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [organization, setOrganization] = useState<any>(null);

  // ================= โหลดใบเสร็จ =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/receipt/${id}`);
        setData(res.data.data);
      } catch {
        toast("error", "โหลดข้อมูลไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // ================= โหลด organization =================
  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const res = await api.get(`/organization`);

        // 🔥 ตรงนี้คือจุดสำคัญ
        setOrganization(res.data[0]);

        // debug
        console.log("ORG:", res.data[0]);
      } catch {
        setOrganization(null);
      }
    };
    fetchOrg();
  }, []);

  if (loading) return <p className="text-center mt-5">⏳ กำลังโหลด...</p>;
  if (!data) return <p className="text-center mt-5">ไม่พบข้อมูล</p>;

  // ================= แยกวันที่ =================
  const splitDate = (dateStr: string) => {
    if (!dateStr) return { day: "-", month: "-", year: "-" };

    const parts = dateStr.split(" ");
    return {
      day: parts[0] || "-",
      month: parts[1] || "-",
      year: parts[2] || "-",
    };
  };

  const { day, month, year } = splitDate(data.receiptDate);

  return (
    <div className="container py-4 main-content">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/receipt")}
      >
        ← กลับ
      </button>

      <div
        style={{
          maxWidth: "750px",
          margin: "0 auto",
          padding: "24px",
          border: "2px solid black",
          background: "#e6f4f4",
          fontFamily: "TH Sarabun New, sans-serif",
          fontSize: "18px",
        }}
      >
        {/* HEADER */}
        <div className="text-center mb-1">(ต้นฉบับ)</div>

        <div className="d-flex justify-content-between mb-2">
          <div>เล่มที่ {data.receiptBookNo}</div>
          <div>เลขที่ {data.receiptNo}</div>
        </div>

        {/* LOGO */}
        <div className="text-center mb-2">
          <img src="/images.png" width={40} alt="logo" />
        </div>

        {/* TITLE */}
        <div className="text-center mb-3">
          <div className="fw-bold">ใบเสร็จรับเงิน</div>
          <div>ในราชการสำนักงานตำรวจแห่งชาติ</div>

          <div>
            ที่ทำการ{" "}
            <span
              style={{
                borderBottom: "1px dotted black",
                padding: "0 10px",
                display: "inline-block",
                minWidth: "250px",
                textAlign: "center",
              }}
            >
              {organization?.organizationName}
            </span>
          </div>
        </div>

        {/* วันที่ */}
        <div className="mb-3 text-center">
          วันที่{" "}
          <span style={{ borderBottom: "1px dotted black", padding: "0 10px" }}>
            {day}
          </span>{" "}
          เดือน{" "}
          <span style={{ borderBottom: "1px dotted black", padding: "0 20px" }}>
            {month}
          </span>{" "}
          พ.ศ.{" "}
          <span style={{ borderBottom: "1px dotted black", padding: "0 10px" }}>
            {year}
          </span>
        </div>

        {/* ผู้จ่าย */}
        <div className="mb-3 text-center">
          ได้รับเงินจาก{" "}
          <span
            style={{
              borderBottom: "1px dotted black",
              padding: "0 20px",
              display: "inline-block",
              minWidth: "250px",
              textAlign: "center",
            }}
          >
            {data.fullName}
          </span>
        </div>

        {/* ตาราง */}
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>รายการ</th>
              <th style={{ width: "120px" }}>จำนวนเงิน</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                ค่าธรรมเนียมการขอสำเนาข้อมูล <br />
                ข่าวสารของทางราชการสำหรับการ <br />
                ตรวจสอบประวัติอาชญากรรม
              </td>
              <td>{data.money}</td>
            </tr>
          </tbody>
        </table>

        {/* รวม */}
        <div className="text-end mb-2">
          รวม{" "}
          <span style={{ borderBottom: "1px dotted black", padding: "0 15px" }}>
            {data.money}
          </span>{" "}
          บาท
        </div>

        {/* ตัวอักษร */}
        <div className="mb-2">
          (ตัวอักษร{" "}
          <span style={{ borderBottom: "1px dotted black", padding: "0 15px" }}>
            {data.moneyText}
          </span>
          )
        </div>

        <div className="mb-4">ไว้เป็นหลักฐานในการรับเงินแล้ว</div>

        {/* ลายเซ็น */}
        <div
          style={{
            marginTop: "30px",
            textAlign: "right",
            paddingRight: "40px",
          }}
        >
          {/* ลงชื่อ */}
          <div style={{ marginBottom: "8px" }}>
            (ลงชื่อ)
            <span
              style={{
                display: "inline-block",
                borderBottom: "1px dotted black",
                minWidth: "180px",
                marginLeft: "10px",
                textAlign: "left",
              }}
            >
              {data.rank} <span style={{ marginLeft: "30px" }}>{organization?.firstName}</span> 
            </span>
          </div>

          {/* ชื่อเต็ม */}
          <div style={{ marginBottom: "5px" }}>
            (
            <span
              style={{
                display: "inline-block",
                borderBottom: "1px dotted black",
                minWidth: "120px",
                textAlign: "center",
              }}
            >
              {organization?.fullName} 
            </span>
            )  {" "}ผู้รับเงิน
          </div>

          {/* ตำแหน่ง */}
          <div>
            (ตำแหน่ง)
            <span
              style={{
                display: "inline-block",
                borderBottom: "1px dotted black",
                minWidth: "200px",
                marginLeft: "10px",
                textAlign: "center",
              }}
            >
              {organization?.position}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
