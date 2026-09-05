"use client";

import { useEffect, useState } from "react";
import { cn } from "cn";
import { useLanguage } from "@/components/language-provider";
import {
  PRICE_EXTRAS,
  PRICE_ROWS,
  formatFx,
  formatGs,
  formatPrice,
  isPriceRowId,
} from "@/lib/prices";
import type { ExchangeRates } from "@/lib/rates";

function dateLabel(iso: string, locale: string) {
  if (!iso) return "";
  const date = new Date(iso);
  const tag = locale === "de" ? "de-DE" : locale === "es" ? "es-PY" : "en-GB";
  return date.toLocaleDateString(tag, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function PriceTable({
  className,
  amountSize = "md",
}: {
  className?: string;
  amountSize?: "md" | "lg";
}) {
  const { t, locale } = useLanguage();
  const [rates, setRates] = useState<ExchangeRates | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/exchange-rates").then((res) => {
      if (!res.ok) return;
      return res.json().then((data: { ok?: boolean } & Partial<ExchangeRates>) => {
        if (cancelled) return;
        if (!data.ok) return;
        if (!data.pygPerUsd || !data.eurPerUsd) return;
        setRates({
          pygPerUsd: data.pygPerUsd,
          eurPerUsd: data.eurPerUsd,
          updatedAt: data.updatedAt ?? "",
        });
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const extra = t.prices.extra
    .replace("{cleaning}", formatPrice(PRICE_EXTRAS.cleaning, locale, rates))
    .replace("{transfer}", formatPrice(PRICE_EXTRAS.transfer, locale, rates));
  const rateNote = rates?.updatedAt
    ? t.prices.rateNote.replace("{date}", dateLabel(rates.updatedAt, locale))
    : "";

  return (
    <div className={cn("stone-frame rounded-2xl bg-card p-6", className)}>
      <ul className="divide-y divide-border">
        {t.prices.rows.map((row) => {
          if (!isPriceRowId(row.id)) return null;
          const amount = PRICE_ROWS[row.id];
          return (
            <li
              key={row.id}
              className="flex flex-col justify-between gap-1 py-3 sm:flex-row sm:items-baseline"
            >
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className="text-left sm:text-right">
                <span
                  className={cn(
                    "font-heading",
                    amountSize === "lg" ? "text-xl" : "text-lg",
                  )}
                >
                  {formatGs(amount, locale)}
                </span>
                {rates ? (
                  <span className="block text-xs text-muted-foreground">
                    {formatFx(amount, rates, locale)}
                  </span>
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 text-sm text-muted-foreground">{t.prices.included}</p>
      <p className="mt-2 text-sm text-muted-foreground">{extra}</p>
      {rateNote ? <p className="mt-2 text-xs text-muted-foreground">{rateNote}</p> : null}
    </div>
  );
}
