import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Handshake } from 'lucide-react';

import { RevealSection } from '@/components/motion/reveal-section';
import { PartnerItem } from '@/types/partner';

export interface PartnersSectionProps {
  partners?: PartnerItem[];
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ partners = [] }) => {
  const locale = useLocale() as 'ar' | 'en';
  const isArabic = locale === 'ar';


  // Filter only active partners
  const activePartners = (partners || []).filter((p) => p.active !== false);

  // If no partners are selected or active, hide the section cleanly
  if (activePartners.length === 0) {
    return null;
  }

  return (
    <section id="partners" className="py-16 sm:py-24 relative bg-background transition-colors duration-300 overflow-hidden border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <RevealSection className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs sm:text-sm font-semibold">
            <Handshake className="w-4 h-4" aria-hidden="true" />
            <span>{isArabic ? 'شركاء النجاح' : 'Our Partners'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {isArabic ? 'شركاء نفخر بالعمل معهم' : 'Partners We Are Proud to Work With'}
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            {isArabic
              ? 'نعتز بالثقة التي أولتنا إياها نخبة من العلامات التجارية والمؤسسات الرائدة'
              : 'Trusted by ambitious brands and forward-thinking enterprises across the region'}
          </p>
        </RevealSection>

        {/* Partners Logos Grid */}
        <RevealSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center">
            {activePartners.map((partner) => {
              const partnerName = partner.name?.[locale] || partner.name?.en || partner.name?.ar || 'Partner';
              const logoAlt =
                partner.logoAlt?.[locale] ||
                partner.logoAlt?.ar ||
                partner.logoAlt?.en ||
                `${partnerName} Logo`;

              const content = (
                <div className="relative w-full h-20 sm:h-24 p-4 rounded-2xl bg-surface/60 dark:bg-card/60 border border-border/60 hover:border-brand-cyan/40 hover:bg-surface hover:shadow-md transition-all duration-300 flex items-center justify-center grayscale hover:grayscale-0 opacity-75 hover:opacity-100 group">
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={logoAlt}
                      fill
                      className="object-contain filter transition-all duration-200"
                      sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 200px"
                    />
                  </div>
                </div>
              );

              if (partner.url) {
                return (
                  <a
                    key={partner.id}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-2xl"
                    aria-label={partnerName}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div key={partner.id} className="w-full">
                  {content}
                </div>
              );
            })}
          </div>
        </RevealSection>
      </div>
    </section>
  );
};
