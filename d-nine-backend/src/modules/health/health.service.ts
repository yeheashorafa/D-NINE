import { prisma } from '../../lib/prisma.js';
import { logger } from '../../middleware/request-logger.js';

export class HealthService {
  async checkReadiness(): Promise<boolean> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      logger.error({ error }, 'Readiness check failed');
      return false;
    }
  }
}

export const healthService = new HealthService();
