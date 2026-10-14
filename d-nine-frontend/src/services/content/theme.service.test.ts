import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getThemeSettings } from './theme.service';
import {
  DEFAULT_LIGHT_THEME_PALETTE,
  DEFAULT_DARK_THEME_PALETTE,
} from '@d-nine/contracts';

vi.mock('@/sanity/env', () => ({
  contentSource: 'static',
  assertSanityConfig: vi.fn(),
}));

vi.mock('@/sanity/client', () => ({
  sanityFetch: vi.fn(),
}));

describe('Theme Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns default palette in static mode without calling sanity', async () => {
    const theme = await getThemeSettings();
    expect(theme.light).toEqual(DEFAULT_LIGHT_THEME_PALETTE);
    expect(theme.dark).toEqual(DEFAULT_DARK_THEME_PALETTE);
  });
});
