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
            <p className="eyebrow">Dashboard</p>
            <h1 id="page-title" className="page-title">
              ToolGo Dashboard
            </h1>
            <p className="lede">よく使うブラウザツールへ、すばやくアクセスできます。</p>
          </div>
          <Badge variant="success">All systems operational</Badge>
        </header>

        <section className="metric-grid" aria-label="概要">
          <MetricCard label="Available tools" value="5" note="MVPで公開予定" />
          <MetricCard label="Categories" value="4" note="開発・テキスト・生成・計算" />
          <MetricCard label="Privacy" value="100%" note="ブラウザ内処理" />
        </section>

        <section className="dashboard-grid" aria-label="Quick access and system status">
          <Card className="dashboard-tools-card">
            <CardHeader className="card-header-row">
              <div>
                <p className="section-kicker">Quick access</p>
                <CardTitle>Popular tools</CardTitle>
              </div>
              <Link className="text-link" href="/tools">
                View all <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="quick-tool-list">
                <QuickTool icon={<Code2 />} name="JSON Formatter" category="Developer" />
                <QuickTool
                  icon={<KeyRound />}
                  name="Password Generator"
                  category="Security"
                />
                <QuickTool
                  icon={<QrCode />}
                  name="QR Code Generator"
                  category="Generator"
                />
                <QuickTool icon={<Type />} name="Character Counter" category="Text" />
                <QuickTool
                  icon={<CalendarDays />}
                  name="Age Calculator"
                  category="Calculator"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="section-kicker">System status</p>
              <CardTitle>Privacy by default</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="status-summary">
                <ShieldCheck size={22} strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <strong>Your data stays in your browser.</strong>
                  <p>ToolGo does not send tool inputs to a server.</p>
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
      <Badge>Planned</Badge>
    </div>
  );
}
