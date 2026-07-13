import { ButtonLink } from './ButtonLink';

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  location: string;
  href: string;
}

export function EventCard({
  title,
  description,
  date,
  location,
  href,
}: EventCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <div className="inline-block bg-red-100 text-red-700 font-bold px-4 py-2 rounded-lg">
          {date}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-3">{location}</p>
      <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
      <ButtonLink href={href} variant="primary" size="sm">
        Register
      </ButtonLink>
    </div>
  );
}
