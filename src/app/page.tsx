import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  ArrowRight,
  CalendarDays,
  Code2,
  KeyRound,
  QrCode,
  ShieldCheck,
  Type,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

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
          <MetricCard label="利用できるツール" value="5" note="MVPで公開予定" />
          <MetricCard label="カテゴリ" value="5" note="開発・文章・生成・計算など" />
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
                <QuickTool icon={<Code2 />} name="JSON整形" category="開発" />
                <QuickTool
                  icon={<KeyRound />}
                  name="パスワード生成"
                  category="セキュリティ"
                />
                <QuickTool icon={<QrCode />} name="QRコード生成" category="生成" />
                <QuickTool icon={<Type />} name="文字数カウント" category="文章" />
                <QuickTool icon={<CalendarDays />} name="年齢計算" category="計算" />
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

function QuickTool({
  icon,
  name,
  category,
}: {
  icon: ReactNode;
  name: string;
  category: string;
}) {
  return (
    <div className="quick-tool-item">
      <span className="quick-tool-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="quick-tool-name">{name}</span>
      <span className="quick-tool-category">{category}</span>
      <Badge>公開予定</Badge>
    </div>
  );
}
