
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

type IconName =
  | "all"
  | "wait"
  | "document"
  | "send"
  | "check"
  | "return"
  | "user-plus"
  | "history"
  | "users"
  | "file-plus"
  | "files"
  | "scan"
  | "building"
  | "user"
  | "clock"
  | "arrow"
  | "search"
  | "refresh";

type PersonRecord = {
  id?: string | number;
  _id?: string | number;
  personId?: string | number;
  sequenceNo?: string | number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  name?: string;
  status?: string | number;
  createdAt?: string;
  updatedAt?: string;
  requestDate?: string;
};

type SummaryCard = {
  title: string;
  key: keyof Summary;
  href: string;
  icon: IconName;
  color: string;
  bg: string;
};

type QuickMenu = {
  title: string;
  description: string;
  href: string;
  icon: IconName;
};

const initialSummary: Summary = {
  all: 0,
  s0: 0,
  s1: 0,
  s2: 0,
  s3: 0,
  s4: 0,
};

const summaryCards: SummaryCard[] = [
  {
    title: "ข้อมูลทั้งหมด",
    key: "all",
    href: "/person/history",
    icon: "all",
    color: "text-[#800020]",
    bg: "bg-[#f8e9ee]",
  },
  {
    title: "รอส่ง ศพฐ.",
    key: "s0",
    href: "/person/history?status=0",
    icon: "wait",
    color: "text-amber-700",
    bg: "bg-amber-50",
  },
  {
    title: "เตรียมเอกสารส่ง ศพฐ. แล้ว",
    key: "s1",
    href: "/person/history?status=1",
    icon: "document",
    color: "text-blue-700",
    bg: "bg-blue-50",
  },
  {
    title: "ส่ง ศพฐ. แล้ว",
    key: "s2",
    href: "/person/history?status=2",
    icon: "send",
    color: "text-sky-700",
    bg: "bg-sky-50",
  },
  {
    title: "รับจาก ศพฐ. แล้ว",
    key: "s3",
    href: "/person/history?status=3",
    icon: "check",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
  },
  {
    title: "ส่งคืนต้นสังกัด",
    key: "s4",
    href: "/person/history?status=4",
    icon: "return",
    color: "text-violet-700",
    bg: "bg-violet-50",
  },
];

const quickMenus: QuickMenu[] = [
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
    description: "ตรวจสอบและจัดการข้อมูลประวัติ",
    href: "/person/history",
    icon: "history",
  },
  {
    title: "ประวัติต่างด้าว",
    description: "ดูข้อมูลและประวัติบุคคลต่างด้าว",
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
  size = 21,
}: {
  name: IconName;
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

    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      );

    case "refresh":
      return (
        <svg {...common}>
          <path d="M20 7v5h-5M4 17v-5h5" />
          <path d="M5.6 9a7 7 0 0 1 11.6-2.6L20 12M4 12l2.8 5.6A7 7 0 0 0 18.4 15" />
        </svg>
      );

    default:
      return null;
  }
}

function getRecordStatus(status: unknown): number {
  const parsed = Number(status);
  return Number.isInteger(parsed) ? parsed : -1;
}

export default function Dashboard() {
  const { admin } = useAuth();

  const [thaiTime, setThaiTime] = useState("");
  const [summary, setSummary] = useState<Summary>(initialSummary);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [records, setRecords] = useState<PersonRecord[]>([]);
  const [search, setSearch] = useState("");

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

  const fetchData = async () => {
    try {
      setLoading(true);
      setLoadError("");

      const res = await api.get("/person/getall");
      const raw = res.data;

      const list: PersonRecord[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
          ? raw.data
          : Array.isArray(raw?.items)
            ? raw.items
            : [];

      setRecords(list);

      setSummary({
        all: list.length,
        s0: list.filter((p) => getRecordStatus(p.status) === 0).length,
        s1: list.filter((p) => getRecordStatus(p.status) === 1).length,
        s2: list.filter((p) => getRecordStatus(p.status) === 2).length,
        s3: list.filter((p) => getRecordStatus(p.status) === 3).length,
        s4: list.filter((p) => getRecordStatus(p.status) === 4).length,
      });
    } catch (error) {
      console.error("โหลดข้อมูล Dashboard ไม่สำเร็จ:", error);
      setLoadError("ไม่สามารถโหลดข้อมูลจากระบบได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const filteredRecords = records
    .filter((record) => {
      const keyword = search.trim().toLowerCase();
      if (!keyword) return true;

      const name =
        record.fullName ||
        [record.firstName, record.lastName].filter(Boolean).join(" ") ||
        record.name ||
        "";

      return [
        String(record.id ?? record._id ?? record.personId ?? record.sequenceNo ?? ""),
        name,
        String(record.requestDate ?? ""),
        String(record.status ?? ""),
      ].some((value) => value.toLowerCase().includes(keyword));
    })
    .slice(0, 5);

  const adminInfo = admin as
    | { name?: string; position?: string; fullName?: string }
    | null
    | undefined;

  const adminName = adminInfo?.name || adminInfo?.fullName || "-";
  const adminPosition = adminInfo?.position || "ไม่ระบุตำแหน่ง";

  const getRecordName = (record: PersonRecord) =>
    record.fullName ||
    [record.firstName, record.lastName].filter(Boolean).join(" ") ||
    record.name ||
    "ไม่ระบุชื่อ";

  const getRecordId = (record: PersonRecord) =>
    String(
      record.id ??
      record._id ??
      record.personId ??
      record.sequenceNo ??
      "-"
    );

  const getStatusLabel = (status: unknown) => {
    const labels: Record<number, string> = {
      0: "รอส่ง ศพฐ.",
      1: "เตรียมเอกสารแล้ว",
      2: "ส่ง ศพฐ. แล้ว",
      3: "รับจาก ศพฐ. แล้ว",
      4: "ส่งคืนต้นสังกัด",
    };

    return labels[getRecordStatus(status)] || "ไม่ระบุสถานะ";
  };

  const getStatusStyle = (status: unknown) => {
    const styles: Record<number, string> = {
      0: "bg-amber-50 text-amber-700",
      1: "bg-blue-50 text-blue-700",
      2: "bg-sky-50 text-sky-700",
      3: "bg-emerald-50 text-emerald-700",
      4: "bg-violet-50 text-violet-700",
    };

    return styles[getRecordStatus(status)] || "bg-gray-100 text-gray-600";
  };

  const formatDate = (value?: string) => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Bangkok",
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#242329]">
      <main className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <header className="mb-7 flex flex-col justify-between gap-4 border-b border-[#e8e6e8] pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.12em] text-[#800020]">
              MUANG CHONBURI POLICE STATION
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-[#252329] sm:text-[30px]">
              หน้าหลัก
            </h1>
            <p className="mt-2 text-sm text-[#77747b]">
              ภาพรวมข้อมูลและการดำเนินงานภายในระบบ
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7d4da] bg-white text-[#800020]">
              <Icon name="user" size={19} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#302c32]">
                {adminName}
              </p>
              <p className="mt-1 truncate text-xs text-[#85818a]">
                {adminPosition}
              </p>
            </div>
          </div>
        </header>

        <section className="mb-8 overflow-hidden rounded-2xl border border-[#e9e2e5] bg-white">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full bg-[#800020] sm:w-1.5" />
            <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
              <div>
                <p className="text-sm text-[#85818a]">ยินดีต้อนรับกลับมา</p>
                <h2 className="mt-1 text-xl font-bold text-[#29252a] sm:text-2xl">
                  {adminName === "-" ? "เจ้าหน้าที่" : adminName}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#77747b]">
                  จัดการข้อมูลบุคคล ตรวจสอบเอกสาร และติดตามสถานะการดำเนินงาน
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3 rounded-xl bg-[#faf8f9] px-4 py-3 sm:min-w-[250px]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#eee2e6] bg-white text-[#800020]">
                  <Icon name="clock" size={21} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#89838a]">
                    วันและเวลาประเทศไทย
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-5 text-[#39343b]">
                    {thaiTime || "กำลังโหลดเวลา..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-9">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#29252a]">
                สรุปสถานะข้อมูล
              </h2>
              <p className="mt-1 text-sm text-[#85818a]">
                จำนวนรายการแยกตามขั้นตอนการดำเนินงาน
              </p>
            </div>
            <Link
              to="/person/history"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#800020] transition hover:text-[#a00029]"
            >
              ดูข้อมูลทั้งหมด
              <Icon name="arrow" size={16} />
            </Link>
          </div>

          {loadError && (
            <div className="mb-4 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-red-700">{loadError}</p>
              <button
                type="button"
                onClick={() => void fetchData()}
                className="w-fit rounded-lg bg-white px-4 py-2 text-sm font-semibold text-red-700 ring-1 ring-red-200 hover:bg-red-100"
              >
                ลองอีกครั้ง
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
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
                  className="group min-w-0 rounded-xl border border-[#e8e6e8] bg-white p-4 transition duration-200 hover:border-[#cdaab5] hover:shadow-[0_3px_12px_rgba(50,20,30,0.04)] sm:p-5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="min-h-10 text-sm font-medium leading-5 text-[#77747b]">
                      {item.title}
                    </p>
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.color}`}>
                      <Icon name={item.icon} size={19} />
                    </div>
                  </div>

                  <p className="mt-4 text-3xl font-bold tracking-tight text-[#29252a]">
                    {loading ? "—" : value.toLocaleString("th-TH")}
                  </p>

                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#f0eef0]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.key === "all"
                          ? "bg-[#800020]"
                          : item.color.replace("text-", "bg-")
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-[#96919a]">
                      {summary.all > 0
                        ? `${Math.round(percentage)}% ของทั้งหมด`
                        : "ยังไม่มีข้อมูล"}
                    </span>
                    <span className="text-[#b3aab0] transition group-hover:translate-x-0.5 group-hover:text-[#800020]">
                      <Icon name="arrow" size={15} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-9">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#29252a]">เมนูการทำงาน</h2>
            <p className="mt-1 text-sm text-[#85818a]">
              ทางลัดไปยังหน้าจัดการข้อมูลและเอกสาร
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3">
            {quickMenus.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="group flex min-w-0 items-center gap-4 rounded-xl border border-[#e8e6e8] bg-white p-4 transition duration-200 hover:border-[#cdaab5] hover:bg-[#fffdfd] sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8eef1] text-[#800020] transition-colors duration-200 group-hover:bg-[#800020] group-hover:text-white">
                  <Icon name={item.icon} size={21} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#39343b] transition-colors group-hover:text-[#800020]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#85818a]">
                    {item.description}
                  </p>
                </div>
                <span className="shrink-0 text-[#c4bdc2] transition-all group-hover:translate-x-0.5 group-hover:text-[#800020]">
                  <Icon name="arrow" size={17} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#e8e6e8] bg-white">
          <div className="flex flex-col justify-between gap-3 border-b border-[#efedef] p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-[#29252a]">รายการล่าสุด</h2>
              <p className="mt-1 text-sm text-[#85818a]">
                แสดงข้อมูลล่าสุดไม่เกิน 5 รายการ
              </p>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#9b969e]">
                <Icon name="search" size={17} />
              </div>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="ค้นหารหัสหรือชื่อบุคคล"
                className="w-full rounded-lg border border-[#e5e2e5] bg-[#fcfbfc] py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-[#aaa5ac] focus:border-[#b47b8e] focus:bg-white focus:ring-2 focus:ring-[#800020]/5"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-3 py-14 text-sm text-[#85818a]">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#ead9df] border-t-[#800020]" />
              กำลังโหลดข้อมูล...
            </div>
          ) : loadError ? (
            <div className="px-5 py-12 text-center text-sm text-[#85818a]">
              ไม่สามารถแสดงรายการล่าสุดได้
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f5f6] text-[#a7a0a7]">
                <Icon name="files" size={23} />
              </div>
              <p className="text-sm font-semibold text-[#55515a]">
                ไม่พบข้อมูล
              </p>
              <p className="mt-1 text-xs text-[#96919a]">
                {search ? "ลองเปลี่ยนคำค้นหา" : "ยังไม่มีรายการในระบบ"}
              </p>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto xl:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#faf9fa] text-xs text-[#85818a]">
                    <tr>
                      <th className="px-5 py-3.5 font-semibold">รหัสรายการ</th>
                      <th className="px-5 py-3.5 font-semibold">ชื่อบุคคล</th>
                      <th className="px-5 py-3.5 font-semibold">วันที่</th>
                      <th className="px-5 py-3.5 font-semibold">สถานะ</th>
                      <th className="px-5 py-3.5 text-right font-semibold">รายละเอียด</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0eef0]">
                    {filteredRecords.map((record, index) => (
                      <tr
                        key={`${getRecordId(record)}-${index}`}
                        className="transition-colors hover:bg-[#fdfbfc]"
                      >
                        <td className="whitespace-nowrap px-5 py-4 font-medium text-[#55515a]">
                          {getRecordId(record)}
                        </td>
                        <td className="px-5 py-4 font-medium text-[#302c32]">
                          {getRecordName(record)}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-[#85818a]">
                          {formatDate(record.requestDate ?? record.createdAt)}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${getStatusStyle(record.status)}`}>
                            {getStatusLabel(record.status)}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Link
                            to={`/person/${encodeURIComponent(getRecordId(record))}`}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#800020] hover:underline"
                          >
                            ดูรายละเอียด
                            <Icon name="arrow" size={15} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 xl:hidden">
                {filteredRecords.map((record, index) => (
                  <article
                    key={`${getRecordId(record)}-${index}`}
                    className="rounded-lg border border-[#ece9ec] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs text-[#96919a]">รหัสรายการ</p>
                        <p className="mt-1 truncate text-sm font-semibold text-[#302c32]">
                          {getRecordId(record)}
                        </p>
                      </div>
                      <span className={`shrink-0 rounded-md px-2 py-1 text-xs font-medium ${getStatusStyle(record.status)}`}>
                        {getStatusLabel(record.status)}
                      </span>
                    </div>
                    <p className="mt-3 break-words text-sm font-medium text-[#39343b]">
                      {getRecordName(record)}
                    </p>
                    <p className="mt-2 text-xs text-[#85818a]">
                      วันที่: {formatDate(record.requestDate ?? record.createdAt)}
                    </p>
                    <Link
                      to={`/person/${encodeURIComponent(getRecordId(record))}`}
                      className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-[#e7d4da] px-3 py-2.5 text-sm font-semibold text-[#800020] transition hover:bg-[#faf1f4]"
                    >
                      ดูรายละเอียด
                      <Icon name="arrow" size={15} />
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}

          {!loading && !loadError && records.length > 0 && (
            <div className="flex flex-col justify-between gap-3 border-t border-[#efedef] px-5 py-4 text-xs text-[#85818a] sm:flex-row sm:items-center">
              <span>
                แสดง {filteredRecords.length} จาก {records.length} รายการ
              </span>
              <Link
                to="/person/history"
                className="inline-flex items-center gap-1.5 font-semibold text-[#800020] hover:underline"
              >
                ดูประวัติทั้งหมด
                <Icon name="arrow" size={15} />
              </Link>
            </div>
          )}
        </section>

        <footer className="mt-8 flex flex-col gap-2 border-t border-[#e8e6e8] pt-5 text-center text-xs text-[#96919a] sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>ระบบจัดการข้อมูลและเอกสาร</p>
          <p>สถานีตำรวจภูธรเมืองชลบุรี</p>
        </footer>
      </main>
    </div>
  );
}
