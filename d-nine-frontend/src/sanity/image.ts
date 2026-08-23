import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId } from './env';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || 'placeholder-id',
  dataset: dataset || 'development',
});

export const urlForImage = (source: Image | string | undefined | null) => {
  if (!source) return undefined;
  if (typeof source === 'string') return source;
  if (typeof source === 'object' && 'asset' in source && source.asset) {
    return imageBuilder?.image(source).auto('format').fit('max');
  }
  return undefined;
};
