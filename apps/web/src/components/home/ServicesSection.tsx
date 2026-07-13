import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { ButtonLink } from '@/components/shared/ButtonLink';

interface ServicesSectionProps {
  locale: Locale;
}

export async function ServicesSection({ locale }: ServicesSectionProps) {
  const dict = getDictionary(locale);

  const services = [
    {
      title: dict.services.firstAid.title,
      description: dict.services.firstAid.description,
    },
    {
      title: dict.services.socialServices.title,
      description: dict.services.socialServices.description,
    },
    {
      title: dict.services.bloodAwareness.title,
      description: dict.services.bloodAwareness.description,
    },
    {
      title: dict.services.healthAwareness.title,
      description: dict.services.healthAwareness.description,
    },
    {
      title: dict.services.restoringLinks.title,
      description: dict.services.restoringLinks.description,
    },
    {
      title: dict.services.disasterResponse.title,
      description: dict.services.disasterResponse.description,
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={dict.home.servicesTitle}
          description={dict.home.servicesDescription}
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              href={`/${locale}/services`}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <ButtonLink
            href={`/${locale}/services`}
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
