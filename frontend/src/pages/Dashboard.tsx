// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

type Summary = {
  all: number;
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
};

const initialSummary: Summary = {
  all: 0,
  s0: 0,
  s1: 0,
  s2: 0,
  s3: 0,
  s4: 0,
};

const summaryCards = [
  {
    title: "ข้อมูลทั้งหมด",
    key: "all" as const,
    href: "/person/history",
    icon: "all",
    color: "text-[#800020]",
    bg: "bg-[#f8e9ee]",
  },
  {
    title: "รอส่ง ศพฐ.",
    key: "s0" as const,
    href: "/person/history?status=0",
    icon: "wait",
    color: "text-amber-700",
    bg: "bg-amber-50",
  },
  {
    title: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
    key: "s1" as const,
    href: "/person/history?status=1",
    icon: "document",
    color: "text-blue-700",
    bg: "bg-blue-50",
  },
  {
    title: "ส่ง ศพฐ. แล้ว",
    key: "s2" as const,
    href: "/person/history?status=2",
    icon: "send",
    color: "text-sky-700",
    bg: "bg-sky-50",
  },
  {
    title: "รับจาก ศพฐ. แล้ว",
    key: "s3" as const,
    href: "/person/history?status=3",
    icon: "check",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
  },
  {
    title: "ส่งคืนต้นสังกัด",
    key: "s4" as const,
    href: "/person/history?status=4",
    icon: "return",
    color: "text-violet-700",
    bg: "bg-violet-50",
  },
];

const quickMenus = [
  {
    title: "เพิ่มข้อมูลบุคคล",
    description: "บันทึกข้อมูลบุคคลใหม่",
    href: "/person/create",
    icon: "user-plus",
  },
  {
    title: "เพิ่มบุคคลต่างด้าว",
    description: "บันทึกข้อมูลบุคคลต่างด้าว",
    href: "/foreigner/create",
    icon: "user-plus",
  },
  {
    title: "ประวัติบุคคล",
    description: "ดูและจัดการข้อมูลประวัติ",
    href: "/person/history",
    icon: "history",
  },
  {
    title: "ประวัติต่างด้าว",
    description: "ดูและจัดการข้อมูลต่างด้าว",
    href: "/foreigner",
    icon: "users",
  },
  {
    title: "ออกเลขหนังสือส่ง ศพฐ.",
    description: "จัดทำหนังสือนำส่งเอกสาร",
    href: "/forensic-submission",
    icon: "file-plus",
  },
  {
    title: "รายการหนังสือส่ง ศพฐ.",
    description: "ตรวจสอบรายการหนังสือนำส่ง",
    href: "/forensic-submission/list",
    icon: "files",
  },
  {
    title: "สแกนเอกสาร",
    description: "สแกนและจัดการเอกสาร",
    href: "/forensic-scan",
    icon: "scan",
  },
  {
    title: "ข้อมูลหน่วยงาน",
    description: "จัดการข้อมูลหน่วยงาน",
    href: "/organization",
    icon: "building",
  },
  {
    title: "โปรไฟล์บุคคล",
    description: "ดูและจัดการโปรไฟล์บุคคล",
    href: "/profile",
    icon: "user",
  },
];

function Icon({
  name,
  size = 22,
}: {
  name: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "all":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 9h8M8 13h8M8 17h5" />
        </svg>
      );

    case "wait":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "document":
      return (
        <svg {...common}>
          <path d="M6 3.5h8l4 4V20H6z" />
          <path d="M14 3.5V8h4M9 12h6M9 15.5h6" />
        </svg>
      );

    case "send":
      return (
        <svg {...common}>
          <path d="m21 3-7.5 18-3.5-8L3 9.5z" />
          <path d="M21 3 10 13" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m8.5 12 2.3 2.4 4.8-5" />
        </svg>
      );

    case "return":
      return (
        <svg {...common}>
          <path d="M9 6 4 11l5 5" />
          <path d="M4 11h10a5 5 0 0 1 5 5v2" />
        </svg>
      );

    case "user-plus":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20c.5-3.5 2.8-5.5 6.5-5.5 2 0 3.6.6 4.7 1.7M19 8v6M16 11h6" />
        </svg>
      );

    case "history":
      return (
        <svg {...common}>
          <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" />
          <path d="M3 3v5h5M12 7v5l3 2" />
        </svg>
      );

    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5.5a3 3 0 0 1 0 5.8M18 14a4 4 0 0 1 3 4v2" />
        </svg>
      );

    case "file-plus":
      return (
        <svg {...common}>
          <path d="M6 3.5h8l4 4V20H6z" />
          <path d="M14 3.5V8h4M9 13h6M12 10v6" />
        </svg>
      );

    case "files":
      return (
        <svg {...common}>
          <path d="M7 4h11v16H7z" />
          <path d="M4 7v14h11M10 9h5M10 13h5M10 17h4" />
        </svg>
      );

    case "scan":
      return (
        <svg {...common}>
          <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M7 12h10" />
        </svg>
      );

    case "building":
      return (
        <svg {...common}>
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5" />
          <path d="M8 9h1M12 9h1M16 9h1M8 12h1M12 12h1M16 12h1" />
        </svg>
      );

    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M4.5 20c.7-3.2 3.3-5 7.5-5s6.8 1.8 7.5 5" />
        </svg>
      );

    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );

    default:
      return null;
  }
}

export default function Dashboard() {
  const { admin } = useAuth();
  const [thaiTime, setThaiTime] = useState("");
  const [summary, setSummary] = useState<Summary>(initialSummary);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const dayName = now.toLocaleDateString("th-TH", {
        weekday: "long",
        timeZone: "Asia/Bangkok",
      });

      const date = now.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Bangkok",
      });

      const time = now
        .toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Bangkok",
        })
        .replace(/:/g, ".");

      setThaiTime(`${dayName}ที่ ${date} เวลา ${time} น.`);
    };

    updateTime();
    const timer = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const res = await api.get("/person/getall");
        const raw = res.data;

        const list = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
            ? raw.data
            : [];

        if (!active) return;

        setSummary({
          all: list.length,
          s0: list.filter((p: any) => Number(p.status) === 0).length,
          s1: list.filter((p: any) => Number(p.status) === 1).length,
          s2: list.filter((p: any) => Number(p.status) === 2).length,
          s3: list.filter((p: any) => Number(p.status) === 3).length,
          s4: list.filter((p: any) => Number(p.status) === 4).length,
        });
      } catch (err) {
        console.error("โหลดข้อมูลไม่สำเร็จ:", err);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-gray-800">
      <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Page heading */}
        <header className="mb-7 flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#800020]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#800020]" />
              Dashboard
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              หน้าหลัก
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              ภาพรวมข้อมูลและเมนูการทำงานของระบบ
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f8e9ee] text-[#800020]">
              <Icon name="user" size={21} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">
                {admin?.name || "-"}
              </p>
              <p className="mt-0.5 truncate text-xs text-gray-500">
                {admin?.position || "ไม่ระบุตำแหน่ง"}
              </p>
            </div>
          </div>
        </header>

        {/* Welcome and current time */}
        <section className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
          <div className="flex flex-col justify-center rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <p className="text-sm text-gray-500">ยินดีต้อนรับกลับมา</p>

            <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
              {admin?.name || "เจ้าหน้าที่"}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              จัดการข้อมูลบุคคล ตรวจสอบสถานะเอกสาร และดำเนินงานผ่านเมนูต่าง ๆ
              ได้จากหน้าหลักนี้
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#800020] text-white">
              <Icon name="clock" size={24} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-500">
                วันและเวลาประเทศไทย
              </p>

              <p className="mt-1 text-sm font-semibold leading-6 text-gray-800">
                {thaiTime || "กำลังโหลดเวลา..."}
              </p>
            </div>
          </div>
        </section>

        {/* Summary heading */}
        <section>
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                สรุปสถานะข้อมูล
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                จำนวนรายการบุคคลแยกตามสถานะการดำเนินงาน
              </p>
            </div>

            <Link
              to="/person/history"
              className="mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#800020] transition-colors hover:text-[#a00029] sm:mt-0"
            >
              ดูข้อมูลทั้งหมด
              <Icon name="arrow" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
            {summaryCards.map((item) => {
              const value = summary[item.key];
              const percentage =
                summary.all > 0
                  ? Math.min((value / summary.all) * 100, 100)
                  : 0;

              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className="group rounded-xl border border-gray-200 bg-white p-5 no-underline transition-colors duration-200 hover:border-[#c99aa8] hover:bg-[#fffdfd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-h-10 items-center">
                      <span className="text-sm font-medium leading-5 text-gray-600">
                        {item.title}
                      </span>
                    </div>

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.color}`}
                    >
                      <Icon name={item.icon} size={21} />
                    </div>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-3">
                    <p className="text-3xl font-bold tabular-nums tracking-tight text-gray-900">
                      {value.toLocaleString("th-TH")}
                    </p>

                    <span className="mb-1 text-xs text-gray-400 transition-colors group-hover:text-[#800020]">
                      ดูรายละเอียด
                    </span>
                  </div>

                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.key === "all"
                          ? "bg-[#800020]"
                          : item.color.replace("text-", "bg-")
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quick menu */}
        <section className="mt-9">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              เมนูการทำงาน
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              เลือกเมนูเพื่อเข้าสู่การทำงานที่ต้องการ
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3">
            {quickMenus.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="group flex min-w-0 items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 no-underline transition-colors duration-200 hover:border-[#c99aa8] hover:bg-[#fffdfd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2 sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f8e9ee] text-[#800020] transition-colors group-hover:bg-[#800020] group-hover:text-white">
                  <Icon name={item.icon} size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {item.description}
                  </p>
                </div>

                <div className="shrink-0 text-gray-300 transition-colors group-hover:text-[#800020]">
                  <Icon name="arrow" size={18} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-gray-200 pt-5">
          <p className="text-center text-xs text-gray-400">
            ระบบจัดการข้อมูลและเอกสาร
          </p>
        </footer>
      </main>
    </div>
  );
}