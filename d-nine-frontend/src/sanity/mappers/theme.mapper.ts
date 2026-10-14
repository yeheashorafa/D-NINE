import {
  DEFAULT_LIGHT_THEME_PALETTE,
  DEFAULT_DARK_THEME_PALETTE,
  type ResolvedThemePalette,
  type ResolvedThemeSettings,
  type ThemePalette,
} from '@d-nine/contracts';
import type { SanityThemeSettingsDoc } from '@/sanity/types';

/**
 * Strict regex for 6-character hexadecimal color codes: #RRGGBB
 * Strictly rejects:
 * - url()
 * - var()
 * - JavaScript execution (e.g. javascript:, eval, alert)
 * - CSS syntax injection (e.g. ;, {, }, :, @, expression)
 * - Multi-line strings, quotes, or trailing payload
 */
export const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

/**
 * Validates whether a value is a strictly safe #RRGGBB hex code.
 */
export function isValidHexColor(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  return HEX_COLOR_REGEX.test(trimmed);
}

/**
 * Sanitizes a single color value:
 * If valid hex, returns formatted uppercase hex code.
 * If invalid, empty, or malicious, safely falls back to defaultColor.
 */
export function sanitizeColor(value: unknown, defaultColor: string): string {
  if (isValidHexColor(value)) {
    return value.trim().toUpperCase();
  }
  return defaultColor.toUpperCase();
}

/**
 * Maps and sanitizes an entire theme palette (Light or Dark).
 */
export function sanitizePalette(
  rawPalette: Partial<ThemePalette> | null | undefined,
  defaultPalette: ResolvedThemePalette
): ResolvedThemePalette {
  const raw = rawPalette || {};
  return {
    primary: sanitizeColor(raw.primary, defaultPalette.primary),
    secondary: sanitizeColor(raw.secondary, defaultPalette.secondary),
    accent: sanitizeColor(raw.accent, defaultPalette.accent),
    pageBackground: sanitizeColor(raw.pageBackground, defaultPalette.pageBackground),
    surfaceBackground: sanitizeColor(raw.surfaceBackground, defaultPalette.surfaceBackground),
    cardBackground: sanitizeColor(raw.cardBackground, defaultPalette.cardBackground),
    headingColor: sanitizeColor(raw.headingColor, defaultPalette.headingColor),
    bodyTextColor: sanitizeColor(raw.bodyTextColor, defaultPalette.bodyTextColor),
    mutedTextColor: sanitizeColor(raw.mutedTextColor, defaultPalette.mutedTextColor),
    borderColor: sanitizeColor(raw.borderColor, defaultPalette.borderColor),
    primaryButtonBackground: sanitizeColor(
      raw.primaryButtonBackground,
      defaultPalette.primaryButtonBackground
    ),
    primaryButtonText: sanitizeColor(raw.primaryButtonText, defaultPalette.primaryButtonText),
    secondaryButtonBackground: sanitizeColor(
      raw.secondaryButtonBackground,
      defaultPalette.secondaryButtonBackground
    ),
    secondaryButtonText: sanitizeColor(
      raw.secondaryButtonText,
      defaultPalette.secondaryButtonText
    ),
  };
}

/**
 * Maps raw Sanity document into fully resolved and sanitized ThemeSettings.
 */
export function mapThemeSettings(data: unknown): ResolvedThemeSettings {
  const doc = (data || {}) as SanityThemeSettingsDoc;
  return {
    light: sanitizePalette(doc.lightMode, DEFAULT_LIGHT_THEME_PALETTE),
    dark: sanitizePalette(doc.darkMode, DEFAULT_DARK_THEME_PALETTE),
  };
}

/**
 * Generates clean CSS variable definitions for :root (Light) and .dark (Dark).
 * All inputs are strictly checked hex codes, making this completely injection-safe.
 */
export function generateThemeCss(theme: ResolvedThemeSettings): string {
  const { light, dark } = theme;
  return `:root {
  --theme-primary: ${light.primary};
  --theme-secondary: ${light.secondary};
  --theme-accent: ${light.accent};
  --theme-page: ${light.pageBackground};
  --theme-surface: ${light.surfaceBackground};
  --theme-card: ${light.cardBackground};
  --theme-heading: ${light.headingColor};
  --theme-text: ${light.bodyTextColor};
  --theme-muted: ${light.mutedTextColor};
  --theme-border: ${light.borderColor};
  --theme-button-primary-bg: ${light.primaryButtonBackground};
  --theme-button-primary-text: ${light.primaryButtonText};
  --theme-button-secondary-bg: ${light.secondaryButtonBackground};
  --theme-button-secondary-text: ${light.secondaryButtonText};
}

.dark {
  --theme-primary: ${dark.primary};
  --theme-secondary: ${dark.secondary};
  --theme-accent: ${dark.accent};
  --theme-page: ${dark.pageBackground};
  --theme-surface: ${dark.surfaceBackground};
  --theme-card: ${dark.cardBackground};
  --theme-heading: ${dark.headingColor};
  --theme-text: ${dark.bodyTextColor};
  --theme-muted: ${dark.mutedTextColor};
  --theme-border: ${dark.borderColor};
  --theme-button-primary-bg: ${dark.primaryButtonBackground};
  --theme-button-primary-text: ${dark.primaryButtonText};
  --theme-button-secondary-bg: ${dark.secondaryButtonBackground};
  --theme-button-secondary-text: ${dark.secondaryButtonText};
}`;
}
