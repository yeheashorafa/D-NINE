import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { draftMode } from "next/headers";
import { routing, Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VisualEditing } from "@/components/sanity/visual-editing";
import { ibmPlexSansArabic, ibmPlexSansEnglish } from "@/app/fonts";
import "@/styles/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  const title = isArabic
    ? "دي ناين | وكالة إبداعية وإنتاج إعلامي وتصميم الهوية"
    : "D-NINE | Creative Agency, Media Production & Brand Identity";
  const description = isArabic
    ? "وكالة دي ناين للإنتاج الإعلامي، الهوية البصرية، تصميم الجرافيك، وصناعة الفيديوهات القصيرة في الرياض ودبي."
    : "D-NINE Creative Agency in Riyadh & Dubai. Video production, brand identity, graphic design, and short-form video reels.";

  return {
    title,
    description,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://dnine.agency"
    ),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: "/ar",
        en: "/en",
      },
    },
    openGraph: {
      title,
      description,
      locale: isArabic ? "ar_SA" : "en_US",
      type: "website",
      siteName: "D-NINE Media & Production",
      images: [
        {
          url: "/media/seo/d-nine-og.jpg",
          width: 1200,
          height: 630,
          alt: "D-NINE Creative Agency",
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const isArabic = locale === "ar";
  const fontClass = isArabic
    ? ibmPlexSansArabic.variable
    : ibmPlexSansEnglish.variable;

  const isDraft = (await draftMode()).isEnabled;

  return (
    <html
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
      className={`${fontClass} ${isArabic ? "font-arabic" : "font-sans"}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-text min-h-screen flex flex-col antialiased selection:bg-brand-cyan selection:text-slate-950 transition-colors duration-300">
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <div className="flex-1 w-full">{children}</div>
            <Footer />
            {isDraft && <VisualEditing />}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}