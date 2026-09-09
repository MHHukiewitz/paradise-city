"use client";

import { SITE } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";
import { LocaleLink } from "@/components/locale-link";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto bg-dusk text-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-2xl text-white">{SITE.name}</p>
          <p className="mt-2 font-label text-[10px] text-gold">{SITE.motto}</p>
          <p className="mt-4 max-w-xs text-sm text-sand/80">{t.footer.note}</p>
        </div>
        <div className="text-sm">
          <p className="font-label text-[10px] text-gold">{t.contact.imprint}</p>
          <p className="mt-3">{SITE.address}</p>
          <p className="mt-1">{t.location.roadNote}</p>
          <a className="mt-3 block text-gold hover:underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          {SITE.phones.map((phone) => (
            <a key={phone.href} className="mt-1 block hover:underline" href={phone.href}>
              {phone.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <LocaleLink className="hover:text-white" href="/haeuser">
            {t.nav.houses}
          </LocaleLink>
          <LocaleLink className="hover:text-white" href="/lage">
            {t.nav.location}
          </LocaleLink>
          <LocaleLink className="hover:text-white" href="/galerie">
            {t.nav.gallery}
          </LocaleLink>
          <LocaleLink className="hover:text-white" href="/kontakt">
            {t.nav.contact}
          </LocaleLink>
          <a
            className="mt-2 text-gold hover:underline"
            href={SITE.facebook}
            target="_blank"
            rel="noreferrer"
          >
            Facebook · Paradise City Saloon
          </a>
          <a
            className="text-gold hover:underline"
            href={SITE.airbnb.rustico}
            target="_blank"
            rel="noreferrer"
          >
            {t.contact.airbnbHouse.replace("{house}", t.houses.rustico.name)}
          </a>
          <a
            className="text-gold hover:underline"
            href={SITE.airbnb.sunset}
            target="_blank"
            rel="noreferrer"
          >
            {t.contact.airbnbHouse.replace("{house}", t.houses.sunset.name)}
          </a>
          <a
            className="text-gold hover:underline"
            href={SITE.airbnb.romantico}
            target="_blank"
            rel="noreferrer"
          >
            {t.contact.airbnbHouse.replace("{house}", t.houses.romantico.name)}
          </a>
          <LocaleLink className="mt-2 text-gold hover:underline" href="/datenschutz">
            {t.footer.privacyPage}
          </LocaleLink>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-sand/60">
        {t.footer.rights} · {t.footer.privacy}
      </div>
    </footer>
  );
}
