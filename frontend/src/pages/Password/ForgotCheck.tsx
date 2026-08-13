import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Swal from "sweetalert2";

export default function ForgotCheck() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

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

      nav("/reset-password", {
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
    <div className="min-h-screen bg-gradient-to-br from-[#250008] via-[#5c0017] to-[#800020]">

      {/* =====================================================
          TOP BAR
      ===================================================== */}
      <header className="
        fixed
        left-0
        top-0
        z-50
        h-[80px]
        w-full
        border-b
        border-white/10
        bg-[#650018]
        shadow-lg
      ">

        <div className="
          relative
          mx-auto
          flex
          h-full
          w-full
          max-w-[1200px]
          items-center
          px-5

          min-[768px]:px-8
          min-[1200px]:px-10
        ">

          {/* Back */}
          <button
            type="button"
            onClick={() => nav("/")}
            aria-label="กลับหน้าเข้าสู่ระบบ"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              border
              border-white/30
              bg-white/5
              text-white
              transition

              hover:bg-white/15
              active:scale-95
            "
          >
            <svg
              width="27"
              height="27"
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
          <div className="
            absolute
            left-1/2
            flex
            -translate-x-1/2
            items-center
          ">

            <div className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-lg
            ">
              <img
                src="/muangchonburi.webp"
                alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
                className="h-10 w-10 object-contain"
              />
            </div>

            <div className="ml-3 hidden min-[600px]:block">
              <p className="text-sm font-bold text-white">
                งานพิมพ์มือตรวจประวัติ
              </p>

              <p className="text-[10px] text-white/60">
                งานนโยบายและแผน
              </p>
            </div>

          </div>

        </div>
      </header>

      {/* =====================================================
          PAGE
      ===================================================== */}
      <main className="
        min-h-screen
        px-4
        pb-10
        pt-[100px]

        min-[480px]:px-6

        min-[768px]:px-8
        min-[768px]:pt-[110px]

        min-[1200px]:px-10
      ">

        {/* ===================================================
            MAIN CARD
        =================================================== */}
        <div className="
          relative
          mx-auto
          w-full
          max-w-[605px]
          overflow-hidden
          rounded-[32px]
          border
          border-white/30
          bg-[#800020]
          shadow-[0_25px_80px_rgba(0,0,0,0.35)]

          min-[768px]:max-w-[650px]

          min-[1200px]:max-w-[700px]
        ">

          {/* =================================================
              HERO
          ================================================= */}
          <section className="
            relative
            min-h-[560px]
            overflow-hidden
            px-6
            pb-[150px]
            pt-12
            text-center
            text-white

            min-[480px]:px-8

            min-[768px]:min-h-[570px]
            min-[768px]:px-12

            min-[1200px]:min-h-[600px]
            min-[1200px]:px-16
          ">

            {/* Decorative circle top right */}
            <div className="
              pointer-events-none
              absolute
              -right-[120px]
              -top-[130px]
              h-[370px]
              w-[370px]
              rounded-full
              border
              border-white/30
            " />

            {/* Decorative circle bottom left */}
            <div className="
              pointer-events-none
              absolute
              -bottom-[190px]
              -left-[130px]
              h-[380px]
              w-[380px]
              rounded-full
              border
              border-white/30
            " />

            {/* Logo */}
            <div className="
              relative
              mx-auto
              flex
              h-[170px]
              w-[170px]
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-xl
              ring-8
              ring-white/10

              min-[480px]:h-[185px]
              min-[480px]:w-[185px]

              min-[768px]:h-[195px]
              min-[768px]:w-[195px]
            ">

              <img
                src="/muangchonburi.webp"
                alt="ตราสถานีตำรวจภูธรเมืองชลบุรี"
                className="
                  h-[135px]
                  w-[135px]
                  object-contain

                  min-[480px]:h-[145px]
                  min-[480px]:w-[145px]

                  min-[768px]:h-[155px]
                  min-[768px]:w-[155px]
                "
              />

            </div>

            {/* Title */}
            <div className="
              relative
              mt-16
              text-center
            ">

              <p className="
                text-xs
                font-bold
                tracking-[0.22em]
                text-white/75

                min-[480px]:text-sm
              ">
                FORGOT PASSWORD
              </p>

              <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-white/80" />

              <h1 className="
                mt-6
                text-[30px]
                font-bold
                leading-tight
                text-white

                min-[480px]:text-[34px]

                min-[768px]:text-[40px]
              ">
                ตรวจสอบบัญชีผู้ใช้
              </h1>

              <p className="
                mx-auto
                mt-5
                max-w-[430px]
                text-sm
                leading-7
                text-white/75

                min-[480px]:text-base

                min-[768px]:text-lg
              ">
                กรอก Username เพื่อค้นหาบัญชี
                <br />
                และดำเนินการตั้งรหัสผ่านใหม่
              </p>

            </div>

          </section>

          {/* =================================================
              FORM CARD
          ================================================= */}
          <section className="
            relative
            -mt-[105px]
            rounded-t-[42px]
            bg-white
            px-6
            pb-10
            pt-9
            shadow-[0_-10px_40px_rgba(0,0,0,0.08)]

            min-[480px]:px-8

            min-[768px]:px-12
            min-[768px]:pt-10

            min-[1200px]:px-16
          ">

            <form onSubmit={checkUser}>

              {/* Username Label */}
              <label
                htmlFor="username"
                className="
                  mb-3
                  block
                  text-base
                  font-bold
                  text-gray-700

                  min-[480px]:text-lg
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
                  left-5
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
                    width="23"
                    height="23"
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
                    block
                    h-[60px]
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    bg-gray-50
                    !pl-[60px]
                    !pr-5
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
                  h-[60px]
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-none
                  bg-gradient-to-r
                  from-[#9b0027]
                  to-[#730019]
                  text-base
                  font-bold
                  text-white
                  shadow-lg
                  shadow-[#800020]/20
                  transition

                  hover:brightness-110
                  active:scale-[0.99]

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
                      width="22"
                      height="22"
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
              onClick={() => nav("/")}
              className="
                mx-auto
                mt-6
                flex
                items-center
                justify-center
                gap-2
                text-base
                font-semibold
                text-gray-500
                transition

                hover:text-[#800020]
              "
            >

              <svg
                width="21"
                height="21"
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

            {/* Divider */}
            <div className="
              mt-8
              border-t
              border-gray-100
              pt-6
              text-center
            ">

              <p className="text-xs leading-6 text-gray-400">
                ระบบงานนโยบายและแผน
                <br />
                สถานีตำรวจภูธรเมืองชลบุรี
              </p>

            </div>

          </section>

        </div>
      </main>
    </div>
  );
}