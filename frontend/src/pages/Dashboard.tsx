import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import api from "../api/axios";

type Summary = {
  all: number;
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
};

type PersonRecord = {
  id?: string | number;
  ID?: string | number;
  personId?: string | number;
  personID?: string | number;
  P_ID?: string | number;
  prefix?: string;
  firstName?: string;
  firstname?: string;
  lastName?: string;
  lastname?: string;
  fullName?: string;
  name?: string;
  status?: string | number;
  personStatus?: string | number;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  requestDate?: string;
  date?: string;
  [key: string]: unknown;
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
    color: "text-white",
    bg: "bg-gradient-to-br from-[#a00036] to-[#650020]",
    bar: "bg-[#a00036]",
    cardBg: "bg-gradient-to-br from-[#fff7fa] to-white",
    border: "border-[#edc5d2]",
  },
  {
    title: "รอส่ง ศพฐ.",
    key: "s0" as const,
    href: "/person/history?status=0",
    icon: "wait",
    color: "text-white",
    bg: "bg-gradient-to-br from-[#f59e0b] to-[#c45b08]",
    bar: "bg-amber-500",
    cardBg: "bg-gradient-to-br from-[#fffaf0] to-white",
    border: "border-[#f5dfb2]",
  },
  {
    title: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
    key: "s1" as const,
    href: "/person/history?status=1",
    icon: "document",
    color: "text-white",
    bg: "bg-gradient-to-br from-[#4388ef] to-[#2451b8]",
    bar: "bg-blue-600",
    cardBg: "bg-gradient-to-br from-[#f3f7ff] to-white",
    border: "border-[#c9dafa]",
  },
  {
    title: "ส่ง ศพฐ. แล้ว",
    key: "s2" as const,
    href: "/person/history?status=2",
    icon: "send",
    color: "text-white",
    bg: "bg-gradient-to-br from-[#22a6d5] to-[#08769f]",
    bar: "bg-sky-500",
    cardBg: "bg-gradient-to-br from-[#effaff] to-white",
    border: "border-[#bde7f5]",
  },
  {
    title: "รับจาก ศพฐ. แล้ว",
    key: "s3" as const,
    href: "/person/history?status=3",
    icon: "check",
    color: "text-white",
    bg: "bg-gradient-to-br from-[#20b47b] to-[#08764e]",
    bar: "bg-emerald-500",
    cardBg: "bg-gradient-to-br from-[#effcf6] to-white",
    border: "border-[#bcebd5]",
  },
  {
    title: "ส่งคืนต้นสังกัด",
    key: "s4" as const,
    href: "/person/history?status=4",
    icon: "return",
    color: "text-white",
    bg: "bg-gradient-to-br from-[#9255e8] to-[#6026ad]",
    bar: "bg-violet-600",
    cardBg: "bg-gradient-to-br from-[#f8f3ff] to-white",
    border: "border-[#dfcef9]",
  },
];

const menuGroups = [
  {
    title: "ตรวจประวัติบุคคล",
    description: "จัดการข้อมูลและตรวจสอบประวัติบุคคล",
    icon: "user",
    theme: {
      bg: "bg-gradient-to-br from-[#a00036] to-[#650020]",
      soft: "bg-[#fff0f4]",
      text: "text-[#8b1239]",
      border: "border-[#f0cbd7]",
      hover: "group-hover:bg-[#fff5f8]",
    },
    menus: [
      {
        title: "เพิ่มข้อมูลบุคคล",
        description: "บันทึกข้อมูลบุคคลใหม่เข้าสู่ระบบ",
        href: "/person/create",
        icon: "user-plus",
      },
      {
        title: "ประวัติบุคคล",
        description: "ตรวจสอบและจัดการข้อมูลประวัติบุคคล",
        href: "/person/history",
        icon: "history",
      },
    ],
  },
  {
    title: "หนังสือส่ง ศพฐ.",
    description: "จัดทำหนังสือและตรวจสอบเอกสารนำส่ง",
    icon: "files",
    theme: {
      bg: "bg-gradient-to-br from-[#3479e8] to-[#1947a3]",
      soft: "bg-[#edf4ff]",
      text: "text-[#2459b7]",
      border: "border-[#cbdcf8]",
      hover: "group-hover:bg-[#f3f7ff]",
    },
    menus: [
      {
        title: "ออกเลขหนังสือ ศพฐ.",
        description: "จัดทำหนังสือนำส่งเอกสาร",
        href: "/forensic-submission",
        icon: "file-plus",
      },
      {
        title: "รายการหนังสือส่ง ศพฐ.",
        description: "ตรวจสอบรายการหนังสือที่นำส่งแล้ว",
        href: "/forensic-submission/list",
        icon: "files",
      },
      {
        title: "สแกนเอกสาร",
        description: "สแกนและจัดเก็บเอกสารในระบบ",
        href: "/forensic-scan",
        icon: "scan",
      },
    ],
  },
  {
    title: "ประวัติบุคคลต่างด้าว",
    description: "จัดการข้อมูลและประวัติบุคคลต่างด้าว",
    icon: "users",
    theme: {
      bg: "bg-gradient-to-br from-[#20a77c] to-[#08724f]",
      soft: "bg-[#eafaf3]",
      text: "text-[#087c56]",
      border: "border-[#bee9d6]",
      hover: "group-hover:bg-[#f0fcf6]",
    },
    menus: [
      {
        title: "เพิ่มบุคคลต่างด้าว",
        description: "บันทึกข้อมูลบุคคลต่างด้าวใหม่",
        href: "/foreigner/create",
        icon: "user-plus",
      },
      {
        title: "ประวัติต่างด้าว",
        description: "ตรวจสอบและจัดการประวัติบุคคลต่างด้าว",
        href: "/foreigner",
        icon: "users",
      },
    ],
  },
  {
    title: "ข้อมูลส่วนบุคคลและหน่วยงาน",
    description: "จัดการโปรไฟล์และข้อมูลหน่วยงาน",
    icon: "building",
    theme: {
      bg: "bg-gradient-to-br from-[#8c62d9] to-[#5633a0]",
      soft: "bg-[#f3efff]",
      text: "text-[#6742b0]",
      border: "border-[#d9cef5]",
      hover: "group-hover:bg-[#f8f5ff]",
    },
    menus: [
      {
        title: "โปรไฟล์บุคคล",
        description: "ดูและจัดการข้อมูลโปรไฟล์ส่วนบุคคล",
        href: "/profile",
        icon: "user",
      },
      {
        title: "ข้อมูลหน่วยงาน",
        description: "ดูและจัดการข้อมูลของหน่วยงาน",
        href: "/organization",
        icon: "building",
      },
    ],
  },
];

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
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
    case "clock":
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

function getPersonName(person: PersonRecord): string {
  const fullName = person.fullName || person.name;

  if (typeof fullName === "string" && fullName.trim()) {
    return fullName.trim();
  }

  const firstName =
    typeof person.firstName === "string"
      ? person.firstName
      : typeof person.firstname === "string"
        ? person.firstname
        : "";

  const lastName =
    typeof person.lastName === "string"
      ? person.lastName
      : typeof person.lastname === "string"
        ? person.lastname
        : "";

  const name = [person.prefix, firstName, lastName]
    .filter((part): part is string => typeof part === "string" && !!part.trim())
    .join(" ")
    .trim();

  return name || "ไม่ระบุชื่อ";
}

function getPersonStatus(person: PersonRecord): number {
  const value = person.status ?? person.personStatus;
  const status = Number(value);

  return Number.isInteger(status) ? status : -1;
}

function getPersonDate(person: PersonRecord): string {
  const value =
    person.requestDate ??
    person.createdAt ??
    person.created_at ??
    person.updatedAt ??
    person.date;

  if (typeof value !== "string" || !value.trim()) {
    return "ไม่ระบุวันที่";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  });
}

function getStatusInfo(status: number) {
  switch (status) {
    case 0:
      return {
        label: "รอส่ง ศพฐ.",
        className: "bg-amber-100 text-amber-900 ring-1 ring-amber-300",
        dot: "bg-amber-600",
      };
    case 1:
      return {
        label: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
        className: "bg-blue-100 text-blue-900 ring-1 ring-blue-300",
        dot: "bg-blue-600",
      };
    case 2:
      return {
        label: "ส่ง ศพฐ. แล้ว",
        className: "bg-sky-100 text-sky-900 ring-1 ring-sky-300",
        dot: "bg-sky-600",
      };
    case 3:
      return {
        label: "รับจาก ศพฐ. แล้ว",
        className: "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-300",
        dot: "bg-emerald-600",
      };
    case 4:
      return {
        label: "ส่งคืนต้นสังกัด",
        className: "bg-violet-100 text-violet-900 ring-1 ring-violet-300",
        dot: "bg-violet-600",
      };
    default:
      return {
        label: "ไม่ระบุสถานะ",
        className: "bg-gray-100 text-gray-800 ring-1 ring-gray-300",
        dot: "bg-gray-500",
      };
  }
}

export default function Dashboard() {
  const { admin } = useAuth();

  const [thaiTime, setThaiTime] = useState("");
  const [summary, setSummary] = useState<Summary>(initialSummary);
  const [recentRecords, setRecentRecords] = useState<PersonRecord[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(true);

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

      const time = now.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Bangkok",
      });

      setThaiTime(`${dayName}ที่ ${date} เวลา ${time} น.`);
    };

    updateTime();
    const timer = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoadingRecords(true);

      try {
        const res = await api.get("/person/getall");
        const raw = res.data;

        const list: PersonRecord[] = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
            ? raw.data
            : Array.isArray(raw?.items)
              ? raw.items
              : [];

        if (!active) return;

        setSummary({
          all: list.length,
          s0: list.filter((person) => getPersonStatus(person) === 0).length,
          s1: list.filter((person) => getPersonStatus(person) === 1).length,
          s2: list.filter((person) => getPersonStatus(person) === 2).length,
          s3: list.filter((person) => getPersonStatus(person) === 3).length,
          s4: list.filter((person) => getPersonStatus(person) === 4).length,
        });

        const sorted = [...list].sort((a, b) => {
          const dateA = new Date(
            String(
              a.createdAt ?? a.created_at ?? a.requestDate ?? a.date ?? "",
            ),
          ).getTime();

          const dateB = new Date(
            String(
              b.createdAt ?? b.created_at ?? b.requestDate ?? b.date ?? "",
            ),
          ).getTime();

          return (
            (Number.isNaN(dateB) ? 0 : dateB) -
            (Number.isNaN(dateA) ? 0 : dateA)
          );
        });

        setRecentRecords(sorted.slice(0, 6));
      } catch (error) {
        console.error("โหลดข้อมูล Dashboard ไม่สำเร็จ:", error);

        if (active) {
          setSummary(initialSummary);
          setRecentRecords([]);
        }
      } finally {
        if (active) setLoadingRecords(false);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#eef1f6] text-[#252b35]">
      <main className="mx-auto w-full max-w-[1480px] px-4 py-6 sm:px-6 lg:px-9 lg:py-8">
        <header className="mb-7 flex flex-col gap-4 border-b border-[#d9dfe9] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[3px] w-8 rounded-full bg-[#a00036]" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8b1239]">
                Mueang Chonburi Police Station
              </p>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#202b40] sm:text-3xl">
              หน้าหลัก
            </h1>

            <p className="mt-2 text-sm text-[#536176]">
              ภาพรวมข้อมูลและการดำเนินงานภายในระบบ
            </p>
          </div>

          <div className="flex w-full items-center gap-3 rounded-xl border border-[#dce2ec] bg-white px-4 py-3 shadow-sm sm:w-auto sm:min-w-[270px]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#a00036] to-[#650020] text-white shadow-sm">
              <Icon name="user" size={23} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-base font-bold text-[#26344a]">
                {admin?.name || admin?.username || "เจ้าหน้าที่"}
              </p>
              <p className="mt-1 truncate text-sm text-[#647188]">
                {admin?.position || "ไม่ระบุตำแหน่ง"}
              </p>
            </div>

            <span className="ml-auto h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
          </div>
        </header>

        <section className="mb-9 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          <div className="relative flex min-h-[195px] flex-col justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#172942] via-[#203d60] to-[#31567a] px-6 py-8 text-white shadow-[0_8px_25px_rgba(23,41,66,0.18)] sm:px-9">
            <div className="absolute -right-12 -top-28 h-72 w-72 rounded-full border-[35px] border-white/[0.06]" />
            <div className="absolute -right-3 top-12 h-36 w-36 rounded-full border border-white/[0.12]" />
            <div className="absolute bottom-0 right-1/4 h-32 w-32 rounded-full bg-[#c5a15e]/10 blur-2xl" />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d9bd83]/30 bg-[#d9bd83]/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e6c77f]" />
                <p className="text-xs font-semibold text-[#f1dcae]">
                  ยินดีต้อนรับกลับมา
                </p>
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                {admin?.name || "เจ้าหน้าที่"}
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#e1e9f3]">
                จัดการข้อมูลบุคคล ตรวจสอบสถานะเอกสาร และดำเนินงานผ่านเมนูต่าง ๆ
                ได้จากหน้าหลักนี้
              </p>
            </div>

            <div className="absolute bottom-0 left-0 h-1 w-28 bg-gradient-to-r from-[#e6c77f] to-transparent" />
          </div>

          <div className="relative overflow-hidden rounded-xl border border-[#dce2ec] bg-white p-5 shadow-sm">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#e9f1ff] opacity-70" />

            <div className="relative flex items-center justify-between">
              <p className="text-sm font-bold text-[#3d4c62]">
                วันและเวลาประเทศไทย
              </p>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#4388ef] to-[#2451b8] text-white shadow-sm">
                <Icon name="clock" size={22} />
              </div>
            </div>

            <div className="relative mt-6">
              <p className="text-base font-bold leading-7 text-[#26344a]">
                {thaiTime || "กำลังโหลดเวลา..."}
              </p>
            </div>

            <div className="relative mt-5 h-1 overflow-hidden rounded-full bg-[#e9eff8]">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#4388ef] to-[#7cb5ff]" />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-[#a00036]" />
                <h2 className="text-xl font-bold text-[#202b40] sm:text-2xl">
                  สรุปสถานะข้อมูล
                </h2>
              </div>

              <p className="mt-2 text-sm text-[#536176]">
                จำนวนรายการบุคคลแยกตามขั้นตอนการดำเนินงาน
              </p>
            </div>

            <Link
              to="/person/history"
              className="inline-flex items-center gap-2 rounded-lg border border-[#e6cbd4] bg-white px-4 py-2.5 text-sm font-bold text-[#8b1239] shadow-sm transition hover:border-[#a00036] hover:bg-[#fff1f5]"
            >
              ดูรายการทั้งหมด
              <Icon name="arrow" size={17} />
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
                  className={`group relative overflow-hidden rounded-xl border ${item.border} ${item.cardBg} p-5 shadow-[0_3px_10px_rgba(30,45,70,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(30,45,70,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2 sm:p-6`}
                >
                  <div
                    className={`absolute left-0 top-0 h-full w-1 ${item.bar}`}
                  />

                  <div className="flex items-start justify-between gap-3">
                    <p className="min-h-12 flex-1 text-base font-bold leading-7 text-[#303b4e]">
                      {item.title}
                    </p>

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color} shadow-sm transition-transform group-hover:scale-110`}
                    >
                      <Icon name={item.icon} size={24} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-2">
                    <p className="text-4xl font-bold leading-none tracking-tight text-[#202b40] tabular-nums sm:text-[42px]">
                      {value.toLocaleString("th-TH")}
                    </p>

                    <span className="mb-1 inline-flex items-center gap-1 text-sm font-bold text-[#536176] transition-colors group-hover:text-[#800020]">
                      ดูรายละเอียด
                      <Icon name="arrow" size={15} />
                    </span>
                  </div>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#e6eaf0]">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${item.bar}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-[#536176]">
                    {percentage.toFixed(1)}% ของข้อมูลทั้งหมด
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-[#3479e8]" />
                <h2 className="text-xl font-bold text-[#202b40] sm:text-2xl">
                  รายการบุคคลล่าสุด
                </h2>
              </div>

              <p className="mt-2 text-sm text-[#536176]">
                รายการข้อมูลที่บันทึกไว้ในระบบ
              </p>
            </div>

            <Link
              to="/person/history"
              className="inline-flex items-center gap-2 rounded-lg border border-[#cbdcf8] bg-white px-4 py-2.5 text-sm font-bold text-[#2459b7] shadow-sm transition hover:bg-[#edf4ff]"
            >
              ดูประวัติทั้งหมด
              <Icon name="arrow" size={17} />
            </Link>
          </div>

          {loadingRecords ? (
            <div className="rounded-xl border border-[#dce2ec] bg-white px-4 py-16 text-center shadow-sm">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-[3px] border-[#dce8fb] border-t-[#3479e8]" />
              <p className="mt-4 text-sm font-semibold text-[#536176]">
                กำลังโหลดข้อมูล...
              </p>
            </div>
          ) : recentRecords.length === 0 ? (
            <div className="rounded-xl border border-[#dce2ec] bg-white px-4 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#edf4ff] text-[#3479e8]">
                <Icon name="files" size={26} />
              </div>

              <p className="mt-4 text-base font-bold text-[#303b4e]">
                ยังไม่มีข้อมูลบุคคล
              </p>

              <p className="mt-2 text-sm text-[#536176]">
                เมื่อมีการบันทึกข้อมูล รายการจะแสดงที่นี่
              </p>

              <Link
                to="/person/create"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#a00036] to-[#650020] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110"
              >
                <Icon name="user-plus" size={18} />
                เพิ่มข้อมูลบุคคล
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-[#dce2ec] bg-white shadow-sm">
              <div className="hidden grid-cols-[1fr_200px_220px] border-b border-[#e3e8f0] bg-[#f3f6fb] px-6 py-4 text-sm font-bold text-[#35445b] sm:grid">
                <span>ชื่อ - นามสกุล</span>
                <span>วันที่บันทึก</span>
                <span>สถานะ</span>
              </div>

              <div className="divide-y divide-[#e7ebf1]">
                {recentRecords.map((person, index) => {
                  const recordId =
                    person.id ??
                    person.ID ??
                    person.personId ??
                    person.personID ??
                    person.P_ID;

                  const status = getStatusInfo(getPersonStatus(person));

                  return (
                    <article
                      key={
                        recordId != null ? String(recordId) : `person-${index}`
                      }
                      className="grid grid-cols-1 gap-3 px-4 py-4 transition-colors hover:bg-[#f7f9fd] sm:grid-cols-[1fr_200px_220px] sm:items-center sm:px-6"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f8e9ef] to-[#f0d6e0] text-base font-bold text-[#8b1239]">
                          {getPersonName(person).charAt(0)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-base font-bold text-[#303b4e]">
                            {getPersonName(person)}
                          </p>

                          <p className="mt-1 text-sm text-[#536176] sm:hidden">
                            วันที่: {getPersonDate(person)}
                          </p>
                        </div>
                      </div>

                      <p className="hidden text-sm font-medium text-[#536176] sm:block">
                        {getPersonDate(person)}
                      </p>

                      <div className="flex items-center justify-between gap-3 sm:justify-start">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold ${status.className}`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${status.dot}`}
                          />
                          {status.label}
                        </span>

                        <Link
                          to={
                            recordId != null
                              ? `/person/${encodeURIComponent(String(recordId))}`
                              : "/person/history"
                          }
                          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-[#2459b7] transition-colors hover:text-[#123b89]"
                        >
                          รายละเอียด
                          <Icon name="arrow" size={16} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <div className="flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-[#20a77c]" />
              <h2 className="text-xl font-bold text-[#202b40] sm:text-2xl">
                เมนูการทำงาน
              </h2>
            </div>

            <p className="mt-2 text-sm text-[#536176]">
              เลือกหมวดหมู่เพื่อเข้าสู่ระบบงานที่ต้องการ
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {menuGroups.map((group, groupIndex) => (
              <section
                key={group.title}
                className="overflow-hidden rounded-xl border border-[#dce2ec] bg-white shadow-[0_3px_10px_rgba(30,45,70,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(30,45,70,0.09)]"
              >
                <div className="relative flex items-center gap-4 overflow-hidden border-b border-[#e5e9f0] bg-[#f8f9fc] px-5 py-5 sm:px-6">
                  <div
                    className={`absolute left-0 top-0 h-full w-1.5 ${group.theme.bg}`}
                  />

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${group.theme.bg} text-white shadow-md`}
                  >
                    <Icon name={group.icon} size={25} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold leading-7 text-[#26344a] sm:text-lg">
                      {group.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#536176]">
                      {group.description}
                    </p>
                  </div>

                  <span
                    className={`hidden text-xl font-bold tabular-nums sm:block ${group.theme.text} opacity-70`}
                  >
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="divide-y divide-[#e5e9f0]">
                  {group.menus.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`group flex min-w-0 items-center gap-4 px-5 py-5 transition-colors ${group.theme.hover} sm:px-6 sm:py-6`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e2e7ef] bg-[#f7f8fb] text-[#536176] transition-all group-hover:border-transparent ${group.theme.text} group-hover:${group.theme.soft}`}
                      >
                        <Icon name={item.icon} size={22} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-base font-bold leading-7 text-[#303b4e] transition-colors ${group.theme.text}`}
                        >
                          {item.title}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-[#536176]">
                          {item.description}
                        </p>
                      </div>

                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#8793a5] transition-all group-hover:translate-x-1 ${group.theme.text} group-hover:${group.theme.soft}`}
                      >
                        <Icon name="arrow" size={19} />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
