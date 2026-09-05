"use client";

import Image from "next/image";
import { LocaleLink } from "@/components/locale-link";
import { HouseCards } from "@/components/house-cards";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { SITE } from "@/lib/content";
import { shots } from "@/lib/photos";
import { FacebookFeed } from "@/components/facebook-feed";
import { PriceTable } from "@/components/price-table";
import { bundledFeed } from "@/lib/facebook-feed";

const HOUSE_IDS = ["rustico", "sunset", "romantico"] as const;

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-dusk">
        <Image
          src={shots.brandHero}
          alt="Paradise City Logo, Altos Paraguay, Hunde und Palmen im Sonnenuntergang"
          width={720}
          height={710}
          priority
          className="h-auto w-full"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dusk from-15% via-dusk/75 via-50% to-transparent" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-end px-4 pb-6 pt-20 sm:px-6 sm:pb-16 md:pb-28 md:pt-24">
          <p className="font-label text-[11px] text-white/80">{t.hero.kicker}</p>
          <p className="mt-2 font-heading text-xl text-white sm:mt-3 sm:text-3xl">{SITE.motto}</p>
          <h1 className="mt-2 max-w-3xl font-heading text-3xl leading-[1.08] text-white sm:mt-4 sm:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-3 hidden max-w-xl text-sand/90 sm:mt-5 sm:block sm:text-lg">{t.hero.lead}</p>
          <div className="mt-4 flex flex-wrap gap-2 sm:mt-8">
            {HOUSE_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 font-heading text-base text-white backdrop-blur-sm hover:bg-white/20 sm:px-4 sm:py-2 sm:text-lg"
              >
                {t.houses[id].name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="haeuser" className="relative z-10 mx-auto max-w-6xl px-4 pb-8 sm:px-6 md:-mt-20">
        <h2 className="sr-only">{t.housesIntro.title}</h2>
        <HouseCards />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <FacebookFeed initial={bundledFeed} limit={8} variant="strip" />
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-3">
        {t.pillars.map((pillar) => (
          <div key={pillar.title} className="border-t-2 border-sunset pt-6">
            <h2 className="font-heading text-3xl">{pillar.title}</h2>
            <p className="mt-3 text-muted-foreground">{pillar.text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-2">
        <SectionHeading kicker={t.prices.kicker} title={t.prices.title} lead={t.prices.lead} />
        <PriceTable />
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={shots.saloonPool}
            alt="Pool am Paradise City Saloon in Altos, Paraguay"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-dusk/80" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading kicker={t.saloon.kicker} title={t.saloon.title} lead={t.saloon.text} light />
          <Button
            render={<LocaleLink href="/galerie" />}
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
            src={shots.lakeSunset}
            alt="Sonnenuntergang über dem Ypacaraí-See bei San Bernardino"
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
          <Button render={<LocaleLink href="/lage" />} variant="outline" className="mt-6 h-11 px-5" size="lg">
            {t.regionTeaser.cta}
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div className="stone-frame relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src={shots.palmsDusk}
            alt="Sonnenuntergang über Palmen in Paradise City, Altos, Paraguay"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div>
          <p className="font-heading text-4xl text-ink sm:text-5xl">{SITE.motto}</p>
          <Button render={<LocaleLink href="/kontakt" />} size="lg" className="mt-8 h-11 px-6">
            {t.hero.cta}
          </Button>
        </div>
      </section>
    </>
  );
}
