import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ferienhäuser",
  description: "Rustico, Sunset und Romantico in Paradise City, Altos.",
};

export default function HousesLayout({ children }: LayoutProps<"/haeuser">) {
  return children;
}
