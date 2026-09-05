"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { photos, type Photo, type PhotoCategory } from "@/lib/photos";
import { useLanguage } from "@/components/language-provider";

const FILTERS: Array<"all" | PhotoCategory> = [
  "all",
  "grounds",
  "rustico",
  "sunset",
  "romantico",
  "saloon",
];

export function PhotoGallery({
  limit,
  category,
}: {
  limit?: number;
  category?: PhotoCategory;
}) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | PhotoCategory>(category ?? "all");
  const [open, setOpen] = useState<Photo | null>(null);

  const items = useMemo(() => {
    const list = photos.filter((photo) => {
      if (category) return photo.category === category;
      if (filter === "all") return true;
      return photo.category === filter;
    });
    return limit ? list.slice(0, limit) : list;
  }, [category, filter, limit]);

  return (
    <div>
      {category ? null : (
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((key) => (
            <Button
              key={key}
              type="button"
              size="sm"
              variant={filter === key ? "default" : "outline"}
              onClick={() => setFilter(key)}
            >
              {t.gallery.filters[key]}
            </Button>
          ))}
        </div>
      )}
      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center text-muted-foreground">
          {t.gallery.lead}
        </p>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((photo) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setOpen(photo)}
              className="stone-frame mb-4 block w-full overflow-hidden rounded-xl bg-card"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1000}
                height={750}
                className="h-auto w-full object-cover transition duration-500 hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      )}
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
    </div>
  );
}
