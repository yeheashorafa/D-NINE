import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { env } from '../config/env.js';
import { sendFailure } from '../lib/api-response.js';
import { getMessage } from '../lib/messages.js';
import crypto from 'crypto';
import { Request, Response } from 'express';

/**
 * Privacy-conscious key generator that hashes the client IP.
 * Uses ipKeyGenerator from express-rate-limit to properly normalize
 * IPv4 and IPv6 addresses before hashing.
 *
 * ipKeyGenerator(ip: string) normalizes IPv4-mapped IPv6 addresses
 * and applies subnet masking, so the ERR_ERL_KEY_GEN_IPV6 warning
 * is satisfied.
 */
const hashedIpKeyGenerator = (req: Request): string => {
  const rawIp = req.ip || '127.0.0.1';
  const normalizedIp = ipKeyGenerator(rawIp);
  return crypto.createHmac('sha256', env.IP_HASH_SALT).update(normalizedIp).digest('hex');
};

const handler = (_req: Request, res: Response) => {
  const req = res.req;
  const locale = (req.headers['accept-language']?.startsWith('en') ? 'en' : 'ar') as 'en' | 'ar';
  return sendFailure(req, res, 429, 'RATE_LIMITED', getMessage('RATE_LIMITED', locale));
};

export const globalRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: hashedIpKeyGenerator,
  handler,
});

export const formRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.FORM_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: hashedIpKeyGenerator,
  handler,
});
