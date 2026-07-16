'use client';

import { useParams } from 'next/navigation';
import { LoadingState } from '@/components/shared/LoadingState';

export default function LocaleLoading() {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale === 'en' ? 'en' : 'ar';

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <LoadingState locale={locale} />
      </div>
    </section>
  );
}
