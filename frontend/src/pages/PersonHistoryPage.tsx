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
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
};

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

const renderPriority = (priority: number) => {
  return priority === 1 ? (
    <span className="badge bg-danger">ด่วน</span>
  ) : (
    <span className="badge bg-secondary">ไม่ด่วน</span>
  );
};

const getStatusButtonStyle = (status: number) => {
  switch (status) {
    case 0:
      return "btn-warning text-dark";
    case 1:
      return "btn-info text-dark";
    case 2:
      return "btn-primary";
    default:
      return "btn-secondary";
  }
};

const getStatusButton = (status: number) => {
  switch (status) {
    case 0:
      return "ส่ง ศพฐ.";
    case 1:
      return "รับผลจาก ศพฐ.";
    case 2:
      return "ส่งคืน";
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

  // ===== bulk select =====
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // ===== search =====
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // ===== debounce =====
  const [debounceFirstName, setDebounceFirstName] = useState("");
  const [debounceLastName, setDebounceLastName] = useState("");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const active = (value: string | null) =>
    statusParam === value ? "btn-dark" : "btn-outline-secondary";

  // ===== debounce =====
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceFirstName(firstName);
      setDebounceLastName(lastName);
    }, 300);

    return () => clearTimeout(timer);
  }, [firstName, lastName]);

  // ===== fetch =====
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

  // ===== select =====
  const toggleSelect = (id: string, status: number) => {
    if (status >= 3) return;

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    const valid = persons.filter((p) => p.status < 3);

    if (selectedIds.length === valid.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(valid.map((p) => p.personId));
    }
  };

  // ===== actions =====
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

  // ===== bulk =====
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
        }),
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
    <div className="p-4 main-content" >
      <h2 className="mb-3 text-center">📄 ประวัติทั้งหมด</h2>

      {/* SEARCH */}
      <div className="mb-3 d-flex gap-2 align-items-center flex-nowrap">
  <input
    type="text"
    className="form-control form-control-sm"
    style={{ width: 160 }}
    placeholder="ค้นหาชื่อ"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
  />

  <input
    type="text"
    className="form-control form-control-sm"
    style={{ width: 160 }}
    placeholder="ค้นหานามสกุล"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
  />

  <button
    className="btn btn-outline-secondary btn-sm"
    onClick={() => {
      setFirstName("");
      setLastName("");
    }}
  >
    ล้าง
  </button>
</div>

      {/* ===== BULK ACTION ===== */}
      <div className="d-flex justify-content-end mb-2 gap-2">
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSelectMode((prev) => !prev);
            setSelectedIds([]);
          }}
        >
          {selectMode ? "ยกเลิกเลือก" : "เลือก"}
        </button>

        {selectMode && (
          <>
            <button
              className="btn btn-outline-primary"
              onClick={handleSelectAll}
            >
              {selectedIds.length === persons.filter((p) => p.status < 3).length
                ? "ยกเลิกเลือกทั้งหมด"
                : "เลือกทั้งหมด"}
            </button>

            <button className="btn btn-success" onClick={handleBulkSend}>
              อัปเดตสถานะ (+1) ({selectedIds.length})
            </button>
          </>
        )}
      </div>
      {/* ===== FILTER ===== */}
      <div className="mb-3 d-flex gap-2 flex-wrap">
        <button
          className={`btn btn-sm ${active(null)}`}
          onClick={() => setSearchParams({})}
        >
          ทั้งหมด
        </button>
        <button
          className={`btn btn-sm ${active("0")}`}
          onClick={() => setSearchParams({ status: "0" })}
        >
          รอส่ง ศพฐ 
        </button>
        <button
          className={`btn btn-sm ${active("1")}`}
          onClick={() => setSearchParams({ status: "1" })}
        >
          ส่ง ศพฐ แล้ว
        </button>
        <button
          className={`btn btn-sm ${active("2")}`}
          onClick={() => setSearchParams({ status: "2" })}
        >
          รับจาก ศพฐ แล้ว
        </button>
        <button
          className={`btn btn-sm ${active("3")}`}
          onClick={() => setSearchParams({ status: "3" })}
        >
          ส่งคืน ต้นสังกัด แล้ว
        </button>
      </div>
      {/* ===== MOBILE ===== */}
      {isMobile && (
        <div className="d-flex flex-column gap-3">
          {loading && <div>กำลังโหลด...</div>}
          {!loading && persons.length === 0 && <div>ไม่พบข้อมูล</div>}

          {persons.map((p) => (
            <div key={p.personId} className="card p-3">
              {selectMode && p.status < 3 && (
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedIds.includes(p.personId)}
                    onChange={() => toggleSelect(p.personId, p.status)}
                  />
                </div>
              )}

              <strong>{p.fullName}</strong>

              <div>📘 {p.receiptBookNo || "-"}</div>
              <div>🧾 {p.receiptNo || "-"}</div>
              <div>📅 {formatThaiDate(p.receiptDate)}</div>
              <div className="mt-2">{renderStatus(p.status)}</div>

              <div className="mt-1">{renderPriority(p.priority ?? 0)}</div>

              {p.status === 3 && (
                <div className="mt-1 text-danger">
                  📅 วันคืน: {formatThaiDate(p.returnDate)}
                </div>
              )}

              <div className="d-flex gap-2 mt-2 flex-wrap">
                <button
                  className="btn btn-info w-100"
                  onClick={() => navigate(`/person/${p.personId}`)}
                >
                  ดู
                </button>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleExportPDF(p)}
                >
                  PDF
                </button>

                {p.status === 0 && (
                  <button
                    className="btn btn-warning w-100"
                    onClick={() => navigate(`/person/edit/${p.personId}`)}
                  >
                    แก้ไข
                  </button>
                )}

                <button
                  className="btn btn-danger w-100"
                  onClick={() => handleDelete(p)}
                >
                  ลบ
                </button>
              </div>

              {p.status < 3 && (
                <button
                  className={`btn mt-2 w-100 ${getStatusButtonStyle(p.status)}`}
                  onClick={() => handleUpdateStatus(p)}
                >
                  {getStatusButton(p.status)}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {/* ===== DESKTOP ===== */}
      {!isMobile && (
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  {selectMode && (
                    <th>
                      <input
                        type="checkbox"
                        checked={
                          selectedIds.length ===
                            persons.filter((p) => p.status < 3).length &&
                          persons.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                    </th>
                  )}
                  <th>#</th>
                  <th>ชื่อ</th>
                  <th>เล่ม</th>
                  <th>เลข</th>
                  <th>วันที่</th>
                  <th>สถานะ</th>
                  <th>ความเร่งด่วน</th>
                  <th>วันคืน</th>
                  <th>ดู</th>
                  <th>PDF</th>
                  <th>แก้ไข</th>
                  <th>ลบ</th>
                  <th>ส่ง</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={selectMode ? 12 : 11}>กำลังโหลด...</td>
                  </tr>
                )}

                {!loading && persons.length === 0 && (
                  <tr>
                    <td colSpan={selectMode ? 12 : 11}>ไม่พบข้อมูล</td>
                  </tr>
                )}

                {!loading &&
                  persons.map((p, i) => (
                    <tr key={p.personId}>
                      {selectMode && (
                        <td>
                          {p.status < 3 && (
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(p.personId)}
                              onChange={() =>
                                toggleSelect(p.personId, p.status)
                              }
                            />
                          )}
                        </td>
                      )}

                      <td>{i + 1}</td>
                      <td>{p.fullName}</td>
                      <td>{p.receiptBookNo || "-"}</td>
                      <td>{p.receiptNo || "-"}</td>
                      <td>{formatThaiDate(p.receiptDate)}</td>
                      <td>{renderStatus(p.status)}</td>
                      <td>{renderPriority(p.priority ?? 0)}</td>
                      <td>
                        {p.status === 3 ? formatThaiDate(p.returnDate) : "-"}
                      </td>

                      <td>
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => navigate(`/person/${p.personId}`)}
                        >
                          ดู
                        </button>
                      </td>

                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleExportPDF(p)}
                        >
                          PDF แบบพิมพ์มือ{" "}
                        </button>
                      </td>

                      <td>
                        {p.status === 0 && (
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() =>
                              navigate(`/person/edit/${p.personId}`)
                            }
                          >
                            แก้ไข
                          </button>
                        )}
                      </td>

                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(p)}
                        >
                          ลบ
                        </button>
                      </td>

                      <td>
                        {p.status < 3 && (
                          <button
                            className={`btn btn-sm ${getStatusButtonStyle(p.status)}`}

                            onClick={() => handleUpdateStatus(p)}
                          >
                            {getStatusButton(p.status)}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}