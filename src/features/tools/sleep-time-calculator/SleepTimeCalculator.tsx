"use client";

import { useState } from "react";

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
import { calculateSleep, type SleepResult } from "./logic";

export function SleepTimeCalculator({}: ToolComponentProps) {
  const [bedtime, setBedtime] = useState("23:00");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [result, setResult] = useState<SleepResult>();
  const [error, setError] = useState("");

  function calculate() {
    try {
      setResult(calculateSleep(bedtime, wakeTime));
      setError("");
    } catch (cause) {
      setResult(undefined);
      setError(
        cause instanceof Error ? cause.message : "睡眠時間を計算できませんでした。",
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>就寝時刻と起床時刻を入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="sleep-bedtime">就寝時刻</Label>
            <Input
              id="sleep-bedtime"
              type="time"
              value={bedtime}
              onChange={(event) => setBedtime(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sleep-wake-time">起床時刻</Label>
            <Input
              id="sleep-wake-time"
              type="time"
              value={wakeTime}
              onChange={(event) => setWakeTime(event.target.value)}
            />
          </div>
        </div>
        <Button onClick={calculate}>睡眠時間を計算する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <div className="space-y-2" aria-live="polite">
            <p className="rounded-md border border-border bg-surface-muted p-4 text-2xl font-bold">
              {result.hours}時間{result.minutes > 0 ? `${result.minutes}分` : ""}
            </p>
            {result.crossesMidnight && (
              <p className="text-sm text-muted">日付をまたいで計算しています。</p>
            )}
          </div>
        )}
        <p className="text-sm leading-6 text-muted">
          就寝から起床までの経過時間を計算します。昼寝や入眠までの時間、睡眠の質は考慮しません。
        </p>
      </CardContent>
    </Card>
  );
}
