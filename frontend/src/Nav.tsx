import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function Nav() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const shortText = (text?: string, max = 10) => {
    if (!text) return "";
    return text.length > max ? text.substring(0, max) + "" : text;
  };

  return (
    <div>
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
          {/* ========= LEFT ========= */}
          <div className="d-flex align-items-center mb-0">
            <button
              className="btn btn-warning d-xl-none"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileSidebar"
            >
              ☰
            </button>
          </div>

          {/* ========= CENTER ========= */}
          <div
            className="position-absolute start-50 translate-middle-x text-center"
            style={{ marginLeft: "-18px" }}
          >
            <div className="d-flex align-items-center">
              <img
                src="/muangchonburi.webp"
                width={30}
                height={30}
                style={{ borderRadius: 1 }}
              />
              <div className="lh-sm">
                <div className="fw-bold text-warning small text-truncate h5 mb-0 small">
                  🏠 งานพิมพ์มือตรวจประวัติ ฯ
                </div>

                <small className="text-white d-block h6 mb-0 small">
                  งานนโยบายและแผน
                </small>
              </div>
            </div>
          </div>

          {/* ========= RIGHT ========= */}
          <div className="dropdown ms-auto">
            <div
              role="button"
              data-bs-toggle="dropdown"
              className="text-end"
              style={{ cursor: "pointer" }}
            >
              <div className="text-warning fw-bold small">
                👤 {shortText(admin?.name, 10)}
              </div>

              <small className="text-white">
                ({shortText(admin?.position, 9)})
              </small>
            </div>

            <ul className="dropdown-menu dropdown-menu-end shadow">
              <li className="px-3 py-2 small">
                <strong>{admin?.name}</strong>
                <br />( {admin?.position} )
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
                  onClick={() => navigate("/security")}
                >
                  🔒 ความปลอดภัยบัญชี
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  🚪 ออกจากระบบ
                </button>
              </li>
            </ul>
          </div>
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
<button
  className="btn btn-warning text-start fw-bold"
  onClick={() => navigate("/admin/create")}
>
  ➕ เพิ่ม Admin
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
<button
            className="btn btn-warning text-start fw-bold"
            onClick={() => navigate("/admin/create")}
          >
            ➕ เพิ่ม Admin
          </button>
        </div>
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <main
        className="pt-3"
        style={{
          marginTop: 60,
          marginLeft: "0px",
          background: "#f4f6f9",
          minHeight: "100vh",
        }}
      >
        <div className="ms-xl-0 ms-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}