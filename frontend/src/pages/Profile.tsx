import { useEffect, useState } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";

type AdminProfile = {
  username: string;
  name: string;
  position: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<AdminProfile>({
    username: "",
    name: "",
    position: "",
  });

  /* ================= LOAD PROFILE ================= */
  const loadProfile = async () => {
    try {
      const res = await api.get("/admin/me");
      setProfile(res.data);
    } catch {
      Swal.fire({
        icon: "error",
        title: "โหลดข้อมูลไม่สำเร็จ",
      });
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    try {
      await api.put("/admin/me", profile);

      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "อัปเดตไม่สำเร็จ",
      });
    }
  };

  return (
    <div className="main-content">
      <div className="container ">
        {/* ===== TITLE ===== */}
        <div className="mb-4">
          <h3 className="fw-bold">👤 โปรไฟล์ผู้ใช้งาน</h3>
          <small className="text-muted">
            จัดการข้อมูลส่วนตัวและความปลอดภัยบัญชี
          </small>
        </div>

        {/* ===== CENTER ===== */}
        <div className="row justify-content-center">
          <div
            className="
          col-12
          col-sm-10
          col-md-8
          col-lg-6
          col-xl-5
        "
          >
            <div className="card shadow-sm border-0 rounded-4">
              <div
                className="card-header text-white fw-bold text-center"
                style={{ backgroundColor: "#800020" }}
              >
                ข้อมูลส่วนตัว
              </div>

              <div className="card-body">
                {/* Username */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Username</label>
                  <input
                    className="form-control"
                    value={profile.username}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        username: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    ชื่อ - นามสกุล
                  </label>
                  <input
                    className="form-control"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Position */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">ตำแหน่ง</label>
                  <input
                    className="form-control"
                    value={profile.position}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        position: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="text-center">
                  <button
                    className="btn btn-success px-4"
                    onClick={handleUpdate}
                  >
                    💾 บันทึกข้อมูล
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
