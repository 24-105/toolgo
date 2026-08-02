import Link from "next/link";
import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

type ToolBreadcrumb = {
  label: string;
  href?: string;
};

export type ToolLayoutProps = {
  title: string;
  description: string;
  category?: string;
  breadcrumbs?: ToolBreadcrumb[];
  children: ReactNode;
  help?: ReactNode;
  relatedTools?: ReactNode;
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
  breadcrumbs = [
    { label: "ホーム", href: "/" },
    { label: "ツール一覧", href: "/tools" },
  ],
  children,
  help,
  relatedTools,
}: ToolLayoutProps) {
  const breadcrumbItems =
    breadcrumbs.at(-1)?.label === title
      ? breadcrumbs
      : [...breadcrumbs, { label: title }];

  return (
    <main className="tool-layout">
      <div className="site-container">
        <Breadcrumbs items={breadcrumbItems} />
        <header className="tool-header">
          {category && <p className="eyebrow">{category}</p>}
          <h1 className="tool-title">{title}</h1>
          <p className="tool-description">{description}</p>
          <p className="privacy-note">
            <span aria-hidden="true">●</span>{" "}
            入力データを外部へ送信せず、このブラウザだけで処理します。
          </p>
        </header>

        <div className="tool-content">{children}</div>

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
