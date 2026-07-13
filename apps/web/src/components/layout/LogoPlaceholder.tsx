import type { Locale } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';

interface LogoPlaceholderProps {
  locale: Locale;
  size?: 'sm' | 'md' | 'lg';
}

export async function LogoPlaceholder({ locale, size = 'md' }: LogoPlaceholderProps) {
  const dict = getDictionary(locale);
  const isArabic = locale === 'ar';

  const sizeStyles = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  };

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${sizeStyles[size]} border-2 border-red-700 rounded-lg flex items-center justify-center bg-red-50 font-bold text-red-700 flex-shrink-0`}
      >
        <span>BRCS</span>
      </div>
      <div className="hidden sm:block">
        <div className={`${textSize[size]} font-bold text-gray-900 leading-tight`}>
          {isArabic ? dict.org.shortName : dict.org.shortName}
        </div>
      </div>
    </div>
  );
}
