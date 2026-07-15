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
  const isArabic = locale === 'ar';

  const navItems = [
    {
      label: isArabic ? 'الرئيسية' : 'Home',
      href: `/${locale}`,
    },
    {
      label: isArabic ? 'من نحن' : 'About Us',
      href: `/${locale}/about`,
      children: [
        {
          label: isArabic ? 'تاريخ الجمعية' : 'Society History',
          href: `/${locale}/about#history`,
        },
        {
          label: isArabic ? 'مبادئ الجمعية' : 'Society Principles',
          href: `/${locale}/about#principles`,
        },
        {
          label: isArabic ? 'أعضاء مجلس الإدارة' : 'Board Members',
          href: `/${locale}/about#board-members`,
        },
        {
          label: isArabic ? 'قوانين الجمعية' : 'Society Regulations',
          href: `/${locale}/about#regulations`,
        },
      ],
    },
    {
      label: isArabic ? 'كن معنا' : 'Get Involved',
      href: `/${locale}/get-involved`,
      children: [
        {
          label: isArabic ? 'كن متطوعا' : 'Become a Volunteer',
          href: `/${locale}/get-involved#volunteer`,
        },
        {
          label: isArabic ? 'المشاركة مع المؤسسات' : 'Institutional Partnerships',
          href: `/${locale}/get-involved#institutions`,
        },
        {
          label: isArabic ? 'المبادرة' : 'Initiatives',
          href: `/${locale}/get-involved#initiative`,
        },
      ],
    },
    {
      label: isArabic ? 'المساعدات' : 'Get Help',
      href: `/${locale}/get-help`,
      children: [
        {
          label: isArabic ? 'الخدمات الاجتماعية' : 'Social Services',
          href: `/${locale}/get-help#social-services`,
        },
        {
          label: isArabic ? 'التوعية الصحية' : 'Health Awareness',
          href: `/${locale}/get-help#health-awareness`,
        },
        {
          label: isArabic ? 'الناشئة والشباب' : 'Young and Youth',
          href: `/${locale}/get-help#young-and-youth`,
        },
        {
          label: isArabic ? 'بنك الدم' : 'Blood Bank',
          href: `/${locale}/get-help#blood-bank`,
        },
        {
          label: isArabic ? 'الإسعافات الأولية' : 'First Aid',
          href: `/${locale}/get-help#first-aid`,
        },
        {
          label: isArabic ? 'المساعدات الخارجية' : 'Foreign Aid',
          href: `/${locale}/get-help#foreign-aid`,
        },
        {
          label: isArabic ? 'استعادة الروابط العائلية' : 'Restoring Family Links',
          href: `/${locale}/get-help#restoring-family-links`,
        },
      ],
    },
    {
      label: isArabic ? 'الأحداث' : 'Events',
      href: `/${locale}/events`,
    },
    {
      label: isArabic ? 'المركز الإعلامي' : 'Media Center',
      href: `/${locale}/media`,
    },
    {
      label: isArabic ? 'اتصل بنا' : 'Contact Us',
      href: `/${locale}/contact`,
    },
  ];

  const advisoryLabel = isArabic ? 'تنبيه مباشر' : 'LIVE ADVISORY FEED';
  const advisoryMessage = isArabic
    ? 'تحذير: موجة حر شديدة'
    : 'Extreme Heat Wave Warning';
  const emergencyHubLabel = isArabic ? 'مركز تنبيهات الطوارئ' : 'Emergency Alerts Hub';

  return (
    <header
      className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm"
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div className="bg-[#c90012] text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="rounded bg-white/15 px-2 py-1 font-semibold uppercase tracking-wide">
              {advisoryLabel}
            </span>
            <span className="truncate font-semibold">{advisoryMessage}</span>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <Link
              href={`/${locale}/get-help`}
              className="inline-flex items-center gap-1.5 font-semibold hover:opacity-90"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 3l8 3v6c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10V6l8-3z" />
              </svg>
              <span>{emergencyHubLabel}</span>
            </Link>
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.11 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.63a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.45-1.28a2 2 0 0 1 2.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>17293171 / 17293145</span>
            </span>
          </div>
        </div>
      </div>

      <div
        className="bg-[#f4f4f4]"
        style={{
          backgroundImage: "url('/backgr.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="flex min-w-0 items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-red-100 bg-white shadow-sm sm:h-20 sm:w-20">
              <Image
                src="/logo.png"
                alt="Bahrain Red Crescent Society"
                width={56}
                height={56}
                className="h-12 w-12 sm:h-14 sm:w-14"
                priority
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xl font-bold text-slate-900">
                {dict.org.name}
              </p>
              <p className="truncate text-sm font-semibold text-slate-500">
                {isArabic
                  ? 'الإنسانية • الحياد • الاستقلالية'
                  : 'Humanity • Impartiality • Neutrality • Independence'}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher currentLocale={locale} />
            </div>
            <Link
              href={`/${locale}/donate`}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M12 21s-7-4.35-9.5-8A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 7C19 16.65 12 21 12 21z" />
              </svg>
              {isArabic ? 'تبرع' : 'Donate'}
            </Link>

            <MobileMenu locale={locale} dict={dict} />
          </div>
        </div>
      </div>

      <div className="hidden border-t border-slate-200 bg-white lg:block">
        <nav className="mx-auto flex h-14 max-w-7xl items-stretch justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {navItems.map((item) => (
            <div key={item.href} className="group relative flex items-center">
              <Link
                href={item.href}
                className="inline-flex h-full items-center gap-2 text-lg font-semibold text-slate-600 transition hover:text-red-700"
              >
                <span>{item.label}</span>
                {item.children ? (
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="h-4 w-4 transition group-hover:text-red-700"
                    fill="currentColor"
                  >
                    <path d="M5.25 7.5 10 12.25 14.75 7.5" />
                  </svg>
                ) : null}
              </Link>

              {item.children ? (
                <div className="pointer-events-none absolute top-full z-50 min-w-64 translate-y-2 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-700"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
