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
Received At: ${new Date().toISOString()}

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
    <div lang="${payload.locale === 'ar' ? 'ar' : 'en'}" dir="${payload.locale === 'ar' ? 'rtl' : 'ltr'}" style="max-width:540px;margin:auto;padding:24px;background:#f6f4f8;font:16px/1.6 Arial,sans-serif;color:#171729">
    <div style="background:#562164;color:white;padding:18px;border-radius:12px"><b>D-NINE</b><h2 style="margin:4px 0">${payload.locale === 'ar' ? 'طلب تواصل جديد' : 'New contact request'}</h2></div>
    <div style="background:white;padding:20px">
    <b>${escapeHtml(payload.fullName)}</b><br>
    ${payload.locale === 'ar' ? 'الهاتف' : 'Phone'}: <span dir="ltr">${escapeHtml(payload.phone || '—')}</span><br>
    ${payload.locale === 'ar' ? 'البريد' : 'Email'}: <span dir="ltr">${escapeHtml(payload.email)}</span><br>
    ${payload.locale === 'ar' ? 'الخدمة' : 'Service'}: ${escapeHtml(payload.serviceSlug)}
    <hr>
    <h3>${payload.locale === 'ar' ? 'رسالة العميل' : 'Message'}</h3>
    <p>${escapeHtml(payload.message).replace(/\n/g, '<br>')}</p>
    <a style="display:inline-block;padding:10px 20px;background:#562164;color:white;border-radius:8px" href="mailto:${escapeHtml(encodeURIComponent(payload.email).replace('%40', '@'))}">${payload.locale === 'ar' ? 'رد على العميل' : 'Reply to customer'}</a></div></div>
  `;
}
