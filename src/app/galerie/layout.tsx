import type { Metadata } from "next";
import { pageMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(pageSeo.gallery);

export default function GalleryLayout({ children }: LayoutProps<"/galerie">) {
  return children;
}
