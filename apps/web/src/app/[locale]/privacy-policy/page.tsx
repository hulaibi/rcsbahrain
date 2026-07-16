import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { ApiClientError } from '@/lib/api/client';
import { getPageBySlug } from '@/lib/api/pages';
import { CmsContent } from '@/components/shared/CmsContent';
import { ErrorState } from '@/components/shared/ErrorState';
import { PageHero } from '@/components/shared/PageHero';

interface PrivacyPolicyPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  try {
    const page = await getPageBySlug('privacy-policy', locale);

    return {
      title: page.title,
      description: page.excerpt ?? dict.footer.privacy,
      alternates: {
        canonical: `/${locale}/privacy-policy`,
        languages: {
          ar: '/ar/privacy-policy',
          en: '/en/privacy-policy',
        },
      },
    };
  } catch {
    return {
      title: dict.footer.privacy,
      description: dict.footer.privacy,
    };
  }
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params;

  let requestFailed = false;
  let page: Awaited<ReturnType<typeof getPageBySlug>> | null = null;

  try {
    page = await getPageBySlug('privacy-policy', locale);
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

  if (requestFailed || !page) {
    return (
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState locale={locale} retryHref={`/${locale}/privacy-policy`} />
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero title={page.title} description={page.excerpt ?? undefined} />
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CmsContent content={page.content} />
        </div>
      </section>
    </>
  );
}
