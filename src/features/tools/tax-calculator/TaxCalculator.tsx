"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  Label,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { calculateTax, type TaxMode, type TaxResult } from "./logic";

export function TaxCalculator({}: ToolComponentProps) {
  const [amount, setAmount] = useState("10000");
  const [rate, setRate] = useState("0.1");
  const [mode, setMode] = useState<TaxMode>("beforeTax");
  const [result, setResult] = useState<TaxResult>();
  const [error, setError] = useState("");
  function calculate() {
    try {
      setResult(calculateTax(Number(amount), Number(rate), mode));
      setError("");
    } catch (cause) {
      setResult(undefined);
      setError(cause instanceof Error ? cause.message : "税額を計算できませんでした。");
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>金額を入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="tax-amount">金額</Label>
            <Input
              id="tax-amount"
              type="number"
              min="0"
              max="100000000"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>
          <label className="space-y-2 text-sm font-semibold">
            <span className="tool-editor-field-label">税率</span>
            <Select value={rate} onChange={(event) => setRate(event.target.value)}>
              <option value="0.1">10%</option>
              <option value="0.08">8%</option>
            </Select>
          </label>
          <label className="space-y-2 text-sm font-semibold">
            <span className="tool-editor-field-label">入力する金額</span>
            <Select
              value={mode}
              onChange={(event) => setMode(event.target.value as TaxMode)}
            >
              <option value="beforeTax">税抜価格</option>
              <option value="afterTax">税込価格</option>
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
          <dl className="grid gap-3 sm:grid-cols-3" aria-live="polite">
            <ResultItem label="税抜価格" value={result.beforeTax} />
            <ResultItem label="消費税" value={result.tax} />
            <ResultItem label="税込価格" value={result.afterTax} />
          </dl>
        )}
        <p className="text-sm leading-6 text-muted">
          軽減税率の対象品目は8%です。実際の取引では、商品の区分や端数処理の方法を確認してください。
        </p>
      </CardContent>
    </Card>
  );
}

function ResultItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border bg-surface-muted p-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 text-lg font-semibold">{value.toLocaleString("ja-JP")}円</dd>
    </div>
  );
}
