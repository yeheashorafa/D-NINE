import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

const backendRoot = path.dirname(fileURLToPath(import.meta.url));
const mode = process.env.NODE_ENV ?? "development";

const environmentFiles = [
  `.env.${mode}.local`,
  ".env.local",
  `.env.${mode}`,
  ".env",
];

for (const fileName of environmentFiles) {
  const filePath = path.join(backendRoot, fileName);

  if (fs.existsSync(filePath)) {
    config({
      path: filePath,
      quiet: true,
    });
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
});