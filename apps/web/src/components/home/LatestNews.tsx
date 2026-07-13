import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { NewsCard } from '@/components/shared/NewsCard';
import { ButtonLink } from '@/components/shared/ButtonLink';

interface LatestNewsProps {
  locale: Locale;
}

export async function LatestNews({ locale }: LatestNewsProps) {
  const dict = getDictionary(locale);

  const mockNews = [
    {
      title: locale === 'ar' ? 'تدشين برنامج جديد للتوعية الصحية' : 'Launch of New Health Awareness Program',
      excerpt: locale === 'ar' 
        ? 'بدأت جمعية الهلال الأحمر البحريني برنامجاً جديداً يهدف إلى زيادة الوعي الصحي في المجتمع'
        : 'The Red Crescent Society launched a new program to increase health awareness in the community',
      category: locale === 'ar' ? 'إعلان' : 'Announcement',
      date: '2024-01-15',
    },
    {
      title: locale === 'ar' ? 'حملة متطوعين ناجحة لخدمة المجتمع' : 'Successful Volunteer Campaign',
      excerpt: locale === 'ar'
        ? 'تطوع أكثر من 1000 متطوع في الحملة الأخيرة لخدمة المحتاجين'
        : 'Over 1000 volunteers participated in recent community service campaign',
      category: locale === 'ar' ? 'قصص الخير' : 'Success Stories',
      date: '2024-01-10',
    },
    {
      title: locale === 'ar' ? 'تقرير سنوي: إنجازاتنا وتطلعاتنا' : 'Annual Report: Achievements and Vision',
      excerpt: locale === 'ar'
        ? 'نشرت الجمعية تقريرها السنوي الذي يوضح الإنجازات والخطط المستقبلية'
        : 'Society published its annual report highlighting achievements and future plans',
      category: locale === 'ar' ? 'تقارير' : 'Reports',
      date: '2024-01-05',
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={dict.home.newsTitle}
          description={dict.home.newsDescription}
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNews.map((news, index) => (
            <NewsCard
              key={index}
              title={news.title}
              excerpt={news.excerpt}
              category={news.category}
              date={news.date}
              href={`/${locale}/news`}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <ButtonLink
            href={`/${locale}/news`}
            variant="primary"
            size="lg"
          >
            {dict.buttons.viewAll}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
