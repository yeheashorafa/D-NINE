import { PrismaClient } from '../generated/prisma/client.js';
import pkg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '../config/env.js';

const { Pool } = pkg;

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
