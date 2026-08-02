import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { ToolLayout } from "@/components/layout";
import { getTools } from "@/features/tools/registry";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "ツール一覧",
  description: "ToolGoで公開予定の無料オンラインツール一覧。",
  path: "/tools/",
  keywords: ["ツール一覧", "無料オンラインツール"],
});

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
            {getTools().map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                className="tool-list-item"
              >
                <span>
                  {tool.name}
                  <span className="tool-list-item-description">{tool.description}</span>
                </span>
                <Badge>{tool.status === "available" ? "利用可能" : "公開予定"}</Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
