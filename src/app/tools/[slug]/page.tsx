import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { RelatedTools, ToolLayout } from "@/components/layout";
import { getRelatedTools, getToolBySlug, getTools } from "@/features/tools/registry";
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
    title: tool.seoTitle ?? tool.name,
    description: tool.seoDescription ?? tool.description,
    path: `/tools/${tool.slug}/`,
    keywords: tool.seoKeywords ?? tool.keywords,
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = tool.component;

  if (!ToolComponent || tool.status !== "available") {
    notFound();
  }

  return (
    <ToolLayout
      title={tool.name}
      description={tool.description}
      category={tool.category}
      details={tool.details}
      relatedTools={<RelatedTools tools={getRelatedTools(tool)} />}
    >
      <ToolComponent metadata={tool} />
    </ToolLayout>
  );
}
