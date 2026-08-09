import Link from "next/link";
import type { ReactNode } from "react";

import { AdSlot } from "@/components/ads";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import type { ToolDetails } from "@/features/tools/types";

import { PrivacyNote } from "./privacy-note";
import { FaqStructuredData, PageStructuredData } from "./structured-data";

type ToolBreadcrumb = {
  label: string;
  href?: string;
};

export type ToolLayoutProps = {
  title: string;
  description: string;
  category?: string;
  categoryHref?: string;
  breadcrumbs?: ToolBreadcrumb[];
  children: ReactNode;
  help?: ReactNode;
  details?: ToolDetails;
  relatedTools?: ReactNode;
  currentPath: string;
};

function Breadcrumbs({ items }: { items: ToolBreadcrumb[] }) {
  return (
    <nav aria-label="パンくず" className="tool-breadcrumbs">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="tool-breadcrumb-item">
          {index > 0 && <span aria-hidden="true">/</span>}
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function ToolLayout({
  title,
  description,
  category,
  categoryHref,
  breadcrumbs = [
    { label: "ホーム", href: "/" },
    { label: "ツール一覧", href: "/tools" },
  ],
  children,
  help,
  details,
  relatedTools,
  currentPath,
}: ToolLayoutProps) {
  const breadcrumbItems =
    breadcrumbs.at(-1)?.label === title
      ? breadcrumbs
      : [...breadcrumbs, { label: title }];

  return (
    <main className="tool-layout">
      <div className="site-container">
        <Breadcrumbs items={breadcrumbItems} />
        <PageStructuredData
          title={title}
          description={description}
          currentPath={currentPath}
          breadcrumbs={breadcrumbItems}
        />
        <header className="tool-header">
          {category && (
            <p className="eyebrow">
              {categoryHref ? (
                <Link className="tool-category-link" href={categoryHref}>
                  {category}
                </Link>
              ) : (
                category
              )}
            </p>
          )}
          <h1 className="page-title">{title}</h1>
          <p className="tool-description">{description}</p>
          <PrivacyNote />
        </header>

        <div className="tool-content">{children}</div>

        {details && <ToolExplanation title={title} details={details} />}

        <AdSlot placement="tool-bottom" />

        {(help || relatedTools) && (
          <div className="tool-support-grid">
            {help && (
              <Card>
                <CardHeader>
                  <CardTitle>使い方</CardTitle>
                </CardHeader>
                <CardContent>{help}</CardContent>
              </Card>
            )}
            {relatedTools && (
              <Card>
                <CardHeader>
                  <CardTitle>関連ツール</CardTitle>
                </CardHeader>
                <CardContent>{relatedTools}</CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function ToolExplanation({ title, details }: { title: string; details: ToolDetails }) {
  return (
    <section className="tool-explanation" aria-label={`${title}の詳しい説明`}>
      <details open>
        <summary>詳しい説明を見る</summary>
        <div className="tool-explanation-content">
          <section>
            <h2>{title}とは</h2>
            <p>{details.overview}</p>
          </section>

          {details.example && (
            <section>
              <h2>利用例</h2>
              <p>{details.example}</p>
            </section>
          )}

          <section>
            <h2>入力データの取り扱い</h2>
            <p>
              このツールの入力内容と処理結果は利用者のブラウザ内で扱います。ToolGoのサーバーへ送信・保存しません。
            </p>
          </section>

          <section>
            <h2>使い方</h2>
            <ol>
              {details.howToUse.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          {details.notes && (
            <section>
              <h2>知っておきたいこと</h2>
              <ul>
                {details.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </section>
          )}

          {details.faq && details.faq.length > 0 && (
            <section>
              <h2>よくある質問</h2>
              <div className="tool-faq-list">
                {details.faq.map((item) => (
                  <details key={item.question} className="tool-faq-item">
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </details>
      {details.faq && details.faq.length > 0 && <FaqStructuredData faqs={details.faq} />}
    </section>
  );
}
