import { ButtonLink } from './ButtonLink';
import Image from 'next/image';

interface NewsCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  href: string;
  imageUrl?: string | null;
  imageAlt?: string;
  actionLabel?: string;
}

export function NewsCard({
  title,
  excerpt,
  category,
  date,
  href,
  imageUrl,
  imageAlt,
  actionLabel = 'Read More',
}: NewsCardProps) {
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
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{excerpt}</p>
        <ButtonLink href={href} variant="outline" size="sm">
          {actionLabel}
        </ButtonLink>
      </div>
    </div>
  );
}
