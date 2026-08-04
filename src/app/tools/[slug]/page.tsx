import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ToolLayout } from "@/components/layout";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { getToolBySlug, getTools } from "@/features/tools/registry";
import { createPageMetadata } from "@/lib/seo";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {};
  }

  return createPageMetadata({
    title: tool.name,
    description: tool.description,
    path: `/tools/${tool.slug}/`,
    keywords: tool.keywords,
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = tool.component;

  return (
    <ToolLayout
      title={tool.name}
      description={tool.description}
      category={tool.category}
      details={tool.details}
    >
      {ToolComponent ? (
        <ToolComponent metadata={tool} />
      ) : (
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle>公開準備中です</CardTitle>
              <Badge variant="warning">準備中</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted">
              このツールは準備中です。公開までお待ちください。
            </p>
          </CardContent>
        </Card>
      )}
    </ToolLayout>
  );
}
