// src/pages/OrganizationPage.tsx

import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "../utils/toast";

/* ================= TYPES ================= */

interface Organization {
  organizationId: string;
  organizationName: string;

  rank?: string;
  firstName: string;
  lastName: string;
  fullNameWithRank: string;
  position: string;

  commanderFullNameWithRank?: string;
  commanderPosition?: string;

  financeFullNameWithRank?: string;
  financePosition?: string;

  commanderRank?: string;
  commanderFirstName?: string;
  commanderLastName?: string;

  financeRank?: string;
  financeFirstName?: string;
  financeLastName?: string;
}

/* ================= HELPERS ================= */

const formatText = (v?: string) =>
  v && v.trim() !== "" ? v : "-";

const buildFullName = (rank?: string, first?: string, last?: string) =>
  `${rank || ""}${first || ""} ${last || ""}`.trim();

/* ================= COMPONENT ================= */

export default function OrganizationPage() {
  const [data, setData] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Organization | null>(null);

  const [form, setForm] = useState<any>({});
  const [original, setOriginal] = useState<any>(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  /* ================= RESPONSIVE ================= */

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= FETCH ================= */

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/organization");
      setData(res.data.data || res.data);
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
    const f = {
      organizationName: item.organizationName ?? "",
      rank: item.rank ?? "",
      firstName: item.firstName ?? "",
      lastName: item.lastName ?? "",
      position: item.position ?? "",

      commanderRank: item.commanderRank ?? "",
      commanderFirstName: item.commanderFirstName ?? "",
      commanderLastName: item.commanderLastName ?? "",
      commanderPosition: item.commanderPosition ?? "",

      financeRank: item.financeRank ?? "",
      financeFirstName: item.financeFirstName ?? "",
      financeLastName: item.financeLastName ?? "",
      financePosition: item.financePosition ?? "",
    };

    setSelected(item);
    setForm(f);
    setOriginal(f);
  };

  /* ================= UPDATE ================= */

  const handleUpdate = async () => {
    if (!selected || !original) return;

    const changed: any = {};

    Object.keys(form).forEach((k) => {
      if (form[k] !== original[k]) {
        changed[k] = form[k];
      }
    });

    if (Object.keys(changed).length === 0) {
      toast("info", "ไม่มีการเปลี่ยนแปลง");
      return;
    }

    try {
      await api.patch(`/organization/${selected.organizationId}`, changed);
      toast("success", "บันทึกสำเร็จ");
      setSelected(null);
      fetchData();
    } catch {
      toast("error", "บันทึกไม่สำเร็จ");
    }
  };

  /* ================= RETURN ================= */

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">🏢 หน่วยงาน</h4>

      {/* ================= DESKTOP ================= */}

      {!isMobile && (
        <>
          {/* ===== คนหลัก ===== */}
          <div className="card mb-4 shadow">
            <div className="card-header fw-bold">🧑 คนหลัก</div>
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>หน่วยงาน</th>
                  <th>ชื่อ</th>
                  <th>ตำแหน่ง</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4}>⏳</td>
                  </tr>
                ) : (
                  data.map((i) => (
                    <tr key={i.organizationId}>
                      <td>{i.organizationName}</td>
                      <td>{formatText(i.fullNameWithRank)}</td>
                      <td>{formatText(i.position)}</td>

                      {/* ✅ ปุ่มเดียว */}
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(i)}
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

          {/* ===== ผู้กำกับ ===== */}
          <div className="card mb-4 shadow">
            <div className="card-header fw-bold text-primary">
              👮 ผู้กำกับ
            </div>
            <table className="table mb-0">
              <tbody>
                {data.map((i) => (
                  <tr key={i.organizationId}>
                    <td>{i.organizationName}</td>
                    <td>{formatText(i.commanderFullNameWithRank)}</td>
                    <td>{formatText(i.commanderPosition)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== การเงิน ===== */}
          <div className="card mb-4 shadow">
            <div className="card-header fw-bold text-success">
              💰 การเงิน
            </div>
            <table className="table mb-0">
              <tbody>
                {data.map((i) => (
                  <tr key={i.organizationId}>
                    <td>{i.organizationName}</td>
                    <td>{formatText(i.financeFullNameWithRank)}</td>
                    <td>{formatText(i.financePosition)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ================= MOBILE ================= */}

      {isMobile && (
        <div className="row g-2">
          {data.map((i) => (
            <div className="col-12" key={i.organizationId}>
              <div className="card p-3 shadow-sm">

                <div className="fw-bold mb-2">
                  {i.organizationName}
                </div>

                {/* คนหลัก */}
                <div>
                  🧑 {formatText(i.fullNameWithRank)}
                </div>
                <small>{formatText(i.position)}</small>

                {/* ผู้กำกับ */}
                <div className="mt-2 text-primary">
                  👮 {formatText(i.commanderFullNameWithRank)}
                </div>

                {/* การเงิน */}
                <div className="mt-1 text-success">
                  💰 {formatText(i.financeFullNameWithRank)}
                </div>

                {/* ปุ่มเดียว */}
                <button
                  className="btn btn-warning btn-sm mt-3"
                  onClick={() => handleEdit(i)}
                >
                  ✏️ แก้ไข
                </button>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}

      {selected && (
        <>
          <div className="modal-backdrop fade show" />

          <div className="modal d-block">
            <div className="modal-dialog modal-xl">
              <div className="modal-content p-4">

                <h5 className="fw-bold mb-3">✏️ แก้ไขข้อมูล</h5>

                {/* คนหลัก */}
                <h6>🧑 คนหลัก</h6>
                <input
                  className="form-control mb-2"
                  value={form.rank}
                  onChange={(e)=>setForm({...form, rank:e.target.value})}
                />
                <input
                  className="form-control mb-2"
                  value={form.firstName}
                  onChange={(e)=>setForm({...form, firstName:e.target.value})}
                />
                <input
                  className="form-control mb-2"
                  value={form.lastName}
                  onChange={(e)=>setForm({...form, lastName:e.target.value})}
                />

                {/* ผู้กำกับ */}
                <h6 className="mt-3">👮 ผู้กำกับ</h6>
                <input
                  className="form-control mb-2"
                  value={form.commanderFirstName}
                  onChange={(e)=>setForm({...form, commanderFirstName:e.target.value})}
                />

                {/* การเงิน */}
                <h6 className="mt-3">💰 การเงิน</h6>
                <input
                  className="form-control mb-2"
                  value={form.financeFirstName}
                  onChange={(e)=>setForm({...form, financeFirstName:e.target.value})}
                />

                <div className="mt-3 text-end">
                  <button
                    className="btn btn-success me-2"
                    onClick={handleUpdate}
                  >
                    💾 บันทึก
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={()=>setSelected(null)}
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