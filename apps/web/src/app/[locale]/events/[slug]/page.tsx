import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { ApiClientError } from '@/lib/api/client';
import { getEventBySlug } from '@/lib/api/events';
import { CmsContent } from '@/components/shared/CmsContent';
import { ErrorState } from '@/components/shared/ErrorState';
import { formatLocalizedDateTime } from '@/lib/format';

interface EventDetailsPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({
  params,
}: EventDetailsPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = getDictionary(locale);

  try {
    const event = await getEventBySlug(slug, locale);

    return {
      title: event.title,
      description: event.content,
      alternates: {
        canonical: `/${locale}/events/${slug}`,
        languages: {
          ar: `/ar/events/${slug}`,
          en: `/en/events/${slug}`,
        },
      },
      openGraph: {
        title: event.title,
        description: event.content,
        type: 'article',
        locale: locale === 'ar' ? 'ar_BH' : 'en_BH',
        images: event.featuredImageUrl
          ? [
              {
                url: event.featuredImageUrl,
                alt: event.title,
              },
            ]
          : undefined,
      },
    };
  } catch {
    return {
      title: dict.nav.events,
      description: dict.events.description,
    };
  }
}

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale);

  let requestFailed = false;
  let event: Awaited<ReturnType<typeof getEventBySlug>> | null = null;

  try {
    event = await getEventBySlug(slug, locale);
  } catch (error) {
    if (error instanceof ApiClientError && error.statusCode === 404) {
      notFound();
    }

    if (error instanceof ApiClientError) {
      requestFailed = true;
    } else {
      throw error;
    }
  }

  if (requestFailed || !event) {
    return (
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState locale={locale} retryHref={`/${locale}/events/${slug}`} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/events`}
          className="mb-8 inline-flex items-center text-sm font-semibold text-red-700 hover:text-red-800"
        >
          ← {dict.events.backToEvents}
        </Link>

        <header className="space-y-3 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{event.title}</h1>
          <p className="text-sm text-gray-700">
            {dict.common.startsOn}: <time dateTime={event.startDate}>{formatLocalizedDateTime(event.startDate, locale)}</time>
          </p>
          {event.endDate ? (
            <p className="text-sm text-gray-700">
              {dict.common.endsOn}: <time dateTime={event.endDate}>{formatLocalizedDateTime(event.endDate, locale)}</time>
            </p>
          ) : null}
          {event.location ? (
            <p className="text-sm text-gray-700">{dict.events.location}: {event.location}</p>
          ) : null}
        </header>

        <div className="mt-8">
          <CmsContent content={event.content} />
        </div>

        {event.registrationUrl ? (
          <div className="mt-10">
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
            >
              {dict.events.registerExternal}
            </a>
          </div>
        ) : null}
      </article>
    </section>
  );
}
