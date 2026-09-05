import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(pageSeo.privacy);

export default function PrivacyLayout({ children }: LayoutProps<"/datenschutz">) {
  return children;
}
