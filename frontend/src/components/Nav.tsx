import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Nav() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate("/");
  };

  const shortText = (text: string = "", max: number = 20): string => {
    return text.length > max ? text.substring(0, max) : text;
  };

  const isActive = (path: string): boolean => {
    return location.pathname.startsWith(path);
  };

  const go = (path: string): void => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ================= TOPBAR ================= */}
      <nav
        className="navbar navbar-dark fixed-top shadow-sm px-2 py-1"
        style={{
          backgroundColor: "#800020",
          zIndex: 1030,
          height: 48,
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {/* ปุ่มเปิด */}
        <button
          className="btn btn-warning btn-sm d-xl-none me-2 fw-bold"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>

        {/* CENTER */}
        <div className="d-flex align-items-center gap-2 mx-auto">
          <img src="/muangchonburi.webp" width={26} height={26} alt="logo" />
          <div>
            <div
              className="fw-bold text-warning"
              style={{ fontSize: "12px", lineHeight: 1.2 }}
            >
              🏠งานพิมพ์มือตรวจประวัติ
            </div>
            <div
              className="text-white"
              style={{ fontSize: "11px", lineHeight: 1.2 }}
            >
              งานนโยบายและแผน
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="text-end">
          <div
            className="text-warning fw-bold"
            style={{ fontSize: "12px", lineHeight: 1.2 }}
          >
            👤 {shortText(admin?.name || "", 10)}
          </div>
          <small
            className="text-white"
            style={{ fontSize: "11px", lineHeight: 1.2 }}
          >
            ({shortText(admin?.position || "", 10)})
          </small>
        </div>
      </nav>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <div
        className="d-none d-xl-flex flex-column position-fixed top-0 start-0 text-white shadow"
        style={{
          width: 210,
          height: "100vh",
          paddingTop: 50, // 🔥 ปรับตาม topbar ใหม่
          backgroundColor: "#800020",
          zIndex: 1020,
        }}
      >
        <div className="p-2 d-flex flex-column gap-2">
          <button
            className={`btn text-start ${
              isActive("/dashboard") ? "btn-warning fw-bold" : "btn-warning"
            }`}
            onClick={() => go("/dashboard")}
          >
            🏠 หน้าแรก
          </button>

          <button
            className="btn btn-warning text-start"
            onClick={() => go("/person/create")}
          >
            ➕ เพิ่มบุคคลตรวจ
          </button>

          <button
            className="btn btn-warning text-start"
            onClick={() => go("/person/history")}
          >
            📄 ประวัติ
          </button>

          <button
            className={`btn text-start ${
              isActive("/receipt") ? "btn-warning fw-bold" : "btn-warning"
            }`}
            onClick={() => go("/receipt")}
          >
            🧾 ใบเสร็จ
          </button>

          <button
            className="btn btn-warning text-start"
            onClick={() => go("/admin/create")}
          >
            ➕ Admin
          </button>

          <button
            className={`btn text-start ${
              isActive("/organization") ? "btn-warning fw-bold" : "btn-warning"
            }`}
            onClick={() => go("/organization")}
          >
            🏢 หน่วยงาน
          </button>

          <button
            className="btn btn-warning text-start"
            onClick={() => go("/profile")}
          >
            ⚙️ โปรไฟล์
          </button>

          <button className="btn btn-primary text-start" onClick={handleLogout}>
            🚪 ออก
          </button>
        </div>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      <>
        <div
          className="position-fixed text-white shadow"
          style={{
            width: "65%",
            maxWidth: 240,
            top: 0,
            left: 0,
            height: "100vh",
            backgroundColor: "#800020",
            zIndex: 1025,
            transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "0.3s",
          }}
        >
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <span className="fw-bold text-warning">เมนู</span>

            <button
              className="btn btn-light fw-bold"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="p-3 d-flex flex-column gap-2">
            <button className="btn btn-warning text-start" onClick={() => go("/dashboard")}>🏠 หน้าแรก</button>
            <button className="btn btn-warning text-start" onClick={() => go("/person/create")}>➕ เพิ่มบุคคลตรวจ</button>
            <button className="btn btn-warning text-start" onClick={() => go("/person/history")}>📄 ประวัติ</button>
            <button className="btn btn-warning text-start" onClick={() => go("/receipt")}>🧾 ใบเสร็จ</button>
            <button className="btn btn-warning text-start" onClick={() => go("/admin/create")}>➕ Admin</button>
            <button className="btn btn-warning text-start" onClick={() => go("/organization")}>🏢 หน่วยงาน</button>
            <button className="btn btn-warning text-start" onClick={() => go("/profile")}>⚙️ โปรไฟล์</button>
            <button className="btn btn-primary text-start" onClick={handleLogout}>🚪 ออก</button>
          </div>
        </div>

        {menuOpen && (
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
        )}
      </>

      {/* ================= CONTENT ================= */}
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}