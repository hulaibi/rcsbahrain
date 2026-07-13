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

  const navItems = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.services, href: `/${locale}/services` },
    { label: dict.nav.getHelp, href: `/${locale}/get-help` },
    { label: dict.nav.getInvolved, href: `/${locale}/get-involved` },
    { label: dict.nav.news, href: `/${locale}/news` },
    { label: dict.nav.events, href: `/${locale}/events` },
    { label: dict.nav.media, href: `/${locale}/media` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
        className={`fixed top-16 z-50 w-64 bg-white shadow-lg transition-all duration-300 ${
          rtl ? 'right-0' : 'left-0'
        } ${isOpen ? 'translate-x-0' : rtl ? 'translate-x-full' : '-translate-x-full'}`}
      >
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
