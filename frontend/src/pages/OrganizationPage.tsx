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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1800);

  const [form, setForm] = useState({
    organizationName: "",
    rank: "",
    firstName: "",
    lastName: "",
    position: "",
  });

  const [original, setOriginal] = useState<any>(null);

  /* ================= RANK OPTIONS ================= */
  const baseRanks = [
    "ส.ต.ต.",
    "ส.ต.ท.",
    "ส.ต.อ.",
    "จ.ส.ต.",
    "ด.ต.",
    "ร.ต.ต.",
    "ร.ต.ท.",
    "ร.ต.อ.",
    "พ.ต.ต.",
    "พ.ต.ท.",
    "พ.ต.อ.",
    "พล.ต.ต.",
    "พล.ต.ท.",
    "พล.ต.อ.",
  ];

  const rankOptions = baseRanks.flatMap((r) => [r, `${r} หญิง`]);

  /* ================= RESPONSIVE ================= */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1800);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= LOCK SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
  }, [selected]);

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/organization");
      setData(res.data);
    } catch {
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
    const dataForm = {
      organizationName: item.organizationName ?? "",
      rank: item.rank ?? "",
      firstName: item.firstName ?? "",
      lastName: item.lastName ?? "",
      position: item.position ?? "",
    };

    setSelected(item);
    setForm(dataForm);
    setOriginal(dataForm);
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!selected || !original) return;

    const changedData: any = {};

    Object.keys(form).forEach((key) => {
      if (form[key as keyof typeof form] !== original[key]) {
        changedData[key] = form[key as keyof typeof form];
      }
    });

    if (Object.keys(changedData).length === 0) {
      toast("info", "ไม่มีการเปลี่ยนแปลง");
      return;
    }

    try {
      await api.patch(
        `/organization/${selected.organizationId}`,
        changedData
      );

      toast("success", "แก้ไขสำเร็จ");
      setSelected(null);
      fetchData();
    } catch {
      toast("error", "แก้ไขไม่สำเร็จ");
    }
  };

  return (
    <div className="container-fluid py-4 px-3">
      <h4 className="fw-bold mb-4">🏢 จัดการหน่วยงาน</h4>

      {/* ================= TABLE ================= */}
      {!isMobile && (
        <div className="card shadow border-0 rounded-4">
          <div className="card-header bg-dark text-white fw-semibold">
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
                          className="btn btn-warning btn-sm rounded-pill"
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
      )}

      {/* ================= CARD ================= */}
      {isMobile && (
        <div className="row g-3">
          {data.map((item) => (
            <div className="col-12" key={item.organizationId}>
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card-body">
                  <h6 className="fw-bold">
                    {item.organizationName}
                  </h6>
                  <div>{item.fullNameWithRank}</div>
                  <div className="text-muted small mb-2">
                    {item.position}
                  </div>

                  <button
                    className="btn btn-warning btn-sm w-100 rounded-pill"
                    onClick={() => handleEdit(item)}
                  >
                    ✏️ แก้ไข
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {selected && (
        <>
          {/* backdrop */}
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} />

          {/* modal */}
          <div
            key={selected.organizationId}
            className="modal fade show d-block"
            style={{ zIndex: 1050 }}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              style={{ marginTop: 80 }}
            >
              <div className="modal-content rounded-4 shadow-lg">
                <div className="modal-header bg-warning">
                  <h5 className="modal-title fw-bold">
                    ✏️ แก้ไขข้อมูล
                  </h5>
                  <button
                    className="btn-close"
                    onClick={() => setSelected(null)}
                  />
                </div>

                <div className="modal-body row g-3">
                  {/* หน่วยงาน */}
                  <div className="col-md-6">
                    <label className="form-label">ชื่อหน่วยงาน</label>
                    <input
                      className="form-control"
                      value={form.organizationName}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          organizationName: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* ยศ (combobox) */}
                  <div className="col-md-3">
                    <label className="form-label">ยศ</label>
                    <input
                      className="form-control"
                      list="rank-list"
                      placeholder="เลือกหรือพิมพ์..."
                      value={form.rank}
                      onChange={(e) =>
                        setForm({ ...form, rank: e.target.value })
                      }
                    />
                    <datalist id="rank-list">
                      {rankOptions.map((r) => (
                        <option key={r} value={r} />
                      ))}
                    </datalist>
                  </div>

                  {/* ตำแหน่ง */}
                  <div className="col-md-3">
                    <label className="form-label">ตำแหน่ง</label>
                    <input
                      className="form-control"
                      value={form.position}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          position: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* ชื่อ */}
                  <div className="col-md-6">
                    <label className="form-label">ชื่อ</label>
                    <input
                      className="form-control"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* นามสกุล */}
                  <div className="col-md-6">
                    <label className="form-label">นามสกุล</label>
                    <input
                      className="form-control"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-success rounded-pill px-4"
                    onClick={handleUpdate}
                  >
                    💾 บันทึก
                  </button>

                  <button
                    className="btn btn-outline-secondary rounded-pill px-4"
                    onClick={() => setSelected(null)}
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}