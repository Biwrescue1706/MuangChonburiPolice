import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import prisma from "./prisma.js";

if (process.env.NODE_ENV !== "production") dotenv.config();

const app = express();

/* ================= TRUST PROXY ================= */
app.set("trust proxy", 1);

/* ================= CORS ================= */
app.use(
  cors({
    origin: [
      "https://policy-muangchonburi.smartdorm-biwboong.shop",
      "https://hub-muangchonburi.smartdorm-biwboong.shop",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

/* ⭐ บังคับ credential header (กัน mobile block cookie) */
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Credentials",
    "true"
  );
  next();
});

/* ================= MIDDLEWARE ================= */
app.use(cookieParser());
app.use(express.json());

/* ================= ROUTES ================= */
import authRoute from "./routes/auth.js";
import adminRoute from "./routes/admin.js";

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);

/* ================= HEALTH ================= */

app.get("/", (_req, res) => {
  res.send("MuangChonburi API Running 🚀");
});

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "ok",
      mode: process.env.NODE_ENV,
    });
  } catch {
    res.json({
      status: "db error",
    });
  }
});

/* ================= 404 ================= */
app.use((_req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

/* ================= ERROR ================= */
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal Server Error",
  });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 10000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

/* ================= DB ================= */
(async () => {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected");
  } catch (err) {
    console.error("❌ DB error", err);
  }
})();

/* ================= SHUTDOWN ================= */
async function shutdown() {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);