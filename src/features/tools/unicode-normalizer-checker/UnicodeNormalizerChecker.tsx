"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { analyzeUnicode, type UnicodeAnalysis } from "./logic";

export function UnicodeNormalizerChecker({}: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<UnicodeAnalysis | null>(null);
  const [error, setError] = useState("");

  function analyze() {
    if (input.length === 0) {
      setResult(null);
      setError("確認する文字列を入力してください。");
      return;
    }
    setResult(analyzeUnicode(input));
    setError("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unicodeを正規化・確認</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          aria-label="確認する文字列"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="ここに比較したい文字列を入力してください"
          className="min-h-32"
        />
        <div className="flex flex-wrap gap-2">
          <Button onClick={analyze}>文字の違いを確認する</Button>
          {result && <CopyButton value={result.original} />}
        </div>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <div className="space-y-4" aria-live="polite">
            <div className="space-y-2 rounded-md border border-border p-3">
              <p className="text-sm font-semibold">入力文字列のコードポイント</p>
              <code className="block overflow-x-auto text-sm">
                {result.originalCodePoints.join(" ")}
              </code>
            </div>
            <div className="overflow-x-auto rounded-md border border-border">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <caption className="sr-only">Unicode正規化形式ごとの結果</caption>
                <thead className="border-b border-border bg-surface-muted">
                  <tr>
                    <th className="px-3 py-2">形式</th>
                    <th className="px-3 py-2">変換結果</th>
                    <th className="px-3 py-2">コードポイント</th>
                  </tr>
                </thead>
                <tbody>
                  {result.forms.map((form) => (
                    <tr key={form.form} className="border-b border-border last:border-0">
                      <th className="px-3 py-2 font-mono">{form.form}</th>
                      <td className="max-w-[16rem] break-all px-3 py-2">
                        {form.value}
                        {form.changed && (
                          <span className="ml-2 text-xs text-muted">変更あり</span>
                        )}
                      </td>
                      <td className="max-w-[18rem] break-all px-3 py-2 font-mono text-xs">
                        {form.codePoints.join(" ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {result.suspiciousCharacters.length > 0 && (
              <div className="space-y-2 rounded-md border border-warning p-3">
                <p className="text-sm font-semibold">見た目が似た文字の可能性</p>
                <ul className="list-inside list-disc text-sm">
                  {result.suspiciousCharacters.map((item) => (
                    <li key={item.codePoint}>
                      「{item.character}」（{item.codePoint}）は「{item.looksLike}
                      」に似ています。
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted">
                  文字列に異なる文字体系が混在している場合だけ表示します。自動的に安全性を保証するものではありません。
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
