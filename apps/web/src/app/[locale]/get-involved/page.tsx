import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ButtonLink } from '@/components/shared/ButtonLink';

interface GetInvolvedPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: GetInvolvedPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.nav.getInvolved,
    description: locale === 'ar'
      ? 'انضم إلينا وساهم في أعمالنا الخيرية'
      : 'Join us and contribute to our humanitarian work',
  };
}

export default async function GetInvolvedPage({ params }: GetInvolvedPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isArabic = locale === 'ar';

  return (
    <>
      <PageHero
        title={dict.nav.getInvolved}
        description={isArabic
          ? 'هناك عدة طرق للمشاركة والمساهمة'
          : 'There are several ways to participate'}
      />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Volunteers */}
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-red-700 hover:shadow-lg transition-all">
              <div className="bg-red-50 p-6 text-center">
                <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 12H9m0 0l3-3m-3 3l-3-3m3 3l3 3m-3-3l-3 3"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {dict.getInvolved.volunteerSection}
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {dict.getInvolved.volunteerDesc}
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-700">✓</span>
                    <span>{isArabic ? 'لا توجد متطلبات تعليمية محددة' : 'No specific education required'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-700">✓</span>
                    <span>{isArabic ? 'تدريب مجاني' : 'Free training provided'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-700">✓</span>
                    <span>{isArabic ? 'مرونة في الوقت' : 'Flexible schedule'}</span>
                  </li>
                </ul>
                <ButtonLink
                  href={`/${locale}/contact`}
                  variant="primary"
                  fullWidth
                >
                  {dict.getInvolved.participationCards.volunteer}
                </ButtonLink>
              </div>
            </div>

            {/* Membership */}
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-red-700 hover:shadow-lg transition-all">
              <div className="bg-red-50 p-6 text-center">
                <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {dict.getInvolved.membershipSection}
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {dict.getInvolved.membershipDesc}
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-700">✓</span>
                    <span>{isArabic ? 'عضوية رسمية' : 'Official membership'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-700">✓</span>
                    <span>{isArabic ? 'المشاركة في الأحداث' : 'Event participation'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-700">✓</span>
                    <span>{isArabic ? 'الوصول إلى الموارد' : 'Resource access'}</span>
                  </li>
                </ul>
                <ButtonLink
                  href={`/${locale}/contact`}
                  variant="primary"
                  fullWidth
                >
                  {dict.getInvolved.participationCards.member}
                </ButtonLink>
              </div>
            </div>

            {/* Partnership */}
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-red-700 hover:shadow-lg transition-all">
              <div className="bg-red-50 p-6 text-center">
                <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {dict.getInvolved.partnershipSection}
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {dict.getInvolved.partnershipDesc}
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-700">✓</span>
                    <span>{isArabic ? 'تعاون مؤسسي' : 'Institutional cooperation'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-700">✓</span>
                    <span>{isArabic ? 'مشاريع مشتركة' : 'Joint projects'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-700">✓</span>
                    <span>{isArabic ? 'تأثير مجتمعي' : 'Community impact'}</span>
                  </li>
                </ul>
                <ButtonLink
                  href={`/${locale}/contact`}
                  variant="primary"
                  fullWidth
                >
                  {dict.getInvolved.participationCards.partner}
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {isArabic ? 'أسئلة أخرى؟' : 'More Questions?'}
            </h3>
            <p className="text-gray-700">
              {isArabic
                ? 'تواصل معنا للحصول على مزيد من المعلومات'
                : 'Contact us for more information'}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
