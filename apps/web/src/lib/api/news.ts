import { apiGet } from "@/lib/api/client";
import type {
  ApiSuccessResponse,
  Locale,
  LocalizedNewsArticle,
  NewsListQueryOptions,
  PaginatedResponse,
  PaginationMeta,
} from "@/lib/api/types";

function normalizePagination(meta: PaginationMeta | undefined): PaginationMeta {
  return {
    page: meta?.page ?? 1,
    limit: meta?.limit ?? 10,
    total: meta?.total ?? 0,
    totalPages: meta?.totalPages ?? 1,
  };
}

export async function getNewsList(
  options: NewsListQueryOptions
): Promise<PaginatedResponse<LocalizedNewsArticle>> {
  const response = await apiGet<ApiSuccessResponse<LocalizedNewsArticle[]>>(
    "/api/news",
    {
      query: {
        locale: options.locale,
        page: options.page,
        limit: options.limit,
        search: options.search,
        category: options.category,
      },
    }
  );

  return {
    items: response.data,
    meta: normalizePagination(response.meta),
  };
}

export async function getNewsBySlug(
  slug: string,
  locale: Locale
): Promise<LocalizedNewsArticle> {
  const response = await apiGet<ApiSuccessResponse<LocalizedNewsArticle>>(
    `/api/news/${slug}`,
    {
      query: { locale },
    }
  );

  return response.data;
}
