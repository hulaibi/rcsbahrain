import { ButtonLink } from './ButtonLink';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: string;
  href?: string;
}

export function ServiceCard({
  title,
  description,
  href = '#',
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
          <span className="text-red-700 text-xl">✓</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
      <ButtonLink href={href} variant="outline" size="sm">
        Learn More
      </ButtonLink>
    </div>
  );
}
