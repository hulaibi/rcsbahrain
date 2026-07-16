import Link from "next/link";
import type { Locale } from "@/lib/locales";

interface ErrorStateProps {
  locale: Locale;
  title?: string;
  description?: string;
  retryHref?: string;
  retryLabel?: string;
}

export function ErrorState({
  locale,
  title,
  description,
  retryHref,
  retryLabel,
}: ErrorStateProps) {
  const resolvedTitle =
    title ??
    (locale === "ar"
      ? "تعذر تحميل المحتوى حاليًا."
      : "Unable to load content at the moment.");

  const resolvedDescription =
    description ??
    (locale === "ar"
      ? "يرجى المحاولة مرة أخرى بعد قليل."
      : "Please try again in a moment.");

  const resolvedRetryLabel =
    retryLabel ?? (locale === "ar" ? "إعادة المحاولة" : "Retry");

  return (
    <div
      className="rounded-xl border border-red-100 bg-red-50 p-6 text-center"
      role="alert"
    >
      <h2 className="text-xl font-bold text-red-900">{resolvedTitle}</h2>
      <p className="mt-2 text-red-800">{resolvedDescription}</p>
      {retryHref ? (
        <div className="mt-5">
          <Link
            href={retryHref}
            className="inline-flex items-center rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
          >
            {resolvedRetryLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
