import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lage und Anfahrt",
  description: "Ybu, Altos, über dem See von San Bernardino in Paraguay.",
};

export default function LocationLayout({ children }: LayoutProps<"/lage">) {
  return children;
}
