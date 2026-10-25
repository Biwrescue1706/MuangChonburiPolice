
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

const stats = [
  {
    key: "all",
    title: "ข้อมูลทั้งหมด",
    href: "/person/history",
    icon: "layers",
    color: "#800020",
    soft: "#f7e9ed",
    bar: "bg-[#800020]",
  },
  {
    key: "s0",
    title: "รอส่ง ศพฐ.",
    href: "/person/history?status=0",
    icon: "clock",
    color: "#b7791f",
    soft: "#fff4dc",
    bar: "bg-amber-600",
  },
  {
    key: "s1",
    title: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
    href: "/person/history?status=1",
    icon: "file",
    color: "#5268a5",
    soft: "#edf0fb",
    bar: "bg-blue-600",
  },
  {
    key: "s2",
    title: "ส่ง ศพฐ. แล้ว",
    href: "/person/history?status=2",
    icon: "send",
    color: "#357d9b",
    soft: "#e7f4f8",
    bar: "bg-sky-600",
  },
  {
    key: "s3",
    title: "รับจาก ศพฐ. แล้ว",
    href: "/person/history?status=3",
    icon: "check",
    color: "#328267",
    soft: "#e7f5ee",
    bar: "bg-emerald-600",
  },
  {
    key: "s4",
    title: "ส่งคืนต้นสังกัด",
    href: "/person/history?status=4",
    icon: "return",
    color: "#7864a8",
    soft: "#f0ecf8",
    bar: "bg-violet-600",
  },
] as const;

const menuGroups = [
  {
    title: "งานข้อมูลบุคคล",
    subtitle: "PERSONNEL RECORDS",
    items: [
      {
        title: "เพิ่มข้อมูลบุคคล",
        description: "ลงทะเบียนข้อมูลบุคคลใหม่",
        href: "/person/create",
        icon: "user-plus",
      },
      {
        title: "ประวัติบุคคล",
        description: "ค้นหาและจัดการข้อมูลบุคคล",
        href: "/person/history",
        icon: "users",
      },
      {
        title: "เพิ่มบุคคลต่างด้าว",
        description: "บันทึกข้อมูลบุคคลต่างด้าว",
        href: "/foreigner/create",
        icon: "globe",
      },
      {
        title: "ประวัติต่างด้าว",
        description: "ตรวจสอบรายการและประวัติ",
        href: "/foreigner",
        icon: "folder",
      },
    ],
  },
  {
    title: "งานเอกสารและ ศพฐ.",
    subtitle: "DOCUMENT SERVICES",
    items: [
      {
        title: "ออกเลขหนังสือนำส่ง",
        description: "จัดทำหนังสือนำส่ง ศพฐ.",
        href: "/forensic-submission",
        icon: "file-plus",
      },
      {
        title: "รายการหนังสือนำส่ง",
        description: "ตรวจสอบหนังสือที่บันทึกไว้",
        href: "/forensic-submission/list",
        icon: "file-list",
      },
      {
        title: "สแกนเอกสาร",
        description: "เข้าสู่ระบบสแกนและจัดการเอกสาร",
        href: "/forensic-scan",
        icon: "scan",
      },
    ],
  },
  {
    title: "ข้อมูลและการตั้งค่า",
    subtitle: "SYSTEM MANAGEMENT",
    items: [
      {
        title: "ข้อมูลหน่วยงาน",
        description: "จัดการข้อมูลของหน่วยงาน",
        href: "/organization",
        icon: "building",
      },
      {
        title: "โปรไฟล์บุคคล",
        description: "ดูและแก้ไขข้อมูลโปรไฟล์",
        href: "/profile",
        icon: "user",
      },
    ],
  },
];

function Icon({
  name,
  size = 22,
}: {
  name: string;
  size?: number;
}) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "layers":
      return (
        <svg {...props}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
        </svg>
      );

    case "clock":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "file":
      return (
        <svg {...props}>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v5h4M9 12h6M9 16h6" />
        </svg>
      );

    case "send":
      return (
        <svg {...props}>
          <path d="m21 3-7.5 18-3.5-8L3 9.5z" />
          <path d="M21 3 10 13" />
        </svg>
      );

    case "check":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      );

    case "return":
      return (
        <svg {...props}>
          <path d="m9 6-5 5 5 5M4 11h10a5 5 0 0 1 5 5v2" />
        </svg>
      );

    case "user-plus":
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M3 20c.5-3.4 2.7-5.5 6-5.5 2 0 3.6.7 4.7 2M19 8v6m-3-3h6" />
        </svg>
      );

    case "users":
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M2.5 20c.4-3.5 2.7-5.5 6.5-5.5s6.1 2 6.5 5.5M16 5.5a3 3 0 0 1 0 5.8M18 14a4 4 0 0 1 3.5 4" />
        </svg>
      );

    case "globe":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );

    case "folder":
      return (
        <svg {...props}>
          <path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      );

    case "file-plus":
      return (
        <svg {...props}>
          <path d="M6 3h8l4 4v14H6zM14 3v5h4M9 13h6m-3-3v6" />
        </svg>
      );

    case "file-list":
      return (
        <svg {...props}>
          <path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6" />
        </svg>
      );

    case "scan":
      return (
        <svg {...props}>
          <path d="M4 8V5a1 1 0 0 1 1-1h3m8 0h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3m-8 0H5a1 1 0 0 1-1-1v-3M7 12h10" />
        </svg>
      );

    case "building":
      return (
        <svg {...props}>
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5" />
          <path d="M8 9h1m3 0h1m3 0h1M8 12h1m3 0h1m3 0h1" />
        </svg>
      );

    case "user":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M4.5 20c.7-3.2 3.3-5 7.5-5s6.8 1.8 7.5 5" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...props}>
          <path d="M5 12h14m-6-6 6 6-6 6" />
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

  const currentYear = new Intl.DateTimeFormat(
    "th-TH-u-ca-buddhist",
    {
      year: "numeric",
      timeZone: "Asia/Bangkok",
    }
  ).format(new Date());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const day = now.toLocaleDateString("th-TH", {
        weekday: "long",
        timeZone: "Asia/Bangkok",
      });

      const date = now.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Bangkok",
      });

      const time = now.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Bangkok",
      });

      setThaiTime(`${day}ที่ ${date} · ${time} น.`);
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
      } catch (error) {
        console.error("โหลดข้อมูลไม่สำเร็จ:", error);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f4f5f7] text-[#25252a]">
      <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 sm:py-7 xl:px-9">
        {/* Header */}
        <header className="relative isolate overflow-hidden rounded-2xl bg-[#71001d] text-white">
          <div className="pointer-events-none absolute -right-12 -top-28 h-80 w-80 rounded-full border border-white/[0.09]" />
          <div className="pointer-events-none absolute -right-2 -top-16 h-64 w-64 rounded-full border border-white/[0.07]" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-1 w-1/3 bg-white/10" />

          <div className="relative flex flex-col gap-7 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-9">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                <span className="h-2 w-2 rounded-full bg-[#e8c6a2]" />
                Management System
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                หน้าหลัก
              </h1>

              <p className="mt-2 text-sm text-white/75 sm:text-base">
                ระบบบริหารจัดการข้อมูลและเอกสาร
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="flex items-center gap-2">
                  <Icon name="user" size={17} />
                  {admin?.name || "เจ้าหน้าที่"}
                </span>

                <span className="hidden h-4 w-px bg-white/30 sm:block" />

                <span className="text-white/75">
                  {admin?.position || "ไม่ระบุตำแหน่ง"}
                </span>
              </div>
            </div>

            <div className="w-full rounded-xl border border-white/15 bg-black/10 p-4 sm:p-5 lg:w-[340px]">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon name="clock" size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-white/65">
                    วันและเวลาประเทศไทย
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-6">
                    {thaiTime || "กำลังโหลดเวลา..."}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-white/15 pt-3 text-xs text-white/60">
                ยินดีต้อนรับเข้าสู่ระบบ
              </div>
            </div>
          </div>
        </header>

        {/* Overview */}
        <section className="mt-8">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#800020]">
                Overview
              </div>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                ภาพรวมการดำเนินงาน
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                สรุปรายการบุคคลตามสถานะการดำเนินงาน
              </p>
            </div>

            <Link
              to="/person/history"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:border-[#800020] hover:text-[#800020]"
            >
              ดูข้อมูลทั้งหมด
              <Icon name="arrow" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3">
            {stats.map((item) => {
              const value = summary[item.key as keyof Summary];

              const percentage =
                summary.all > 0
                  ? Math.min((value / summary.all) * 100, 100)
                  : 0;

              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className="group relative overflow-hidden rounded-xl border border-gray-200/90 bg-white p-5 no-underline transition duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_8px_24px_rgba(30,30,30,0.06)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          color: item.color,
                          backgroundColor: item.soft,
                        }}
                      >
                        <Icon name={item.icon} size={22} />
                      </div>

                      <p className="text-sm font-semibold leading-5 text-gray-600">
                        {item.title}
                      </p>
                    </div>

                    <span className="shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-[#800020]">
                      <Icon name="arrow" size={18} />
                    </span>
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-3">
                    <p className="text-4xl font-bold tracking-tight text-gray-900">
                      {value.toLocaleString("th-TH")}
                    </p>

                    <p className="mb-1 text-xs tabular-nums text-gray-400">
                      {percentage.toFixed(0)}%
                    </p>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.bar}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quick Access */}
        <section className="mt-10">
          <div className="mb-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#800020]">
              Quick Access
            </div>

            <h2 className="mt-1 text-xl font-bold text-gray-900">
              เมนูการทำงาน
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              เข้าถึงเครื่องมือที่ใช้ในงานประจำได้โดยตรง
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
            {menuGroups.map((group, groupIndex) => (
              <section
                key={group.title}
                className={`overflow-hidden rounded-xl border border-gray-200 bg-white ${
                  groupIndex === 2 ? "xl:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      {group.title}
                    </h3>

                    <p className="mt-1 text-[9px] font-semibold tracking-[0.16em] text-gray-400">
                      {group.subtitle}
                    </p>
                  </div>

                  <div className="h-8 w-1 rounded-full bg-[#800020]" />
                </div>

                <div
                  className={`grid grid-cols-1 ${
                    groupIndex === 2
                      ? "sm:grid-cols-2 xl:grid-cols-3"
                      : "sm:grid-cols-2"
                  }`}
                >
                  {group.items.map((item, index) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`group flex min-w-0 items-center gap-3 p-4 no-underline transition-colors hover:bg-[#fbf7f8] sm:p-5 ${
                        index !== 0 ? "border-t border-gray-100" : ""
                      } ${
                        index % 2 !== 0
                          ? "sm:border-l sm:border-gray-100"
                          : ""
                      }`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f7eaee] text-[#800020] transition-colors group-hover:bg-[#800020] group-hover:text-white">
                        <Icon name={item.icon} size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-800">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {item.description}
                        </p>
                      </div>

                      <span className="shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#800020]">
                        <Icon name="arrow" size={17} />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        {/* Footer: แสดงเฉพาะหน้าจอ Desktop ตั้งแต่ 1280px */}
        <footer className="mt-12 hidden flex-col items-center py-8 text-center xl:flex">
          <div className="mb-6 flex w-full max-w-xs items-center gap-5">
            <div className="h-px flex-1 bg-sky-200" />

            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
              <span className="text-2xl text-blue-600">✦</span>
            </div>

            <div className="h-px flex-1 bg-sky-200" />
          </div>

          <p className="text-sm leading-7 text-gray-700">
            <span className="font-semibold text-gray-900">
              © 2569 - {currentYear}
            </span>{" "}
            <span className="font-medium text-blue-600">
              งานพิมพ์มือตรวจประวัติ
            </span>
          </p>

          <p className="text-sm leading-7 text-gray-700">
            พัฒนาโดย{" "}
            <span className="font-medium text-blue-600">
              งานนโยบายและแผน
            </span>{" "}
            สภ.เมืองชลบุรี
          </p>

          <p className="mt-2 text-xs text-gray-500">
            สงวนลิขสิทธิ์ทุกประการ
          </p>

          <div className="mt-6 h-1 w-36 rounded-full bg-sky-600" />
        </footer>
      </div>
    </main>
  );
}
