import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function ResetPassword() {
  const nav = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  const [password, setPassword] = useState("");

  // ✅ กันเปิดตรงโดยไม่มี username
  useEffect(() => {
    if (!username) {
      nav("/");
    }
  }, [username, nav]);

  const reset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put("/auth/forgot/reset", {
        username,
        newPassword: password,
      });

      Swal.fire({
        icon: "success",
        title: "ตั้งรหัสใหม่สำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });

      nav("/");
    } catch {
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถเปลี่ยนรหัสได้",
      });
    }
  };

  return (
    <>
      {/* ================= TOP NAV ================= */}
      <nav
        className="navbar navbar-dark shadow position-fixed top-0 start-0 w-100"
        style={{
          backgroundColor: "#800020",
          height: 60,
          zIndex: 999,
        }}
      >
        <div className="container-fluid">
          {/* ===== BACK ===== */}
          <button className="btn btn-warning fw-bold" onClick={() => nav("/")}>
            ←
          </button>

          {/* ========= CENTER ========= */}
          <div className="position-absolute start-50 translate-middle-x text-center">
            <div className="d-flex align-items-center">
              <img
                src="/muangchonburi.webp"
                width={30}
                height={30}
                style={{ borderRadius: 1 }}
              />

              <div className="fw-bold text-warning small h5 mb-0">
                🏠 งานพิมพ์มือตรวจประวัติ
                <small className="text-white d-block small">
                  งานนโยบายและแผน
                </small>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= CONTENT ================= */}
      <div
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{
          background: "linear-gradient(135deg,#800020,#3b000d)",
          paddingTop: 60,
        }}
      >
        <div className="card shadow-lg border-0 p-4 col-11 col-md-4">
          <h4 className="fw-bold text-center mb-4">🔑 ตั้งรหัสผ่านใหม่</h4>

          <form onSubmit={reset}>
            <input
              type="password"
              className="form-control mb-4"
              placeholder="รหัสผ่านใหม่"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className="btn w-100 text-white fw-bold"
              style={{ background: "#800020" }}
            >
              บันทึกรหัสผ่าน
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
