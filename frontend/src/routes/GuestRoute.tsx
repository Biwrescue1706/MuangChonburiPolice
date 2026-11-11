import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useEffect, useState, type ReactNode } from "react";

type GuestRouteProps = {
  children: ReactNode;
};

export default function GuestRoute({ children }: GuestRouteProps) {
  const { admin, loading } = useAuth();

  const text = "กำลังรอการตอบกลับจาก Server ...";

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!loading) return;

    const speed = isDeleting ? 30 : 60;

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (index >= text.length) {
            setIsDeleting(true);
            return;
          }

          setDisplayText(text.slice(0, index + 1));
          setIndex((prev) => prev + 1);
        } else {
          setDisplayText(text.slice(0, index - 1));

          if (index - 1 <= 0) {
            setIndex(0);
            setIsDeleting(false);
          } else {
            setIndex((prev) => prev - 1);
          }
        }
      },
      !isDeleting && index >= text.length ? 600 : speed,
    );

    return () => clearTimeout(timer);
  }, [index, isDeleting, loading]);

  if (loading) {
    return (
      <div
        className="flex min-h-dvh flex-col items-center justify-center bg-[#f4f5f6] px-4"
        role="status"
        aria-live="polite"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm">
          <img
            src="/assets/muangchonburi.webp"
            alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
            className="h-14 w-14 object-contain"
          />
        </div>

        <h1 className="mb-2 text-lg font-bold text-gray-800">
          สถานีตำรวจภูธรเมืองชลบุรี
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          ระบบบริหารจัดการงานพิมพ์มือตรวจประวัติ
        </p>

        <div className="mb-5 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#800020]" />

        <div className="flex min-h-6 items-center justify-center">
          <p className="text-center text-sm font-medium text-gray-600">
            {displayText}
            <span className="ml-1 inline-block animate-pulse text-[#800020]">
              |
            </span>
          </p>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          กรุณารอสักครู่ ระบบกำลังตรวจสอบสิทธิ์การเข้าใช้งาน
        </p>
      </div>
    );
  }

  if (admin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
