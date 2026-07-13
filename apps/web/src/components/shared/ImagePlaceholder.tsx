interface ImagePlaceholderProps {
  width?: string;
  height?: string;
  label?: string;
  className?: string;
}

export function ImagePlaceholder({
  width = '100%',
  height = '300px',
  label = 'Image Placeholder',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 ${className}`}
      style={{ width, height }}
    >
      <div className="text-center">
        <div className="text-gray-400 text-sm">{label}</div>
        <div className="text-gray-400 text-xs mt-1">Coming Soon</div>
      </div>
    </div>
  );
}
