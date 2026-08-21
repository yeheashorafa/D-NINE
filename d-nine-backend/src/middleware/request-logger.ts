import { Request, Response, NextFunction } from 'express';
import pino from 'pino';
import pinoHttpPkg from 'pino-http';
const pinoHttp = pinoHttpPkg.pinoHttp || pinoHttpPkg;
import { env } from '../config/env.js';

export const logger = pino({
  level: env.LOG_LEVEL,
});

export const requestLogger = pinoHttp({
  logger,
  genReqId: (req: any) => (req as any).id,
  customProps: (req: any, res: any) => {
    return {
      environment: env.NODE_ENV,
    };
  },
  autoLogging: {
    ignore: (req: any) => req.url === '/api/v1/health' || req.url === '/api/v1/ready',
  },
  serializers: {
    req: (req: any) => {
      // Don't log full bodies for privacy, just metadata
      return {
        id: req.id,
        method: req.method,
        url: req.url,
        remoteAddress: req.remoteAddress,
      };
    },
    res: (res: any) => ({
      statusCode: res.statusCode,
    }),
  }
});
