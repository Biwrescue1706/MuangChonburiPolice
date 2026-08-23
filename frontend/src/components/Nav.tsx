// src/components/Nav.tsx

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

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

export default function Nav() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  // เปิดเมนูย่อยเริ่มต้น
  const [openMenus, setOpenMenus] = useState<string[]>([
    "บุคคลตรวจ",
    "ส่ง ศพฐ.",
    "ตั้งค่า",
  ]);

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // ============================================================
  // SHORT TEXT
  // ============================================================

  const shortText = (text: string = "", max: number = 16) => {
    if (!text) return "-";

    return text.length > max ? `${text.substring(0, max)}...` : text;
  };

  // ============================================================
  // ACTIVE
  // ============================================================

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // ============================================================
  // NAVIGATE
  // ============================================================

  const go = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  // ============================================================
  // TOGGLE SUB MENU
  // ============================================================

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  // ============================================================
  // CHECK ACTIVE CHILD
  // ============================================================

  const hasActiveChild = (item: MenuItem) => {
    return (
      item.children?.some((child) => location.pathname === child.path) ?? false
    );
  };

  // ============================================================
  // MENU DATA
  // ============================================================

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
          description: "ข้อมูลประวัติทั้งหมดแต่ละบุคคล",
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
          description: "จัดการการออกเลขหนังสือ ส่ง ศพฐ.",
          icon: "send",
        },
        {
          path: "/forensic-submission/list",
          label: "รายการหนังสือ ที่ส่ง ศพฐ.",
          description: "รายการหนังสือส่งตรวจ กับ ศพฐ.",
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

    // ============================================================
    // คนต่างด้าว
    // ============================================================

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

  // ============================================================
  // MENU ICON
  // ============================================================

  const MenuIcon = ({ type, size = 21 }: { type: string; size?: number }) => {
    if (type === "home") {
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
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    }

    if (type === "person") {
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
          <circle cx="12" cy="8" r="3.5" />
          <path d="M4.5 20c.7-3.2 3.3-5 7.5-5s6.8 1.8 7.5 5" />
        </svg>
      );
    }

    if (type === "personAdd") {
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
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20c.7-3.2 3.3-5 6.5-5 3.3 0 5.8 1.8 6.5 5" />
          <path d="M18 8v6" />
          <path d="M15 11h6" />
        </svg>
      );
    }

    if (type === "history") {
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
          <path d="M6 3.5h8l4 4V20H6z" />
          <path d="M14 3.5V8h4" />
          <path d="M9 12h6" />
          <path d="M9 15.5h6" />
        </svg>
      );
    }

    if (type === "send") {
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
          <path d="m21 3-7.5 18-3.5-8L3 9.5z" />
          <path d="M21 3 10 13" />
        </svg>
      );
    }

    if (type === "document") {
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
          <path d="M6 3.5h8l4 4V20H6z" />
          <path d="M14 3.5V8h4" />
          <path d="M9 12h6" />
          <path d="M9 15.5h6" />
        </svg>
      );
    }

    if (type === "scan") {
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
    }

    if (type === "admin") {
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
          <circle cx="12" cy="8" r="3.5" />
          <path d="M4.5 20c.7-3.2 3.3-5 7.5-5s6.8 1.8 7.5 5" />
          <path d="M19 4v4" />
          <path d="M17 6h4" />
        </svg>
      );
    }

    if (type === "building") {
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
          <path d="M4 21V5l8-2v18" />
          <path d="M12 8h8v13" />
          <path d="M7 8h2" />
          <path d="M7 12h2" />
          <path d="M7 16h2" />
          <path d="M15 12h2" />
          <path d="M15 16h2" />
        </svg>
      );
    }

    // SETTINGS
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
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2.5v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8.1 15a1.7 1.7 0 0 0-1.5-1H6.5v-2.5h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.5v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V14h-.1a1.7 1.7 0 0 0-1.5 1Z" />
      </svg>
    );
  };

  // ============================================================
  // ARROW ICON
  // ============================================================

  const ArrowIcon = ({ open, size = 16 }: { open: boolean; size?: number }) => (
    <svg
      width={size}
      height={size}
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

  // ============================================================
  // LOGOUT ICON
  // ============================================================

  const LogoutIcon = ({ size = 21 }: { size?: number }) => (
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
      <path d="M14 8l4 4-4 4" />
      <path d="M18 12H9" />
    </svg>
  );

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      {/* ========================================================
          TOPBAR
      ======================================================== */}

      <header className="fixed left-0 top-0 z-40 h-[58px] w-full border-b border-white/10 bg-gradient-to-r from-[#720019] to-[#800020] text-white shadow-lg">
        <div
          className="
            relative
            mx-auto
            flex
            h-full
            w-full
            items-center
            px-3
            min-[480px]:px-2
            min-[768px]:px-2
            min-[1200px]:pl-[120px]
            min-[1200px]:pr-2
          "
        >
          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="เปิดเมนู"
            className="
              flex
              h-10
              w-20
              items-center
              justify-center
              rounded-xl
              border
              border-white/15
              bg-white/10
              text-white
              transition
              hover:bg-white/20
              active:scale-95
              min-[1200px]:hidden
            "
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>

          {/* BRAND */}

          <button
            type="button"
            onClick={() => go("/dashboard")}
            className="
              absolute
              left-1/2
              flex
              -translate-x-1/2
              items-center
              gap-2
              border-0
              bg-transparent
              p-0
              text-left
              min-[1200px]:static
              min-[1200px]:translate-x-0
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-md
              "
            >
              <img
                src="/muangchonburi.webp"
                alt="โลโก้"
                className="h-7 w-7 object-contain"
              />
            </div>

            <div className="hidden min-[480px]:block leading-none">
              <p className="m-0 whitespace-nowrap text-xs font-bold leading-tight text-white">
                งานพิมพ์มือตรวจประวัติ
              </p>

              <p className="m-0 mt-0.5 whitespace-nowrap text-[14px] font-semibold leading-tight text-white/65">
                งานนโยบายและแผน
              </p>
            </div>
          </button>

          {/* USER */}

          <div className="ml-auto flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                ring-1
                ring-white/10
              "
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path d="M4.5 20c.7-3.2 3.3-5 7.5-5s6.8 1.8 7.5 5" />
              </svg>
            </div>

            <div className="hidden min-[480px]:block leading-none text-right">
              <p className="m-0 text-xs font-bold leading-tight text-white">
                {shortText(admin?.name || "", 18)}
              </p>

              <p className="m-0 mt-1 text-[10px] leading-tight text-white/60">
                {admin?.position || "-"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          DESKTOP SIDEBAR
          >= 1200px
      ======================================================== */}

      <aside
        className="
          fixed
          left-0
          top-0
          z-30
          hidden
          h-screen
          w-[240px]
          flex-col
          bg-[#720019]
          text-white
          shadow-xl
          min-[1200px]:flex
        "
      >
        {/* Sidebar Logo */}

        <div
          className="
            flex
            h-[58px]
            shrink-0
            items-center
            justify-center
            border-b
            border-white/10
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-md
            "
          >
            <img
              src="/muangchonburi.webp"
              alt="โลโก้"
              className="h-7 w-7 object-contain"
            />
          </div>

          <div className="ml-2">
            <p className="text-xs font-bold">งานพิมพ์มือตรวจประวัติ</p>

            <p className="text-[9px] text-white/50">งานนโยบายและแผน</p>
          </div>
        </div>

        {/* Sidebar Menu */}

        <div
          className="
            flex
            flex-1
            flex-col
            gap-1
            overflow-y-auto
            p-3
          "
        >
          {menuItems.map((item) => {
            // ==================================================
            // SUB MENU
            // ==================================================

            if (item.children) {
              const parentActive = hasActiveChild(item);
              const isOpen = openMenus.includes(item.label);

              return (
                <div key={item.label} className="space-y-1">
                  {/* Parent */}

                  <button
                    type="button"
                    onClick={() => toggleMenu(item.label)}
                    title={item.label}
                    className={`
                      group
                      relative
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      border
                      px-3
                      py-2.5
                      text-left
                      transition-all
                      duration-200

                      ${
                        parentActive
                          ? "border-white/10 bg-white/10 text-white"
                          : "border-transparent text-white/75 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    <span className="shrink-0">
                      <MenuIcon type={item.icon} size={20} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-bold">
                        {item.label}
                      </span>

                      <span className="mt-0.5 block truncate text-[9px] text-white/40">
                        เมนูย่อย
                      </span>
                    </span>

                    <span className="shrink-0 text-white/50">
                      <ArrowIcon open={isOpen} />
                    </span>
                  </button>

                  {/* Children */}

                  {isOpen && (
                    <div className="ml-3 space-y-1 border-l border-white/10 pl-2">
                      {item.children.map((child) => {
                        const active = isActive(child.path);

                        return (
                          <button
                            key={child.path}
                            type="button"
                            onClick={() => go(child.path)}
                            title={child.label}
                            className={`
                              group
                              relative
                              flex
                              w-full
                              items-center
                              gap-2
                              rounded-lg
                              px-2
                              py-2
                              text-left
                              transition-all
                              duration-200

                              ${
                                active
                                  ? "bg-white text-[#800020] shadow-md"
                                  : "text-white/65 hover:bg-white/10 hover:text-white"
                              }
                            `}
                          >
                            {active && (
                              <span
                                className="
                                  absolute
                                  -left-[9px]
                                  top-1/2
                                  h-6
                                  w-1
                                  -translate-y-1/2
                                  rounded-r-full
                                  bg-white
                                "
                              />
                            )}

                            <span className="shrink-0">
                              <MenuIcon type={child.icon} size={17} />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[11px] font-semibold">
                                {child.label}
                              </span>

                              <span
                                className={`
                                  mt-0.5
                                  block
                                  truncate
                                  text-[8px]
                                  ${
                                    active
                                      ? "text-[#800020]/50"
                                      : "text-white/35"
                                  }
                                `}
                              >
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

            // ==================================================
            // NORMAL MENU
            // ==================================================

            if (!item.path) {
              return null;
            }

            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => go(item.path!)}
                title={item.label}
                className={`
                  group
                  relative
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  border
                  px-3
                  py-2.5
                  text-left
                  transition-all
                  duration-200

                  ${
                    active
                      ? "border-white/10 bg-white text-[#800020] shadow-md"
                      : "border-transparent text-white/75 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {active && (
                  <span
                    className="
                      absolute
                      left-0
                      top-1/2
                      h-7
                      w-1
                      -translate-y-1/2
                      rounded-r-full
                      bg-[#800020]
                    "
                  />
                )}

                <span className="shrink-0">
                  <MenuIcon type={item.icon} size={20} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-bold">
                    {item.label}
                  </span>

                  <span
                    className={`
                      mt-0.5
                      block
                      truncate
                      text-[9px]
                      ${active ? "text-[#800020]/50" : "text-white/40"}
                    `}
                  >
                    {item.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop Logout */}

        <div
          className="
            shrink-0
            border-t
            border-white/10
            p-3
          "
        >
          <button
            type="button"
            onClick={handleLogout}
            title="ออกจากระบบ"
            className="
              flex
              w-full
              items-center
              justify-start
              gap-3
              rounded-xl
              bg-white/10
              px-3
              py-3
              text-white
              transition
              hover:bg-red-600
            "
          >
            <LogoutIcon />

            <span className="text-xs font-bold">ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* ========================================================
          MOBILE DRAWER
          < 1200px
      ======================================================== */}

      {/* Overlay */}

      {menuOpen && (
        <button
          type="button"
          aria-label="ปิดเมนู"
          onClick={() => setMenuOpen(false)}
          className="
            fixed
            inset-0
            z-50
            cursor-default
            border-0
            bg-black/50
            backdrop-blur-[2px]
            min-[1200px]:hidden
          "
        />
      )}

      {/* Drawer */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[60]
          flex
          h-screen
          w-[290px]
          max-w-[82vw]
          flex-col
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ease-out

          min-[1200px]:hidden

          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Drawer Header */}

        <div
          className="
            flex
            h-[76px]
            shrink-0
            items-center
            justify-between
            bg-gradient-to-r
            from-[#720019]
            to-[#800020]
            px-4
            text-white
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-md
              "
            >
              <img
                src="/muangchonburi.webp"
                alt="โลโก้"
                className="h-8 w-8 object-contain"
              />
            </div>

            <div className="leading-none">
              <p className="m-0 text-sm font-bold leading-tight">เมนูหลัก</p>

              <p className="m-0 mt-1 text-[10px] leading-tight text-white/60">
                งานพิมพ์มือตรวจประวัติ
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="ปิดเมนู"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-white/10
              text-white
              transition
              hover:bg-white/20
              active:scale-95
            "
          >
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
          </button>
        </div>

        {/* User Info */}

        <div
          className="
            border-b
            border-gray-100
            bg-gray-50
            px-4
            py-4
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#800020]/10
                text-[#800020]
              "
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path d="M4.5 20c.7-3.2 3.3-5 7.5-5s6.8 1.8 7.5 5" />
              </svg>
            </div>

            <div className="min-w-0 leading-none">
              <p className="m-0 truncate text-sm font-bold leading-tight text-gray-900">
                {admin?.name || "-"}
              </p>

              <p className="m-0 mt-1 truncate text-[10px] leading-tight text-gray-400">
                {admin?.position || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}

        <div
          className="
            flex-1
            overflow-y-auto
            p-3
          "
        >
          <p
            className="
              mb-2
              px-2
              text-[10px]
              font-bold
              uppercase
              tracking-widest
              text-gray-400
            "
          >
            เมนูระบบ
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              // ==================================================
              // SUB MENU
              // ==================================================

              if (item.children) {
                const parentActive = hasActiveChild(item);

                const isOpen = openMenus.includes(item.label);

                return (
                  <div key={item.label} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => toggleMenu(item.label)}
                      className={`
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-left
                        transition-all

                        ${
                          parentActive
                            ? "bg-[#800020]/10 text-[#800020]"
                            : "text-gray-600 hover:bg-gray-50 hover:text-[#800020]"
                        }
                      `}
                    >
                      <span
                        className={`
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg

                          ${
                            parentActive
                              ? "bg-[#800020] text-white"
                              : "bg-gray-100 text-gray-500"
                          }
                        `}
                      >
                        <MenuIcon type={item.icon} size={19} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold">
                          {item.label}
                        </span>

                        <span className="mt-0.5 block text-[10px] text-gray-400">
                          เมนูย่อย
                        </span>
                      </span>

                      <span
                        className={
                          parentActive ? "text-[#800020]" : "text-gray-400"
                        }
                      >
                        <ArrowIcon open={isOpen} size={18} />
                      </span>
                    </button>

                    {/* Mobile Children */}

                    {isOpen && (
                      <div className="ml-5 space-y-1 border-l-2 border-[#800020]/10 pl-2">
                        {item.children.map((child) => {
                          const active = isActive(child.path);

                          return (
                            <button
                              key={child.path}
                              type="button"
                              onClick={() => go(child.path)}
                              className={`
                                  flex
                                  w-full
                                  items-center
                                  gap-3
                                  rounded-xl
                                  px-3
                                  py-2.5
                                  text-left
                                  transition-all

                                  ${
                                    active
                                      ? "bg-[#800020]/10 text-[#800020]"
                                      : "text-gray-600 hover:bg-gray-50 hover:text-[#800020]"
                                  }
                                `}
                            >
                              <span
                                className={`
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg

                                    ${
                                      active
                                        ? "bg-[#800020] text-white"
                                        : "bg-gray-100 text-gray-500"
                                    }
                                  `}
                              >
                                <MenuIcon type={child.icon} size={17} />
                              </span>

                              <span className="min-w-0 flex-1">
                                <span className="block text-xs font-semibold">
                                  {child.label}
                                </span>

                                <span className="mt-0.5 block truncate text-[9px] text-gray-400">
                                  {child.description}
                                </span>
                              </span>

                              {active && (
                                <span className="h-2 w-2 shrink-0 rounded-full bg-[#800020]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // ==================================================
              // NORMAL MENU
              // ==================================================

              if (!item.path) {
                return null;
              }

              const active = isActive(item.path);

              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => go(item.path!)}
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-left
                    transition-all

                    ${
                      active
                        ? "bg-[#800020]/10 text-[#800020]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#800020]"
                    }
                  `}
                >
                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg

                      ${
                        active
                          ? "bg-[#800020] text-white"
                          : "bg-gray-100 text-gray-500 group-hover:bg-[#800020]/10 group-hover:text-[#800020]"
                      }
                    `}
                  >
                    <MenuIcon type={item.icon} size={19} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold">
                      {item.label}
                    </span>

                    <span
                      className={`
                        mt-0.5
                        block
                        truncate
                        text-[10px]
                        ${active ? "text-[#800020]/60" : "text-gray-400"}
                      `}
                    >
                      {item.description}
                    </span>
                  </span>

                  {active && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#800020]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Logout */}

        <div
          className="
            shrink-0
            border-t
            border-gray-100
            p-3
          "
        >
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-red-50
              px-4
              py-3
              text-sm
              font-bold
              text-red-600
              transition
              hover:bg-red-100
            "
          >
            <LogoutIcon size={19} />
            ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* ========================================================
          CONTENT
      ======================================================== */}

      <div
        className="
          min-h-screen
          pt-[58px]
          min-[1200px]:ml-[240px]
        "
      >
        <Outlet />
      </div>
    </>
  );
}
