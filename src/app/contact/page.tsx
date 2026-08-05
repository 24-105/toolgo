import type { Metadata } from "next";

import { LegalDocument } from "@/components/layout/legal-document";
import { contactSections, legalLastUpdated } from "@/content/legal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "お問い合わせ",
  description: "ToolGoへの不具合報告や改善提案を受け付けています。",
  path: "/contact/",
  keywords: ["ToolGo", "お問い合わせ", "不具合報告"],
});

export default function ContactPage() {
  return (
    <main className="legal-page">
      <div className="site-container">
        <p className="eyebrow">連絡窓口</p>
        <h1 className="page-title">お問い合わせ</h1>
        <p className="legal-updated">更新日：{legalLastUpdated}</p>
        <LegalDocument sections={contactSections} />
      </div>
    </main>
  );
}
