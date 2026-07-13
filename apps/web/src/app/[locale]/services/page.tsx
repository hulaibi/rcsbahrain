import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ServiceCard } from '@/components/shared/ServiceCard';

interface ServicesPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.nav.services,
    description: locale === 'ar'
      ? 'خدماتنا الإنسانية الشاملة'
      : 'Our comprehensive humanitarian services',
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const services = [
    {
      title: dict.services.firstAid.title,
      description: dict.services.firstAid.description,
      details: locale === 'ar'
        ? 'تدريب شامل في الإسعافات الأولية للأفراد والمؤسسات'
        : 'Comprehensive first aid training for individuals and organizations',
    },
    {
      title: dict.services.socialServices.title,
      description: dict.services.socialServices.description,
      details: locale === 'ar'
        ? 'خدمات اجتماعية متكاملة للفئات المحتاجة'
        : 'Integrated social services for vulnerable populations',
    },
    {
      title: dict.services.bloodAwareness.title,
      description: dict.services.bloodAwareness.description,
      details: locale === 'ar'
        ? 'برامج توعية وحملات تبرع بالدم'
        : 'Blood donation awareness programs and campaigns',
    },
    {
      title: dict.services.healthAwareness.title,
      description: dict.services.healthAwareness.description,
      details: locale === 'ar'
        ? 'برامج توعية صحية شاملة'
        : 'Comprehensive health awareness programs',
    },
    {
      title: dict.services.restoringLinks.title,
      description: dict.services.restoringLinks.description,
      details: locale === 'ar'
        ? 'مساعدة في إعادة الاتصال بين أفراد الأسرة المنفصلين'
        : 'Assistance in reconnecting separated family members',
    },
    {
      title: dict.services.disasterResponse.title,
      description: dict.services.disasterResponse.description,
      details: locale === 'ar'
        ? 'استجابة سريعة في حالات الكوارث والطوارئ'
        : 'Rapid response in disasters and emergencies',
    },
  ];

  return (
    <>
      <PageHero
        title={dict.nav.services}
        description={locale === 'ar'
          ? 'الخدمات الإنسانية الشاملة التي تقدمها جمعية الهلال الأحمر البحريني'
          : 'Our comprehensive humanitarian services'}
      />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionHeading
              title={locale === 'ar' ? 'خدماتنا الرئيسية' : 'Our Services'}
              description={locale === 'ar'
                ? 'نقدم مجموعة شاملة من الخدمات الإنسانية'
                : 'We offer a comprehensive range of humanitarian services'}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="space-y-4">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  href="#"
                />
                <p className="text-gray-600 text-sm px-4">
                  {service.details}
                </p>
              </div>
            ))}
          </div>

          {/* How to Access */}
          <div className="mt-16 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {locale === 'ar' ? 'كيفية الوصول للخدمات' : 'How to Access Our Services'}
            </h3>
            <p className="text-gray-700 mb-4">
              {locale === 'ar'
                ? 'يمكنك التواصل معنا مباشرة أو زيارة مكاتبنا'
                : 'You can contact us directly or visit our offices'}
            </p>
            <a
              href={`/${locale}/contact`}
              className="text-blue-700 hover:text-blue-800 font-semibold"
            >
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'} →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
