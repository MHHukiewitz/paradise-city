import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(pageSeo.contact);

export default function ContactLayout({ children }: LayoutProps<"/kontakt">) {
  return children;
}
