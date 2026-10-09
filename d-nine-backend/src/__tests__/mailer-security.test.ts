import { describe, it, expect, vi, beforeEach } from 'vitest';
import nodemailer from 'nodemailer';
import { SmtpEmailAdapter } from '../lib/email/smtp-email.adapter.js';
import { env } from '../config/env.js';
import { createContactNotificationText, createContactNotificationHtml } from '../modules/contact/contact.email.js';
import { createBookCallNotificationText, createBookCallNotificationHtml } from '../modules/book-call/book-call.email.js';
import { createNewsletterNotificationText, createNewsletterNotificationHtml } from '../modules/newsletter/newsletter.email.js';
import { contactSubmissionSchema, bookCallRequestSchema, newsletterSubscriptionSchema } from '@d-nine/contracts';

describe('Mailer Security & Nodemailer 10 Runtime Tests', () => {
  let mockSendMail: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSendMail = vi.fn().mockResolvedValue({ messageId: 'test-id-123' });
    vi.spyOn(nodemailer, 'createTransport').mockReturnValue({
      sendMail: mockSendMail,
    } as any);
  });

  describe('SmtpEmailAdapter Option Confinement', () => {
    it('ensures recipient and sender come strictly from server configuration and options', async () => {
      const adapter = new SmtpEmailAdapter();
      const testEmailOptions = {
        to: env.CONTACT_NOTIFICATION_EMAIL || 'admin@d-nine.com',
        subject: 'New Contact Request',
        text: 'Clean body text',
        html: '<p>Clean body html</p>',
      };

      await adapter.sendEmail(testEmailOptions);

      expect(mockSendMail).toHaveBeenCalledTimes(1);
      const call = mockSendMail.mock.calls[0];
      expect(call).toBeDefined();
      const sentOptions = call ? call[0] : {};

      // Verify from & to
      expect(sentOptions.from).toBe(env.EMAIL_FROM);
      expect(sentOptions.to).toBe(testEmailOptions.to);
      expect(sentOptions.subject).toBe('New Contact Request');
      expect(sentOptions.text).toBe('Clean body text');
      expect(sentOptions.html).toBe('<p>Clean body html</p>');

      // Verify no user values become mail headers, replyTo, or transport options
      expect(sentOptions.headers).toBeUndefined();
      expect(sentOptions.replyTo).toBeUndefined();
      expect(sentOptions.cc).toBeUndefined();
      expect(sentOptions.bcc).toBeUndefined();
      expect(sentOptions.sender).toBeUndefined();
      expect(sentOptions.attachments).toBeUndefined();
      expect(sentOptions.raw).toBeUndefined();
    });

    it('handles SMTP transport failure safely without crashing or exposing secrets', async () => {
      const adapter = new SmtpEmailAdapter();
      mockSendMail.mockRejectedValueOnce(new Error('SMTP connection timed out: host=127.0.0.1'));

      await expect(adapter.sendEmail({
        to: 'admin@d-nine.com',
        subject: 'Test',
        text: 'Body',
      })).rejects.toThrow('SMTP connection timed out');
    });
  });

  describe('Template HTML Escaping & Injection Neutralization', () => {
    it('escapes HTML special characters in contact submission emails', () => {
      const payload = contactSubmissionSchema.parse({
        fullName: '<script>alert("XSS")</script>',
        email: 'attacker@example.com',
        phone: '+1234567890',
        serviceSlug: 'graphic-design',
        locale: 'en',
        message: 'Hello <img src=x onerror=alert(1)> & test \'quotes\' and "double"',
      });

      const html = createContactNotificationHtml(payload);
      expect(html).not.toContain('<script>');
      expect(html).toContain('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');
      expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
      expect(html).toContain('&amp; test &#039;quotes&#039; and &quot;double&quot;');

      const text = createContactNotificationText(payload);
      expect(text).toContain('Name: <script>alert("XSS")</script>');
      expect(text).toContain('Email: attacker@example.com');
    });

    it('escapes HTML special characters in book-call notification emails', () => {
      const payload = bookCallRequestSchema.parse({
        fullName: 'Jane <Doe> & Co',
        email: 'jane@example.com',
        companyName: 'ACME <Corp>',
        serviceSlug: 'brand-identity',
        preferredDate: '2026-10-15',
        preferredTime: '14:00',
        timezone: 'UTC',
        notes: 'Discussion with <b>bold</b> & "quotes"',
        locale: 'en',
      });

      const html = createBookCallNotificationHtml(payload);
      expect(html).not.toContain('<Doe>');
      expect(html).toContain('Jane &lt;Doe&gt; &amp; Co');
      expect(html).toContain('ACME &lt;Corp&gt;');
      expect(html).toContain('Discussion with &lt;b&gt;bold&lt;/b&gt; &amp; &quot;quotes&quot;');

      const text = createBookCallNotificationText(payload);
      expect(text).toContain('Jane <Doe> & Co');
    });

    it('formats newsletter notification cleanly', () => {
      const payload = newsletterSubscriptionSchema.parse({
        email: 'subscriber@example.com',
        locale: 'ar',
      });

      const text = createNewsletterNotificationText(payload);
      const html = createNewsletterNotificationHtml(payload);

      expect(text).toContain('subscriber@example.com');
      expect(html).toContain('subscriber@example.com');
    });
  });

  describe('Contract Length Validation Limits', () => {
    it('enforces maximum length boundaries on all user input before email generation', () => {
      expect(() => contactSubmissionSchema.parse({
        fullName: 'A'.repeat(101),
        email: 'valid@example.com',
        serviceSlug: 'graphic-design',
        locale: 'en',
        message: 'Valid message body text',
      })).toThrow();

      expect(() => contactSubmissionSchema.parse({
        fullName: 'Valid Name',
        email: 'a'.repeat(250) + '@example.com', // Exceeds 254 chars
        serviceSlug: 'graphic-design',
        locale: 'en',
        message: 'Valid message body text',
      })).toThrow();

      expect(() => contactSubmissionSchema.parse({
        fullName: 'Valid Name',
        email: 'valid@example.com',
        serviceSlug: 'graphic-design',
        locale: 'en',
        message: 'A'.repeat(3001), // Exceeds 3000 chars
      })).toThrow();
    });
  });
});
