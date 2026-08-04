"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Textarea } from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { renderMarkdown } from "./logic";

const sample =
  "# 見出し\n\nToolGoの**Markdownプレビュー**です。\n\n- 箇条書き\n- `コード`";

export function MarkdownPreview({}: ToolComponentProps) {
  const [input, setInput] = useState("");
  const html = useMemo(() => renderMarkdown(input), [input]);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Markdownを入力</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            aria-label="Markdown"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={sample}
            maxLength={20_000}
            className="min-h-80 font-mono text-sm"
          />
          <p className="mt-2 text-sm text-muted">
            見出し、箇条書き、太字、インラインコードに対応しています。
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>プレビュー</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="min-h-80 rounded-md border border-border bg-surface-muted p-4 leading-7"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
