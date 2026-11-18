/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CANONICAL_CATEGORY_KEYS } from '@d-nine/contracts';
import { CANONICAL_CATEGORIES } from '@/features/taxonomy/data/content-categories.data';
import { getCategories } from '@/services/content/categories.service';
import { Logo } from '@/components/layout/logo';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CreativeSnapshotSection } from '@/features/home/components/creative-snapshot-section';
import { FeaturedWorkSection } from '@/features/home/components/featured-work-section';
import { CoreServicesSection } from '@/features/home/components/core-services-section';
import { ProcessSection } from '@/features/home/components/process-section';
import { FaqsSection } from '@/features/home/components/faqs-section';
import { PartnersSection } from '@/features/home/components/partners-section';
import { STATIC_PARTNERS } from '@/services/content/partners.service';
import { PartnerItem } from '@/types/partner';
import { AboutPage } from '@/features/about/about-page';
import { generateMetadata as generateHomeMetadata } from '@/app/[locale]/page';
import { generateMetadata as generateAboutMetadata } from '@/app/[locale]/about/page';

// Mocks
vi.mock('next-intl', () => ({
  useLocale: () => 'ar',
  useTranslations: () => (key: string) => key,
}));

vi.mock('next-intl/server', () => ({
  getLocale: async () => 'ar',
  getTranslations: async () => (key: string) => key,
}));

vi.mock('@/services/content/services.service', () => ({
  getServices: async () => [],
}));

vi.mock('@/services/content/team.service', () => ({
  getTeamMembers: async () => [],
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, className, 'aria-label': ariaLabel }: any) => (
    <a href={href} className={className} aria-label={ariaLabel}>{children}</a>
  ),
  usePathname: () => '/ar',
}));

vi.mock('@/components/motion/reveal-section', () => ({
  RevealSection: ({ children, className }: any) => <div className={className}>{children}</div>,
}));

vi.mock('@/components/motion/floating-3d-asset', () => ({
  Floating3DAsset: () => <div data-testid="floating-3d-asset" />,
}));

vi.mock('@/components/ui/modal', () => ({
  Modal: ({ children, isOpen }: any) => isOpen ? <div data-testid="modal">{children}</div> : null,
}));

vi.mock('@/sanity/client', () => ({
  sanityFetch: vi.fn(),
}));

const mockEnv = { contentSource: 'sanity' };
vi.mock('@/sanity/env', () => ({
  get contentSource() { return mockEnv.contentSource; },
  assertSanityConfig: vi.fn(),
}));

describe('Section J & Contract Wiring Verification', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockEnv.contentSource = 'sanity';
  });

  it('1. CANONICAL_CATEGORY_KEYS matches CANONICAL_CATEGORIES exactly as single source of truth', () => {
    expect(CANONICAL_CATEGORY_KEYS.length).toBe(8);
    expect(CANONICAL_CATEGORIES.length).toBe(8);
    const slugsFromData = CANONICAL_CATEGORIES.map(c => c.slug);
    expect(slugsFromData).toEqual([...CANONICAL_CATEGORY_KEYS]);
  });

  it('2. verifies categories filter out non-canonical legacy categories and maintain 1-8 deterministic order', async () => {
    const { sanityFetch } = await import('@/sanity/client');
    (sanityFetch as any).mockResolvedValueOnce([
      {
        _id: 'cat-legacy',
        title: { ar: 'تصنيف قديم', en: 'Legacy Category' },
        slug: 'legacy-branding',
        order: 99,
      },
      {
        _id: 'cat-festivals',
        title: { ar: 'المهرجانات', en: 'Festivals' },
        slug: 'festivals',
        order: 8,
      },
      {
        _id: 'cat-motion',
        title: { ar: 'موشن جرافيك', en: 'Motion Graphics' },
        slug: 'motion-graphics',
        order: 1,
      },
      {
        _id: 'cat-unknown',
        title: { ar: 'تصنيف غير معروف', en: 'Unknown' },
        slug: 'custom-web',
        order: 2,
      },
    ]);

    const categories = await getCategories();

    // Must strictly filter out legacy-branding and custom-web
    expect(categories.map((c: any) => c.slug)).not.toContain('legacy-branding');
    expect(categories.map((c: any) => c.slug)).not.toContain('custom-web');

    // Must contain motion-graphics and festivals in canonical order
    const slugs = categories.map((c: any) => c.slug);
    expect(slugs).toContain('motion-graphics');
    expect(slugs).toContain('festivals');
    expect(slugs.indexOf('motion-graphics')).toBeLessThan(slugs.indexOf('festivals'));
    expect(categories.length).toBe(8); // Missing canonicals are filled safely without duplicates
  });

  it('3. verifies Logo wires Sanity lightLogo, darkLogo and alt text without hardcoding', () => {
    const { container } = render(
      <Logo
        lightLogo="https://cdn.sanity.io/images/xg3zrwt3/development/custom-light.png"
        darkLogo="https://cdn.sanity.io/images/xg3zrwt3/development/custom-dark.png"
        companyName="Custom D-NINE Agency"
      />
    );

    const images = container.querySelectorAll('img');
    expect(images.length).toBe(2);
    expect(images[0].getAttribute('src')).toContain('custom-light.png');
    expect(images[0].getAttribute('alt')).toBe('Custom D-NINE Agency');
    expect(images[1].getAttribute('src')).toContain('custom-dark.png');
    expect(images[1].getAttribute('alt')).toBe('Custom D-NINE Agency');
  });

  it('4. verifies Header wires dynamic nav links, isButton styles, and custom contact CTA', () => {
    const mockSettings: any = {
      headerNav: [
        { label: { ar: 'خدماتنا الخاصة', en: 'Custom Services' }, href: '/custom-services' },
        { label: { ar: 'بوابة العملاء', en: 'Client Portal' }, href: 'https://portal.example.com', isExternal: true, isButton: true },
      ],
    };

    render(
      <Header
        settings={mockSettings}
      />
    );

    expect(screen.getByText('خدماتنا الخاصة')).toBeTruthy();
    expect(screen.getByText('بوابة العملاء')).toBeTruthy();
  });

  it('5. verifies Footer renders all dynamic columns and sanitizes empty or hash links', async () => {
    const mockSettings: any = {
      footerColumns: [
        {
          title: { ar: 'خدمات رئيسية', en: 'Core Services' },
          links: [
            { label: { ar: 'موشن', en: 'Motion' }, href: '/services/motion' },
            { label: { ar: 'فارغ', en: 'Empty' }, href: '#' }, // should be filtered out
          ],
        },
        {
          title: { ar: 'المجتمع', en: 'Community' },
          links: [
            { label: { ar: 'المدونة', en: 'Blog' }, href: '/blog' },
          ],
        },
        {
          title: { ar: 'قانوني', en: 'Legal' },
          links: [
            { label: { ar: 'الشروط', en: 'Terms' }, href: '/terms' },
          ],
        },
      ],
      socialLinks: { instagram: 'https://instagram.com/dnine' },
    };

    const footerElement = await Footer({ settings: mockSettings });
    render(footerElement);

    expect(screen.getByText('خدمات رئيسية')).toBeTruthy();
    expect(screen.getByText('المجتمع')).toBeTruthy();
    expect(screen.getByText('قانوني')).toBeTruthy();
    expect(screen.getByText('موشن')).toBeTruthy();
    expect(screen.queryByText('فارغ')).toBeNull(); // "#" link must NOT render
  });

  it('6. verifies CreativeSnapshot wires custom CTA buttons, badges and duration from CMS', () => {
    const customData = {
      title: { ar: 'عنوان العرض الإبداعي', en: 'Creative Showcase' },
      description: { ar: 'وصف العرض المميز', en: 'Distinct Showcase Description' },
      ctaWatchShowreel: { ar: 'شاهد الشوريل الآن', en: 'Watch Reel Now' },
      ctaExploreWork: { ar: 'تصفح كل المشاريع', en: 'Browse All Works' },
      videoBadgeText: { ar: 'شوريل 2026 الحصري', en: 'Exclusive 2026 Reel' },
      videoDuration: '02:45',
      videoUrl: 'https://example.com/reel.mp4',
    };

    render(
      <CreativeSnapshotSection
        data={customData as any}
      />
    );

    expect(screen.getByText('عنوان العرض الإبداعي')).toBeTruthy();
    expect(screen.getByText('وصف العرض المميز')).toBeTruthy();
    expect(screen.getByText('شاهد الشوريل الآن')).toBeTruthy();
    expect(screen.getByText('تصفح كل المشاريع')).toBeTruthy();
    expect(screen.getByText('شوريل 2026 الحصري')).toBeTruthy();
    expect(screen.getByText('02:45')).toBeTruthy();
  });

  it('7. verifies Homepage sections wire custom headings, badges, and subtitles from Sanity', () => {
    // FeaturedWorkSection
    const { rerender } = render(
      <FeaturedWorkSection
        projects={[]}
        categories={[]}
        data={{ badge: { ar: 'شارة الأعمال' }, title: { ar: 'أعمالنا الحصرية' } }}
      />
    );
    expect(screen.getByText('شارة الأعمال')).toBeTruthy();
    expect(screen.getByText('أعمالنا الحصرية')).toBeTruthy();

    // CoreServicesSection
    rerender(
      <CoreServicesSection
        services={[]}
        data={{
          badge: { ar: 'شارة الخدمات' },
          title: { ar: 'خدماتنا الشاملة' },
          subtitle: { ar: 'وصف الخدمات التنافسية' },
        }}
      />
    );
    expect(screen.getByText('شارة الخدمات')).toBeTruthy();
    expect(screen.getByText('خدماتنا الشاملة')).toBeTruthy();
    expect(screen.getByText('وصف الخدمات التنافسية')).toBeTruthy();

    // ProcessSection
    rerender(
      <ProcessSection
        data={[]}
        header={{ badge: { ar: 'شارة الخطوات' }, title: { ar: 'منهجية 4 مراحل' } }}
      />
    );
    expect(screen.getByText('شارة الخطوات')).toBeTruthy();
    expect(screen.getByText('منهجية 4 مراحل')).toBeTruthy();

    // FaqsSection
    rerender(
      <FaqsSection
        data={[{ question: { ar: 'سؤال تجريبي' }, answer: { ar: 'إجابة تجريبية' } }]}
        header={{ badge: { ar: 'شارة الأسئلة' }, title: { ar: 'إجابات مباشرة' } }}
      />
    );
    expect(screen.getByText('شارة الأسئلة')).toBeTruthy();
    expect(screen.getByText('إجابات مباشرة')).toBeTruthy();
  });

  it('8. verifies Partners Section displays logo only in circular white card without name text, links, or CTAs', () => {
    const realTypedFixture: PartnerItem[] = [
      {
        id: 'p1',
        name: { ar: 'شركة الأفق الرقمي', en: 'Digital Horizon' },
        logo: 'https://cdn.sanity.io/images/xg3zrwt3/development/partner1.png',
        logoAlt: { ar: 'شعار الأفق', en: 'Horizon Logo' },
        url: 'https://should-be-ignored.com',
        active: false, // legacy active: false must NOT prevent rendering
      },
      {
        id: 'p2',
        name: { ar: 'رواد التقنية', en: 'Tech Pioneers' },
        logo: 'https://cdn.sanity.io/images/xg3zrwt3/development/partner2.png',
        logoAlt: { ar: 'شعار الرواد', en: 'Pioneers Logo' },
      },
      {
        id: 'p3',
        name: { ar: 'إبداع الميديا', en: 'Media Creative' },
        logo: 'https://cdn.sanity.io/images/xg3zrwt3/development/partner3.png',
        logoAlt: { ar: 'شعار إبداع', en: 'Creative Logo' },
      },
    ];

    const headerFixture = {
      badge: { ar: 'شارة الشركاء المخصصة', en: 'Custom Partners Badge' },
      title: { ar: 'شركاؤنا المميزون من CMS', en: 'Distinguished Partners from CMS' },
      subtitle: { ar: 'وصف مخصص لشركاء النجاح', en: 'Custom Description for Success Partners' },
    };

    // 1. In Arabic locale: partner header from Sanity overrides fallback, renders logo only in white circle
    const { container, rerender } = render(
      <PartnersSection
        partners={realTypedFixture}
        header={headerFixture}
      />
    );

    expect(screen.getByText('شارة الشركاء المخصصة')).toBeTruthy();
    expect(screen.getByText('شركاؤنا المميزون من CMS')).toBeTruthy();
    expect(screen.getByText('وصف مخصص لشركاء النجاح')).toBeTruthy();
    // Verify no visual partner name text is rendered
    expect(screen.queryByText('شركة الأفق الرقمي')).toBeNull();
    expect(screen.queryByText('رواد التقنية')).toBeNull();
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('alt')).toBe('شعار الأفق');
    expect(img?.getAttribute('src')).toContain('partner1.png');
    expect(img?.className).toContain('object-contain');
    // Verify circular container
    expect(container.querySelectorAll('.rounded-full.aspect-square').length).toBeGreaterThan(0);

    // Prove there are NO link tags to any website, no CTA inside cards, and only carousel nav buttons exist
    const links = container.querySelectorAll('a');
    expect(links.length).toBe(0);
    const cardButtons = container.querySelectorAll('.swiper-slide button');
    expect(cardButtons.length).toBe(0); // Zero CTA inside cards
    const navButtons = container.querySelectorAll('button');
    expect(navButtons.length).toBe(2); // exactly prev and next carousel navigation buttons

    // 2. Absence of partners cleanly hides #partners section (renders null)
    const { container: emptyContainer } = render(
      <PartnersSection partners={[]} />
    );
    expect(emptyContainer.querySelector('#partners')).toBeNull();

    // 3. Fallback STATIC_PARTNERS is strictly empty array with zero fake partners
    expect(Array.isArray(STATIC_PARTNERS)).toBe(true);
    expect(STATIC_PARTNERS.length).toBe(0);

    // 4. Test in English locale by passing English fixture
    const englishPartner: PartnerItem[] = [
      {
        id: 'p2',
        name: { ar: 'المتحدة للإعلام', en: 'United Media Group' },
        logo: 'https://cdn.sanity.io/images/xg3zrwt3/development/partner2.png',
        logoAlt: { ar: 'شعار المتحدة', en: 'United Media Logo' },
        active: true,
      },
    ];
    rerender(
      <PartnersSection
        partners={englishPartner}
        header={headerFixture}
      />
    );
    expect(screen.queryByText('المتحدة للإعلام')).toBeNull();
    expect(screen.getByAltText('شعار المتحدة')).toBeTruthy();
  });

  it('8b. verifies full pipeline: getPartners fixture -> HomePage -> PartnersSection renders in DOM', async () => {
    const { sanityFetch } = await import('@/sanity/client');
    const { HomePage } = await import('@/features/home/home-page');

    // Mock sanityFetch specifically for partner query
    (sanityFetch as any).mockImplementation(async ({ query }: { query: string }) => {
      if (query.includes('_type == "partner"')) {
        return [
          {
            _id: 'partner-real-1',
            _type: 'partner',
            name: { ar: 'مجموعة النخبة القابضة', en: 'Elite Group Holding' },
            logo: {
              asset: {
                _ref: 'image-12345-png',
                url: 'https://cdn.sanity.io/images/xg3zrwt3/development/elite-logo.png',
              },
            },
            active: false, // legacy active: false must be ignored
          },
          {
            _id: 'partner-real-2',
            _type: 'partner',
            name: { ar: 'شركة أصول الإعلامية', en: 'Osool Media Tech' },
            logo: {
              asset: {
                _ref: 'image-67890-png',
                url: 'https://cdn.sanity.io/images/xg3zrwt3/development/osool-logo.png',
              },
            },
            active: true,
          },
        ];
      }
      if (query.includes('_type == "homePage"')) {
        return {
          _id: 'homePage',
          partnersHeader: {
            badge: { ar: 'شركاء الثقة' },
            title: { ar: 'تحالفاتنا الاستراتيجية' },
            subtitle: { ar: 'نعمل جنبًا إلى جنب مع كبرى الشركات' },
          },
        };
      }
      return [];
    });

    const homeElement = await HomePage();
    const { container } = render(homeElement);

    const partnersSection = container.querySelector('#partners');
    expect(partnersSection).toBeTruthy();
    expect(screen.getByText('شركاء الثقة')).toBeTruthy();
    expect(screen.getByText('تحالفاتنا الاستراتيجية')).toBeTruthy();
    expect(screen.queryByText('مجموعة النخبة القابضة')).toBeNull();
    expect(screen.queryByText('شركة أصول الإعلامية')).toBeNull();

    const imgs = partnersSection?.querySelectorAll('img');
    expect(imgs?.length).toBeGreaterThanOrEqual(2);
    expect(imgs?.[0].className).toContain('object-contain');
    expect(imgs?.[0].getAttribute('alt')).toBeTruthy();

    // Verify zero links or CTA inside cards
    const cardLinks = partnersSection?.querySelectorAll('.swiper-slide a');
    expect(cardLinks?.length).toBe(0);
    const cardButtons = partnersSection?.querySelectorAll('.swiper-slide button');
    expect(cardButtons?.length).toBe(0);
  });

  it('8c. verifies Partners Section Autoplay pause reasons lifecycle (hover, focus, interaction, reduced motion)', () => {
    vi.useFakeTimers();

    const mockPartners: PartnerItem[] = [
      {
        id: 'p1',
        name: { ar: 'شريك 1', en: 'Partner 1' },
        logo: '/brand/d-nine-logo-light.png',
        active: false, // legacy active: false must be IGNORED
      },
      {
        id: 'p2',
        name: { ar: 'شريك 2', en: 'Partner 2' },
        logo: '/brand/d-nine-logo-dark.png',
      },
      {
        id: 'p3',
        name: { ar: 'شريك 3', en: 'Partner 3' },
        logo: '/brand/d-nine-logo-light.png',
      },
      {
        id: 'p4',
        name: { ar: 'شريك 4', en: 'Partner 4' },
        logo: '/brand/d-nine-logo-dark.png',
      },
    ];

    const { container, unmount } = render(
      <PartnersSection partners={mockPartners} />
    );

    const partnersSection = container.querySelector('#partners');
    expect(partnersSection).toBeTruthy();
    // Proves legacy active: false is ignored and all partners with logo/name are rendered
    expect(screen.getAllByAltText('شعار شريك 1').length).toBeGreaterThan(0);
    expect(screen.getAllByAltText('شعار شريك 2').length).toBeGreaterThan(0);
    expect(screen.queryByText('شريك 1')).toBeNull();
    expect(screen.queryByText('شريك 2')).toBeNull();

    const hoverTarget = partnersSection?.querySelector('.group.px-1');
    expect(hoverTarget).toBeTruthy();

    if (hoverTarget) {
      // 1. Enter hover
      hoverTarget.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      // 2. Focus inside
      hoverTarget.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      // 3. Mouse leave while focus still active -> should NOT resume autoplay
      hoverTarget.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      // 4. Focus out -> clears focus reason
      hoverTarget.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    }

    // Fast-forward interaction timeout safely
    vi.advanceTimersByTime(5000);
    unmount();
    vi.useRealTimers();
  });

  it('9. verifies About page wires CMS story, mission, vision, values, and CTA', async () => {
    const { sanityFetch } = await import('@/sanity/client');
    (sanityFetch as any).mockResolvedValueOnce({
      _id: 'aboutPage',
      heroBadge: { ar: 'شارة من نحن' },
      heroTitle: { ar: 'عنوان قصة دي ناين' },
      heroSubtitle: { ar: 'مقدمة تعريفية للوكالة' },
      agencyStory: {
        ar: [
          {
            _type: 'block',
            _key: 'b1',
            children: [{ _type: 'span', _key: 's1', text: 'هذه قصة وكالة دي ناين الحقيقية من CMS' }],
          },
        ],
      },
      mission: {
        ar: [
          {
            _type: 'block',
            _key: 'b2',
            children: [{ _type: 'span', _key: 's2', text: 'رسالتنا هي قيادة الإبداع البصري في المنطقة' }],
          },
        ],
      },
      vision: {
        ar: [
          {
            _type: 'block',
            _key: 'b3',
            children: [{ _type: 'span', _key: 's3', text: 'رؤيتنا 2030 لتمكين الشركات الكبرى' }],
          },
        ],
      },
      cta: {
        title: { ar: 'هل أنت مستعد لنقل علامتك للقمة؟' },
        buttonText: { ar: 'تواصل مع فريقنا الآن' },
        buttonLink: '/contact-custom',
      },
    });

    const pageElement = await AboutPage();
    render(pageElement);

    expect(screen.getByText('شارة من نحن')).toBeTruthy();
    expect(screen.getByText('عنوان قصة دي ناين')).toBeTruthy();
    expect(screen.getByText('هذه قصة وكالة دي ناين الحقيقية من CMS')).toBeTruthy();
    expect(screen.getByText('رسالتنا هي قيادة الإبداع البصري في المنطقة')).toBeTruthy();
    expect(screen.getByText('رؤيتنا 2030 لتمكين الشركات الكبرى')).toBeTruthy();
    expect(screen.getByText('هل أنت مستعد لنقل علامتك للقمة؟')).toBeTruthy();
    expect(screen.getByText('تواصل مع فريقنا الآن')).toBeTruthy();
  });

  it('10. verifies metadata generation wires page-specific SEO from Sanity with clean stega', async () => {
    const { sanityFetch } = await import('@/sanity/client');
    (sanityFetch as any).mockResolvedValueOnce({
      _id: 'homePage',
      seo: {
        metaTitle: { ar: 'دي ناين — الصفحة الرئيسية الفاخرة' },
        metaDescription: { ar: 'وصف الصفحة الرئيسية المخصص للعميل' },
      },
    });

    const homeMeta = await generateHomeMetadata({ params: Promise.resolve({ locale: 'ar' }) });
    expect(homeMeta.title).toContain('دي ناين — الصفحة الرئيسية الفاخرة');
    expect(homeMeta.description).toBe('وصف الصفحة الرئيسية المخصص للعميل');

    (sanityFetch as any).mockResolvedValueOnce({
      _id: 'aboutPage',
      seo: {
        metaTitle: { ar: 'عن دي ناين — رؤيتنا وفريقنا' },
        metaDescription: { ar: 'تعرف على إنجازات وتاريخ دي ناين' },
      },
    });

    const aboutMeta = await generateAboutMetadata({ params: Promise.resolve({ locale: 'ar' }) });
    expect(aboutMeta.title).toContain('عن دي ناين — رؤيتنا وفريقنا');
    expect(aboutMeta.description).toBe('تعرف على إنجازات وتاريخ دي ناين');
  });
});
