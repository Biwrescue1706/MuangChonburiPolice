import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

type IconName =
    | "dashboard"
    | "users"
    | "user"
    | "file"
    | "folder"
    | "plus"
    | "search"
    | "clock"
    | "check"
    | "send"
    | "refresh"
    | "settings"
    | "chart"
    | "shield"
    | "calendar"
    | "alert"
    | "arrow"
    | "logout"
    | "clipboard"
    | "printer"
    | "history";

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
    personStatus?: string | number;
    createdAt?: string;
    updatedAt?: string;
    requestDate?: string;
    [key: string]: unknown;
};

type StatItem = {
    title: string;
    value: number;
    description: string;
    icon: IconName;
    color: string;
    background: string;
};

type MenuItem = {
    title: string;
    description: string;
    path: string;
    icon: IconName;
};

type MenuGroup = {
    title: string;
    description: string;
    items: MenuItem[];
};

const statsConfig: Omit<StatItem, "value">[] = [
    {
        title: "รายการทั้งหมด",
        description: "รายการในระบบ",
        icon: "clipboard",
        color: "#800020",
        background: "#f8e9ee",
    },
    {
        title: "รอดำเนินการ",
        description: "รายการที่รอตรวจสอบ",
        icon: "clock",
        color: "#b7791f",
        background: "#fff5dc",
    },
    {
        title: "กำลังดำเนินการ",
        description: "รายการที่อยู่ระหว่างทำงาน",
        icon: "refresh",
        color: "#2563eb",
        background: "#eaf2ff",
    },
    {
        title: "ดำเนินการแล้ว",
        description: "รายการที่เสร็จสิ้น",
        icon: "check",
        color: "#15803d",
        background: "#e8f7ed",
    },
];

const menuGroups: MenuGroup[] = [
    {
        title: "จัดการข้อมูล",
        description: "จัดการและตรวจสอบข้อมูลในระบบ",
        items: [
            {
                title: "รายการทั้งหมด",
                description: "ดูรายการข้อมูลทั้งหมด",
                path: "/person",
                icon: "users",
            },
            {
                title: "เพิ่มรายการ",
                description: "บันทึกข้อมูลรายการใหม่",
                path: "/person/create",
                icon: "plus",
            },
            {
                title: "ประวัติรายการ",
                description: "ค้นหาและดูประวัติย้อนหลัง",
                path: "/person/history",
                icon: "history",
            },
        ],
    },
    {
        title: "รายงานและเอกสาร",
        description: "ตรวจสอบข้อมูลและจัดการเอกสาร",
        items: [
            {
                title: "รายงานสรุป",
                description: "ดูภาพรวมข้อมูลในระบบ",
                path: "/reports",
                icon: "chart",
            },
            {
                title: "ค้นหาข้อมูล",
                description: "ค้นหาข้อมูลที่ต้องการ",
                path: "/person/search",
                icon: "search",
            },
        ],
    },
];

function Icon({
    name,
    size = 22,
    color = "currentColor",
}: {
    name: IconName;
    size?: number;
    color?: string;
}) {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        className: "shrink-0",
        "aria-hidden": true as const,
    };

    switch (name) {
        case "dashboard":
            return (
                <svg {...common}>
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                </svg>
            );

        case "users":
            return (
                <svg {...common}>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="10" cy="7" r="4" />
                    <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            );

        case "user":
            return (
                <svg {...common}>
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
            );

        case "file":
            return (
                <svg {...common}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M8 13h8M8 17h8" />
                </svg>
            );

        case "folder":
            return (
                <svg {...common}>
                    <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
            );

        case "plus":
            return (
                <svg {...common}>
                    <path d="M12 5v14M5 12h14" />
                </svg>
            );

        case "search":
            return (
                <svg {...common}>
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                </svg>
            );

        case "clock":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                </svg>
            );

        case "check":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="m8 12 3 3 5-6" />
                </svg>
            );

        case "send":
            return (
                <svg {...common}>
                    <path d="m22 2-7 20-4-9-9-4z" />
                    <path d="M22 2 11 13" />
                </svg>
            );

        case "refresh":
            return (
                <svg {...common}>
                    <path d="M20 7v5h-5M4 17v-5h5" />
                    <path d="M5.6 9a7 7 0 0 1 11.55-2.6L20 12M4 12l2.85 5.6A7 7 0 0 0 18.4 15" />
                </svg>
            );

        case "settings":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="3" />
                    <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1 0 2z" />
                </svg>
            );

        case "chart":
            return (
                <svg {...common}>
                    <path d="M3 3v18h18" />
                    <path d="m7 14 4-4 4 3 5-7" />
                </svg>
            );

        case "shield":
            return (
                <svg {...common}>
                    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            );

        case "calendar":
            return (
                <svg {...common}>
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3 11h18" />
                </svg>
            );

        case "alert":
            return (
                <svg {...common}>
                    <path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0z" />
                    <path d="M12 9v4M12 17h.01" />
                </svg>
            );

        case "arrow":
            return (
                <svg {...common}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
            );

        case "logout":
            return (
                <svg {...common}>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <path d="M16 17l5-5-5-5M21 12H9" />
                </svg>
            );

        case "clipboard":
            return (
                <svg {...common}>
                    <rect x="5" y="4" width="14" height="17" rx="2" />
                    <path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3" />
                </svg>
            );

        case "printer":
            return (
                <svg {...common}>
                    <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <path d="M6 14h12v7H6zM18 12h.01" />
                </svg>
            );

        case "history":
            return (
                <svg {...common}>
                    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                    <path d="M3 3v5h5M12 7v5l4 2" />
                </svg>
            );

        default:
            return null;
    }
}

function getStatus(record: PersonRecord): string {
    const status = record.status ?? record.personStatus ?? "";

    const statusMap: Record<string, string> = {
        "0": "รอดำเนินการ",
        "1": "กำลังดำเนินการ",
        "2": "ส่งต่อแล้ว",
        "3": "ดำเนินการแล้ว",
        "4": "ส่งกลับแก้ไข",
        pending: "รอดำเนินการ",
        processing: "กำลังดำเนินการ",
        sent: "ส่งต่อแล้ว",
        completed: "ดำเนินการแล้ว",
        returned: "ส่งกลับแก้ไข",
    };

    return statusMap[String(status).toLowerCase()] || "ไม่ระบุสถานะ";
}

function getStatusClass(status: string): string {
    if (status === "ดำเนินการแล้ว") {
        return "bg-green-50 text-green-700";
    }

    if (status === "กำลังดำเนินการ" || status === "ส่งต่อแล้ว") {
        return "bg-blue-50 text-blue-700";
    }

    if (status === "ส่งกลับแก้ไข") {
        return "bg-red-50 text-red-700";
    }

    return "bg-amber-50 text-amber-700";
}

function getRecordName(record: PersonRecord): string {
    if (record.fullName) return record.fullName;

    const name = [record.firstName, record.lastName]
        .filter(Boolean)
        .join(" ");

    return name || record.name || "ไม่ระบุชื่อ";
}

function getRecordId(record: PersonRecord): string {
    return String(
        record.id ??
        record._id ??
        record.personId ??
        record.sequenceNo ??
        "-"
    );
}

function formatDate(value: unknown): string {
    if (typeof value !== "string" || !value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(date);
}

export default function Dashboard() {
    const { admin } = useAuth();

    const [records, setRecords] = useState<PersonRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = window.setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    const fetchRecords = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/person/getall");
            const payload = response.data;

            let result: PersonRecord[] = [];

            if (Array.isArray(payload)) {
                result = payload;
            } else if (Array.isArray(payload?.data)) {
                result = payload.data;
            } else if (Array.isArray(payload?.items)) {
                result = payload.items;
            } else if (Array.isArray(payload?.persons)) {
                result = payload.persons;
            }

            setRecords(result);
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            setError("ไม่สามารถโหลดข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่อ");
            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchRecords();
    }, []);

    const countByStatus = (statusNames: string[]) =>
        records.filter((record) =>
            statusNames.includes(getStatus(record))
        ).length;

    const stats: StatItem[] = [
        {
            ...statsConfig[0],
            value: records.length,
        },
        {
            ...statsConfig[1],
            value: countByStatus(["รอดำเนินการ"]),
        },
        {
            ...statsConfig[2],
            value: countByStatus(["กำลังดำเนินการ", "ส่งต่อแล้ว"]),
        },
        {
            ...statsConfig[3],
            value: countByStatus(["ดำเนินการแล้ว"]),
        },
    ];

    const filteredRecords = records
        .filter((record) => {
            const keyword = search.trim().toLowerCase();

            if (!keyword) return true;

            return [
                getRecordId(record),
                getRecordName(record),
                String(record.requestDate ?? ""),
                getStatus(record),
            ].some((value) => value.toLowerCase().includes(keyword));
        })
        .slice(0, 8);

    const thaiDate = new Intl.DateTimeFormat("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(currentTime);

    const thaiTime = new Intl.DateTimeFormat("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(currentTime);

    const adminName =
        (admin as { name?: string; fullName?: string } | null)?.name ??
        (admin as { fullName?: string } | null)?.fullName ??
        "ผู้ใช้งาน";

    const adminPosition =
        (admin as { position?: string } | null)?.position ??
        "เจ้าหน้าที่";

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#800020]">
                            <Icon name="shield" size={18} color="#800020" />
                            <span>ระบบบริหารจัดการข้อมูล</span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            แดชบอร์ด
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            ภาพรวมการดำเนินงาน สถานีตำรวจภูธรเมืองชลบุรี
                        </p>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8e9ee]">
                            <Icon name="calendar" color="#800020" size={21} />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-slate-800">
                                {thaiDate}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                เวลา {thaiTime} น.
                            </p>
                        </div>
                    </div>
                </header>

                {/* Welcome */}
                <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-[#650019] to-[#90002b] p-6 text-white shadow-lg sm:p-8">
                    <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <p className="mb-2 text-sm text-white/75">
                                ยินดีต้อนรับเข้าสู่ระบบ
                            </p>

                            <h2 className="text-2xl font-bold sm:text-3xl">
                                สวัสดี, {adminName}
                            </h2>

                            <p className="mt-2 text-sm text-white/80">
                                {adminPosition} · สถานีตำรวจภูธรเมืองชลบุรี
                            </p>
                        </div>

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                            <Icon name="shield" size={34} color="#ffffff" />
                        </div>
                    </div>

                    <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/5" />
                    <div className="pointer-events-none absolute -bottom-24 right-40 h-48 w-48 rounded-full border-[25px] border-white/5" />
                </section>

                {/* Statistics */}
                <section className="mb-8">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                ภาพรวมรายการ
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                สรุปสถานะข้อมูลในระบบ
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => void fetchRecords()}
                            disabled={loading}
                            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-[#800020] hover:text-[#800020] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Icon name="refresh" size={16} />
                            <span>รีเฟรช</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            {item.title}
                                        </p>

                                        <p className="mt-3 text-3xl font-bold text-slate-900">
                                            {loading ? "—" : item.value.toLocaleString("th-TH")}
                                        </p>

                                        <p className="mt-2 text-xs text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                                        style={{ backgroundColor: item.background }}
                                    >
                                        <Icon
                                            name={item.icon}
                                            size={23}
                                            color={item.color}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Menu groups */}
                <section className="mb-8">
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-slate-900">
                            เมนูการทำงาน
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            เลือกเมนูเพื่อเข้าสู่หน้าที่ต้องการ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                        {menuGroups.map((group) => (
                            <div
                                key={group.title}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                            >
                                <div className="mb-5">
                                    <h3 className="font-bold text-slate-900">
                                        {group.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {group.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {group.items.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className="group flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 p-4 transition hover:border-[#e8c4ce] hover:bg-[#fff8fa]"
                                        >
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8e9ee] transition group-hover:bg-[#800020]">
                                                <span className="text-[#800020] group-hover:text-white">
                                                    <Icon
                                                        name={item.icon}
                                                        size={21}
                                                    />
                                                </span>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-semibold text-slate-800">
                                                    {item.title}
                                                </p>
                                                <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                                                    {item.description}
                                                </p>
                                            </div>

                                            <Icon
                                                name="arrow"
                                                size={17}
                                                color="#94a3b8"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Latest records */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                รายการล่าสุด
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                แสดงรายการล่าสุดไม่เกิน 8 รายการ
                            </p>
                        </div>

                        <div className="relative w-full sm:max-w-xs">
                            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                                <Icon
                                    name="search"
                                    size={17}
                                    color="#94a3b8"
                                />
                            </div>

                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="ค้นหารหัส ชื่อ หรือสถานะ..."
                                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/10"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="m-5 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2 text-sm text-red-700">
                                <Icon name="alert" size={18} color="#b91c1c" />
                                <span>{error}</span>
                            </div>

                            <button
                                type="button"
                                onClick={() => void fetchRecords()}
                                className="self-start rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-200 sm:self-auto"
                            >
                                ลองอีกครั้ง
                            </button>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="mb-4 h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-[#800020]" />
                            <p className="text-sm text-slate-500">
                                กำลังโหลดข้อมูล...
                            </p>
                        </div>
                    ) : !error && filteredRecords.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                                <Icon
                                    name="folder"
                                    size={26}
                                    color="#94a3b8"
                                />
                            </div>

                            <p className="font-semibold text-slate-700">
                                ไม่พบรายการ
                            </p>
                            <p className="mt-1 text-sm text-slate-400">
                                {search
                                    ? "ลองเปลี่ยนคำค้นหาแล้วค้นหาอีกครั้ง"
                                    : "ยังไม่มีข้อมูลที่จะแสดง"}
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop table */}
                            <div className="hidden overflow-x-auto xl:block">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">
                                                รหัสรายการ
                                            </th>
                                            <th className="px-6 py-4 font-semibold">
                                                ชื่อรายการ
                                            </th>
                                            <th className="px-6 py-4 font-semibold">
                                                วันที่
                                            </th>
                                            <th className="px-6 py-4 font-semibold">
                                                สถานะ
                                            </th>
                                            <th className="px-6 py-4 text-right font-semibold">
                                                รายละเอียด
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {filteredRecords.map((record, index) => {
                                            const status = getStatus(record);

                                            return (
                                                <tr
                                                    key={`${getRecordId(record)}-${index}`}
                                                    className="transition hover:bg-slate-50"
                                                >
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-700">
                                                        {getRecordId(record)}
                                                    </td>

                                                    <td className="px-6 py-4 font-medium text-slate-800">
                                                        {getRecordName(record)}
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                                                        {formatDate(
                                                            record.requestDate ??
                                                            record.createdAt
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(status)}`}
                                                        >
                                                            {status}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4 text-right">
                                                        <Link
                                                            to={`/person/${encodeURIComponent(getRecordId(record))}`}
                                                            className="inline-flex items-center gap-1 font-semibold text-[#800020] hover:underline"
                                                        >
                                                            ดูรายละเอียด
                                                            <Icon
                                                                name="arrow"
                                                                size={15}
                                                                color="#800020"
                                                            />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile and tablet cards */}
                            <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 xl:hidden">
                                {filteredRecords.map((record, index) => {
                                    const status = getStatus(record);

                                    return (
                                        <div
                                            key={`${getRecordId(record)}-${index}`}
                                            className="rounded-xl border border-slate-200 p-4 transition hover:border-[#e8c4ce]"
                                        >
                                            <div className="mb-3 flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="text-xs text-slate-400">
                                                        รหัสรายการ
                                                    </p>
                                                    <p className="mt-1 truncate font-semibold text-slate-800">
                                                        {getRecordId(record)}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(status)}`}
                                                >
                                                    {status}
                                                </span>
                                            </div>

                                            <p className="break-words text-sm font-medium text-slate-800">
                                                {getRecordName(record)}
                                            </p>

                                            <p className="mt-2 text-xs text-slate-500">
                                                วันที่:{" "}
                                                {formatDate(
                                                    record.requestDate ??
                                                    record.createdAt
                                                )}
                                            </p>

                                            <Link
                                                to={`/person/${encodeURIComponent(getRecordId(record))}`}
                                                className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#800020] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#650019]"
                                            >
                                                ดูรายละเอียด
                                                <Icon
                                                    name="arrow"
                                                    size={16}
                                                    color="#ffffff"
                                                />
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {!loading && !error && records.length > 0 && (
                        <div className="flex flex-col justify-between gap-3 border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center">
                            <span>
                                แสดง {filteredRecords.length} รายการ
                                {search ? " ตามคำค้นหา" : " ล่าสุด"}
                            </span>

                            <Link
                                to="/person"
                                className="inline-flex items-center gap-1 font-semibold text-[#800020] hover:underline"
                            >
                                ดูรายการทั้งหมด
                                <Icon
                                    name="arrow"
                                    size={15}
                                    color="#800020"
                                />
                            </Link>
                        </div>
                    )}
                </section>

                {/* Footer: large screens */}
                <footer className="mt-8 hidden flex-row items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-400 xl:flex">
                    <p>
                        © {new Date().getFullYear() + 543} สถานีตำรวจภูธรเมืองชลบุรี
                    </p>
                    <p>ระบบบริหารจัดการข้อมูลภายใน</p>
                </footer>

                {/* Footer: mobile and tablet */}
                <footer className="mt-6 flex flex-col items-center gap-1 pb-4 text-center text-xs text-slate-400 xl:hidden">
                    <p>
                        © {new Date().getFullYear() + 543} สถานีตำรวจภูธรเมืองชลบุรี
                    </p>
                    <p>ระบบบริหารจัดการข้อมูลภายใน</p>
                </footer>
            </main>
        </div>
    );
}