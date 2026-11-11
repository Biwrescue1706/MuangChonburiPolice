import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, ShieldAlert } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f6f9] px-5 py-10 text-slate-800">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-1 w-full bg-[#bd9b52]" />
        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border border-slate-200/70" />
        <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full border border-slate-200/70" />
        <div className="absolute -bottom-48 -left-32 h-[450px] w-[450px] rounded-full border border-slate-200/70" />
      </div>

      <section className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_60px_-25px_rgba(15,23,42,0.18)]">
        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex flex-col justify-between overflow-hidden bg-[#14243b] px-8 py-10 text-white sm:px-12 md:min-h-[520px]">
            <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full border border-white/[0.07]" />
            <div className="absolute -bottom-16 -left-12 h-56 w-56 rounded-full border border-white/[0.07]" />

            <div className="relative z-10 flex items-center gap-3">
              <img
                src="/assets/muangchonburi.webp"
                alt="ตราสัญลักษณ์สถานีตำรวจภูธรเมืองชลบุรี"
                className="h-14 w-14 rounded-full bg-white object-contain p-1.5"
              />
              <div>
                <p className="text-sm font-semibold tracking-wide">
                  สถานีตำรวจภูธรเมืองชลบุรี
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  Mueang Chonburi Police Station
                </p>
              </div>
            </div>

            <div className="relative z-10 py-14 md:py-0">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.06] px-3 py-2 text-xs font-medium text-slate-300">
                <ShieldAlert size={15} className="text-[#d8b76d]" />
                PAGE NOT FOUND
              </div>

              <h1 className="text-[104px] font-bold leading-none tracking-[-0.08em] text-white sm:text-[124px]">
                404<span className="text-[#c5a45f]">.</span>
              </h1>

              <div className="mt-6 h-1 w-14 rounded-full bg-[#c5a45f]" />

              <p className="mt-5 max-w-xs text-sm leading-7 text-slate-300">
                ขออภัย ไม่พบหน้าที่คุณกำลังค้นหา หน้านี้อาจถูกย้าย เปลี่ยนแปลง
                หรือไม่มีอยู่ในระบบ
              </p>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-5">
              <p className="text-[11px] tracking-wide text-slate-400">
                MUEANG CHONBURI POLICE STATION
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center px-8 py-12 sm:px-12 md:px-14">
            <div className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a78643]">
                Something went wrong
              </p>

              <h2 className="mt-4 text-2xl font-bold leading-snug text-[#17283e] sm:text-3xl">
                ไม่สามารถเข้าถึง
                <br />
                หน้าที่ต้องการได้
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500">
                กรุณาตรวจสอบลิงก์ที่คุณเปิดอีกครั้ง
                หรือนำทางกลับไปยังหน้าหลักเพื่อใช้งานระบบต่อ
              </p>

              <div className="mt-9 space-y-3">
                <Link
                  to="/"
                  className="group flex w-full items-center justify-between rounded-lg bg-[#172b45] px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#223c5d]"
                >
                  <span className="flex items-center gap-3">
                    <Home size={18} />
                    กลับสู่หน้าหลัก
                  </span>
                  <span className="text-lg text-[#d8b76d] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  <ArrowLeft size={17} />
                  ย้อนกลับหน้าก่อนหน้า
                </button>
              </div>

              <div className="mt-10 border-t border-slate-100 pt-5">
                <p className="text-xs leading-6 text-slate-400">
                  หากพบปัญหาในการเข้าใช้งานระบบ
                  กรุณาติดต่อเจ้าหน้าที่ผู้ดูแลระบบ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
