import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { EventCard } from '@/components/shared/EventCard';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { getEventsList } from '@/lib/api/events';
import { formatLocalizedDate } from '@/lib/format';

interface UpcomingEventsProps {
  locale: Locale;
}

export async function UpcomingEvents({ locale }: UpcomingEventsProps) {
  const dict = getDictionary(locale);

  interface UpcomingEventItem {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    href: string;
    imageUrl: string | null;
  }

  const fallbackEvents = [
    {
      title: locale === 'ar' ? 'دورة الإسعافات الأولية' : 'First Aid Training Course',
      description: locale === 'ar'
        ? 'دورة تدريبية شاملة في الإسعافات الأولية الأساسية'
        : 'Comprehensive training course on basic first aid',
      date: locale === 'ar' ? '15 يناير' : 'Jan 15',
      location: locale === 'ar' ? 'مقر الجمعية - المنامة' : 'BRCS Headquarters - Manama',
    },
    {
      title: locale === 'ar' ? 'حملة جمع التبرعات' : 'Fundraising Campaign',
      description: locale === 'ar'
        ? 'حملة خيرية لجمع التبرعات لدعم برامجنا الإنسانية'
        : 'Charity campaign to support humanitarian programs',
      date: locale === 'ar' ? '20 يناير' : 'Jan 20',
      location: locale === 'ar' ? 'مختلف المواقع' : 'Multiple Locations',
    },
    {
      title: locale === 'ar' ? 'يوم التطوع الوطني' : 'National Volunteer Day',
      description: locale === 'ar'
        ? 'احتفالنا باليوم العالمي للتطوع مع أنشطة مجتمعية متنوعة'
        : 'Celebrate International Volunteer Day with community activities',
      date: locale === 'ar' ? '25 يناير' : 'Jan 25',
      location: locale === 'ar' ? 'الحديقة المركزية - المنامة' : 'Central Park - Manama',
    },
  ];

  let eventItems: UpcomingEventItem[] = fallbackEvents.map((item, index) => ({
    id: `fallback-${index}`,
    title: item.title,
    description: item.description,
    date: item.date,
    location: item.location,
    href: `/${locale}/events`,
    imageUrl: null,
  }));

  try {
    const response = await getEventsList({
      locale,
      page: 1,
      limit: 3,
      timeframe: 'upcoming',
    });

    if (response.items.length > 0) {
      eventItems = response.items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.content,
        date: formatLocalizedDate(item.startDate, locale),
        location: item.location ?? dict.events.location,
        href: `/${locale}/events/${item.slug}`,
        imageUrl: item.featuredImageUrl,
      }));
    }
  } catch {
    // Keep static fallback cards when the API is unavailable.
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={dict.home.eventsTitle}
          description={dict.home.eventsDescription}
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventItems.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
              href={event.href}
              imageUrl={event.imageUrl}
              actionLabel={dict.buttons.readMore}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <ButtonLink
            href={`/${locale}/events`}
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
