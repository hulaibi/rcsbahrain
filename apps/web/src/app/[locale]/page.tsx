import type { Locale } from '@/lib/locales';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutPreview } from '@/components/home/AboutPreview';
import { ServicesSection } from '@/components/home/ServicesSection';
import { ImpactStats } from '@/components/home/ImpactStats';
import { LatestNews } from '@/components/home/LatestNews';
import { UpcomingEvents } from '@/components/home/UpcomingEvents';
import { VolunteerBanner } from '@/components/home/VolunteerBanner';
import { DonateBanner } from '@/components/home/DonateBanner';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <>
      <HeroSection locale={locale} />
      <AboutPreview locale={locale} />
      <ServicesSection locale={locale} />
      <ImpactStats locale={locale} />
      <LatestNews locale={locale} />
      <UpcomingEvents locale={locale} />
      <VolunteerBanner locale={locale} />
      <DonateBanner locale={locale} />
    </>
  );
}
