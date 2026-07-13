import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';

interface MediaPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: MediaPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.nav.media,
    description: locale === 'ar'
      ? 'الصور والفيديوهات والمنشورات'
      : 'Photos, videos and publications',
  };
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isArabic = locale === 'ar';

  const mockMedia = [
    { title: isArabic ? 'الصورة 1' : 'Photo 1' },
    { title: isArabic ? 'الصورة 2' : 'Photo 2' },
    { title: isArabic ? 'الصورة 3' : 'Photo 3' },
    { title: isArabic ? 'الصورة 4' : 'Photo 4' },
    { title: isArabic ? 'الصورة 5' : 'Photo 5' },
    { title: isArabic ? 'الصورة 6' : 'Photo 6' },
  ];

  return (
    <>
      <PageHero
        title={dict.nav.media}
        description={isArabic
          ? 'استعرض مجموعتنا من الصور والفيديوهات'
          : 'Browse our collection of photos and videos'}
      />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Media Tabs */}
          <div className="mb-12">
            <div className="flex gap-4 border-b border-gray-200">
              {[
                { label: isArabic ? 'الصور' : 'Photos', active: true },
                { label: isArabic ? 'الفيديوهات' : 'Videos', active: false },
                { label: isArabic ? 'المنشورات' : 'Publications', active: false },
              ].map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                    tab.active
                      ? 'text-red-700 border-red-700'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photos Gallery */}
          <div>
            <SectionHeading
              title={isArabic ? 'معرض الصور' : 'Photo Gallery'}
              centered={false}
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockMedia.map((item, index) => (
                <div
                  key={index}
                  className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <ImagePlaceholder
                    height="300px"
                    label={item.title}
                  />
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {isArabic ? 'انقر للعرض' : 'Click to view'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Videos Section */}
          <div className="mt-16">
            <SectionHeading
              title={isArabic ? 'الفيديوهات' : 'Videos'}
              centered={false}
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <ImagePlaceholder
                    height="250px"
                    label={`${isArabic ? 'فيديو' : 'Video'} ${item}`}
                  />
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold text-gray-900">
                      {isArabic ? `الفيديو ${item}` : `Video ${item}`}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publications Section */}
          <div className="mt-16">
            <SectionHeading
              title={isArabic ? 'المنشورات' : 'Publications'}
              centered={false}
            />

            <div className="mt-12 space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="p-4 border border-gray-200 rounded-lg hover:border-red-700 hover:shadow-md transition-all flex items-start gap-4"
                >
                  <div className="w-16 h-20 flex-shrink-0 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {isArabic ? `المنشور ${item}` : `Publication ${item}`}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {isArabic
                        ? 'تفاصيل المنشور'
                        : 'Publication details'}
                    </p>
                    <button className="text-red-700 hover:text-red-800 font-semibold text-sm">
                      {isArabic ? 'تحميل' : 'Download'} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-16 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
            <p className="text-yellow-800">
              <strong>{isArabic ? 'ملاحظة:' : 'Note:'}</strong> {isArabic
                ? 'سيتم تحديث معرض الوسائط بشكل منتظم'
                : 'Media gallery will be updated regularly'}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
