import { FolderTree } from "lucide-react";
import Link from "next/link";

import { ToolLayout } from "@/components/layout";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { getCategories, getToolsByCategory } from "@/features/tools/registry";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "無料ツールをカテゴリから探す｜ブラウザツール一覧",
  description:
    "開発、文章、生成、計算、デザイン、日常生活など、目的別にToolGoの無料ブラウザツールを探せます。",
  path: "/categories/",
  keywords: ["無料ツール カテゴリ", "ブラウザツール", "開発ツール", "計算ツール"],
});

export default function CategoriesPage() {
  return (
    <ToolLayout
      title="無料ツールをカテゴリから探す｜ブラウザツール一覧"
      description="開発、文章、生成、計算、デザイン、日常生活など、目的に合う無料ツールをカテゴリから探せます。各カテゴリでは、用途と入力データの扱いを確認しながらツールを選べます。"
      category="ツール一覧"
      currentPath="/categories/"
    >
      <div className="category-grid" aria-label="ツールカテゴリ一覧">
        {getCategories().map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}/`}
            className="category-card-link"
          >
            <Card>
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
                <Badge>{getToolsByCategory(category.name).length}件のツール</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </ToolLayout>
  );
}
