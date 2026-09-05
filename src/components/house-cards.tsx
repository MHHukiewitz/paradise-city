"use client";

import Image from "next/image";
import Link from "next/link";
import { houseCovers } from "@/lib/photos";
import { useLanguage } from "@/components/language-provider";

const IDS = ["rustico", "sunset", "romantico"] as const;

export function HouseCards() {
  const { t } = useLanguage();

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {IDS.map((id) => {
        const house = t.houses[id];
        return (
          <article
            key={id}
            id={id}
            className="stone-frame group relative min-h-[420px] scroll-mt-24 overflow-hidden rounded-2xl md:min-h-[520px]"
          >
            <Image
              src={houseCovers[id]}
              alt={house.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dusk via-dusk/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-sand">
              <p className="font-label text-[10px] text-gold">{house.tag}</p>
              <h3 className="mt-2 font-heading text-4xl text-white">{house.name}</h3>
              <p className="mt-2 text-sm text-sand/90">{house.line}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/haeuser#${id}`}
                  className="rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-sm hover:bg-white/25"
                >
                  {t.nav.houses}
                </Link>
                <Link
                  href={`/kontakt?haus=${id}`}
                  className="rounded-full bg-sunset px-4 py-2 text-sm text-primary-foreground hover:bg-sunset/90"
                >
                  {t.hero.cta}
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
