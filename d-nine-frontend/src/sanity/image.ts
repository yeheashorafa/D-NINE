import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-id';

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'development';

const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
});

export const urlForImage = (
  source: Image | string | undefined | null,
) => {
  if (!source) return undefined;

  if (typeof source === 'string') {
    return source;
  }

  if (
    typeof source === 'object' &&
    'asset' in source &&
    source.asset
  ) {
    return imageBuilder.image(source).auto('format').fit('max');
  }

  return undefined;
};