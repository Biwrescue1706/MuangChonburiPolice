import { useEffect, useState } from "react";
import api from "../api/axios";

interface Person {
  personId: string;
  prefix: string;
  firstName: string;
  lastName: string;
  fullName: string;
  citizenId: string;
}

export default function PersonPage() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({
    prefix: "",
    firstName: "",
    lastName: "",
    fullName: "",
    citizenId: "",
    birthDate: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    nationality: "",
    ethnicity: "",
    weight: "",
    height: "",
    distinguishingMarks: "",
    address: "",
    occupation: "",
    workplaceAddress: "",
    father: "",
    mother: "",
    spouse: "-",
    purpose: "",
    requestingAgency: "",
    receiptBookNo: "",
    receiptNo: "",
    receiptDate: "",
    submittedDate: "",
    status: 0,
  });

  const fetchPersons = async () => {
    const res = await api.get("/person");
    setPersons(res.data.data);
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({});
    setEditingId(null);
  };

  const handleSubmit = async () => {
    try {
      let personId = editingId;

      if (editingId) {
        await api.put(`/person/${editingId}`, {
          ...form,
          weight: form.weight ? Number(form.weight) : null,
          height: form.height ? Number(form.height) : null,
        });
      } else {
        const res = await api.post("/person", {
          ...form,
          fullName:
            form.fullName ||
            `${form.prefix}${form.firstName} ${form.lastName}`,
        });
        personId = res.data.data.personId;
      }

      // ถ้ามีกรอกคำร้อง → สร้างคำร้อง
      if (form.purpose) {
        await api.post(`/person/${personId}/request`, {
          purpose: form.purpose,
          requestingAgency: form.requestingAgency,
          receiptBookNo: form.receiptBookNo,
          receiptNo: form.receiptNo,
          receiptDate: form.receiptDate || null,
          submittedDate: form.submittedDate || null,
          expireAt: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ),
          status: Number(form.status),
        });
      }

      alert("บันทึกสำเร็จ");
      resetForm();
      fetchPersons();
    } catch (err: any) {
      alert(err.response?.data?.error || "เกิดข้อผิดพลาด");
    }
  };

  const handleEdit = async (id: string) => {
    const res = await api.get(`/person/${id}`);
    setForm(res.data.data);
    setEditingId(id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("ยืนยันการลบ?")) return;
    await api.delete(`/person/${id}`);
    fetchPersons();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">จัดการประวัติบุคคล</h3>

      <div className="card p-4 shadow-sm mb-4">
        <div className="row g-2">

          <div className="col-md-2">
            <input name="prefix" placeholder="คำนำหน้า"
              className="form-control"
              value={form.prefix || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input name="firstName" placeholder="ชื่อ"
              className="form-control"
              value={form.firstName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input name="lastName" placeholder="นามสกุล"
              className="form-control"
              value={form.lastName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <input name="citizenId" placeholder="เลขบัตรประชาชน"
              className="form-control"
              value={form.citizenId || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <input type="date" name="birthDate"
              className="form-control"
              value={form.birthDate || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <input name="weight" placeholder="น้ำหนัก"
              className="form-control"
              value={form.weight || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <input name="height" placeholder="ส่วนสูง"
              className="form-control"
              value={form.height || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <input name="address" placeholder="ที่อยู่"
              className="form-control"
              value={form.address || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <input name="occupation" placeholder="อาชีพ"
              className="form-control"
              value={form.occupation || ""}
              onChange={handleChange}
            />
          </div>

          <hr className="mt-4" />

          <h5 className="mt-2">ข้อมูลคำร้อง</h5>

          <div className="col-md-6">
            <input name="purpose" placeholder="วัตถุประสงค์"
              className="form-control"
              value={form.purpose || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <input name="requestingAgency" placeholder="หน่วยงานที่ขอ"
              className="form-control"
              value={form.requestingAgency || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input name="receiptBookNo" placeholder="เล่มใบเสร็จ"
              className="form-control"
              value={form.receiptBookNo || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input name="receiptNo" placeholder="เลขใบเสร็จ"
              className="form-control"
              value={form.receiptNo || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input type="date" name="receiptDate"
              className="form-control"
              value={form.receiptDate || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input type="date" name="submittedDate"
              className="form-control"
              value={form.submittedDate || ""}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="mt-3">
          <button className="btn btn-danger me-2" onClick={handleSubmit}>
            {editingId ? "บันทึกการแก้ไข" : "เพิ่มข้อมูล"}
          </button>
          {editingId && (
            <button className="btn btn-secondary" onClick={resetForm}>
              ยกเลิก
            </button>
          )}
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ชื่อ</th>
            <th>เลขบัตร</th>
            <th style={{ width: "200px" }}>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((p) => (
            <tr key={p.personId}>
              <td>{p.prefix} {p.firstName} {p.lastName}</td>
              <td>{p.citizenId}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(p.personId)}
                >
                  แก้ไข
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p.personId)}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}