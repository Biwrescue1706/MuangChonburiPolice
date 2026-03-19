import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

// 🔥 format วันที่ไทย
const formatThaiDate = (value: any) => {
  if (!value) return "-";

  const d = new Date(value);
  if (isNaN(d.getTime())) return value;

  const months = [
    "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน",
    "พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม",
    "กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"
  ];

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
};

// 🔥 status text
const getStatus = (status: number) => {
  switch (status) {
    case 0: return "รอส่ง ศพฐ";
    case 1: return "ส่งแล้ว";
    case 2: return "รับแล้ว";
    case 3: return "ส่งคืน";
    default: return "-";
  }
};

export default function PersonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchPerson = async () => {
    try {
      const res = await api.get(`/person/${id}`);
      setPerson(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  if (loading) return <div className="p-4">กำลังโหลด...</div>;
  if (!person) return <div className="p-4">ไม่พบข้อมูล</div>;

  return (
    <div
      className="p-4"
      style={{
        marginTop: 65,
        marginLeft: window.innerWidth > 1280 ? 220 : 0,
      }}
    >
      <div className="d-flex justify-content-between mb-3">
        <h4>📄 รายละเอียดบุคคล</h4>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← กลับ
        </button>
      </div>

      <div className="card shadow-sm p-4">

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>ชื่อ:</strong> {person.fullName}
          </div>
          <div className="col-md-6">
            <strong>สถานะ:</strong> {getStatus(person.status)}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>วันเกิด:</strong> {person.birthDay} {person.birthMonth} {person.birthYear}
          </div>
          <div className="col-md-6">
            <strong>วันที่พิมพ์มือ:</strong> {formatThaiDate(person.fingerprintDate)}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>สัญชาติ:</strong> {person.nationality}
          </div>
          <div className="col-md-6">
            <strong>เชื้อชาติ:</strong> {person.ethnicity}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>ส่วนสูง:</strong> {person.height || "-"} ซม.
          </div>
          <div className="col-md-6">
            <strong>น้ำหนัก:</strong> {person.weight || "-"} กก.
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>รูปร่าง:</strong> {person.bodyType}
          </div>
          <div className="col-md-6">
            <strong>สีผิว:</strong> {person.skinColor}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-12">
            <strong>ลักษณะเด่น:</strong> {person.behavior || "-"}
          </div>
        </div>

        <hr />

        <h5>📑 ข้อมูลใบเสร็จ</h5>

        <div className="row mb-2">
          <div className="col-md-4">
            <strong>เล่ม:</strong> {person.receiptBookNo}
          </div>
          <div className="col-md-4">
            <strong>เลขที่:</strong> {person.receiptNo}
          </div>
          <div className="col-md-4">
            <strong>วันที่:</strong> {person.receiptDate || "-"}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>จำนวนเงิน:</strong> {person.money} บาท
          </div>
          <div className="col-md-6">
            <strong>ตัวอักษร:</strong> {person.moneyText}
          </div>
        </div>

        <hr />

        <h5>🏢 ข้อมูลหน่วยงาน</h5>

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>วัตถุประสงค์:</strong> {person.purpose || "-"}
          </div>
          <div className="col-md-6">
            <strong>หน่วยงาน:</strong> {person.requestingAgency || "-"}
          </div>
        </div>

      </div>
    </div>
  );
}