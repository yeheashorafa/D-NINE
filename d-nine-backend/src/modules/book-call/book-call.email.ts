import { BookCallRequestPayload } from '@d-nine/contracts';

export function createBookCallNotificationText(payload: BookCallRequestPayload): string {
  return `
New Book-a-Call Request
-----------------------
Name: ${payload.fullName}
Email: ${payload.email}
Phone: ${payload.phone || 'Not provided'}
Company: ${payload.companyName || 'Not provided'}
Service: ${payload.serviceSlug}
Preferred Date: ${payload.preferredDate}
Preferred Time: ${payload.preferredTime}
Timezone: ${payload.timezone}
Language: ${payload.locale}
Source Page: ${payload.sourcePage || 'Unknown'}

Notes:
${payload.notes || 'None'}
  `.trim();
}

export function createBookCallNotificationHtml(payload: BookCallRequestPayload): string {
  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  return `
    <h2>New Book-a-Call Request</h2>
    <table border="1" cellpadding="5" cellspacing="0">
      <tr><th>Name</th><td>${escapeHtml(payload.fullName)}</td></tr>
      <tr><th>Email</th><td>${escapeHtml(payload.email)}</td></tr>
      <tr><th>Phone</th><td>${escapeHtml(payload.phone || 'Not provided')}</td></tr>
      <tr><th>Company</th><td>${escapeHtml(payload.companyName || 'Not provided')}</td></tr>
      <tr><th>Service</th><td>${escapeHtml(payload.serviceSlug)}</td></tr>
      <tr><th>Preferred Date</th><td>${escapeHtml(payload.preferredDate)}</td></tr>
      <tr><th>Preferred Time</th><td>${escapeHtml(payload.preferredTime)}</td></tr>
      <tr><th>Timezone</th><td>${escapeHtml(payload.timezone)}</td></tr>
      <tr><th>Language</th><td>${escapeHtml(payload.locale)}</td></tr>
      <tr><th>Source Page</th><td>${escapeHtml(payload.sourcePage || 'Unknown')}</td></tr>
    </table>
    <h3>Notes</h3>
    <p>${escapeHtml(payload.notes || 'None').replace(/\n/g, '<br>')}</p>
  `;
}
