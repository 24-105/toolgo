import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { ToolLayout } from "@/components/layout";
import { getTools } from "@/features/tools/registry";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "ツール一覧",
  description: "ToolGoで使える無料ツールの一覧です。",
  path: "/tools/",
  keywords: ["ツール一覧", "無料オンラインツール"],
});

export default function ToolsPage() {
  return (
    <ToolLayout
      title="ツール一覧"
      description="目的に合う無料のブラウザツールを、ここから選べます。"
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
            <CardTitle>使えるツール</CardTitle>
            <Badge variant="success">5種類</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="tool-list" aria-label="使えるツールの一覧">
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
                <Badge>{tool.status === "available" ? "利用できます" : "準備中"}</Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
