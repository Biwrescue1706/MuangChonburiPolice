import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { generateForensicPdf } from "../utils/generateForensicPdf";

interface Person {
  personId: string;
  fullName: string;
  purpose?: string;
  receiptBookNo?: string;
  receiptNo?: string;
  receiptDate?: string;
  priority?: number;
}

interface SubmissionPerson {
  person: Person;
}

interface Submission {
  submissionId: string;
  submissionNo?: string;
  submissionDate: string;
  persons: SubmissionPerson[];
}

export default function ForensicSubmissionPdfPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Submission | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get(`/forensic-submission/${id}`);

      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePdf = async () => {
    if (!data) return;

    await generateForensicPdf({
      submissionNo: data.submissionNo,

      submissionDate: new Date(data.submissionDate).toLocaleDateString(
        "th-TH",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      ),

      persons: data.persons.map((item) => ({
        fullName: item.person.fullName,

        purpose: item.person.purpose,

        receiptBookNo: item.person.receiptBookNo,

        receiptNo: item.person.receiptNo,

        receiptDate: item.person.receiptDate,

        priority: item.person.priority,
      })),
    });
  };

  const formatShortThaiDate = (dateString?: string) => {
    if (!dateString) return "-";

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

    const parts = dateString.trim().split(" ");

    if (parts.length !== 3) return dateString;

    const [day, month, year] = parts;

    return `${day} ${months[month] || month} ${year.slice(-2)}`;
  };

  if (loading) {
    return <div className="container py-4">กำลังโหลด...</div>;
  }

  if (!data) {
    return <div className="container py-4">ไม่พบข้อมูล</div>;
  }

  return (
    <div className="container py-4 main-content">
      <div className="card shadow">
        <div className="card-header">
          <h4 className="mb-0">หนังสือ ศพฐ.</h4>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <strong>จำนวนรายชื่อ :</strong> {data.persons.length} คน
          </div>

          <button className="btn btn-danger" onClick={handleGeneratePdf}>
            ดาวน์โหลด PDF
          </button>

          {/* Desktop */}
          <div className="d-none d-xl-block">
            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>ชื่อ และ ชื่อสกุล</th>
                  <th>เรื่องที่ขออนุญาต</th>
                  <th>เล่มที่</th>
                  <th>เลขที่</th>
                  <th>ลงวันที่</th>
                  <th>หมายเหตุ</th>
                </tr>
              </thead>

              <tbody>
                {data.persons.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>

                    <td>{item.person.fullName}</td>

                    <td>{item.person.purpose}</td>

                    <td className="text-center">{item.person.receiptBookNo}</td>

                    <td className="text-center">{item.person.receiptNo}</td>

                    <td className="text-center">
                      {formatShortThaiDate(item.person.receiptDate)}
                    </td>

                    <td className="text-center">
                      {item.person.priority === 1 ? "*" : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet */}
          <div className="d-block d-xl-none mt-4">
            {data.persons.map((item, index) => (
              <div key={index} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">ลำดับ {index + 1}</h6>

                    {item.person.priority === 1 && (
                      <span className="badge bg-danger">ด่วน</span>
                    )}
                  </div>

                  <div className="mb-2">
                    <strong>ชื่อ :</strong> {item.person.fullName}
                  </div>

                  <div className="mb-2">
                    <strong>เรื่อง :</strong> {item.person.purpose || "-"}
                  </div>

                  <div className="row">
                    <div className="col-6 mb-2">
                      <strong>เล่มที่ :</strong>
                      <br />
                      {item.person.receiptBookNo || "-"}
                    </div>

                    <div className="col-6 mb-2">
                      <strong>เลขที่ :</strong>
                      <br />
                      {item.person.receiptNo || "-"}
                    </div>
                  </div>

                  <div>
                    <strong>ลงวันที่ :</strong>{" "}
                    {formatShortThaiDate(item.person.receiptDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
