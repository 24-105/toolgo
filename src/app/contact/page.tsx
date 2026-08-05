import type { Metadata } from "next";

import { LegalDocument } from "@/components/layout/legal-document";
import { contactSections, legalLastUpdated } from "@/content/legal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "ToolGoへのお問い合わせ｜不具合報告・改善提案",
  description:
    "ToolGoの不具合報告、改善提案、掲載内容やプライバシーに関する連絡方法を案内しています。",
  path: "/contact/",
  keywords: ["ToolGo 問い合わせ", "不具合報告", "改善提案", "GitHub Issues"],
});

export default function ContactPage() {
  return (
    <main className="legal-page">
      <div className="site-container">
        <p className="eyebrow">連絡窓口</p>
        <h1 className="page-title">ToolGoへのお問い合わせ</h1>
        <p className="legal-updated">更新日：{legalLastUpdated}</p>
        <LegalDocument sections={contactSections} />
      </div>
    </main>
  );
}
