import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, ShieldAlert } from "lucide-react";

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#061426] px-4 py-10 text-white">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(20,75,130,0.55),transparent_45%),linear-gradient(135deg,#061426_0%,#09233d_50%,#04101f_100%)]" />

      {/* Glow กลาง */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Glow มุมซ้ายบน */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#0d5ca8]/15 blur-[100px]" />

      {/* Glow มุมขวาล่าง */}
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-[#ffc800]/10 blur-[100px]" />

      {/* Decorative circles */}
      <div className="pointer-events-none absolute left-[8%] top-[15%] h-24 w-24 rounded-full border border-white/5" />
      <div className="pointer-events-none absolute bottom-[15%] right-[8%] h-32 w-32 rounded-full border border-[#ffc800]/10" />


      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <main className="relative z-10 w-full max-w-2xl text-center">

        {/* LOGO AREA */}
        <div className="mb-6 flex justify-center">

          <div className="relative">

            {/* Logo Glow */}
            <div className="absolute inset-0 scale-125 rounded-full bg-[#ffc800]/10 blur-2xl" />

            {/* Logo Circle */}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] shadow-[0_15px_50px_rgba(0,0,0,0.35)] backdrop-blur-md sm:h-32 sm:w-32">

              <img
                src="/assets/muangchonburi.webp"
                alt="ตราสัญลักษณ์ สภ.เมืองชลบุรี"
                className="h-24 w-24 object-contain drop-shadow-[0_6px_15px_rgba(0,0,0,0.65)] sm:h-28 sm:w-28"
              />

            </div>

          </div>

        </div>


        {/* ORGANIZATION */}
        <div className="mb-6">

          <div className="mb-2 flex items-center justify-center gap-2">

            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#ffc800]" />

            <span className="text-xs font-semibold tracking-[0.25em] text-[#ffc800] sm:text-sm">
              MUANG CHONBURI POLICE STATION
            </span>

            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#ffc800]" />

          </div>

          <h2 className="text-lg font-bold text-white sm:text-xl">
            งานพิมพ์มือตรวจประวัติอาชญากรรม
          </h2>

          <p className="mt-1 text-sm font-medium text-blue-200/80 sm:text-base">
            งานนโยบายและแผน • สภ.เมืองชลบุรี
          </p>

        </div>


        {/* 404 */}
        <div className="relative mb-4">

          {/* Glow หลัง 404 */}
          <div className="absolute left-1/2 top-1/2 h-32 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffc800]/10 blur-3xl" />

          <h1
            className="
              relative
              text-[clamp(7rem,25vw,12rem)]
              font-black
              leading-none
              tracking-[-0.06em]
              text-transparent
              bg-gradient-to-b
              from-[#ffe680]
              via-[#ffc800]
              to-[#d99d00]
              bg-clip-text
              drop-shadow-[0_8px_30px_rgba(255,200,0,0.18)]
            "
          >
            404
          </h1>

        </div>


        {/* PAGE NOT FOUND */}
        <div className="mb-7">

          <div className="mb-3 flex items-center justify-center gap-2">

            <ShieldAlert
              size={18}
              className="text-[#ffc800]"
            />

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#ffc800]">
              Page Not Found
            </span>

          </div>

          <h3 className="text-xl font-bold text-white sm:text-2xl">
            ไม่พบหน้าที่คุณกำลังค้นหา
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/55 sm:text-base">
            หน้านี้อาจถูกลบ ย้ายตำแหน่ง หรือ URL ที่คุณเปิดอาจไม่ถูกต้อง
            กรุณากลับไปยังหน้าแรกเพื่อดำเนินการต่อ
          </p>

        </div>


        {/* BUTTON CARD */}
        <div className="mx-auto flex w-full max-w-md flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:flex-row">

          {/* Home */}
          <Link
            to="/"
            className="
              group
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-[#ffc800]
              to-[#e6ad00]
              px-6
              py-3.5
              text-sm
              font-extrabold
              text-[#071426]
              shadow-[0_8px_25px_rgba(255,200,0,0.18)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_12px_30px_rgba(255,200,0,0.3)]
              active:scale-[0.98]
            "
          >
            <Home
              size={18}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            กลับหน้าแรก
          </Link>


          {/* Back */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              group
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/[0.06]
              px-6
              py-3.5
              text-sm
              font-bold
              text-white/80
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-white/20
              hover:bg-white/[0.1]
              hover:text-white
              active:scale-[0.98]
            "
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            ย้อนกลับ
          </button>

        </div>


        {/* ENTER HINT */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/30">

          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono">
            ENTER
          </span>

          <span>
            เพื่อกลับหน้าแรก
          </span>

        </div>


        {/* FOOTER */}
        <p className="mt-8 text-[11px] tracking-wide text-white/20">
          © {new Date().getFullYear() + 543} สถานีตำรวจภูธรเมืองชลบุรี
        </p>

      </main>
    </div>
  );
}