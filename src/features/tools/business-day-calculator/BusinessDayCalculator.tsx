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
  Select,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import {
  calculateBusinessDate,
  type BusinessDayOperation,
  type BusinessDayResult,
} from "./logic";

export function BusinessDayCalculator({}: ToolComponentProps) {
  const [startDate, setStartDate] = useState(todayInJapan);
  const [businessDays, setBusinessDays] = useState("10");
  const [operation, setOperation] = useState<BusinessDayOperation>("add");
  const [result, setResult] = useState<BusinessDayResult>();
  const [error, setError] = useState("");

  function calculate() {
    try {
      setResult(calculateBusinessDate(startDate, Number(businessDays), operation));
      setError("");
    } catch (cause) {
      setResult(undefined);
      setError(cause instanceof Error ? cause.message : "営業日を計算できませんでした。");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>基準日と営業日数を入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="business-day-start">基準日</Label>
            <Input
              id="business-day-start"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="business-day-count">営業日数</Label>
            <Input
              id="business-day-count"
              type="number"
              min="0"
              max="100000"
              step="1"
              value={businessDays}
              onChange={(event) => setBusinessDays(event.target.value)}
            />
          </div>
        </div>
        <label className="block max-w-md space-y-2 text-sm font-semibold">
          <span className="tool-editor-field-label">基準日から</span>
          <Select
            value={operation}
            onChange={(event) => setOperation(event.target.value as BusinessDayOperation)}
          >
            <option value="add">営業日を足す</option>
            <option value="subtract">営業日を引く</option>
          </Select>
        </label>
        <Button onClick={calculate}>営業日を計算する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <dl className="grid gap-3 sm:grid-cols-2" aria-live="polite">
            <ResultItem label="計算結果の日付" value={result.resultDate} />
            <ResultItem
              label="経過した暦日"
              value={`${result.calendarDays.toLocaleString("ja-JP")}日`}
            />
          </dl>
        )}
        <p className="text-sm leading-6 text-muted">
          土日と日本の祝日・休日を除いて計算します。基準日は営業日数に含めません。
        </p>
      </CardContent>
    </Card>
  );
}

function ResultItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-surface-muted p-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 text-lg font-semibold">{value}</dd>
    </div>
  );
}

function todayInJapan() {
  const parts = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Tokyo",
    year: "numeric",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}
