interface CmsContentProps {
  content: string;
  className?: string;
}

export function CmsContent({ content, className = "" }: CmsContentProps) {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-5 text-lg leading-relaxed text-gray-700 ${className}`}>
      {paragraphs.map((paragraph, index) => (
        <p key={`${paragraph.slice(0, 20)}-${index}`} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
