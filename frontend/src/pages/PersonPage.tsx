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
  const [form, setForm] = useState<any>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPersons = async () => {
    try {
      setLoading(true);
      const res = await api.get("/person");
      setPersons(res.data.data);
    } catch (err) {
      console.error(err);
      alert("โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (!form.prefix || !form.firstName || !form.lastName || !form.citizenId) {
        return alert("กรอกข้อมูลให้ครบ");
      }

      if (editingId) {
        await api.put(`/person/${editingId}`, form);
      } else {
        await api.post("/person", form);
      }

      setForm({});
      setEditingId(null);
      fetchPersons();
    } catch (err: any) {
      alert(err.response?.data?.error || "เกิดข้อผิดพลาด");
    }
  };

  const handleEdit = (person: Person) => {
    setForm(person);
    setEditingId(person.personId);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("ยืนยันการลบ?")) return;

    try {
      await api.delete(`/person/${id}`);
      fetchPersons();
    } catch (err) {
      alert("ลบไม่สำเร็จ");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">จัดการประวัติบุคคล</h2>

      {/* FORM */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row g-2">
          <div className="col-md-2">
            <input
              className="form-control"
              name="prefix"
              placeholder="คำนำหน้า"
              value={form.prefix || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              name="firstName"
              placeholder="ชื่อ"
              value={form.firstName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              name="lastName"
              placeholder="นามสกุล"
              value={form.lastName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              name="citizenId"
              placeholder="เลขบัตรประชาชน"
              value={form.citizenId || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-3">
          <button
            className={`btn ${editingId ? "btn-warning" : "btn-primary"} me-2`}
            onClick={handleSubmit}
          >
            {editingId ? "บันทึกการแก้ไข" : "เพิ่มข้อมูล"}
          </button>

          {editingId && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                setForm({});
                setEditingId(null);
              }}
            >
              ยกเลิก
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>กำลังโหลด...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ชื่อ-สกุล</th>
                <th>เลขบัตรประชาชน</th>
                <th width="200">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((p) => (
                <tr key={p.personId}>
                  <td>
                    {p.prefix} {p.firstName} {p.lastName}
                  </td>
                  <td>{p.citizenId}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(p)}
                    >
                      แก้ไข
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(p.personId)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}

              {persons.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center">
                    ไม่พบข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}