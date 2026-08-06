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
import { compareJson, diffLinesToText, type JsonDiffLine } from "./logic";

const sampleLeft = '{\n  "name": "ToolGo",\n  "free": true\n}';
const sampleRight = '{\n  "name": "ToolGo",\n  "free": true,\n  "tools": 25\n}';

export function JsonDiff({}: ToolComponentProps) {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [diff, setDiff] = useState<JsonDiffLine[]>([]);
  const [error, setError] = useState("");

  function run() {
    try {
      setDiff(compareJson(left, right));
      setError("");
    } catch (cause) {
      setDiff([]);
      setError(cause instanceof Error ? cause.message : "JSONを比較できませんでした。");
    }
  }

  const output = diffLinesToText(diff);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">比較するJSON</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold">
              <span className="tool-editor-field-label">変更前</span>
              <Textarea
                value={left}
                onChange={(event) => setLeft(event.target.value)}
                placeholder={sampleLeft}
                className="tool-editor-field resize-none font-mono text-sm"
                spellCheck={false}
              />
            </label>
            <label className="space-y-2 text-sm font-semibold">
              <span className="tool-editor-field-label">変更後</span>
              <Textarea
                value={right}
                onChange={(event) => setRight(event.target.value)}
                placeholder={sampleRight}
                className="tool-editor-field resize-none font-mono text-sm"
                spellCheck={false}
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={run}>差分を比較する</Button>
            <Button
              variant="ghost"
              onClick={() => {
                setLeft("");
                setRight("");
                setDiff([]);
                setError("");
              }}
            >
              クリア
            </Button>
          </div>
          {error && (
            <p role="alert" className="text-sm font-semibold text-danger">
              {error}
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">差分結果</CardTitle>
          <CopyButton value={output} />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="tool-editor-field-label text-sm font-semibold text-foreground">
              JSON差分結果
            </p>
            <pre className="tool-editor-field overflow-auto rounded-md border border-border bg-surface-muted p-4 font-mono text-sm leading-6">
              {diff.length > 0 ? (
                diff.map((line, index) => (
                  <span
                    key={`${line.type}-${index}`}
                    className={
                      line.type === "added"
                        ? "block bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
                        : line.type === "removed"
                          ? "block bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200"
                          : "block"
                    }
                  >
                    {`${line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}${line.text}`}
                  </span>
                ))
              ) : (
                <span className="text-muted">ここに差分が表示されます。</span>
              )}
            </pre>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">
            +は追加、-は削除、空白は共通部分です。JSONを整形して構造を比較します。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
