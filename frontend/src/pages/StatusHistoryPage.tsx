import { useEffect, useState } from "react";
import api from "../api/axios";

interface Person {
  personId: string;
  fullName: string;
  citizenId: string;
  fingerprintDate: string | null;

  purpose?: string;
  receiptBookNo?: string;
  receiptNo?: string;
  receiptDate?: string;

  organizationName?: string;
  status?: number;
  priority?: number;
}

interface StatusHistory {
  historyId: string;
  oldStatus: number;
  newStatus: number;
  changedAt: string;
  person: Person;
}

export default function StatusHistoryPage() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [histories, setHistories] = useState<StatusHistory[]>([]);

  const formatThaiShortDate = (dateStr?: string | null) => {
    if (!dateStr) return "-";

    const months: Record<string, string> = {
      มกราคม: "ม.ค.",
      กุมภาพันธ์: "ก.พ.",
      มีนาคม: "มี.ค.",
      เมษายน: "เม.ย.",
      พฤษภาคม: "พ.ค.",
      มิถุนายน: "มิ.ย.",
      กรกฎาคม: "ก.ค.",
      สิงหาคม: "ส.ค.",
      กันยายน: "ก.ย.",
      ตุลาคม: "ต.ค.",
      พฤศจิกายน: "พ.ย.",
      ธันวาคม: "ธ.ค.",
    };

    const parts = dateStr.trim().split(" ");

    if (parts.length !== 3) return dateStr;

    const [day, month, year] = parts;

    return `${day} ${months[month] || month} ${year.slice(-2)}`;
  };

  const fetchData = async (selectedDate: string) => {
    try {
      setLoading(true);

      const res = await api.get(`/status-history/date/${selectedDate}`);

      setTotal(res.data.total || 0);
      const sortedData = [...(res.data.data || [])].sort((a, b) => {
        const bookA = Number(a.person?.receiptBookNo || 0);
        const bookB = Number(b.person?.receiptBookNo || 0);

        if (bookA !== bookB) {
          return bookA - bookB;
        }

        const noA = Number(a.person?.receiptNo || 0);
        const noB = Number(b.person?.receiptNo || 0);

        return noA - noB;
      });

      setHistories(sortedData);
    } catch (err) {
      console.error(err);
      setHistories([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(date);
  }, []);

  return (
    <div className="container py-4 main-content">
      <div className="bg-white rounded-xl shadow border">
      <div className="card shadow-sm">
        <div className="card-header text-center">
          <h3 className="mb-0">รายงานการส่งตรวจลายนิ้วมือ</h3>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-success w-100"
                onClick={() => fetchData(date)}
              >
                ค้นหา
              </button>
            </div>
          </div>

          <div className="alert alert-primary">
            <strong>จำนวนที่ส่งทั้งหมด :</strong> {total} คน
          </div>

          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th rowSpan={2} style={{ width: "70px" }}>
                    ลำดับ
                  </th>

                  <th rowSpan={2}>ชื่อ และ ชื่อสกุล</th>

                  <th rowSpan={2}>เรื่องที่ขออนุญาต</th>

                  <th colSpan={3}>ใบเสร็จ</th>

                  <th rowSpan={2}>หมายเหตุ</th>

                  <th rowSpan={2}>วันที่เปลี่ยนสถานะ</th>
                </tr>

                <tr>
                  <th>เล่มที่</th>
                  <th>เลขที่</th>
                  <th>ลงวันที่</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center">
                      กำลังโหลดข้อมูล...
                    </td>
                  </tr>
                ) : histories.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center">
                      ไม่พบข้อมูล
                    </td>
                  </tr>
                ) : (
                  histories.map((item, index) => (
                    <tr key={item.historyId}>
                      <td className="text-center">{index + 1}</td>

                      <td>{item.person?.fullName ?? "-"}</td>

                      <td>{item.person?.purpose ?? "-"}</td>

                      <td className="text-center">
                        {item.person?.receiptBookNo ?? "-"}
                      </td>

                      <td className="text-center">
                        {item.person?.receiptNo ?? "-"}
                      </td>

                      <td className="text-center">
                        {formatThaiShortDate(item.person?.receiptDate)}
                      </td>

                      <td className="text-center">
                        {item.person?.priority === 1 ? "*" : "-"}
                      </td>

                      <td className="text-center">
                        {new Date(item.changedAt).toLocaleString("th-TH", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

              {!loading && histories.length > 0 && (
                <tfoot>
                  <tr>
                    <td colSpan={8} className="fw-bold text-end">
                      รวมทั้งหมด {total} คน
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
