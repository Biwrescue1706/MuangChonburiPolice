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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#800020] to-[#3b000d] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
        
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <img
            src="/muangchonburi.webp"
            alt="Muang Chonburi"
            className="h-[70px] w-auto mx-auto mb-4"
          />

          <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
            งานพิมพ์มือตรวจประวัติ
          </h4>

          <p className="mt-2 text-sm text-gray-500">
            งานนโยบายและแผน
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={submit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
              Username
            </label>

            <input
              type="text"
              placeholder="กรอก Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full
                rounded-xl
                border border-gray-300
                bg-white
                px-4 py-3
                text-gray-900
                placeholder-gray-400
                outline-none
                transition
                focus:border-[#800020]
                focus:ring-2
                focus:ring-[#800020]/20
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="กรอก Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                rounded-xl
                border border-gray-300
                bg-white
                px-4 py-3
                text-gray-900
                placeholder-gray-400
                outline-none
                transition
                focus:border-[#800020]
                focus:ring-2
                focus:ring-[#800020]/20
              "
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="
              w-full
              rounded-xl
              bg-[#800020]
              px-4 py-3
              text-white
              font-bold
              shadow-md
              transition
              hover:bg-[#68001a]
              hover:shadow-lg
              active:scale-[0.98]
            "
          >
            เข้าสู่ระบบ
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-5">
          <button
            type="button"
            onClick={() => nav("/forgot")}
            className="
              text-sm
              font-semibold
              text-[#800020]
              hover:text-[#5c0017]
              hover:underline
              transition
            "
          >
            ลืมรหัสผ่าน ?
          </button>
        </div>
      </div>
    </div>
  );
}