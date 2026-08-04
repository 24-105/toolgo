"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { testRegex, type RegexMatch } from "./logic";

export function RegexTester({}: ToolComponentProps) {
  const [pattern, setPattern] = useState("\\d+");
  const [flags, setFlags] = useState("g");
  const [input, setInput] = useState("");
  const result = useMemo(() => {
    try {
      return { matches: testRegex(pattern, flags, input), error: "" };
    } catch {
      return {
        matches: [] as RegexMatch[],
        error: "正規表現またはフラグが正しくありません。",
      };
    }
  }, [flags, input, pattern]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>正規表現を確認</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_8rem]">
          <label className="space-y-2 text-sm font-semibold">
            <Label htmlFor="regex-pattern">正規表現</Label>
            <Input
              id="regex-pattern"
              value={pattern}
              onChange={(event) => setPattern(event.target.value)}
              maxLength={500}
              className="font-mono"
            />
          </label>
          <label className="space-y-2 text-sm font-semibold">
            <Label htmlFor="regex-flags">フラグ</Label>
            <Input
              id="regex-flags"
              value={flags}
              onChange={(event) => setFlags(event.target.value)}
              placeholder="g"
              className="font-mono"
            />
          </label>
        </div>
        <label className="block space-y-2 text-sm font-semibold">
          <Label htmlFor="regex-input">対象の文字列</Label>
          <Textarea
            id="regex-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={10_000}
            placeholder="検索対象の文字列を入力してください"
            className="min-h-40"
          />
        </label>
        {result.error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {result.error}
          </p>
        )}
        <p className="text-sm text-muted">{result.matches.length}件見つかりました。</p>
        <p className="text-sm text-muted">
          正規表現は500文字以内、対象の文字列は10,000文字以内で入力してください。
        </p>
        <ul className="space-y-2">
          {result.matches.map((match) => (
            <li
              key={`${match.index}-${match.value}`}
              className="rounded-md border border-border bg-surface-muted p-3 font-mono text-sm"
            >
              {match.value} <span className="text-muted">（位置: {match.index}）</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
