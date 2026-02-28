// src/pages/CreateAdmin.tsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function CreateAdmin() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [firstAdminId, setFirstAdminId] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [thaiTime, setThaiTime] = useState("");

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    position: "",
  });

  const isEdit = !!editing;
  const isTable = screenWidth > 1280;

  /* ================= CARD RESPONSIVE ================= */
  const getCardCol = () => {
    if (screenWidth < 480) return "col-6"; // 2 ใบ
    if (screenWidth < 768) return "col-3"; // 4 ใบ
    if (screenWidth < 1280) return "col-2"; // 6 ใบ
    return "col-2";
  };

  /* ================= SCREEN ================= */
  useEffect(() => {
    const resize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ================= THAI TIME ================= */
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setThaiTime(
        now.toLocaleString("th-TH", {
          timeZone: "Asia/Bangkok",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
      );
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ================= LOAD ADMINS ================= */
  const loadAdmins = async () => {
    const res = await api.get("/admin/getall");
    const data = res.data;

    // ✅ เรียง username ไทย + อังกฤษ + ตัวเลข
    const sorted = [...data].sort((a, b) =>
      (a.username || "").localeCompare(b.username || "", "th", {
        sensitivity: "base",
        numeric: true,
      }),
    );

    setAdmins(sorted);

    if (sorted.length) {
      const first = [...sorted].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )[0];

      setFirstAdminId(first.adminId);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  /* ================= CREATE ================= */
  const openCreate = () => {
    setEditing(null);
    setForm({
      username: "",
      password: "",
      name: "",
      position: "",
    });
    setShowModal(true);
  };

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SAVE ================= */
  const submit = async (e: any) => {
    e.preventDefault();

    try {
      if (isEdit) await api.put(`/admin/${editing.adminId}`, form);
      else await api.post("/admin/register", form);

      Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ",
        timer: 1200,
        showConfirmButton: false,
      });

      setShowModal(false);
      loadAdmins();
    } catch (err: any) {
      Swal.fire("ผิดพลาด", err.response?.data?.error || "", "error");
    }
  };

  /* ================= DELETE ================= */
  const removeAdmin = async (adminId: string) => {
    const confirm = await Swal.fire({
      title: "ลบ Admin ?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await api.delete(`/admin/${adminId}`);

    Swal.fire("ลบสำเร็จ", "", "success");
    loadAdmins();
  };

  return (
    <div className="main-content">
      {/* ===== HEADER ===== */}
      <div className="text-center mb-3 mt-4">
        <h1 className="fw-bold mb-2">👥 สมาชิกผู้ดูแลระบบ</h1>

        <h4 className="fw-semibold mb-4">{thaiTime} น.</h4>

        <button
          type="button"
          className="btn btn-danger btn-lg"
          style={{ background: "#ff0000" }}
          onClick={openCreate}
        >
          ➕ เพิ่ม Admin
        </button>
      </div>
      {/* ===== MAIN CARD ===== */}
      <div className="card shadow flex-grow-1 d-flex flex-column">
        <div className="card-body p-2">
          {/* ================= TABLE ================= */}
          {isTable && (
            <div className="responsive-table" style={{ overflowX: "auto" }}>
              <table
                className="table table-sm align-middle text-center"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>ชื่อ</th>
                    <th>ตำแหน่ง</th>
                    <th>ลบ</th>
                  </tr>
                </thead>

                <tbody>
                  {admins.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-muted py-4">
                        ไม่พบ Admin
                      </td>
                    </tr>
                  ) : (
                    admins.map((a, i) => (
                      <tr key={a.adminId}>
                        <td className="text-truncate" style={{ maxWidth: 200 }}>
                          {i + 1}
                        </td>

                        <td className="text-truncate" style={{ maxWidth: 200 }}>
                          {a.username}
                          {a.adminId === firstAdminId && (
                            <span className="badge bg-danger ms-2">SUPER</span>
                          )}
                        </td>
                        <td className="text-truncate" style={{ maxWidth: 250 }}>
                          {a.name || "-"}
                        </td>

                        <td className="text-truncate" style={{ maxWidth: 200 }}>
                          {a.position || "-"}
                        </td>

                        <td className="text-truncate" style={{ maxWidth: 200 }}>
                          {a.adminId !== firstAdminId && (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => removeAdmin(a.adminId)}
                            >
                              <i className="bi bi-trash-fill" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ================= CARD MODE ================= */}
          {!isTable && (
            <div className="row g-3">
              {admins.map((a) => (
                <div key={a.adminId} className={getCardCol()}>
                  <div className="card shadow h-100">
                    <div className="card-body text-center">
                      <h6 className="fw-bold">
                        {a.username}
                        {a.adminId === firstAdminId && (
                          <span className="badge bg-danger ms-2">SUPER</span>
                        )}
                      </h6>

                      <p className="mb-1">
                        <b>ชื่อ:</b> {a.name || "-"}
                      </p>

                      <p>
                        <b>ตำแหน่ง:</b> {a.position || "-"}
                      </p>

                      <div className="d-flex justify-content-center gap-2">
                        {a.adminId !== firstAdminId && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeAdmin(a.adminId)}
                          >
                            <i className="bi bi-trash-fill" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {showModal && (
          <>
            <div className="modal fade show d-block">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div
                    className="modal-header text-white"
                    style={{ background: "#800020" }}
                  >
                    <h5>{isEdit ? "แก้ไข Admin" : "เพิ่ม Admin"}</h5>

                    <button
                      className="btn-close btn-close-white"
                      onClick={() => setShowModal(false)}
                    />
                  </div>

                  <form onSubmit={submit}>
                    <div className="modal-body">
                      <input
                        name="username"
                        className="form-control mb-2"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                      />

                      {!isEdit && (
                        <input
                          type="password"
                          name="password"
                          className="form-control mb-2"
                          placeholder="Password"
                          value={form.password}
                          onChange={handleChange}
                          required
                        />
                      )}

                      <input
                        name="name"
                        className="form-control mb-2"
                        placeholder="ชื่อ"
                        value={form.name}
                        onChange={handleChange}
                      />

                      <input
                        name="position"
                        className="form-control"
                        placeholder="ตำแหน่ง"
                        value={form.position}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        ยกเลิก
                      </button>

                      <button
                        className="btn text-white"
                        style={{ background: "#800020" }}
                      >
                        บันทึก
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="modal-backdrop fade show" />
          </>
        )}
      </div>
    </div>
  );
}
