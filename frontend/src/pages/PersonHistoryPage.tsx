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

const renderStatus = (status: number) => {
  switch (status) {
    case 0: return <span className="badge bg-warning text-dark">รอส่ง ศพฐ.</span>;
    case 1: return <span className="badge bg-primary">ส่ง ศพฐ. แล้ว</span>;
    case 2: return <span className="badge bg-success">รับจาก ศพฐ. แล้ว</span>;
    case 3: return <span className="badge bg-danger">ส่งคืนแล้ว</span>;
    default: return "-";
  }
};

const renderPriority = (priority: number) => {
  return priority === 1
    ? <span className="badge bg-danger">ด่วน</span>
    : <span className="badge bg-secondary">ไม่ด่วน</span>;
};

const getStatusButton = (status: number) => {
  switch (status) {
    case 0: return "ส่ง ศพฐ.";
    case 1: return "รับผลจาก ศพฐ.";
    case 2: return "ส่งคืน";
    default: return null;
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

  const isMobile = window.innerWidth < 1280;

  const active = (value: string | null) =>
    statusParam === value ? "btn-dark" : "btn-outline-secondary";

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceFirstName(firstName);
      setDebounceLastName(lastName);
    }, 300);
    return () => clearTimeout(timer);
  }, [firstName, lastName]);

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

  const toggleSelect = (id: string, status: number) => {
    if (status >= 3) return;
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const valid = persons.filter(p => p.status < 3);
    setSelectedIds(
      selectedIds.length === valid.length
        ? []
        : valid.map(p => p.personId)
    );
  };

  const handleDelete = async (p: any) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการลบ?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirm.isConfirmed) return;

    await api.delete(`/person/${p.personId}`);
    toast("success", "ลบเรียบร้อย");
    fetchPersons();
  };

  const handleUpdateStatus = async (p: any) => {
    if (p.status === 3) return;

    const confirm = await Swal.fire({
      title: "ยืนยัน?",
      text: `${p.status} → ${p.status + 1}`,
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await api.patch(`/person/${p.personId}/status`, {
      status: p.status + 1,
    });

    toast("success", "อัปเดตแล้ว");
    fetchPersons();
  };

  const handleBulkSend = async () => {
    if (!selectMode || selectedIds.length === 0) return;

    const confirm = await Swal.fire({
      title: "ยืนยัน?",
      text: `${selectedIds.length} รายการ`,
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await Promise.all(
      selectedIds.map(async (id) => {
        const p = persons.find(x => x.personId === id);
        if (!p || p.status >= 3) return;

        await api.patch(`/person/${id}/status`, {
          status: p.status + 1,
        });
      })
    );

    setSelectedIds([]);
    setSelectMode(false);
    fetchPersons();
  };

  const handleExportPDF = async (p: any) => {
    await generatePDF(p);
  };

  return (
    <div className="p-4">
      <h4>📄 ประวัติทั้งหมด</h4>

      {/* SEARCH */}
      <div className="mb-3 d-flex gap-2">
        <input className="form-control" placeholder="ชื่อ"
          value={firstName} onChange={e => setFirstName(e.target.value)} />
        <input className="form-control" placeholder="นามสกุล"
          value={lastName} onChange={e => setLastName(e.target.value)} />
      </div>

      {/* MOBILE */}
      {isMobile && persons.map(p => (
        <div key={p.personId} className="card p-3 mb-2">

          {selectMode && p.status < 3 && (
            <input type="checkbox"
              checked={selectedIds.includes(p.personId)}
              onChange={() => toggleSelect(p.personId, p.status)} />
          )}

          <strong>{p.fullName}</strong>
          <div>{renderStatus(p.status)}</div>
          <div>{renderPriority(p.priority ?? 0)}</div>

          {p.status === 3 && (
            <div>📅 {formatThaiDate(p.returnDate)}</div>
          )}
        </div>
      ))}

      {/* DESKTOP */}
      {!isMobile && (
        <table className="table table-bordered">
          <thead>
            <tr>
              {selectMode && <th></th>}
              <th>#</th>
              <th>ชื่อ</th>
              <th>สถานะ</th>
              <th>ความเร่งด่วน</th>
              <th>วันคืน</th>
            </tr>
          </thead>

          <tbody>
            {persons.map((p, i) => (
              <tr key={p.personId}>
                {selectMode && (
                  <td>
                    {p.status < 3 && (
                      <input type="checkbox"
                        checked={selectedIds.includes(p.personId)}
                        onChange={() => toggleSelect(p.personId, p.status)} />
                    )}
                  </td>
                )}
                <td>{i + 1}</td>
                <td>{p.fullName}</td>
                <td>{renderStatus(p.status)}</td>
                <td>{renderPriority(p.priority ?? 0)}</td>
                <td>{p.status === 3 ? formatThaiDate(p.returnDate) : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}