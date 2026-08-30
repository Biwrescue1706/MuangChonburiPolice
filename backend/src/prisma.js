// src/prisma.js

import "dotenv/config";

import { PrismaClient } from "./generated/supabase/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.SUPABASE_DIRECT_URL;

if (!connectionString) {
  throw new Error("❌ ไม่พบ SUPABASE_DIRECT_URL ใน .env");
}

const pool = new Pool({
  connectionString,

  // สำคัญมากสำหรับ Supabase
  ssl: {
    rejectUnauthorized: false,
  },

  max: 10,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

export default prisma;