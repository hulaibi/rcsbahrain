import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface ImpactStatsProps {
  locale: Locale;
}

export async function ImpactStats({ locale }: ImpactStatsProps) {
  const dict = getDictionary(locale);

  const stats = [
    {
      number: '5,000+',
      label: dict.home.volunteers,
    },
    {
      number: '50,000+',
      label: dict.home.beneficiaries,
    },
    {
      number: '200+',
      label: dict.home.trainingCourses,
    },
    {
      number: '100+',
      label: dict.home.initiatives,
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={dict.home.impactTitle}
          description={dict.home.impactDescription}
        />

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-700 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> {dict.home.impactDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
