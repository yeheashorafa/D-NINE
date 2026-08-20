import { LocalizedText } from './localized';

export type MediaAspectRatio = '16:9' | '9:16' | '1:1' | '4:3' | '16/9';

export interface ProjectMedia {
  type: 'image' | 'video' | 'poster';
  src: string;
  poster?: string;
  alt?: LocalizedText | string;
  caption?: LocalizedText;
  aspectRatio?: MediaAspectRatio;
  captions?: string;
}
