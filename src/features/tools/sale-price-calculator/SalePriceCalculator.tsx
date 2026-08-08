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
import { calculateSalePrice, type SalePriceResult } from "./logic";

export function SalePriceCalculator({}: ToolComponentProps) {
  const [price, setPrice] = useState("3000");
  const [quantity, setQuantity] = useState("2");
  const [discountRate, setDiscountRate] = useState("20");
  const [taxRate, setTaxRate] = useState("0.1");
  const [result, setResult] = useState<SalePriceResult>();
  const [error, setError] = useState("");

  function calculate() {
    try {
      setResult(
        calculateSalePrice({
          price: Number(price),
          quantity: Number(quantity),
          discountRate: Number(discountRate),
          taxRate: Number(taxRate),
        }),
      );
      setError("");
    } catch (cause) {
      setResult(undefined);
      setError(
        cause instanceof Error ? cause.message : "セール価格を計算できませんでした。",
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>商品の条件を入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="sale-price">1個あたりの価格</Label>
            <Input
              id="sale-price"
              type="number"
              min="1"
              max="100000000"
              step="1"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sale-quantity">個数</Label>
            <Input
              id="sale-quantity"
              type="number"
              min="1"
              max="1000"
              step="1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="sale-discount">割引率</Label>
            <Input
              id="sale-discount"
              type="number"
              min="0"
              max="100"
              step="1"
              value={discountRate}
              onChange={(event) => setDiscountRate(event.target.value)}
            />
          </div>
          <label className="space-y-2 text-sm font-semibold">
            <span className="tool-editor-field-label">消費税率</span>
            <Select value={taxRate} onChange={(event) => setTaxRate(event.target.value)}>
              <option value="0.1">10%</option>
              <option value="0.08">8%</option>
              <option value="0">非課税・税計算なし</option>
            </Select>
          </label>
        </div>
        <Button onClick={calculate}>セール価格を計算する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <dl className="grid gap-3 sm:grid-cols-2" aria-live="polite">
            <ResultItem label="通常価格の合計" value={formatYen(result.originalTotal)} />
            <ResultItem label="割引額" value={`-${formatYen(result.discountAmount)}`} />
            <ResultItem label="割引後の価格" value={formatYen(result.discountedTotal)} />
            <ResultItem label="消費税" value={formatYen(result.taxAmount)} />
            <ResultItem label="支払合計" value={formatYen(result.total)} />
          </dl>
        )}
        <p className="text-sm leading-6 text-muted">
          個数分の合計に割引を適用し、割引後の価格へ消費税を加えます。店舗ごとの端数処理や特別な割引条件は考慮しません。
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
