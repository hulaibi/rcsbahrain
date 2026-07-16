import { ButtonLink } from './ButtonLink';
import Image from 'next/image';

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  location: string;
  href: string;
  imageUrl?: string | null;
  imageAlt?: string;
  actionLabel?: string;
}

export function EventCard({
  title,
  description,
  date,
  location,
  href,
  imageUrl,
  imageAlt,
  actionLabel = 'Register',
}: EventCardProps) {
  const resolvedImage = imageUrl && imageUrl.trim().length > 0 ? imageUrl : '/bhrc.png';

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 md:h-40">
        <Image
          src={resolvedImage}
          alt={imageAlt ?? title}
          width={640}
          height={360}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="mb-4">
          <div className="inline-block bg-red-100 text-red-700 font-bold px-4 py-2 rounded-lg">
            {date}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-1">{location}</p>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <ButtonLink href={href} variant="primary" size="sm">
          {actionLabel}
        </ButtonLink>
      </div>
    </div>
  );
}
