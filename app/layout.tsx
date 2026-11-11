import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hugo Quesada | Portfolio",
  description: "Data, machine learning, and application projects by Hugo Quesada.",
  keywords: ["Hugo Quesada", "Dados", "Machine Learning", "Python", "Portfólio"],
  authors: [{ name: "Hugo Quesada" }],
  openGraph: {
    title: "Hugo Quesada | Portfolio",
    description: "Data, machine learning, and application projects.",
    locale: "en_US",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
