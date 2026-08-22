import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import neonPrisma from "./neon.js";
import cron from "node-cron";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", true);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://policy-muangchonburi.smartdorm-biwboong.shop",
  "https://hub-muangchonburi.smartdorm-biwboong.shop",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

import adminRoute from "./routes/admin.js";
import authRoute from "./routes/auth.js";
import personRoutes from "./routes/person.js";
import receiptRoutes from "./routes/receipt.js";
import organizationRoutes from "./routes/organization.js";
import personStatusHistoryRoutes from "./routes/personStatusHistory.js";
import forensicSubmissionRoutes from "./routes/forensicSubmission.js";
import forensicStatusRoutes from "./routes/forensicStatus.js";
import foreignerRoutes from "./routes/foreigner.js";

app.use("/api/person", personRoutes);
app.use("/api/auth", authRoute);
app.use("/api/status-history", personStatusHistoryRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/receipt", receiptRoutes);
app.use("/api/organization", organizationRoutes);
app.use("/api/forensic-submission", forensicSubmissionRoutes);
app.use("/api/forensic-status", forensicStatusRoutes);
app.use("/api/foreigner", foreignerRoutes);

app.get("/", (_, res) => res.send("OK"));
app.get("/ping", (_, res) => res.send("OK"));

app.get("/health", async (_, res) => {
  try {
    await neonPrisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "neon" });
  } catch {
    res.json({ status: "ok", db: "error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

async function deleteExpiredPersons() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const persons = await neonPrisma.person.findMany({
      where: { deleteAt: { lte: today } },
      select: { personId: true },
    });

    const personIds = persons.map(p => p.personId);

    if (!personIds.length) return;

    const submissionPersons = await neonPrisma.forensicSubmissionPerson.findMany({
      where: { personId: { in: personIds } },
      select: { submissionId: true },
    });

    const submissionIds = [
      ...new Set(submissionPersons.map(item => item.submissionId)),
    ];

    await neonPrisma.$transaction([
      neonPrisma.receipt.deleteMany({
        where: { personId: { in: personIds } },
      }),
      neonPrisma.requestInfo.deleteMany({
        where: { personId: { in: personIds } },
      }),
      neonPrisma.personStatusHistory.deleteMany({
        where: { personId: { in: personIds } },
      }),
      neonPrisma.person.deleteMany({
        where: { personId: { in: personIds } },
      }),
    ]);

    if (submissionIds.length > 0) {
      const emptySubmissions = await neonPrisma.forensicSubmission.findMany({
        where: {
          submissionId: { in: submissionIds },
          persons: { none: {} },
        },
        select: { submissionId: true },
      });

      if (emptySubmissions.length > 0) {
        await neonPrisma.forensicSubmission.deleteMany({
          where: {
            submissionId: {
              in: emptySubmissions.map(item => item.submissionId),
            },
          },
        });
      }
    }
  } catch (err) {
    console.error("Auto Delete Error:", err);
  }
}

[
  "0 0 * * *",
  "0 8 * * *",
  "30 16 * * *",
].forEach(schedule => {
  cron.schedule(schedule, deleteExpiredPersons, {
    timezone: "Asia/Bangkok",
  });
});

const PORT = process.env.PORT || 10000;

const server = app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on port ${PORT}`);
  await deleteExpiredPersons();
});

async function shutdown() {
  console.log("Shutting down...");
  await neonPrisma.$disconnect();
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);