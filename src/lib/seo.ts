import type { Metadata } from "next";

export const siteName = "ToolGo";
export const siteDescription =
  "ToolGo｜手軽な便利ツール。ブラウザだけで使える無料ツール集です。";
export const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicPath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}` || "/";
}

export function absoluteUrl(path: string) {
  return new URL(publicPath(path), `${siteOrigin}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const image = absoluteUrl("/og/toolgo.svg");

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      siteName,
      title: `${title} | ${siteName}`,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "ToolGo｜手軽な便利ツール",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [image],
    },
  };
}
