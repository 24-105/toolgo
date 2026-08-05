import type { Metadata } from "next";

import { LegalDocument } from "@/components/layout/legal-document";
import { legalLastUpdated, privacySections } from "@/content/legal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "プライバシーポリシー｜ToolGoの入力データ・個人情報の扱い",
  description:
    "ToolGoのツール入力、個人情報、localStorage、アクセス解析、GitHub Pages、将来の広告に関する情報の扱いを説明します。",
  path: "/privacy-policy/",
  keywords: [
    "ToolGo プライバシーポリシー",
    "入力データ 送信しない",
    "個人情報",
    "Cookie",
  ],
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
