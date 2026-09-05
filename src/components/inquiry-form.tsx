"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";

const HOUSES = ["rustico", "sunset", "romantico"] as const;

function houseFromParams(value: string | null) {
  if (value === "rustico" || value === "sunset" || value === "romantico") {
    return value;
  }
  return "";
}

export function InquiryForm() {
  const { t, locale } = useLanguage();
  const params = useSearchParams();
  const [status, setStatus] = useState<"idle" | "empty" | "ready">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [house, setHouse] = useState(() => houseFromParams(params.get("haus")));
  const [dates, setDates] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("empty");
      return;
    }

    const houseLabel = house
      ? t.houses[house as (typeof HOUSES)[number]].name
      : t.contact.form.houseAny;
    const subject =
      locale === "de"
        ? `Anfrage Paradise City: ${houseLabel}`
        : `Paradise City inquiry: ${houseLabel}`;
    const body = [
      `${t.contact.form.name}: ${name}`,
      `${t.contact.form.email}: ${email}`,
      `${t.contact.form.house}: ${houseLabel}`,
      `${t.contact.form.dates}: ${dates || "-"}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("ready");
  }

  return (
    <form onSubmit={onSubmit} className="stone-frame space-y-5 rounded-2xl bg-card p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t.contact.form.name}</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t.contact.form.email}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="house">{t.contact.form.house}</Label>
          <select
            id="house"
            value={house}
            onChange={(e) => setHouse(e.target.value)}
            className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm"
          >
            <option value="">{t.contact.form.houseAny}</option>
            {HOUSES.map((id) => (
              <option key={id} value={id}>
                {t.houses[id].name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dates">{t.contact.form.dates}</Label>
          <Input id="dates" value={dates} onChange={(e) => setDates(e.target.value)} placeholder="z. B. 12.–26. Juli" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t.contact.form.message}</Label>
        <Textarea id="message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      {status === "empty" ? (
        <p className="text-sm text-clay" role="alert">
          {t.contact.form.empty}
        </p>
      ) : null}
      {status === "ready" ? (
        <p className="text-sm text-teal" role="status">
          {t.contact.form.sent}
        </p>
      ) : null}
      <Button type="submit" size="lg" className="h-11 px-5">
        {t.contact.form.submit}
      </Button>
    </form>
  );
}
