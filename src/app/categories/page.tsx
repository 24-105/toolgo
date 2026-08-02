import { FolderTree } from "lucide-react";

import { ToolLayout } from "@/components/layout";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { getCategories, getToolsByCategory } from "@/features/tools/registry";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "カテゴリ",
  description: "ToolGoのツールをカテゴリから探す。",
  path: "/categories/",
  keywords: ["ツールカテゴリ", "無料ツール"],
});

const categoryDescriptions: Record<string, string> = {
  開発: "コードやデータの整形・変換",
  セキュリティ: "安全な文字列や認証情報の生成",
  生成: "QRコードなどの生成ツール",
  文章: "文章の確認や文字数の計測",
  計算: "日付や数値の計算",
};

export default function CategoriesPage() {
  return (
    <ToolLayout
      title="カテゴリ"
      description="目的に近いツールをカテゴリから探せます。"
      category="ツール一覧"
    >
      <div className="category-grid" aria-label="ツールカテゴリ一覧">
        {getCategories().map((category) => (
          <Card key={category}>
            <CardHeader className="category-card-header">
              <span className="category-icon" aria-hidden="true">
                <FolderTree size={17} strokeWidth={1.8} />
              </span>
              <div>
                <CardTitle>{category}</CardTitle>
                <p className="category-description">{categoryDescriptions[category]}</p>
              </div>
            </CardHeader>
            <CardContent>
              <Badge>{getToolsByCategory(category).length}件・公開予定</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </ToolLayout>
  );
}
