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
    "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
    "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",
  ];

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
};

export default function PersonStatus0Page() {
  const navigate = useNavigate();

  const [persons, setPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
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

  // ================= SINGLE SEND =================
  const handleUpdateStatus = async (p: any) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการส่ง?",
      text: "ต้องการส่งไป ศพฐ ใช่หรือไม่",
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.patch(`/person/${p.personId}/status`, {
        status: 1,
      });

      setSelectedIds((prev) =>
        prev.filter((id) => id !== p.personId)
      );

      await Swal.fire("สำเร็จ", "ส่งเรียบร้อย", "success");

      fetchPersons();
    } catch (err: any) {
      Swal.fire(
        "ผิดพลาด",
        err?.response?.data?.error || "ส่งไม่สำเร็จ",
        "error"
      );
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
      const res = await api.patch("/person/bulk/status", {
        personIds: selectedIds,
        status: 1,
      });

      setSelectedIds([]);

      await Swal.fire(
        "สำเร็จ",
        `ส่งแล้ว ${res.data.updated} รายการ`,
        "success"
      );

      fetchPersons();
    } catch (err: any) {
      Swal.fire(
        "ผิดพลาด",
        err?.response?.data?.error || "ส่งไม่สำเร็จ",
        "error"
      );
    }
  };

  // ================= DELETE =================
  const handleDelete = async (p: any) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการลบ?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/person/${p.personId}`);
      await Swal.fire("สำเร็จ", "ลบเรียบร้อย", "success");
      fetchPersons();
    } catch (err: any) {
      Swal.fire(
        "ผิดพลาด",
        err?.response?.data?.error || "ลบไม่สำเร็จ",
        "error"
      );
    }
  };

  return (
    <div className="p-4">
      <h4 className="mb-3 text-center">📌 รายการรอส่ง ศพฐ</h4>

      {/* BULK */}
      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-success" onClick={handleBulkSend}>
          ส่งที่เลือก ({selectedIds.length})
        </button>
      </div>

      {isDesktop ? (
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-dark">
                <tr>
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
                    <td colSpan={11}>กำลังโหลด...</td>
                  </tr>
                )}

                {!loading && persons.length === 0 && (
                  <tr>
                    <td colSpan={11}>ไม่พบข้อมูล</td>
                  </tr>
                )}

                {!loading &&
                  persons.map((p, i) => (
                    <tr key={p.personId}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(p.personId)}
                          onChange={() => toggleSelect(p.personId)}
                        />
                      </td>

                      <td>{i + 1}</td>
                      <td>{p.fullName}</td>
                      <td>{p.receiptBookNo || "-"}</td>
                      <td>{p.receiptNo || "-"}</td>
                      <td>{formatThaiDate(p.receiptDate)}</td>

                      <td>
                        <span className="badge bg-warning text-dark">
                          รอส่ง
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() =>
                            navigate(`/person/${p.personId}`)
                          }
                        >
                          ดู
                        </button>
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
                          className="btn btn-success btn-sm"
                          onClick={() => handleUpdateStatus(p)}
                        >
                          ส่ง
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {loading && <div>กำลังโหลด...</div>}

          {!loading && persons.length === 0 && (
            <div>ไม่พบข้อมูล</div>
          )}

          {!loading &&
            persons.map((p) => (
              <div key={p.personId} className="card p-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(p.personId)}
                  onChange={() => toggleSelect(p.personId)}
                />

                <strong>{p.fullName}</strong>

                <div>📘 {p.receiptBookNo || "-"}</div>
                <div>🧾 {p.receiptNo || "-"}</div>
                <div>📅 {formatThaiDate(p.receiptDate)}</div>

                <div className="d-flex gap-2 mt-2">
                  <button
                    className="btn btn-info w-100"
                    onClick={() =>
                      navigate(`/person/${p.personId}`)
                    }
                  >
                    ดู
                  </button>

                  <button
                    className="btn btn-warning w-100"
                    onClick={() =>
                      navigate(`/person/edit/${p.personId}`)
                    }
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
                  className="btn btn-success mt-2"
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