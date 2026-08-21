// Set test environment before imports
process.env.NODE_ENV = 'test';

import * as dotenv from 'dotenv';
dotenv.config();

import { prisma } from '../lib/prisma.js';
import { emailService } from '../lib/email/email.service.js';

beforeAll(async () => {
  // Mock email service to prevent sending real emails during tests
  vi.spyOn(emailService, 'sendEmail').mockResolvedValue(undefined);
});

afterAll(async () => {
  await prisma.$disconnect();
});
