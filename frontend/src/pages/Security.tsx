import { useState } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";

type PasswordState = {
  oldPassword: string;
  newPassword: string;
};

export default function Security() {

  const [password, setPassword] = useState<PasswordState>({
    oldPassword: "",
    newPassword: "",
  });

  const changePassword = async () => {
    if (!password.oldPassword || !password.newPassword) {
      Swal.fire({
        icon: "warning",
        title: "กรอกข้อมูลให้ครบ",
      });
      return;
    }

    try {
      await api.put("/admin/change-password", password);

      Swal.fire({
        icon: "success",
        title: "เปลี่ยนรหัสผ่านสำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });

      setPassword({
        oldPassword: "",
        newPassword: "",
      });

    } catch {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านเดิมไม่ถูกต้อง",
      });
    }
  };

  return (
    <div className="container-fluid py-4">

      <h3 className="fw-bold mb-4">
        🔒 ความปลอดภัยบัญชี
      </h3>

      <div className="card shadow-sm border-0 col-lg-6">

        <div
          className="card-header text-white fw-bold"
          style={{ background: "#343a40" }}
        >
          เปลี่ยนรหัสผ่าน
        </div>

        <div className="card-body">

          <div className="mb-3">
            <label className="fw-semibold">
              รหัสผ่านเดิม
            </label>
            <input
              type="password"
              className="form-control"
              value={password.oldPassword}
              onChange={(e)=>
                setPassword({
                  ...password,
                  oldPassword:e.target.value
                })
              }
            />
          </div>

          <div className="mb-4">
            <label className="fw-semibold">
              รหัสผ่านใหม่
            </label>
            <input
              type="password"
              className="form-control"
              value={password.newPassword}
              onChange={(e)=>
                setPassword({
                  ...password,
                  newPassword:e.target.value
                })
              }
            />
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
  );
}