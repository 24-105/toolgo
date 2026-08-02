import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { ToolLayout } from "@/components/layout";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "ツール一覧",
  description: "ToolGoで公開予定の無料オンラインツール一覧。",
  path: "/tools/",
  keywords: ["ツール一覧", "無料オンラインツール"],
});

const plannedTools = [
  "JSON整形",
  "パスワード生成",
  "QRコード生成",
  "文字数カウント",
  "年齢計算",
];

export default function ToolsPage() {
  return (
    <ToolLayout
      title="ツール一覧"
      description="日常の作業をすばやく片付ける、無料のブラウザツールを準備しています。"
      category="ツール一覧"
      help={
        <p className="text-sm leading-6 text-muted">
          ツールはすべてブラウザ内で処理されます。
        </p>
      }
    >
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>公開予定のツール</CardTitle>
            <Badge variant="warning">準備中</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="tool-list" aria-label="公開予定のツール一覧">
            {plannedTools.map((tool) => (
              <div key={tool} className="tool-list-item">
                <span>{tool}</span>
                <Badge>公開予定</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
