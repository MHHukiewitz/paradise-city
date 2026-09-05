import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Fotos von Paradise City, den Häusern und dem Saloon.",
};

export default function GalleryLayout({ children }: LayoutProps<"/galerie">) {
  return children;
}
