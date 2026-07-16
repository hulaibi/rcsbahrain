'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function LocaleNotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale === 'en' ? 'en' : 'ar';

  const title =
    locale === 'ar'
      ? 'الصفحة المطلوبة غير موجودة.'
      : 'The requested page could not be found.';
  const backLabel = locale === 'ar' ? 'العودة إلى الرئيسية' : 'Back to Home';

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">404</h1>
          <p className="mt-3 text-lg text-gray-700">{title}</p>
          <Link
            href={`/${locale}`}
            className="mt-6 inline-flex items-center rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
