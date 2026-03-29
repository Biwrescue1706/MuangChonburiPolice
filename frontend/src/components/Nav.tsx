// src/components/Nav.tsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Nav() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const shortText = (text?: string, max = 20) => {
    if (!text) return "";
    return text.length > max ? text.substring(0, max) + "" : text;
  };

  const adminName = admin ? admin.name : "";
  const adminPosition = admin ? admin.position : "";

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      {/* ================= TOPBAR ================= */}
      <div
        className="position-fixed top-0 start-0 w-100 d-flex align-items-center shadow px-3"
        style={{
          height: 60,
          backgroundColor: "#800020",
          zIndex: 1500,
        }}
      >
        {/* LEFT */}
        <button
          className="btn btn-warning btn-sm d-xxl-none me-3 fw-bold"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>

        {/* CENTER */}
        <div className="d-flex justify-content-center align-items-center gap-3 flex-grow-1">
          <img
            src="/muangchonburi.webp"
            width={30}
            height={30}
            style={{ borderRadius: 10 }}
          />

          <div className="text-start">
            <h6 className="fw-bold text-warning m-0 small">
              🏠งานพิมพ์มือตรวจประวัติ
            </h6>
            <h6 className="text-white m-0 small">งานนโยบายและแผน</h6>
          </div>
        </div>

        {/* RIGHT PROFILE */}
        <div className="position-relative">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="text-warning fw-bold small">
              👤 {shortText(adminName, 9)}
            </div>

            <small className="text-white">
              ( {shortText(adminPosition, 8)} )
            </small>
          </div>

          {profileOpen && (
            <div
              className="position-absolute end-0 mt-2 bg-white shadow p-3 rounded"
              style={{ minWidth: 220, zIndex: 3000 }}
            >
              <div className="border-bottom pb-1 mb-2 text-black small">
                <strong>{adminName}</strong>
                <br />
                <small className="text-black">( {adminPosition} )</small>
                <br />
              </div>

              <button
                className="btn btn-light w-100 text-start mb-2"
                onClick={() => {
                  setProfileOpen(false);
                  setMenuOpen(false);
                  navigate("/profile");
                }}
              >
                ⚙️ โปรไฟล์
              </button>

              <button
                className="btn btn-light w-100 text-start mb-2"
                onClick={() => {
                  setProfileOpen(false);
                  setMenuOpen(false);
                  navigate("/security");
                }}
              >
                🔒 ความปลอดภัยบัญชี
              </button>

              <button
                className="btn btn-light w-100 text-start"
                onClick={handleLogout}
              >
                🚪 ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <div
        className="d-none d-xxl-flex flex-column position-fixed top-0 start-0 text-white shadow"
        style={{
          width: 200,
          height: "100vh",
          paddingTop: 60,
          backgroundColor: "#800020",
          zIndex: 1400,
        }}
      >
        <div className="px-2 d-flex flex-column gap-2">
          <button
            className={`btn text-start ${
              isActive("/dashboard") ? "btn-warning fw-bold" : "btn-warning"
            }`}
            onClick={() => navigate("/dashboard")}
          >
            🏠 หน้าแรก
          </button>

          <button
            className="btn btn-warning text-start"
            onClick={() => navigate("/person/create")}
          >
            ➕ เพิ่มบุคคลตรวจประวัติ
          </button>

          <button
            className={`btn text-start ${
              isActive("/person/status0")
                ? "btn-warning fw-bold"
                : "btn-warning"
            }`}
            onClick={() => navigate("/person/status0")}
          >
            📌 รอส่ง ศพฐ
          </button>

          <button
            className={`btn text-start ${
              isActive("/person/status1")
                ? "btn-warning fw-bold"
                : "btn-warning"
            }`}
            onClick={() => navigate("/person/status1")}
          >
            📦 ส่งแล้ว
          </button>

          <button
            className={`btn text-start ${
              isActive("/person/status2")
                ? "btn-warning fw-bold"
                : "btn-warning"
            }`}
            onClick={() => navigate("/person/status2")}
          >
            ✅ รับแล้ว
          </button>

          <button
            className={`btn text-start ${
              isActive("/person/status3")
                ? "btn-warning fw-bold"
                : "btn-warning"
            }`}
            onClick={() => navigate("/person/status3")}
          >
            ❌ ส่งคืน
          </button>

          <button
            className="btn btn-warning text-start"
            onClick={() => navigate("/person/history")}
          >
            📄 ประวัติคนตรวจ
          </button>

          <button
            className="btn btn-warning text-start"
            onClick={() => navigate("/admin/create")}
          >
            ➕ เพิ่ม Admin
          </button>

          <button
            className={`btn text-start ${
              isActive("/organization") ? "btn-warning fw-bold" : "btn-warning"
            }`}
            onClick={() => navigate("/organization")}
          >
            🏢 หน่วยงาน
          </button>
        </div>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      {menuOpen && (
        <div
          className="position-fixed text-white p-3 shadow"
          style={{
            width: "60%",
            maxWidth: 220,
            top: 0,
            left: 0,
            height: "100vh",
            backgroundColor: "#800020",
            zIndex: 1500,
          }}
        >
          <button
            className="btn btn-warning btn-sm mb-3 fw-bold"
            onClick={() => setMenuOpen(false)}
          >
            ❌ ปิดเมนู
          </button>

          <div className="d-flex flex-column gap-2">
            <button
              className="btn btn-warning text-start"
              onClick={() => {
                navigate("/dashboard");
                setMenuOpen(false);
              }}
            >
              🏠 หน้าแรก
            </button>

            <button
              className="btn btn-warning text-start"
              onClick={() => {
                navigate("/person/create");
                setMenuOpen(false);
              }}
            >
              ➕ เพิ่มบุคคลตรวจประวัติ
            </button>

            <button
              className="btn btn-warning text-start"
              onClick={() => {
                navigate("/person/status0");
                setMenuOpen(false);
              }}
            >
              📌 รอส่ง ศพฐ
            </button>

            <button
              className="btn btn-warning text-start"
              onClick={() => {
                navigate("/person/status1");
                setMenuOpen(false);
              }}
            >
              📦 ส่งแล้ว
            </button>

            <button
              className="btn btn-warning text-start"
              onClick={() => {
                navigate("/person/status2");
                setMenuOpen(false);
              }}
            >
              ✅ รับแล้ว
            </button>

            <button
              className="btn btn-warning text-start"
              onClick={() => {
                navigate("/person/status3");
                setMenuOpen(false);
              }}
            >
              ❌ ส่งคืน
            </button>

            <button
              className="btn btn-warning text-start"
              onClick={() => {
                navigate("/person/history");
                setMenuOpen(false);
              }}
            >
              📄 ประวัติคนตรวจ
            </button>

            <button
              className="btn btn-warning text-start"
              onClick={() => {
                navigate("/admin/create");
                setMenuOpen(false);
              }}
            >
              ➕ เพิ่ม Admin
            </button>

            <button
              className="btn btn-warning text-start"
              onClick={() => {
                navigate("/organization");
                setMenuOpen(false);
              }}
            >
              🏢 หน่วยงาน
            </button>
          </div>
        </div>
      )}

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="position-fixed w-100 h-100"
          style={{
            top: 0,
            left: 0,
            background: "rgba(0,0,0,.35)",
            zIndex: 1400,
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className="main-content"
        style={{
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
