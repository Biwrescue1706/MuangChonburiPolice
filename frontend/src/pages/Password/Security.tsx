// src/pages/Password/Security.tsx
import { useState } from "react";
import api from "../../api/axios";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type PasswordState = {
  oldPassword: string;
  newPassword: string;
};

export default function Security() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState<PasswordState>({
    oldPassword: "",
    newPassword: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  /* ================= CHANGE PASSWORD ================= */
  const changePassword = async () => {
    if (!password.oldPassword || !password.newPassword) {
      Swal.fire({
        icon: "warning",
        title: "กรอกข้อมูลให้ครบ",
      });
      return;
    }

    if (password.oldPassword === password.newPassword) {
      Swal.fire({
        icon: "warning",
        title: "รหัสผ่านใหม่ต้องไม่เหมือนรหัสเดิม",
      });
      return;
    }

    if (password.newPassword.length <= 6) {
      Swal.fire({
        icon: "warning",
        title: "รหัสผ่านใหม่ต้องมากกว่า 6 ตัวอักษร",
      });
      return;
    }

    try {
      await api.put("/auth/change-password", password);

      await Swal.fire({
        icon: "success",
        title: "เปลี่ยนรหัสผ่านสำเร็จ",
        text: "กรุณาเข้าสู่ระบบใหม่",
        timer: 1500,
        showConfirmButton: false,
      });

      await logout();
      navigate("/", { replace: true });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: err.response?.data?.error || "เกิดข้อผิดพลาด",
      });
    }
  };

  return (
    <div className="main-content">
      <div className="container py-3">
        {/* TITLE */}
        <div className="mb-4">
          <h3 className="fw-bold">🔒 ความปลอดภัยบัญชี</h3>
          <small className="text-muted">
            เปลี่ยนรหัสผ่านเพื่อความปลอดภัยของบัญชี
          </small>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-sm border-0 rounded-4">
              <div
                className="card-header text-white fw-bold text-center"
                style={{ background: "#800020" }}
              >
                เปลี่ยนรหัสผ่าน
              </div>

              <div className="card-body">
                {/* OLD PASSWORD */}
                <div className="mb-4">
                  <label className="fw-semibold">รหัสผ่านเดิม</label>

                  <div className="input-group">
                    <input
                      type={showOld ? "text" : "password"}
                      className="form-control"
                      value={password.oldPassword}
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          oldPassword: e.target.value,
                        })
                      }
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowOld(!showOld)}
                    >
                      {showOld ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                {/* NEW PASSWORD */}
                <div className="mb-4">
                  <label className="fw-semibold">รหัสผ่านใหม่</label>

                  <div className="input-group">
                    <input
                      type={showNew ? "text" : "password"}
                      className="form-control"
                      value={password.newPassword}
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          newPassword: e.target.value,
                        })
                      }
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowNew(!showNew)}
                    >
                      {showNew ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                <button
                  className="btn btn-warning fw-bold w-100"
                  onClick={changePassword}
                >
                  เปลี่ยนรหัสผ่าน
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
