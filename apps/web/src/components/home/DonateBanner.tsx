import Link from 'next/link';
import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';

interface DonateBannerProps {
  locale: Locale;
}

export async function DonateBanner({ locale }: DonateBannerProps) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 md:py-20 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          {dict.home.donateBannerTitle}
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          {dict.home.donateBannerDescription}
        </p>
        <Link
          href={`/${locale}/donate`}
          className="inline-flex items-center px-8 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors"
        >
          {dict.buttons.donate}
        </Link>
      </div>
    </section>
  );
}
