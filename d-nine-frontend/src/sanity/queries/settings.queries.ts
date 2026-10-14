import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    companyName,
    legalName,
    defaultSiteUrl,
    "lightLogo": lightLogo.asset->url,
    "darkLogo": darkLogo.asset->url,
    headerNav[] {
      label,
      href,
      isExternal,
      isButton
    },
    footerDescription,
    footerColumns[] {
      title,
      links[] {
        label,
        href,
        isExternal,
        isButton
      }
    },
    copyrightText,
    email,
    phoneDisplay,
    phoneHref,
    whatsapp,
    locations,
    socialLinks[] {
      platform,
      url
    },
    defaultSeo {
      metaTitle,
      metaDescription,
      keywords
    },
    "defaultOgImage": defaultOgImage.asset->url
  }
`;

export const themeSettingsQuery = groq`
  *[_type == "themeSettings"][0] {
    _id,
    lightMode {
      primary,
      secondary,
      accent,
      pageBackground,
      surfaceBackground,
      cardBackground,
      headingColor,
      bodyTextColor,
      mutedTextColor,
      borderColor,
      primaryButtonBackground,
      primaryButtonText,
      secondaryButtonBackground,
      secondaryButtonText
    },
    darkMode {
      primary,
      secondary,
      accent,
      pageBackground,
      surfaceBackground,
      cardBackground,
      headingColor,
      bodyTextColor,
      mutedTextColor,
      borderColor,
      primaryButtonBackground,
      primaryButtonText,
      secondaryButtonBackground,
      secondaryButtonText
    }
  }
`;
