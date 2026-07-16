import { apiGet } from "@/lib/api/client";
import type {
  ApiSuccessResponse,
  Locale,
  LocalizedPage,
} from "@/lib/api/types";

export async function getPageBySlug(
  slug: string,
  locale: Locale
): Promise<LocalizedPage> {
  const response = await apiGet<ApiSuccessResponse<LocalizedPage>>(
    `/api/pages/${slug}`,
    {
      query: { locale },
    }
  );

  return response.data;
}
