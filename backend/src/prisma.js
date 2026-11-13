import "dotenv/config";
import { PrismaClient } from "./generated/neon/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.NEON_DIRECT_URL;

if (!connectionString) {
  throw new Error("ไม่พบ NEON_DIRECT_URL ใน .env");
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
});

const adapter = new PrismaPg(pool);

const neonPrisma = new PrismaClient({
  adapter,
});

export default neonPrisma;
