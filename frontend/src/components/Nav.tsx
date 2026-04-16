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

  const shortText = (text, max = 20) => {
    if (!text) return "";
    return text.length > max ? text.substring(0, max) : text;
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const go = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      {/* TOPBAR */}
      <nav
        className="navbar navbar-dark fixed-top shadow-sm px-3"
        style={{ backgroundColor: "#800020", zIndex: 1030 }}
      >
        {/* mobile button */}
        <button
          className="btn btn-warning btn-sm d-xl-none me-3 fw-bold"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>

        {/* center */}
        <div className="d-flex align-items-center gap-2 mx-auto">
          <img src="/muangchonburi.webp" width={32} height={32} />
          <div>
            <div className="fw-bold text-warning small">
              🏠งานพิมพ์มือตรวจประวัติ
            </div>
            <div className="text-white small">งานนโยบายและแผน</div>
          </div>
        </div>

        {/* right */}
        <div className="text-end">
          <div className="text-warning fw-bold small">
            👤 {shortText(admin?.name, 10)}
          </div>
          <small className="text-white">
            ({shortText(admin?.position, 10)})
          </small>
        </div>
      </nav>

      {/* DESKTOP SIDEBAR */}
      <div
        className="d-none d-xl-flex flex-column position-fixed top-0 start-0 text-white shadow"
        style={{
          width: 210,
          height: "100vh",
          paddingTop: 60,
          backgroundColor: "#800020",
          zIndex: 1020,
        }}
      >
        <div className="p-2 d-flex flex-column gap-2">
          <button
            className="btn btn-warning text-start"
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
            className="btn btn-warning text-start"
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
            className="btn btn-warning text-start"
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

      {/* MOBILE SIDEBAR */}
      <>
        <div
          className={`position-fixed text-white p-3 shadow ${menuOpen ? "open" : ""}`}
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
          <button
            className="btn btn-warning mb-3"
            onClick={() => setMenuOpen(false)}
          >
            ❌ ปิด
          </button>

          <div className="d-flex flex-column gap-2">
            <button
              className="btn btn-warning text-start"
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
              className="btn btn-warning text-start"
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
              className="btn btn-warning text-start"
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
            <button
              className="btn btn-primary text-start"
              onClick={handleLogout}
            >
              🚪 ออก
            </button>
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

      {/* CONTENT */}
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}
