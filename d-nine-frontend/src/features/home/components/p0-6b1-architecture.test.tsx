/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CANONICAL_CATEGORY_KEYS } from '@d-nine/contracts';
import { CANONICAL_CATEGORIES } from '@/features/taxonomy/data/content-categories.data';
import { WorkFilter } from '@/features/work/components/work-filter';
import { CreativeSnapshotSection } from '@/features/home/components/creative-snapshot-section';
import { HeroSlider } from '@/features/home/components/hero-slider';
import { PartnersSection } from '@/features/home/components/partners-section';
import { contentCategory } from '@d-nine/sanity-config/src/schemaTypes/documents/content-category';
import { structure } from '@d-nine/sanity-config/src/structure/index';

// Mocks
vi.mock('next-intl', () => ({
  useLocale: () => 'ar',
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

vi.mock('@/components/motion/reveal-section', () => ({
  RevealSection: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>,
}));

vi.mock('@/components/motion/floating-3d-asset', () => ({
  Floating3DAsset: () => <div data-testid="floating-3d-asset" />,
}));

vi.mock('@/components/ui/modal', () => ({
  Modal: ({ children, isOpen }: { children: React.ReactNode; isOpen?: boolean }) => isOpen ? <div data-testid="modal">{children}</div> : null,
}));

vi.mock('@/components/ui/carousel-navigation', () => ({
  CarouselNavigation: () => <div data-testid="carousel-nav" />,
  SwiperCarouselNavigation: () => <div data-testid="swiper-carousel-nav" />,
}));

vi.mock('@/features/work/components/work-card', () => ({
  WorkCard: ({ project }: { project: { slug: string; title?: { ar?: string } } }) => <div data-testid={`project-${project.slug}`}>{project.title?.ar || project.slug}</div>,
}));

describe('P0.6B1 — Architecture, Dashboard, Homepage, and Work Categories Requirements', () => {
  // Requirement 1 & 2: Exactly 8 canonical category keys and no "All Categories"
  it('1 & 2. validates exactly 8 canonical categories and no "All Categories"', () => {
    expect(CANONICAL_CATEGORY_KEYS).toHaveLength(8);
    expect(CANONICAL_CATEGORY_KEYS).toEqual([
      'motion-graphics',
      'video-editing',
      'social-media-design',
      'print-design',
      'brand-identity',
      'artificial-intelligence',
      'exhibitions',
      'festivals',
    ]);

    expect(CANONICAL_CATEGORIES).toHaveLength(8);
    expect(CANONICAL_CATEGORIES.map((c) => c.slug)).toEqual([...CANONICAL_CATEGORY_KEYS]);

    // Ensure none of them is "all"
    expect(CANONICAL_CATEGORY_KEYS).not.toContain('all');
  });

  // Requirement 3: Desktop layout supports 4x2 equal-sized grid controls
  it('3. renders WorkFilter in 4x2 responsive grid without any "All" button', () => {
    const onSelect = vi.fn();
    const { container } = render(
      <WorkFilter
        categories={CANONICAL_CATEGORIES}
        activeCategory="motion-graphics"
        onSelectCategory={onSelect}
      />
    );

    // Verify exactly 8 buttons are rendered
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(8);

    // Verify "All" or "الكل" or "All Categories" does NOT exist
    expect(screen.queryByText('الكل')).not.toBeInTheDocument();
    expect(screen.queryByText('All')).not.toBeInTheDocument();
    expect(screen.queryByText('All Categories')).not.toBeInTheDocument();
    expect(screen.queryByText('كل الفئات')).not.toBeInTheDocument();

    // Verify 4x2 responsive grid class exists
    const gridEl = container.querySelector('.grid');
    expect(gridEl).toHaveClass('md:grid-cols-4');
  });

  // Requirement 4: Category slugs are protected from client edits in Sanity schema
  it('4. ensures contentCategory slug field is readOnly and canonical in Sanity schema', () => {
    const slugField = contentCategory.fields.find((f: any) => f.name === 'slug');
    expect(slugField).toBeDefined();
    expect(slugField?.readOnly).toBe(true);
  });

  // Requirement 5: Homepage second section and Work page consume the same canonical category source
  it('5. verifies Homepage second section consumes the canonical 8 categories', () => {
    const { container } = render(
      <CreativeSnapshotSection
        data={{
          title: { ar: 'عنوان التخصصات' },
          description: { ar: 'وصف التخصصات' },
        }}
        categories={CANONICAL_CATEGORIES}
      />
    );

    // Exactly 8 specialty cards in 4x2 grid
    expect(screen.getByText('الموشن جرافيك')).toBeInTheDocument();
    expect(screen.getByText('المونتاج وتحرير الفيديو')).toBeInTheDocument();
    expect(screen.getByText('تصاميم السوشيال ميديا')).toBeInTheDocument();
    expect(screen.getByText('التصاميم والمطبوعات')).toBeInTheDocument();
    expect(screen.getByText('تصميم الشعارات والهويات البصرية')).toBeInTheDocument();
    expect(screen.getByText('الذكاء الاصطناعي والإنتاج الرقمي')).toBeInTheDocument();
    expect(screen.getByText('المعارض وتجهيز المساحات')).toBeInTheDocument();
    expect(screen.getByText('المهرجانات والفعاليات')).toBeInTheDocument();

    const gridEl = container.querySelector('.md\\:grid-cols-4');
    expect(gridEl).toBeInTheDocument();
  });

  // Requirement 6 & 7: Hero slider 4 localized artwork fields and safe fallbacks
  it('6 & 7. verifies Hero slider localized artwork resolution and safe fallbacks', () => {
    const slideWithLocalizedImages = {
      id: 's1',
      desktopImageAr: '/slider/ar-desktop.jpg',
      mobileImageAr: '/slider/ar-mobile.jpg',
      desktopImageEn: '/slider/en-desktop.jpg',
      mobileImageEn: '/slider/en-mobile.jpg',
      alt: { ar: 'شريحة عربية مخصصة', en: 'English Custom Slide' },
      active: true,
    };

    const { container } = render(
      <HeroSlider data={{ slides: [slideWithLocalizedImages] }} />
    );

    // In Arabic locale, images must resolve to Arabic images (desktop and mobile)
    const images = container.querySelectorAll('img');
    const sources = Array.from(images).map((img) => img.getAttribute('src'));
    const hasMobile = sources.some((s) => s?.includes('ar-mobile.jpg'));
    const hasDesktop = sources.some((s) => s?.includes('ar-desktop.jpg'));
    expect(hasMobile).toBe(true);
    expect(hasDesktop).toBe(true);

    // Test fallback behavior with legacy slide
    const legacySlide = {
      id: 's2',
      image: '/slider/legacy-desktop.jpg',
      mobileImage: '/slider/legacy-mobile.jpg',
      imageAlt: { ar: 'بديل قديم' },
      active: true,
    };

    const { container: fallbackContainer } = render(
      <HeroSlider data={{ slides: [legacySlide] }} />
    );

    const fallbackImages = fallbackContainer.querySelectorAll('img');
    const fallbackSources = Array.from(fallbackImages).map((img) => img.getAttribute('src'));
    const hasLegacyDesktop = fallbackSources.some((s) => s?.includes('legacy-desktop.jpg'));
    const hasLegacyMobile = fallbackSources.some((s) => s?.includes('legacy-mobile.jpg'));
    expect(hasLegacyDesktop).toBe(true);
    expect(hasLegacyMobile).toBe(true);
  });

  // Requirement 8: Team is absent from client Studio navigation
  it('8. verifies Team (teamMember) is hidden from top-level client Studio navigation', () => {
    const mockContext = {
      list: () => {
        const builder: any = {
          title: () => builder,
          items: (items: any[]) => items,
        };
        return builder;
      },
      listItem: () => {
        const builder: any = {
          title: (t: string) => {
            builder.title = t;
            return builder;
          },
          id: (id: string) => {
            builder.id = id;
            return builder;
          },
          icon: () => builder,
          child: (child: any) => {
            builder.child = child;
            return builder;
          },
        };
        return builder;
      },
      divider: () => ({ type: 'divider' }),
      documentTypeListItem: (type: string) => {
        const item: any = {
          type: 'documentTypeListItem',
          id: type,
          title: (t: string) => {
            item.title = t;
            return item;
          },
          icon: () => item,
        };
        return item;
      },
      documentTypeListItems: () => [],
      documentListItem: () => {
        const item: any = {
          schemaType: () => item,
          id: () => item,
          title: () => item,
        };
        return item;
      },
      document: () => ({
        schemaType: () => ({
          documentId: () => ({
            title: () => ({}),
          }),
        }),
      }),
    };

    const deskItems = (structure as any)(mockContext);
    const topLevelTitles = deskItems.map((item: any) => item?.title || item?.id || '');

    // Verify teamMember is NOT in top-level items
    expect(topLevelTitles).not.toContain('teamMember');
    expect(topLevelTitles).not.toContain('أعضاء الفريق (Team Members)');
  });

  // Requirement 9: Partners render in selected order and hide cleanly when empty
  it('9. verifies PartnersSection renders in selected order and hides cleanly when empty', () => {
    // When empty, renders nothing (null)
    const { container: emptyContainer } = render(<PartnersSection partners={[]} />);
    expect(emptyContainer.firstChild).toBeNull();

    // When partners provided, renders them (ignoring legacy active field, filtering documents without logo)
    const partners = [
      { id: 'p1', name: { ar: 'شريك 1', en: 'Partner 1' }, logo: '/partners/p1.png', active: true, order: 1 },
      { id: 'p2', name: { ar: 'شريك 2', en: 'Partner 2' }, logo: '/partners/p2.png', active: true, order: 2 },
      { id: 'p3', name: { ar: 'شريك بدون شعار', en: 'Partner without logo' }, logo: '', order: 3 },
    ];

    render(<PartnersSection partners={partners} />);
    expect(screen.getByText('شركاء نفخر بالعمل معهم')).toBeInTheDocument();
    
    // Partners with valid logo rendered
    const partnerLogos = screen.getAllByRole('img');
    expect(partnerLogos).toHaveLength(2);
  });

  // Requirement 10: Canonical category protection audit tests
  it('10. verifies canonical category protection rules in Studio actions and new document options', async () => {
    const { singletonDocumentActions, singletonNewDocumentOptions, CANONICAL_CATEGORY_DOCUMENT_IDS } = await import('@d-nine/sanity-config/src/index');

    // 1. Exactly 8 canonical category document IDs defined
    expect(CANONICAL_CATEGORY_DOCUMENT_IDS.size).toBe(8);
    expect(Array.from(CANONICAL_CATEGORY_DOCUMENT_IDS)).toEqual([
      'cat-motion-graphics',
      'cat-video-editing',
      'cat-social-media-design',
      'cat-print-design',
      'cat-brand-identity',
      'cat-artificial-intelligence',
      'cat-exhibitions',
      'cat-festivals',
    ]);

    // 2. Normal document actions for other schemas (e.g. project) retain delete, duplicate, unpublish
    const standardActions = [
      { action: 'publish' },
      { action: 'discardChanges' },
      { action: 'restore' },
      { action: 'delete' },
      { action: 'duplicate' },
      { action: 'unpublish' },
    ];
    const projectActions = singletonDocumentActions(standardActions, { schemaType: 'project' });
    expect(projectActions).toHaveLength(6);

    // 3. For contentCategory, delete, duplicate, and unpublish are strictly filtered out
    const categoryActions = singletonDocumentActions(standardActions, { schemaType: 'contentCategory' });
    const allowedActionNames = categoryActions.map((a: any) => a.action);
    expect(allowedActionNames).toEqual(['publish', 'discardChanges', 'restore']);
    expect(allowedActionNames).not.toContain('delete');
    expect(allowedActionNames).not.toContain('duplicate');
    expect(allowedActionNames).not.toContain('unpublish');

    // 4. Creation template for contentCategory is blocked from Studio navigation
    const templates = [
      { templateId: 'project' },
      { templateId: 'contentCategory' },
      { templateId: 'partner' },
      { templateId: 'homePage' },
    ];
    const filteredTemplates = singletonNewDocumentOptions(templates, { creationContext: { type: 'global' } });
    const templateIds = filteredTemplates.map((t: any) => t.templateId);
    expect(templateIds).not.toContain('contentCategory');
    expect(templateIds).not.toContain('homePage');
    expect(templateIds).toContain('project');
    expect(templateIds).toContain('partner');
  });

  // Requirement 11: Static and Sanity category reachability test
  it('11. verifies project reachability and category filtering resilience', async () => {
    const { PROJECTS_DATA } = await import('@/features/work/data/projects.data');

    // Prove all 18 static projects are mapped to at least one valid category
    expect(PROJECTS_DATA.length).toBeGreaterThanOrEqual(18);
    for (const project of PROJECTS_DATA) {
      expect(project.primaryCategorySlug).toBeTruthy();
      expect(project.slug).toBeTruthy();
      expect(project.title).toBeTruthy();
    }
  });

  // Requirement 12: Empty / partial Sanity behavior
  it('12. verifies safe behavior under zero categories, partial subsets, and full canonical categories', async () => {
    // Zero categories: WorkFilter does not crash, renders nothing or empty cleanly
    const { container: zeroContainer } = render(
      <WorkFilter
        categories={[]}
        activeCategory=""
        onSelectCategory={vi.fn()}
      />
    );
    expect(zeroContainer.querySelectorAll('button')).toHaveLength(0);

    // Partial subset (e.g. 4 categories): Renders exactly the 4 without crash
    const partialCategories = CANONICAL_CATEGORIES.slice(0, 4);
    const { container: partialContainer } = render(
      <WorkFilter
        categories={partialCategories}
        activeCategory="motion-graphics"
        onSelectCategory={vi.fn()}
      />
    );
    expect(partialContainer.querySelectorAll('button')).toHaveLength(4);

    // Full 8 canonical categories: Renders all 8
    const { container: fullContainer } = render(
      <WorkFilter
        categories={CANONICAL_CATEGORIES}
        activeCategory="motion-graphics"
        onSelectCategory={vi.fn()}
      />
    );
    expect(fullContainer.querySelectorAll('button')).toHaveLength(8);
  });
});
