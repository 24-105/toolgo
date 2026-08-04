"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Textarea } from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { compareLines } from "./logic";

export function TextDiff({}: ToolComponentProps) {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const result = useMemo(() => {
    try {
      return { rows: compareLines(left, right), error: "" };
    } catch (cause) {
      return {
        rows: [],
        error: cause instanceof Error ? cause.message : "文章を比較できませんでした。",
      };
    }
  }, [left, right]);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>変更前</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            aria-label="変更前の文章"
            value={left}
            onChange={(event) => setLeft(event.target.value)}
            placeholder="変更前の文章を入力してください"
            className="min-h-64 font-mono text-sm"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>変更後</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            aria-label="変更後の文章"
            value={right}
            onChange={(event) => setRight(event.target.value)}
            placeholder="変更後の文章を入力してください"
            className="min-h-64 font-mono text-sm"
          />
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>差分</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="min-h-32 overflow-auto rounded-md border border-border bg-surface-muted p-4 font-mono text-sm leading-6">
            {result.rows.map((row, index) => (
              <span
                key={`${row.type}-${index}`}
                className={`block ${row.type === "added" ? "bg-green-100 text-green-900" : row.type === "removed" ? "bg-red-100 text-red-900" : ""}`}
              >
                {row.type === "added" ? "+ " : row.type === "removed" ? "- " : "  "}
                {row.value || " "}
              </span>
            ))}
          </pre>
          {result.error && (
            <p role="alert" className="mt-3 text-sm font-semibold text-danger">
              {result.error}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
