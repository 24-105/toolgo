import type { Metadata } from "next";

import { LegalDocument } from "@/components/layout/legal-document";
import { legalLastUpdated, privacySections } from "@/content/legal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "プライバシーポリシー",
  description: "ToolGoにおける入力データやブラウザ情報の扱いについて説明します。",
  path: "/privacy-policy/",
  keywords: ["プライバシーポリシー", "個人情報", "ToolGo"],
});

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <div className="site-container">
        <p className="eyebrow">個人情報・データの扱い</p>
        <h1 className="page-title">プライバシーポリシー</h1>
        <p className="legal-updated">制定日・改定日：{legalLastUpdated}</p>
        <LegalDocument sections={privacySections} />
      </div>
    </main>
  );
}
