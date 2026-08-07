import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { AdSlot } from "@/components/ads";
import { PrivacyNote } from "@/components/layout";
import { PurposeFinder, type PurposeFinderGroup } from "@/components/search";
import { ToolIcon } from "@/components/tools";
import { getCategories, getPurposeGroups, getTools } from "@/features/tools/registry";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "無料ブラウザツール集｜オンラインで使える便利ツール",
  description:
    "JSON整形、パスワード生成、QRコード、文字数カウント、年齢計算など、無料で使えるオンラインツールをブラウザ上で提供します。入力データは外部へ送信しません。",
  path: "/",
  keywords: ["無料ブラウザツール", "無料オンラインツール", "便利ツール", "Webツール"],
});

export default function HomePage() {
  const purposes: PurposeFinderGroup[] = getPurposeGroups().map((purpose) => ({
    slug: purpose.slug,
    name: purpose.name,
    description: purpose.description,
    icon: purpose.icon,
    tools: purpose.tools.map((tool) => ({
      slug: tool.slug,
      name: tool.name,
      description: tool.description,
      icon: tool.icon,
      status: tool.status,
    })),
  }));

  return (
    <main className="dashboard-page">
      <div className="content-container">
        <header className="content-heading">
          <div>
            <p className="eyebrow">ホーム</p>
            <h1 id="page-title" className="page-title">
              ToolGo｜無料ブラウザツール集
            </h1>
            <p className="lede">
              無料で使えるオンラインツールを、ブラウザだけで利用できます。開発、文章、計算、デザイン、日常生活の作業を、目的に合うツールですぐに進められます。
            </p>
            <PrivacyNote />
          </div>
        </header>

        <section className="metric-grid" aria-label="概要">
          <MetricCard
            label="ツール数"
            value={String(getTools().length)}
            note="開発・文章・生成・計算など"
          />
          <MetricCard
            label="カテゴリ"
            value={String(new Set(getTools().map((tool) => tool.category)).size)}
            note="開発・文章・生成・計算など"
          />
        </section>

        <section className="dashboard-section" aria-label="目的から探す">
          <PurposeFinder purposes={purposes} />
        </section>

        <section className="dashboard-grid dashboard-section" aria-label="よく使うツール">
          <Card className="dashboard-tools-card">
            <CardHeader className="card-header-row">
              <div>
                <p className="section-kicker">よく使うツール</p>
                <CardTitle>ツール一覧</CardTitle>
              </div>
              <Link className="text-link" href="/tools">
                すべて見る <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="quick-tool-list">
                {getTools().map((tool) => (
                  <QuickTool key={tool.slug} tool={tool} />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="dashboard-section" aria-label="分野から探す">
          <Card>
            <CardHeader>
              <p className="section-kicker">分野から探す</p>
              <CardTitle>カテゴリ別のツール</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="category-link-list">
                {getCategories().map((category) => (
                  <Link
                    key={category.slug}
                    className="category-link-item"
                    href={`/categories/${category.slug}/`}
                  >
                    <span>{category.name}</span>
                    <span>{category.description}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <AdSlot placement="home-bottom" />
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <Card>
      <CardContent className="metric-card-content">
        <p className="metric-label">{label}</p>
        <p className="metric-value">{value}</p>
        <p className="metric-note">{note}</p>
      </CardContent>
    </Card>
  );
}

function QuickTool({ tool }: { tool: ReturnType<typeof getTools>[number] }) {
  return (
    <Link href={`/tools/${tool.slug}/`} className="quick-tool-item">
      <span className="quick-tool-icon" aria-hidden="true">
        <ToolIcon icon={tool.icon} />
      </span>
      <span className="quick-tool-name">{tool.name}</span>
      <span className="quick-tool-category">{tool.category}</span>
      {tool.status === "planned" && <Badge>準備中</Badge>}
    </Link>
  );
}
