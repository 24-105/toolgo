"use client";

import { useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { countCharacters } from "./logic";

export function CharacterCounter({}: ToolComponentProps) {
  const [input, setInput] = useState("");
  const count = countCharacters(input);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)]">
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">文章を入力</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            aria-label="カウントする文章"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="ここに文章を入力してください"
            className="tool-editor-field resize-none"
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => setInput("")}
            disabled={!input}
          >
            クリア
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">集計結果</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-3">
            <CountItem label="文字数（空白を含む）" value={count.withSpaces} />
            <CountItem label="文字数（空白を除く）" value={count.withoutSpaces} />
            <CountItem label="単語数" value={count.words} />
            <CountItem label="行数" value={count.lines} />
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

function CountItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border bg-surface-muted p-3">
      <dt className="text-xs leading-5 text-muted">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums">
        {value.toLocaleString("ja-JP")}
      </dd>
    </div>
  );
}
