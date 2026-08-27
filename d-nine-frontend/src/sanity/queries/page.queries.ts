import { groq } from 'next-sanity';

const basePageFields = groq`
  _id,
  "id": _id,
  title,
  subtitle,
  badge,
  seo {
    metaTitle,
    metaDescription,
    keywords,
    canonicalUrl
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    _id,
    "id": _id,
    heroSlides[active != false] {
      category,
      title,
      description,
      ctaText,
      ctaLink,
      "image": image.asset->url
    },
    creativeSnapshot {
      title,
      description,
      stats[] {
        value,
        label
      }
    },
    featuredProjects[]-> { title, subtitle, slug },
    featuredServices[]-> { title, subtitle, slug },
    processTimeline,
    testimonials,
    faqs,
    latestNews[]-> { title, slug, publishedAt, excerpt, "image": image.asset->url },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl
    }
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    _id,
    "id": _id,
    heroBadge,
    heroTitle,
    heroSubtitle,
    agencyStory,
    mission,
    vision,
    values[] {
      title,
      description,
      iconName
    },
    "media": media[].asset->url,
    cta {
      title,
      subtitle,
      buttonText,
      buttonLink
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl
    }
  }
`;

export const servicesPageQuery = groq`
  *[_type == "servicesPage"][0] {
    _id,
    "id": _id,
    heroBadge,
    heroTitle,
    heroSubtitle,
    filterLabels,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl
    }
  }
`;

export const workPageQuery = groq`
  *[_type == "workPage"][0] {
    _id,
    "id": _id,
    heroBadge,
    heroTitle,
    heroSubtitle,
    allCategoriesLabel,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl
    }
  }
`;

export const blogPageQuery = groq`
  *[_type == "blogPage"][0] {
    _id,
    "id": _id,
    heroBadge,
    heroTitle,
    heroSubtitle,
    searchPlaceholder,
    featuredPosts[]-> { title, slug, publishedAt, excerpt, "image": image.asset->url },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl
    }
  }
`;

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    _id,
    "id": _id,
    heroBadge,
    heroTitle,
    heroSubtitle,
    description,
    contactMethods[] {
      type,
      title,
      value,
      link
    },
    offices[] {
      title,
      address,
      phone,
      email,
      coordinates
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl
    }
  }
`;

export const privacyPageQuery = groq`
  *[_type == "privacyPage"][0] {
    _id,
    "id": _id,
    title,
    lastUpdated,
    body,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl
    }
  }
`;

export const termsPageQuery = groq`
  *[_type == "termsPage"][0] {
    _id,
    "id": _id,
    title,
    lastUpdated,
    body,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl
    }
  }
`;
