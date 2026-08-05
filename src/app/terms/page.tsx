import type { Metadata } from "next";

import { LegalDocument } from "@/components/layout/legal-document";
import { legalLastUpdated, termsSections } from "@/content/legal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "利用規約",
  description: "ToolGoの利用条件を定めた利用規約です。",
  path: "/terms/",
  keywords: ["利用規約", "ToolGo"],
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
