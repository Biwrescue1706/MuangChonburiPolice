//src/page/statusPerson/PersonStatus0page.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";

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

export default function PersonStatus0Page() {
  const navigate = useNavigate();

  const [persons, setPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

  // ✅ เพิ่ม
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
      const res = await api.get("/person/getall?status=0");
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

  // ================= SELECT =================
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === persons.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(persons.map((p) => p.personId));
    }
  };

  // ================= UPDATE STATUS (Single) =================
  const handleUpdateStatus = async (p: any) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการส่ง?",
      text: "ต้องการส่งไป ศพฐ ใช่หรือไม่",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    });

    if (!confirm.isConfirmed) return;

    try {
      // ✅ เปลี่ยนเป็น PATCH
      await api.patch(`/person/${p.personId}/status`, {
        status: 1,
      });

      // ✅ เอาออกจาก selected
      setSelectedIds((prev) => prev.filter(id => id !== p.personId));

      await Swal.fire({
        icon: "success",
        title: "ส่งเรียบร้อย",
        timer: 1200,
        showConfirmButton: false,
      });

      fetchPersons();
    } catch (err) {
      Swal.fire("ผิดพลาด", "ไม่สามารถอัปเดตสถานะได้", "error");
    }
  };

  // ================= BULK =================
  const handleBulkSend = async () => {
    if (selectedIds.length === 0) {
      return Swal.fire("เลือกข้อมูลก่อน", "", "warning");
    }

    const confirm = await Swal.fire({
      title: "ยืนยันการส่ง?",
      text: `จำนวน ${selectedIds.length} รายการ`,
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.patch("/person/bulk/status", {
        personIds: selectedIds,
        status: 1,
      });

      setSelectedIds([]);

      await Swal.fire({
        icon: "success",
        title: "ส่งเรียบร้อย",
        timer: 1200,
        showConfirmButton: false,
      });

      fetchPersons();
    } catch (err) {
      Swal.fire("ผิดพลาด", "ส่งหลายรายการไม่สำเร็จ", "error");
    }
  };

  return (
    <div className="p-4">
      <h4 className="mb-3 text-center">📌 รายการรอส่ง ศพฐ</h4>

      {/* ✅ ปุ่ม BULK */}
      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-success" onClick={handleBulkSend}>
          ส่งที่เลือก ({selectedIds.length})
        </button>
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
                  <tr className="text-center">
                    {/* ✅ เพิ่ม checkbox */}
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

                    <th>#</th>
                    <th>ชื่อ-นามสกุล</th>
                    <th>เล่มใบเสร็จ</th>
                    <th>เลขที่ใบเสร็จ</th>
                    <th>วันที่รับคำขอ</th>
                    <th>สถานะ</th>
                    <th>ดูประวัติ</th>
                    <th>แก้ไข</th>
                    <th>ลบ</th>
                    <th>ส่ง</th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  {loading && (
                    <tr>
                      <td colSpan={10} className="text-center">
                        กำลังโหลด...
                      </td>
                    </tr>
                  )}

                  {!loading && persons.length === 0 && (
                    <tr>
                      <td colSpan={10} className="text-center">
                        ไม่พบข้อมูล
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    persons.map((p, index) => (
                      <tr key={p.personId}>
                        {/* ✅ checkbox ต่อแถว */}
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(p.personId)}
                            onChange={() => toggleSelect(p.personId)}
                          />
                        </td>

                        <td>{index + 1}</td>
                        <td>{p.fullName}</td>
                        <td>{p.receiptBookNo || "-"}</td>
                        <td>{p.receiptNo || "-"}</td>
                        <td>{formatThaiDate(p.receiptDate)}</td>

                        <td>
                          <span className="badge bg-warning text-dark">
                            รอส่ง ศพฐ
                          </span>
                        </td>

                        <td>
                          <button
                            className="btn btn-sm btn-info"
                            onClick={() => navigate(`/person/${p.personId}`)}
                          >
                            ดู
                          </button>
                        </td>
                        <td></td>
                        <td></td>

                        <td>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleUpdateStatus(p)}
                          >
                            ส่ง ศพฐ
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
            persons.map((p) => (
              <div key={p.personId} className="card shadow-sm p-3">
                <div className="d-flex justify-content-between">
                  {/* ✅ checkbox mobile */}
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(p.personId)}
                    onChange={() => toggleSelect(p.personId)}
                  />

                  <strong>{p.fullName}</strong>
                  <span className="badge bg-warning text-dark">
                    รอส่ง ศพฐ
                  </span>
                </div>

                <div className="mt-2 small">
                  <div>📘 เล่ม: {p.receiptBookNo || "-"}</div>
                  <div>🧾 เลขที่: {p.receiptNo || "-"}</div>
                  <div>📅 วันที่: {formatThaiDate(p.receiptDate)}</div>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-sm btn-info w-100"
                    onClick={() => navigate(`/person/${p.personId}`)}
                  >
                    ดู
                  </button>

                  <button
                    className="btn btn-sm btn-success w-100"
                    onClick={() => handleUpdateStatus(p)}
                  >
                    ส่ง ศพฐ
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}