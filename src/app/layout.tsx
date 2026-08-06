import type { Metadata } from "next";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { AdSenseScript } from "@/components/ads";
import { AppShell } from "@/components/layout";
import { absoluteUrl, siteDescription, siteName, siteOrigin } from "@/lib/seo";

import "./globals.css";

const themeInitializer = `(function () {
  try {
    var savedTheme = window.localStorage.getItem("toolgo-theme");
    document.documentElement.dataset.theme = savedTheme === "dark" ? "dark" : "light";
  } catch (_) {
    document.documentElement.dataset.theme = "light";
  }
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: siteName,
    template: "%s | ToolGo",
  },
  description: siteDescription,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName,
    title: siteName,
    description: siteDescription,
    url: absoluteUrl("/"),
    images: [
      {
        url: absoluteUrl("/og/toolgo.svg"),
        width: 1200,
        height: 630,
        alt: "ToolGo｜手軽な便利ツール",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [absoluteUrl("/og/toolgo.svg")],
  },
  icons: {
    icon: absoluteUrl("/favicon.png"),
    shortcut: absoluteUrl("/favicon.png"),
    apple: absoluteUrl("/favicon.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{ __html: themeInitializer }}
        />
        <AdSenseScript />
      </head>
      <body>
        <GoogleAnalytics />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
