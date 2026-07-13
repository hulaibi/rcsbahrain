import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.nav.about,
    description: dict.org.description,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        title={dict.nav.about}
        description={dict.home.aboutPreview}
      />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Mission */}
            <div>
              <SectionHeading
                title={dict.org.mission}
                centered={false}
              />
              <p className="text-lg text-gray-600 leading-relaxed mt-4">
                {dict.org.mission}
              </p>
            </div>

            {/* Vision */}
            <div>
              <SectionHeading
                title={dict.org.vision}
                centered={false}
              />
              <p className="text-lg text-gray-600 leading-relaxed mt-4">
                {dict.org.vision}
              </p>
            </div>

            {/* Core Values */}
            <div>
              <SectionHeading
                title={locale === 'ar' ? 'القيم الأساسية' : 'Core Values'}
                centered={false}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {[
                  {
                    title: locale === 'ar' ? 'الإنسانية' : 'Humanity',
                    description: locale === 'ar'
                      ? 'نضع الإنسان في مركز جميع أعمالنا'
                      : 'We place humanity at the center of everything we do',
                  },
                  {
                    title: locale === 'ar' ? 'الحياد' : 'Neutrality',
                    description: locale === 'ar'
                      ? 'نقدم خدماتنا دون تمييز'
                      : 'We provide our services without discrimination',
                  },
                  {
                    title: locale === 'ar' ? 'الاستقلالية' : 'Independence',
                    description: locale === 'ar'
                      ? 'نحافظ على استقلاليتنا في القرار'
                      : 'We maintain independence in our decision-making',
                  },
                  {
                    title: locale === 'ar' ? 'التطوع' : 'Volunteerism',
                    description: locale === 'ar'
                      ? 'نعتمد على العمل التطوعي'
                      : 'We rely on the spirit of volunteering',
                  },
                ].map((value, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-red-700 hover:shadow-md transition-all"
                  >
                    <h4 className="font-bold text-lg text-gray-900 mb-2">
                      {value.title}
                    </h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Organization Info */}
            <div>
              <SectionHeading
                title={locale === 'ar' ? 'من نحن' : 'About Our Organization'}
                centered={false}
              />
              <p className="text-lg text-gray-600 leading-relaxed mt-4">
                {dict.org.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
