import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface GetHelpPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: GetHelpPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.nav.getHelp,
    description: locale === 'ar'
      ? 'طلب المساعدة من جمعية الهلال الأحمر'
      : 'Request assistance from the Red Crescent Society',
  };
}

export default async function GetHelpPage({ params }: GetHelpPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isArabic = locale === 'ar';

  const steps = [
    {
      number: '1',
      title: isArabic ? 'التواصل' : 'Contact',
      description: isArabic
        ? 'تواصل معنا عبر الهاتف أو البريد الإلكتروني'
        : 'Contact us via phone or email',
    },
    {
      number: '2',
      title: isArabic ? 'التقييم' : 'Assessment',
      description: isArabic
        ? 'سيقوم فريقنا بتقييم احتياجاتك'
        : 'Our team will assess your needs',
    },
    {
      number: '3',
      title: isArabic ? 'المساعدة' : 'Support',
      description: isArabic
        ? 'سنقدم لك الدعم والمساعدة اللازمة'
        : 'We will provide you with necessary support',
    },
  ];

  return (
    <>
      <PageHero
        title={dict.nav.getHelp}
        description={isArabic
          ? 'نحن هنا لمساعدتك'
          : 'We are here to help you'}
      />

      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Process Steps */}
          <div className="mb-16">
            <SectionHeading
              title={isArabic ? 'عملية طلب المساعدة' : 'How to Get Help'}
              description={isArabic
                ? 'اتبع الخطوات التالية للحصول على المساعدة'
                : 'Follow these steps to get assistance'}
            />

            <div className="mt-12 space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-700 text-white font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isArabic ? 'المستندات المطلوبة' : 'Required Documents'}
            </h3>
            <p className="text-gray-600 mb-4">
              {isArabic
                ? dict.getHelp.documentPlaceholder
                : 'To process your request, we may need:'} 
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-red-700 font-bold mt-1">•</span>
                <span>{isArabic ? 'بطاقة الهوية' : 'National ID'}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-700 font-bold mt-1">•</span>
                <span>{isArabic ? 'الوثائق الداعمة' : 'Supporting documents'}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-700 font-bold mt-1">•</span>
                <span>{isArabic ? 'تفاصيل الاتصال' : 'Contact information'}</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <p className="text-sm text-yellow-800">
                {isArabic
                  ? dict.getHelp.documentPlaceholder
                  : 'Detailed requirements will be provided during consultation'}
              </p>
            </div>
          </div>

          {/* Application Form */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {isArabic ? 'نموذج طلب المساعدة' : 'Request Assistance Form'}
            </h3>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
              <p className="text-gray-600 mb-4">
                {isArabic
                  ? 'النموذج الإلكتروني قريباً - يرجى التواصل معنا مباشرة'
                  : 'Online form coming soon - please contact us directly'}
              </p>
              <button
                disabled
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold cursor-not-allowed"
              >
                {isArabic ? 'قدم طلبك' : 'Submit Request'} (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
