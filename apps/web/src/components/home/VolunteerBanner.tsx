import Link from 'next/link';
import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';

interface VolunteerBannerProps {
  locale: Locale;
}

export async function VolunteerBanner({ locale }: VolunteerBannerProps) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-gradient-to-r from-red-700 to-red-800 py-16 md:py-20 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          {dict.home.volunteerBannerTitle}
        </h2>
        <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto">
          {dict.home.volunteerBannerDescription}
        </p>
        <Link
          href={`/${locale}/get-involved`}
          className="inline-flex items-center px-8 py-3 bg-white text-red-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          {dict.buttons.volunteer}
        </Link>
      </div>
    </section>
  );
}
