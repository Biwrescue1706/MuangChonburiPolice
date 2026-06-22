//src/utils/personHelper.tsx
import type { ReactNode } from "react";

export const formatThaiDate = (value: any) => {
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

export const renderStatus = (status: number): ReactNode => {
  switch (status) {
    case 0:
      return <span className="badge bg-warning text-dark">รอส่ง ศพฐ.</span>;
    case 1:
      return (
        <span className="badge bg-info text-dark">
          เตรียมเอกสารส่ง ศพฐ. แล้ว
        </span>
      );
    case 2:
      return <span className="badge bg-primary text-white">ส่ง ศพฐ. แล้ว</span>;
    case 3:
      return (
        <span className="badge bg-success text-white">รับจาก ศพฐ. แล้ว</span>
      );
    case 4:
      return (
        <span className="badge bg-danger text-white">
          ส่งคืน ต้นสังกัด แล้ว
        </span>
      );
    default:
      return "-";
  }
};

export const renderPriority = (priority: number): ReactNode => {
  switch (priority) {
    case 0:
      return <span className="badge bg-secondary">ไม่ด่วน</span>;

    case 1:
      return <span className="badge bg-danger">ด่วน</span>;

    case 2:
      return <span className="badge bg-primary">คืนปกติ</span>;

    case 3:
      return <span className="badge bg-warning text-dark">คืนด่วน</span>;

    default:
      return <span className="badge bg-secondary">ไม่ระบุ</span>;
  }
};

export const getStatusButtonStyle = (status: number) => {
  switch (status) {
    case 0:
      return "btn-warning text-dark";
    case 1:
      return "btn-info text-dark";
    case 2:
      return "btn-primary";
    case 3:
      return "btn-success";
    case 4:
      return "btn-danger";
    default:
      return "btn-secondary";
  }
};

export const getStatusButton = (status: number) => {
  switch (status) {
    case 0:
      return "เตรียมเอกสารส่ง พฐ แล้ว ";
    case 1:
      return "ส่ง ศพฐ.";
    case 2:
      return "รับจาก ศพฐ แล้ว";
    case 3:
      return "ส่งคืน ต้นสังกัด แล้ว";
    default:
      return null;
  }
};
