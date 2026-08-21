import { ContactSubmissionPayload } from '@d-nine/contracts';

export function createContactNotificationText(payload: ContactSubmissionPayload): string {
  return `
New Contact Request
-------------------
Name: ${payload.fullName}
Email: ${payload.email}
Phone: ${payload.phone || 'Not provided'}
Service: ${payload.serviceSlug}
Language: ${payload.locale}
Source Page: ${payload.sourcePage || 'Unknown'}

Message:
${payload.message}
  `.trim();
}

export function createContactNotificationHtml(payload: ContactSubmissionPayload): string {
  // Very basic escaping for HTML
  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  return `
    <h2>New Contact Request</h2>
    <table border="1" cellpadding="5" cellspacing="0">
      <tr><th>Name</th><td>${escapeHtml(payload.fullName)}</td></tr>
      <tr><th>Email</th><td>${escapeHtml(payload.email)}</td></tr>
      <tr><th>Phone</th><td>${escapeHtml(payload.phone || 'Not provided')}</td></tr>
      <tr><th>Service</th><td>${escapeHtml(payload.serviceSlug)}</td></tr>
      <tr><th>Language</th><td>${escapeHtml(payload.locale)}</td></tr>
      <tr><th>Source Page</th><td>${escapeHtml(payload.sourcePage || 'Unknown')}</td></tr>
    </table>
    <h3>Message</h3>
    <p>${escapeHtml(payload.message).replace(/\n/g, '<br>')}</p>
  `;
}
