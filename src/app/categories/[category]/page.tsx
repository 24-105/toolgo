import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ToolLayout } from "@/components/layout";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  getCategories,
  getCategoryBySlug,
  getToolsByCategory,
} from "@/features/tools/registry";
import { createPageMetadata } from "@/lib/seo";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return getCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return createPageMetadata({
    title: `${category.name}のツール`,
    description: `${category.description}ツールの一覧です。`,
    path: `/categories/${category.slug}/`,
    keywords: [category.name, "無料ツール"],
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(category.name);

  return (
    <ToolLayout
      title={`${category.name}のツール`}
      description={`${category.description}ツールの一覧です。`}
      category="カテゴリ"
    >
      <Card>
        <CardHeader>
          <CardTitle>{category.name}のツール</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="tool-list" aria-label={`${category.name}のツール一覧`}>
            {tools.map((tool) => (
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
