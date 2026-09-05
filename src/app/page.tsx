"use client";

import Image from "next/image";
import Link from "next/link";
import { HouseCards } from "@/components/house-cards";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { SITE } from "@/lib/content";

const HOUSE_IDS = ["rustico", "sunset", "romantico"] as const;

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative isolate min-h-[78vh] overflow-hidden">
        <Image
          src="/photos/grounds/palms-dusk.jpg"
          alt="Sunset over Paradise City"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dusk via-dusk/45 to-magenta/20" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-28 pt-24 sm:px-6">
          <p className="font-label text-[11px] text-gold">{t.hero.kicker}</p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-[1.05] text-white sm:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-sand/90">{t.hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {HOUSE_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-white/30 bg-white/10 px-4 py-2 font-heading text-lg text-white backdrop-blur-sm hover:bg-white/20"
              >
                {t.houses[id].name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="haeuser" className="relative z-10 mx-auto -mt-20 max-w-6xl px-4 pb-8 sm:px-6">
        <HouseCards />
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
        {t.pillars.map((pillar) => (
          <div key={pillar.title} className="border-t-2 border-sunset pt-6">
            <h2 className="font-heading text-3xl">{pillar.title}</h2>
            <p className="mt-3 text-muted-foreground">{pillar.text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-2">
        <SectionHeading kicker={t.prices.kicker} title={t.prices.title} lead={t.prices.lead} />
        <div className="stone-frame rounded-2xl bg-card p-6">
          <ul className="divide-y divide-border">
            {t.prices.rows.map((row) => (
              <li key={row.label} className="flex items-baseline justify-between gap-4 py-3">
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="font-heading text-lg">{row.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">{t.prices.included}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t.prices.extra}</p>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/photos/saloon/07.jpg"
            alt="Paradise City Saloon"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-dusk/80" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading kicker={t.saloon.kicker} title={t.saloon.title} lead={t.saloon.text} light />
          <Button
            render={<Link href="/galerie" />}
            className="mt-8 h-11 bg-sunset px-6 text-primary-foreground hover:bg-sunset/90"
            size="lg"
          >
            {t.nav.gallery}
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div className="stone-frame relative aspect-[5/3] overflow-hidden rounded-2xl">
          <Image
            src="/photos/grounds/lake-sunset.jpg"
            alt="Lake Ypacaraí at sunset"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div>
          <SectionHeading
            kicker={t.regionTeaser.kicker}
            title={t.regionTeaser.title}
            lead={t.regionTeaser.lead}
          />
          <Button render={<Link href="/lage" />} variant="outline" className="mt-6 h-11 px-5" size="lg">
            {t.regionTeaser.cta}
          </Button>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Image
          src="/photos/grounds/palms-dusk.jpg"
          alt="Palms at dusk"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dusk/60" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
          <p className="font-heading text-4xl text-white sm:text-5xl">{SITE.motto}</p>
          <Button render={<Link href="/kontakt" />} size="lg" className="mt-8 h-11 px-6">
            {t.hero.cta}
          </Button>
        </div>
      </section>
    </>
  );
}
