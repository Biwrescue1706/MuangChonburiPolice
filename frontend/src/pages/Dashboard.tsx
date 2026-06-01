// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const { admin } = useAuth();

  const [thaiTime, setThaiTime] = useState("");
  const [summary, setSummary] = useState({
    all: 0,
    s0: 0,
    s1: 0,
    s2: 0,
    s3: 0,
    s4: 0,
  });

  // ================= เวลาไทย =================
  useEffect(() => {
    const update = () => {
      const now = new Date();

      const dayName = now.toLocaleDateString("th-TH", {
        weekday: "long",
        timeZone: "Asia/Bangkok",
      });

      const date = now.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Bangkok",
      });

      const time = now
        .toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Bangkok",
        })
        .replace(/:/g, ".");

      setThaiTime(`${dayName} ที่ ${date} เวลา ${time} น.`);
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // ================= ดึงข้อมูล summary =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/person/getall");

        // 🔥 กันพลาดทุกรูปแบบ
        const raw = res.data;
        const list = Array.isArray(raw) ? raw : raw.data || [];

        const s0 = list.filter((p: any) => Number(p.status) === 0).length;
        const s1 = list.filter((p: any) => Number(p.status) === 1).length;
        const s2 = list.filter((p: any) => Number(p.status) === 2).length;
        const s3 = list.filter((p: any) => Number(p.status) === 3).length;
        const s4 = list.filter((p: any) => Number(p.status) === 4).length;

        setSummary({
          all: list.length,
          s0,
          s1,
          s2,
          s3,
          s4,
        });
      } catch (err) {
        console.error("โหลดข้อมูลไม่สำเร็จ:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 main-content text-center">
      {/* CARD */}
      <div className="card shadow-sm border-0 p-3">
        <h3 className="fw-bold">หน้าหลัก (Dashboard)</h3>

        <h4 className="fw-semibold text-danger">{thaiTime}</h4>

        <div className="mt-3">
          <p className="mb-1">ยินดีต้อนรับ</p>
          <p className="fw-semibold mb-1">{admin?.name || "-"}</p>
          <p className="text-black mb-0">ตำแหน่ง : {admin?.position || "-"}</p>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mt-4">
        <h4 className="fw-bold mb-3">สรุปสถานะข้อมูล</h4>

        <div className="row g-3">
          <div className="col-md-3">
            <Link
              to="/person/history"
              className="card p-3 shadow-sm text-decoration-none"
            >
              <h6 className="text-muted">ทั้งหมด</h6>
              <h3 className="fw-bold">{summary.all}</h3>
            </Link>
          </div>

          <div className="col-md-3">
            <Link
              to="/person/history?status=0"
              className="card p-3 shadow-sm text-decoration-none"
            >
              <h6 className="text-warning">รอส่ง ศพฐ</h6>
              <h3 className="fw-bold">{summary.s0}</h3>
            </Link>
          </div>

          <div className="col-md-3">
            <Link
              to="/person/history?status=1"
              className="card p-3 shadow-sm text-decoration-none"
            >
              <h6 className="text-primary">เตรียมเอกสารส่ง ศพฐ. แล้ว</h6>
              <h3 className="fw-bold">{summary.s1}</h3>
            </Link>
          </div>

          <div className="col-md-3">
            <Link
              to="/person/history?status=2"
              className="card p-3 shadow-sm text-decoration-none"
            >
              <h6 className="text-info">ส่ง ศพฐ แล้ว</h6>
              <h3 className="fw-bold">{summary.s2}</h3>
            </Link>
          </div>

          <div className="col-md-3">
            <Link
              to="/person/history?status=3"
              className="card p-3 shadow-sm text-decoration-none"
            >
              <h6 className="text-success">รับจาก ศพฐ แล้ว</h6>
              <h3 className="fw-bold">{summary.s3}</h3>
            </Link>
          </div>

          <div className="col-md-3">
            <Link
              to="/person/history?status=4"
              className="card p-3 shadow-sm text-decoration-none"
            >
              <h6 className="text-secondary">ส่งคืนต้นสังกัด</h6>
              <h3 className="fw-bold">{summary.s4}</h3>
            </Link>
          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="mt-4">
        <h4 className="fw-bold mb-3">เมนู</h4>

        <div className="d-flex gap-2 flex-wrap">
          <Link to="/person/create" className="btn btn-primary">
            เพิ่มข้อมูลบุคคล
          </Link>

          <Link to="/person/history" className="btn btn-success">
            ดูข้อมูลประวัติบุคคล
          </Link>

          <Link to="/receipt" className="btn btn-success">
            ดูข้อมูลใบเสร็จ
          </Link>
        </div>
      </div>
    </div>
  );
}
