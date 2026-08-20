import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dnine.agency';

interface MetadataParams {
  title: string;
  description: string;
  locale: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export function constructMetadata({
  title,
  description,
  locale,
  path,
  image = '/media/seo/d-nine-og.jpg',
  type = 'website',
  publishedTime,
  modifiedTime
}: MetadataParams): Metadata {
  const isArabic = locale === 'ar';
  const siteName = isArabic
    ? 'دي ناين للتسويق والإعلام Digital Agency'
    : 'D-NINE Marketing & Media Agency';
  const fullTitle = `${title} | ${siteName}`;

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${BASE_URL}/${locale}${cleanPath === '/' ? '' : cleanPath}`;

  const arUrl = `${BASE_URL}/ar${cleanPath === '/' ? '' : cleanPath}`;
  const enUrl = `${BASE_URL}/en${cleanPath === '/' ? '' : cleanPath}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: arUrl,
        en: enUrl,
        'x-default': arUrl
      }
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName,
      locale: isArabic ? 'ar_SA' : 'en_US',
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {})
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}
