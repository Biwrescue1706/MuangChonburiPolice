// src/pages/OrganizationPage.tsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "../utils/toast";

interface Organization {
  organizationId: string;
  key: string;
  organizationName: string;
  rank?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  fullNameWithRank: string;
  position: string;
}

export default function OrganizationPage() {
  const [data, setData] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Organization | null>(null);

  const [form, setForm] = useState({
    organizationName: "",
    rank: "",
    firstName: "",
    lastName: "",
    position: "",
  });

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/organization");
      setData(res.data);
    } catch (err) {
      console.error(err);
      toast("error", "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= EDIT ================= */
  const handleEdit = (item: Organization) => {
    setSelected(item);
    setForm({
      organizationName: item.organizationName,
      rank: item.rank || "",
      firstName: item.firstName,
      lastName: item.lastName,
      position: item.position,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!selected) return;

    try {
      await api.patch(`/organization/${selected.organizationId}`, form);
      toast("success", "แก้ไขสำเร็จ");
      setSelected(null);
      fetchData();
    } catch (err) {
      console.error(err);
      toast("error", "แก้ไขไม่สำเร็จ");
    }
  };

  return (
    <div className="container-fluid py-4 px-3">
      <h3 className="fw-bold mb-4">🏢 จัดการหน่วยงาน</h3>

      {/* ================= FORM ================= */}
      {selected && (
        <div className="card shadow-sm mb-4 border-0">
          <div className="card-header bg-warning fw-bold">
            ✏️ แก้ไขข้อมูล
          </div>

          <div className="card-body row g-3">
            <div className="col-md-6">
              <label className="form-label">ชื่อหน่วยงาน</label>
              <input
                className="form-control"
                value={form.organizationName}
                onChange={(e) =>
                  setForm({ ...form, organizationName: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">ยศ</label>
              <input
                className="form-control"
                value={form.rank}
                onChange={(e) =>
                  setForm({ ...form, rank: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">ตำแหน่ง</label>
              <input
                className="form-control"
                value={form.position}
                onChange={(e) =>
                  setForm({ ...form, position: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">ชื่อ</label>
              <input
                className="form-control"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">นามสกุล</label>
              <input
                className="form-control"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
              />
            </div>

            <div className="col-12 d-flex gap-2">
              <button className="btn btn-success" onClick={handleUpdate}>
                💾 บันทึก
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setSelected(null)}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <div className="card shadow-sm border-0">
        <div className="card-header fw-bold bg-dark text-white">
          📋 รายการหน่วยงาน
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>หน่วยงาน</th>
                <th>ชื่อ</th>
                <th>ตำแหน่ง</th>
                <th className="text-center">จัดการ</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    ⏳ กำลังโหลด...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-muted">
                    ไม่มีข้อมูล
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.organizationId}>
                    <td className="fw-semibold">
                      {item.organizationName}
                    </td>
                    <td>{item.fullNameWithRank}</td>
                    <td>{item.position}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(item)}
                      >
                        ✏️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}