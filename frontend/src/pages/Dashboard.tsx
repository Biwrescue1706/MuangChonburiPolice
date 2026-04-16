import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { admin } = useAuth();
  const [thaiTime, setThaiTime] = useState("");

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

  return (
    <div className="p-4 main-content" >
      {/* CARD */}
      <div className="card shadow-sm border-0 p-3">
        <h3 className="fw-bold">หน้าหลัก (Dashboard)</h3>

        <h5 className="fw-semibold text-muted">{thaiTime}</h5>

        <div className="mt-3">
          <p className="mb-1">ยินดีต้อนรับ</p>
          <p className="fw-semibold mb-1">{admin?.name || "-"}</p>
          <p className="text-black mb-0">ตำแหน่ง : {admin?.position || "-"}</p>
        </div>
      </div>

      {/* MENU */}
      <div className="mt-4">
        <h4 className="fw-bold mb-3">เมนู</h4>

        <div className="d-flex gap-2">
          <Link to="/person/create" className="btn btn-primary">
            เพิ่มข้อมูลบุคคล
          </Link>

          <Link to="/person/history" className="btn btn-success">
            ดูข้อมูลประวัติบุคคล
          </Link>
        </div>
      </div>
    </div>
  );
}
