import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(pageSeo.location);

export default function LocationLayout({ children }: LayoutProps<"/lage">) {
  return children;
}
