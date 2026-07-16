import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { EventCard } from '@/components/shared/EventCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Pagination } from '@/components/shared/Pagination';
import { ErrorState } from '@/components/shared/ErrorState';
import { getEventsList } from '@/lib/api/events';
import { ApiClientError } from '@/lib/api/client';
import { formatLocalizedDate } from '@/lib/format';
import type { Metadata } from 'next';
import Link from 'next/link';

interface EventsPageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    search?: string;
    upcomingPage?: string;
    pastPage?: string;
  }>;
}

export async function generateMetadata({ params }: EventsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.nav.events,
    description: dict.events.description,
    alternates: {
      canonical: `/${locale}/events`,
      languages: {
        ar: '/ar/events',
        en: '/en/events',
      },
    },
    openGraph: {
      title: dict.nav.events,
      description: dict.events.description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_BH' : 'en_BH',
    },
  };
}

function toPositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

function buildEventsHref(
  locale: Locale,
  search: string,
  upcomingPage: number,
  pastPage: number
): string {
  const query = new URLSearchParams();

  if (search.trim().length > 0) {
    query.set('search', search.trim());
  }

  if (upcomingPage > 1) {
    query.set('upcomingPage', String(upcomingPage));
  }

  if (pastPage > 1) {
    query.set('pastPage', String(pastPage));
  }

  const queryString = query.toString();
  return queryString.length > 0 ? `/${locale}/events?${queryString}` : `/${locale}/events`;
}

export default async function EventsPage({ params, searchParams }: EventsPageProps) {
  const { locale } = await params;
  const query = await searchParams;
  const dict = getDictionary(locale);
  const search = query.search ?? '';
  const upcomingPage = toPositiveInt(query.upcomingPage, 1);
  const pastPage = toPositiveInt(query.pastPage, 1);

  let requestFailed = false;
  let upcoming: Awaited<ReturnType<typeof getEventsList>> | null = null;
  let past: Awaited<ReturnType<typeof getEventsList>> | null = null;

  try {
    [upcoming, past] = await Promise.all([
      getEventsList({
        locale,
        search,
        timeframe: 'upcoming',
        page: upcomingPage,
        limit: 6,
      }),
      getEventsList({
        locale,
        search,
        timeframe: 'past',
        page: pastPage,
        limit: 6,
      }),
    ]);
  } catch (error) {
    if (error instanceof ApiClientError) {
      requestFailed = true;
    } else {
      throw error;
    }
  }

  if (requestFailed || !upcoming || !past) {
    return (
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState
            locale={locale}
            retryHref={buildEventsHref(locale, search, upcomingPage, pastPage)}
          />
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero title={dict.nav.events} description={dict.events.description} />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form className="mb-10 rounded-xl border border-gray-200 bg-white p-4 md:p-6">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <input
                type="search"
                name="search"
                defaultValue={search}
                placeholder={dict.news.searchPlaceholder}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-700 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800"
              >
                {dict.buttons.search}
              </button>
              <Link
                href={`/${locale}/events`}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                {dict.events.all}
              </Link>
            </div>
          </form>

          <div className="mb-16" id="upcoming-events">
            <SectionHeading
              title={dict.events.upcoming}
              description={locale === 'ar' ? 'لا تفوتك الأحداث القادمة' : "Don't miss our upcoming events"}
            />

            {upcoming.items.length > 0 ? (
              <>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcoming.items.map((event) => (
                    <EventCard
                      key={event.id}
                      title={event.title}
                      description={event.content}
                      date={formatLocalizedDate(event.startDate, locale)}
                      location={event.location ?? dict.events.location}
                      href={`/${locale}/events/${event.slug}`}
                      imageUrl={event.featuredImageUrl}
                      actionLabel={dict.buttons.readMore}
                    />
                  ))}
                </div>
                <Pagination
                  currentPage={upcoming.meta.page}
                  totalPages={upcoming.meta.totalPages}
                  labels={{
                    previous: dict.common.previous,
                    next: dict.common.next,
                    page: dict.common.page,
                  }}
                  buildHref={(nextPage) =>
                    buildEventsHref(locale, search, nextPage, past.meta.page)
                  }
                />
              </>
            ) : (
              <EmptyState
                title={dict.events.noUpcomingTitle}
                description={dict.events.noUpcomingDescription}
              />
            )}
          </div>

          <div id="past-events">
            <SectionHeading
              title={dict.events.past}
              description={locale === 'ar' ? 'استعرض الفعاليات التي نظمناها' : 'View events we have organized'}
            />

            {past.items.length > 0 ? (
              <>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {past.items.map((event) => (
                    <EventCard
                      key={event.id}
                      title={event.title}
                      description={event.content}
                      date={formatLocalizedDate(event.startDate, locale)}
                      location={event.location ?? dict.events.location}
                      href={`/${locale}/events/${event.slug}`}
                      imageUrl={event.featuredImageUrl}
                      actionLabel={dict.buttons.readMore}
                    />
                  ))}
                </div>
                <Pagination
                  currentPage={past.meta.page}
                  totalPages={past.meta.totalPages}
                  labels={{
                    previous: dict.common.previous,
                    next: dict.common.next,
                    page: dict.common.page,
                  }}
                  buildHref={(nextPage) =>
                    buildEventsHref(locale, search, upcoming.meta.page, nextPage)
                  }
                />
              </>
            ) : (
              <EmptyState
                title={dict.events.noPastTitle}
                description={dict.events.noPastDescription}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
