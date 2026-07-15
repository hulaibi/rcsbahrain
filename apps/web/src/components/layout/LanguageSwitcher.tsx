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
          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition-colors ${
            currentLocale === locale
              ? 'border-red-200 bg-white text-red-700'
              : 'border-slate-200 bg-white text-slate-600 hover:border-red-100 hover:text-red-700'
          }`}
          aria-label={`Switch to ${labels[locale]}`}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M3 12h18M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9zm0 0a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
          </svg>
          {labels[locale]}
        </Link>
      ))}
    </div>
  );
}
