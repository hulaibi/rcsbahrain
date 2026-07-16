export function getApiBaseUrl(): string {
  const value = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!value) {
    throw new Error(
      "Missing NEXT_PUBLIC_API_URL. Add it to apps/web/.env.local, for example: NEXT_PUBLIC_API_URL=http://localhost:5000"
    );
  }

  return value.replace(/\/+$/, "");
}
