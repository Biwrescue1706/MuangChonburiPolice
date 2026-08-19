import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const navigate = useNavigate();

  // กด Enter กลับหน้าแรก
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#2b0000] via-[#5c0000] to-[#3a0000] px-4 text-center text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/20 blur-[130px]" />

      {/* Background Glow รอบที่ 2 */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-600/20 blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* LOGO */}
        <img
          src="/muangchonburi.webp"
          alt="logo"
          width={130}
          className="mb-3 animate-[float_3.5s_ease-in-out_infinite] drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)]"
        />

        {/* TITLE */}
        <div className="mb-3 animate-[fadeDown_0.8s_ease-out]">
          <h1 className="text-xl font-extrabold text-[#FFC800] drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)] sm:text-2xl md:text-3xl">
            งานพิมพ์มือตรวจประวัติอาชญากรรม
          </h1>

          <h5 className="mt-1 text-base font-bold text-[#FFC800] drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)] sm:text-lg md:text-xl">
            งานนโยบายและแผน
          </h5>

          <h6 className="mt-1 text-sm font-semibold tracking-wide text-[#FFD95A] drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)] sm:text-base">
            สภ.เมืองชลบุรี
          </h6>
        </div>

        {/* 404 */}
        <h1 className="animate-[zoomIn_0.6s_ease-out] text-[clamp(5rem,13vw,8rem)] font-black leading-none text-[#FFC800] drop-shadow-[0_0_18px_rgba(255,200,0,0.7)]">
          404
        </h1>

        {/* TEXT */}
        <p className="mt-4 text-base text-[#ffeaea]/90 sm:text-lg">
          ไม่พบหน้าที่คุณกำลังค้นหา
        </p>

        {/* BUTTON */}
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-[#FFC800] px-9 py-3 font-bold text-[#3a0000] shadow-[0_6px_18px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105 hover:bg-[#FFD633] hover:shadow-[0_10px_28px_rgba(0,0,0,0.8)]"
        >
          กลับไปหน้าแรก
        </Link>

        {/* Hint */}
        <p className="mt-4 text-xs text-white/40">
          หรือกด Enter เพื่อกลับหน้าแรก
        </p>
      </div>
    </div>
  );
}
