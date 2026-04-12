// src/pages/OrganizationPage.tsx

import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "../utils/toast";

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

    await api.patch(`/organization/${selected.organizationId}`, changed);
    toast("success", "บันทึกสำเร็จ");
    setSelected(null);
    fetchData();
  };

  /* ================= TABLE ================= */

  const renderMainTable = () => (
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
          {data.map((i) => (
            <tr key={i.organizationId}>
              <td>{i.organizationName}</td>
              <td>{i.fullNameWithRank}</td>
              <td>{i.position}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(i)}
                >
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCommanderTable = () => (
    <div className="card mb-4 shadow">
      <div className="card-header fw-bold text-primary">👮 ผู้กำกับ</div>
      <table className="table mb-0">
        <thead>
          <tr>
            <th>หน่วยงาน</th>
            <th>ชื่อ</th>
            <th>ตำแหน่ง</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i) => (
            <tr key={i.organizationId}>
              <td>{i.organizationName}</td>
              <td>{i.commanderFullNameWithRank || "-"}</td>
              <td>{i.commanderPosition || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFinanceTable = () => (
    <div className="card mb-4 shadow">
      <div className="card-header fw-bold text-success">💰 การเงิน</div>
      <table className="table mb-0">
        <thead>
          <tr>
            <th>หน่วยงาน</th>
            <th>ชื่อ</th>
            <th>ตำแหน่ง</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i) => (
            <tr key={i.organizationId}>
              <td>{i.organizationName}</td>
              <td>{i.financeFullNameWithRank || "-"}</td>
              <td>{i.financePosition || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  /* ================= CARD ================= */

  const renderCardSection = (
    title: string,
    color: string,
    render: (i: Organization) => JSX.Element
  ) => (
    <div className="mb-4">
      <h6 className={`fw-bold ${color}`}>{title}</h6>

      <div className="row g-2">
        {data.map((i) => (
          <div className="col-12" key={i.organizationId}>
            <div className="card p-3 shadow-sm">
              <div className="fw-bold">{i.organizationName}</div>
              {render(i)}

              <button
                className="btn btn-warning btn-sm mt-2"
                onClick={() => handleEdit(i)}
              >
                ✏️ แก้ไข
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">🏢 หน่วยงาน</h4>

      {/* DESKTOP */}
      {!isMobile && (
        <>
          {renderMainTable()}
          {renderCommanderTable()}
          {renderFinanceTable()}
        </>
      )}

      {/* MOBILE */}
      {isMobile && (
        <>
          {renderCardSection("🧑 คนหลัก", "", (i) => (
            <>
              <div>{i.fullNameWithRank}</div>
              <small>{i.position}</small>
            </>
          ))}

          {renderCardSection("👮 ผู้กำกับ", "text-primary", (i) => (
            <>
              <div>{i.commanderFullNameWithRank || "-"}</div>
              <small>{i.commanderPosition || "-"}</small>
            </>
          ))}

          {renderCardSection("💰 การเงิน", "text-success", (i) => (
            <>
              <div>{i.financeFullNameWithRank || "-"}</div>
              <small>{i.financePosition || "-"}</small>
            </>
          ))}
        </>
      )}

      {/* MODAL */}
      {selected && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3">

              <input
                className="form-control mb-2"
                value={form.organizationName}
                onChange={(e) =>
                  setForm({ ...form, organizationName: e.target.value })
                }
              />

              <button className="btn btn-success me-2" onClick={handleUpdate}>
                บันทึก
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setSelected(null)}
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}