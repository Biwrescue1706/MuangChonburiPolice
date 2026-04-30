//src/utils/personHelper.tsx
import type { ReactNode } from "react";

export const formatThaiDate = (value: any) => {
  if (!value) return "-";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;

  const months = [
    "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
    "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",
  ];

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
};

export const renderStatus = (status: number): ReactNode => {
  switch (status) {
    case 0:
      return <span className="badge bg-warning text-dark">รอส่ง ศพฐ.</span>;
    case 1:
      return <span className="badge bg-primary">ส่ง ศพฐ. แล้ว</span>;
    case 2:
      return <span className="badge bg-success">รับจาก ศพฐ. แล้ว</span>;
    case 3:
      return <span className="badge bg-danger">ส่งคืนแล้ว</span>;
    default:
      return "-";
  }
};

export const renderPriority = (priority: number): ReactNode => {
  return priority === 1 ? (
    <span className="badge bg-danger">ด่วน</span>
  ) : (
    <span className="badge bg-secondary">ไม่ด่วน</span>
  );
};

export const getStatusButtonStyle = (status: number) => {
  switch (status) {
    case 0:
      return "btn-warning text-dark";
    case 1:
      return "btn-info text-dark";
    case 2:
      return "btn-primary";
    default:
      return "btn-secondary";
  }
};

export const getStatusButton = (status: number) => {
  switch (status) {
    case 0:
      return "ส่ง ศพฐ.";
    case 1:
      return "รับผลจาก ศพฐ.";
    case 2:
      return "ส่งคืน";
    default:
      return null;
  }
};