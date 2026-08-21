import { NewsletterSubscriptionPayload } from '@d-nine/contracts';

export function createNewsletterNotificationText(payload: NewsletterSubscriptionPayload): string {
  return `
New Newsletter Subscription
---------------------------
Email: ${payload.email}
Language: ${payload.locale}
Source Page: ${payload.sourcePage || 'Unknown'}
  `.trim();
}

export function createNewsletterNotificationHtml(payload: NewsletterSubscriptionPayload): string {
  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  return `
    <h2>New Newsletter Subscription</h2>
    <table border="1" cellpadding="5" cellspacing="0">
      <tr><th>Email</th><td>${escapeHtml(payload.email)}</td></tr>
      <tr><th>Language</th><td>${escapeHtml(payload.locale)}</td></tr>
      <tr><th>Source Page</th><td>${escapeHtml(payload.sourcePage || 'Unknown')}</td></tr>
    </table>
  `;
}
