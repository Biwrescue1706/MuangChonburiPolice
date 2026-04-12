// src/components/Nav.tsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Nav() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const shortText = (text?: string, max = 20) => {
    if (!text) return "";
    return text.length > max ? text.substring(0, max) : text;
  };

  const adminName = admin?.name || "";
  const adminPosition = admin?.position || "";

  const isActive = (path: string) => location.pathname.startsWith(path);

  const go = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ================= TOPBAR ================= */}
      <nav
        className="navbar navbar-dark fixed-top shadow-sm px-3"
        style={{ backgroundColor: "#800020", zIndex: 1030 }}
      >
        {/* LEFT */}
        <button
          className="btn btn-warning btn-sm d-xxl-none me-3 fw-bold"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>

        {/* CENTER */}
        <div className="d-flex align-items-center gap-2 mx-auto">
          <img
            src="/muangchonburi.webp"
            width={32}
            height={32}
            style={{ borderRadius: 8 }}
          />
          <div>
            <div className="fw-bold text-warning small">
              🏠งานพิมพ์มือตรวจประวัติ
            </div>
            <div className="text-white small">
              งานนโยบายและแผน
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="text-end">
          <div className="text-warning fw-bold small">
            👤 {shortText(adminName, 10)}
          </div>
          <small className="text-white">
            ({shortText(adminPosition, 10)})
          </small>
        </div>
      </nav>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <div
        className="d-none d-xxl-flex flex-column position-fixed top-0 start-0 text-white shadow"
        style={{
          width: 220,
          height: "100vh",
          paddingTop: 60,
          backgroundColor: "#800020",
          zIndex: 1020,
        }}
      >
        <div className="p-2 d-flex flex-column gap-2">

          <button
            className={`btn text-start ${isActive("/dashboard") ? "btn-warning fw-bold" : "btn-warning"}`}
            onClick={() => go("/dashboard")}
          >
            🏠 หน้าแรก
          </button>

          <button className="btn btn-warning text-start" onClick={() => go("/person/create")}>
            ➕ เพิ่มบุคคลตรวจประวัติ
          </button>

          <button className="btn btn-warning text-start" onClick={() => go("/person/history")}>
            📄 ประวัติคนตรวจ
          </button>

          <button
            className={`btn text-start ${isActive("/receipt") ? "btn-warning fw-bold" : "btn-warning"}`}
            onClick={() => go("/receipt")}
          >
            🧾 ใบเสร็จ
          </button>

          <button className="btn btn-warning text-start" onClick={() => go("/admin/create")}>
            ➕ เพิ่ม Admin
          </button>

          <button
            className={`btn text-start ${isActive("/organization") ? "btn-warning fw-bold" : "btn-warning"}`}
            onClick={() => go("/organization")}
          >
            🏢 หน่วยงาน
          </button>

          <button className="btn btn-warning text-start" onClick={() => go("/profile")}>
            ⚙️ โปรไฟล์
          </button>

          <button className="btn btn-primary text-start" onClick={handleLogout}>
            🚪 ออกจากระบบ
          </button>

        </div>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      {menuOpen && (
        <>
          <div
            className="position-fixed text-white p-3 shadow"
            style={{
              width: "65%",
              maxWidth: 240,
              top: 0,
              left: 0,
              height: "100vh",
              backgroundColor: "#800020",
              zIndex: 1025,
            }}
          >
            <button
              className="btn btn-warning btn-sm mb-3 fw-bold"
              onClick={() => setMenuOpen(false)}
            >
              ❌ ปิดเมนู
            </button>

            <div className="d-flex flex-column gap-2">

              <button className="btn btn-warning text-start" onClick={() => go("/dashboard")}>
                🏠 หน้าแรก
              </button>

              <button className="btn btn-warning text-start" onClick={() => go("/person/create")}>
                ➕ เพิ่มบุคคลตรวจประวัติ
              </button>

              <button className="btn btn-warning text-start" onClick={() => go("/person/history")}>
                📄 ประวัติคนตรวจ
              </button>

              <button className="btn btn-warning text-start" onClick={() => go("/receipt")}>
                🧾 ใบเสร็จ
              </button>

              <button className="btn btn-warning text-start" onClick={() => go("/admin/create")}>
                ➕ เพิ่ม Admin
              </button>

              <button className="btn btn-warning text-start" onClick={() => go("/organization")}>
                🏢 หน่วยงาน
              </button>

              <button className="btn btn-warning text-start" onClick={() => go("/profile")}>
                ⚙️ โปรไฟล์
              </button>

              <button className="btn btn-primary text-start" onClick={handleLogout}>
                🚪 ออกจากระบบ
              </button>

            </div>
          </div>

          {/* OVERLAY */}
          <div
            className="position-fixed w-100 h-100"
            style={{
              top: 0,
              left: 0,
              background: "rgba(0,0,0,.35)",
              zIndex: 1020,
            }}
            onClick={() => setMenuOpen(false)}
          />
        </>
      )}

      {/* ================= CONTENT ================= */}
      <div
        style={{
          minHeight: "100vh",
          paddingTop: 60,
        }}
      >
        <Outlet />
      </div>
    </>
  );
}