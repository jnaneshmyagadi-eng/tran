import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TRAN — Watch Anything. Understand Everything.",
    template: "%s | TRAN",
  },
  description:
    "Universal language layer for the internet. Translate videos, podcasts and online content into your language with live subtitles and natural AI voice.",
  keywords: [
    "translation",
    "video translation",
    "multilingual",
    "live subtitles",
    "AI voice",
    "language barrier",
    "TRAN",
  ],
  authors: [{ name: "TRAN" }],
  creator: "TRAN",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://tran.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TRAN",
    title: "TRAN — Watch Anything. Understand Everything.",
    description: "Translate the internet into your language.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TRAN — Watch Anything. Understand Everything.",
    description: "Translate the internet into your language.",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TRAN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0b",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased min-h-dvh bg-[#0a0a0b] text-zinc-100">{children}</body>
    </html>
  );
}
