import Link from "next/link";

import type { ToolDefinition } from "@/features/tools/types";

export function RelatedTools({ tools }: { tools: ToolDefinition[] }) {
  return (
    <nav className="related-tool-list" aria-label="関連ツール一覧">
      {tools.map((tool) => (
        <Link key={tool.slug} href={`/tools/${tool.slug}/`} className="related-tool-item">
          <span className="related-tool-name">{tool.name}</span>
          <span className="related-tool-description">{tool.description}</span>
        </Link>
      ))}
    </nav>
  );
}
