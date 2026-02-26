import { useState } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function CreateAdmin() {

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    position: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      await api.post("/admin/register", form);

      Swal.fire({
        icon: "success",
        title: "เพิ่ม Admin สำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });

      setForm({
        username: "",
        password: "",
        name: "",
        position: "",
      });

    } catch (err: any) {

      Swal.fire({
        icon: "error",
        title:
          err.response?.data?.error ||
          "ไม่สามารถเพิ่มผู้ใช้ได้",
      });
    }
  };

  return (
    <div className="container-fluid p-4">

      <div className="card shadow border-0 col-lg-6">

        <div
          className="card-header text-white fw-bold"
          style={{ background: "#800020" }}
        >
          ➕ เพิ่มผู้ดูแลระบบ (Admin)
        </div>

        <div className="card-body">

          <form onSubmit={submit}>

            {/* Username */}
            <div className="mb-3">
              <label className="form-label">
                Username
              </label>
              <input
                name="username"
                className="form-control"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Name */}
            <div className="mb-3">
              <label className="form-label">
                ชื่อ - นามสกุล
              </label>
              <input
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* Position */}
            <div className="mb-4">
              <label className="form-label">
                ตำแหน่ง
              </label>
              <input
                name="position"
                className="form-control"
                value={form.position}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn text-white fw-bold w-100"
              style={{ background: "#800020" }}
            >
              บันทึก Admin
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}