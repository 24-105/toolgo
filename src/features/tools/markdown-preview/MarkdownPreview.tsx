"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Textarea } from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { renderMarkdown } from "./logic";

const sample =
  "# 見出し\n\nToolGoの**Markdownプレビュー**です。\n\n- 箇条書き\n- `コード`\n\n| 項目 | 内容 |\n| --- | --- |\n| GFM | 対応 |";

export function MarkdownPreview({}: ToolComponentProps) {
  const [input, setInput] = useState("");
  const html = useMemo(() => renderMarkdown(input), [input]);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">Markdownを入力</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            aria-label="Markdown"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={sample}
            maxLength={20_000}
            className="tool-editor-field resize-none font-mono text-sm"
          />
          <p className="text-sm text-muted">
            CommonMarkとGFMの見出し、リスト、テーブル、リンク、コードブロックなどに対応しています。HTMLは無効化し、&lt;br&gt;だけ改行として扱います。
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">プレビュー</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="tool-editor-field markdown-preview overflow-auto rounded-md border border-border bg-surface-muted p-4 leading-7"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
