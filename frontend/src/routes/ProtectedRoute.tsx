import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, loading } = useAuth();

  // ✅ Loading หมุนแบบกำลังดาวน์โหลด
  if (loading) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
        
        <div
          className="spinner-border text-primary mb-3"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        />

        <p className="text-muted fw-semibold">
          Loading system...
        </p>

      </div>
    );
  }

  // ✅ ยังไม่ login
  if (!admin) {
    return <Navigate to="/" replace />;
  }

  // ✅ login แล้ว
  return <>{children}</>;
}