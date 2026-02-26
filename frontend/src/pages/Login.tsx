import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);
      nav("/");
    } catch (err: any) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      
      <div
        className="
          card shadow-lg border-0 p-4
          col-11
          col-sm-8
          col-md-6
          col-lg-4
          col-xl-3
        "
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold">Admin Login</h3>
          <p className="text-muted small">
            กรุณาเข้าสู่ระบบ
          </p>
        </div>

        <form onSubmit={submit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}