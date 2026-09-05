import { LOCALES, isLocale, type Locale } from "@/lib/content";

export const LANG_PARAM = "lang";

export function localeFromSearch(search: string): Locale | null {
  const query = search.startsWith("?") ? search.slice(1) : search;
  const value = new URLSearchParams(query).get(LANG_PARAM);
  return isLocale(value) ? value : null;
}

export function withLocale(href: string, locale: Locale): string {
  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const queryIndex = withoutHash.indexOf("?");
  const path = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  const query = queryIndex >= 0 ? withoutHash.slice(queryIndex + 1) : "";
  const params = new URLSearchParams(query);
  params.set(LANG_PARAM, locale);
  return `${path}?${params.toString()}${hash}`;
}

export function languageUrls(path: string, origin: string) {
  return Object.fromEntries(LOCALES.map((locale) => [locale, withLocale(`${origin}${path}`, locale)])) as Record<
    Locale,
    string
  >;
}
