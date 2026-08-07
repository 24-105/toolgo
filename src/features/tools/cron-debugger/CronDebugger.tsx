"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import {
  describeCron,
  formatCronRuns,
  getNextCronRuns,
  parseCronExpression,
} from "./logic";

export function CronDebugger({}: ToolComponentProps) {
  const [expression, setExpression] = useState("*/15 9-17 * * 1-5");
  const [description, setDescription] = useState("");
  const [runs, setRuns] = useState<Date[]>([]);
  const [error, setError] = useState("");

  function analyze() {
    try {
      const cron = parseCronExpression(expression);
      setDescription(describeCron(cron));
      setRuns(getNextCronRuns(cron));
      setError("");
    } catch (cause) {
      setDescription("");
      setRuns([]);
      setError(cause instanceof Error ? cause.message : "Cron式を解析できませんでした。");
    }
  }

  const formattedRuns = formatCronRuns(runs);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cron式を確認</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cron-expression">Cron式（分 時 日 月 曜日）</Label>
          <Input
            id="cron-expression"
            value={expression}
            onChange={(event) => setExpression(event.target.value)}
            placeholder="*/15 9-17 * * 1-5"
            spellCheck={false}
            className="font-mono"
          />
          <p className="text-xs text-muted">
            標準的な5項目のCron式に対応します。次回時刻は端末のタイムゾーンで計算します。
          </p>
        </div>
        <Button onClick={analyze}>Cron式を解析する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {description && (
          <div className="space-y-4" aria-live="polite">
            <div className="rounded-md border border-border p-3">
              <p className="text-xs text-muted">実行内容</p>
              <p className="font-semibold">{description}</p>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">次回の実行時刻</h3>
                <CopyButton value={formattedRuns} />
              </div>
              <ol className="space-y-2 rounded-md border border-border p-3 font-mono text-sm">
                {runs.map((run) => (
                  <li key={run.toISOString()}>
                    {new Intl.DateTimeFormat("ja-JP", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(run)}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
