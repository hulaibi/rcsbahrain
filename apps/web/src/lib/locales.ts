export type Locale = 'ar' | 'en';

export const locales: Locale[] = ['ar', 'en'];
export const defaultLocale: Locale = 'ar';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function isRTL(locale: Locale): boolean {
  return locale === 'ar';
}

export function isLTR(locale: Locale): boolean {
  return locale === 'en';
}
