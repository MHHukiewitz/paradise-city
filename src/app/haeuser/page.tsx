"use client";

import Image from "next/image";
import { LocaleLink } from "@/components/locale-link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhotoGallery } from "@/components/photo-gallery";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";
import { SITE } from "@/lib/content";
import { PriceTable } from "@/components/price-table";
import { houseCovers, shots } from "@/lib/photos";

const IDS = ["rustico", "sunset", "romantico"] as const;

const HOUSE_BOOKING = {
  rustico: SITE.booking.rustico,
  sunset: SITE.booking.sunset,
  romantico: undefined,
} as const;

export default function HousesPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading
        level={1}
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
              <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:items-center lg:gap-10">
                <div
                  className={`order-2 ${
                    reverse ? "lg:col-start-2 lg:row-span-2 lg:order-none" : "lg:col-start-1 lg:row-span-2 lg:order-none"
                  }`}
                >
                  <div className="stone-frame relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={houseCovers[id]}
                      alt={`${house.name}. ${house.line}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                </div>
                <div className={`order-1 ${reverse ? "lg:col-start-1 lg:order-none" : "lg:col-start-2 lg:order-none"}`}>
                  <Badge>{house.tag}</Badge>
                  <h2 className="mt-4 font-heading text-4xl">{house.name}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{house.summary}</p>
                </div>
                <div className={`order-3 ${reverse ? "lg:col-start-1 lg:order-none" : "lg:col-start-2 lg:order-none"}`}>
                  <ul className="space-y-2">
                    {house.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 text-sunset" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button render={<LocaleLink href={`/kontakt?haus=${id}`} />} className="h-11 px-5" size="lg">
                      {t.hero.cta}
                    </Button>
                    {HOUSE_BOOKING[id] ? (
                      <Button
                        variant="outline"
                        render={<a href={HOUSE_BOOKING[id]} target="_blank" rel="noreferrer" />}
                        className="h-11 px-5"
                        size="lg"
                      >
                        {t.contact.bookingHouse.replace("{house}", house.name)}
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <PhotoGallery category={id} exclude={[houseCovers[id]]} />
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
          <Image src={shots.saloonSign} alt="Holzschild Paradise City Saloon in Altos, Paraguay" fill className="object-cover" />
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading kicker={t.prices.kicker} title={t.prices.title} lead={t.prices.lead} />
        <PriceTable className="mt-8" amountSize="lg" />
      </section>
    </div>
  );
}
