import type { Locale } from "@/lib/locales";

function getLocaleTag(locale: Locale): "ar-BH" | "en-BH" {
  return locale === "ar" ? "ar-BH" : "en-BH";
}

export function formatLocalizedDate(
  dateInput: string | null | undefined,
  locale: Locale
): string {
  if (!dateInput) {
    return locale === "ar" ? "تاريخ غير متوفر" : "Date unavailable";
  }

  const date = new Date(dateInput);

  if (Number.isNaN(date.getTime())) {
    return locale === "ar" ? "تاريخ غير صالح" : "Invalid date";
  }

  return new Intl.DateTimeFormat(getLocaleTag(locale), {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatLocalizedDateTime(
  dateInput: string | null | undefined,
  locale: Locale
): string {
  if (!dateInput) {
    return locale === "ar" ? "تاريخ غير متوفر" : "Date unavailable";
  }

  const date = new Date(dateInput);

  if (Number.isNaN(date.getTime())) {
    return locale === "ar" ? "تاريخ غير صالح" : "Invalid date";
  }

  return new Intl.DateTimeFormat(getLocaleTag(locale), {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
