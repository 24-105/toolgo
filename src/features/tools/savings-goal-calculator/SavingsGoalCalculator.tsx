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
import { calculateSavings, type SavingsMode, type SavingsResult } from "./logic";

export function SavingsGoalCalculator({}: ToolComponentProps) {
  const [mode, setMode] = useState<SavingsMode>("monthly");
  const [targetAmount, setTargetAmount] = useState("1000000");
  const [currentAmount, setCurrentAmount] = useState("0");
  const [monthlyAmount, setMonthlyAmount] = useState("30000");
  const [deadline, setDeadline] = useState(() => oneYearFrom(todayInJapan()));
  const [result, setResult] = useState<SavingsResult>();
  const [error, setError] = useState("");

  function calculate() {
    if (!targetAmount.trim() || !currentAmount.trim()) {
      setResult(undefined);
      setError("目標金額と現在の貯金額を入力してください。");
      return;
    }
    if (mode === "monthly" && !monthlyAmount.trim()) {
      setResult(undefined);
      setError("毎月の積立額を入力してください。");
      return;
    }
    if (mode === "deadline" && !deadline.trim()) {
      setResult(undefined);
      setError("目標日を入力してください。");
      return;
    }

    try {
      setResult(
        calculateSavings({
          mode,
          targetAmount: Number(targetAmount),
          currentAmount: Number(currentAmount),
          monthlyAmount: mode === "monthly" ? Number(monthlyAmount) : undefined,
          deadline: mode === "deadline" ? deadline : undefined,
          today: todayInJapan(),
        }),
      );
      setError("");
    } catch (cause) {
      setResult(undefined);
      setError(
        cause instanceof Error ? cause.message : "貯金計画を計算できませんでした。",
      );
    }
  }

  function changeMode(nextMode: SavingsMode) {
    setMode(nextMode);
    setResult(undefined);
    setError("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>貯金の目標を設定</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="block max-w-md space-y-2 text-sm font-semibold">
          <span className="tool-editor-field-label">計算方法</span>
          <Select
            value={mode}
            onChange={(event) => changeMode(event.target.value as SavingsMode)}
          >
            <option value="monthly">毎月の積立額から達成時期を計算</option>
            <option value="deadline">目標日から必要な積立額を計算</option>
          </Select>
        </label>
        <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="savings-target">目標金額</Label>
            <Input
              id="savings-target"
              type="number"
              min="1"
              max="1000000000"
              step="1"
              value={targetAmount}
              onChange={(event) => setTargetAmount(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="savings-current">現在の貯金額</Label>
            <Input
              id="savings-current"
              type="number"
              min="0"
              max="1000000000"
              step="1"
              value={currentAmount}
              onChange={(event) => setCurrentAmount(event.target.value)}
            />
          </div>
        </div>
        {mode === "monthly" ? (
          <div className="space-y-2 sm:max-w-[calc(50%-0.5rem)]">
            <Label htmlFor="savings-monthly">毎月の積立額</Label>
            <Input
              id="savings-monthly"
              type="number"
              min="1"
              max="1000000000"
              step="1"
              value={monthlyAmount}
              onChange={(event) => setMonthlyAmount(event.target.value)}
            />
          </div>
        ) : (
          <div className="space-y-2 sm:max-w-[calc(50%-0.5rem)]">
            <Label htmlFor="savings-deadline">目標日</Label>
            <Input
              id="savings-deadline"
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
            />
          </div>
        )}
        <Button onClick={calculate}>計算する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <div className="space-y-3" aria-live="polite">
            {result.achieved ? (
              <p className="rounded-md border border-border bg-surface-muted p-4 text-lg font-semibold">
                目標金額に到達しています。
              </p>
            ) : (
              <dl className="grid gap-3 sm:grid-cols-2">
                <ResultItem
                  label="あと必要な金額"
                  value={formatYen(result.remainingAmount)}
                />
                <ResultItem
                  label="毎月の積立額"
                  value={formatYen(result.monthlyAmount)}
                />
                <ResultItem
                  label="必要な積立回数"
                  value={`${result.months.toLocaleString("ja-JP")}回`}
                />
                <ResultItem
                  label={mode === "monthly" ? "達成予定" : "目標日"}
                  value={`${result.targetDate}${mode === "monthly" ? "ごろ" : ""}`}
                />
              </dl>
            )}
          </div>
        )}
        <p className="text-sm leading-6 text-muted">
          月1回積み立てる前提の目安です。利息、臨時収入、途中の支出、積立日のずれは考慮しません。
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

function formatYen(value: number) {
  return `${value.toLocaleString("ja-JP")}円`;
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

function oneYearFrom(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const nextYear = year + 1;
  const lastDay = new Date(Date.UTC(nextYear, month, 0)).getUTCDate();
  return `${nextYear}-${String(month).padStart(2, "0")}-${String(Math.min(day, lastDay)).padStart(2, "0")}`;
}
