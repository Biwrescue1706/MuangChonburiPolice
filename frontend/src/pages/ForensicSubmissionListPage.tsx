import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ForensicSubmissionListPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= 1280
  );

  useEffect(() => {
    fetchData();

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/forensic-submission");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const formatThaiDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="container py-4 main-content">
      <div className="bg-white rounded-xl shadow border">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">
            รายการหนังสือ ศพฐ.
          </h1>
        </div>

        <div className="p-4">

          {/* Desktop */}
          {isDesktop ? (
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>เลขหนังสือ</th>
                  <th>วันที่สร้าง</th>
                  <th>จำนวนรายชื่อ</th>
                  <th>จัดการ</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={item.submissionId}>
                    <td>{index + 1}</td>

                    <td>
                      {item.submissionNo || "-"}
                    </td>

                    <td>
                      {formatThaiDate(item.submissionDate)}
                    </td>

                    <td>
                      {item.persons?.length || 0}
                    </td>

                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          navigate(
                            `/forensic-submission/pdf/${item.submissionId}`
                          )
                        }
                      >
                        ดู PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* Mobile / Tablet */
            <div className="space-y-3">
              {data.map((item, index) => (
                <div
                  key={item.submissionId}
                  className="border rounded-lg shadow-sm p-4"
                >
                  <div className="flex justify-between mb-2 text-center">
                    <h3 className="font-semibold ">
                      ลำดับ {index + 1}
                    </h3>
                  </div>

                  <div className="mb-2">
                    <h6>เลขหนังสือ : </h6>
                    {item.submissionNo || "-"}
                  </div>

                  <div className="mb-2">
                    <h6>วันที่สร้าง:</h6>
                    {formatThaiDate(item.submissionDate)}
                  </div>

                  <div className="mb-3">
                    <h6>จำนวนรายชื่อ:</h6>
                    {item.persons?.length || 0}
                  </div>

                  <button
                    className="btn btn-primary w-full"
                    onClick={() =>
                      navigate(
                        `/forensic-submission/pdf/${item.submissionId}`
                      )
                    }
                  >
                    ดู PDF
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}