"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/components/language-provider";
import { withLocale } from "@/lib/locale";

export function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const { locale } = useLanguage();
  return <Link href={typeof href === "string" ? withLocale(href, locale) : href} {...props} />;
}
