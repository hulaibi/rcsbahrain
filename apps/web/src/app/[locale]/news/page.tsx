import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { PageHero } from '@/components/shared/PageHero';
import { NewsCard } from '@/components/shared/NewsCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Pagination } from '@/components/shared/Pagination';
import { ErrorState } from '@/components/shared/ErrorState';
import { getNewsList } from '@/lib/api/news';
import { formatLocalizedDate } from '@/lib/format';
import { ApiClientError } from '@/lib/api/client';
import type { Metadata } from 'next';
import Link from 'next/link';

interface NewsPageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.nav.news,
    description: dict.news.description,
    alternates: {
      canonical: `/${locale}/news`,
      languages: {
        ar: '/ar/news',
        en: '/en/news',
      },
    },
    openGraph: {
      title: dict.nav.news,
      description: dict.news.description,
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

function buildNewsHref(locale: Locale, search: string, category: string, page: number): string {
  const query = new URLSearchParams();

  if (search.trim().length > 0) {
    query.set('search', search.trim());
  }

  if (category.trim().length > 0) {
    query.set('category', category.trim());
  }

  if (page > 1) {
    query.set('page', String(page));
  }

  const queryString = query.toString();
  return queryString.length > 0 ? `/${locale}/news?${queryString}` : `/${locale}/news`;
}

export default async function NewsPage({ params, searchParams }: NewsPageProps) {
  const { locale } = await params;
  const query = await searchParams;
  const dict = getDictionary(locale);
  const page = toPositiveInt(query.page, 1);
  const search = query.search ?? '';
  const category = query.category ?? '';

  let requestFailed = false;
  let result: Awaited<ReturnType<typeof getNewsList>> | null = null;

  try {
    result = await getNewsList({
      locale,
      page,
      limit: 9,
      search,
      category,
    });
  } catch (error) {
    if (error instanceof ApiClientError) {
      requestFailed = true;
    } else {
      throw error;
    }
  }

  if (requestFailed || !result) {
    return (
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState
            locale={locale}
            retryHref={buildNewsHref(locale, search, category, page)}
          />
        </div>
      </section>
    );
  }

  const categories = Array.from(
    new Set(result.items.map((item) => item.category).filter((item): item is string => !!item))
  );

  return (
    <>
      <PageHero title={dict.nav.news} description={dict.news.description} />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form className="mb-10 rounded-xl border border-gray-200 bg-white p-4 md:p-6">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <input
                type="search"
                name="search"
                defaultValue={search}
                placeholder={dict.news.searchPlaceholder}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-700 focus:outline-none"
              />
              <input
                type="text"
                name="category"
                defaultValue={category}
                placeholder={dict.news.categoryPlaceholder}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-700 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800"
              >
                {dict.buttons.search}
              </button>
              <Link
                href={`/${locale}/news`}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                {dict.news.allNews}
              </Link>
            </div>
            {categories.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((categoryItem) => (
                  <Link
                    key={categoryItem}
                    href={buildNewsHref(locale, search, categoryItem, 1)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      categoryItem === category
                        ? 'bg-red-700 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {categoryItem}
                  </Link>
                ))}
              </div>
            ) : null}
          </form>

          {result.items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.items.map((news) => (
                  <NewsCard
                    key={news.id}
                    title={news.title}
                    excerpt={news.excerpt ?? ''}
                    category={news.category ?? dict.news.category}
                    date={formatLocalizedDate(news.publishedAt, locale)}
                    href={`/${locale}/news/${news.slug}`}
                    imageUrl={news.featuredImageUrl}
                    actionLabel={dict.buttons.readMore}
                  />
                ))}
              </div>

              <Pagination
                currentPage={result.meta.page}
                totalPages={result.meta.totalPages}
                labels={{
                  previous: dict.common.previous,
                  next: dict.common.next,
                  page: dict.common.page,
                }}
                buildHref={(nextPage) => buildNewsHref(locale, search, category, nextPage)}
              />
            </>
          ) : (
            <EmptyState
              title={dict.news.noNewsTitle}
              description={dict.news.noNewsDescription}
            />
          )}
        </div>
      </section>
    </>
  );
}
