import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { toast } from "../../utils/toast";

// ================= FORMAT DATE =================
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

export default function PersonStatus1Page() {
  const navigate = useNavigate();

  const [persons, setPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ================= FETCH =================
  const fetchPersons = async () => {
    try {
      setLoading(true);
      const res = await api.get("/person/getall?status=1");
      setPersons(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  // ================= UPDATE STATUS → รับแล้ว =================
  const handleReceive = async (p: any) => {
    const confirm = await Swal.fire({
      title: "ยืนยันรับผล?",
      text: "ได้รับผลจาก ศพฐ แล้วใช่หรือไม่",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.patch(`/person/${p.personId}/status`, { status: 2 });
      await toast("success", "อัปเดตสถานะเรียบร้อย");
      fetchPersons();
    } catch (err) {
      toast("error", "อัปเดตสถานะไม่สำเร็จ");
    }
  };

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

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === persons.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(persons.map((p) => p.personId));
    }
  };

  const handleUpdateStatus = async (p: any) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการส่ง?",
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.patch(`/person/${p.personId}/status`, { status: 2 });
      toast("success", "ส่งเรียบร้อย");
      fetchPersons();
    } catch (err: any) {
      toast("error", "ส่งไม่สำเร็จ", err?.response?.data?.error);
    }
  };

  const handleBulkSend = async () => {
    if (!selectMode) return toast("warning", "กรุณากดเลือกก่อน");
    if (selectedIds.length === 0) return toast("warning", "เลือกข้อมูลก่อน");

    const confirm = await Swal.fire({
      title: "ยืนยันการส่ง?",
      text: `จำนวน ${selectedIds.length} รายการ`,
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await api.patch("/person/bulk/status", {
        personIds: selectedIds,
        status: 2,
      });

      setSelectedIds([]);
      toast("success", `ส่งแล้ว ${res.data.updated} รายการ`);
      fetchPersons();
    } catch (err: any) {
      toast("error", "ส่งไม่สำเร็จ", err?.response?.data?.error);
    }
  };

  return (
    <div className="p-4">
      <h4 className="mb-3">📦 รายการส่ง ศพฐ แล้ว</h4>
      <div className="d-flex justify-content-end mb-2 gap-2">
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSelectMode((prev: boolean) => !prev);
            setSelectedIds([]);
          }}
        >
          {selectMode ? "ยกเลิกเลือก" : "เลือก"}
        </button>

        {selectMode && (
          <button className="btn btn-success" onClick={handleBulkSend}>
            ส่งที่เลือก ({selectedIds.length})
          </button>
        )}
      </div>
      {/* ================= DESKTOP ================= */}
      {isDesktop ? (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table
                className="table table-bordered table-hover text-nowrap m-0"
                style={{ minWidth: "900px" }}
              >
                <thead className="table-dark">
                  <tr>
                    {selectMode && (
                      <th>
                        <input
                          type="checkbox"
                          checked={
                            selectedIds.length === persons.length &&
                            persons.length > 0
                          }
                          onChange={toggleSelectAll}
                        />
                      </th>
                    )}
                    <th>#</th>
                    <th>ชื่อ</th>
                    <th>เล่ม</th>
                    <th>เลขที่</th>
                    <th>วันที่</th>
                    <th>สถานะ</th>
                    <th>ดู</th>
                    <th>แก้ไข</th>
                    <th>ลบ</th>
                    <th>ส่ง</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={selectMode ? 11 : 10}>กำลังโหลด...</td>
                    </tr>
                  )}

                  {!loading && persons.length === 0 && (
                    <tr>
                      <td colSpan={selectMode ? 11 : 10}>ไม่พบข้อมูล</td>
                    </tr>
                  )}

                  {!loading &&
                    persons.map((p: any, i: number) => (
                      <tr key={p.personId}>
                        {selectMode && (
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(p.personId)}
                              onChange={() => toggleSelect(p.personId)}
                            />
                          </td>
                        )}
                        <td>{i + 1}</td>
                        <td>{p.fullName}</td>
                        <td>{p.receiptBookNo || "-"}</td>
                        <td>{p.receiptNo || "-"}</td>
                        <td>{formatThaiDate(p.receiptDate)}</td>

                        <td>
                          <span className="badge bg-primary">ส่งแล้ว</span>
                        </td>

                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-info"
                              onClick={() => navigate(`/person/${p.personId}`)}
                            >
                              ดู
                            </button>
                          </div>
                        </td>

                        <td>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() =>
                              navigate(`/person/edit/${p.personId}`)
                            }
                          >
                            แก้ไข
                          </button>
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
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleReceive(p)}
                          >
                            รับ จาก ศพฐ
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ================= MOBILE ================= */
        <div className="d-flex flex-column gap-3">
          {loading && <div>กำลังโหลด...</div>}

          {!loading && persons.length === 0 && (
            <div className="text-center">ไม่พบข้อมูล</div>
          )}

          {!loading &&
            persons.map((p: any) => (
              <div key={p.personId} className="card p-3">
                {selectMode && (
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(p.personId)}
                    onChange={() => toggleSelect(p.personId)}
                  />
                )}
                <div className="d-flex justify-content-between">
                  <strong>{p.fullName}</strong>
                  <span className="badge bg-primary">ส่งแล้ว</span>
                </div>

                <div className="mt-2 small">
                  <div>📘 เล่ม: {p.receiptBookNo || "-"}</div>
                  <div>🧾 เลขที่: {p.receiptNo || "-"}</div>
                  <div>📅 วันที่: {formatThaiDate(p.receiptDate)}</div>
                </div>

                <div className="d-flex gap-2 mt-2">
                  <button
                    className="btn btn-info w-100"
                    onClick={() => navigate(`/person/${p.personId}`)}
                  >
                    ดู
                  </button>

                  <button
                    className="btn btn-warning w-100"
                    onClick={() => navigate(`/person/edit/${p.personId}`)}
                  >
                    แก้ไข
                  </button>

                  <button
                    className="btn btn-danger w-100"
                    onClick={() => handleDelete(p)}
                  >
                    ลบ
                  </button>
                </div>

                <button
                  className="btn btn-success mt-2 w-100"
                  onClick={() => handleUpdateStatus(p)}
                >
                  ส่ง ศพฐ
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
