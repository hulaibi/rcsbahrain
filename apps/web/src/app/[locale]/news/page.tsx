import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { NewsCard } from '@/components/shared/NewsCard';
import { EmptyState } from '@/components/shared/EmptyState';

interface NewsPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: NewsPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.nav.news,
    description: locale === 'ar'
      ? 'آخر الأخبار والتحديثات'
      : 'Latest news and updates',
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isArabic = locale === 'ar';

  const mockNews = [
    {
      title: isArabic ? 'تدشين برنامج جديد للتوعية الصحية' : 'Launch of New Health Awareness Program',
      excerpt: isArabic
        ? 'بدأت جمعية الهلال الأحمر البحريني برنامجاً جديداً يهدف إلى زيادة الوعي الصحي في المجتمع'
        : 'The Red Crescent Society launched a new program to increase health awareness',
      category: isArabic ? 'إعلان' : 'Announcement',
      date: '2024-01-15',
    },
    {
      title: isArabic ? 'حملة متطوعين ناجحة' : 'Successful Volunteer Campaign',
      excerpt: isArabic
        ? 'تطوع أكثر من 1000 متطوع في الحملة الأخيرة'
        : 'Over 1000 volunteers participated in recent campaign',
      category: isArabic ? 'قصص الخير' : 'Success Stories',
      date: '2024-01-10',
    },
    {
      title: isArabic ? 'تقرير سنوي جديد' : 'New Annual Report',
      excerpt: isArabic
        ? 'نشرت الجمعية تقريرها السنوي'
        : 'Society published its annual report',
      category: isArabic ? 'تقارير' : 'Reports',
      date: '2024-01-05',
    },
    {
      title: isArabic ? 'افتتاح مركز جديد' : 'New Center Opening',
      excerpt: isArabic
        ? 'تم افتتاح مركز خدمة جديد'
        : 'New service center has been opened',
      category: isArabic ? 'إعلان' : 'Announcement',
      date: '2024-01-01',
    },
    {
      title: isArabic ? 'برنامج تدريب متخصص' : 'Specialized Training Program',
      excerpt: isArabic
        ? 'إطلاق برنامج تدريب متخصص في الإسعافات الأولية'
        : 'Launch of specialized first aid training program',
      category: isArabic ? 'برامج' : 'Programs',
      date: '2023-12-28',
    },
    {
      title: isArabic ? 'شراكة استراتيجية' : 'Strategic Partnership',
      excerpt: isArabic
        ? 'توقيع اتفاقية شراكة مع منظمة دولية'
        : 'Signing of partnership agreement with international organization',
      category: isArabic ? 'تعاون' : 'Collaboration',
      date: '2023-12-25',
    },
  ];

  const categories = [isArabic ? 'الكل' : 'All', ...(isArabic 
    ? ['إعلانات', 'قصص الخير', 'تقارير', 'برامج', 'تعاون']
    : ['Announcements', 'Success Stories', 'Reports', 'Programs', 'Collaboration']
  )];

  return (
    <>
      <PageHero
        title={dict.nav.news}
        description={isArabic
          ? 'آخر الأخبار والتحديثات من جمعية الهلال الأحمر'
          : 'Latest news and updates from Red Crescent Society'}
      />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isArabic ? 'الفئات' : 'Categories'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    index === 0
                      ? 'bg-red-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* News Grid */}
          {mockNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockNews.map((news, index) => (
                <NewsCard
                  key={index}
                  title={news.title}
                  excerpt={news.excerpt}
                  category={news.category}
                  date={news.date}
                  href="#"
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title={isArabic ? 'لا توجد أخبار' : 'No News Available'}
              description={isArabic
                ? 'سيتم نشر الأخبار قريباً'
                : 'News will be published soon'}
            />
          )}
        </div>
      </section>
    </>
  );
}
