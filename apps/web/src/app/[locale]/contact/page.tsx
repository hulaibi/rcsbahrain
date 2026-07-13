import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';

interface ContactPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.nav.contact,
    description: locale === 'ar'
      ? 'تواصل معنا'
      : 'Contact us',
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isArabic = locale === 'ar';

  return (
    <>
      <PageHero
        title={dict.nav.contact}
        description={isArabic
          ? 'نحن هنا للاستماع إليك'
          : 'We are here to listen'}
      />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <SectionHeading
                title={isArabic ? 'معلومات الاتصال' : 'Contact Information'}
                centered={false}
              />

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {isArabic ? 'الهاتف' : 'Phone'}
                  </h3>
                  <p className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded inline-block text-sm">
                    {dict.contact.phonePlaceholder}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {isArabic ? 'البريد الإلكتروني' : 'Email'}
                  </h3>
                  <p className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded inline-block text-sm">
                    {dict.contact.emailPlaceholder}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {isArabic ? 'العنوان' : 'Address'}
                  </h3>
                  <p className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded inline-block text-sm">
                    {dict.contact.addressPlaceholder}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {isArabic ? 'ساعات العمل' : 'Working Hours'}
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{isArabic ? 'السبت - الخميس:' : 'Sat - Thu:'} 8:00 AM - 5:00 PM</p>
                    <p>{isArabic ? 'الجمعة والعطل الرسمية:' : 'Fri & Holidays:'} {isArabic ? 'مغلق' : 'Closed'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <SectionHeading
                title={isArabic ? 'نموذج الاتصال' : 'Contact Form'}
                centered={false}
              />

              <div className="mt-8 bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {isArabic ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      disabled
                      placeholder={isArabic ? 'أدخل اسمك' : 'Enter your name'}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      disabled
                      placeholder={isArabic ? 'أدخل بريدك' : 'Enter your email'}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {isArabic ? 'الموضوع' : 'Subject'}
                    </label>
                    <input
                      type="text"
                      disabled
                      placeholder={isArabic ? 'موضوع الرسالة' : 'Message subject'}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {isArabic ? 'الرسالة' : 'Message'}
                    </label>
                    <textarea
                      disabled
                      placeholder={isArabic ? 'اكتب رسالتك' : 'Write your message'}
                      rows={5}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <button
                    type="button"
                    disabled
                    className="w-full px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg cursor-not-allowed"
                  >
                    {isArabic ? 'إرسال الرسالة' : 'Send Message'} (Coming Soon)
                  </button>
                </form>

                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <p className="text-sm text-yellow-800">
                    {isArabic
                      ? 'نموذج الاتصال قريباً - يرجى استخدام البيانات أعلاه للتواصل المباشر'
                      : 'Contact form coming soon - please use the information above to reach us'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-16">
            <SectionHeading
              title={isArabic ? 'موقعنا' : 'Our Location'}
              centered={false}
            />
            <div className="mt-8">
              <ImagePlaceholder
                height="400px"
                label={dict.contact.mapPlaceholder}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
