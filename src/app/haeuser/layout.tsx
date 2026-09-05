import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(pageSeo.houses);

export default function HousesLayout({ children }: LayoutProps<"/haeuser">) {
  return children;
}
