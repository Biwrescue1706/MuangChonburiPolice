// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { admin } = useAuth();

  const [thaiTime, setThaiTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setThaiTime(
        now.toLocaleString("th-TH", {
          timeZone: "Asia/Bangkok",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
      );
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="p-4 "
      style={{
        marginLeft: window.innerWidth > 1280 ? 200 : 0,
      }}
    >
      <div className="card shadow-sm border-0 p-4 mt-5">
        <h3 className="fw-bold mb-3">หน้าหลัก (Dashboard)</h3>

        <h4 className="fw-semibold mb-4">{thaiTime} น.</h4>

        <p>ยินดีต้อนรับ</p>

        <h5 className="text-primary">{admin?.name}</h5>

        <small className="text-muted">ตำแหน่ง : {admin?.position}</small>
      </div>
    </div>
  );
}
