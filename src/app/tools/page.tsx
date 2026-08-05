import { ToolSearchResults } from "@/components/search";
import { ToolLayout } from "@/components/layout";
import { getTools } from "@/features/tools/registry";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "無料オンラインツール一覧｜ブラウザで使える便利ツール",
  description:
    "開発、文章、計算、デザインなどの目的別に、無料で使えるブラウザツールを探せます。各ツールの使い方と入力データの扱いも確認できます。",
  path: "/tools/",
  keywords: ["無料オンラインツール", "ブラウザツール一覧", "便利ツール", "無料Webツール"],
});

export default function ToolsPage() {
  const searchTools = getTools().map(
    ({ slug, name, description, category, keywords, icon, status }) => ({
      slug,
      name,
      description,
      category,
      keywords,
      icon,
      status,
    }),
  );

  return (
    <ToolLayout
      title="無料オンラインツール一覧｜ブラウザで使える便利ツール"
      description="目的に合う無料のブラウザツールを、ここから選べます。"
      category="ツール一覧"
      help={
        <p className="text-sm leading-6 text-muted">
          ツールを選ぶと、詳しい説明と入力画面が開きます。
        </p>
      }
    >
      <ToolSearchResults tools={searchTools} />
    </ToolLayout>
  );
}
