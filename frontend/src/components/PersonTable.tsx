//src/components/PersonTable.tsx
import { useNavigate } from "react-router-dom";
import {
  formatThaiDate,
  renderStatus,
  renderPriority,
  getStatusButton,
  getStatusButtonStyle,
} from "../utils/personHelper";
import Swal from "sweetalert2";

interface Props {
  persons: any[];
  loading: boolean;
  selectMode: boolean;
  selectedIds: string[];
  toggleSelect: (id: string, status: number) => void;
  handleSelectAll: () => void;
  handleDelete: (p: any) => void;
  handleUpdateStatus: (p: any) => void;
  handleExportPDF: (p: any) => void;
}

export default function PersonTable({
  persons,
  loading,
  selectMode,
  selectedIds,
  toggleSelect,
  handleSelectAll,
  handleDelete,
  handleUpdateStatus,
  handleExportPDF,
}: Props) {
  const navigate = useNavigate();

  return (
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
                        persons.filter((p) => p.status < 4).length &&
                      persons.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              <th>#</th>
              <th>ชื่อ และชื่อสกุล</th>
              <th>เรื่องที่ขออนุญาต</th>
              <th>หน่วยงาน</th>
              <th>เล่มที่</th>
              <th>เลขที่</th>
              <th>ลงวันที่</th>

              <th>สถานะ</th>
              <th>ความเร่งด่วน</th>
              {persons.some((p) => p.status === 4) && <th>วันคืน</th>}
              {persons.some((p) => p.status === 4 && p.deleteAt) && (
                <th>วันหมดอายุเอกสาร</th>
              )}
              <th>ดู</th>
              <th>PDF</th>
              <th>แก้ไข</th>
              <th>ลบ</th>
              {persons.some((x) => x.status < 4) && <th>ส่ง</th>}
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
                      {p.status < 4 && (
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(p.personId)}
                          onChange={() => toggleSelect(p.personId, p.status)}
                        />
                      )}
                    </td>
                  )}

                  <td>{i + 1}</td>
                  <td>{p.fullName}</td>
                  <td>{p.purpose}</td>
                  <td>{p.requestingAgency}</td>
                  <td>{p.receiptBookNo || "-"}</td>
                  <td>{p.receiptNo || "-"}</td>
                  <td>{formatThaiDate(p.receiptDate)}</td>

                  <td>{renderStatus(p.status)}</td>
                  <td>{renderPriority(p.priority ?? 0)}</td>

                  {persons.some((x) => x.status === 4) && (
                    <td>
                      {p.status === 4 ? formatThaiDate(p.returnDate) : "-"}
                    </td>
                  )}

                  {persons.some((x) => x.status === 4 && x.deleteAt) && (
                    <td>
                      {p.status === 4 && p.deleteAt
                        ? formatThaiDate(p.deleteAt)
                        : "-"}
                    </td>
                  )}

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
                      onClick={() => {
                        if (p.status !== 2) {
                          Swal.fire({
                            icon: "warning",
                            title: "ไม่สามารถดำเนินการได้",
                            text: "กรุณากดปุ่ม 'เตรียมเอกสารส่ง พฐ' ก่อน",
                            confirmButtonText: "ตกลง",
                          });
                          return;
                        }

                        handleExportPDF(p);
                      }}
                    >
                      PDF แบบพิมพ์มือ
                    </button>
                  </td>

                  <td>
                    {p.status < 4 ? (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => navigate(`/person/edit/${p.personId}`)}
                      >
                        ✏️
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p)}
                    >
                      🗑️
                    </button>
                  </td>

                  {persons.some((x) => x.status < 4) && (
                    <td>
                      {p.status < 4 && (
                        <button
                          className={`btn btn-sm ${getStatusButtonStyle(p.status)}`}
                          onClick={() => handleUpdateStatus(p)}
                        >
                          {getStatusButton(p.status)}
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
