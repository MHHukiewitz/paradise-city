import type { Locale } from "@/lib/content";
import type { ExchangeRates } from "@/lib/rates";

export const PRICE_ROWS = {
  week: 2_190_000,
  month: 5_490_000,
  twoMonths: 4_990_000,
  romantico: 3_990_000,
} as const;

export type PriceRowId = keyof typeof PRICE_ROWS;

export const PRICE_EXTRAS = {
  cleaning: 199_000,
  transfer: 399_000,
} as const;

export function isPriceRowId(value: string): value is PriceRowId {
  return value in PRICE_ROWS;
}

function numberLocale(locale: Locale) {
  if (locale === "en") return "en-US";
  if (locale === "es") return "es-PY";
  return "de-DE";
}

export function formatAmount(amount: number, locale: Locale) {
  return new Intl.NumberFormat(numberLocale(locale)).format(amount);
}

export function formatGs(amount: number, locale: Locale) {
  return `${formatAmount(amount, locale)} Gs`;
}

export function convertGs(amount: number, rates: ExchangeRates) {
  const usd = amount / rates.pygPerUsd;
  const eur = usd * rates.eurPerUsd;
  return {
    usd: Math.round(usd),
    eur: Math.round(eur),
  };
}

export function formatFx(amount: number, rates: ExchangeRates, locale: Locale) {
  const converted = convertGs(amount, rates);
  return `≈ ${formatAmount(converted.usd, locale)} USD · ${formatAmount(converted.eur, locale)} EUR`;
}

export function formatPrice(amount: number, locale: Locale, rates: ExchangeRates | null) {
  const gs = formatGs(amount, locale);
  if (!rates) return gs;
  return `${gs} (${formatFx(amount, rates, locale)})`;
}
