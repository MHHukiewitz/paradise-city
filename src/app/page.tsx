"use client";

import Image from "next/image";
import Link from "next/link";
import { HouseCards } from "@/components/house-cards";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { SITE } from "@/lib/content";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <Image
          src="/photos/grounds/pool.jpg"
          alt="Pool at Paradise City"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6">
          <p className="font-label text-[11px] text-teal-soft">{t.hero.kicker}</p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-[1.05] text-white sm:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-sand/90">{t.hero.lead}</p>
          <p className="mt-6 font-heading text-xl italic text-sand">{SITE.motto}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/kontakt" />} size="lg" className="h-11 px-6">
              {t.hero.cta}
            </Button>
            <Button
              render={<Link href="/haeuser" />}
              variant="outline"
              size="lg"
              className="h-11 border-white/40 bg-white/10 px-6 text-white hover:bg-white/20"
            >
              {t.hero.ctaHouses}
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-3">
        {t.pillars.map((pillar) => (
          <div key={pillar.title} className="border-t-2 border-teal pt-6">
            <h2 className="font-heading text-3xl">{pillar.title}</h2>
            <p className="mt-3 text-muted-foreground">{pillar.text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <SectionHeading
          kicker={t.housesIntro.kicker}
          title={t.housesIntro.title}
          lead={t.housesIntro.lead}
        />
        <div className="mt-10">
          <HouseCards />
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
          <div className="absolute inset-0 bg-forest/78" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionHeading kicker={t.saloon.kicker} title={t.saloon.title} lead={t.saloon.text} light />
          <Button
            render={<Link href="/galerie" />}
            className="mt-8 h-11 bg-clay px-6 text-accent-foreground hover:bg-clay/90"
            size="lg"
          >
            {t.nav.gallery}
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
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

      <section className="relative mb-0 overflow-hidden">
        <Image
          src="/photos/grounds/palms-dusk.jpg"
          alt="Palms at dusk"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/55" />
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
