import Nav from "../Nav";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { admin } = useAuth();

  return (
    <>
      {/* Navbar */}
      <Nav />

      {/* Content */}
      <div className="container mt-4">

        <div className="card shadow-sm border-0 p-4">
          <h3 className="fw-bold mb-3">
            Dashboard
          </h3>

          <p className="mb-1">
            ยินดีต้อนรับ
          </p>

          <h5 className="text-primary">
            {admin?.name}
          </h5>

          <small className="text-muted">
            ตำแหน่ง : {admin?.position}
          </small>
        </div>

      </div>
    </>
  );
}