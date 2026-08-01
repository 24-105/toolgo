import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "@/components/layout";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ToolGo",
    template: "%s | ToolGo",
  },
  description: "ブラウザだけで使える、無料・高速・プライバシー重視のオンラインツール集。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
