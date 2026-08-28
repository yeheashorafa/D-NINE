export interface LocalizedText {
  ar: string;
  en: string;
}

export interface SeoMetadata {
  metaTitle?: Partial<LocalizedText>;
  metaDescription?: Partial<LocalizedText>;
  keywords?: Partial<LocalizedText>;
}
