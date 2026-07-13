import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/locales';
import { isRTL } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  locale: Locale;
}

export async function Header({ locale }: HeaderProps) {
  const dict = getDictionary(locale);
  const rtl = isRTL(locale);

  const navItems = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.services, href: `/${locale}/services` },
    { label: dict.nav.getInvolved, href: `/${locale}/get-involved` },
    { label: dict.nav.news, href: `/${locale}/news` },
    { label: dict.nav.events, href: `/${locale}/events` },
    { label: dict.nav.media, href: `/${locale}/media` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <header
      className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm"
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Bahrain Red Crescent Society"
              width={56}
              height={56}
              className="h-14 w-14 md:h-16 md:w-16"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Language Switcher + Buttons + Mobile Menu */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} />

            {/* CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href={`/${locale}/get-help`}
                className="px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                {dict.buttons.getHelp}
              </Link>
              <Link
                href={`/${locale}/donate`}
                className="px-4 py-2 text-sm font-medium bg-red-700 text-white hover:bg-red-800 rounded-lg transition-colors"
              >
                {dict.buttons.donate}
              </Link>
            </div>

            {/* Mobile Menu */}
            <MobileMenu locale={locale} dict={dict} />
          </div>
        </div>
      </div>
    </header>
  );
}
