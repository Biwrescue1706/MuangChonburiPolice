import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function ForgotCheck() {
  const [username, setUsername] = useState("");
  const nav = useNavigate();

  const checkUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/forgot/check", { username });

      Swal.fire({
        icon: "success",
        title: `พบผู้ใช้ ${res.data.admin.name}`,
        timer: 1500,
        showConfirmButton: false,
      });

      nav("/reset-password", { state: { username } });
    } catch {
      Swal.fire({
        icon: "error",
        title: "ไม่พบผู้ใช้งาน",
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
          {/* ===== BACK BUTTON ===== */}
          <button className="btn btn-warning fw-bold" onClick={() => nav("/")}>
            ← 
          </button>

          {/* ========= CENTER ========= */}
          <div
            className="position-absolute start-50 translate-middle-x text-center"
          >
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
          background: "#f4f6f9",
          paddingTop: 60,
        }}
      >
        <div className="card shadow border-0 p-4 col-11 col-md-4">
          <h4 className="fw-bold text-center mb-4" style={{ color: "#800020" }}>
            ตรวจสอบบัญชีผู้ใช้
          </h4>

          <form onSubmit={checkUser}>
            <input
              className="form-control mb-3"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <button
              className="btn text-white w-100 fw-bold"
              style={{ background: "#800020" }}
            >
              ตรวจสอบ
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
