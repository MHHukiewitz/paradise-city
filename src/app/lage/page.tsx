"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";

const MAP =
  "https://www.openstreetmap.org/export/embed.html?bbox=-57.309071%2C-25.293605%2C-57.249071%2C-25.233605&layer=mapnik&marker=-25.263605%2C-57.279071";
const MAP_LINK = `https://www.openstreetmap.org/?mlat=${SITE.coords.lat}&mlon=${SITE.coords.lng}#map=14/${SITE.coords.lat}/${SITE.coords.lng}`;

export default function LocationPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading kicker={t.location.kicker} title={t.location.title} lead={t.location.lead} />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="stone-frame overflow-hidden rounded-2xl bg-card">
          <iframe
            title="Paradise City map"
            src={MAP}
            className="h-[360px] w-full border-0"
            loading="lazy"
          />
          <div className="p-4">
            <Button render={<a href={MAP_LINK} target="_blank" rel="noreferrer" />} variant="outline">
              {t.location.mapCta}
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          {t.location.facts.map((fact) => (
            <div key={fact.label} className="rounded-2xl border border-border bg-card px-5 py-4">
              <p className="font-label text-[10px] text-teal">{fact.label}</p>
              <p className="mt-2 font-heading text-2xl">{fact.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
        <div className="stone-frame relative aspect-[5/4] overflow-hidden rounded-2xl">
          <Image
            src="/photos/grounds/lake-sunset.jpg"
            alt="Lake Ypacaraí sunset"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div>
          <p className="leading-relaxed text-muted-foreground">{t.location.paraguay}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t.location.activities}</p>
        </div>
      </div>
    </div>
  );
}
