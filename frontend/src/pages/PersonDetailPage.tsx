import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

// 🔥 format วันที่ไทย
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

// 🔥 status text
const getStatus = (status: number) => {
  switch (status) {
    case 0:
      return "รอส่ง ศพฐ";
    case 1:
      return "ส่งแล้ว";
    case 2:
      return "รับแล้ว";
    case 3:
      return "ส่งคืน";
    default:
      return "-";
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

  const Divider = () => (
    <hr
      className=" py-2 pb-2 pt-3"
      style={{
        border: "none",
        borderTop: "2px solid #000000",
        opacity: 1,
        margin: "10px 0",
      }}
    />
  );

  const getStatusStyle = (status: number) => {
    switch (status) {
      case 0:
        return { bg: "#25ac68", color: "#f1f3f5" }; // เทาอ่อน
      case 1:
        return { bg: "#e67700", color: "#fff3bf" }; // เหลือง
      case 2:
        return { bg: "#1c7ed6", color: "#e7f5ff" }; // ฟ้า
      case 3:
        return { bg: "#00e72e", color: "#d3f9d8" }; // เขียว
      default:
        return { bg: "#212529", color: "#f8f9fa" };
    }
  };

  if (loading) return <div className="p-4">กำลังโหลด...</div>;
  if (!person) return <div className="p-4">ไม่พบข้อมูล</div>;

  const style = getStatusStyle(person.status);

  return (
    <div className="p-4 main-content" >
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← กลับ
        </button>
      </div>

      <div className="d-flex justify-content-center mb-3">
        <span
          style={{
            backgroundColor: style.bg,
            color: style.color,
            padding: "8px 18px",
            borderRadius: "999px",
            fontSize: "16px",
            fontWeight: 500,
            border: `1px solid ${style.color}30`,
          }}
        >
          สถานะ : {getStatus(person.status)}
        </span>
      </div>

      <div className="d-flex justify-content-center mb-3">
        <h3>{formatThaiDate(person.statusUpdatedAt)}</h3>
      </div>

      <div className="d-flex justify-content-center mb-3">
        <h1>📄 รายละเอียดบุคคล</h1>
      </div>

      <div className="card shadow-sm p-4">
        <div className="row mb-2">
          <div className="col-md-6">
            <strong>วันที่พิมพ์มือ : </strong> {person.fingerprintDate}
          </div>
          <div className="col-md-6">
            <strong>ส่วนราชการ/หน่วยงาน : </strong> {person.organizationName}
          </div>
          <div className="col-md-6">
            <strong>ชื่อ-นามสกุล : </strong> {person.fullName}
          </div>
          <div className="col-md-6">
            <strong>วันเกิด : </strong> {person.birthDate}
          </div>
          <div className="col-md-6">
            <strong>ชื่อ-นามสกุล เจ้าหน้าที่ : </strong>{" "}
            {person.fullNameWithRank}
          </div>
        </div>

        <Divider />

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>ตรวจสอบประวัติเพื่อ : </strong> {person.purpose || "-"}
          </div>
          <div className="col-md-6">
            <strong>ของส่วนราชการ/หน่วยงาน : </strong>{" "}
            {person.requestingAgency || "-"}
          </div>
          <div className="col-md-6">
            <strong>เลขประจำตัวประชาชน : </strong> {person.citizenId || "-"}
          </div>
          <div className="col-md-12">
            <strong>ชื่อ-นามสกุล : </strong> {person.fullName}
          </div>
          <div className="col-md-3">
            <strong>เกิดวันที่ : </strong> {person.birthDay}
          </div>
          <div className="col-md-3">
            <strong>เดือน : </strong> {person.birthMonth}
          </div>
          <div className="col-md-3">
            <strong>ปี : </strong> {person.birthYear}
          </div>
          <div className="col-md-6">
            <strong>เชื้อชาติ : </strong> {person.ethnicity}
          </div>
          <div className="col-md-6">
            <strong>สัญชาติ : </strong> {person.nationality}
          </div>
          <div className="col-md-6">
            <strong>ส่วนสูง : </strong> {person.height || "-"} ซม.
          </div>
          <div className="col-md-6">
            <strong>น้ำหนัก : </strong> {person.weight || "-"} กก.
          </div>
          <div className="col-md-6">
            <strong>รูปร่าง : </strong> {person.bodyType}
          </div>
          <div className="col-md-6">
            <strong>สีผิว : </strong> {person.skinColor}
          </div>
          <div className="col-md-12">
            <strong>ตำหนิ/พิการ/รอยสัก : </strong>{" "}
            {person.distinguishingMarks || "-"}
          </div>
          <div className="col-md-12">
            <strong>ลักษณะเด่น : </strong> {person.behavior || "-"}
          </div>
          <div className="col-md-12">
            <strong>ที่อยู่ปัจจุบัน : </strong> {person.address || "-"}
          </div>
          <div className="col-md-12">
            <strong>อาชีพ : </strong> {person.occupation || "-"}
          </div>
          <div className="col-md-12">
            <strong>สถานที่ทำงาน : </strong> {person.workplaceAddress || "-"}
          </div>
          <div className="col-md-12">
            <strong>ชื่อตัว ชื่อสกุล บิดา : </strong> {person.father || "-"}
          </div>
          <div className="col-md-12">
            <strong>ชื่อตัว ชื่อสกุล มารดา : </strong> {person.mother || "-"}
          </div>
          <div className="col-md-12">
            <strong>ชื่อตัว ชื่อสกุล ภรรยา/สามี : </strong>{" "}
            {person.spouse || "-"}
          </div>
        </div>

        <Divider />

        <h5>📑 ข้อมูลใบเสร็จ</h5>

        <div className="row mb-2">
          <div className="col-md-6">
            <strong>เล่มที่ : </strong> {person.receiptBookNo}
          </div>
          <div className="col-md-6">
            <strong>เลขที่ : </strong> {person.receiptNo}
          </div>
          <div className="col-md-12">
            <strong>ลงวันที่ : </strong> {person.receiptDate || "-"}
          </div>
          <div className="col-md-6">
            <strong>จำนวน : </strong> {person.money} บาท
          </div>
          <div className="col-md-6">
            <strong>ตัวอักษร : </strong> ( {person.moneyText} )
          </div>

          <div className="col-md-12">
            <strong>หน่วยเก็บเงิน : </strong> {person.organizationName}
          </div>
        </div>

        <div className="row mb-2"></div>

        <hr />
      </div>
    </div>
  );
}
