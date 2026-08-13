import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "../utils/toast";

export default function Login() {
  const { login, admin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (admin) {
      navigate("/dashboard");
    }
  }, [admin, navigate]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast("error", "กรุณากรอก Username และ Password");
      return;
    }

    try {
      setLoading(true);
      await login(username, password);
    } catch (err: any) {
      toast(
        "error",
        err?.response?.data?.error || "เข้าสู่ระบบไม่สำเร็จ"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(255, 255, 255, 0.10),
              transparent 30%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(255, 80, 120, 0.12),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #270008 0%,
              #500014 45%,
              #800020 100%
            );
        }

        .login-glow-1 {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.045);
          filter: blur(5px);
          top: -180px;
          left: -160px;
        }

        .login-glow-2 {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: rgba(255, 0, 70, 0.06);
          filter: blur(10px);
          bottom: -260px;
          right: -220px;
        }

        .login-card {
          width: 100%;
          max-width: 460px;
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.98);
          border-radius: 28px;
          padding: 42px 42px 34px;
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.35),
            0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .logo-wrapper {
          width: 112px;
          height: 112px;
          margin: 0 auto 20px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #eeeeee;
          box-shadow:
            0 10px 30px rgba(128, 0, 32, 0.16),
            0 0 0 8px rgba(128, 0, 32, 0.04);
        }

        .logo {
          width: 82px;
          height: 82px;
          object-fit: contain;
          display: block;
        }

        .system-title {
          margin: 0;
          text-align: center;
          color: #171717;
          font-size: 25px;
          line-height: 1.4;
          font-weight: 800;
        }

        .system-subtitle {
          margin: 7px 0 0;
          text-align: center;
          color: #777777;
          font-size: 14px;
        }

        .title-line {
          width: 55px;
          height: 4px;
          margin: 18px auto 30px;
          border-radius: 20px;
          background: linear-gradient(
            90deg,
            #800020,
            #b00035
          );
        }

        .welcome {
          margin-bottom: 24px;
        }

        .welcome-small {
          margin: 0 0 6px;
          color: #800020;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .welcome-title {
          margin: 0;
          color: #181818;
          font-size: 28px;
          line-height: 1.3;
          font-weight: 800;
        }

        .welcome-description {
          margin: 8px 0 0;
          color: #777777;
          font-size: 14px;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #333333;
          font-size: 14px;
          font-weight: 700;
        }

        .input-wrapper {
          position: relative;
          width: 100%;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: #9a9a9a;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-input {
          width: 100%;
          height: 52px;
          border: 1px solid #dedede;
          border-radius: 13px;
          background: #fafafa;
          color: #222222;
          font-size: 15px;
          padding: 0 16px 0 48px;
          outline: none;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .login-input::placeholder {
          color: #aaaaaa;
        }

        .login-input:focus {
          background: #ffffff;
          border-color: #800020;
          box-shadow: 0 0 0 4px rgba(128, 0, 32, 0.08);
        }

        .password-input {
          padding-right: 50px;
        }

        .password-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          border: 0;
          background: transparent;
          color: #888888;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }

        .password-toggle:hover {
          background: #f1f1f1;
          color: #800020;
        }

        .forgot-row {
          display: flex;
          justify-content: flex-end;
          margin: -2px 0 20px;
        }

        .forgot-button {
          border: 0;
          background: transparent;
          padding: 0;
          color: #800020;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .forgot-button:hover {
          text-decoration: underline;
        }

        .login-button {
          width: 100%;
          height: 53px;
          border: 0;
          border-radius: 13px;
          color: #ffffff;
          background: linear-gradient(
            135deg,
            #800020,
            #5c0017
          );
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          box-shadow:
            0 10px 20px rgba(128, 0, 32, 0.22);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            filter 0.2s ease;
        }

        .login-button:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
          box-shadow:
            0 14px 26px rgba(128, 0, 32, 0.28);
        }

        .login-button:active {
          transform: translateY(0);
        }

        .login-button:disabled {
          cursor: not-allowed;
          opacity: 0.7;
          transform: none;
        }

        .login-footer {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid #eeeeee;
          text-align: center;
        }

        .footer-text {
          margin: 0;
          color: #999999;
          font-size: 11px;
          line-height: 1.8;
        }

        .loading-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: login-spin 0.7s linear infinite;
        }

        @keyframes login-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 520px) {
          .login-page {
            padding: 16px;
          }

          .login-card {
            padding: 32px 22px 26px;
            border-radius: 23px;
          }

          .logo-wrapper {
            width: 92px;
            height: 92px;
            margin-bottom: 17px;
          }

          .logo {
            width: 68px;
            height: 68px;
          }

          .system-title {
            font-size: 21px;
          }

          .system-subtitle {
            font-size: 13px;
          }

          .welcome-title {
            font-size: 25px;
          }
        }

        @media (max-height: 700px) {
          .login-page {
            align-items: flex-start;
            padding-top: 20px;
            padding-bottom: 20px;
          }

          .login-card {
            padding-top: 26px;
            padding-bottom: 24px;
          }

          .logo-wrapper {
            width: 82px;
            height: 82px;
            margin-bottom: 12px;
          }

          .logo {
            width: 60px;
            height: 60px;
          }

          .title-line {
            margin-bottom: 20px;
          }
        }
      `}</style>

      <div className="login-page">
        <div className="login-glow-1" />
        <div className="login-glow-2" />

        <div className="login-card">

          {/* Logo */}
          <div className="logo-wrapper">
            <img
              src="/muangchonburi.webp"
              alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
              className="logo"
            />
          </div>

          {/* System Name */}
          <h1 className="system-title">
            งานพิมพ์มือตรวจประวัติ
          </h1>

          <p className="system-subtitle">
            งานนโยบายและแผน
          </p>

          <div className="title-line" />

          {/* Welcome */}
          <div className="welcome">
            <p className="welcome-small">
              Welcome Back
            </p>

            <h2 className="welcome-title">
              เข้าสู่ระบบ
            </h2>

            <p className="welcome-description">
              กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit}>

            {/* Username */}
            <div className="form-group">
              <label
                htmlFor="username"
                className="form-label"
              >
                Username
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M4.5 20c.7-3.2 3.3-5 7.5-5s6.8 1.8 7.5 5" />
                  </svg>
                </span>

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="กรอก Username"
                  autoComplete="username"
                  className="login-input"
                />

              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label
                htmlFor="password"
                className="form-label"
              >
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="4.5"
                      y="10"
                      width="15"
                      height="10"
                      rx="2"
                    />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรอก Password"
                  autoComplete="current-password"
                  className="login-input password-input"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "ซ่อนรหัสผ่าน"
                      : "แสดงรหัสผ่าน"
                  }
                >
                  {showPassword ? (
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c5 0 8.5 4 9.5 7-0.4 1.2-1.3 2.7-2.6 3.8" />
                      <path d="M6.3 6.3C4.8 7.4 3.7 9 2.5 12c1 3 4.5 7 9.5 7 1.3 0 2.5-.3 3.6-.8" />
                    </svg>
                  ) : (
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  )}
                </button>

              </div>
            </div>

            {/* Forgot Password */}
            <div className="forgot-row">
              <button
                type="button"
                className="forgot-button"
                onClick={() => navigate("/forgot")}
              >
                ลืมรหัสผ่าน?
              </button>
            </div>

            {/* Login */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner" />
                  กำลังเข้าสู่ระบบ...
                </>
              ) : (
                <>
                  เข้าสู่ระบบ

                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h13" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </>
              )}
            </button>

          </form>

          {/* Footer */}
          <div className="login-footer">
            <p className="footer-text">
              ระบบงานนโยบายและแผน
              <br />
              สถานีตำรวจภูธรเมืองชลบุรี
              <br />
              © 2569 งานพิมพ์มือตรวจประวัติ
            </p>
          </div>

        </div>
      </div>
    </>
  );
}