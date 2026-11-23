import { Card, Heading, Stack, Text } from '@sanity/ui';

export function InboundMessagesPanel() {
  const inboxUrl = process.env.SANITY_STUDIO_SUPABASE_INBOX_URL;

  return (
    <Card padding={5} sizing="border" height="fill">
      <Stack gap={5} style={{ maxWidth: 720 }}>
        <Heading size={2}>الرسائل الواردة</Heading>
        <Text size={1} muted>
          تُحفظ رسائل التواصل وطلبات المكالمات والاشتراكات في قاعدة Supabase حتى لا تضيع عند تعطل البريد.
          افتح صندوق الرسائل لإدارة الحالة: جديد، قيد المتابعة، مكتمل أو مزعج.
        </Text>
        {inboxUrl ? (
          <a
            href={inboxUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              width: 'fit-content',
              padding: '12px 18px',
              borderRadius: 8,
              background: '#6f2a82',
              color: '#fff',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            فتح صندوق الرسائل في Supabase
          </a>
        ) : (
          <Card padding={4} radius={2} tone="caution">
            <Text size={1}>
              أضف المتغير SANITY_STUDIO_SUPABASE_INBOX_URL في بيئة Studio ليظهر رابط صندوق الرسائل هنا.
            </Text>
          </Card>
        )}
      </Stack>
    </Card>
  );
}
