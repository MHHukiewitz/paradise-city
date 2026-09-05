"use client";

import { LanguageProvider } from "@/components/language-provider";
import { SiteAudio } from "@/components/site-audio";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SiteAudio />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </LanguageProvider>
  );
}
