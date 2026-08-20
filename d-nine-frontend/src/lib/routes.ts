export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  serviceDetail: (slug: string) => `/services/${slug}`,
  work: '/work',
  workDetail: (slug: string) => `/work/${slug}`,
  blog: '/blog',
  blogDetail: (slug: string) => `/blog/${slug}`,
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
} as const;
