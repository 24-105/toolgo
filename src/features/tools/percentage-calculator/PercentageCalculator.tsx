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
import { calculatePercentage, type PercentageOperation } from "./logic";

const operationOptions: Array<{ value: PercentageOperation; label: string }> = [
  { value: "ratio", label: "AはBの何%か" },
  { value: "of", label: "AのB%はいくつか" },
  { value: "change", label: "AからBへの増減率" },
  { value: "discount", label: "AのB%引き価格" },
];

const fieldLabels: Record<PercentageOperation, [string, string]> = {
  ratio: ["部分の数（A）", "全体の数（B）"],
  of: ["基準の数（A）", "割合（B）"],
  change: ["変化前の数（A）", "変化後の数（B）"],
  discount: ["元の価格（A）", "割引率（B）"],
};

export function PercentageCalculator({}: ToolComponentProps) {
  const [operation, setOperation] = useState<PercentageOperation>("ratio");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  function calculate() {
    try {
      const output = calculatePercentage(operation, Number(first), Number(second));
      setResult(
        `${output.value.toLocaleString("ja-JP", { maximumFractionDigits: 8 })}${output.suffix}`,
      );
      setError("");
    } catch (cause) {
      setResult("");
      setError(cause instanceof Error ? cause.message : "計算できませんでした。");
    }
  }

  const labels = fieldLabels[operation];

  function handleCalculate() {
    if (!first.trim() || !second.trim()) {
      setResult("");
      setError("2つの数値を入力してください。");
      return;
    }
    calculate();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>割合を計算</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="block space-y-2 text-sm font-semibold">
          <span className="tool-editor-field-label">計算方法</span>
          <Select
            value={operation}
            onChange={(event) => {
              setOperation(event.target.value as PercentageOperation);
              setResult("");
              setError("");
            }}
          >
            {operationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="percentage-first">{labels[0]}</Label>
            <Input
              id="percentage-first"
              type="number"
              step="any"
              value={first}
              onChange={(event) => setFirst(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="percentage-second">{labels[1]}</Label>
            <Input
              id="percentage-second"
              type="number"
              step="any"
              value={second}
              onChange={(event) => setSecond(event.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleCalculate}>計算する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <div className="rounded-md border border-border bg-surface-muted p-4">
            <p className="text-sm text-muted">計算結果</p>
            <p className="mt-1 text-2xl font-bold">{result}</p>
          </div>
        )}
        <p className="text-sm leading-6 text-muted">
          割合、増減率、割引後の価格をブラウザ内で計算できます。小数の結果は最大8桁まで表示します。
        </p>
      </CardContent>
    </Card>
  );
}
