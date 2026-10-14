import {
  DEFAULT_LIGHT_THEME_PALETTE,
  DEFAULT_DARK_THEME_PALETTE,
  type ResolvedThemeSettings,
} from '@d-nine/contracts';
import { contentSource, assertSanityConfig } from '@/sanity/env';
import { sanityFetch } from '@/sanity/client';
import { themeSettingsQuery } from '@/sanity/queries/settings.queries';
import { mapThemeSettings } from '@/sanity/mappers/theme.mapper';
import type { SanityThemeSettingsDoc } from '@/sanity/types';

export async function getThemeSettings(
  options: { stega?: boolean } = {}
): Promise<ResolvedThemeSettings> {
  if (contentSource === 'sanity') {
    try {
      assertSanityConfig();
      const data = await sanityFetch<SanityThemeSettingsDoc | null>({
        query: themeSettingsQuery,
        tags: ['themeSettings', 'theme-settings'],
        stega: options.stega,
      });

      if (data) {
        return mapThemeSettings(data);
      }
    } catch {
      // In case of network / config error, safely fall back to default palette
      return {
        light: { ...DEFAULT_LIGHT_THEME_PALETTE },
        dark: { ...DEFAULT_DARK_THEME_PALETTE },
      };
    }
  }

  // Fallback to static defaults
  return {
    light: { ...DEFAULT_LIGHT_THEME_PALETTE },
    dark: { ...DEFAULT_DARK_THEME_PALETTE },
  };
}
