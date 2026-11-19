import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createCorsMiddleware, normalizeOrigin } from '../middleware/cors.js';

describe('production CORS regression coverage', () => {
  it('normalizes configured origins with a trailing slash', () => {
    expect(normalizeOrigin('https://dnine9.com/')).toBe('https://dnine9.com');
  });

  it('answers an allowed production preflight request with CORS headers', async () => {
    const app = express();
    app.use(createCorsMiddleware(['https://dnine9.com/', 'https://www.dnine9.com']));
    app.post('/api/v1/contact', (_req, res) => res.sendStatus(204));

    const response = await request(app)
      .options('/api/v1/contact')
      .set('Origin', 'https://dnine9.com')
      .set('Access-Control-Request-Method', 'POST')
      .set('Access-Control-Request-Headers', 'content-type');

    expect(response.status).toBe(204);
    expect(response.headers['access-control-allow-origin']).toBe('https://dnine9.com');
    expect(response.headers['access-control-allow-credentials']).toBe('true');
    expect(response.headers['access-control-allow-methods']).toContain('POST');
    expect(response.headers['access-control-allow-headers']).toContain('Content-Type');
  });
});
