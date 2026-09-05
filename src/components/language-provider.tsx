"use client";

import { Suspense, createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { copy, isLocale, type Locale } from "@/lib/content";
import { LANG_PARAM, localeFromSearch } from "@/lib/locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof copy)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("pc-locale", onStoreChange);
  window.addEventListener("popstate", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("pc-locale", onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
  };
}

function readLocale(): Locale {
  const fromUrl = localeFromSearch(window.location.search);
  if (fromUrl) return fromUrl;
  const stored = window.localStorage.getItem("pc-locale");
  return isLocale(stored) ? stored : "de";
}

function serverLocale(): Locale {
  return "de";
}

function LocaleRoutePing() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.dispatchEvent(new Event("pc-locale"));
  }, [pathname, searchParams]);

  return null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, serverLocale);

  const setLocale = useCallback((next: Locale) => {
    window.localStorage.setItem("pc-locale", next);
    document.documentElement.lang = next;
    const url = new URL(window.location.href);
    url.searchParams.set(LANG_PARAM, next);
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event("pc-locale"));
  }, []);

  useEffect(() => {
    const fromUrl = localeFromSearch(window.location.search);
    if (fromUrl) {
      window.localStorage.setItem("pc-locale", fromUrl);
      document.documentElement.lang = fromUrl;
      if (fromUrl !== locale) {
        window.dispatchEvent(new Event("pc-locale"));
      }
      return;
    }
    window.localStorage.setItem("pc-locale", locale);
    document.documentElement.lang = locale;
    const url = new URL(window.location.href);
    url.searchParams.set(LANG_PARAM, locale);
    window.history.replaceState(window.history.state, "", url);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: copy[locale],
    }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>
      <Suspense fallback={null}>
        <LocaleRoutePing />
      </Suspense>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must sit inside LanguageProvider");
  }
  return ctx;
}
