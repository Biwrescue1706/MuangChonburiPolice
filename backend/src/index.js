import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import prisma from "./prisma.js";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", true);

// cors allow
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "https://policy-muangchonburi.smartdorm-biwboong.shop",
    "https://hub-muangchonburi.smartdorm-biwboong.shop",
];

// cors config
app.use(
    cors({
        origin: (origin, callback) => {

            // allow no-origin (mobile / postman)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// ROUTES
import adminRoute from "./routes/admin.js";
import authRoute from "./routes/auth.js";
import personRoutes from "./routes/person.js";
import receiptRoutes from "./routes/receipt.js";

app.use("/api/person", personRoutes);
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/receipt", receiptRoutes);

/* ================= THAI TIME ================= */

function thaiNow() {
    const now = new Date();

    return {
        date: now.toLocaleDateString("th-TH", {
            timeZone: "Asia/Bangkok",
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }),
        time:
            now.toLocaleTimeString("th-TH", {
                timeZone: "Asia/Bangkok",
                hour: "2-digit",
                minute: "2-digit",
            }) + " น.",
    };
}

// HEALTH CHECK
app.get("/", (_req, res) => {
  res.status(200).send(" สถานะ  OK <br/>
        รัน API สภ.เมืองชลบุรี 🚀<br/>");
});

app.get("/info", (_req, res) => {
    const mode = process.env.NODE_ENV || "development";
    const port = process.env.PORT;
    const { date, time } = thaiNow();

    res.send(`
        สถานะ  OK <br/>
        รัน API สภ.เมืองชลบุรี 🚀<br/>
        ✅ โหมดการทำงานของ API สภ.เมืองชลบุรี : ${mode} <br/>
        🌐 วิ่ง API สภ.เมืองชลบุรี บน พอต : ${port} <br/>
        📅 วัน${date} <br/>
        🕒 เวลา: ${time} 
    `);
});

app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/health", async (_req, res) => {
    const { date, time } = thaiNow();

    let db = "ok";

    try {
        await prisma.$queryRaw`SELECT 1`;
    } catch {
        db = "error";
    }

    res.json({
        status: "ok",
        mode: process.env.NODE_ENV || "development",
        database: db,
        time,
        date,
    });
});

// 404 HANDLER
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
    });
});

// ERROR HANDLER
app.use((err, _req, res, _next) => {
    console.error(err);

    res.status(500).json({
        error: "Internal Server Error",
    });
});

// SERVER START
const PORT = process.env.PORT || 10000;
const ENV = process.env.NODE_ENV || "development";

const server = app.listen(PORT, "0.0.0.0", () => {

    console.log("\n==========เซิร์ฟเวอร์เริ่มต้นแล้ว==========");

    if (ENV === "production") {
        console.log("\n✅ โหมดการรัน API ของ สภ.เมืองชลบุรี : Production");
        console.log(`🚀 เซิร์ฟเวอร์ API สภ.เมืองชลบุรี ทำงานบนพอร์ต ${PORT}`);
    } else {
        console.log("\n✅ โหมดการรัน API ของ สภ.เมืองชลบุรี : Development");
        console.log(`🚀 เซิร์ฟเวอร์ API สภ.เมืองชลบุรี ทำงานอยู่ที่ http://localhost:${PORT}\n`);
    }
});

/* ================= DB INIT ================= */

(async () => {
    try {
        console.log("🟡 การเชื่อมต่อ Prisma...");
        await prisma.$connect();
        console.log("========== prismadb เชื่อมต่อแล้ว ==========\n");
        console.log("✅ Prisma เชื่อมต่อสำเร็จแล้ว ");
        console.log(`📅 วันที่: ${thaiNow().date}`);
    } catch (err) {
        console.log("========== การเชื่อมต่อ Prisma ล้มเหลว ==========\n");
        console.error("❌ การเชื่อมต่อฐานข้อมูลล้มเหลว : ", err);
        console.log("========== โปรดตรวจสอบการตั้งค่าฐานข้อมูลและลองใหม่อีกครั้ง ==========\n");
        console.log(`📅 วันที่: ${thaiNow().date}`)
        process.exit(1);
    }
})();


/* ================= SHUTDOWN ================= */

async function shutdown() {
    console.log("🛑 Shutting down...");
    await prisma.$disconnect();
    server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);