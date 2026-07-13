import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isValidLocale, isRTL } from '@/lib/locales';
import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const dict = getDictionary(locale);
  const isArabic = locale === 'ar';

  return {
    title: {
      default: dict.org.name,
      template: `%s | ${dict.org.name}`,
    },
    description: dict.org.description,
    keywords: isArabic
      ? 'الهلال الأحمر البحريني، جمعية خيرية، منظمة إنسانية'
      : 'Bahrain Red Crescent Society, charity, humanitarian organization',
    icons: {
      icon: '/logo.png',
      shortcut: '/logo.png',
      apple: '/logo.png',
    },
    openGraph: {
      title: dict.org.name,
      description: dict.org.description,
      type: 'website',
      locale: isArabic ? 'ar_BH' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.org.name,
      description: dict.org.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const rtl = isRTL(locale);

  return (
    <html
      lang={locale}
      dir={rtl ? 'rtl' : 'ltr'}
      className={rtl ? 'rtl' : 'ltr'}
    >
      <body className="bg-white text-gray-900 font-sans">
        <div className="flex flex-col min-h-screen">
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}
