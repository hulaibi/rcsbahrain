import { getApiBaseUrl } from "@/lib/config";
import type { ApiErrorResponse } from "@/lib/api/types";

type QueryValue = string | number | boolean | null | undefined;

interface RequestOptions {
  query?: Record<string, QueryValue>;
  revalidate?: number;
}

export class ApiClientError extends Error {
  public readonly statusCode: number;
  public readonly isNetworkError: boolean;

  constructor(message: string, statusCode: number, isNetworkError = false) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
    this.isNetworkError = isNetworkError;
  }
}

function buildUrl(path: string, query?: Record<string, QueryValue>): string {
  const baseUrl = getApiBaseUrl();
  const url = new URL(path, baseUrl);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === "") {
        continue;
      }

      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

function parseErrorMessage(payload: unknown): string {
  if (typeof payload !== "object" || payload === null) {
    return "Unable to load content at the moment.";
  }

  const error = payload as Partial<ApiErrorResponse>;

  if (typeof error.message === "string" && error.message.trim().length > 0) {
    return error.message;
  }

  return "Unable to load content at the moment.";
}

export async function apiGet<TResponse>(
  path: string,
  options: RequestOptions = {}
): Promise<TResponse> {
  const url = buildUrl(path, options.query);

  try {
    const response = await fetch(url, {
      method: "GET",
      next: { revalidate: options.revalidate ?? 60 },
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      throw new ApiClientError(parseErrorMessage(payload), response.status);
    }

    const parsed = (await response.json()) as TResponse;
    return parsed;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    throw new ApiClientError(
      "Unable to connect to the content service.",
      0,
      true
    );
  }
}
