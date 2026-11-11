import { useNavigate } from "react-router-dom";

type SettingItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  path: string;
  number: string;
  color: string;
  lightColor: string;
  borderColor: string;
  icon: "admin" | "building" | "profile";
};

const settings: SettingItem[] = [
  {
    id: "admin",
    title: "จัดการผู้ดูแลระบบ",
    subtitle: "ADMIN MANAGEMENT",
    description:
      "เพิ่ม แก้ไข และจัดการบัญชีผู้ดูแลระบบ รวมถึงกำหนดสิทธิ์การเข้าใช้งาน",
    path: "/admin/create",
    number: "01",
    color: "#7C3AED",
    lightColor: "#F3E8FF",
    borderColor: "#E9D5FF",
    icon: "admin",
  },
  {
    id: "organization",
    title: "ข้อมูลหน่วยงาน",
    subtitle: "ORGANIZATION",
    description:
      "จัดการข้อมูลหน่วยงาน รายละเอียดติดต่อ และข้อมูลที่ใช้ในเอกสารของระบบ",
    path: "/organization",
    number: "02",
    color: "#0891B2",
    lightColor: "#CFFAFE",
    borderColor: "#A5F3FC",
    icon: "building",
  },
  {
    id: "profile",
    title: "โปรไฟล์ส่วนตัว",
    subtitle: "PERSONAL PROFILE",
    description: "ตรวจสอบและแก้ไขข้อมูลส่วนตัวของผู้ใช้งานในระบบ",
    path: "/profile",
    number: "03",
    color: "#D97706",
    lightColor: "#FEF3C7",
    borderColor: "#FDE68A",
    icon: "profile",
  },
];

function SettingIcon({ type }: { type: SettingItem["icon"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "admin") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 8v6M23 11h-6" />
      </svg>
    );
  }

  if (type === "building") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" {...common}>
        <path d="M3 21h18M5 21V5l7-3 7 3v16" />
        <path d="M9 9h1M14 9h1M9 13h1M14 13h1M10 21v-4h4v4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...common}>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
      <path d="M19 8h2M20 7v2" />
    </svg>
  );
}

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F6FA] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 md:hidden">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            ย้อนกลับ
          </button>
        </div>

        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#4C164C] via-[#800020] to-[#B4235A] px-6 py-8 text-white shadow-xl shadow-rose-950/10 sm:px-9 sm:py-10">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 right-1/3 h-64 w-64 rounded-full bg-pink-400/20 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-rose-100/80">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
                SYSTEM / SETTINGS
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-inner backdrop-blur-md">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-8 w-8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                    <path d="m19.4 15 .1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 0 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 0 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V2a1.7 1.7 0 0 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 0 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z" />
                  </svg>
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    ตั้งค่าระบบ
                  </h1>
                  <p className="mt-1 text-sm text-rose-100/80 sm:text-base">
                    จัดการข้อมูลและกำหนดค่าการใช้งานระบบ
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md lg:self-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.64 5.64l1.42 1.42M16.95 16.95l1.41 1.41M18.36 5.64l-1.41 1.42M7.05 16.95l-1.41 1.41" />
                  <circle cx="12" cy="12" r="5" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-rose-100/70">SYSTEM MODULES</p>
                <p className="text-lg font-bold">03 รายการ</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-[#800020]">
              CONFIGURATION
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-800 sm:text-2xl">
              การตั้งค่าทั่วไป
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              เลือกเมนูที่ต้องการจัดการ
            </p>
          </div>
          <p className="text-xs font-medium text-slate-400">
            3 MANAGEMENT MODULES
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {settings.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.path)}
              className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#800020]/20"
            >
              <div
                className="absolute inset-x-0 top-0 h-1.5 transition-all duration-300 group-hover:h-2"
                style={{ backgroundColor: item.color }}
              />

              <div
                className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-40 blur-2xl transition duration-500 group-hover:scale-150"
                style={{ backgroundColor: item.lightColor }}
              />

              <div className="relative z-10 flex w-full items-start justify-between">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    backgroundColor: item.lightColor,
                    color: item.color,
                  }}
                >
                  <SettingIcon type={item.icon} />
                </div>

                <span
                  className="text-3xl font-black tracking-tight opacity-20"
                  style={{ color: item.color }}
                >
                  {item.number}
                </span>
              </div>

              <div className="relative z-10 mt-6 flex-1">
                <p
                  className="text-[10px] font-bold tracking-[0.16em]"
                  style={{ color: item.color }}
                >
                  {item.subtitle}
                </p>

                <h3 className="mt-2 text-lg font-bold text-slate-800 transition group-hover:text-[#800020]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>

              <div className="relative z-10 mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-semibold text-slate-400 transition group-hover:text-slate-600">
                  เข้าสู่การจัดการ
                </span>

                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full transition duration-300 group-hover:translate-x-1"
                  style={{
                    backgroundColor: item.lightColor,
                    color: item.color,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
