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
  Swiper: ({ children, onSwiper }: { children: React.ReactNode; onSwiper?: (swiper: unknown) => void }) => {
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

  it('renders partners and connects onSwiper to register DOM focus listeners', () => {
    const { container } = renderWithIntl(<PartnersSection partners={testPartners} />);
    expect(container.querySelector('#partners')).toBeInTheDocument();

    const swiperContainer = container.querySelector('[data-testid="swiper-mock-container"]') as HTMLDivElement;
    expect(swiperContainer).toBeInTheDocument();
    expect(screen.getByText('الشامل مول')).toBeInTheDocument();
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

  it('arrow button interaction pauses autoplay and prevents resumption until 4000ms timer elapses', () => {
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

    // At 4100ms (timer finished), resume is safely called
    act(() => {
      vi.advanceTimersByTime(2100);
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

  it('hides carousel navigation arrows when partners count is <= 2 (e.g. 1 partner)', () => {
    const singlePartner: PartnerItem[] = [testPartners[0]];
    const { container } = renderWithIntl(<PartnersSection partners={singlePartner} />);
    const prevBtn = container.querySelector('.swiper-button-prev');
    const nextBtn = container.querySelector('.swiper-button-next');
    expect(prevBtn).toBeNull();
    expect(nextBtn).toBeNull();
  });

  it('renders carousel navigation arrows when partners count is >= 3', () => {
    const { container } = renderWithIntl(<PartnersSection partners={testPartners} />);
    const prevBtn = container.querySelector('.swiper-button-prev');
    const nextBtn = container.querySelector('.swiper-button-next');
    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
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
