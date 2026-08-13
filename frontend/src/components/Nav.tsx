// src/layouts/Nav.tsx

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Nav() {
  const { admin, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  // =========================================================
  // LOGOUT
  // =========================================================
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // =========================================================
  // SHORT TEXT
  // =========================================================
  const shortText = (text: string = "", max: number = 16) => {
    if (!text) return "-";

    return text.length > max
      ? `${text.substring(0, max)}...`
      : text;
  };

  // =========================================================
  // ACTIVE
  // =========================================================
  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return location.pathname.startsWith(path);
  };

  // =========================================================
  // NAVIGATE
  // =========================================================
  const go = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  // =========================================================
  // MENU DATA
  // =========================================================
  const menuItems = [
    {
      path: "/dashboard",
      label: "หน้าแรก",
      description: "ภาพรวมระบบ",
      icon: "home",
    },
    {
      path: "/person/create",
      label: "เพิ่มบุคคลตรวจ",
      description: "บันทึกข้อมูลบุคคล",
      icon: "personAdd",
    },
    {
      path: "/person/history",
      label: "ประวัติ",
      description: "ข้อมูลประวัติบุคคล",
      icon: "history",
    },
    {
      path: "/status-history",
      label: "รายงานการส่งตรวจ",
      description: "ติดตามสถานะการส่งตรวจ",
      icon: "chart",
    },
    {
      path: "/forensic-submission",
      label: "ส่ง ศพฐ.",
      description: "จัดการการส่งตรวจ",
      icon: "send",
    },
    {
      path: "/forensic-submission/list",
      label: "รายการหนังสือ ศพฐ.",
      description: "รายการหนังสือส่งตรวจ",
      icon: "document",
    },
    {
      path: "/receipt",
      label: "ใบเสร็จ",
      description: "จัดการข้อมูลใบเสร็จ",
      icon: "receipt",
    },
    {
      path: "/admin/create",
      label: "Admin",
      description: "จัดการผู้ดูแลระบบ",
      icon: "admin",
    },
    {
      path: "/organization",
      label: "หน่วยงาน",
      description: "ข้อมูลหน่วยงาน",
      icon: "building",
    },
    {
      path: "/profile",
      label: "โปรไฟล์",
      description: "ข้อมูลบัญชีของฉัน",
      icon: "settings",
    },
  ];

  // =========================================================
  // ICON
  // =========================================================
  const MenuIcon = ({
    type,
    size = 21,
  }: {
    type: string;
    size?: number;
  }) => {
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

    if (type === "chart") {
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
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="m7 15 3-4 3 2 5-7" />
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

    if (type === "receipt") {
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
          <path d="M6 3.5h12v17l-2.5-1.5-3.5 1.5-3.5-1.5L6 20.5z" />
          <path d="M9 8h6" />
          <path d="M9 11.5h6" />
          <path d="M9 15h4" />
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
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2.5v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8.1 15a1.7 1.7 0 0 0-1.5-1H6.5v-2.5h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.5v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V14h-.1a1.7 1.7 0 0 0-1.5 1Z"
        />
      </svg>
    );
  };

  // =========================================================
  // LOGOUT ICON
  // =========================================================
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

  return (
    <>
      {/* =====================================================
          TOPBAR
      ===================================================== */}
      <header
        className="
          fixed
          left-0
          top-0
          z-40
          h-[58px]
          w-full
          border-b
          border-white/10
          bg-gradient-to-r
          from-[#720019]
          to-[#800020]
          text-white
          shadow-lg
        "
      >
        <div className="
          relative
          mx-auto
          flex
          h-full
          w-full
          items-center
          px-3

          min-[480px]:px-4

          min-[768px]:px-6

          min-[1200px]:pl-[120px]
          min-[1200px]:pr-6
        ">

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="เปิดเมนู"
            className="
              flex
              h-10
              w-10
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

          {/* =================================================
              BRAND
          ================================================= */}
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

            <div className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-md
            ">
              <img
                src="/muangchonburi.webp"
                alt="โลโก้"
                className="h-7 w-7 object-contain"
              />
            </div>

            <div className="hidden min-[480px]:block">

              <p className="
                whitespace-nowrap
                text-xs
                font-bold
                leading-tight
                text-white
              ">
                งานพิมพ์มือตรวจประวัติ
              </p>

              <p className="
                mt-0.5
                text-[10px]
                leading-tight
                text-white/65
              ">
                งานนโยบายและแผน
              </p>

            </div>

          </button>

          {/* =================================================
              USER
          ================================================= */}
          <div className="
            ml-auto
            flex
            items-center
            gap-2
          ">

            <div className="
              hidden
              text-right

              min-[480px]:block
            ">

              <p className="text-xs font-bold text-white">
                {shortText(admin?.name || "", 18)}
              </p>

              <p className="
                mt-0.5
                max-w-[160px]
                truncate
                text-[10px]
                text-white/60
              ">
                {admin?.position || "-"}
              </p>

            </div>

            <div className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white
            ">
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

          </div>

        </div>
      </header>

      {/* =====================================================
          DESKTOP SIDEBAR
          >= 1200px
      ===================================================== */}
      <aside className="
        fixed
        left-0
        top-0
        z-30
        hidden
        h-screen
        w-[100px]
        flex-col
        bg-[#720019]
        text-white
        shadow-xl

        min-[1200px]:flex
        min-[1200px]:w-[100px]

        min-[1350px]:w-[220px]
      ">

        {/* Sidebar Logo */}
        <div className="
          flex
          h-[58px]
          shrink-0
          items-center
          justify-center
          border-b
          border-white/10
        ">

          <div className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-md
          ">
            <img
              src="/muangchonburi.webp"
              alt="โลโก้"
              className="h-7 w-7 object-contain"
            />
          </div>

          <div className="
            ml-2
            hidden

            min-[1350px]:block
          ">
            <p className="text-xs font-bold">
              งานพิมพ์มือตรวจประวัติ
            </p>

            <p className="text-[9px] text-white/50">
              งานนโยบายและแผน
            </p>
          </div>

        </div>

        {/* Sidebar Menu */}
        <div className="
          flex
          flex-1
          flex-col
          gap-1
          overflow-y-auto
          p-2

          min-[1350px]:p-3
        ">

          {menuItems.map((item) => {
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => go(item.path)}
                title={item.label}
                className={`
                  group
                  relative
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  border
                  px-2
                  py-2.5
                  text-left
                  transition-all
                  duration-200

                  min-[1350px]:justify-start
                  min-[1350px]:gap-3
                  min-[1350px]:px-3

                  ${
                    active
                      ? "border-white/10 bg-white text-[#800020] shadow-md"
                      : "border-transparent text-white/75 hover:bg-white/10 hover:text-white"
                  }
                `}
              >

                {/* Active Line */}
                {active && (
                  <span className="
                    absolute
                    left-0
                    top-1/2
                    h-7
                    w-1
                    -translate-y-1/2
                    rounded-r-full
                    bg-[#800020]

                    min-[1350px]:-left-[1px]
                  " />
                )}

                <span className="shrink-0">
                  <MenuIcon type={item.icon} size={20} />
                </span>

                <span className="
                  hidden
                  min-w-0
                  flex-1

                  min-[1350px]:block
                ">

                  <span className="block truncate text-xs font-bold">
                    {item.label}
                  </span>

                  <span className={`
                    mt-0.5
                    block
                    truncate
                    text-[9px]

                    ${
                      active
                        ? "text-[#800020]/50"
                        : "text-white/40"
                    }
                  `}>
                    {item.description}
                  </span>

                </span>

              </button>
            );
          })}

        </div>

        {/* Desktop Logout */}
        <div className="
          shrink-0
          border-t
          border-white/10
          p-2

          min-[1350px]:p-3
        ">

          <button
            type="button"
            onClick={handleLogout}
            title="ออกจากระบบ"
            className="
              flex
              w-full
              items-center
              justify-center
              rounded-xl
              bg-white/10
              px-2
              py-3
              text-white
              transition

              hover:bg-red-600

              min-[1350px]:justify-start
              min-[1350px]:gap-3
              min-[1350px]:px-3
            "
          >

            <LogoutIcon />

            <span className="
              hidden
              text-xs
              font-bold

              min-[1350px]:block
            ">
              ออกจากระบบ
            </span>

          </button>

        </div>

      </aside>

      {/* =====================================================
          MOBILE DRAWER
          < 1200px
      ===================================================== */}

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

          ${
            menuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Drawer Header */}
        <div className="
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
        ">

          <div className="flex items-center gap-3">

            <div className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-md
            ">
              <img
                src="/muangchonburi.webp"
                alt="โลโก้"
                className="h-8 w-8 object-contain"
              />
            </div>

            <div>

              <p className="text-sm font-bold">
                เมนูหลัก
              </p>

              <p className="text-[10px] text-white/60">
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
        <div className="
          border-b
          border-gray-100
          bg-gray-50
          px-4
          py-4
        ">

          <div className="flex items-center gap-3">

            <div className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#800020]/10
              text-[#800020]
            ">
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

            <div className="min-w-0">

              <p className="truncate text-sm font-bold text-gray-900">
                {admin?.name || "-"}
              </p>

              <p className="truncate text-[10px] text-gray-400">
                {admin?.position || "-"}
              </p>

            </div>

          </div>

        </div>

        {/* Mobile Menu */}
        <div className="
          flex-1
          overflow-y-auto
          p-3
        ">

          <p className="
            mb-2
            px-2
            text-[10px]
            font-bold
            uppercase
            tracking-widest
            text-gray-400
          ">
            เมนูระบบ
          </p>

          <div className="space-y-1">

            {menuItems.map((item) => {
              const active = isActive(item.path);

              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => go(item.path)}
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

                    <span className={`
                      mt-0.5
                      block
                      truncate
                      text-[10px]

                      ${
                        active
                          ? "text-[#800020]/60"
                          : "text-gray-400"
                      }
                    `}>
                      {item.description}
                    </span>

                  </span>

                  {active && (
                    <span className="
                      h-2
                      w-2
                      shrink-0
                      rounded-full
                      bg-[#800020]
                    " />
                  )}

                </button>
              );
            })}

          </div>

        </div>

        {/* Mobile Logout */}
        <div className="
          shrink-0
          border-t
          border-gray-100
          p-3
        ">

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

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div className="
        min-h-screen
        pt-[58px]

        min-[1200px]:ml-[100px]

        min-[1350px]:ml-[220px]
      ">
        <Outlet />
      </div>
    </>
  );
}