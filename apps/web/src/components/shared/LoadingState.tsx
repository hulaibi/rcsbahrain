import type { Locale } from "@/lib/locales";

interface LoadingStateProps {
  locale: Locale;
  message?: string;
}

export function LoadingState({ locale, message }: LoadingStateProps) {
  const text =
    message ??
    (locale === "ar" ? "جاري تحميل المحتوى..." : "Loading content...");

  return (
    <div
      className="flex min-h-[240px] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 text-gray-600">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-red-700" />
        <span className="text-base font-medium">{text}</span>
      </div>
    </div>
  );
}
