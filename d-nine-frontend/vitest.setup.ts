import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

class IntersectionObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// Mock Swiper for tests
vi.mock('swiper/react', () => ({
  Swiper: (props: { className?: string; children?: React.ReactNode; dir?: string }) => {
    // Simple mock that just renders children
    return React.createElement('div', { 'data-testid': 'swiper-mock', className: props.className, dir: props.dir }, props.children);
  },
  SwiperSlide: (props: { className?: string; children?: React.ReactNode }) => {
    return React.createElement('div', { 'data-testid': 'swiper-slide-mock', className: props.className }, props.children);
  },
}));

vi.mock('swiper/modules', () => ({
  Navigation: {},
  Pagination: {},
  A11y: {},
  Autoplay: {},
}));

vi.mock('next/navigation', () => ({
  useRouter() { return { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }; },
  usePathname() { return ''; },
  useSearchParams() { return new URLSearchParams(); },
  redirect: vi.fn(),
  permanentRedirect: vi.fn(),
}));
