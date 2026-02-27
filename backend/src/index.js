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
app.set("trust proxy", 1);

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
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
  })
);

// ROUTES
import adminRoute from "./routes/admin.js";
app.use("/api/admin", adminRoute);


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
    const mode = process.env.NODE_ENV || "development";
    const port = process.env.PORT;
    const { date, time } = thaiNow();

    res.send(`
        status OK
        MuangChonburi API Running 🚀<br/>
        ✅ Mode: ${mode} <br/>
        🌐 Port: ${port} <br/>
        📅 วัน${date} <br/>
        🕒 เวลา: ${time} 
    `);
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

    console.log("\n==========SERVER STARTED==========");

    if (ENV === "production") {
        console.log("\n✅ Mode: Production");
        console.log(`🚀 Server running on port ${PORT}`);
    } else {
        console.log("\n✅ Mode: Development");
        console.log(`🚀 Server running on http://localhost:${PORT}\n`);
    }
});


/* ================= DB INIT ================= */

(async () => {
    try {
        console.log("🟡 Connecting Prisma...");
        await prisma.$connect();
        console.log("========== prismadb connected ==========\n");
        console.log("✅ Prisma connected");
    } catch (err) {
        console.log("========== prisma connection failed ==========\n");
        console.error("❌ Database connection failed:", err);
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