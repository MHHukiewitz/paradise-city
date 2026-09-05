"use client";

import { Suspense } from "react";
import { InquiryForm } from "@/components/inquiry-form";
import { SectionHeading } from "@/components/section-heading";
import { SITE } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead} />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-card" />}>
          <InquiryForm />
        </Suspense>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-label text-[10px] text-teal">E-Mail</p>
            <a className="mt-2 block font-heading text-xl hover:underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-label text-[10px] text-teal">Telefon / WhatsApp</p>
            <div className="mt-3 space-y-2">
              {SITE.phones.map((phone) => (
                <p key={phone.href} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <a className="font-heading text-xl hover:underline" href={phone.href}>
                    {phone.label}
                  </a>
                  <a className="text-sm text-teal hover:underline" href={phone.wa} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-label text-[10px] text-teal">{t.contact.imprint}</p>
            <p className="mt-3">{SITE.address}</p>
            <p className="mt-1 text-sm text-muted-foreground">{SITE.roadNote}</p>
            <a
              className="mt-4 inline-block text-sm text-teal hover:underline"
              href={SITE.facebook}
              target="_blank"
              rel="noreferrer"
            >
              Facebook · Paradise City Saloon
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
