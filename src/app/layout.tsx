import type { Metadata } from "next";
import { Fraunces, Julius_Sans_One, Source_Sans_3 } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { SITE } from "@/lib/content";
import { languageUrls } from "@/lib/locale";
import { OG_IMAGE, SITE_URL, pageSeo } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin", "latin-ext"],
});

const julius = Julius_Sans_One({
  variable: "--font-julius",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${pageSeo.home.title} · ${SITE.name}`,
    template: `%s · ${SITE.name}`,
  },
  description: pageSeo.home.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "travel",
  alternates: {
    canonical: SITE_URL,
    languages: {
      ...languageUrls("/", SITE_URL),
      "x-default": SITE_URL,
    },
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.png" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_US", "es_PY"],
    siteName: SITE.name,
    title: `${pageSeo.home.title} · ${SITE.name}`,
    description: pageSeo.home.description,
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 720,
        height: 710,
        alt: "Paradise City Logo, Altos Paraguay, Hunde und Palmen im Sonnenuntergang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageSeo.home.title} · ${SITE.name}`,
    description: pageSeo.home.description,
    images: [OG_IMAGE],
  },
  other: {
    "geo.region": "PY-1",
    "geo.placename": "Altos",
    "geo.position": `${SITE.coords.lat};${SITE.coords.lng}`,
    ICBM: `${SITE.coords.lat}, ${SITE.coords.lng}`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${sourceSans.variable} ${julius.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
