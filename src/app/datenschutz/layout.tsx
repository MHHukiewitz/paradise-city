import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Paradise City setzt keine Cookies und zeigt kein Cookie-Banner.",
};

export default function PrivacyLayout({ children }: LayoutProps<"/datenschutz">) {
  return children;
}
