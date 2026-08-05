import type { Metadata } from "next";

import { LegalDocument } from "@/components/layout/legal-document";
import { aboutSections, legalLastUpdated } from "@/content/legal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "ToolGoについて｜無料ブラウザツール集の概要",
  description:
    "ToolGoが提供する無料ブラウザツールの種類、サイトの目的、入力データを外部へ送信しない仕組み、運営情報を説明します。",
  path: "/about/",
  keywords: ["ToolGoについて", "無料ブラウザツール", "運営情報", "入力データ"],
});

export default function AboutPage() {
  return (
    <main className="legal-page">
      <div className="site-container">
        <p className="eyebrow">ToolGoの案内</p>
        <h1 className="page-title">ToolGoについて</h1>
        <p className="legal-updated">更新日：{legalLastUpdated}</p>
        <LegalDocument sections={aboutSections} />
      </div>
    </main>
  );
}
