interface SectionHeadingProps {
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`space-y-3 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
      {description && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
