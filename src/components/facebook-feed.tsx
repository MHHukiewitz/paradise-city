"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { LocaleLink } from "@/components/locale-link";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";
import { FACEBOOK_PAGES, type FeedItem, type FacebookFeedSnapshot } from "@/lib/facebook-feed";

function dateLabel(iso: string, locale: string) {
  if (!iso) return "";
  const date = new Date(iso);
  const tag = locale === "de" ? "de-DE" : locale === "es" ? "es-PY" : "en-GB";
  return date.toLocaleDateString(tag, { day: "numeric", month: "long", year: "numeric" });
}

export function FacebookFeed({
  initial,
  limit,
  variant = "grid",
}: {
  initial: FacebookFeedSnapshot;
  limit?: number;
  variant?: "grid" | "strip";
}) {
  const { t, locale } = useLanguage();
  const [snapshot, setSnapshot] = useState(initial);
  const [status, setStatus] = useState<"ready" | "loading" | "error">(
    initial.items.length ? "ready" : "loading",
  );
  const [open, setOpen] = useState<FeedItem | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/facebook-feed", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(new Error("feed"));
        }
        return res.json() as Promise<FacebookFeedSnapshot>;
      })
      .then((data) => {
        if (cancelled) return;
        if (data.items?.length) {
          setSnapshot(data);
          setStatus("ready");
          return;
        }
        setStatus(initial.items.length ? "ready" : "error");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus(initial.items.length ? "ready" : "error");
      });
    return () => {
      cancelled = true;
    };
  }, [initial.items.length]);

  const items = useMemo(() => {
    const list = snapshot.items;
    return limit ? list.slice(0, limit) : list;
  }, [limit, snapshot.items]);

  const updated = t.feed.updated.replace("{date}", dateLabel(snapshot.updatedAt, locale));

  return (
    <section id="aktuell" className="scroll-mt-24">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading kicker={t.feed.kicker} title={t.feed.title} lead={t.feed.lead} />
        <div className="flex flex-wrap gap-2">
          {FACEBOOK_PAGES.map((page) => (
            <Button
              key={page.id}
              render={<a href={page.href} target="_blank" rel="noreferrer" />}
              variant="outline"
              size="sm"
            >
              {page.id === "saloon" ? t.feed.sourceSaloon : t.feed.sourceParaguay}
            </Button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{updated}</p>

      {status === "loading" && items.length === 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {["a", "b", "c", "d"].map((key) => (
            <div key={key} className="aspect-[4/5] animate-pulse rounded-xl bg-secondary" />
          ))}
          <p className="col-span-2 text-sm text-muted-foreground sm:col-span-4">{t.feed.loading}</p>
        </div>
      ) : null}

      {status === "error" && items.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center text-muted-foreground">
          {t.feed.error}
        </p>
      ) : null}

      {items.length === 0 && status === "ready" ? (
        <p className="mt-8 rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center text-muted-foreground">
          {t.feed.empty}
        </p>
      ) : null}

      {items.length > 0 && variant === "strip" ? (
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpen(item)}
              className="stone-frame relative h-64 w-52 shrink-0 overflow-hidden rounded-xl bg-card sm:h-72 sm:w-64"
            >
              <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="256px" />
            </button>
          ))}
        </div>
      ) : null}

      {items.length > 0 && variant === "grid" ? (
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpen(item)}
              className="stone-frame mb-4 block w-full overflow-hidden rounded-xl bg-card"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={1200}
                height={900}
                className="h-auto w-full object-cover transition duration-500 hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      ) : null}

      {limit ? (
        <div className="mt-8">
          <Button render={<LocaleLink href="/galerie#aktuell" />} variant="outline">
            {t.feed.more}
          </Button>
        </div>
      ) : null}

      <Dialog open={Boolean(open)} onOpenChange={(next) => !next && setOpen(null)}>
        <DialogContent className="max-w-4xl overflow-hidden bg-ink p-0 sm:max-w-4xl" showCloseButton>
          <DialogTitle className="sr-only">{open?.alt}</DialogTitle>
          {open ? (
            <Image
              src={open.src}
              alt={open.alt}
              width={1600}
              height={1200}
              className="h-auto max-h-[80vh] w-full object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
