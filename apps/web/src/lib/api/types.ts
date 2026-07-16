export type Locale = "ar" | "en";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiSuccessResponse<TData> {
  success: true;
  data: TData;
  meta?: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}

export interface PaginatedResponse<TItem> {
  items: TItem[];
  meta: PaginationMeta;
}

export interface LocalizedPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  featuredImageUrl: string | null;
  publishedAt: string | null;
  updatedAt: string;
}

export interface LocalizedNewsArticle {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  featuredImageUrl: string | null;
  publishedAt: string | null;
  updatedAt?: string;
}

export interface LocalizedEvent {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  featuredImageUrl: string | null;
  location: string | null;
  startDate: string;
  endDate: string | null;
  registrationUrl: string | null;
  publishedAt: string | null;
  updatedAt?: string;
}

export interface NewsListQueryOptions {
  locale: Locale;
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export type EventTimeframe = "upcoming" | "past" | "all";

export interface EventListQueryOptions {
  locale: Locale;
  page?: number;
  limit?: number;
  search?: string;
  timeframe?: EventTimeframe;
}
