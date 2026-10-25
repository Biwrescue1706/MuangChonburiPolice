// src/components/Nav.tsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

type MenuChild = {
  path: string;
  label: string;
  description: string;
  icon: string;
};

type MenuItem = {
  path?: string;
  label: string;
  description?: string;
  icon: string;
  children?: MenuChild[];
};

const menuItems: MenuItem[] = [
  {
    path: "/dashboard",
    label: "หน้าแรก",
    description: "ภาพรวมระบบ",
    icon: "home",
  },
  {
    label: "บุคคลตรวจ",
    icon: "person",
    children: [
      {
        path: "/person/create",
        label: "เพิ่มบุคคลตรวจ",
        description: "บันทึกข้อมูลบุคคล",
        icon: "personAdd",
      },
      {
        path: "/person/history",
        label: "ประวัติทั้งหมดแต่ละบุคคล",
        description: "ข้อมูลประวัติบุคคลตรวจ",
        icon: "history",
      },
    ],
  },
  {
    label: "ส่ง ศพฐ.",
    icon: "send",
    children: [
      {
        path: "/forensic-submission",
        label: "ออกเลขหนังสือ ส่ง ศพฐ.",
        description: "จัดการการออกเลขหนังสือ",
        icon: "send",
      },
      {
        path: "/forensic-submission/list",
        label: "รายการหนังสือที่ส่ง ศพฐ.",
        description: "รายการหนังสือส่งตรวจ",
        icon: "document",
      },
    ],
  },
  {
    path: "/forensic-scan",
    label: "สแกนเอกสาร",
    description: "สแกน QR Code เอกสาร ศพฐ.",
    icon: "scan",
  },
  {
    label: "คนต่างด้าว",
    icon: "foreigner",
    children: [
      {
        path: "/foreigner/create",
        label: "เพิ่มคนต่างด้าว",
        description: "บันทึกข้อมูลคนต่างด้าว",
        icon: "personAdd",
      },
      {
        path: "/foreigner",
        label: "ประวัติคนต่างด้าว",
        description: "ดูประวัติข้อมูลคนต่างด้าว",
        icon: "history",
      },
    ],
  },
  {
    path: "/settings",
    label: "ตั้งค่า",
    description: "จัดการการตั้งค่าระบบ",
    icon: "settings",
  },
];

const morePaths = [
  "/forensic-scan",
  "/foreigner/create",
  "/foreigner",
  "/settings",
];

function MenuIcon({
  type,
  size = 21,
}: {
  type: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "home":
      return (
        <svg {...common}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );

    case "person":
    case "foreigner":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M4.5 20c.7-3.2 3.3-5 7.5-5s6.8 1.8 7.5 5" />
        </svg>
      );

    case "personAdd":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20c.7-3.2 3.3-5 6.5-5 3.3 0 5.8 1.8 6.5 5" />
          <path d="M18 8v6" />
          <path d="M15 11h6" />
        </svg>
      );

    case "history":
    case "document":
      return (
        <svg {...common}>
          <path d="M6 3.5h8l4 4V20H6z" />
          <path d="M14 3.5V8h4" />
          <path d="M9 12h6" />
          <path d="M9 15.5h6" />
        </svg>
      );

    case "send":
      return (
        <svg {...common}>
          <path d="m21 3-7.5 18-3.5-8L3 9.5z" />
          <path d="M21 3 10 13" />
        </svg>
      );

    case "scan":
      return (
        <svg {...common}>
          <path d="M4 7V5a1 1 0 0 1 1-1h2" />
          <path d="M17 4h2a1 1 0 0 1 1 1v2" />
          <path d="M20 17v2a1 1 0 0 1-1 1h-2" />
          <path d="M7 20H5a1 1 0 0 1-1-1v-2" />
          <path d="M7 8h3v3H7z" />
          <path d="M14 8h3v3h-3z" />
          <path d="M7 14h3v3H7z" />
          <path d="M14 14h3" />
          <path d="M17 17h.01" />
        </svg>
      );

    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.5v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8.1 15a1.7 1.7 0 0 0-1.5-1H6.5v-2.5h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.5v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v2.5h-.1a1.7 1.7 0 0 0-1.5 1Z" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

function ArrowIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function LogoutIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 5H5v14h5" />
      <path d="m14 8 4 4-4 4" />
      <path d="M18 12H9" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export default function Nav() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] =
    useState<MenuItem | null>(null);

  const isActive = (path: string) =>
    location.pathname === path;

  const hasActiveChild = (item: MenuItem) =>
    item.children?.some(
      (child) => location.pathname === child.path,
    ) ?? false;

  const isMoreActive = morePaths.includes(location.pathname);

  useEffect(() => {
    const activeParent = menuItems.find(
      (item) => item.children && hasActiveChild(item),
    );

    if (activeParent) {
      setOpenMenus((prev) =>
        prev.includes(activeParent.label)
          ? prev
          : [...prev, activeParent.label],
      );
    }
  }, [location.pathname]);

  useEffect(() => {
    setSelectedMenu(null);
  }, [location.pathname]);

  const go = (path: string) => {
    setSelectedMenu(null);
    navigate(path);
  };

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const openMobileMenu = (label: string) => {
    if (label === "เพิ่มเติม") {
      setSelectedMenu({
        label: "เพิ่มเติม",
        icon: "settings",
        children: [],
      });
      return;
    }

    const item = menuItems.find(
      (menu) => menu.label === label,
    );

    if (item) {
      setSelectedMenu(item);
    }
  };

  const handleLogout = async () => {
    setSelectedMenu(null);
    await logout();
    navigate("/");
  };

  const shortText = (text: string = "", max = 18) => {
    if (!text) return "-";

    return text.length > max
      ? `${text.substring(0, max)}...`
      : text;
  };

  const mobileMenuItems = menuItems.filter(
    (item) =>
      item.path === "/forensic-scan" ||
      item.path === "/settings" ||
      item.label === "คนต่างด้าว",
  );

  const renderMobileItem = (item: MenuItem) => {
    if (item.children) {
      return (
        <div key={item.label} className="space-y-2">
          {item.children.map((child) => {
            const active = isActive(child.path);

            return (
              <button
                key={child.path}
                type="button"
                onClick={() => go(child.path)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors ${
                  active
                    ? "border-[#800020]/15 bg-[#800020]/[0.06]"
                    : "border-gray-100 bg-white active:bg-gray-50"
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    active
                      ? "bg-[#800020] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <MenuIcon type={child.icon} size={21} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-gray-800">
                    {child.label}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-gray-500">
                    {child.description}
                  </span>
                </span>

                <span className="text-xl text-gray-400">›</span>
              </button>
            );
          })}
        </div>
      );
    }

    const active = item.path
      ? isActive(item.path)
      : hasActiveChild(item);

    return (
      <button
        key={item.path ?? item.label}
        type="button"
        onClick={() => item.path && go(item.path)}
        className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors ${
          active
            ? "border-[#800020]/15 bg-[#800020]/[0.06]"
            : "border-gray-100 bg-white active:bg-gray-50"
        }`}
      >
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            active
              ? "bg-[#800020] text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <MenuIcon type={item.icon} size={21} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-gray-800">
            {item.label}
          </span>
          <span className="mt-1 block text-xs text-gray-500">
            {item.description}
          </span>
        </span>

        <span className="text-xl text-gray-400">›</span>
      </button>
    );
  };

  return (
    <>
      {/* Desktop Topbar: tablet and above */}
      <header className="fixed left-0 top-0 z-40 hidden h-[58px] w-full items-center border-b border-white/10 bg-[#800020] text-white shadow-sm min-[768px]:flex">
        <div className="flex h-full w-full items-center pl-[260px] pr-6">
          <button
            type="button"
            onClick={() => go("/dashboard")}
            className="flex items-center gap-2 text-left"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
              <img
                src="/assets/muangchonburi.webp"
                alt="โลโก้สถานีตำรวจภูธรเมืองชลบุรี"
                className="h-7 w-7 object-contain"
              />
            </span>

            <span>
              <span className="block text-xs font-bold">
                งานพิมพ์มือตรวจประวัติ
              </span>
              <span className="mt-0.5 block text-[10px] text-white/65">
                งานนโยบายและแผน
              </span>
            </span>
          </button>

          <div className="ml-auto flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <MenuIcon type="person" size={20} />
            </div>

            <div className="max-w-[220px] text-right">
              <p className="truncate text-xs font-semibold">
                {shortText(admin?.name || "")}
              </p>
              <p className="mt-1 truncate text-[10px] text-white/65">
                {admin?.position || "-"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="fixed bottom-0 left-0 top-0 z-30 hidden w-[240px] flex-col border-r border-gray-200 bg-white min-[768px]:flex">
        <button
          type="button"
          onClick={() => go("/dashboard")}
          className="flex h-[58px] shrink-0 items-center gap-2.5 border-b border-gray-100 px-4 text-left"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
            <img
              src="/assets/muangchonburi.webp"
              alt="โลโก้"
              className="h-8 w-8 object-contain"
            />
          </span>

          <span className="min-w-0">
            <span className="block truncate text-[11px] font-bold text-gray-800">
              งานพิมพ์มือตรวจประวัติ
            </span>
            <span className="mt-1 block text-[10px] text-gray-500">
              งานนโยบายและแผน
            </span>
          </span>
        </button>

        <div className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[10px] font-semibold tracking-wide text-gray-400">
            เมนูระบบ
          </p>

          {menuItems.map((item) => {
            if (item.children) {
              const parentActive = hasActiveChild(item);
              const isOpen = openMenus.includes(item.label);

              return (
                <div key={item.label} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => toggleMenu(item.label)}
                    aria-expanded={isOpen}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                      parentActive
                        ? "bg-[#800020]/[0.06] text-[#800020]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#800020]"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        parentActive
                          ? "bg-[#800020] text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <MenuIcon type={item.icon} size={19} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-[10px] text-gray-400">
                        เมนูย่อย
                      </span>
                    </span>

                    <ArrowIcon open={isOpen} />
                  </button>

                  {isOpen && (
                    <div className="ml-7 space-y-1 border-l border-gray-200 pl-3">
                      {item.children.map((child) => {
                        const active = isActive(child.path);

                        return (
                          <button
                            key={child.path}
                            type="button"
                            onClick={() => go(child.path)}
                            className={`flex w-full items-start gap-2 rounded-lg px-2.5 py-2.5 text-left transition-colors ${
                              active
                                ? "bg-[#800020]/[0.07] text-[#800020]"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                            }`}
                          >
                            <span className="mt-0.5 shrink-0">
                              <MenuIcon type={child.icon} size={16} />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block text-[11px] font-medium leading-relaxed">
                                {child.label}
                              </span>
                              <span className="mt-1 block text-[9px] leading-relaxed text-gray-400">
                                {child.description}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const active = isActive(item.path!);

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => go(item.path!)}
                className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                  active
                    ? "bg-[#800020]/[0.07] text-[#800020]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#800020]"
                }`}
              >
                {active && (
                  <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-[#800020]" />
                )}

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    active
                      ? "bg-[#800020] text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <MenuIcon type={item.icon} size={19} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold">
                    {item.label}
                  </span>
                  <span className="mt-1 block truncate text-[10px] text-gray-400">
                    {item.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="shrink-0 border-t border-gray-100 p-3">
          <div className="mb-3 flex items-center gap-2.5 rounded-xl bg-gray-50 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#800020] ring-1 ring-gray-200">
              <MenuIcon type="person" size={20} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold text-gray-800">
                {admin?.name || "-"}
              </span>
              <span className="mt-1 block truncate text-[10px] text-gray-500">
                {admin?.position || "-"}
              </span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => void handleLogout()}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogoutIcon size={19} />
            ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation: below 768px */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] min-[768px]:hidden">
        <div className="mx-auto grid h-[64px] max-w-xl grid-cols-4">
          {[
            {
              label: "หน้าแรก",
              icon: "home",
              path: "/dashboard",
            },
            {
              label: "บุคคลตรวจ",
              icon: "person",
              menu: "บุคคลตรวจ",
            },
            {
              label: "ส่ง ศพฐ.",
              icon: "send",
              menu: "ส่ง ศพฐ.",
            },
            {
              label: "เพิ่มเติม",
              icon: "settings",
              menu: "เพิ่มเติม",
            },
          ].map((navItem) => {
            let active = false;

            if (navItem.path) {
              active = isActive(navItem.path);
            } else if (navItem.menu === "บุคคลตรวจ") {
              const item = menuItems.find(
                (menu) => menu.label === "บุคคลตรวจ",
              );
              active = item ? hasActiveChild(item) : false;
            } else if (navItem.menu === "ส่ง ศพฐ.") {
              const item = menuItems.find(
                (menu) => menu.label === "ส่ง ศพฐ.",
              );
              active = item ? hasActiveChild(item) : false;
            } else {
              active = isMoreActive;
            }

            const sheetOpen =
              selectedMenu?.label === navItem.menu;

            return (
              <button
                key={navItem.label}
                type="button"
                aria-label={navItem.label}
                aria-expanded={
                  navItem.menu ? sheetOpen : undefined
                }
                onClick={() => {
                  if (navItem.path) {
                    go(navItem.path);
                  } else {
                    openMobileMenu(navItem.menu!);
                  }
                }}
                className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
                  active || sheetOpen
                    ? "text-[#800020]"
                    : "text-gray-500"
                }`}
              >
                {(active || sheetOpen) && (
                  <span className="absolute left-1/2 top-0 h-[3px] w-9 -translate-x-1/2 rounded-b-full bg-[#800020]" />
                )}

                <span
                  className={`flex h-8 w-11 items-center justify-center rounded-xl ${
                    active || sheetOpen
                      ? "bg-[#800020]/[0.07]"
                      : ""
                  }`}
                >
                  <MenuIcon type={navItem.icon} size={21} />
                </span>

                <span
                  className={`text-[10px] ${
                    active || sheetOpen
                      ? "font-bold"
                      : "font-medium"
                  }`}
                >
                  {navItem.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Menu Selection Sheet */}
      {selectedMenu && (
        <div className="fixed inset-0 z-[70] min-[768px]:hidden">
          <button
            type="button"
            aria-label="ปิดเมนู"
            onClick={() => setSelectedMenu(null)}
            className="absolute inset-0 h-full w-full bg-black/35 backdrop-blur-[2px]"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-label={
              selectedMenu.label === "เพิ่มเติม"
                ? "เมนูเพิ่มเติม"
                : `เลือก${selectedMenu.label}`
            }
            className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-[24px] bg-white pb-[calc(16px+env(safe-area-inset-bottom))] shadow-2xl"
          >
            <div className="sticky top-0 rounded-t-[24px] bg-white">
              <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-gray-200" />

              <div className="flex items-center justify-between px-5 pb-4 pt-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {selectedMenu.label === "เพิ่มเติม"
                      ? "เมนูเพิ่มเติม"
                      : `เลือก${selectedMenu.label}`}
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    เลือกรายการที่ต้องการใช้งาน
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="ปิด"
                  onClick={() => setSelectedMenu(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div className="space-y-2 px-4">
              {(selectedMenu.label === "เพิ่มเติม"
                ? mobileMenuItems
                : [selectedMenu]
              ).map(renderMobileItem)}
            </div>

            <div className="mx-4 mt-4 border-t border-gray-100 pt-3">
              <button
                type="button"
                onClick={() => void handleLogout()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
              >
                <LogoutIcon size={19} />
                ออกจากระบบ
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Page Content */}
      <main className="min-h-screen pb-[calc(80px+env(safe-area-inset-bottom))] min-[768px]:ml-[240px] min-[768px]:pb-0 min-[768px]:pt-[58px]">
        <Outlet />
      </main>
    </>
  );
}
