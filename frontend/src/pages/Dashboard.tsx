
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    Building2,
    CalendarDays,
    CheckCircle2,
    Clock3,
    ContactRound,
    FilePlus2,
    FileText,
    Files,
    LayoutDashboard,
    RefreshCw,
    ScanLine,
    Search,
    Settings,
    UserRound,
    UserRoundPlus,
    Users,
    X,
} from "lucide-react";

import type { LucideProps } from "lucide-react";
import Nav from "../components/Nav";
import { useAuth } from "../context/AuthContext";
import api from "../api";

type IconComponent = ComponentType<LucideProps>;

type PersonRecord = {
    id?: string | number;
    ID?: string | number;
    personId?: string | number;
    personID?: string | number;
    P_ID?: string | number;

    prefix?: string;
    firstName?: string;
    lastName?: string;
    firstname?: string;
    lastname?: string;
    fullName?: string;
    name?: string;

    status?: number | string;
    personStatus?: number | string;

    typeOfRequest?: string;
    requestType?: string;
    type?: string;
    nationality?: string;

    createdAt?: string;
    created_at?: string;
    updatedAt?: string;
    requestDate?: string;
    date?: string;

    [key: string]: unknown;
};

type StaffInfo = {
    name?: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    position?: string;
    role?: string;
};

type MenuItem = {
    title: string;
    description: string;
    icon: IconComponent;
    to: string;
};

type MenuGroup = {
    title: string;
    description: string;
    icon: IconComponent;
    items: MenuItem[];
};

const STATUS: Record<
    string,
    { label: string; className: string }
> = {
    "0": {
        label: "รอดำเนินการ",
        className: "bg-amber-50 text-amber-700",
    },
    "1": {
        label: "กำลังดำเนินการ",
        className: "bg-blue-50 text-blue-700",
    },
    "2": {
        label: "ดำเนินการแล้ว",
        className: "bg-emerald-50 text-emerald-700",
    },
    "3": {
        label: "ไม่อนุมัติ",
        className: "bg-red-50 text-red-700",
    },
    "4": {
        label: "ยกเลิก",
        className: "bg-gray-100 text-gray-600",
    },
};

const MENU_GROUPS: MenuGroup[] = [
    {
        title: "ตรวจประวัติส่วนตัวเพื่อตรวจประวัติ",
        description: "จัดการข้อมูลสำหรับการตรวจประวัติบุคคล",
        icon: Users,
        items: [
            {
                title: "เพิ่มข้อมูลบุคคล",
                description: "บันทึกข้อมูลบุคคลใหม่เข้าสู่ระบบ",
                icon: UserRoundPlus,
                to: "/person/create",
            },
            {
                title: "ประวัติบุคคล",
                description: "ค้นหาและตรวจสอบประวัติบุคคล",
                icon: Users,
                to: "/person/history",
            },
        ],
    },
    {
        title: "หนังสือส่ง ศพฐ.",
        description: "จัดการหนังสือและเอกสารนำส่ง",
        icon: FileText,
        items: [
            {
                title: "ออกเลขหนังสือ ศพฐ.",
                description: "สร้างรายการและออกเลขหนังสือ",
                icon: FilePlus2,
                to: "/forensic/create",
            },
            {
                title: "รายการหนังสือส่ง ศพฐ.",
                description: "ตรวจสอบรายการหนังสือที่บันทึกไว้",
                icon: Files,
                to: "/forensic/history",
            },
            {
                title: "สแกนเอกสาร",
                description: "เปิดหน้าสแกนเอกสาร",
                icon: ScanLine,
                to: "/forensic/scan",
            },
        ],
    },
    {
        title: "ประวัติบุคคลต่างด้าว",
        description: "จัดเก็บและค้นหาประวัติบุคคลต่างด้าว",
        icon: ContactRound,
        items: [
            {
                title: "เพิ่มบุคคลต่างด้าว",
                description: "บันทึกข้อมูลบุคคลต่างด้าวใหม่",
                icon: UserRoundPlus,
                to: "/foreigner/create",
            },
            {
                title: "ประวัติต่างด้าว",
                description: "ค้นหาและตรวจสอบประวัติต่างด้าว",
                icon: ContactRound,
                to: "/foreigner/history",
            },
        ],
    },
    {
        title: "ข้อมูลส่วนบุคคลและข้อมูลหน่วยงาน",
        description: "จัดการโปรไฟล์และข้อมูลประจำหน่วยงาน",
        icon: Settings,
        items: [
            {
                title: "โปรไฟล์บุคคล",
                description: "ดูและแก้ไขข้อมูลส่วนบุคคล",
                icon: UserRound,
                to: "/profile",
            },
            {
                title: "ข้อมูลหน่วยงาน",
                description: "จัดการข้อมูลประจำหน่วยงาน",
                icon: Building2,
                to: "/organization",
            },
        ],
    },
];

function getRecordId(record: PersonRecord): string {
    return String(
        record.id ??
        record.ID ??
        record.personId ??
        record.personID ??
        record.P_ID ??
        ""
    );
}

function getPersonName(record: PersonRecord): string {
    const fullName = record.fullName ?? record.name;

    if (typeof fullName === "string" && fullName.trim()) {
        return fullName.trim();
    }

    const prefix = String(record.prefix ?? "").trim();
    const firstName = String(
        record.firstName ?? record.firstname ?? ""
    ).trim();
    const lastName = String(
        record.lastName ?? record.lastname ?? ""
    ).trim();

    const name = `${prefix}${firstName ? ` ${firstName}` : ""}${
        lastName ? ` ${lastName}` : ""
    }`.trim();

    return name || "ไม่ระบุชื่อ";
}

function getRecordDate(record: PersonRecord): string {
    return String(
        record.createdAt ??
        record.created_at ??
        record.requestDate ??
        record.date ??
        record.updatedAt ??
        ""
    );
}

function getTimestamp(record: PersonRecord): number {
    const value = getRecordDate(record);
    if (!value) return 0;

    const timestamp = new Date(value).getTime();
    return Number.isNaN(timestamp) ? 0 : timestamp;
}

function getStatusValue(record: PersonRecord): string {
    const value = record.status ?? record.personStatus;

    if (value === undefined || value === null || value === "") {
        return "";
    }

    return String(value);
}

function getStatusLabel(record: PersonRecord): string {
    const value = getStatusValue(record);

    if (!value) return "ไม่ระบุสถานะ";

    return STATUS[value]?.label ?? value;
}

function getStatusClass(record: PersonRecord): string {
    const value = getStatusValue(record);

    return (
        STATUS[value]?.className ??
        "bg-gray-100 text-gray-600"
    );
}

function formatThaiDate(value: string): string {
    if (!value) return "ไม่ระบุวันที่";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(date);
}

function formatThaiDateTime(date: Date): string {
    return new Intl.DateTimeFormat("th-TH", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date);
}

function getStaffName(
    staff: StaffInfo | null | undefined
): string {
    if (!staff) return "เจ้าหน้าที่";

    if (staff.fullName?.trim()) return staff.fullName;
    if (staff.name?.trim()) return staff.name;

    const name =
        `${staff.firstName ?? ""} ${staff.lastName ?? ""}`.trim();

    return name || "เจ้าหน้าที่";
}

function StatCard({
    title,
    value,
    description,
    icon: Icon,
    iconClass,
}: {
    title: string;
    value: number;
    description: string;
    icon: IconComponent;
    iconClass: string;
}) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <p className="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
                        {value.toLocaleString("th-TH")}
                    </p>
                </div>

                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
                >
                    <Icon size={21} strokeWidth={1.8} />
                </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-gray-500">
                {description}
            </p>
        </div>
    );
}

export default function Dashboard() {
    const { user } = useAuth();

    const [records, setRecords] = useState<PersonRecord[]>([]);
    const [search, setSearch] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadRecords = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/person/getall");
            const result = response.data;

            const list: unknown = Array.isArray(result)
                ? result
                : Array.isArray(result?.data)
                    ? result.data
                    : Array.isArray(result?.items)
                        ? result.items
                        : [];

            setRecords(list as PersonRecord[]);
        } catch (err) {
            console.error("โหลดข้อมูล Dashboard ไม่สำเร็จ:", err);
            setError("ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadRecords();
    }, [loadRecords]);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => window.clearInterval(timer);
    }, []);

    const sortedRecords = useMemo(() => {
        return [...records].sort(
            (a, b) => getTimestamp(b) - getTimestamp(a)
        );
    }, [records]);

    const filteredRecords = useMemo(() => {
        const keyword = search.trim().toLocaleLowerCase("th");

        if (!keyword) return sortedRecords;

        return sortedRecords.filter((record) => {
            const searchableText = [
                getPersonName(record),
                getStatusLabel(record),
                getRecordDate(record),
                record.nationality,
                record.typeOfRequest,
                record.requestType,
            ]
                .filter(Boolean)
                .join(" ")
                .toLocaleLowerCase("th");

            return searchableText.includes(keyword);
        });
    }, [search, sortedRecords]);

    // จำกัดรายการล่าสุดไม่เกิน 10 รายการ หลังจากค้นหาแล้ว
    const latestRecords = filteredRecords.slice(0, 10);

    const totalRecords = records.length;

    const pendingRecords = records.filter(
        (record) => getStatusValue(record) === "0"
    ).length;

    const processingRecords = records.filter(
        (record) => getStatusValue(record) === "1"
    ).length;

    const completedRecords = records.filter(
        (record) => getStatusValue(record) === "2"
    ).length;

    const staff = user as StaffInfo | null | undefined;
    const staffName = getStaffName(staff);

    return (
        <div className="min-h-screen bg-[#f7f7f8] text-gray-900">
            <Nav />

            <main className="min-w-0 px-4 py-6 sm:px-6 lg:ml-64 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-8">

                    {/* Page header */}
                    <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                                <LayoutDashboard size={16} />
                                <span>หน้าหลัก</span>
                                <span className="text-gray-300">/</span>
                                <span className="font-medium text-[#800020]">
                                    Dashboard
                                </span>
                            </div>

                            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                                ภาพรวมระบบ
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                ภาพรวมข้อมูลและสถานะการดำเนินงาน
                            </p>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-[#800020]">
                                <CalendarDays size={20} />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    วันที่และเวลาปัจจุบัน
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-800">
                                    {formatThaiDateTime(currentTime)}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Welcome banner */}
                    <section className="relative overflow-hidden rounded-2xl bg-[#800020] p-6 text-white shadow-sm sm:p-8">
                        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/10" />
                        <div className="pointer-events-none absolute -right-4 -top-12 h-52 w-52 rounded-full border border-white/10" />

                        <div className="relative flex items-center justify-between gap-5">
                            <div className="min-w-0">
                                <p className="text-sm text-white/70">
                                    ยินดีต้อนรับกลับ
                                </p>

                                <h2 className="mt-2 break-words text-2xl font-semibold sm:text-3xl">
                                    {staffName}
                                </h2>

                                <p className="mt-2 text-sm text-white/75">
                                    {staff?.position ||
                                        staff?.role ||
                                        "เจ้าหน้าที่"}
                                </p>

                                <p className="mt-4 max-w-xl text-sm leading-6 text-white/80">
                                    จัดการข้อมูล ตรวจสอบประวัติ และติดตาม
                                    สถานะการดำเนินงานได้จากเมนูด้านล่าง
                                </p>
                            </div>

                            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 sm:flex">
                                <LayoutDashboard
                                    size={32}
                                    strokeWidth={1.5}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Summary cards */}
                    <section>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                สรุปรายการ
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                สถานะข้อมูลบุคคลในระบบ
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <StatCard
                                title="รายการทั้งหมด"
                                value={totalRecords}
                                description="จำนวนรายการที่บันทึกในระบบ"
                                icon={Users}
                                iconClass="bg-rose-50 text-[#800020]"
                            />

                            <StatCard
                                title="รอดำเนินการ"
                                value={pendingRecords}
                                description="รายการที่ยังไม่ได้ดำเนินการ"
                                icon={Clock3}
                                iconClass="bg-amber-50 text-amber-700"
                            />

                            <StatCard
                                title="กำลังดำเนินการ"
                                value={processingRecords}
                                description="รายการที่อยู่ระหว่างดำเนินการ"
                                icon={Activity}
                                iconClass="bg-blue-50 text-blue-700"
                            />

                            <StatCard
                                title="ดำเนินการแล้ว"
                                value={completedRecords}
                                description="รายการที่ดำเนินการเรียบร้อย"
                                icon={CheckCircle2}
                                iconClass="bg-emerald-50 text-emerald-700"
                            />
                        </div>
                    </section>

                    {/* Work menu */}
                    <section>
                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-gray-900">
                                เมนูการทำงาน
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                เลือกหมวดงานที่ต้องการดำเนินการ
                            </p>
                        </div>

                        <div className="space-y-5">
                            {MENU_GROUPS.map((group, index) => {
                                const GroupIcon = group.icon;

                                return (
                                    <section
                                        key={group.title}
                                        className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                                    >
                                        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 sm:px-6">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-[#800020]">
                                                <GroupIcon size={22} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-[#800020]">
                                                    หมวดที่ {index + 1}
                                                </p>

                                                <h3 className="mt-0.5 font-semibold text-gray-900">
                                                    {group.title}
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {group.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
                                            {group.items.map((item) => {
                                                const ItemIcon = item.icon;

                                                return (
                                                    <Link
                                                        key={item.title}
                                                        to={item.to}
                                                        className="group flex min-w-0 items-center gap-3 rounded-xl border border-gray-100 p-4 transition duration-200 hover:border-rose-200 hover:bg-rose-50/40"
                                                    >
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-[#800020] transition group-hover:bg-rose-100">
                                                            <ItemIcon
                                                                size={20}
                                                                strokeWidth={1.8}
                                                            />
                                                        </div>

                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-medium text-gray-800">
                                                                {item.title}
                                                            </p>
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                {item.description}
                                                            </p>
                                                        </div>

                                                        <ArrowRight
                                                            size={16}
                                                            className="shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#800020]"
                                                        />
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                    </section>

                    {/* Latest records */}
                    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    รายการล่าสุด
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    แสดงรายการล่าสุดสูงสุด 10 รายการ
                                </p>
                            </div>

                            <div className="relative w-full sm:max-w-xs">
                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="ค้นหาชื่อหรือสถานะ..."
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#800020] focus:bg-white focus:ring-2 focus:ring-rose-100"
                                />

                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch("")}
                                        aria-label="ล้างคำค้นหา"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="m-5 flex flex-col gap-3 rounded-xl border border-red-100 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-red-700">
                                    {error}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => void loadRecords()}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-red-700"
                                >
                                    <RefreshCw size={15} />
                                    ลองอีกครั้ง
                                </button>
                            </div>
                        )}

                        {/* Desktop table */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/80 text-xs font-medium text-gray-500">
                                        <th className="px-6 py-4">
                                            ชื่อบุคคล
                                        </th>
                                        <th className="px-6 py-4">
                                            ประเภทคำขอ
                                        </th>
                                        <th className="px-6 py-4">
                                            วันที่บันทึก
                                        </th>
                                        <th className="px-6 py-4">
                                            สถานะ
                                        </th>
                                        <th className="px-6 py-4 text-right">
                                            รายละเอียด
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-12 text-center text-sm text-gray-500"
                                            >
                                                กำลังโหลดข้อมูล...
                                            </td>
                                        </tr>
                                    ) : latestRecords.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-12 text-center text-sm text-gray-500"
                                            >
                                                {search
                                                    ? "ไม่พบข้อมูลที่ตรงกับคำค้นหา"
                                                    : "ยังไม่มีข้อมูลรายการ"}
                                            </td>
                                        </tr>
                                    ) : (
                                        latestRecords.map((record, index) => {
                                            const recordId = getRecordId(record);
                                            const requestType =
                                                record.typeOfRequest ??
                                                record.requestType ??
                                                record.type ??
                                                "-";

                                            return (
                                                <tr
                                                    key={
                                                        recordId ||
                                                        `${getPersonName(record)}-${index}`
                                                    }
                                                    className="transition hover:bg-rose-50/30"
                                                >
                                                    <td className="px-6 py-4">
                                                        <p className="font-medium text-gray-800">
                                                            {getPersonName(record)}
                                                        </p>
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {String(requestType)}
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {formatThaiDate(
                                                            getRecordDate(record)
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(record)}`}
                                                        >
                                                            {getStatusLabel(record)}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4 text-right">
                                                        {recordId ? (
                                                            <Link
                                                                to={`/person/${encodeURIComponent(recordId)}`}
                                                                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[#800020] transition hover:bg-rose-50"
                                                            >
                                                                ดูรายละเอียด
                                                                <ArrowUpRight size={15} />
                                                            </Link>
                                                        ) : (
                                                            <span className="text-xs text-gray-400">
                                                                -
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards */}
                        <div className="divide-y divide-gray-100 md:hidden">
                            {loading ? (
                                <div className="px-5 py-12 text-center text-sm text-gray-500">
                                    กำลังโหลดข้อมูล...
                                </div>
                            ) : latestRecords.length === 0 ? (
                                <div className="px-5 py-12 text-center text-sm text-gray-500">
                                    {search
                                        ? "ไม่พบข้อมูลที่ตรงกับคำค้นหา"
                                        : "ยังไม่มีข้อมูลรายการ"}
                                </div>
                            ) : (
                                latestRecords.map((record, index) => {
                                    const recordId = getRecordId(record);
                                    const requestType =
                                        record.typeOfRequest ??
                                        record.requestType ??
                                        record.type ??
                                        "-";

                                    return (
                                        <div
                                            key={
                                                recordId ||
                                                `${getPersonName(record)}-${index}`
                                            }
                                            className="space-y-3 p-5"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="break-words font-semibold text-gray-800">
                                                        {getPersonName(record)}
                                                    </p>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {String(requestType)}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(record)}`}
                                                >
                                                    {getStatusLabel(record)}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-xs text-gray-500">
                                                    {formatThaiDate(
                                                        getRecordDate(record)
                                                    )}
                                                </span>

                                                {recordId && (
                                                    <Link
                                                        to={`/person/${encodeURIComponent(recordId)}`}
                                                        className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[#800020]"
                                                    >
                                                        ดูรายละเอียด
                                                        <ArrowRight size={15} />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        <div className="flex flex-col gap-1 border-t border-gray-100 bg-gray-50/50 px-5 py-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <span>
                                แสดง {latestRecords.length} จาก{" "}
                                {filteredRecords.length} รายการที่ตรงกับคำค้นหา
                            </span>

                            <span>สูงสุด 10 รายการ</span>
                        </div>
                    </section>

                    <footer className="pb-3 text-center text-xs text-gray-400">
                        ระบบจัดการข้อมูลบุคคล
                    </footer>
                </div>
            </main>
        </div>
    );
}
