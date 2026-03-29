//src/page/person/PersonEditPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";

export default function PersonEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================
  const fetchPerson = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/person/${id}`);

      const data = res.data.data;

      // 🔥 แปลง date ให้ input ใช้ได้
      if (data.receiptDate) {
        data.receiptDate = new Date(data.receiptDate)
          .toISOString()
          .split("T")[0];
      }

      if (data.fingerprintDate) {
        data.fingerprintDate = new Date(data.fingerprintDate)
          .toISOString()
          .split("T")[0];
      }

      setForm(data);
    } catch (err) {
      Swal.fire("ผิดพลาด", "โหลดข้อมูลไม่สำเร็จ", "error");
      navigate("/person/status0");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  // ================= CHANGE =================
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    const confirm = await Swal.fire({
      title: "บันทึกข้อมูล?",
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.put(`/person/${id}`, form);

      await Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "แก้ไขเรียบร้อย",
        timer: 1200,
        showConfirmButton: false,
      });

      // 🔥 ไปหน้าที่ต้องการ
      navigate("/person/status0");
    } catch (err: any) {
      Swal.fire(
        "ผิดพลาด",
        err?.response?.data?.error || "บันทึกไม่สำเร็จ",
        "error"
      );
    }
  };

  if (loading) return <div className="p-4">กำลังโหลด...</div>;

  return (
    <div className="container mt-4">
      <h4 className="mb-3">✏️ แก้ไขข้อมูลบุคคล</h4>

      <div className="card p-4 shadow-sm">
        <div className="row g-3">

          <div className="col-md-2">
            <label>คำนำหน้า</label>
            <select
              name="prefix"
              className="form-control"
              value={form.prefix || ""}
              onChange={handleChange}
            >
              <option value="">เลือก</option>
              <option>นาย</option>
              <option>นาง</option>
              <option>นางสาว</option>
            </select>
          </div>

          <div className="col-md-5">
            <label>ชื่อ</label>
            <input
              name="firstName"
              className="form-control"
              value={form.firstName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-5">
            <label>นามสกุล</label>
            <input
              name="lastName"
              className="form-control"
              value={form.lastName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>เลขบัตรประชาชน</label>
            <input
              name="citizenId"
              className="form-control"
              value={form.citizenId || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>อาชีพ</label>
            <input
              name="occupation"
              className="form-control"
              value={form.occupation || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>เล่มใบเสร็จ</label>
            <input
              name="receiptBookNo"
              className="form-control"
              value={form.receiptBookNo || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>เลขที่ใบเสร็จ</label>
            <input
              name="receiptNo"
              className="form-control"
              value={form.receiptNo || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>วันที่ใบเสร็จ</label>
            <input
              type="date"
              name="receiptDate"
              className="form-control"
              value={form.receiptDate || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>วันที่พิมพ์ลายนิ้วมือ</label>
            <input
              type="date"
              name="fingerprintDate"
              className="form-control"
              value={form.fingerprintDate || ""}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="d-flex gap-2 mt-4">
          <button className="btn btn-success" onClick={handleSubmit}>
            บันทึก
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate("/person/status0")}
          >
            ย้อนกลับ
          </button>
        </div>
      </div>
    </div>
  );
}