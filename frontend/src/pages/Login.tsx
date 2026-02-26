import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const { login, admin } = useAuth();
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (admin) nav("/dashboard");
  }, [admin]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: err.response?.data?.error || "Login failed",
      });
    }
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg,#800020,#3b000d)",
      }}
    >
      <div className="card shadow-lg border-0 p-4 col-11 col-md-4">
        <div className="text-center mb-4">
          <img src="/muangchonburi.webp" height={70} className="mb-3" />

          <h4 className="fw-bold text-dark">งานพิมพ์มือตรวจประวัติ</h4>

          <small className="text-muted">งานนโยบายและแผน</small>
        </div>

        <form onSubmit={submit}>
          <input
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn w-100 text-white fw-bold"
            style={{ background: "#800020" }}
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <div className="text-center mt-3">
          <span
            role="button"
            className="fw-semibold"
            style={{ color: "#800020" }}
            onClick={() => nav("/forgot")}
          >
            ลืมรหัสผ่าน ?
          </span>
        </div>
      </div>
    </div>
  );
}
