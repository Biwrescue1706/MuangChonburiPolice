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

/* ================= HEALTH CHECK ================= */

// 🔥 สำคัญมาก (Render ใช้ตัวนี้)
app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

// สำหรับ UptimeRobot
app.get("/ping", (_req, res) => {
  res.json({ status: "ok" });
});

// เช็ค DB
app.get("/health", async (_req, res) => {
  let db = "ok";

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    db = "error";
  }

  res.json({
    status: "ok",
    database: db,
  });
});

/* ================= ERROR ================= */

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 10000;

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