"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhotoGallery } from "@/components/photo-gallery";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";
import { houseCovers, shots } from "@/lib/photos";

const IDS = ["rustico", "sunset", "romantico"] as const;

export default function HousesPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading
        kicker={t.housesIntro.kicker}
        title={t.housesIntro.title}
        lead={t.housesIntro.lead}
      />

      <div className="mt-16 space-y-24">
        {IDS.map((id, index) => {
          const house = t.houses[id];
          const reverse = index % 2 === 1;
          return (
            <article key={id} id={id} className="scroll-mt-24">
              <div className={`grid items-center gap-10 lg:grid-cols-2 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <div className="stone-frame relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={houseCovers[id]} alt={house.name} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
                </div>
                <div>
                  <Badge>{house.tag}</Badge>
                  <h2 className="mt-4 font-heading text-4xl">{house.name}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{house.summary}</p>
                  <ul className="mt-6 space-y-2">
                    {house.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 text-sunset" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Button render={<Link href={`/kontakt?haus=${id}`} />} className="mt-7 h-11 px-5" size="lg">
                    {t.hero.cta}
                  </Button>
                </div>
              </div>
              <div className="mt-8">
                <PhotoGallery category={id} />
              </div>
            </article>
          );
        })}
      </div>

      <section className="mt-24 grid gap-8 rounded-3xl bg-dusk px-6 py-12 text-sand md:grid-cols-2">
        <div>
          <p className="font-label text-[11px] text-gold">{t.saloon.kicker}</p>
          <h2 className="mt-3 font-heading text-3xl text-white">{t.saloon.title}</h2>
          <p className="mt-4 text-sand/80">{t.saloon.text}</p>
        </div>
        <div className="relative min-h-56 overflow-hidden rounded-2xl">
          <Image src={shots.saloonSign} alt="Paradise City Saloon" fill className="object-cover" />
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading kicker={t.prices.kicker} title={t.prices.title} lead={t.prices.lead} />
        <div className="stone-frame mt-8 rounded-2xl bg-card p-6">
          <ul className="divide-y divide-border">
            {t.prices.rows.map((row) => (
              <li key={row.label} className="flex flex-col justify-between gap-1 py-3 sm:flex-row sm:items-baseline">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="font-heading text-xl">{row.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">{t.prices.included}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t.prices.extra}</p>
        </div>
      </section>
    </div>
  );
}
