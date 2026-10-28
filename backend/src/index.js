
import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import neonPrisma from "./neon.js";
import cron from "node-cron";

import adminRoute from "./routes/admin.js";
import authRoute from "./routes/auth.js";
import personRoutes from "./routes/person.js";
import receiptRoutes from "./routes/receipt.js";
import organizationRoutes from "./routes/organization.js";
import personStatusHistoryRoutes from "./routes/personStatusHistory.js";
import forensicSubmissionRoutes from "./routes/forensicSubmission.js";
import forensicStatusRoutes from "./routes/forensicStatus.js";
import foreignerRoutes from "./routes/foreigner.js";

const app = express();
const PORT = process.env.PORT || 10000;

app.disable("x-powered-by");
app.set("trust proxy", 1); // ใช้เมื่อแอปอยู่หลัง proxy ที่เชื่อถือได้หนึ่งชั้น เช่น Render

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://policy-muangchonburi.smartdorm-biwboong.shop",
  "https://hub-muangchonburi.smartdorm-biwboong.shop",
]);

app.use(helmet()); // เพิ่ม HTTP security headers ตามค่าเริ่มต้นของ Helmet

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS origin denied"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-CSRF-Token",
  ],
  maxAge: 600,
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again later.",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too many authentication attempts. Please try again later.",
  },
});

app.use("/api", apiLimiter);
app.use("/api/auth", authLimiter);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({
  extended: false,
  limit: "100kb",
}));
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

app.get("/ping", (_req, res) => {
  res.status(200).send("OK");
});

app.get("/health", async (_req, res) => {
  try {
    await neonPrisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: "ok",
      db: "neon",
    });
  } catch {
    res.status(503).json({
      status: "error",
      db: "unavailable",
    });
  }
});

app.use("/api/person", personRoutes);
app.use("/api/auth", authRoute);
app.use("/api/status-history", personStatusHistoryRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/receipt", receiptRoutes);
app.use("/api/organization", organizationRoutes);
app.use("/api/forensic-submission", forensicSubmissionRoutes);
app.use("/api/forensic-status", forensicStatusRoutes);
app.use("/api/foreigner", foreignerRoutes);

async function deleteExpiredPersons() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const persons = await neonPrisma.person.findMany({
      where: {
        deleteAt: { lte: today },
      },
      select: {
        personId: true,
      },
    });

    const personIds = persons.map((person) => person.personId);

    if (personIds.length === 0) return;

    const submissionPersons =
      await neonPrisma.forensicSubmissionPerson.findMany({
        where: {
          personId: { in: personIds },
        },
        select: {
          submissionId: true,
        },
      });

    const submissionIds = [
      ...new Set(
        submissionPersons.map((item) => item.submissionId)
      ),
    ];

    await neonPrisma.$transaction([
      neonPrisma.receipt.deleteMany({
        where: {
          personId: { in: personIds },
        },
      }),
      neonPrisma.requestInfo.deleteMany({
        where: {
          personId: { in: personIds },
        },
      }),
      neonPrisma.personStatusHistory.deleteMany({
        where: {
          personId: { in: personIds },
        },
      }),
      neonPrisma.person.deleteMany({
        where: {
          personId: { in: personIds },
        },
      }),
    ]);

    if (submissionIds.length > 0) {
      const emptySubmissions =
        await neonPrisma.forensicSubmission.findMany({
          where: {
            submissionId: { in: submissionIds },
            persons: { none: {} },
          },
          select: {
            submissionId: true,
          },
        });

      if (emptySubmissions.length > 0) {
        await neonPrisma.forensicSubmission.deleteMany({
          where: {
            submissionId: {
              in: emptySubmissions.map(
                (item) => item.submissionId
              ),
            },
          },
        });
      }
    }

    console.log("Expired person cleanup completed");
  } catch (err) {
    console.error("Auto Delete Error:", err.message);
  }
}

cron.schedule(
  "10 0 * * *",
  deleteExpiredPersons,
  { timezone: "Asia/Bangkok" }
);

app.use((_req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

app.use((err, _req, res, _next) => {
  const isCorsError = err.message === "CORS origin denied";

  console.error("Request error:", {
    message: isCorsError ? "CORS origin denied" : err.message,
  });

  if (res.headersSent) return;

  if (isCorsError) {
    return res.status(403).json({
      error: "Forbidden",
    });
  }

  const status =
    Number.isInteger(err.status) &&
    err.status >= 400 &&
    err.status < 500
      ? err.status
      : 500;

  res.status(status).json({
    error: status === 500
      ? "Internal Server Error"
      : "Request failed",
  });
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  deleteExpiredPersons();
});

let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`Received ${signal}; shutting down...`);

  const forceExit = setTimeout(() => {
    console.error("Shutdown timeout");
    process.exit(1);
  }, 10000);

  forceExit.unref();

  server.close(async () => {
    try {
      await neonPrisma.$disconnect();
      clearTimeout(forceExit);
      process.exit(0);
    } catch (err) {
      console.error("Database disconnect error:", err.message);
      clearTimeout(forceExit);
      process.exit(1);
    }
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
