import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import prisma from "./prisma.js";
import cron from "node-cron";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", true);

/* ================= CORS ================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://policy-muangchonburi.smartdorm-biwboong.shop",
  "https://hub-muangchonburi.smartdorm-biwboong.shop",
];

app.use(
  cors({
    origin: (origin, callback) => {
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

/* ================= ROUTES ================= */
import adminRoute from "./routes/admin.js";
import authRoute from "./routes/auth.js";
import personRoutes from "./routes/person.js";
import receiptRoutes from "./routes/receipt.js";
import organizationRoutes from "./routes/organization.js";
import personStatusHistoryRoutes from "./routes/personStatusHistory.js";
import forensicSubmissionRoutes
  from "./routes/forensicSubmission.js";

app.use("/api/person", personRoutes);
app.use("/api/auth", authRoute);
app.use("/api/status-history", personStatusHistoryRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/receipt", receiptRoutes);
app.use("/api/organization", organizationRoutes);
app.use(
  "/api/forensic-submission",
  forensicSubmissionRoutes
);

/* ================= HEALTH (สำคัญมาก) ================= */

// Render ใช้ตรวจ
app.get("/", (_, res) => res.send("OK"));

// UptimeRobot ใช้ยิง
app.get("/ping", (_, res) => res.send("OK"));

// debug health
app.get("/health", async (_, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "ok" });
  } catch {
    res.json({ status: "ok", db: "error" });
  }
});

/* ================= DEBUG ALIVE ================= */
setInterval(() => {
  console.log("🟢 alive:", new Date().toISOString());
}, 150000);

/* ================= ERROR ================= */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, _req, res, _next) => {
  console.error("❌ ERROR:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

/* ================= AUTO DELETE ================= */

async function deleteExpiredPersons() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const personIds = (
      await prisma.person.findMany({
        where: {
          deleteAt: {
            lte: today,
          },
        },
        select: {
          personId: true,
        },
      })
    ).map((p) => p.personId);

    if (!personIds.length) {
      console.log("✅ ไม่มีข้อมูลที่ต้องลบ");
      return;
    }

    await prisma.$transaction([
      prisma.receipt.deleteMany({
        where: {
          personId: {
            in: personIds,
          },
        },
      }),

      prisma.requestInfo.deleteMany({
        where: {
          personId: {
            in: personIds,
          },
        },
      }),

      prisma.personStatusHistory.deleteMany({
        where: {
          personId: {
            in: personIds,
          },
        },
      }),

      prisma.person.deleteMany({
        where: {
          personId: {
            in: personIds,
          },
        },
      }),
    ]);

    console.log(`🗑️ ลบข้อมูล ${personIds.length} รายการ`);
  } catch (err) {
    console.error("❌ Auto Delete Error:", err);
  }
}

// ตรวจทุกวันเวลา 00:00
cron.schedule("0 0 * * *", async () => {
  console.log("🕛 Running Auto Delete...");
  await deleteExpiredPersons();
});


/* ================= SERVER ================= */
const PORT = process.env.PORT || 10000;

await deleteExpiredPersons();

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", PORT);
});

/* ================= SHUTDOWN ================= */
async function shutdown() {
  console.log("🛑 Shutting down...");
  await prisma.$disconnect();
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);