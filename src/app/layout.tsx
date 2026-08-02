import type { Metadata } from "next";

import { AppShell } from "@/components/layout";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ToolGo",
    template: "%s | ToolGo",
  },
  description: "ブラウザだけで使える、無料・高速・プライバシー重視のオンラインツール集。",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
