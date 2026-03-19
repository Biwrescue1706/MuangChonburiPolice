import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PersonStatus0Page() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const res = await api.get("/person/getall", {
        params: {
          status: 0,
          search,
          page,
          limit: 10,
        },
      });

      setData(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <div
      className="p-4"
      style={{
        marginTop: 65,
        marginLeft: window.innerWidth > 1280 ? 220 : 0,
      }}
    >
      <h3 className="mb-4">รายการรอส่ง ศพฐ (Status 0)</h3>

      {/* 🔍 search */}
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="ค้นหา ชื่อ / เลขบัตร"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* 📋 table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>ชื่อ</th>
              <th>เลขบัตร</th>
              <th>วันเกิด</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center">
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}

            {data.map((p, i) => (
              <tr key={p.personId}>
                <td>{(page - 1) * 10 + i + 1}</td>
                <td>{p.fullName}</td>
                <td>{p.citizenId}</td>
                <td>
                  {p.birthDay} {p.birthMonth} {p.birthYear}
                </td>
                <td>
                  <span className="badge bg-warning text-dark">
                    รอส่ง ศพฐ
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      window.location.href = `/person/${p.personId}`;
                    }}
                  >
                    ดู
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📄 pagination */}
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ก่อนหน้า
        </button>

        <span>
          หน้า {page} / {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}
