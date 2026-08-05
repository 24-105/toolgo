import type { Metadata } from "next";

import { LegalDocument } from "@/components/layout/legal-document";
import { aboutSections, legalLastUpdated } from "@/content/legal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "このサイトについて",
  description: "ToolGoの目的、提供しているツール、入力データの扱いについて説明します。",
  path: "/about/",
  keywords: ["ToolGoについて", "ブラウザツール", "運営情報"],
});

export default function AboutPage() {
  return (
    <main className="legal-page">
      <div className="site-container">
        <p className="eyebrow">ToolGoの案内</p>
        <h1 className="page-title">このサイトについて</h1>
        <p className="legal-updated">更新日：{legalLastUpdated}</p>
        <LegalDocument sections={aboutSections} />
      </div>
    </main>
  );
}
