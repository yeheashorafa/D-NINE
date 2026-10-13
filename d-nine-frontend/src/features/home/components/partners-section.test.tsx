import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PartnersSection } from './partners-section';
import { PartnerItem } from '@/types/partner';
import { NextIntlClientProvider } from 'next-intl';

// Mock Swiper React wrapper to extract onSwiper callback and render interactive container
let lastSwiperInstance: {
  autoplay: {
    pause: ReturnType<typeof vi.fn>;
    resume: ReturnType<typeof vi.fn>;
    stop: ReturnType<typeof vi.fn>;
    start: ReturnType<typeof vi.fn>;
  };
  el: HTMLDivElement | null;
} | null = null;

let mockPrefersReducedMotion = false;

vi.mock('motion/react', () => ({
  useReducedMotion: () => mockPrefersReducedMotion,
  motion: {
    div: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
  },
}));

vi.mock('@/components/motion/reveal-section', () => ({
  RevealSection: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}));

vi.mock('swiper/react', () => ({
  Swiper: ({ children, onSwiper, dir }: { children: React.ReactNode; onSwiper?: (swiper: unknown) => void; dir?: string }) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    React.useLayoutEffect(() => {
      if (containerRef.current && lastSwiperInstance) {
        lastSwiperInstance.el = containerRef.current;
        onSwiper?.(lastSwiperInstance);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        ref={containerRef}
        data-testid="swiper-mock-container"
        data-dir={dir}
        className="swiper-mock"
      >
        {children}
      </div>
    );
  },
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-slide-mock" className="swiper-slide">
      {children}
    </div>
  ),
  useSwiper: () => ({
    isBeginning: false,
    isEnd: false,
    isLocked: false,
    params: { loop: true },
    on: vi.fn(),
    off: vi.fn(),
    slidePrev: vi.fn(),
    slideNext: vi.fn(),
  }),
}));

const mockMessages = {
  home: {
    partners: {
      badge: 'شركاء النجاح',
      title: 'شركاء نفخر بالعمل معهم',
    },
  },
  common: {
    carousel: {
      prev: 'السابق',
      next: 'التالي',
      pagination: 'انتقل إلى الشريحة',
    },
  },
};

const renderWithIntl = (ui: React.ReactElement, locale = 'ar') => {
  return render(
    <NextIntlClientProvider locale={locale} messages={mockMessages}>
      {ui}
    </NextIntlClientProvider>
  );
};

const testPartners: PartnerItem[] = [
  {
    id: 'partner-1',
    name: { ar: 'الشامل مول', en: 'Al Shamel Mall' },
    logo: 'https://cdn.sanity.io/images/xg3zrwt3/development/shamel.png',
    logoAlt: { ar: 'شعار الشامل مول', en: 'Al Shamel Mall Logo' },
    active: true,
  },
  {
    id: 'partner-2',
    name: { ar: 'العربية للإعلام', en: 'Arabian Media' },
    logo: 'https://cdn.sanity.io/images/xg3zrwt3/development/arabian.png',
    logoAlt: { ar: 'شعار العربية للإعلام', en: 'Arabian Media Logo' },
    active: true,
  },
  {
    id: 'partner-3',
    name: { ar: 'شركة الرياض للتقنية', en: 'Riyadh Tech' },
    logo: 'https://cdn.sanity.io/images/xg3zrwt3/development/riyadh.png',
    logoAlt: { ar: 'شعار الرياض', en: 'Riyadh Tech Logo' },
    active: true,
  },
];

const createMockSwiper = () => ({
  autoplay: {
    pause: vi.fn(),
    resume: vi.fn(),
    stop: vi.fn(),
    start: vi.fn(),
  },
  el: null as HTMLDivElement | null,
});

describe('PartnersSection Unit & Autoplay Controller Verification', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockPrefersReducedMotion = false;
    lastSwiperInstance = createMockSwiper();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders partners in white circular cards with contain object-fit, no visual name text, and no links/CTAs', () => {
    const { container } = renderWithIntl(<PartnersSection partners={testPartners} />);
    expect(container.querySelector('#partners')).toBeInTheDocument();

    const swiperContainer = container.querySelector('[data-testid="swiper-mock-container"]') as HTMLDivElement;
    expect(swiperContainer).toBeInTheDocument();

    // 1. Logos render with proper accessible alt
    const logoImgs = screen.getAllByAltText('شعار الشامل مول');
    expect(logoImgs.length).toBeGreaterThan(0);
    const firstImg = logoImgs[0];
    expect(firstImg).toHaveClass('object-contain');

    // 2. Partner name is NOT rendered visually as text in the section
    expect(screen.queryByText('الشامل مول')).not.toBeInTheDocument();
    expect(screen.queryByText('Al Shamel Mall')).not.toBeInTheDocument();

    // 3. Logos are inside circular containers (aspect-ratio 1/1, rounded-full, bg-white, overflow hidden)
    const circularContainers = container.querySelectorAll('.rounded-full.aspect-square');
    expect(circularContainers.length).toBe(testPartners.length);
    circularContainers.forEach((circle) => {
      expect(circle).toHaveStyle({
        backgroundColor: '#ffffff',
        borderRadius: '9999px',
        overflow: 'hidden',
      });
    });

    // 4. No links <a> and no buttons inside the slide/card
    expect(container.querySelectorAll('.swiper-slide a')).toHaveLength(0);
    expect(container.querySelectorAll('.swiper-slide button')).toHaveLength(0);
  });

  it('1 partner: exactly 1 slide rendered (no fake loop/duplication) and no navigation arrows', () => {
    const singlePartner: PartnerItem[] = [testPartners[0]];
    const { container } = renderWithIntl(<PartnersSection partners={singlePartner} />);

    // Exactly 1 slide, zero fake duplicated slides
    const slides = container.querySelectorAll('[data-testid="swiper-slide-mock"]');
    expect(slides).toHaveLength(1);

    // No useless navigation arrows for a single partner
    const prevBtn = container.querySelector('.swiper-button-prev');
    const nextBtn = container.querySelector('.swiper-button-next');
    expect(prevBtn).toBeNull();
    expect(nextBtn).toBeNull();

    // Logo still renders in white circle with accessible alt
    expect(screen.getByAltText('شعار الشامل مول')).toBeInTheDocument();
    expect(screen.queryByText('الشامل مول')).not.toBeInTheDocument();
  });

  it('3 partners: renders exactly 3 slides (no fake duplicates) and enables carousel with navigation arrows', () => {
    const { container } = renderWithIntl(<PartnersSection partners={testPartners} />);

    // Exactly 3 slides (no fake repeating)
    const slides = container.querySelectorAll('[data-testid="swiper-slide-mock"]');
    expect(slides).toHaveLength(3);

    // Navigation arrows are rendered
    const prevBtn = container.querySelector('.swiper-button-prev');
    const nextBtn = container.querySelector('.swiper-button-next');
    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
  });

  it('hover => pause (stop) is called; mouseleave with no other reason => resume (start) is called', () => {
    const { container } = renderWithIntl(<PartnersSection partners={testPartners} />);
    const hoverTarget = container.querySelector('.group.px-1') as HTMLDivElement;
    expect(hoverTarget).toBeInTheDocument();

    // 1. Mouse Enter
    act(() => {
      fireEvent.mouseEnter(hoverTarget);
    });
    expect(lastSwiperInstance!.autoplay.pause).toHaveBeenCalledTimes(1);
    expect(lastSwiperInstance!.autoplay.stop).toHaveBeenCalledTimes(1);

    // 2. Mouse Leave
    act(() => {
      fireEvent.mouseLeave(hoverTarget);
    });
    expect(lastSwiperInstance!.autoplay.resume).toHaveBeenCalledTimes(1);
    expect(lastSwiperInstance!.autoplay.start).toHaveBeenCalledTimes(1);
  });

  it('focus => pause is called; mouseleave while focus remains => resume is NOT called', () => {
    const { container } = renderWithIntl(<PartnersSection partners={testPartners} />);
    const swiperContainer = container.querySelector('[data-testid="swiper-mock-container"]') as HTMLDivElement;
    const hoverTarget = container.querySelector('.group.px-1') as HTMLDivElement;

    // Hover first
    act(() => {
      fireEvent.mouseEnter(hoverTarget);
    });
    expect(lastSwiperInstance!.autoplay.pause).toHaveBeenCalledTimes(1);

    // Focus enters carousel
    act(() => {
      fireEvent.focusIn(swiperContainer);
    });
    expect(lastSwiperInstance!.autoplay.pause).toHaveBeenCalledTimes(2);

    // Mouse leaves, but focus remains inside -> resume must NOT be called
    act(() => {
      fireEvent.mouseLeave(hoverTarget);
    });
    expect(lastSwiperInstance!.autoplay.resume).toHaveBeenCalledTimes(0);
    expect(lastSwiperInstance!.autoplay.start).toHaveBeenCalledTimes(0);

    // Focus out completely
    act(() => {
      fireEvent.focusOut(swiperContainer, { relatedTarget: document.body });
    });
    // Now all pause reasons are clear -> resume must be called
    expect(lastSwiperInstance!.autoplay.resume).toHaveBeenCalledTimes(1);
    expect(lastSwiperInstance!.autoplay.start).toHaveBeenCalledTimes(1);
  });

  it('arrow button interaction pauses autoplay and resumes after interaction timer elapses', () => {
    const { container } = renderWithIntl(<PartnersSection partners={testPartners} />);
    const nextButton = container.querySelector('.swiper-button-next') as HTMLButtonElement;
    expect(nextButton).toBeInTheDocument();

    // Click arrow button to trigger onInteraction
    act(() => {
      nextButton.click();
    });
    expect(lastSwiperInstance!.autoplay.pause).toHaveBeenCalledTimes(1);

    // At 2000ms (timer still active), resume is not yet called
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(lastSwiperInstance!.autoplay.resume).toHaveBeenCalledTimes(0);

    // At 4600ms (timer finished), resume is safely called
    act(() => {
      vi.advanceTimersByTime(2600);
    });
    expect(lastSwiperInstance!.autoplay.resume).toHaveBeenCalledTimes(1);
    expect(lastSwiperInstance!.autoplay.start).toHaveBeenCalledTimes(1);
  });

  it('prefersReducedMotion stops autoplay and prevents resume even when reasons are cleared', () => {
    mockPrefersReducedMotion = true;
    const { container } = renderWithIntl(<PartnersSection partners={testPartners} />);
    const hoverTarget = container.querySelector('.group.px-1') as HTMLDivElement;
    act(() => {
      hoverTarget.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      hoverTarget.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    });

    // Since mockPrefersReducedMotion is true, resume/start is NEVER called
    expect(lastSwiperInstance!.autoplay.resume).toHaveBeenCalledTimes(0);
    expect(lastSwiperInstance!.autoplay.start).toHaveBeenCalledTimes(0);
  });

  it('renders correctly in Arabic (dir=rtl) and English (dir=ltr)', () => {
    // 1. Arabic (RTL)
    const { container: arContainer, unmount: unmountAr } = renderWithIntl(<PartnersSection partners={testPartners} />, 'ar');
    const arSwiper = arContainer.querySelector('[data-testid="swiper-mock-container"]');
    expect(arSwiper).toHaveAttribute('data-dir', 'rtl');
    unmountAr();

    // 2. English (LTR)
    const { container: enContainer } = renderWithIntl(<PartnersSection partners={testPartners} />, 'en');
    const enSwiper = enContainer.querySelector('[data-testid="swiper-mock-container"]');
    expect(enSwiper).toHaveAttribute('data-dir', 'ltr');
    // Name is in English alt, still not visually in DOM
    expect(screen.getByAltText('Al Shamel Mall Logo')).toBeInTheDocument();
    expect(enContainer.querySelector('#partners')).toBeInTheDocument();
  });

  it('unmount cleans up listeners and timers safely without leaks', () => {
    const { container, unmount } = renderWithIntl(<PartnersSection partners={testPartners} />);
    const swiperContainer = container.querySelector('[data-testid="swiper-mock-container"]') as HTMLDivElement;
    const removeEventListenerSpy = vi.spyOn(swiperContainer, 'removeEventListener');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('focusin', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('focusout', expect.any(Function));
  });
});
