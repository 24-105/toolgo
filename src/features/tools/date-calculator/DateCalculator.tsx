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
import { calculateDate, type DateCalculation } from "./logic";

export function DateCalculator({}: ToolComponentProps) {
  const [startDate, setStartDate] = useState(todayInJapan);
  const [endDate, setEndDate] = useState(todayInJapan);
  const [days, setDays] = useState("30");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [result, setResult] = useState<DateCalculation>();
  const [error, setError] = useState("");
  function calculate() {
    try {
      setResult(calculateDate(startDate, Number(days), operation, endDate));
      setError("");
    } catch (cause) {
      setResult(undefined);
      setError(cause instanceof Error ? cause.message : "日付を計算できませんでした。");
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>日付を入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date-start">基準日</Label>
            <Input
              id="date-start"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date-end">比較する日付</Label>
            <Input
              id="date-end"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date-days">日数</Label>
            <Input
              id="date-days"
              type="number"
              min="0"
              max="100000"
              value={days}
              onChange={(event) => setDays(event.target.value)}
            />
          </div>
          <label className="space-y-2 text-sm font-semibold">
            <span className="block">基準日から</span>
            <Select
              value={operation}
              onChange={(event) => setOperation(event.target.value as "add" | "subtract")}
            >
              <option value="add">日数を足す</option>
              <option value="subtract">日数を引く</option>
            </Select>
          </label>
        </div>
        <Button onClick={calculate}>計算する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <div className="grid gap-3 sm:grid-cols-2" aria-live="polite">
            <ResultItem label="計算結果の日付" value={result.resultDate} />
            <ResultItem
              label="2つの日付の差"
              value={`${result.daysBetween.toLocaleString("ja-JP")}日`}
            />
          </div>
        )}
        <p className="text-sm leading-6 text-muted">
          暦日として計算します。開始日を1日目として数える場合は、必要に応じて日数に1を加えてください。
        </p>
      </CardContent>
    </Card>
  );
}

function ResultItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-surface-muted p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
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
