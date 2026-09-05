"use client";

import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-provider";

export default function PrivacyPage() {
  const { locale } = useLanguage();
  const de = locale === "de";

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <SectionHeading
        kicker={de ? "Datenschutz" : "Privacy"}
        title={de ? "Keine Cookies. Kein Banner." : "No cookies. No banner."}
        lead={
          de
            ? "Diese Website speichert keine Cookies. Es gibt kein Cookie-Banner, weil nichts zu bestätigen ist."
            : "This website does not store cookies. There is no cookie banner, because there is nothing to accept."
        }
      />
      <div className="mt-8 space-y-4 text-muted-foreground">
        <p>
          {de
            ? "Wir nutzen kein Tracking, keine Werbung und keine Analyse-Dienste."
            : "We do not use tracking, ads, or analytics."}
        </p>
        <p>
          {de
            ? "Die Sprachwahl (DE/EN) bleibt nur in diesem Browser. Das ist kein Cookie."
            : "The language choice (DE/EN) stays only in this browser. That is not a cookie."}
        </p>
        <p>
          {de
            ? "Das Kontaktformular öffnet Ihr E-Mail-Programm. Wir erhalten die Nachricht erst, wenn Sie die E-Mail senden."
            : "The contact form opens your email app. We receive the message only after you send the email."}
        </p>
      </div>
    </div>
  );
}
