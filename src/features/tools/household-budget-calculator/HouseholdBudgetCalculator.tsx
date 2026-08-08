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
import { calculateHouseholdBudget, type HouseholdBudgetResult } from "./logic";

export function HouseholdBudgetCalculator({}: ToolComponentProps) {
  const [month, setMonth] = useState(currentMonth);
  const [monthlyIncome, setMonthlyIncome] = useState("300000");
  const [fixedExpenses, setFixedExpenses] = useState("100000");
  const [variableExpenses, setVariableExpenses] = useState("50000");
  const [monthlySavings, setMonthlySavings] = useState("30000");
  const [result, setResult] = useState<HouseholdBudgetResult>();
  const [error, setError] = useState("");

  function calculate() {
    try {
      setResult(
        calculateHouseholdBudget({
          month,
          monthlyIncome: Number(monthlyIncome),
          fixedExpenses: Number(fixedExpenses),
          variableExpenses: Number(variableExpenses),
          monthlySavings: Number(monthlySavings),
        }),
      );
      setError("");
    } catch (cause) {
      setResult(undefined);
      setError(
        cause instanceof Error ? cause.message : "家計の予算を計算できませんでした。",
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>1か月の家計を入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="budget-month">対象月</Label>
            <Input
              id="budget-month"
              type="month"
              value={month}
              onChange={(event) => setMonth(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget-income">月の手取り</Label>
            <Input
              id="budget-income"
              type="number"
              min="1"
              max="1000000000"
              step="1"
              value={monthlyIncome}
              onChange={(event) => setMonthlyIncome(event.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="budget-fixed">固定費</Label>
            <Input
              id="budget-fixed"
              type="number"
              min="0"
              max="1000000000"
              step="1"
              value={fixedExpenses}
              onChange={(event) => setFixedExpenses(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget-variable">変動費</Label>
            <Input
              id="budget-variable"
              type="number"
              min="0"
              max="1000000000"
              step="1"
              value={variableExpenses}
              onChange={(event) => setVariableExpenses(event.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2 sm:max-w-[calc(50%-0.5rem)]">
          <Label htmlFor="budget-savings">今月の貯金額</Label>
          <Input
            id="budget-savings"
            type="number"
            min="0"
            max="1000000000"
            step="1"
            value={monthlySavings}
            onChange={(event) => setMonthlySavings(event.target.value)}
          />
        </div>
        <Button onClick={calculate}>家計の予算を計算する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <dl className="grid gap-3 sm:grid-cols-2" aria-live="polite">
            <ResultItem
              label={result.remainingBudget >= 0 ? "残りの予算" : "不足している金額"}
              value={formatYen(Math.abs(result.remainingBudget))}
            />
            <ResultItem
              label="1日あたりの残り目安"
              value={formatYenWithSign(result.dailyBudget)}
            />
            <ResultItem label="対象月の日数" value={`${result.daysInMonth}日`} />
            <ResultItem
              label="貯金の割合"
              value={`${result.savingsRate.toLocaleString("ja-JP", { maximumFractionDigits: 2 })}%`}
            />
          </dl>
        )}
        <p className="text-sm leading-6 text-muted">
          手取りから固定費・変動費・貯金額を引いた残りを、対象月の日数で割った目安です。家計の状況や支出の優先順位を判断するものではありません。
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

function formatYenWithSign(value: number) {
  return `${value >= 0 ? "" : "-"}${formatYen(Math.abs(value))}`;
}

function currentMonth() {
  const parts = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    timeZone: "Asia/Tokyo",
    year: "numeric",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}`;
}
