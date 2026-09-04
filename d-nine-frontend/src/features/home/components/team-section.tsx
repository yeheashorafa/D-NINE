'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Users } from 'lucide-react';
import { RevealSection } from '@/components/motion/reveal-section';
import { Card } from '@/components/ui/card';
import { TeamMemberItem } from '@/types/team';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { CustomPortableText } from '@/sanity/components/portable-text';
import { useReducedMotion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay, Keyboard } from 'swiper/modules';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram, FaBehance, FaDribbble } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/keyboard';

interface TeamSectionProps {
  data?: {
    enabled?: boolean;
    badge?: { ar?: string; en?: string };
    title?: { ar?: string; en?: string };
    subtitle?: { ar?: string; en?: string };
    selectedTeamMembers?: TeamMemberItem[];
    maxItems?: number;
    ctaLabel?: { ar?: string; en?: string };
    ctaPath?: string;
  };
}

export const TeamSection: React.FC<TeamSectionProps> = ({ data }) => {
  const swiperRef = React.useRef<import('swiper').Swiper | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations('home.team');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  if (data?.enabled === false) return null;
  const allItems = data?.selectedTeamMembers || [];
  const max = data?.maxItems || allItems.length;
  const items = allItems.slice(0, max);
  if (items.length === 0) return null;
  const isSingle = items.length === 1;

  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return <FaTwitter className="w-5 h-5" />;
      case 'linkedin': return <FaLinkedin className="w-5 h-5" />;
      case 'github': return <FaGithub className="w-5 h-5" />;
      case 'instagram': return <FaInstagram className="w-5 h-5" />;
      case 'behance': return <FaBehance className="w-5 h-5" />;
      case 'dribbble': return <FaDribbble className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <section id="team" className="py-16 sm:py-24 relative bg-background transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealSection className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs sm:text-sm font-semibold">
            <Users className="w-4 h-4" aria-hidden="true" />
            <span>{data?.badge?.[isArabic ? 'ar' : 'en'] || t('badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {data?.title?.[isArabic ? 'ar' : 'en'] || t('title')}
          </h2>
          {(data?.subtitle?.ar || data?.subtitle?.en) && (
            <p className="text-lg text-text-muted mt-4">
              {data.subtitle[isArabic ? 'ar' : 'en']}
            </p>
          )}
        </RevealSection>

        <RevealSection>
          <div
            className="relative group"
            onFocusCapture={() => swiperRef.current?.autoplay?.pause()}
            onBlurCapture={() => swiperRef.current?.autoplay?.resume()}
          >
            <Swiper
              onSwiper={(s) => (swiperRef.current = s)}
              modules={[Navigation, Pagination, A11y, Autoplay, Keyboard]}
              spaceBetween={24}
              slidesPerView={1}
              watchSlidesProgress={true}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: Math.min(items.length, 4) }
              }}
              navigation={!isSingle}
              pagination={!isSingle ? { clickable: true } : false}
              autoplay={!isSingle && !prefersReducedMotion ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
              speed={prefersReducedMotion ? 0 : 300}
              loop={!isSingle && items.length > 4}
              keyboard={{ enabled: true, onlyInViewport: true }}
              dir={isArabic ? 'rtl' : 'ltr'}
              watchOverflow={true}
              className="!pb-16 motion-reduce:transition-none"
              a11y={{
                prevSlideMessage: tCommon('carousel.prev'),
                nextSlideMessage: tCommon('carousel.next'),
                paginationBulletMessage: tCommon('carousel.pagination') + ' {{index}}',
              }}
            >
              {items.map((item, idx) => (
                <SwiperSlide key={item.id || idx} className="h-auto">
                  <Card className="h-full bg-surface border-border flex flex-col items-center text-center p-6 space-y-4 cursor-grab active:cursor-grabbing">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden shrink-0 border-4 border-brand-primary/10">
                      {item.image ? (
                        <Image src={item.image} alt={item.imageAlt?.[isArabic ? 'ar' : 'en'] || item.name?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'عضو في الفريق' : 'Team member')} fill className="object-cover" sizes="128px" />
                      ) : (
                        <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                          <Users className="w-12 h-12 text-slate-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-xl">
                        {item.name?.[isArabic ? 'ar' : 'en']}
                      </h4>
                      <p className="text-sm font-medium text-brand-primary mt-1">
                        {item.role?.[isArabic ? 'ar' : 'en']}
                      </p>
                    </div>
                    {item.bio && (
                      <div className="text-sm text-text-muted">
                        <CustomPortableText value={item.bio[isArabic ? 'ar' : 'en']} />
                      </div>
                    )}
                    {item.socialLinks && item.socialLinks.length > 0 && (
                      <div className="flex gap-4 mt-4 pt-4 border-t border-border w-full justify-center">
                        {item.socialLinks.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Social link to ${link.platform}`}
                            className="text-text-muted hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
                          >
                            {renderSocialIcon(link.platform)}
                          </a>
                        ))}
                      </div>
                    )}
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </RevealSection>
        {(data?.ctaPath || data?.ctaLabel) && (
          <RevealSection className="mt-12 text-center">
            <Link
              href={data.ctaPath || '/about'}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-primary text-white font-semibold hover:bg-brand-primary/90 transition-colors"
            >
              {data.ctaLabel?.[isArabic ? 'ar' : 'en'] || t('cta')}
            </Link>
          </RevealSection>
        )}
      </div>
    </section>
  );
};
