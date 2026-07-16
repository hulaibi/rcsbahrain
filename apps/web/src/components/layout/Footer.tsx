import Link from 'next/link';
import type { Locale } from '@/lib/locales';
import { isRTL } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';

interface FooterProps {
  locale: Locale;
}

export async function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);
  const rtl = isRTL(locale);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.services, href: `/${locale}/services` },
    { label: dict.nav.getHelp, href: `/${locale}/get-help` },
    { label: dict.nav.news, href: `/${locale}/news` },
  ];

  const serviceLinks = [
    { label: dict.services.firstAid.title, href: `/${locale}/services` },
    { label: dict.services.socialServices.title, href: `/${locale}/services` },
    { label: dict.services.bloodAwareness.title, href: `/${locale}/services` },
    { label: dict.services.healthAwareness.title, href: `/${locale}/services` },
  ];

  const legalLinks = [
    { label: dict.footer.privacy, href: `/${locale}/privacy-policy` },
    { label: dict.footer.terms, href: `/${locale}/terms-and-conditions` },
    { label: dict.footer.accessibility, href: `/${locale}/accessibility` },
  ];

  return (
    <footer
      className="bg-gray-900 text-gray-300 py-12 md:py-16"
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">{dict.org.shortName}</h3>
            <p className="text-sm leading-relaxed">{dict.org.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">{dict.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-red-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">{dict.footer.services}</h4>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-red-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">{dict.footer.contactInfo}</h4>
            <p className="text-xs text-yellow-600 mb-4 bg-yellow-900 bg-opacity-30 p-2 rounded">
              {dict.footer.notesPlaceholder}
            </p>
            <div className="space-y-2 text-sm mb-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block hover:text-red-500 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-sm text-center">
          <p>
            © {currentYear} {dict.org.name}. {dict.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
