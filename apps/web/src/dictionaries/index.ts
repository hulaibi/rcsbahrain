import type { Locale } from '@/lib/locales';
import { ar } from './ar';
import { en } from './en';

const dictionaries = {
  ar,
  en,
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.ar;
}

export type Dictionary = typeof ar;
