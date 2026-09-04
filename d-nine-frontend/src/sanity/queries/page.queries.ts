import { groq } from 'next-sanity';

export const testimonialFields = groq`
  _id,
  "id": _id,
  personName,
  role,
  company,
  quote,
  "image": image.asset->url,
  "imageAlt": image.alt,
  rating,
  featured,
  active,
  order,
  relatedService->{_id, "slug": slug.current},
  relatedProject->{_id, "slug": slug.current}
`;

export const teamMemberFields = groq`
  _id,
  "id": _id,
  name,
  role,
  bio,
  "image": image.asset->url,
  "imageAlt": image.alt,
  socialLinks,
  featured,
  active,
  order
`;

export const basePageFields = groq`
  _id,
  "id": _id,
  title,
  subtitle,
  badge,
  seo {
    metaTitle,
    metaDescription,
    keywords
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
    "featuredProjects": featuredProjects[]->slug.current,
    "featuredServices": featuredServices[]->slug.current,
    processTimeline,
    testimonials {
      enabled,
      badge,
      title,
      subtitle,
      maxItems,
      selectedTestimonials[]-> {
        ${testimonialFields}
      }
    },
    teamPreview {
      enabled,
      badge,
      title,
      subtitle,
      maxItems,
      ctaLabel,
      ctaPath,
      selectedTeamMembers[]-> {
        ${teamMemberFields}
      }
    },
    faqs,
    bookACall,
    latestNews[]-> { title, "slug": slug.current, publishedAt, excerpt, "image": image.asset->url, category, readTimeMinutes },
    seo {
      metaTitle,
      metaDescription,
      keywords
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
    team {
      enabled,
      badge,
      title,
      subtitle,
      maxItems,
      ctaLabel,
      ctaPath,
      selectedTeamMembers[]-> {
        ${teamMemberFields}
      }
    },
    testimonials {
      enabled,
      badge,
      title,
      subtitle,
      maxItems,
      selectedTestimonials[]-> {
        ${testimonialFields}
      }
    },
    seo {
      metaTitle,
      metaDescription,
      keywords
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
    testimonials {
      enabled,
      badge,
      title,
      subtitle,
      maxItems,
      selectedTestimonials[]-> {
        ${testimonialFields}
      }
    },
    seo {
      metaTitle,
      metaDescription,
      keywords
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
      keywords
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
    featuredPosts[]-> { title, "slug": slug.current, publishedAt, excerpt, "image": image.asset->url, category, readTimeMinutes },
    seo {
      metaTitle,
      metaDescription,
      keywords
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
      keywords
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
      keywords
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
      keywords
    }
  }
`;
