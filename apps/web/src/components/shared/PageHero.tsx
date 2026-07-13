import { ImagePlaceholder } from './ImagePlaceholder';

interface PageHeroProps {
  title: string;
  description?: string;
  image?: boolean;
}

export function PageHero({ title, description, image = true }: PageHeroProps) {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
            )}
          </div>
          {image && (
            <div className="hidden lg:block">
              <ImagePlaceholder
                width="100%"
                height="400px"
                label="Page Hero Image"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
