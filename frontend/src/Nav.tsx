import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function Nav() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark shadow-sm">
      <div className="container-fluid px-3 px-xl-5">

        {/* SYSTEM NAME */}
        <Link
          to="/dashboard"
          className="navbar-brand fw-bold"
        >
          ระบบตรวจประวัติบุคคล
        </Link>

        {/* TOGGLE (<1280) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div
          className="collapse navbar-collapse"
          id="navbarMenu"
        >
          {/* LEFT MENU */}
          <ul className="navbar-nav me-auto gap-xl-3">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/person/create"
              >
                เพิ่มบุคคลตรวจประวัติ
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/person/history"
              >
                ประวัติคนตรวจ
              </Link>
            </li>

          </ul>

          {/* RIGHT SIDE */}
          <div
            className="
              d-flex
              flex-column
              flex-xl-row
              align-items-xl-center
              gap-2 gap-xl-3
              mt-3 mt-xl-0
            "
          >
            <span className="text-white small text-xl-nowrap">
              👤 {admin?.name} ({admin?.position})
            </span>

            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}