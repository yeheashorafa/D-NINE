import request from 'supertest';
import app from '../app.js';
import { prisma } from '../lib/prisma.js';

// ---------------------------------------------------------------------------
// Test-scoped unique emails to avoid collisions with real data
// ---------------------------------------------------------------------------
const TEST_PREFIX = `test-${Date.now()}`;
const CONTACT_EMAIL = `${TEST_PREFIX}-contact@example.com`;
const BOOK_CALL_EMAIL = `${TEST_PREFIX}-bookcall@example.com`;
const NEWSLETTER_EMAIL = `${TEST_PREFIX}-newsletter@example.com`;

// ---------------------------------------------------------------------------
// Cleanup: only delete rows created by THIS test run
// ---------------------------------------------------------------------------
afterAll(async () => {
  await prisma.emailDelivery.deleteMany({
    where: { to: { contains: TEST_PREFIX } },
  });
  await prisma.contactSubmission.deleteMany({
    where: { email: { contains: TEST_PREFIX } },
  });
  await prisma.bookCallRequest.deleteMany({
    where: { email: { contains: TEST_PREFIX } },
  });
  await prisma.newsletterSubscription.deleteMany({
    where: { email: { contains: TEST_PREFIX } },
  });
  await prisma.$disconnect();
});

// ============================================================================
// 1. HEALTH & READINESS
// ============================================================================
describe('Health & Readiness', () => {
  it('GET /api/v1/health → 200 with full envelope', async () => {
    const res = await request(app)
      .get('/api/v1/health')
      .set('Accept-Language', 'en');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.code).toBe('HEALTH_OK');
    expect(res.body.message).toBe('The service is running normally.');
    expect(res.body.data).toHaveProperty('status', 'ok');
    expect(res.body.meta).toHaveProperty('requestId');
    expect(res.body.meta).toHaveProperty('timestamp');
  });

  it('GET /api/v1/ready → 200 with full envelope', async () => {
    const res = await request(app)
      .get('/api/v1/ready')
      .set('Accept-Language', 'en');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.code).toBe('READINESS_OK');
    expect(res.body.message).toBe('The service and database are ready.');
    expect(res.body.data).toHaveProperty('status', 'ready');
    expect(res.body.meta).toHaveProperty('requestId');
    expect(res.body.meta).toHaveProperty('timestamp');
  });

  it('GET /api/v1/ready → 503 when DB is down', async () => {
    // Temporarily break the health check
    const { healthService } = await import('../modules/health/health.service.js');
    const spy = vi.spyOn(healthService, 'checkReadiness').mockResolvedValueOnce(false);

    const res = await request(app)
      .get('/api/v1/ready')
      .set('Accept-Language', 'en');
    expect(res.status).toBe(503);
    expect(res.body.success).toBe(false);
    expect(res.body.code).toBe('DATABASE_UNAVAILABLE');
    expect(res.body.message).toBe('Database is currently unavailable.');
    expect(res.body.meta).toHaveProperty('requestId');

    spy.mockRestore();
  });
});

// ============================================================================
// 2. CONTACT FORM
// ============================================================================
describe('Contact Form', () => {
  const validPayload = {
    fullName: 'Test Contact User',
    email: CONTACT_EMAIL,
    serviceSlug: 'brand-identity',
    message: 'Hello, I want to rebrand my company. This is a long enough test message.',
    locale: 'en',
    sourcePage: '/en/contact',
  };

  let createdSubmissionId: string;

  it('POST /api/v1/contact → 201 with valid payload', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .set('Accept-Language', 'en')
      .send(validPayload);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.code).toBe('CONTACT_SUBMITTED');
    expect(res.body.message).toBe('Your message has been received. Our team will contact you soon.');
    expect(res.body.data).toHaveProperty('submissionId');
    expect(res.body.data).toHaveProperty('status', 'NEW');
    expect(res.body.data).toHaveProperty('createdAt');
    expect(res.body.meta).toHaveProperty('requestId');
    expect(res.body.meta).toHaveProperty('timestamp');
    createdSubmissionId = res.body.data.submissionId;
  });

  it('Contact submission persisted in database', async () => {
    expect(createdSubmissionId).toBeDefined();
    const record = await prisma.contactSubmission.findUnique({
      where: { id: createdSubmissionId },
    });
    expect(record).not.toBeNull();
    expect(record!.email).toBe(CONTACT_EMAIL.toLowerCase());
    expect(record!.fullName).toBe('Test Contact User');
    expect(record!.serviceSlug).toBe('brand-identity');
  });

  it('POST /api/v1/contact → 422 with invalid email', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .set('Accept-Language', 'en')
      .send({ ...validPayload, email: 'not-an-email' });
    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.code).toBe('VALIDATION_ERROR');
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors.length).toBeGreaterThan(0);
    expect(res.body.meta).toHaveProperty('requestId');
  });

  it('POST /api/v1/contact → 422 with invalid service slug', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .set('Accept-Language', 'en')
      .send({ ...validPayload, serviceSlug: 'nonexistent-service' });
    expect(res.status).toBe(422);
    expect(res.body.code).toBe('VALIDATION_ERROR');
  });

  it('POST /api/v1/contact → 422 with short message', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .set('Accept-Language', 'en')
      .send({ ...validPayload, message: 'Hi' });
    expect(res.status).toBe(422);
    expect(res.body.code).toBe('VALIDATION_ERROR');
  });

  it('POST /api/v1/contact → 400 with filled honeypot', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .set('Accept-Language', 'en')
      .send({ ...validPayload, website: 'http://spam.com' });
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('HONEYPOT_REJECTED');
    expect(res.body.meta).toHaveProperty('requestId');
  });

  it('POST /api/v1/contact → 422 with unknown/missing required fields', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .set('Accept-Language', 'en')
      .send({ fullName: 'John' }); // Missing email, serviceSlug, message, locale
    expect(res.status).toBe(422);
    expect(res.body.code).toBe('VALIDATION_ERROR');
    expect(res.body.errors!.length).toBeGreaterThanOrEqual(1);
  });
});

// ============================================================================
// 3. BOOK-A-CALL
// ============================================================================
describe('Book-a-Call', () => {
  const validPayload = {
    fullName: 'Test Booker',
    email: BOOK_CALL_EMAIL,
    serviceSlug: 'brand-identity',
    preferredDate: '2026-09-15',
    preferredTime: '14:00',
    timezone: 'Asia/Riyadh',
    locale: 'en',
    sourcePage: '/en/services',
  };

  it('POST /api/v1/book-call → 201 with valid payload', async () => {
    const res = await request(app)
      .post('/api/v1/book-call')
      .set('Accept-Language', 'en')
      .send(validPayload);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.code).toBe('BOOK_CALL_SUBMITTED');
    expect(res.body.data).toHaveProperty('bookingId');
    expect(res.body.data).toHaveProperty('status');
    expect(res.body.data).toHaveProperty('createdAt');
    expect(res.body.meta).toHaveProperty('requestId');
    expect(res.body.meta).toHaveProperty('timestamp');
  });

  it('POST /api/v1/book-call → 422 with missing date/time', async () => {
    const res = await request(app)
      .post('/api/v1/book-call')
      .set('Accept-Language', 'en')
      .send({
        ...validPayload,
        preferredDate: '',
        preferredTime: '',
        timezone: '',
      });
    expect(res.status).toBe(422);
    expect(res.body.code).toBe('VALIDATION_ERROR');
    expect(res.body.errors!.length).toBeGreaterThanOrEqual(1);
  });
});

// ============================================================================
// 4. NEWSLETTER
// ============================================================================
describe('Newsletter', () => {
  const payload = { email: NEWSLETTER_EMAIL, locale: 'en' };

  it('POST /api/v1/newsletter → 201 first subscription', async () => {
    const res = await request(app)
      .post('/api/v1/newsletter')
      .set('Accept-Language', 'en')
      .send(payload);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.code).toBe('NEWSLETTER_SUBSCRIBED');
    expect(res.body.message).toBe('You have successfully subscribed to the newsletter.');
    expect(res.body.meta).toHaveProperty('requestId');
    expect(res.body.meta).toHaveProperty('timestamp');
  });

  it('POST /api/v1/newsletter → 200 duplicate subscription', async () => {
    const res = await request(app)
      .post('/api/v1/newsletter')
      .set('Accept-Language', 'en')
      .send(payload);
    expect(res.status).toBe(200);
    expect(res.body.code).toBe('NEWSLETTER_ALREADY_SUBSCRIBED');
  });

  it('Duplicate does not create another row', async () => {
    const count = await prisma.newsletterSubscription.count({
      where: { email: NEWSLETTER_EMAIL.toLowerCase() },
    });
    expect(count).toBe(1);
  });
});

// ============================================================================
// 5. INVALID JSON
// ============================================================================
describe('Invalid JSON', () => {
  it('POST with malformed JSON → 400', async () => {
    const res = await request(app)
      .post('/api/v1/contact')
      .set('Content-Type', 'application/json')
      .set('Accept-Language', 'en')
      .send('{ invalid json }');
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.code).toBe('INVALID_JSON');
    expect(res.body.meta).toHaveProperty('requestId');
  });
});

// ============================================================================
// 6. UNKNOWN ROUTE
// ============================================================================
describe('Unknown Route', () => {
  it('GET /unknown → 404 with envelope', async () => {
    const res = await request(app)
      .get('/unknown')
      .set('Accept-Language', 'en');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.code).toBe('NOT_FOUND');
    expect(res.body.message).toBe('The requested route was not found.');
    expect(res.body.meta).toHaveProperty('requestId');
  });
});

// ============================================================================
// 7. REQUEST ID
// ============================================================================
describe('Request ID', () => {
  it('Response includes x-request-id header', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.headers['x-request-id']).toBeDefined();
    expect(res.body.meta.requestId).toBeDefined();
  });

  it('Echoes provided x-request-id', async () => {
    const customId = 'test-req-id-12345';
    const res = await request(app)
      .get('/api/v1/health')
      .set('x-request-id', customId);
    expect(res.headers['x-request-id']).toBe(customId);
    expect(res.body.meta.requestId).toBe(customId);
  });
});

// ============================================================================
// 8. LOCALIZATION
// ============================================================================
describe('Localization', () => {
  it('Arabic response when Accept-Language: ar', async () => {
    const res = await request(app)
      .get('/api/v1/health')
      .set('Accept-Language', 'ar');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('الخدمة تعمل بشكل طبيعي.');
  });

  it('English response when Accept-Language: en', async () => {
    const res = await request(app)
      .get('/api/v1/health')
      .set('Accept-Language', 'en');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('The service is running normally.');
  });
});

// ============================================================================
// 9. EMAIL ADAPTER FAILURE PRESERVES DB RECORD
// ============================================================================
describe('Email Adapter Failure', () => {
  it('Contact submission persists even when email fails', async () => {
    const { contactService } = await import('../modules/contact/contact.service.js');
    const { emailService } = await import('../lib/email/email.service.js');

    // Make emailService throw on the next call
    const spy = vi.spyOn(emailService, 'sendEmail').mockRejectedValueOnce(new Error('SMTP down'));

    const emailAddr = `${TEST_PREFIX}-emailfail@example.com`;
    const payload = {
      fullName: 'Email Fail Test',
      email: emailAddr,
      serviceSlug: 'brand-identity' as const,
      message: 'Testing that submission persists even with email failure.',
      locale: 'en' as const,
    };

    // processSubmission should not throw even when email fails
    const submission = await contactService.processSubmission(payload);
    expect(submission).toBeDefined();
    expect(submission.id).toBeDefined();

    // Verify DB record exists
    const record = await prisma.contactSubmission.findUnique({
      where: { id: submission.id },
    });
    expect(record).not.toBeNull();
    expect(record!.email).toBe(emailAddr);

    // Cleanup
    await prisma.emailDelivery.deleteMany({ where: { referenceId: submission.id } });
    await prisma.contactSubmission.deleteMany({ where: { email: emailAddr } });
    spy.mockRestore();
  });
});

// ============================================================================
// 10. INTERNAL ERRORS DO NOT EXPOSE STACK TRACES
// ============================================================================
describe('Internal Error Handling', () => {
  it('500 response does not contain stack trace', async () => {
    const { healthService } = await import('../modules/health/health.service.js');
    const spy = vi.spyOn(healthService, 'checkReadiness').mockRejectedValueOnce(
      new Error('Unexpected internal failure with sensitive details')
    );

    const res = await request(app)
      .get('/api/v1/ready')
      .set('Accept-Language', 'en');
    // The route catches errors and returns 503 or the error handler catches them
    // Either way, no stack trace should be in the response
    const body = JSON.stringify(res.body);
    expect(body).not.toContain('node_modules');
    expect(body).not.toContain('at ');
    expect(body).not.toContain('sensitive details');

    spy.mockRestore();
  });
});

// ============================================================================
// 11. RATE LIMITING (must run last — permanently exhausts per-IP counters)
// ============================================================================
describe('Rate Limiting', () => {
  it('Returns 429 after exceeding form rate limit', async () => {
    // Send 25 concurrent requests — with FORM_RATE_LIMIT_MAX_REQUESTS=20
    // in tests (set in setup.ts) and ~15 earlier form requests already counted,
    // some of these will definitely hit 429.
    const promises = [];
    for (let i = 0; i < 25; i++) {
      promises.push(
        request(app)
          .post('/api/v1/newsletter')
          .set('Accept-Language', 'en')
          .send({ email: `ratelimit-${i}@example.com`, locale: 'en' })
      );
    }
    const results = await Promise.all(promises);
    const has429 = results.some(r => r.status === 429);
    expect(has429).toBe(true);

    // Verify the 429 response envelope
    const rateLimited = results.find(r => r.status === 429);
    expect(rateLimited!.body.success).toBe(false);
    expect(rateLimited!.body.code).toBe('RATE_LIMITED');
    expect(rateLimited!.body.meta).toHaveProperty('requestId');
  });
});

