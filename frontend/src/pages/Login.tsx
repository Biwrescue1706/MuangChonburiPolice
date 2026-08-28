import { useEffect, useState } from "react";
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
      setLoading(true);
      await login(username.trim(), password);
    } catch (err: any) {
      toast(
        "error",
        err?.response?.data?.error || "เข้าสู่ระบบไม่สำเร็จ"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#280009] via-[#620019] to-[#800020]">

      {/* Background Decoration */}
      <div className="pointer-events-none fixed -left-32 -top-32 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

      <div className="pointer-events-none fixed -bottom-40 -right-40 h-96 w-96 rounded-full bg-red-400/10 blur-3xl" />

      {/* Main */}
      <main className="relative flex min-h-screen items-center justify-center p-4 min-[480px]:p-6 min-[768px]:p-8 min-[1200px]:p-10">

        {/* Card */}
        <div className="
          w-full
          max-w-[430px]
          overflow-hidden
          rounded-[28px]
          bg-white
          shadow-[0_25px_70px_rgba(0,0,0,0.35)]

          min-[768px]:max-w-[500px]

          min-[1200px]:grid
          min-[1200px]:max-w-[1050px]
          min-[1200px]:grid-cols-2
        ">

          {/* =================================================
              DESKTOP LEFT
          ================================================= */}
          <div className="
            relative
            hidden
            min-h-[650px]
            overflow-hidden
            bg-gradient-to-br
            from-[#800020]
            via-[#650018]
            to-[#35000b]
            p-12
            text-center
            text-white

            min-[1200px]:flex
            min-[1200px]:flex-col
            min-[1200px]:items-center
            min-[1200px]:justify-center
          ">

            {/* Decoration */}
            <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full border border-white/10" />

            <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full border border-white/10" />

            {/* Logo */}
            <div className="
              relative
              flex
              h-36
              w-36
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-2xl
              ring-8
              ring-white/10
            ">
              <img
                src="/assets/muangchonburi.webp"
                alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
                className="h-28 w-28 object-contain"
              />
            </div>

            <h1 className="mt-8 text-3xl font-bold">
              งานพิมพ์มือตรวจประวัติ
            </h1>

            <div className="my-5 h-1 w-16 rounded-full bg-white/80" />

            <p className="text-sm leading-8 text-white/75">
              ระบบบริหารจัดการงานพิมพ์มือตรวจประวัติ
              <br />
              งานนโยบายและแผน
              <br />
              สถานีตำรวจภูธรเมืองชลบุรี
            </p>

            <div className="
              mt-10
              rounded-full
              border
              border-white/15
              bg-white/10
              px-6
              py-2.5
              text-xs
              text-white/70
            ">
              Muang Chonburi Police Station
            </div>

          </div>

          {/* =================================================
              LOGIN AREA
          ================================================= */}
          <div className="
            flex
            min-h-[620px]
            flex-col
            justify-center
            bg-white

            p-6

            min-[480px]:p-8
            min-[768px]:p-10
            min-[1200px]:min-h-[650px]
            min-[1200px]:p-12
          ">

            {/* Mobile Logo */}
            <div className="mb-8 text-center min-[1200px]:hidden">

              <div className="
                mx-auto
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-lg
                ring-8
                ring-[#800020]/5

                min-[480px]:h-28
                min-[480px]:w-28
                min-[768px]:h-32
                min-[768px]:w-32
              ">
                <img
                                  src="/assets/muangchonburi.webp"
                  alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
                  className="
                    h-20
                    w-20
                    object-contain

                    min-[480px]:h-24
                    min-[480px]:w-24
                  "
                />
              </div>

              <h1 className="
                mt-5
                text-xl
                font-bold
                text-gray-900

                min-[480px]:text-2xl
                min-[768px]:text-3xl
              ">
                งานพิมพ์มือตรวจประวัติ
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                งานนโยบายและแผน
              </p>

              <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#800020]" />

            </div>

            {/* Login Heading */}
            <div className="mb-7">

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#800020]">
                Welcome Back
              </p>

              <h2 className="
                text-2xl
                font-bold
                text-gray-900

                min-[480px]:text-3xl
              ">
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

                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Username
                </label>

                <div className="relative">

                  <div className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    flex
                    h-5
                    w-5
                    -translate-y-1/2
                    items-center
                    justify-center
                    text-[#800020]
                  ">
                    <svg
                      width="20"
                      height="20"
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
                  </div>

                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="กรอก Username"
                    autoComplete="username"
                    className="
                      h-[52px]
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      pl-12
                      pr-4
                      text-sm
                      text-gray-900
                      outline-none
                      transition

                      placeholder:text-gray-400

                      focus:border-[#800020]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#800020]/10
                    "
                  />

                </div>
              </div>

              {/* Password */}
              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Password
                </label>

                <div className="relative">

                  <div className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    flex
                    h-5
                    w-5
                    -translate-y-1/2
                    items-center
                    justify-center
                    text-[#800020]
                  ">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="4.5"
                        y="10"
                        width="15"
                        height="10"
                        rx="2"
                      />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </svg>
                  </div>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="กรอก Password"
                    autoComplete="current-password"
                    className="
                      h-[52px]
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      pl-12
                      pr-12
                      text-sm
                      text-gray-900
                      outline-none
                      transition

                      placeholder:text-gray-400

                      focus:border-[#800020]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#800020]/10
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-3
                      top-1/2
                      flex
                      h-9
                      w-9
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-lg
                      text-gray-400
                      hover:bg-gray-100
                      hover:text-[#800020]
                    "
                  >
                    {showPassword ? (
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c5 0 8.5 4 9.5 7" />
                        <path d="M2.5 12c1 3 4.5 7 9.5 7 1.3 0 2.5-.3 3.6-.8" />
                      </svg>
                    ) : (
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                        <circle cx="12" cy="12" r="2.5" />
                      </svg>
                    )}
                  </button>

                </div>
              </div>

              {/* Forgot */}
              <div className="flex justify-end">

                <button
                  type="button"
                  onClick={() => navigate("/forgot")}
                  className="
                    text-sm
                    font-bold
                    text-[#800020]
                    hover:underline
                  "
                >
                  ลืมรหัสผ่าน?
                </button>

              </div>

              {/* Login */}
              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  h-[52px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#800020]
                  to-[#5d0018]
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-[#800020]/20
                  transition

                  hover:-translate-y-0.5
                  hover:shadow-xl

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    กำลังเข้าสู่ระบบ...
                  </>
                ) : (
                  <>
                    เข้าสู่ระบบ

                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h13" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </>
                )}

              </button>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}