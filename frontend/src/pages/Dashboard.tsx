import { useCallback, useEffect, useState } from "react";
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

type SummaryKey = keyof Summary;

type PersonRecord = {
    id?: string | number;
    status?: number | string | null;
    createdAt?: string;
    updatedAt?: string;
    requestDate?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    name?: string;
    [key: string]: unknown;
};

type IconName =
    | "layers"
    | "clock"
    | "file"
    | "send"
    | "check"
    | "return"
    | "user-plus"
    | "users"
    | "globe"
    | "folder"
    | "file-plus"
    | "file-list"
    | "scan"
    | "building"
    | "user"
    | "arrow"
    | "calendar"
    | "search"
    | "refresh";

type StatItem = {
    key: SummaryKey;
    title: string;
    description: string;
    href: string;
    icon: IconName;
    color: string;
    soft: string;
};

type MenuItem = {
    title: string;
    description: string;
    href: string;
    icon: IconName;
};

type MenuGroup = {
    title: string;
    subtitle: string;
    items: MenuItem[];
};

const initialSummary: Summary = {
    all: 0,
    s0: 0,
    s1: 0,
    s2: 0,
    s3: 0,
    s4: 0,
};

const stats: StatItem[] = [
    {
        key: "all",
        title: "ข้อมูลบุคคลทั้งหมด",
        description: "รายการในระบบ",
        href: "/person/history",
        icon: "layers",
        color: "#800020",
        soft: "#f7eaee",
    },
    {
        key: "s0",
        title: "รอส่ง ศพฐ.",
        description: "รอดำเนินการ",
        href: "/person/history?status=0",
        icon: "clock",
        color: "#a66a16",
        soft: "#fbf2df",
    },
    {
        key: "s1",
        title: "เตรียมเอกสารแล้ว",
        description: "พร้อมดำเนินการส่ง",
        href: "/person/history?status=1",
        icon: "file",
        color: "#4f659b",
        soft: "#edf0f8",
    },
    {
        key: "s2",
        title: "ส่ง ศพฐ. แล้ว",
        description: "อยู่ระหว่างดำเนินการ",
        href: "/person/history?status=2",
        icon: "send",
        color: "#347d96",
        soft: "#e9f3f6",
    },
    {
        key: "s3",
        title: "รับจาก ศพฐ. แล้ว",
        description: "ดำเนินการรับเรียบร้อย",
        href: "/person/history?status=3",
        icon: "check",
        color: "#34765d",
        soft: "#eaf3ed",
    },
    {
        key: "s4",
        title: "ส่งคืนต้นสังกัด",
        description: "ส่งคืนเรียบร้อย",
        href: "/person/history?status=4",
        icon: "return",
        color: "#756296",
        soft: "#f0edf6",
    },
];

const menuGroups: MenuGroup[] = [
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
                description: "ค้นหาและตรวจสอบประวัติ",
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
                description: "ค้นหาและตรวจสอบรายการ",
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
                description: "สแกนและจัดการเอกสาร",
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
                description: "ข้อมูลและรายละเอียดหน่วยงาน",
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
    size = 20,
}: {
    name: IconName;
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
        "aria-hidden": true as const,
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

        case "calendar":
            return (
                <svg {...props}>
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3 10h18" />
                </svg>
            );

        case "search":
            return (
                <svg {...props}>
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                </svg>
            );

        case "refresh":
            return (
                <svg {...props}>
                    <path d="M20 7v5h-5M4 17v-5h5" />
                    <path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" />
                </svg>
            );

        default:
            return null;
    }
}

function getStatusKey(status: PersonRecord["status"]): SummaryKey | null {
    const value = String(status ?? "").trim().toLowerCase();

    if (value === "0" || value === "pending") return "s0";
    if (value === "1" || value === "processing") return "s1";
    if (value === "2" || value === "sent") return "s2";
    if (value === "3" || value === "completed") return "s3";
    if (value === "4" || value === "returned") return "s4";

    return null;
}

function formatThaiDate(value?: string): string {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function getPersonName(person: PersonRecord): string {
    return (
        person.fullName ||
        person.name ||
        [person.firstName, person.lastName].filter(Boolean).join(" ") ||
        "ไม่ระบุชื่อ"
    );
}

export default function Dashboard() {
    const { admin } = useAuth();

    const [summary, setSummary] = useState<Summary>(initialSummary);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [thaiTime, setThaiTime] = useState("");
    const [search, setSearch] = useState("");
    const [records, setRecords] = useState<PersonRecord[]>([]);

    const currentYear = new Intl.DateTimeFormat("th-TH-u-ca-buddhist", {
        year: "numeric",
        timeZone: "Asia/Bangkok",
    }).format(new Date());

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

    const fetchRecords = useCallback(async () => {
        setLoading(true);
        setLoadError("");

        try {
            const response = await api.get("/person/getall");
            const data: unknown = response.data;

            let list: PersonRecord[] = [];

            if (Array.isArray(data)) {
                list = data as PersonRecord[];
            } else if (
                data !== null &&
                typeof data === "object" &&
                "data" in data &&
                Array.isArray(data.data)
            ) {
                list = data.data as PersonRecord[];
            } else if (
                data !== null &&
                typeof data === "object" &&
                "items" in data &&
                Array.isArray(data.items)
            ) {
                list = data.items as PersonRecord[];
            }

            setRecords(list);

            const nextSummary: Summary = {
                all: list.length,
                s0: 0,
                s1: 0,
                s2: 0,
                s3: 0,
                s4: 0,
            };

            list.forEach((person) => {
                const key = getStatusKey(person.status);

                if (key && key !== "all") {
                    nextSummary[key] += 1;
                }
            });

            setSummary(nextSummary);
        } catch (error) {
            console.error("Dashboard API error:", error);
            setLoadError("ไม่สามารถโหลดข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่อ");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchRecords();
    }, [fetchRecords]);

    const filteredRecords = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) return records;

        return records.filter((person) => {
            const name = getPersonName(person).toLowerCase();
            const id = String(person.id ?? "").toLowerCase();

            return name.includes(keyword) || id.includes(keyword);
        });
    }, [records, search]);

    const displayRecords = filteredRecords.slice(0, 6);

    return (
        <div className="min-h-screen bg-[#f7f7f8] text-gray-800">
            <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
                <header className="mb-7 flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#800020]">
                            MUANG CHONBURI POLICE STATION
                        </p>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            แดชบอร์ด
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            ภาพรวมข้อมูลบุคคลและสถานะการดำเนินงาน
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-[#800020]">
                            <Icon name="calendar" size={19} />
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                วันและเวลาประเทศไทย
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-800">
                                {thaiTime || "กำลังโหลดเวลา..."}
                            </p>
                        </div>
                    </div>
                </header>

                <section className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7eaee] text-[#800020]">
                            <Icon name="user" size={23} />
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                ผู้ใช้งานปัจจุบัน
                            </p>
                            <p className="mt-1 font-semibold text-gray-900">
                                {admin?.name || "เจ้าหน้าที่"}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                {admin?.position || "เจ้าหน้าที่ประจำหน่วยงาน"}
                            </p>
                        </div>
                    </div>

                    <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        ระบบพร้อมใช้งาน
                    </div>
                </section>

                <section className="mb-9">
                    <div className="mb-4">
                        <p className="text-xs font-semibold tracking-wider text-[#800020]">
                            SUMMARY
                        </p>
                        <h2 className="mt-1 text-lg font-bold text-gray-900">
                            สรุปข้อมูลบุคคล
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            จำนวนรายการแยกตามสถานะปัจจุบัน
                        </p>
                    </div>

                    {loadError && (
                        <div
                            role="alert"
                            className="mb-4 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <span>{loadError}</span>
                            <button
                                type="button"
                                onClick={() => void fetchRecords()}
                                className="w-fit rounded-lg bg-white px-3 py-2 font-semibold text-red-700 ring-1 ring-red-200 hover:bg-red-100"
                            >
                                ลองใหม่
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
                        {stats.map((item) => (
                            <Link
                                key={item.key}
                                to={item.href}
                                className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div
                                        className="flex h-11 w-11 items-center justify-center rounded-xl"
                                        style={{
                                            backgroundColor: item.soft,
                                            color: item.color,
                                        }}
                                    >
                                        <Icon name={item.icon} size={22} />
                                    </div>

                                    <span className="text-gray-300 transition group-hover:text-[#800020]">
                                        <Icon name="arrow" s