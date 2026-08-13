import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Swal from "sweetalert2";

export default function ForgotCheck() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const checkUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = username.trim();

    if (!value) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอก Username",
        confirmButtonColor: "#800020",
      });

      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/forgot/check", {
        username: value,
      });

      await Swal.fire({
        icon: "success",
        title: `พบผู้ใช้ ${res.data.admin.name}`,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/reset-password", {
        state: {
          username: value,
        },
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "ไม่พบผู้ใช้งาน",
        text: "กรุณาตรวจสอบ Username อีกครั้ง",
        confirmButtonColor: "#800020",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#250008] via-[#5c0017] to-[#800020]">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#700019] shadow-lg">

        <div className="relative mx-auto flex h-[64px] w-full max-w-[1200px] items-center px-4">

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="กลับหน้าเข้าสู่ระบบ"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/20
              bg-white/10
              text-white
              transition
              hover:bg-white/20
              active:scale-95
            "
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>

          {/* Center Logo */}
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center">

            <div className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-md
            ">
              <img
                src="/muangchonburi.webp"
                alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
                className="h-8 w-8 object-contain"
              />
            </div>

            {/* Header Text */}
            <div className="ml-2 hidden min-[480px]:block">

              <p className="whitespace-nowrap text-sm font-bold leading-tight text-white">
                งานพิมพ์มือตรวจประวัติ
              </p>

              <p className="mt-0.5 text-[10px] text-white/70">
                งานนโยบายและแผน
              </p>

            </div>

          </div>

        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}
      <main className="
        flex
        min-h-screen
        items-center
        justify-center
        px-4
        pb-8
        pt-[88px]

        min-[480px]:px-6
        min-[768px]:px-8
        min-[1200px]:px-10
      ">

        {/* =================================================
            CARD
        ================================================= */}
        <section className="
          w-full
          max-w-[440px]
          overflow-hidden
          rounded-[30px]
          bg-white
          shadow-[0_25px_70px_rgba(0,0,0,0.35)]

          min-[480px]:max-w-[470px]

          min-[768px]:max-w-[500px]

          min-[1200px]:max-w-[540px]
        ">

          {/* =================================================
              TOP BURGUNDY
          ================================================= */}
          <div className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-[#800020]
            via-[#680018]
            to-[#42000f]
            px-6
            pb-14
            pt-8
            text-center

            min-[480px]:px-10
            min-[768px]:pb-16
          ">

            {/* Decoration */}
            <div className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-64
              w-64
              rounded-full
              border
              border-white/10
            " />

            <div className="
              pointer-events-none
              absolute
              -bottom-36
              -left-32
              h-72
              w-72
              rounded-full
              border
              border-white/10
            " />

            {/* Logo */}
            <div className="
              relative
              mx-auto
              flex
              h-[105px]
              w-[105px]
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-2xl
              ring-8
              ring-white/10

              min-[480px]:h-[115px]
              min-[480px]:w-[115px]

              min-[768px]:h-[125px]
              min-[768px]:w-[125px]
            ">

              <img
                src="/muangchonburi.webp"
                alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
                className="
                  h-[82px]
                  w-[82px]
                  object-contain

                  min-[480px]:h-[90px]
                  min-[480px]:w-[90px]

                  min-[768px]:h-[98px]
                  min-[768px]:w-[98px]
                "
              />

            </div>

            {/* Small Title */}
            <p className="
              relative
              mt-7
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-white/70
            ">
              Forgot Password
            </p>

            {/* Main Title */}
            <h1 className="
              relative
              mt-3
              text-2xl
              font-bold
              text-white

              min-[480px]:text-3xl
              min-[768px]:text-4xl
            ">
              ตรวจสอบบัญชีผู้ใช้
            </h1>

            {/* Description */}
            <p className="
              relative
              mx-auto
              mt-3
              max-w-[390px]
              text-sm
              leading-7
              text-white/75

              min-[480px]:text-base
            ">
              กรุณากรอก Username เพื่อค้นหาบัญชี
              <br />
              และดำเนินการตั้งรหัสผ่านใหม่
            </p>

          </div>

          {/* =================================================
              FORM AREA
          ================================================= */}
          <div className="
            relative
            -mt-7
            rounded-t-[30px]
            bg-white
            px-6
            pb-8
            pt-8

            min-[480px]:px-8
            min-[480px]:pb-10

            min-[768px]:px-10
          ">

            <form onSubmit={checkUser}>

              {/* Username Label */}
              <label
                htmlFor="username"
                className="
                  mb-2
                  block
                  text-sm
                  font-bold
                  text-gray-700

                  min-[480px]:text-base
                "
              >
                Username
              </label>

              {/* Input */}
              <div className="relative w-full">

                {/* Icon */}
                <div className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  z-10
                  flex
                  h-5
                  w-5
                  -translate-y-1/2
                  items-center
                  justify-center
                  text-[#800020]
                ">

                  <svg
                    width="21"
                    height="21"
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
                  required
                  className="
                    h-[54px]
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50

                    !pl-[52px]
                    !pr-4

                    text-base
                    text-gray-900
                    outline-none
                    transition

                    placeholder:text-gray-400

                    hover:border-gray-300

                    focus:border-[#800020]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#800020]/10
                  "
                />

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  mt-5
                  flex
                  h-[54px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#800020]
                  to-[#5c0017]
                  text-base
                  font-bold
                  text-white
                  shadow-lg
                  shadow-[#800020]/20
                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:shadow-xl

                  active:translate-y-0

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {loading ? (
                  <>
                    <span className="
                      h-5
                      w-5
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    " />

                    กำลังตรวจสอบ...
                  </>
                ) : (
                  <>
                    ตรวจสอบบัญชี

                    <svg
                      width="20"
                      height="20"
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

            {/* Back Login */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                mx-auto
                mt-5
                flex
                items-center
                justify-center
                gap-2
                text-sm
                font-semibold
                text-gray-500
                transition

                hover:text-[#800020]

                min-[480px]:text-base
              "
            >

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>

              กลับหน้าเข้าสู่ระบบ

            </button>
          </div>

        </section>

      </main>
    </div>
  );
}