
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
    color: "text-[#800020]",
    bg: "bg-[#f8e9ee]",
    bar: "bg-[#800020]",
  },
  {
    title: "รอส่ง ศพฐ.",
    key: "s0" as const,
    href: "/person/history?status=0",
    icon: "wait",
    color: "text-amber-700",
    bg: "bg-amber-50",
    bar: "bg-amber-500",
  },
  {
    title: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
    key: "s1" as const,
    href: "/person/history?status=1",
    icon: "document",
    color: "text-blue-700",
    bg: "bg-blue-50",
    bar: "bg-blue-500",
  },
  {
    title: "ส่ง ศพฐ. แล้ว",
    key: "s2" as const,
    href: "/person/history?status=2",
    icon: "send",
    color: "text-sky-700",
    bg: "bg-sky-50",
    bar: "bg-sky-500",
  },
  {
    title: "รับจาก ศพฐ. แล้ว",
    key: "s3" as const,
    href: "/person/history?status=3",
    icon: "check",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    bar: "bg-emerald-500",
  },
  {
    title: "ส่งคืนต้นสังกัด",
    key: "s4" as const,
    href: "/person/history?status=4",
    icon: "return",
    color: "text-violet-700",
    bg: "bg-violet-50",
    bar: "bg-violet-500",
  },
];

const menuGroups = [
  {
    title: "ตรวจประวัติส่วนตัวเพื่อตรวจประวัติ",
    description: "จัดการข้อมูลและตรวจสอบประวัติบุคคล",
    icon: "user",
    menus: [
      {
        title: "เพิ่มข้อมูลบุคคล",
        description: "บันทึกข้อมูลบุคคลใหม่",
        href: "/person/create",
        icon: "user-plus",
      },
      {
        title: "ประวัติบุคคล",
        description: "ดูและจัดการข้อมูลประวัติบุคคล",
        href: "/person/history",
        icon: "history",
      },
    ],
  },
  {
    title: "หนังสือส่ง ศพฐ.",
    description: "จัดทำและตรวจสอบเอกสารนำส่ง",
    icon: "files",
    menus: [
      {
        title: "ออกเลขหนังสือ ศพฐ.",
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
    ],
  },
  {
    title: "ประวัติบุคคลต่างด้าว",
    description: "จัดการข้อมูลและประวัติบุคคลต่างด้าว",
    icon: "users",
    menus: [
      {
        title: "เพิ่มบุคคลต่างด้าว",
        description: "บันทึกข้อมูลบุคคลต่างด้าวใหม่",
        href: "/foreigner/create",
        icon: "user-plus",
      },
      {
        title: "ประวัติต่างด้าว",
        description: "ดูและจัดการประวัติบุคคลต่างด้าว",
        href: "/foreigner",
        icon: "users",
      },
    ],
  },
  {
    title: "ข้อมูลส่วนบุคคลและข้อมูลหน่วยงาน",
    description: "จัดการโปรไฟล์และข้อมูลหน่วยงาน",
    icon: "building",
    menus: [
      {
        title: "โปรไฟล์บุคคล",
        description: "ดูและจัดการโปรไฟล์บุคคล",
        href: "/profile",
        icon: "user",
      },
      {
        title: "ข้อมูลหน่วยงาน",
        description: "ดูและจัดการข้อมูลหน่วยงาน",
        href: "/organization",
        icon: "building",
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
        className: "bg-amber-50 text-amber-700",
      };
    case 1:
      return {
        label: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
        className: "bg-blue-50 text-blue-700",
      };
    case 2:
      return {
        label: "ส่ง ศพฐ. แล้ว",
        className: "bg-sky-50 text-sky-700",
      };
    case 3:
      return {
        label: "รับจาก ศพฐ. แล้ว",
        className: "bg-emerald-50 text-emerald-700",
      };
    case 4:
      return {
        label: "ส่งคืนต้นสังกัด",
        className: "bg-violet-50 text-violet-700",
      };
    default:
      return {
        label: "ไม่ระบุสถานะ",
        className: "bg-gray-100 text-gray-600",
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
            String(a.createdAt ?? a.created_at ?? a.requestDate ?? a.date ?? ""),
          ).getTime();

          const dateB = new Date(
            String(b.createdAt ?? b.created_at ?? b.requestDate ?? b.date ?? ""),
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
    <div className="min-h-screen bg-[#f5f6f8] text-gray-800">
      <main className="mx-auto w-full max-w-[1440px] px-3 py-4 sm:px-5 sm:py-5 lg:px-8">
        {/* ส่วนหัว */}
        <header className="mb-5 flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#800020] sm:text-xs">
              Dashboard
            </p>

            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              หน้าหลัก
            </h1>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              ภาพรวมข้อมูลและเมนูการทำงานของระบบ
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 sm:max-w-xs sm:px-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f8e9ee] text-[#800020]">
              <Icon name="user" size={20} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">
                {admin?.name || admin?.username || "เจ้าหน้าที่"}
              </p>
              <p className="mt-0.5 truncate text-xs text-gray-500">
                {admin?.position || "ไม่ระบุตำแหน่ง"}
              </p>
            </div>
          </div>
        </header>

        {/* ข้อความต้อนรับและเวลา */}
        <section className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_320px]">
          <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
            <p className="text-xs text-gray-500 sm:text-sm">
              ยินดีต้อนรับกลับมา
            </p>

            <h2 className="mt-1 text-lg font-bold text-gray-900 sm:text-xl">
              {admin?.name || "เจ้าหน้าที่"}
            </h2>

            <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:text-sm">
              จัดการข้อมูลบุคคล ตรวจสอบสถานะเอกสาร และดำเนินงานผ่านเมนูต่าง ๆ
              ได้จากหน้าหลักนี้
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#800020] text-white">
              <Icon name="clock" size={21} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-gray-500">วันและเวลาประเทศไทย</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-gray-800 sm:text-sm">
                {thaiTime || "กำลังโหลดเวลา..."}
              </p>
            </div>
          </div>
        </section>

        {/* สรุปสถานะ */}
        <section>
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                สรุปสถานะข้อมูล
              </h2>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                จำนวนรายการบุคคลแยกตามสถานะ
              </p>
            </div>

            <Link
              to="/person/history"
              className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#800020] hover:text-[#a00029] sm:text-sm"
            >
              ดูทั้งหมด
              <Icon name="arrow" size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3">
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
                  className="group rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-[#c99aa8] hover:bg-[#fffdfd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="min-h-10 flex-1 text-sm font-medium leading-5 text-gray-600">
                      {item.title}
                    </p>

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.color}`}
                    >
                      <Icon name={item.icon} size={20} />
                    </div>
                  </div>

                  <div className="mt-2 flex items-end justify-between gap-2">
                    <p className="text-3xl font-bold tabular-nums tracking-tight text-gray-900">
                      {value.toLocaleString("th-TH")}
                    </p>

                    <span className="mb-1 text-[10px] text-gray-400 transition-colors group-hover:text-[#800020] sm:text-xs">
                      ดูรายละเอียด
                    </span>
                  </div>

                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-gray-100">
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

        {/* รายการบุคคลล่าสุด */}
        <section className="mt-6">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                รายการบุคคลล่าสุด
              </h2>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                แสดงข้อมูลล่าสุดที่บันทึกในระบบ
              </p>
            </div>

            <Link
              to="/person/history"
              className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#800020] hover:text-[#a00029] sm:text-sm"
            >
              ดูทั้งหมด
              <Icon name="arrow" size={15} />
            </Link>
          </div>

          {loadingRecords ? (
            <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center text-sm text-gray-500">
              กำลังโหลดข้อมูล...
            </div>
          ) : recentRecords.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <Icon name="files" size={21} />
              </div>
              <p className="text-sm font-medium text-gray-700">
                ยังไม่มีข้อมูลบุคคล
              </p>
              <p className="mt-1 text-xs text-gray-500">
                เมื่อมีการบันทึกข้อมูล รายการจะแสดงที่นี่
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
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
                    key={recordId != null ? String(recordId) : `person-${index}`}
                    className="rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-[#d9b7c1]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {getPersonName(person)}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          วันที่: {getPersonDate(person)}
                        </p>
                      </div>

                      <span
                        className={`max-w-[48%] shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium leading-4 sm:text-xs ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>

                    <Link
                      to={
                        recordId != null
                          ? `/person/${encodeURIComponent(String(recordId))}`
                          : "/person/history"
                      }
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-[#800020] transition-colors hover:border-[#800020] hover:bg-[#fff8fa] sm:text-sm"
                    >
                      ดูรายละเอียด
                      <Icon name="arrow" size={16} />
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* เมนูการทำงาน แบ่ง 4 หมวด */}
        <section className="mt-6 sm:mt-8">
          <div className="mb-3">
            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
              เมนูการทำงาน
            </h2>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              เลือกหมวดหมู่และเมนูเพื่อเข้าสู่การทำงาน
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {menuGroups.map((group) => (
              <section
                key={group.title}
                className="rounded-xl border border-gray-200 bg-white p-3 sm:p-5"
              >
                <div className="mb-3 flex items-start gap-3 border-b border-gray-100 pb-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f8e9ee] text-[#800020]">
                    <Icon name={group.icon} size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold leading-6 text-gray-900 sm:text-base">
                      {group.title}
                    </h3>
                    <p className="mt-0.5 text-xs leading-5 text-gray-500">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-2 lg:grid-cols-3">
                  {group.menus.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="group flex min-w-0 items-center gap-3 rounded-lg border border-gray-100 bg-[#fafafa] p-3 transition-colors hover:border-[#c99aa8] hover:bg-[#fff8fa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#800020] ring-1 ring-gray-100 transition-colors group-hover:bg-[#800020] group-hover:text-white">
                        <Icon name={item.icon} size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold leading-5 text-gray-800 sm:text-sm">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[10px] leading-4 text-gray-500 sm:text-xs">
                          {item.description}
                        </p>
                      </div>

                      <div className="shrink-0 text-gray-300 transition-colors group-hover:text-[#800020]">
                        <Icon name="arrow" size={16} />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        {/* ท้ายหน้า */}
        <footer className="mt-6 border-t border-gray-200 pt-4">
          <p className="text-center text-[10px] text-gray-400 sm:text-xs">
            ระบบจัดการข้อมูลและเอกสาร
          </p>
        </footer>
      </main>
    </div>
  );
}
