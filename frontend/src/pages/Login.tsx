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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#800020] via-[#5b0016] to-[#250008]">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-8">

        {/* Main Card */}
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid lg:grid-cols-2">

          {/* ================= LEFT ================= */}
          <div className="relative hidden min-h-[650px] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#800020] via-[#690019] to-[#3b000d] p-12 text-center text-white lg:flex">

            {/* Decoration */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full border border-white/10" />

            <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full border border-white/10" />

            {/* Logo */}
            <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-2xl">
              <img
                src="/muangchonburi.webp"
                alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
                className="h-24 w-24 object-contain"
              />
            </div>

            <h1 className="relative text-2xl font-bold">
              งานพิมพ์มือตรวจประวัติ
            </h1>

            <div className="my-5 h-1 w-16 rounded-full bg-white/80" />

            <p className="relative max-w-sm text-sm leading-7 text-white/80">
              ระบบบริหารจัดการงานพิมพ์มือตรวจประวัติ
              <br />
              งานนโยบายและแผน
              <br />
              สถานีตำรวจภูธรเมืองชลบุรี
            </p>

            <div className="relative mt-10 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs text-white/80">
              Muang Chonburi Police Station
            </div>
          </div>

          {/* ================= RIGHT ================= */}
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

            {/* Login Header */}
            <div className="mb-8">

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#800020]">
                Welcome Back
              </p>

              <h2 className="text-3xl font-bold text-gray-900">
                เข้าสู่ระบบ
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ
              </p>

            </div>

            {/* Login Form */}
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

                  {/* User Icon */}
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 20.25a7.5 7.5 0 0 1 15 0"
                      />
                    </svg>

                  </div>

                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="กรอก Username"
                    autoComplete="username"
                    className="h-[52px] w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-gray-900 outline-none transition focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-[#800020]/10"
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

                  {/* Lock Icon */}
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V7.125a4.125 4.125 0 0 0-8.25 0V10.5"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 10.5h10.5A1.75 1.75 0 0 1 19 12.25v7A1.75 1.75 0 0 1 17.25 21h-10.5A1.75 1.75 0 0 1 5 19.25v-7a1.75 1.75 0 0 1 1.75-1.75Z"
                      />

                    </svg>

                  </div>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="กรอก Password"
                    autoComplete="current-password"
                    className="h-[52px] w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-gray-900 outline-none transition focus:border-[#800020] focus:bg-white focus:ring-4 focus:ring-[#800020]/10"
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
                className="group flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#800020] to-[#5d0018] font-bold text-white shadow-lg shadow-[#800020]/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
              >

                <span>
                  เข้าสู่ระบบ
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 19 10.5l-5.5 6"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 10.5h13"
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
    </div>
  );
}