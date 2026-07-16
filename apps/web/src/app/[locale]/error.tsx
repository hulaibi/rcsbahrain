'use client';

import { useParams } from 'next/navigation';

interface LocaleErrorProps {
  reset: () => void;
}

export default function LocaleError({ reset }: LocaleErrorProps) {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale === 'en' ? 'en' : 'ar';

  const title =
    locale === 'ar'
      ? 'تعذر تحميل المحتوى حاليًا.'
      : 'Unable to load content at the moment.';
  const buttonLabel = locale === 'ar' ? 'إعادة المحاولة' : 'Try Again';

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center" role="alert">
          <h1 className="text-2xl font-bold text-red-900">{title}</h1>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
