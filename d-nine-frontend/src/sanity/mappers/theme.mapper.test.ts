import { describe, it, expect } from 'vitest';
import {
  isValidHexColor,
  sanitizeColor,
  sanitizePalette,
  mapThemeSettings,
  generateThemeCss,
} from './theme.mapper';
import {
  DEFAULT_LIGHT_THEME_PALETTE,
  DEFAULT_DARK_THEME_PALETTE,
} from '@d-nine/contracts';

describe('Theme Mapper & Security Sanitizer', () => {
  describe('isValidHexColor', () => {
    it('accepts valid 6-digit hex color strings', () => {
      expect(isValidHexColor('#FFFFFF')).toBe(true);
      expect(isValidHexColor('#000000')).toBe(true);
      expect(isValidHexColor('#6D2878')).toBe(true);
      expect(isValidHexColor('#16b5c5')).toBe(true);
      expect(isValidHexColor('  #ABCDEF  ')).toBe(true);
    });

    it('rejects malicious or invalid color strings', () => {
      expect(isValidHexColor('')).toBe(false);
      expect(isValidHexColor('#FFF')).toBe(false); // 3-digit shorthand rejected
      expect(isValidHexColor('#12345678')).toBe(false); // 8-digit alpha rejected
      expect(isValidHexColor('red')).toBe(false); // named color rejected
      expect(isValidHexColor('rgb(0,0,0)')).toBe(false); // rgb rejected
      expect(isValidHexColor('rgba(0,0,0,0.5)')).toBe(false); // rgba rejected
      expect(isValidHexColor('var(--my-color)')).toBe(false); // CSS variable rejected
      expect(isValidHexColor('url(https://evil.com/bg.png)')).toBe(false); // url rejected
      expect(isValidHexColor('javascript:alert(1)')).toBe(false); // JS code rejected
      expect(isValidHexColor('#6D2878; body { display: none; }')).toBe(false); // CSS injection rejected
      expect(isValidHexColor('#6D2878}')).toBe(false); // CSS delimiter rejected
      expect(isValidHexColor(null)).toBe(false);
      expect(isValidHexColor(undefined)).toBe(false);
      expect(isValidHexColor(123456)).toBe(false);
      expect(isValidHexColor({})).toBe(false);
    });
  });

  describe('sanitizeColor', () => {
    it('returns uppercase hex when value is valid', () => {
      expect(sanitizeColor('#abcdef', '#000000')).toBe('#ABCDEF');
      expect(sanitizeColor('#6D2878', '#000000')).toBe('#6D2878');
    });

    it('returns fallback color when value is invalid, empty, or malicious', () => {
      expect(sanitizeColor('malicious; color: red', '#6D2878')).toBe('#6D2878');
      expect(sanitizeColor('javascript:alert(1)', '#6D2878')).toBe('#6D2878');
      expect(sanitizeColor(undefined, '#16B5C5')).toBe('#16B5C5');
      expect(sanitizeColor('', '#16B5C5')).toBe('#16B5C5');
      expect(sanitizeColor('#123', '#16B5C5')).toBe('#16B5C5');
    });
  });

  describe('sanitizePalette', () => {
    it('applies valid hex values while preserving default fallbacks for missing ones', () => {
      const custom = {
        primary: '#FF0055',
        pageBackground: '#EFEFEF',
      };
      const result = sanitizePalette(custom, DEFAULT_LIGHT_THEME_PALETTE);

      expect(result.primary).toBe('#FF0055');
      expect(result.pageBackground).toBe('#EFEFEF');
      // Untouched fields must strictly match DEFAULT_LIGHT_THEME_PALETTE
      expect(result.secondary).toBe(DEFAULT_LIGHT_THEME_PALETTE.secondary);
      expect(result.surfaceBackground).toBe(DEFAULT_LIGHT_THEME_PALETTE.surfaceBackground);
      expect(result.cardBackground).toBe(DEFAULT_LIGHT_THEME_PALETTE.cardBackground);
      expect(result.headingColor).toBe(DEFAULT_LIGHT_THEME_PALETTE.headingColor);
      expect(result.bodyTextColor).toBe(DEFAULT_LIGHT_THEME_PALETTE.bodyTextColor);
      expect(result.borderColor).toBe(DEFAULT_LIGHT_THEME_PALETTE.borderColor);
      expect(result.primaryButtonBackground).toBe(DEFAULT_LIGHT_THEME_PALETTE.primaryButtonBackground);
      expect(result.primaryButtonText).toBe(DEFAULT_LIGHT_THEME_PALETTE.primaryButtonText);
    });

    it('safely discards malicious values and preserves fallbacks', () => {
      const malicious = {
        primary: 'url(https://attacker.com/cookie)',
        accent: 'expression(alert(1))',
        pageBackground: '#000; } body { display: none }',
      };
      const result = sanitizePalette(malicious, DEFAULT_DARK_THEME_PALETTE);

      expect(result.primary).toBe(DEFAULT_DARK_THEME_PALETTE.primary);
      expect(result.accent).toBe(DEFAULT_DARK_THEME_PALETTE.accent);
      expect(result.pageBackground).toBe(DEFAULT_DARK_THEME_PALETTE.pageBackground);
    });
  });

  describe('mapThemeSettings', () => {
    it('maps both lightMode and darkMode independently', () => {
      const rawData = {
        lightMode: {
          primary: '#112233',
          pageBackground: '#FFFFFF',
        },
        darkMode: {
          primary: '#445566',
          pageBackground: '#000000',
        },
      };

      const resolved = mapThemeSettings(rawData);

      expect(resolved.light.primary).toBe('#112233');
      expect(resolved.light.pageBackground).toBe('#FFFFFF');
      expect(resolved.dark.primary).toBe('#445566');
      expect(resolved.dark.pageBackground).toBe('#000000');

      // Separate modes do not bleed into each other
      expect(resolved.light.secondary).toBe(DEFAULT_LIGHT_THEME_PALETTE.secondary);
      expect(resolved.dark.secondary).toBe(DEFAULT_DARK_THEME_PALETTE.secondary);
    });

    it('returns exact defaults if data is null, undefined, or empty', () => {
      const resolvedFromNull = mapThemeSettings(null);
      expect(resolvedFromNull.light).toEqual(DEFAULT_LIGHT_THEME_PALETTE);
      expect(resolvedFromNull.dark).toEqual(DEFAULT_DARK_THEME_PALETTE);

      const resolvedFromEmpty = mapThemeSettings({});
      expect(resolvedFromEmpty.light).toEqual(DEFAULT_LIGHT_THEME_PALETTE);
      expect(resolvedFromEmpty.dark).toEqual(DEFAULT_DARK_THEME_PALETTE);
    });
  });

  describe('generateThemeCss', () => {
    it('generates well-formed CSS for :root and .dark with all required variables', () => {
      const resolved = mapThemeSettings({
        lightMode: { primary: '#123456' },
        darkMode: { primary: '#654321' },
      });

      const css = generateThemeCss(resolved);

      expect(css).toContain(':root {');
      expect(css).toContain('.dark {');
      expect(css).toContain('--theme-primary: #123456;');
      expect(css).toContain('--theme-primary: #654321;');
      expect(css).toContain('--theme-page:');
      expect(css).toContain('--theme-surface:');
      expect(css).toContain('--theme-card:');
      expect(css).toContain('--theme-heading:');
      expect(css).toContain('--theme-text:');
      expect(css).toContain('--theme-muted:');
      expect(css).toContain('--theme-border:');
      expect(css).toContain('--theme-button-primary-bg:');
      expect(css).toContain('--theme-button-primary-text:');
      expect(css).toContain('--theme-button-secondary-bg:');
      expect(css).toContain('--theme-button-secondary-text:');

      // Verify no unsanitized characters
      expect(css).not.toContain('undefined');
      expect(css).not.toContain('null');
      expect(css).not.toContain('<script');
      expect(css).not.toContain('url(');
    });
  });
});
