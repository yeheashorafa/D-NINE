import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const id = req.headers['x-request-id'] || crypto.randomUUID();
  (req as any).id = id;
  res.setHeader('x-request-id', id);
  next();
}
