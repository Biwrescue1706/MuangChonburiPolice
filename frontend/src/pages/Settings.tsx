// src/pages/Settings.tsx

import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const settings = [
    {
      title: "จัดการ Admin",
      description: "เพิ่ม แก้ไข และจัดการบัญชีผู้ดูแลระบบ",
      path: "/admin/create",
      icon: "admin",
    },
    {
      title: "ข้อมูลหน่วยงาน",
      description: "จัดการข้อมูลและรายละเอียดของหน่วยงาน",
      path: "/organization",
      icon: "building",
    },
    {
      title: "โปรไฟล์บุคคล",
      description: "จัดการข้อมูลโปรไฟล์และข้อมูลบัญชีของคุณ",
      path: "/profile",
      icon: "person",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6">
          <p className="text-sm font-medium text-[#800020]">
            ระบบงานพิมพ์มือตรวจประวัติ
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
            ตั้งค่า
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            จัดการข้อมูลและการตั้งค่าต่าง ๆ ของระบบ
          </p>
        </div>

        {/* Settings Card */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {settings.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className="
                group
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                text-left
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-[#800020]/30
                hover:shadow-lg
              "
            >
              <div className="flex items-start gap-4">

                {/* Icon */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#800020]/10
                    text-[#800020]
                    transition
                    group-hover:bg-[#800020]
                    group-hover:text-white
                  "
                >
                  {item.icon === "admin" && (
                    <svg
                      width="24"
                      height="24"
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
                  )}

                  {item.icon === "building" && (
                    <svg
                      width="24"
                      height="24"
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
                  )}

                  {item.icon === "person" && (
                    <svg
                      width="24"
                      height="24"
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
                  )}
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold text-gray-900">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {item.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#800020]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}