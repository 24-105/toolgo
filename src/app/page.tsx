import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { getTools } from "@/features/tools/registry";
import {
  ArrowRight,
  CalendarDays,
  Code2,
  KeyRound,
  QrCode,
  ShieldCheck,
  Type,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { createPageMetadata } from "@/lib/seo";
import type { ToolIcon } from "@/features/tools/types";

const iconMap = {
  code: Code2,
  key: KeyRound,
  qr: QrCode,
  text: Type,
  calendar: CalendarDays,
} satisfies Record<ToolIcon, LucideIcon>;

export const metadata = createPageMetadata({
  title: "ホーム",
  description: "ToolGoの無料ブラウザツールを探して、すぐに使えます。",
  path: "/",
  keywords: ["無料ツール", "オンラインツール", "ブラウザツール"],
});

export default function HomePage() {
  return (
    <main className="dashboard-page">
      <div className="content-container">
        <header className="content-heading">
          <div>
            <p className="eyebrow">ホーム</p>
            <h1 id="page-title" className="page-title">
              ToolGo ホーム
            </h1>
            <p className="lede">よく使うブラウザツールへ、すばやくアクセスできます。</p>
          </div>
          <Badge variant="success">正常に利用できます</Badge>
        </header>

        <section className="metric-grid" aria-label="概要">
          <MetricCard
            label="利用できるツール"
            value={String(getTools().length)}
            note="MVPで公開予定"
          />
          <MetricCard
            label="カテゴリ"
            value={String(new Set(getTools().map((tool) => tool.category)).size)}
            note="開発・文章・生成・計算など"
          />
          <MetricCard label="プライバシー" value="100%" note="ブラウザ内処理" />
        </section>

        <section className="dashboard-grid" aria-label="よく使うツールとサービスの状態">
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

          <Card>
            <CardHeader>
              <p className="section-kicker">サービスの状態</p>
              <CardTitle>入力データを送信しません</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="status-summary">
                <ShieldCheck size={22} strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <strong>入力データはこのブラウザ内に留まります。</strong>
                  <p>ToolGoはツールへの入力をサーバーへ送信しません。</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
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
  const Icon = iconMap[tool.icon];

  return (
    <Link href={`/tools/${tool.slug}/`} className="quick-tool-item">
      <span className="quick-tool-icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="quick-tool-name">{tool.name}</span>
      <span className="quick-tool-category">{tool.category}</span>
      <Badge>{tool.status === "available" ? "利用可能" : "公開予定"}</Badge>
    </Link>
  );
}
