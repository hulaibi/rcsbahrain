import { apiGet } from "@/lib/api/client";
import type {
  ApiSuccessResponse,
  EventListQueryOptions,
  Locale,
  LocalizedEvent,
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

export async function getEventsList(
  options: EventListQueryOptions
): Promise<PaginatedResponse<LocalizedEvent>> {
  const response = await apiGet<ApiSuccessResponse<LocalizedEvent[]>>(
    "/api/events",
    {
      query: {
        locale: options.locale,
        page: options.page,
        limit: options.limit,
        search: options.search,
        timeframe: options.timeframe,
      },
    }
  );

  return {
    items: response.data,
    meta: normalizePagination(response.meta),
  };
}

export async function getEventBySlug(
  slug: string,
  locale: Locale
): Promise<LocalizedEvent> {
  const response = await apiGet<ApiSuccessResponse<LocalizedEvent>>(
    `/api/events/${slug}`,
    {
      query: { locale },
    }
  );

  return response.data;
}
