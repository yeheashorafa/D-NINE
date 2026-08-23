import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {config} from 'dotenv';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(currentDirectory, '../..');
const mode = process.env.NODE_ENV ?? 'development';

const environmentFiles = [
  `.env.${mode}.local`,
  '.env.local',
  `.env.${mode}`,
  '.env',
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
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().default(4000),
  LOG_LEVEL: z.string().default('info'),

  FRONTEND_ORIGINS: z.string().transform((str) => str.split(',').map((s) => s.trim())),

  DATABASE_URL: z.string().url(),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
  FORM_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(10),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().default(587).optional(),
  SMTP_SECURE: z.coerce.boolean().default(false).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  CONTACT_NOTIFICATION_EMAIL: z.string().email().optional(),

  IP_HASH_SALT: z.string().min(16).default('development-secret-salt-do-not-use-in-prod')
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,
  );

  throw new Error('Invalid backend environment configuration');
}

export const env = parsed.data;
