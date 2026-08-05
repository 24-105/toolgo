import type { Metadata } from "next";

import { LegalDocument } from "@/components/layout/legal-document";
import { legalLastUpdated, termsSections } from "@/content/legal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "利用規約｜ToolGo無料ツールの利用条件・免責事項",
  description:
    "ToolGoの無料ブラウザツールを利用する際の条件、免責事項、禁止事項、著作権、サービス変更、準拠法を定めています。",
  path: "/terms/",
  keywords: ["ToolGo 利用規約", "無料ツール 利用条件", "免責事項", "ブラウザツール 規約"],
});

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="site-container">
        <p className="eyebrow">ご利用にあたって</p>
        <h1 className="page-title">利用規約</h1>
        <p className="legal-updated">制定日・改定日：{legalLastUpdated}</p>
        <LegalDocument sections={termsSections} />
      </div>
    </main>
  );
}
