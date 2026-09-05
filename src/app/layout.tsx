import type { Metadata } from "next";
import { Fraunces, Julius_Sans_One, Source_Sans_3 } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
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
  title: {
    default: "Paradise City · Ferienhäuser in Altos, Paraguay",
    template: "%s · Paradise City",
  },
  description:
    "Drei individuelle Ferienhäuser über dem See von San Bernardino in Altos, Paraguay. Grillen, chillen, Bierli killen.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${sourceSans.variable} ${julius.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
