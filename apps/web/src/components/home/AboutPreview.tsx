import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ButtonLink } from '@/components/shared/ButtonLink';

interface AboutPreviewProps {
  locale: Locale;
}

export async function AboutPreview({ locale }: AboutPreviewProps) {
  const dict = getDictionary(locale);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-6">
            <SectionHeading
              title={dict.home.aboutTitle}
              description={undefined}
              centered={false}
            />
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">{dict.home.aboutPreview}</p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">{dict.org.mission}</h4>
                <p className="text-sm">{dict.org.mission}</p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="font-bold text-gray-900 mb-2">{dict.org.vision}</h4>
                <p className="text-sm">{dict.org.vision}</p>
              </div>
            </div>
            <ButtonLink href={`/${locale}/about`} variant="primary">
              {dict.buttons.learnMore}
            </ButtonLink>
          </div>

          {/* Right */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-8 md:p-12 text-center">
            <div className="text-red-700 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {dict.org.shortName}
            </h3>
            <p className="text-gray-700">{dict.org.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
