import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { admin } = useAuth();

  return (
    <div className="p-4">
      <div className="card shadow-sm border-0 p-4">
        <h3 className="fw-bold mb-3">
          หน้าหลัก (Dashboard)
        </h3>

        <p>ยินดีต้อนรับ</p>

        <h5 className="text-primary">
          {admin?.name}
        </h5>

        <small className="text-muted">
          ตำแหน่ง : {admin?.position}
        </small>
      </div>
    </div>
  );
}