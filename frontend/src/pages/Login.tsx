// src/pages/Login.tsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "../utils/toast";

export default function Login() {
  const { login, admin } = useAuth();
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (admin) nav("/dashboard");
  }, [admin, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);
    } catch (err: any) {
      toast(
        "error",
        err.response?.data?.error || "เข้าสู่ระบบไม่สำเร็จ"
      );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f5f5f5]">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#800020] via-[#5d0018] to-[#250008]" />

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#b00032]/20 blur-3xl" />

      {/* Decorative Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[700px] h-[700px]
        rounded-full
        border border-white/5
      " />

      {/* ================= CONTENT ================= */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-8">

        <div className="
          w-full max-w-5xl
          grid lg:grid-cols-2
          overflow-hidden
          rounded-3xl
          bg-white/95
          backdrop-blur-xl
          shadow-[0_25px_80px_rgba(0,0,0,0.35)]
        ">

          {/* ================= LEFT ================= */}
          <div className="
            hidden lg:flex
            relative
            flex-col
            justify-center
            items-center
            text-center
            p-12
            bg-gradient-to-br
            from-[#800020]
            via-[#690019]
            to-[#3b000d]
            text-white
          ">

            {/* Decorative */}
            <div className="
              absolute -top-20 -left-20
              w-64 h-64
              rounded-full
              border border-white/10
            />

            <div className="
              absolute -bottom-32 -right-32
              w-80 h-80
              rounded-full
              border border-white/10
            />

            {/* Logo */}
            <div className="
              relative
              flex items-center justify-center
              w-32 h-32
              rounded-full
              bg-white
              shadow-2xl
              mb-8
            ">
              <img
                src="/muangchonburi.webp"
                alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
                className="w-24 h-24 object-contain"
              />
            </div>

            <h1 className="relative text-2xl font-bold tracking-wide">
              งานพิมพ์มือตรวจประวัติ
            </h1>

            <div className="w-16 h-1 rounded-full bg-white/80 my-5" />

            <p className="relative text-white/80 text-sm leading-7 max-w-sm">
              ระบบบริหารจัดการงานพิมพ์มือตรวจประวัติ
              <br />
              งานนโยบายและแผน
              <br />
              สถานีตำรวจภูธรเมืองชลบุรี
            </p>

            <div className="
              relative
              mt-10
              px-5 py-2
              rounded-full
              border border-white/20
              bg-white/10
              text-xs text-white/80
            ">
              Muang Chonburi Police Station
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="bg-white p-7 sm:p-10 lg:p-12">

            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">

              <div className="
                inline-flex
                items-center
                justify-center
                w-24 h-24
                rounded-full
                bg-white
                border border-gray-100
                shadow-lg
                mb-4
              ">
                <img
                  src="/muangchonburi.webp"
                  alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
                  className="w-18 h-18 object-contain"
                />
              </div>

              <h1 className="text-xl font-bold text-gray-900">
                งานพิมพ์มือตรวจประวัติ
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                งานนโยบายและแผน
              </p>
            </div>

            {/* Login Header */}
            <div className="mb-8">

              <p className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#800020]
                mb-2
              ">
                Welcome Back
              </p>

              <h2 className="
                text-3xl
                font-bold
                text-gray-900
              ">
                เข้าสู่ระบบ
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ
              </p>

            </div>

            {/* ================= FORM ================= */}
            <form onSubmit={submit} className="space-y-5">

              {/* Username */}
              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                ">
                  Username
                </label>

                <div className="relative">

                  {/* User Icon */}
                  <div className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                    className="
                      w-full
                      h-13
                      rounded-xl
                      border border-gray-200
                      bg-gray-50
                      pl-12 pr-4
                      text-gray-900
                      placeholder-gray-400
                      outline-none
                      transition-all
                      duration-200
                      focus:bg-white
                      focus:border-[#800020]
                      focus:ring-4
                      focus:ring-[#800020]/10
                    "
                  />

                </div>
              </div>

              {/* Password */}
              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                ">
                  Password
                </label>

                <div className="relative">

                  {/* Lock Icon */}
                  <div className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                    className="
                      w-full
                      h-13
                      rounded-xl
                      border border-gray-200
                      bg-gray-50
                      pl-12 pr-4
                      text-gray-900
                      placeholder-gray-400
                      outline-none
                      transition-all
                      duration-200
                      focus:bg-white
                      focus:border-[#800020]
                      focus:ring-4
                      focus:ring-[#800020]/10
                    "
                  />

                </div>
              </div>

              {/* Forgot */}
              <div className="flex justify-end">

                <button
                  type="button"
                  onClick={() => nav("/forgot")}
                  className="
                    text-sm
                    font-semibold
                    text-[#800020]
                    hover:text-[#5c0017]
                    transition
                  "
                >
                  ลืมรหัสผ่าน ?
                </button>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="
                  group
                  relative
                  w-full
                  h-13
                  overflow-hidden
                  rounded-xl
                  bg-gradient-to-r
                  from-[#800020]
                  to-[#5d0018]
                  text-white
                  font-bold
                  shadow-lg
                  shadow-[#800020]/20
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  hover:shadow-[#800020]/30
                  active:translate-y-0
                "
              >

                <span className="
                  absolute
                  inset-0
                  bg-white/10
                  translate-x-[-100%]
                  group-hover:translate-x-[100%]
                  transition-transform
                  duration-700
                />

                <span className="relative flex items-center justify-center gap-2">
                  เข้าสู่ระบบ

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L19 10.5l-5.5 6M5 10.5h13"
                    />
                  </svg>
                </span>

              </button>

            </form>

            {/* Footer */}
            <div className="
              mt-10
              pt-5
              border-t border-gray-100
              text-center
            ">
              <p className="text-xs text-gray-400">
                ระบบงานนโยบายและแผน
              </p>

              <p className="text-xs text-gray-400 mt-1">
                สถานีตำรวจภูธรเมืองชลบุรี
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}