import React from 'react';
import Image from 'next/image';
import { PortableText, PortableTextComponents, PortableTextTypeComponentProps, PortableTextMarkComponentProps } from '@portabletext/react';
import type { PortableTextBlock, TypedObject } from '@portabletext/types';
import type { Image as SanityImage } from 'sanity';
import { Link } from '@/i18n/navigation';
import { urlForImage } from '../image';

interface LinkMark extends TypedObject {
  _type: 'link';
  href?: string;
}

type PortableTextImageValue = SanityImage & {
  alt?: string;
};

export const customPortableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-extrabold mb-6 text-slate-900 dark:text-white">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mb-5 mt-8 text-slate-900 dark:text-white">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mb-4 mt-6 text-slate-900 dark:text-white">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mb-3 mt-5 text-slate-900 dark:text-white">{children}</h4>,
    normal: ({ children }) => <p className="mb-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-brand-primary pl-4 italic my-6 text-slate-700 dark:text-slate-200">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2 text-slate-600 dark:text-slate-300">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-2 text-slate-600 dark:text-slate-300">{children}</ol>,
  },
  marks: {
    link: ({
      children,
      value,
    }: PortableTextMarkComponentProps<LinkMark>) => {
      const href = value?.href;

      if (!href) {
        return <>{children}</>;
      }

      const external = /^https?:\/\//.test(href);

      if (!external && href.startsWith('/')) {
        return (
          <Link href={href as React.ComponentProps<typeof Link>['href']} className="text-brand-primary hover:underline font-medium">
            {children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="text-brand-primary hover:underline font-medium"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({
      value,
    }: PortableTextTypeComponentProps<PortableTextImageValue>) => {
      if (!value.asset?._ref) {
        return null;
      }

      const image = urlForImage(value);
      const src =
        typeof image === 'string'
          ? image
          : image?.width(1200).fit('max').url();

      if (!src) {
        return null;
      }

      return (
        <figure className="relative w-full my-8 overflow-hidden rounded-xl">
          <Image
            src={src}
            alt={value.alt ?? ''}
            width={1200}
            height={675}
            className="h-auto w-full rounded-2xl"
          />
        </figure>
      );
    },
  },
};

export const CustomPortableText = ({ value }: { value: PortableTextBlock[] | undefined | null }) => {
  if (!value) return null;
  return <PortableText value={value} components={customPortableTextComponents} />;
};