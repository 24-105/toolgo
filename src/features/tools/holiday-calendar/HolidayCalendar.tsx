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
import {
  getHolidayCalendar,
  type HolidayCalendar as HolidayCalendarResult,
  type HolidayEntry,
} from "./logic";

export function HolidayCalendar({}: ToolComponentProps) {
  const [year, setYear] = useState(String(currentYear()));
  const [result, setResult] = useState<HolidayCalendarResult>(() =>
    getHolidayCalendar(currentYear()),
  );
  const [error, setError] = useState("");

  function showCalendar() {
    try {
      setResult(getHolidayCalendar(Number(year)));
      setError("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "祝日を表示できませんでした。");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>表示する年を選択</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="w-full space-y-2 sm:max-w-xs">
            <Label htmlFor="holiday-year">年</Label>
            <Input
              id="holiday-year"
              type="number"
              min="2000"
              max="2099"
              step="1"
              value={year}
              onChange={(event) => setYear(event.target.value)}
            />
          </div>
          <Button onClick={showCalendar}>カレンダーを表示する</Button>
        </div>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        <div className="grid gap-3 sm:grid-cols-2" aria-live="polite">
          <SummaryItem label="祝日・休日の日数" value={`${result.entries.length}日`} />
          <SummaryItem label="3連休以上" value={`${result.longWeekends.length}回`} />
        </div>
        <section className="space-y-3" aria-labelledby="holiday-list-heading">
          <h3 id="holiday-list-heading" className="text-base font-semibold">
            {result.year}年の祝日・休日
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {result.entries.map((entry) => (
              <HolidayItem key={entry.date} entry={entry} />
            ))}
          </ul>
        </section>
        <section className="space-y-3" aria-labelledby="long-weekend-heading">
          <h3 id="long-weekend-heading" className="text-base font-semibold">
            3連休以上
          </h3>
          {result.longWeekends.length > 0 ? (
            <ul className="grid gap-2 sm:grid-cols-2">
              {result.longWeekends.map((span) => (
                <li
                  key={span.start}
                  className="rounded-md border border-border bg-surface-muted p-3"
                >
                  <span className="font-semibold">{span.days}連休</span>
                  <span className="ml-2 text-sm text-muted">
                    {formatDateLabel(span.start)}〜{formatDateLabel(span.end)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">3連休以上はありません。</p>
          )}
        </section>
        <p className="text-sm leading-6 text-muted">
          土日と国民の祝日・休日を連続した休みとして集計します。春分の日・秋分の日は天文計算による目安で、正式な日付は公表後に確認してください。
        </p>
      </CardContent>
    </Card>
  );
}

function HolidayItem({ entry }: { entry: HolidayEntry }) {
  return (
    <li className="rounded-md border border-border bg-surface-muted p-3">
      <span className="font-semibold">{formatDateLabel(entry.date)}</span>
      <span className="ml-2">{entry.name}</span>
      {entry.kind !== "holiday" && (
        <span className="ml-2 text-sm text-muted">（{kindLabel(entry)}）</span>
      )}
    </li>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-surface-muted p-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 text-lg font-semibold">{value}</dd>
    </div>
  );
}

function kindLabel(entry: HolidayEntry) {
  return entry.kind === "substitute" ? "振替休日" : "祝日に挟まれた休日";
}

function formatDateLabel(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const weekday = new Intl.DateTimeFormat("ja-JP", {
    weekday: "short",
    timeZone: "UTC",
  }).format(date);
  return `${month}月${day}日（${weekday}）`;
}

function currentYear() {
  return Number(
    new Intl.DateTimeFormat("en-US", { year: "numeric", timeZone: "Asia/Tokyo" }).format(
      new Date(),
    ),
  );
}
