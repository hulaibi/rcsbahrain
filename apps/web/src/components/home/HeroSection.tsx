import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';

interface HeroSectionProps {
  locale: Locale;
}

export async function HeroSection({ locale }: HeroSectionProps) {
  const dict = getDictionary(locale);

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24 lg:py-32"
      style={{
        backgroundImage: "url('/backgr.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-white/40" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {dict.hero.heading}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {dict.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={`/${locale}/get-help`}
                className="inline-flex items-center justify-center px-6 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors"
              >
                {dict.hero.requestHelp}
              </Link>
              <Link
                href={`/${locale}/get-involved`}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-red-700 text-red-700 font-semibold rounded-lg hover:bg-red-50 transition-colors"
              >
                {dict.hero.volunteer}
              </Link>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-3xl border border-red-100 bg-white shadow-xl">
              <Image
                src="/bhrc.png"
                alt="Bahrain Red Crescent humanitarian support scene"
                width={1024}
                height={1024}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
