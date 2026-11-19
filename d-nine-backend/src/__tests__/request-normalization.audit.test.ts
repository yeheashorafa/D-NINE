import { describe, expect, it } from 'vitest';
import express from 'express';
import request from 'supertest';
import { contactSubmissionSchema } from '@d-nine/contracts';
import { validateRequest } from '../middleware/validate-request.js';

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.post('/contact', validateRequest(contactSubmissionSchema), (req, res) => {
    res.status(200).json(req.body);
  });
  return app;
}

describe('API must use the sanitized output of Zod', () => {
  it('normalizes whitespace and email casing before reaching the controller', async () => {
    const response = await request(createTestApp())
      .post('/contact')
      .send({
        fullName: '  Audit Visitor  ',
        email: '  VISITOR@EXAMPLE.COM  ',
        serviceSlug: 'brand-identity',
        message: '  A message that is long enough.  ',
        locale: 'en',
      });

    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe('Audit Visitor');
    expect(response.body.email).toBe('visitor@example.com');
    expect(response.body.message).toBe('A message that is long enough.');
  });

  it('returns validation error for an invalid email', async () => {
    const response = await request(createTestApp())
      .post('/contact')
      .send({
        fullName: 'Audit Visitor',
        email: 'bad-email',
        serviceSlug: 'brand-identity',
        message: 'A message that is long enough.',
        locale: 'en',
      });

    expect(response.status).toBe(422);
  });
});
