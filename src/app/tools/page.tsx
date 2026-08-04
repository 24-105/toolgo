import { ToolSearchResults } from "@/components/search";
import { ToolLayout } from "@/components/layout";
import { getTools } from "@/features/tools/registry";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "ツール一覧",
  description: "ToolGoで使える無料ツールの一覧です。",
  path: "/tools/",
  keywords: ["ツール一覧", "無料オンラインツール"],
});

export default function ToolsPage() {
  const searchTools = getTools().map(
    ({ slug, name, description, category, keywords, status }) => ({
      slug,
      name,
      description,
      category,
      keywords,
      status,
    }),
  );

  return (
    <ToolLayout
      title="ツール一覧"
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
