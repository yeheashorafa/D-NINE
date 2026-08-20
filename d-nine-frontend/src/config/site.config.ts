export interface SiteConfig {
  name: string;
  legalName: string;
  url: string;
  contact: {
    email: string;
    phone: {
      display: string;
      href: string;
    };
    locations: {
      ar: string;
      en: string;
    };
  };
  socials: {
    instagram: string;
    linkedin: string;
    twitter: string;
  };
  internalMarkers: Record<string, string>;
}

export const siteConfig: SiteConfig = {
  name: 'D-NINE',
  legalName: 'D-NINE Creative Agency & Media Production',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dnine.agency',
  contact: {
    email: 'hello@dnine.agency',
    phone: {
      display: '+966 50 000 0000',
      href: 'tel:+966500000000',
    },
    locations: {
      ar: 'الرياض، المملكة العربية السعودية / دبي، الإمارات العربية المتحدة',
      en: 'Riyadh, Saudi Arabia / Dubai, United Arab Emirates',
    },
  },
  socials: {
    instagram: 'https://instagram.com/dnine.agency',
    linkedin: 'https://linkedin.com/company/dnine-agency',
    twitter: 'https://twitter.com/dnineagency',
  },
  internalMarkers: {
    phone: 'PENDING_OFFICIAL_PHONE',
    address: 'PENDING_OFFICIAL_ADDRESS',
    metrics: 'PENDING_VERIFIED_METRICS',
    team: 'PENDING_OFFICIAL_TEAM_DATA',
    clientLogos: 'PENDING_REAL_CLIENT_LOGOS',
    backendApi: 'PENDING_BACKEND_API',
    licensedSlider: 'PENDING_LICENSED_DNINE_SLIDER_EXPORTS',
    realMedia: 'PENDING_REAL_MEDIA',
  },
};
