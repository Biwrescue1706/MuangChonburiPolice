
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "../utils/toast";

export default function Login() {
  const { login, admin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (admin) {
      navigate("/dashboard", { replace: true });
    }
  }, [admin, navigate]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast("error", "กรุณากรอก Username และ Password");
      return;
    }

    try {
      setLoading(true);
      await login(username.trim(), password);
    } catch (err: unknown) {
      const errorMessage =
        typeof err === "object" &&
        err !== null &&
        "response" in err
          ? (
              err as {
                response?: {
                  data?: {
                    error?: string;
                  };
                };
              }
            ).response?.data?.error
          : undefined;

      toast(
        "error",
        errorMessage || "เข้าสู่ระบบไม่สำเร็จ"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f5f6] px-4 py-8 sm:px-6">
      <div className="w-full max-w-[1000px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_12px_40px_rgba(25,25,25,0.07)]">

        <div className="grid min-h-[580px] grid-cols-1 min-[900px]:grid-cols-[0.92fr_1.08fr]">

          {/* Information panel */}
          <section className="relative hidden overflow-hidden bg-[#71001d] p-10 text-white min-[900px]:flex min-[900px]:flex-col min-[900px]:justify-between min-[1100px]:p-12">
            <div className="pointer-events-none absolute -right-28 -top-24 h-80 w-80 rounded-full border border-white/[0.10]" />
            <div className="pointer-events-none absolute -bottom-36 -left-28 h-96 w-96 rounded-full border border-white/[0.08]" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                  <img
                    src="/assets/muangchonburi.webp"
                    alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
                    className="h-9 w-9 object-contain"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    สถานีตำรวจภูธรเมืองชลบุรี
                  </p>
                  <p className="mt-1 text-xs text-white/65">
                    Muang Chonburi Police Station
                  </p>
                </div>
              </div>
            </div>

            <div className="relative my-12">
              <div className="mb-5 h-1 w-12 rounded-full bg-[#d9b6a0]" />

              <h1 className="text-3xl font-bold leading-relaxed">
                งานพิมพ์มือตรวจประวัติ
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">
                ระบบบริหารจัดการงานพิมพ์มือตรวจประวัติ
                สำหรับการปฏิบัติงานภายในสถานีตำรวจภูธรเมืองชลบุรี
              </p>

              <div className="mt-8 border-t border-white/15 pt-5">
                <p className="text-sm font-medium">
                  งานนโยบายและแผน
                </p>
                <p className="mt-1 text-xs text-white/60">
                  ระบบบริหารจัดการข้อมูลและเอกสาร
                </p>
              </div>
            </div>

            <div className="relative border-t border-white/15 pt-5 text-xs text-white/55">
              สำหรับการปฏิบัติงานภายในหน่วยงาน
            </div>
          </section>

          {/* Login panel */}
          <section className="flex flex-col justify-center px-6 py-9 sm:px-10 sm:py-12 min-[1100px]:px-14">

            {/* Mobile logo */}
            <div className="mb-8 flex items-center gap-3 min-[900px]:hidden">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white">
                <img
                  src="/assets/muangchonburi.webp"
                  alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
                  className="h-11 w-11 object-contain"
                />
              </div>

              <div className="min-w-0">
                <h1 className="text-sm font-bold text-gray-900">
                  งานพิมพ์มือตรวจประวัติ
                </h1>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  สถานีตำรวจภูธรเมืองชลบุรี
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#800020]">
                Staff Portal
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                เข้าสู่ระบบ
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                กรุณากรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าใช้งานระบบ
              </p>
            </div>

            <form onSubmit={submit} className="space-y-5">

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Username
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-gray-400">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="8" r="3.5" />
                      <path d="M4.5 20c.7-3.2 3.3-5 7.5-5s6.8 1.8 7.5 5" />
                    </svg>
                  </div>

                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="กรอก Username"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    required
                    disabled={loading}
                    className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-[#800020]/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-gray-400">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="4.5" y="10" width="15" height="10" rx="2" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </svg>
                  </div>

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="กรอก Password"
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-[#800020]/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                    aria-pressed={showPassword}
                    className="absolute inset-y-0 right-1 flex w-10 items-center justify-center rounded-md text-gray-400 transition hover:text-[#800020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                  >
                    {showPassword ? (
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c5 0 8.5 4 9.5 7a11 11 0 0 1-3 4.2" />
                        <path d="M6.2 6.2A12.8 12.8 0 0 0 2.5 12c1 3 4.5 7 9.5 7 1.1 0 2.1-.2 3.1-.6" />
                      </svg>
                    ) : (
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                        <circle cx="12" cy="12" r="2.5" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/forgot")}
                  className="text-sm font-medium text-[#800020] transition hover:text-[#5d0018] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
                >
                  ลืมรหัสผ่าน?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#800020] px-4 text-sm font-semibold text-white transition hover:bg-[#680019] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#800020]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    กำลังเข้าสู่ระบบ...
                  </>
                ) : (
                  <>
                    เข้าสู่ระบบ
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 border-t border-gray-100 pt-5 text-center">
              <p className="text-xs leading-6 text-gray-400">
                ระบบสำหรับการปฏิบัติงานภายในหน่วยงาน
              </p>
              <p className="mt-1 text-xs text-gray-400">
                สภ.เมืองชลบุรี
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
