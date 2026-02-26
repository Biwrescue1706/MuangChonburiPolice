import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function Nav() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div>
      {/* ================= TOP NAV ================= */}
      <nav
        className="navbar navbar-dark position-fixed top-0 start-0 w-100 px-3 shadow"
        style={{
          height: 60,
          backgroundColor: "#800020",
          zIndex: 2000,
        }}
      >
        {/* MOBILE MENU */}
        <button
          className="btn btn-warning d-xl-none me-3"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
        >
          ☰
        </button>

        {/* TITLE CENTER */}
        <div className="flex-grow-1 text-center">
          <div className="text-warning fw-bold">
            🏠 ระบบตรวจประวัติอาชญากรรม
          </div>
          <div className="text-white small">งานนโยบายและแผน</div>
        </div>

        {/* PROFILE */}
        <div className="dropdown">
          <div
            role="button"
            data-bs-toggle="dropdown"
            className="text-end"
            style={{ cursor: "pointer" }}
          >
            <div className="text-warning fw-bold small">👤 {admin?.name}</div>
            <small className="text-white">( {admin?.position} )</small>
          </div>

          <ul className="dropdown-menu dropdown-menu-end shadow width-auto">
            <li className="px-1 py-1 mx-2 border-bottom small">
              <strong>{admin?.name}</strong>
              <br />
              <span className="text-muted">( {admin?.position } )</span>
              <br />
              <span className="text-muted">@{admin?.username}</span>
            </li>

            <li>
              <button
                className="dropdown-item"
                onClick={() => navigate("/profile")}
              >
                ⚙️ โปรไฟล์
              </button>
            </li>

            <li>
              <button
                className="dropdown-item"
                onClick={() => navigate("/change-password")}
              >
                🔑 เปลี่ยนรหัสผ่าน
              </button>
            </li>

            <li>
              <hr />
            </li>

            <li>
              <button
                className="dropdown-item text-danger fw-bold"
                onClick={handleLogout}
              >
                🚪 ออกจากระบบ
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <div
        className="d-none d-xl-flex flex-column position-fixed text-white"
        style={{
          width: 220,
          top: 60,
          left: 0,
          height: "100vh",
          backgroundColor: "#800020",
          padding: 10,
          zIndex: 1500,
        }}
      >
        <button
          className="btn btn-warning text-start mb-2 fw-bold"
          onClick={() => navigate("/dashboard")}
        >
          🏠 Dashboard
        </button>

        <button
          className="btn btn-warning text-start mb-2 fw-bold"
          onClick={() => navigate("/person/create")}
        >
          ➕ เพิ่มบุคคลตรวจประวัติ
        </button>

        <button
          className="btn btn-warning text-start fw-bold"
          onClick={() => navigate("/person/history")}
        >
          📄 ประวัติคนตรวจ
        </button>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className="offcanvas offcanvas-start text-white"
        id="mobileSidebar"
        style={{ backgroundColor: "#800020", width: 240 }}
      >
        <div className="offcanvas-header">
          <h5 className="text-warning">เมนูระบบ</h5>
          <button
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          />
        </div>

        <div className="offcanvas-body d-flex flex-column gap-2">
          <button
            className="btn btn-warning text-start fw-bold"
            onClick={() => navigate("/dashboard")}
          >
            🏠 Dashboard
          </button>

          <button
            className="btn btn-warning text-start fw-bold"
            onClick={() => navigate("/person/create")}
          >
            ➕ เพิ่มบุคคลตรวจประวัติ
          </button>

          <button
            className="btn btn-warning text-start fw-bold"
            onClick={() => navigate("/person/history")}
          >
            📄 ประวัติคนตรวจ
          </button>
        </div>
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <main
        style={{
          marginTop: 60,
          marginLeft: 0,
          padding: 10,
          background: "#f4f6f9",
          minHeight: "100vh",
        }}
        className="ms-xl-0"
      >
        <Outlet />
      </main>
    </div>
  );
}
