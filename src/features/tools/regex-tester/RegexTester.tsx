"use client";

import { useEffect, useState } from "react";
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
import type { RegexMatch } from "./logic";

const REGEX_TIMEOUT_MS = 500;

export function RegexTester({}: ToolComponentProps) {
  const [pattern, setPattern] = useState("\\d+");
  const [flags, setFlags] = useState("g");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    matches: RegexMatch[];
    error: string;
  }>({ matches: [], error: "" });

  useEffect(() => {
    let active = true;
    let worker: Worker;

    try {
      worker = new Worker(new URL("./regex-worker.ts", import.meta.url));
    } catch {
      queueMicrotask(() => {
        if (active) {
          setResult({
            matches: [],
            error: "このブラウザでは正規表現を確認できません。",
          });
        }
      });
      return;
    }

    const timeoutId = window.setTimeout(() => {
      worker.terminate();
      if (active) {
        setResult({
          matches: [],
          error: "正規表現の処理に時間がかかりすぎました。パターンを見直してください。",
        });
      }
    }, REGEX_TIMEOUT_MS);

    worker.onmessage = (
      event: MessageEvent<
        { ok: true; matches: RegexMatch[] } | { ok: false; message: string }
      >,
    ) => {
      window.clearTimeout(timeoutId);
      worker.terminate();
      if (!active) return;
      setResult(
        event.data.ok
          ? { matches: event.data.matches, error: "" }
          : { matches: [], error: event.data.message },
      );
    };

    worker.onerror = () => {
      window.clearTimeout(timeoutId);
      worker.terminate();
      if (active) {
        setResult({ matches: [], error: "正規表現を確認できませんでした。" });
      }
    };

    worker.postMessage({ pattern, flags, input });

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      worker.terminate();
    };
  }, [flags, input, pattern]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>正規表現を確認</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_8rem]">
          <div className="space-y-2">
            <Label htmlFor="regex-pattern">正規表現</Label>
            <Input
              id="regex-pattern"
              value={pattern}
              onChange={(event) => setPattern(event.target.value)}
              maxLength={500}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="regex-flags">フラグ</Label>
            <Input
              id="regex-flags"
              value={flags}
              onChange={(event) => setFlags(event.target.value)}
              placeholder="g"
              maxLength={20}
              className="font-mono"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="regex-input">対象の文字列</Label>
          <Textarea
            id="regex-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={10_000}
            placeholder="検索対象の文字列を入力してください"
            className="min-h-40"
          />
        </div>
        {result.error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {result.error}
          </p>
        )}
        <p className="text-sm text-muted">{result.matches.length}件見つかりました。</p>
        <p className="text-sm text-muted">
          正規表現は500文字以内、フラグは20文字以内、対象の文字列は10,000文字以内で入力してください。
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
