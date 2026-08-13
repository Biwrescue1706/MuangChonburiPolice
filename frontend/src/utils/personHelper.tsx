// src/utils/personHelper.tsx

import type { ReactNode } from "react";

/* =========================================================
   FORMAT THAI DATE
========================================================= */

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

  return `${d.getDate()} ${months[d.getMonth()]} ${
    d.getFullYear() + 543
  }`;
};

/* =========================================================
   STATUS
========================================================= */

export const renderStatus = (status: number): ReactNode => {
  switch (status) {
    case 0:
      return (
        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
          รอส่ง ศพฐ.
        </span>
      );

    case 1:
      return (
        <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
          เตรียมเอกสารส่ง ศพฐ. แล้ว
        </span>
      );

    case 2:
      return (
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
          ส่ง ศพฐ. แล้ว
        </span>
      );

    case 3:
      return (
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          รับจาก ศพฐ. แล้ว
        </span>
      );

    case 4:
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800">
          ส่งคืน ต้นสังกัด แล้ว
        </span>
      );

    default:
      return (
        <span className="text-sm text-gray-400">
          -
        </span>
      );
  }
};

/* =========================================================
   PRIORITY
========================================================= */

export const renderPriority = (
  priority: number,
): ReactNode => {
  switch (priority) {
    case 0:
      return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
          ไม่ด่วน
        </span>
      );

    case 1:
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
          ด่วน
        </span>
      );

    case 2:
      return (
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
          คืนปกติ
        </span>
      );

    case 3:
      return (
        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
          คืนด่วน
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500">
          ไม่ระบุ
        </span>
      );
  }
};

/* =========================================================
   STATUS BUTTON STYLE
========================================================= */

export const getStatusButtonStyle = (
  status: number,
) => {
  switch (status) {
    case 0:
      return "bg-amber-500 text-white hover:bg-amber-600";

    case 1:
      return "bg-sky-500 text-white hover:bg-sky-600";

    case 2:
      return "bg-blue-600 text-white hover:bg-blue-700";

    case 3:
      return "bg-emerald-600 text-white hover:bg-emerald-700";

    case 4:
      return "bg-red-600 text-white hover:bg-red-700";

    default:
      return "bg-gray-500 text-white hover:bg-gray-600";
  }
};

/* =========================================================
   STATUS BUTTON TEXT
========================================================= */

export const getStatusButton = (
  status: number,
) => {
  switch (status) {
    case 0:
      return "เตรียมเอกสารส่ง พฐ แล้ว";

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