// src/pages/Status/StatusHistoryPage.tsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

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
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [histories, setHistories] = useState<StatusHistory[]>([]);

  const [isCardView, setIsCardView] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsCardView(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const fetchData = async (
    selectedStartDate: string,
    selectedEndDate: string,
  ) => {
    try {
      setLoading(true);

      const res = await api.get("/status-history/range", {
        params: {
          startDate: selectedStartDate,
          endDate: selectedEndDate,
        },
      });

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
    fetchData(startDate, endDate);
  }, []);

  return (
    <div className="p-4 main-content text-center">
      {/* CARD */}
      <div className="card shadow-sm border-0 p-3">
        <div className="card shadow-sm">
          <div className="card-header text-center">
            <h3 className="mb-0">รายงานการส่งตรวจลายนิ้วมือ</h3>
          </div>

          <div className="card-body">
            <div className="row mb-3 g-2">
              <div className="col-md-3">
                <label className="form-label">วันที่เริ่มต้น</label>

                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">วันที่สิ้นสุด</label>

                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="col-md-2 d-flex align-items-end">
                <button
                  className="btn btn-success w-100"
                  onClick={() => fetchData(startDate, endDate)}
                >
                  ค้นหา
                </button>
              </div>
            </div>

            <div className="alert alert-primary">
              <strong>จำนวนที่ส่งทั้งหมด :</strong> {total} คน
            </div>

            {isCardView ? (
              <div className="d-flex flex-column gap-3">
                {loading ? (
                  <div className="alert alert-info">กำลังโหลดข้อมูล...</div>
                ) : histories.length === 0 ? (
                  <div className="alert alert-warning">ไม่พบข้อมูล</div>
                ) : (
                  histories.map((item, index) => (
                    <div key={item.historyId} className="card shadow-sm">
                      <div className="card-body">
                        <h5 className="fw-bold mb-3">
                          {index + 1}. {item.person?.fullName ?? "-"}
                        </h5>

                        <div className="mb-1">
                          <strong>เรื่อง :</strong>{" "}
                          {item.person?.purpose ?? "-"}
                        </div>

                        <div className="mb-1">
                          <strong>เล่มที่ :</strong>{" "}
                          {item.person?.receiptBookNo ?? "-"}
                        </div>

                        <div className="mb-1">
                          <strong>เลขที่ :</strong>{" "}
                          {item.person?.receiptNo ?? "-"}
                        </div>

                        <div className="mb-1">
                          <strong>ลงวันที่ :</strong>{" "}
                          {formatThaiShortDate(item.person?.receiptDate)}
                        </div>

                        <div className="mb-1">
                          <strong>หมายเหตุ :</strong>{" "}
                          {item.person?.priority === 1 ? "ด่วน" : "ไม่ด่วน"}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
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
                        <td colSpan={8}>กำลังโหลดข้อมูล...</td>
                      </tr>
                    ) : histories.length === 0 ? (
                      <tr>
                        <td colSpan={8}>ไม่พบข้อมูล</td>
                      </tr>
                    ) : (
                      histories.map((item, index) => (
                        <tr key={item.historyId}>
                          <td>{index + 1}</td>
                          <td>{item.person?.fullName ?? "-"}</td>
                          <td>{item.person?.purpose ?? "-"}</td>
                          <td>{item.person?.receiptBookNo ?? "-"}</td>
                          <td>{item.person?.receiptNo ?? "-"}</td>
                          <td>
                            {formatThaiShortDate(item.person?.receiptDate)}
                          </td>
                          <td>{item.person?.priority === 1 ? "*" : ""}</td>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
