import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { EventCard } from '@/components/shared/EventCard';
import { EmptyState } from '@/components/shared/EmptyState';

interface EventsPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: EventsPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.nav.events,
    description: locale === 'ar'
      ? 'الأحداث والفعاليات القادمة'
      : 'Upcoming events and activities',
  };
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isArabic = locale === 'ar';

  const upcomingEvents = [
    {
      title: isArabic ? 'دورة الإسعافات الأولية' : 'First Aid Training Course',
      description: isArabic
        ? 'دورة تدريبية شاملة في الإسعافات الأولية الأساسية'
        : 'Comprehensive training course on basic first aid',
      date: isArabic ? '15 يناير' : 'Jan 15',
      location: isArabic ? 'مقر الجمعية - المنامة' : 'BRCS Headquarters - Manama',
    },
    {
      title: isArabic ? 'حملة جمع التبرعات' : 'Fundraising Campaign',
      description: isArabic
        ? 'حملة خيرية لجمع التبرعات'
        : 'Charity campaign to support humanitarian programs',
      date: isArabic ? '20 يناير' : 'Jan 20',
      location: isArabic ? 'مختلف المواقع' : 'Multiple Locations',
    },
    {
      title: isArabic ? 'يوم التطوع الوطني' : 'National Volunteer Day',
      description: isArabic
        ? 'احتفالنا باليوم العالمي للتطوع'
        : 'Celebrate International Volunteer Day',
      date: isArabic ? '25 يناير' : 'Jan 25',
      location: isArabic ? 'الحديقة المركزية - المنامة' : 'Central Park - Manama',
    },
  ];

  const pastEvents = [
    {
      title: isArabic ? 'حملة التبرع بالدم' : 'Blood Donation Campaign',
      description: isArabic
        ? 'حملة تبرع بالدم الشهرية'
        : 'Monthly blood donation campaign',
      date: isArabic ? '10 يناير' : 'Jan 10',
      location: isArabic ? 'مقر الجمعية' : 'Headquarters',
    },
    {
      title: isArabic ? 'ندوة صحية' : 'Health Seminar',
      description: isArabic
        ? 'ندوة عن الصحة الوقائية'
        : 'Seminar on preventive health',
      date: isArabic ? '5 يناير' : 'Jan 5',
      location: isArabic ? 'مركز المجتمع' : 'Community Center',
    },
    {
      title: isArabic ? 'تدريب المتطوعين' : 'Volunteer Training',
      description: isArabic
        ? 'برنامج تدريب للمتطوعين الجدد'
        : 'Training program for new volunteers',
      date: isArabic ? '25 ديسمبر' : 'Dec 25',
      location: isArabic ? 'مقر الجمعية' : 'Headquarters',
    },
  ];

  return (
    <>
      <PageHero
        title={dict.nav.events}
        description={isArabic
          ? 'الأحداث والفعاليات'
          : 'Events and activities'}
      />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upcoming Events */}
          <div className="mb-16">
            <SectionHeading
              title={isArabic ? 'الفعاليات القادمة' : 'Upcoming Events'}
              description={isArabic
                ? 'لا تفوتك الأحداث القادمة'
                : "Don't miss our upcoming events"}
            />

            {upcomingEvents.length > 0 ? (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    title={event.title}
                    description={event.description}
                    date={event.date}
                    location={event.location}
                    href="#"
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title={isArabic ? 'لا توجد فعاليات قادمة' : 'No Upcoming Events'}
                description={isArabic
                  ? 'سيتم إضافة فعاليات قريباً'
                  : 'Events will be added soon'}
              />
            )}
          </div>

          {/* Past Events */}
          <div>
            <SectionHeading
              title={isArabic ? 'الفعاليات السابقة' : 'Past Events'}
              description={isArabic
                ? 'استعرض الفعاليات التي نظمناها'
                : 'View events we have organized'}
            />

            {pastEvents.length > 0 ? (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    title={event.title}
                    description={event.description}
                    date={event.date}
                    location={event.location}
                    href="#"
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title={isArabic ? 'لا توجد فعاليات سابقة' : 'No Past Events'}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
