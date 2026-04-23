// src/pages/PersonHistoryPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";
import { toast } from "../utils/toast";
import { generatePDF } from "../utils/generatePDF";

// ===== helper =====
const formatThaiDate = (value: any) => {
  if (!value) return "-";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;

  const months = [
    "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
    "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",
  ];

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
};

// ===== STATUS =====
const renderStatus = (status: number) => {
  switch (status) {
    case 0:
      return <span className="badge bg-warning text-dark">รอส่ง ศพฐ.</span>;
    case 1:
      return <span className="badge bg-primary">ส่ง ศพฐ. แล้ว</span>;
    case 2:
      return <span className="badge bg-success">รับจาก ศพฐ. แล้ว</span>;
    case 3:
      return <span className="badge bg-danger">ส่งคืนแล้ว</span>;
    default:
      return "-";
  }
};

// ===== PRIORITY =====
const renderPriority = (priority: number) => {
  return priority === 1
    ? <span className="badge bg-danger">ด่วน</span>
    : <span className="badge bg-secondary">ไม่ด่วน</span>;
};

// ===== STATUS BUTTON (แก้แล้ว) =====
const getStatusButton = (status: number) => {
  switch (status) {
    case 0:
      return { text: "ส่ง ศพฐ.", class: "btn-warning text-dark" };
    case 1:
      return { text: "รับผลจาก ศพฐ.", class: "btn-info text-dark" };
    case 2:
      return { text: "ส่งคืน", class: "btn-primary" };
    default:
      return null;
  }
};

export default function PersonHistoryPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status");

  const [persons, setPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [debounceFirstName, setDebounceFirstName] = useState("");
  const [debounceLastName, setDebounceLastName] = useState("");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1280);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const active = (value: string | null) =>
    statusParam === value ? "btn-dark" : "btn-outline-secondary";

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceFirstName(firstName);
      setDebounceLastName(lastName);
    }, 300);
    return () => clearTimeout(timer);
  }, [firstName, lastName]);

  // fetch
  const fetchPersons = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (statusParam !== null) params.append("status", statusParam);
      if (debounceFirstName) params.append("firstName", debounceFirstName);
      if (debounceLastName) params.append("lastName", debounceLastName);

      const res = await api.get(`/person/getall?${params.toString()}`);
      setPersons(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, [statusParam, debounceFirstName, debounceLastName]);

  // select
  const toggleSelect = (id: string, status: number) => {
    if (status >= 3) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const valid = persons.filter((p) => p.status < 3);
    setSelectedIds(
      selectedIds.length === valid.length
        ? []
        : valid.map((p) => p.personId)
    );
  };

  // actions
  const handleDelete = async (p: any) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการลบ?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/person/${p.personId}`);
      toast("success", "ลบเรียบร้อย");
      fetchPersons();
    } catch (err: any) {
      toast("error", "ลบไม่สำเร็จ", err?.response?.data?.error);
    }
  };

  const handleUpdateStatus = async (p: any) => {
    if (p.status === 3) return;

    const nextStatus = p.status + 1;

    const confirm = await Swal.fire({
      title: "ยืนยันการเปลี่ยนสถานะ?",
      text: `${p.status} → ${nextStatus}`,
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.patch(`/person/${p.personId}/status`, {
        status: nextStatus,
      });

      toast("success", "อัปเดตสถานะแล้ว");
      fetchPersons();
    } catch (err: any) {
      toast("error", "ไม่สำเร็จ", err?.response?.data?.error);
    }
  };

  const handleBulkSend = async () => {
    if (!selectMode) return toast("warning", "กรุณากดเลือกก่อน");
    if (selectedIds.length === 0) return toast("warning", "เลือกข้อมูลก่อน");

    const confirm = await Swal.fire({
      title: "ยืนยันการอัปเดตสถานะ?",
      text: `จำนวน ${selectedIds.length} รายการ`,
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      let success = 0;

      await Promise.all(
        selectedIds.map(async (id) => {
          const p = persons.find((x) => x.personId === id);
          if (!p || p.status >= 3) return;

          await api.patch(`/person/${id}/status`, {
            status: p.status + 1,
          });

          success++;
        })
      );

      setSelectedIds([]);
      setSelectMode(false);

      toast("success", `อัปเดตแล้ว ${success} รายการ`);
      fetchPersons();
    } catch (err: any) {
      toast("error", "อัปเดตไม่สำเร็จ", err?.response?.data?.error);
    }
  };

  const handleExportPDF = async (p: any) => {
    try {
      await generatePDF(p);
    } catch {
      toast("error", "สร้าง PDF ไม่สำเร็จ");
    }
  };

  return (
    <div className="p-4 main-content">
      <h2 className="mb-3 text-center">📄 ประวัติทั้งหมด</h2>

      {/* FILTER */}
      <div className="mb-3 d-flex gap-2 flex-wrap">
        <button className={`btn btn-sm ${active(null)}`} onClick={()=>setSearchParams({})}>ทั้งหมด</button>
        {[0,1,2,3].map(s=>(
          <button key={s}
            className={`btn btn-sm ${active(String(s))}`}
            onClick={()=>setSearchParams({status:String(s)})}>
            {renderStatus(s)}
          </button>
        ))}
      </div>

      {/* MOBILE */}
      {isMobile && (
        <div className="d-flex flex-column gap-3">
          {persons.map(p=>{
            const btn = getStatusButton(p.status);
            return (
              <div key={p.personId} className="card p-3">
                <strong>{p.fullName}</strong>
                {renderStatus(p.status)}

                {p.status<3 && btn && (
                  <button className={`btn mt-2 w-100 ${btn.class}`} onClick={()=>handleUpdateStatus(p)}>
                    {btn.text}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* DESKTOP */}
      {!isMobile && (
        <table className="table table-bordered text-center">
          <tbody>
            {persons.map(p=>{
              const btn = getStatusButton(p.status);
              return (
                <tr key={p.personId}>
                  <td>{p.fullName}</td>
                  <td>{renderStatus(p.status)}</td>
                  <td>
                    {p.status<3 && btn && (
                      <button className={`btn btn-sm ${btn.class}`} onClick={()=>handleUpdateStatus(p)}>
                        {btn.text}
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}