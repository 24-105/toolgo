import { FolderTree } from "lucide-react";

import { ToolLayout } from "@/components/layout";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export const metadata = {
  title: "カテゴリ",
  description: "ToolGoのツールをカテゴリから探す。",
};

const categories = [
  { name: "開発", description: "コードやデータの整形・変換", count: 1 },
  { name: "セキュリティ", description: "安全な文字列や認証情報の生成", count: 1 },
  { name: "生成", description: "QRコードなどの生成ツール", count: 1 },
  { name: "文章", description: "文章の確認や文字数の計測", count: 1 },
  { name: "計算", description: "日付や数値の計算", count: 1 },
];

export default function CategoriesPage() {
  return (
    <ToolLayout
      title="カテゴリ"
      description="目的に近いツールをカテゴリから探せます。"
      category="ツール一覧"
    >
      <div className="category-grid" aria-label="ツールカテゴリ一覧">
        {categories.map((category) => (
          <Card key={category.name}>
            <CardHeader className="category-card-header">
              <span className="category-icon" aria-hidden="true">
                <FolderTree size={17} strokeWidth={1.8} />
              </span>
              <div>
                <CardTitle>{category.name}</CardTitle>
                <p className="category-description">{category.description}</p>
              </div>
            </CardHeader>
            <CardContent>
              <Badge>{category.count}件・公開予定</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </ToolLayout>
  );
}
