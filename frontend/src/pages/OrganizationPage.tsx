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

// กันค่าว่าง
const isEmpty = (v: any) =>
  v === null || v === undefined || v === "";

// แสดง "-" ถ้าไม่มีค่า
const formatText = (v?: string) =>
  v && v.trim() !== "" ? v : "-";

// รวมชื่อ
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

  /* ================= RANK ================= */

  const baseRanks = [
    "ส.ต.ต.","ส.ต.ท.","ส.ต.อ.","จ.ส.ต.","ด.ต.",
    "ร.ต.ต.","ร.ต.ท.","ร.ต.อ.","พ.ต.ต.","พ.ต.ท.",
    "พ.ต.อ.","พล.ต.ต.","พล.ต.ท.","พล.ต.อ.",
  ];

  const rankOptions = baseRanks.flatMap(r => [r, `${r} หญิง`]);

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

  /* ================= DEBUG ================= */

  useEffect(() => {
    console.log("DATA:", data);
  }, [data]);

  useEffect(() => {
    console.log("FORM:", form);
  }, [form]);

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

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    if (isEmpty(form.organizationName)) {
      toast("error", "กรอกชื่อหน่วยงาน");
      return false;
    }
    return true;
  };

  /* ================= UPDATE ================= */

  const handleUpdate = async () => {
    if (!selected || !original) return;
    if (!validateForm()) return;

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

  /* ================= PREVIEW ================= */

  const previewMain = buildFullName(form.rank, form.firstName, form.lastName);
  const previewCommander = buildFullName(
    form.commanderRank,
    form.commanderFirstName,
    form.commanderLastName
  );
  const previewFinance = buildFullName(
    form.financeRank,
    form.financeFirstName,
    form.financeLastName
  );

  /* ================= COMPONENTS ================= */

  const Loading = () => <div className="text-center py-3">⏳ Loading...</div>;
  const Empty = () => <div className="text-center text-muted">ไม่มีข้อมูล</div>;

  /* ================= RETURN ================= */

  return (
    <div className="container py-4">

      <h4 className="fw-bold mb-3">🏢 หน่วยงาน</h4>

      {/* ================= TABLE ================= */}

      {!isMobile && (
        <div className="card shadow">
          <table className="table">
            <tbody>
              {loading ? (
                <tr><td><Loading /></td></tr>
              ) : data.length === 0 ? (
                <tr><td><Empty /></td></tr>
              ) : (
                data.map((i) => (
                  <tr key={i.organizationId}>
                    <td>{formatText(i.organizationName)}</td>
                    <td>{formatText(i.fullNameWithRank)}</td>
                    <td>{formatText(i.position)}</td>
                    <td>
                      <button onClick={() => handleEdit(i)}>✏️</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= MODAL ================= */}

      {selected && (
        <div className="modal d-block">
          <div className="modal-dialog modal-xl">
            <div className="modal-content p-4">

              <h5>✏️ แก้ไขข้อมูล</h5>

              {/* คนหลัก */}
              <h6>🧑 คนหลัก</h6>
              <input list="rank-list" value={form.rank} onChange={(e)=>setForm({...form, rank:e.target.value})}/>
              <input value={form.firstName} onChange={(e)=>setForm({...form, firstName:e.target.value})}/>
              <input value={form.lastName} onChange={(e)=>setForm({...form, lastName:e.target.value})}/>
              <div>Preview: {formatText(previewMain)}</div>

              {/* ผู้กำกับ */}
              <h6>👮 ผู้กำกับ</h6>
              <input list="rank-list" value={form.commanderRank} onChange={(e)=>setForm({...form, commanderRank:e.target.value})}/>
              <input value={form.commanderFirstName} onChange={(e)=>setForm({...form, commanderFirstName:e.target.value})}/>
              <input value={form.commanderLastName} onChange={(e)=>setForm({...form, commanderLastName:e.target.value})}/>
              <div>Preview: {formatText(previewCommander)}</div>

              {/* การเงิน */}
              <h6>💰 การเงิน</h6>
              <input list="rank-list" value={form.financeRank} onChange={(e)=>setForm({...form, financeRank:e.target.value})}/>
              <input value={form.financeFirstName} onChange={(e)=>setForm({...form, financeFirstName:e.target.value})}/>
              <input value={form.financeLastName} onChange={(e)=>setForm({...form, financeLastName:e.target.value})}/>
              <div>Preview: {formatText(previewFinance)}</div>

              <datalist id="rank-list">
                {rankOptions.map(r => <option key={r} value={r} />)}
              </datalist>

              <button onClick={handleUpdate}>💾 บันทึก</button>
              <button onClick={()=>setSelected(null)}>ปิด</button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}