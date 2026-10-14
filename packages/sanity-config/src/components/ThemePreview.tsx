import React from 'react';
import type { ObjectInputProps } from 'sanity';
import { Card, Stack, Text, Flex, Box, Badge } from '@sanity/ui';

interface PaletteData {
  primary?: string;
  secondary?: string;
  accent?: string;
  pageBackground?: string;
  surfaceBackground?: string;
  cardBackground?: string;
  headingColor?: string;
  bodyTextColor?: string;
  mutedTextColor?: string;
  borderColor?: string;
  primaryButtonBackground?: string;
  primaryButtonText?: string;
  secondaryButtonBackground?: string;
  secondaryButtonText?: string;
}

const HEX_REGEX = /^#[0-9a-fA-F]{6}$/;

function safeHex(val: unknown, fallback: string): string {
  if (typeof val === 'string' && HEX_REGEX.test(val.trim())) {
    return val.trim();
  }
  return fallback;
}

export function ThemePaletteInput(props: ObjectInputProps) {
  const value = (props.value || {}) as PaletteData;
  const isDark = props.schemaType.name.toLowerCase().includes('dark') || Boolean(props.schemaType.title?.includes('الداكن'));

  // Fallbacks depending on whether this palette represents dark or light mode
  const defaultPageBg = isDark ? '#091522' : '#FAFAFC';
  const defaultSurfaceBg = isDark ? '#0F1B2C' : '#FFFFFF';
  const defaultCardBg = isDark ? '#111D30' : '#FFFFFF';
  const defaultBorder = isDark ? '#1E2E4A' : '#E2E8F0';
  const defaultHeading = isDark ? '#F8FAFC' : '#0F172A';
  const defaultBody = isDark ? '#F8FAFC' : '#0F172A';
  const defaultMuted = isDark ? '#94A3B8' : '#64748B';
  const defaultPrimaryBtnBg = '#6D2878';
  const defaultPrimaryBtnText = '#FFFFFF';
  const defaultSecondaryBtnBg = '#16B5C5';
  const defaultSecondaryBtnText = '#091522';
  const defaultAccent = isDark ? '#38D4E3' : '#9C36AD';

  const cardBg = safeHex(value.cardBackground, defaultCardBg);
  const pageBg = safeHex(value.pageBackground, defaultPageBg);
  const surfaceBg = safeHex(value.surfaceBackground, defaultSurfaceBg);
  const borderCol = safeHex(value.borderColor, defaultBorder);
  const headingCol = safeHex(value.headingColor, defaultHeading);
  const bodyCol = safeHex(value.bodyTextColor, defaultBody);
  const mutedCol = safeHex(value.mutedTextColor, defaultMuted);
  const primaryBtnBg = safeHex(value.primaryButtonBackground, defaultPrimaryBtnBg);
  const primaryBtnText = safeHex(value.primaryButtonText, defaultPrimaryBtnText);
  const secondaryBtnBg = safeHex(value.secondaryButtonBackground, defaultSecondaryBtnBg);
  const secondaryBtnText = safeHex(value.secondaryButtonText, defaultSecondaryBtnText);
  const accentCol = safeHex(value.accent, defaultAccent);

  return (
    <Stack space={4}>
      {/* Live Preview Container */}
      <Card
        padding={4}
        radius={3}
        style={{
          backgroundColor: pageBg,
          border: `1px solid ${borderCol}`,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Stack space={3}>
          <Flex justify="space-between" align="center">
            <Text size={1} weight="bold" style={{ color: headingCol }}>
              معاينة حية للهوية البصرية ({isDark ? 'الوضع الداكن' : 'الوضع الفاتح'})
            </Text>
            <Badge tone={isDark ? 'caution' : 'primary'} size={1}>
              {isDark ? 'Dark Mode Preview' : 'Light Mode Preview'}
            </Badge>
          </Flex>

          {/* Section / Surface Preview */}
          <div
            style={{
              backgroundColor: surfaceBg,
              borderRadius: 8,
              padding: '12px 16px',
              border: `1px solid ${borderCol}`,
            }}
          >
            <Flex align="center" justify="space-between" wrap="wrap" gap={2}>
              <span style={{ color: mutedCol, fontSize: 12, fontWeight: 500 }}>
                شريط الأقسام (Header / Section Surface)
              </span>
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: accentCol,
                }}
                title={`لون التمييز (Accent): ${accentCol}`}
              />
            </Flex>
          </div>

          {/* Card Preview */}
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: 12,
              padding: 20,
              border: `1px solid ${borderCol}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <Stack space={3}>
              <h3
                style={{
                  color: headingCol,
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  fontFamily: 'inherit',
                }}
              >
                عنوان البطاقة التوضيحية (Heading Preview)
              </h3>
              <p
                style={{
                  color: bodyCol,
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.6,
                  fontFamily: 'inherit',
                }}
              >
                هذا النص يوضح شكل الخط الأساسي ومظهر الفقرات داخل البطاقة عند تطبيق الألوان المختارة.
              </p>
              <p
                style={{
                  color: mutedCol,
                  margin: 0,
                  fontSize: 12,
                  fontFamily: 'inherit',
                }}
              >
                نص ثانوي توضيحي (Muted metadata description)
              </p>

              {/* Action Buttons Preview */}
              <Flex gap={3} wrap="wrap" style={{ marginTop: 8 }}>
                <div
                  style={{
                    backgroundColor: primaryBtnBg,
                    color: primaryBtnText,
                    padding: '8px 18px',
                    borderRadius: 9999,
                    fontWeight: 600,
                    fontSize: 13,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'default',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  الزر الأساسي (Primary CTA)
                </div>

                <div
                  style={{
                    backgroundColor: secondaryBtnBg,
                    color: secondaryBtnText,
                    padding: '8px 18px',
                    borderRadius: 9999,
                    fontWeight: 600,
                    fontSize: 13,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'default',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  }}
                >
                  الزر الثانوي (Secondary)
                </div>
              </Flex>
            </Stack>
          </div>
        </Stack>
      </Card>

      {/* Render Default Inputs for the Palette Fields */}
      <Box>{props.renderDefault(props)}</Box>
    </Stack>
  );
}
