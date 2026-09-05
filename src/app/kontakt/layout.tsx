import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Anfrage an Paradise City per E-Mail, Telefon oder WhatsApp.",
};

export default function ContactLayout({ children }: LayoutProps<"/kontakt">) {
  return children;
}
