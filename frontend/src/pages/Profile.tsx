//src/pages/Profile.tsx
import { useEffect, useState } from "react";
import api from "../api/axios";

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

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  /* ================= LOAD PROFILE ================= */
  const loadProfile = async () => {
    try {
      const res = await api.get("/admin/me");
      setProfile(res.data);
    } catch {
      alert("โหลดข้อมูลไม่สำเร็จ");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  /* ================= SAVE PROFILE ================= */
  const handleSaveProfile = async () => {
    await api.put("/admin/me", profile);
  };

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    await api.put("/auth/change-password", password);
    setPassword({ oldPassword: "", newPassword: "" });
    setShowOld(false);
    setShowNew(false);
  };

  return (
    <div className="main-content">
      <div className="container py-4">
        <h3 className="fw-bold mb-4 text-center">👤 โปรไฟล์ผู้ใช้งาน</h3>

        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="card shadow-sm border-0 rounded-4">
              <div
                className="card-header text-white text-center fw-bold"
                style={{ background: "#800020" }}
              >
                ข้อมูลผู้ใช้งาน
              </div>

              <div className="card-body">
                <div className="mb-3">
                  <label className="fw-semibold">Username</label>
                  <div className="form-control bg-light">
                    {profile.username || "-"}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="fw-semibold">ชื่อ - นามสกุล</label>
                  <div className="form-control bg-light">
                    {profile.name || "-"}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="fw-semibold">ตำแหน่ง</label>
                  <div className="form-control bg-light">
                    {profile.position || "-"}
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary w-50"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                  >
                    🧑 แก้ไขข้อมูล
                  </button>

                  <button
                    className="btn btn-warning w-50"
                    data-bs-toggle="modal"
                    data-bs-target="#passwordModal"
                  >
                    🔒 เปลี่ยนรหัสผ่าน
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      <div className="modal fade" id="editModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">แก้ไขข้อมูล</h5>
              <button
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <input
                className="form-control mb-2"
                value={profile.username}
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />

              <input
                className="form-control"
                value={profile.position}
                onChange={(e) =>
                  setProfile({ ...profile, position: e.target.value })
                }
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                ยกเลิก
              </button>

              <button
                className="btn btn-success"
                onClick={handleSaveProfile}
                data-bs-dismiss="modal"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PASSWORD MODAL ================= */}
      <div className="modal fade" id="passwordModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-warning">
              <h5 className="modal-title">เปลี่ยนรหัสผ่าน</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              {/* OLD PASSWORD */}
              <div className="input-group mb-2">
                <input
                  type={showOld ? "text" : "password"}
                  className="form-control"
                  placeholder="รหัสเดิม"
                  value={password.oldPassword}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      oldPassword: e.target.value,
                    })
                  }
                />

                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowOld(!showOld)}
                >
                  {showOld ? "🙈" : "👁"}
                </button>
              </div>

              {/* NEW PASSWORD */}
              <div className="input-group">
                <input
                  type={showNew ? "text" : "password"}
                  className="form-control"
                  placeholder="รหัสใหม่"
                  value={password.newPassword}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      newPassword: e.target.value,
                    })
                  }
                />

                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                ยกเลิก
              </button>

              <button
                className="btn btn-warning"
                onClick={handleChangePassword}
                data-bs-dismiss="modal"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
