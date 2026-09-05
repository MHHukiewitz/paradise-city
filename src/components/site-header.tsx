"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/components/language-provider";
import { SITE } from "@/lib/content";

const links = [
  { href: "/", key: "home" as const },
  { href: "/haeuser", key: "houses" as const },
  { href: "/lage", key: "location" as const },
  { href: "/galerie", key: "gallery" as const },
  { href: "/kontakt", key: "contact" as const },
];

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span className="relative grid size-10 place-items-center rounded-full bg-sunset text-primary-foreground shadow-[inset_0_-2px_0_rgb(0_0_0/0.12)]">
        <svg viewBox="0 0 32 32" className="size-6" aria-hidden>
          <path
            d="M16 4c.4 4.5-2.2 7.6-6 9 3 .3 5.2 2.4 6 6 .8-3.6 3-5.7 6-6-3.8-1.4-6.4-4.5-6-9Z"
            fill="currentColor"
          />
          <path d="M16 18v8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 28h16" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="font-heading block text-lg font-semibold tracking-tight text-ink">
          {SITE.name}
        </span>
        <span className="font-label text-[10px] text-muted-foreground">{SITE.place}</span>
      </span>
    </Link>
  );
}

function LangToggle() {
  const { locale, setLocale } = useLanguage();
  return (
    <div className="flex overflow-hidden rounded-full border border-border bg-card text-xs">
      <button
        type="button"
        onClick={() => setLocale("de")}
        className={`px-2.5 py-1 ${locale === "de" ? "bg-sunset text-primary-foreground" : "text-muted-foreground"}`}
      >
        DE
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-2.5 py-1 ${locale === "en" ? "bg-sunset text-primary-foreground" : "text-muted-foreground"}`}
      >
        EN
      </button>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const nav = (
    <>
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`font-label text-[11px] transition-colors ${
              active ? "text-sunset" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.nav[link.key]}
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-linen/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">{nav}</nav>
        <div className="flex items-center gap-3">
          <LangToggle />
          <Button render={<Link href="/kontakt" />} size="sm" className="hidden md:inline-flex">
            {t.hero.cta}
          </Button>
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" className="md:hidden" aria-label="Menu" />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="bg-linen">
              <div className="mt-10 flex flex-col gap-6 px-2">
                {nav}
                <Button render={<Link href="/kontakt" />}>{t.hero.cta}</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
