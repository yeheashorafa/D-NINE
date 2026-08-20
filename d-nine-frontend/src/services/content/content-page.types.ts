export interface ContentPage<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
  total: number;
}

export interface ContentQueryParams {
  categorySlug?: string;
  cursor?: string;
  limit?: number;
  searchQuery?: string;
}
