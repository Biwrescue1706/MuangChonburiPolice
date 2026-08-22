import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma-neon/schema.prisma",
  migrations: {
    path: "prisma-neon/migrations",
  },
  datasource: {
    url: env("NEON_DATABASE_URL"),
  },
});