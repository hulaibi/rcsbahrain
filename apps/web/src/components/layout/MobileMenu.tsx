'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/locales';
import { isRTL } from '@/lib/locales';
import { getDictionary } from '@/dictionaries';

interface MobileMenuProps {
  locale: Locale;
  dict: ReturnType<typeof getDictionary>;
}

export function MobileMenu({ locale, dict }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rtl = isRTL(locale);
  const isArabic = locale === 'ar';

  const navItems = [
    { label: isArabic ? 'الرئيسية' : 'Home', href: `/${locale}` },
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
    { label: isArabic ? 'الأحداث' : 'Events', href: `/${locale}/events` },
    {
      label: isArabic ? 'المركز الإعلامي' : 'Media Center',
      href: `/${locale}/media`,
    },
    { label: isArabic ? 'اتصل بنا' : 'Contact Us', href: `/${locale}/contact` },
  ];

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md p-2 text-slate-600 hover:bg-white hover:text-red-700"
        aria-label={dict.common.menu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-50 ${
            rtl ? 'right-0' : 'left-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 z-50 h-screen w-72 bg-white pt-24 shadow-lg transition-all duration-300 ${
          rtl ? 'right-0' : 'left-0'
        } ${isOpen ? 'translate-x-0' : rtl ? 'translate-x-full' : '-translate-x-full'}`}
      >
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            item.children ? (
              <details key={item.href} className="rounded-xl bg-slate-50 px-2 py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-2 py-3 text-base font-semibold text-slate-700">
                  <span>{item.label}</span>
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M5.25 7.5 10 12.25 14.75 7.5" />
                  </svg>
                </summary>
                <div className="pb-2">
                  <Link
                    href={item.href}
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-700"
                    onClick={() => setIsOpen(false)}
                  >
                    {isArabic ? 'عرض الصفحة' : 'Open page'}
                  </Link>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => setIsOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-4 py-2 text-gray-700 transition-colors hover:bg-red-50 hover:text-red-700"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>
      </div>
    </div>
  );
}
