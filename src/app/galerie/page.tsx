"use client";

import { PhotoGallery } from "@/components/photo-gallery";
import { FacebookFeed } from "@/components/facebook-feed";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";
import { bundledFeed } from "@/lib/facebook-feed";

export default function GalleryPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading kicker={t.gallery.kicker} title={t.gallery.title} lead={t.gallery.lead} />
      <div className="mt-6">
        <Button
          render={<a href={SITE.facebook} target="_blank" rel="noreferrer" />}
          variant="outline"
        >
          {t.gallery.facebook}
        </Button>
      </div>
      <div className="mt-10">
        <FacebookFeed initial={bundledFeed} variant="grid" />
      </div>
      <div className="mt-16">
        <PhotoGallery />
      </div>
    </div>
  );
}
