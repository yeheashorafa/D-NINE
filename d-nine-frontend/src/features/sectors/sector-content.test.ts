import { describe, expect, it } from 'vitest';
import { ABOUT_COPY, DEFAULT_SECTORS, PORTFOLIO_GROUPS, WHY_DNINE } from './sector-content';

describe('client-approved content structure', () => {
  it('exposes exactly two main sectors with bilingual content', () => {
    expect(DEFAULT_SECTORS).toHaveLength(2);
    for (const sector of DEFAULT_SECTORS) {
      expect(sector.title.ar).toBeTruthy();
      expect(sector.title.en).toBeTruthy();
      expect(sector.introduction.ar).toBeTruthy();
      expect(sector.introduction.en).toBeTruthy();
      expect(sector.serviceGroups.flatMap((group) => group.items).length).toBeGreaterThan(0);
    }
  });

  it('keeps packages only in media production and marketing', () => {
    expect(DEFAULT_SECTORS[0].packages).toHaveLength(0);
    expect(DEFAULT_SECTORS[1].packages.map((item) => item.title.ar)).toEqual(['باقة حضور D9', 'باقة نمو D9']);
  });

  it('maps portfolio into four approved groups while retaining legacy migration aliases', () => {
    expect(PORTFOLIO_GROUPS).toHaveLength(4);
    expect(PORTFOLIO_GROUPS.map((group) => group.slug)).toEqual([
      'events', 'identity-design', 'media-production', 'content-marketing',
    ]);
    const aliases = PORTFOLIO_GROUPS.flatMap((group) => group.categorySlugs);
    for (const legacySlug of [
      'motion-graphics', 'video-editing', 'social-media-design', 'print-design',
      'brand-identity', 'artificial-intelligence', 'exhibitions', 'festivals',
    ]) expect(aliases).toContain(legacySlug);
  });

  it('contains the approved Why D-NINE and About content', () => {
    expect(WHY_DNINE).toHaveLength(4);
    expect(ABOUT_COPY.advantages).toHaveLength(6);
  });
});
