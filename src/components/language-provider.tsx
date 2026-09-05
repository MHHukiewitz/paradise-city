"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { copy, isLocale, type Locale } from "@/lib/content";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof copy)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("pc-locale", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("pc-locale", onStoreChange);
  };
}

function readLocale(): Locale {
  const stored = window.localStorage.getItem("pc-locale");
  return isLocale(stored) ? stored : "de";
}

function serverLocale(): Locale {
  return "de";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, serverLocale);

  const setLocale = useCallback((next: Locale) => {
    window.localStorage.setItem("pc-locale", next);
    document.documentElement.lang = next;
    window.dispatchEvent(new Event("pc-locale"));
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: copy[locale],
    }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must sit inside LanguageProvider");
  }
  return ctx;
}
