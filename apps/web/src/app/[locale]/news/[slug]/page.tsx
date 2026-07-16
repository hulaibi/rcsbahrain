import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { ApiClientError } from '@/lib/api/client';
import { getNewsBySlug } from '@/lib/api/news';
import { CmsContent } from '@/components/shared/CmsContent';
import { ErrorState } from '@/components/shared/ErrorState';
import { formatLocalizedDate } from '@/lib/format';

interface NewsDetailsPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({
  params,
}: NewsDetailsPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = getDictionary(locale);

  try {
    const news = await getNewsBySlug(slug, locale);

    return {
      title: news.title,
      description: news.excerpt ?? dict.news.description,
      alternates: {
        canonical: `/${locale}/news/${slug}`,
        languages: {
          ar: `/ar/news/${slug}`,
          en: `/en/news/${slug}`,
        },
      },
      openGraph: {
        title: news.title,
        description: news.excerpt ?? dict.news.description,
        type: 'article',
        locale: locale === 'ar' ? 'ar_BH' : 'en_BH',
        images: news.featuredImageUrl
          ? [
              {
                url: news.featuredImageUrl,
                alt: news.title,
              },
            ]
          : undefined,
      },
    };
  } catch {
    return {
      title: dict.nav.news,
      description: dict.news.description,
    };
  }
}

export default async function NewsDetailsPage({ params }: NewsDetailsPageProps) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale);

  let requestFailed = false;
  let news: Awaited<ReturnType<typeof getNewsBySlug>> | null = null;

  try {
    news = await getNewsBySlug(slug, locale);
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

  if (requestFailed || !news) {
    return (
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState locale={locale} retryHref={`/${locale}/news/${slug}`} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/news`}
          className="mb-8 inline-flex items-center text-sm font-semibold text-red-700 hover:text-red-800"
        >
          ← {dict.news.backToNews}
        </Link>

        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
            {news.category ?? dict.news.category}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{news.title}</h1>
          <time dateTime={news.publishedAt ?? undefined} className="text-sm text-gray-600">
            {dict.common.publishedOn}: {formatLocalizedDate(news.publishedAt, locale)}
          </time>
        </header>

        <div className="mt-8">
          <CmsContent content={news.content} />
        </div>
      </article>
    </section>
  );
}
