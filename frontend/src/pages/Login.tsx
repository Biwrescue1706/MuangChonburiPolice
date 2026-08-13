import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "../utils/toast";

export default function Login() {
  const { login, admin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (admin) {
      navigate("/dashboard");
    }
  }, [admin, navigate]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast("error", "กรุณากรอก Username และ Password");
      return;
    }

    try {
      await login(username, password);
    } catch (err: any) {
      toast(
        "error",
        err?.response?.data?.error || "เข้าสู่ระบบไม่สำเร็จ"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#800020] via-[#5b0016] to-[#250008] flex items-center justify-center p-4">

      {/* Background decoration */}
      <div className="fixed -top-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="fixed -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-red-500/10 blur-3xl" />

      {/* Main Card */}
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden min-h-[650px] flex-col items-center justify-center bg-gradient-to-br from-[#800020] to-[#43000e] p-12 text-center text-white lg:flex">

          <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-2xl">
            <img
              src="/muangchonburi.webp"
              alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
              className="h-24 w-24 object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold">
            งานพิมพ์มือตรวจประวัติ
          </h1>

          <div className="my-5 h-1 w-16 rounded-full bg-white/80" />

          <p className="max-w-sm text-sm leading-7 text-white/80">
            ระบบบริหารจัดการงานพิมพ์มือตรวจประวัติ
            <br />
            งานนโยบายและแผน
            <br />
            สถานีตำรวจภูธรเมืองชลบุรี
          </p>

          <div className="mt-10 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs text-white/70">
            Muang Chonburi Police Station
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex min-h-[650px] flex-col justify-center bg-white p-7 sm:p-10 lg:p-12">

          {/* Mobile Logo */}
          <div className="mb-8 text-center lg:hidden">

            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-gray-100 bg-white shadow-lg">
              <img
                src="/muangchonburi.webp"
                alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
                className="h-20 w-20 object-contain"
              />
            </div>

            <h1 className="text-xl font-bold text-gray-900">
              งานพิมพ์มือตรวจประวัติ
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              งานนโยบายและแผน
            </p>
          </div>

          {/* Header */}
          <div className="mb-8">

            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#800020]">
              Welcome Back
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              เข้าสู่ระบบ
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ
            </p>

          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-5">

            {/* Username */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Username
              </label>

              <div className="relative">

                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="กรอก Username"
                  autoComplete="username"
                  className="h-13 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-gray-900 outline-none transition focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-[#800020]/10"
                />

              </div>
            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">

                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M16.5 10.5V7.125a4.125 4.125 0 00-8.25 0V10.5m-.75 0h9.75A1.75 1.75 0 0119 12.25v7A1.75 1.75 0 0117.25 21h-10.5A1.75 1.75 0 015 19.25v-7A1.75 1.75 0 016.75 10.5z"
                    />
                  </svg>
                </div>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรอก Password"
                  autoComplete="current-password"
                  className="h-13 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-gray-900 outline-none transition focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-[#800020]/10"
                />

              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">

              <button
                type="button"
                onClick={() => navigate("/forgot")}
                className="text-sm font-semibold text-[#800020] transition hover:text-[#5c0017] hover:underline"
              >
                ลืมรหัสผ่าน?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#800020] to-[#5d0018] font-bold text-white shadow-lg shadow-[#800020]/20 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            >
              <span>เข้าสู่ระบบ</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.5 4.5L19 10.5l-5.5 6M5 10.5h13"
                />
              </svg>
            </button>

          </form>

          {/* Footer */}
          <div className="mt-10 border-t border-gray-100 pt-5 text-center">

            <p className="text-xs text-gray-400">
              ระบบงานนโยบายและแผน
            </p>

            <p className="mt-1 text-xs text-gray-400">
              สถานีตำรวจภูธรเมืองชลบุรี
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}