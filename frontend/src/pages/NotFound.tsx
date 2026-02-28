import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const GOLD = "#FFC800";
  const navigate = useNavigate();

  // กด Enter กลับหน้าแรก
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") navigate("/");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center px-3 position-relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg,#2b0000 0%,#5c0000 40%,#8b0000 70%,#3a0000 100%)",
        color: "white",
      }}
    >
      {/* Background Glow */}
      <div className="bg-glow"></div>

      {/* LOGO */}
      <img
        src="/muangchonburi.webp"
        alt="logo"
        width="130"
        className="img-fluid logo-float"
      />

      {/* ===== TITLE ===== */}
      <div className="title-group">
        <h1 className="title-main">
          งานพิมพ์มือตรวจประวัติอาชญากรรม
        </h1>

        <h5 className="title-secondary">
          งานนโยบายและแผน
        </h5>

        <h6 className="title-tertiary">
          สภ.เมืองชลบุรี
        </h6>
      </div>

      {/* 404 */}
      <h1 className="error-code">404</h1>

      {/* TEXT */}
      <p className="description">
        ไม่พบหน้าที่คุณกำลังค้นหา
      </p>

      {/* BUTTON */}
      <Link to="/" className="home-btn">
        กลับไปหน้าแรก
      </Link>

      {/* STYLE */}
      <style>
        {`
        /* RED GLOW BACKGROUND */
        .bg-glow{
          position:absolute;
          width:650px;
          height:650px;
          background:radial-gradient(circle,
            rgba(255,0,0,.25),
            transparent 70%);
          filter:blur(130px);
          animation:pulse 6s infinite alternate;
        }

        @keyframes pulse{
          from{transform:scale(.9);}
          to{transform:scale(1.2);}
        }

        /* FLOAT LOGO */
        .logo-float{
          margin-bottom:10px;
          filter:drop-shadow(0 6px 14px rgba(0,0,0,.7));
          animation:float 3.5s ease-in-out infinite;
        }

        @keyframes float{
          0%,100%{transform:translateY(0);}
          50%{transform:translateY(-10px);}
        }

        /* TITLE GROUP */
        .title-group{
          animation:fadeDown .8s;
          margin-bottom:10px;
        }

        .title-main{
          font-weight:800;
          color:${GOLD};
          text-shadow:
            0 3px 6px rgba(0,0,0,.6),
            0 0 12px rgba(255,200,0,.4);
        }

        .title-secondary{
          font-weight:700;
          color:${GOLD};
          text-shadow:
            0 2px 5px rgba(0,0,0,.6),
            0 0 10px rgba(255,200,0,.3);
          margin-bottom:2px;
        }

        .title-tertiary{
          font-weight:600;
          color:#FFD95A;
          letter-spacing:1px;
          text-shadow:
            0 2px 5px rgba(0,0,0,.6),
            0 0 8px rgba(255,200,0,.25);
        }

        @keyframes fadeDown{
          from{
            opacity:0;
            transform:translateY(-25px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        /* 404 */
        .error-code{
          font-size:clamp(4.5rem,13vw,8rem);
          font-weight:900;
          color:${GOLD};
          margin-top:10px;
          text-shadow:
            0 0 18px rgba(255,200,0,.7),
            0 10px 25px rgba(0,0,0,.8);
          animation:zoomIn .6s;
        }

        @keyframes zoomIn{
          from{
            transform:scale(.6);
            opacity:0;
          }
          to{
            transform:scale(1);
            opacity:1;
          }
        }

        .description{
          margin-top:10px;
          font-size:1.2rem;
          color:#ffeaea;
          opacity:.9;
        }

        /* BUTTON */
        .home-btn{
          margin-top:22px;
          background:${GOLD};
          color:#3a0000;
          font-weight:700;
          padding:.7rem 2.6rem;
          border-radius:14px;
          text-decoration:none;
          box-shadow:0 6px 18px rgba(0,0,0,.6);
          transition:.25s;
        }

        .home-btn:hover{
          transform:scale(1.07);
          box-shadow:0 10px 28px rgba(0,0,0,.8);
        }
        `}
      </style>
    </div>
  );
}