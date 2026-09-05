"use client";

import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <SectionHeading kicker={t.privacy.kicker} title={t.privacy.title} lead={t.privacy.lead} />
      <div className="mt-8 space-y-4 text-muted-foreground">
        <p>{t.privacy.tracking}</p>
        <p>{t.privacy.language}</p>
        <p>{t.privacy.form}</p>
        <p>{t.privacy.feed}</p>
      </div>
    </div>
  );
}
