'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/lib/locales';
import { locales } from '@/lib/locales';

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();

  const getNewPathname = (locale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const labels: Record<Locale, string> = {
    ar: 'العربية',
    en: 'English',
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getNewPathname(locale)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentLocale === locale
              ? 'bg-red-700 text-white'
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          }`}
          aria-label={`Switch to ${labels[locale]}`}
        >
          {labels[locale]}
        </Link>
      ))}
    </div>
  );
}
