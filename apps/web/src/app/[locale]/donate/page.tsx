import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface DonatePageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: DonatePageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.buttons.donate,
    description: locale === 'ar'
      ? 'تبرع لدعم أعمالنا الخيرية'
      : 'Donate to support our humanitarian work',
  };
}

export default async function DonatePage({ params }: DonatePageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isArabic = locale === 'ar';

  const impactItems = [
    {
      amount: 'BD 10',
      impact: isArabic ? 'يساعد في تدريب متطوع واحد' : 'Helps train one volunteer',
    },
    {
      amount: 'BD 50',
      impact: isArabic ? 'يوفر مستلزمات إسعافات أولية' : 'Provides first aid supplies',
    },
    {
      amount: 'BD 100',
      impact: isArabic ? 'يدعم برنامج توعية صحية' : 'Supports health awareness program',
    },
    {
      amount: 'BD 500',
      impact: isArabic ? 'يساعد عائلة محتاجة لشهر' : 'Helps a family for a month',
    },
  ];

  return (
    <>
      <PageHero
        title={dict.buttons.donate}
        description={isArabic
          ? 'ساهم في دعم أعمالنا الإنسانية'
          : 'Support our humanitarian mission'}
      />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Impact Section */}
          <div className="mb-16">
            <SectionHeading
              title={isArabic ? 'تأثير تبرعك' : 'Your Donation Impact'}
              description={isArabic
                ? 'كل تبرع يحدث فرقاً'
                : 'Every donation makes a difference'}
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl font-bold text-red-700 mb-2">
                    {item.amount}
                  </div>
                  <p className="text-gray-700">{item.impact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-16">
            <SectionHeading
              title={isArabic ? 'طرق الدفع' : 'Payment Methods'}
              description={isArabic
                ? 'اختر الطريقة المناسبة لك'
                : 'Choose your preferred method'}
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bank Transfer */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-red-700 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {isArabic ? 'التحويل البنكي' : 'Bank Transfer'}
                </h3>
                <div className="space-y-4 text-gray-600 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">{isArabic ? 'اسم الحساب' : 'Account Name'}:</p>
                    <p className="text-yellow-600 bg-yellow-50 p-2 rounded mt-1">
                      {dict.donate.bankPlaceholder}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{isArabic ? 'رقم الحساب' : 'Account Number'}:</p>
                    <p className="text-yellow-600 bg-yellow-50 p-2 rounded mt-1">
                      {dict.donate.bankPlaceholder}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{isArabic ? 'اسم البنك' : 'Bank Name'}:</p>
                    <p className="text-yellow-600 bg-yellow-50 p-2 rounded mt-1">
                      {dict.donate.bankPlaceholder}
                    </p>
                  </div>
                </div>
              </div>

              {/* BenefitPay */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-red-700 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  BenefitPay
                </h3>
                <div className="space-y-4 text-gray-600 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">{isArabic ? 'رقم الهاتف' : 'Phone Number'}:</p>
                    <p className="text-yellow-600 bg-yellow-50 p-2 rounded mt-1">
                      {dict.donate.benefitPayPlaceholder}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{isArabic ? 'الرقم المرجعي' : 'Reference Number'}:</p>
                    <p className="text-yellow-600 bg-yellow-50 p-2 rounded mt-1">
                      {dict.donate.benefitPayPlaceholder}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{isArabic ? 'البريد الإلكتروني' : 'Email Address'}:</p>
                    <p className="text-yellow-600 bg-yellow-50 p-2 rounded mt-1">
                      {dict.donate.benefitPayPlaceholder}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Online Donation Form */}
          <div className="mb-16">
            <SectionHeading
              title={isArabic ? 'التبرع الإلكتروني' : 'Online Donation'}
              centered={false}
            />

            <div className="mt-12 bg-gray-50 p-12 rounded-lg border-2 border-dashed border-gray-300 text-center">
              <div className="mb-4 text-4xl">💳</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isArabic ? 'منصة التبرع الإلكترونية' : 'Online Donation Platform'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isArabic
                  ? 'قريباً: منصة تبرع آمنة مع دعم بطاقات الائتمان'
                  : 'Coming Soon: Secure payment gateway with credit card support'}
              </p>
              <button
                disabled
                className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold cursor-not-allowed"
              >
                {isArabic ? 'تبرع الآن' : 'Donate Now'} (Coming Soon)
              </button>
            </div>
          </div>

          {/* Tax Relief */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {isArabic ? 'خصم ضريبي' : 'Tax Relief'}
            </h3>
            <p className="text-gray-700 mb-3">
              {isArabic
                ? 'تبرعاتك قد تكون مؤهلة للخصم الضريبي. يرجى الاحتفاظ بالإيصال'
                : 'Your donations may be eligible for tax relief. Please retain receipts'}
            </p>
            <p className="text-blue-700 font-semibold">
              {isArabic ? 'اتصل بنا للمزيد من المعلومات' : 'Contact us for more information'}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
