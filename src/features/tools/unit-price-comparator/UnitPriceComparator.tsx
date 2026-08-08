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
import { compareUnitPrices, type ComparableUnit, type UnitPriceResult } from "./logic";

const unitOptions: Array<{ value: ComparableUnit; label: string }> = [
  { value: "g", label: "グラム（g）" },
  { value: "kg", label: "キログラム（kg）" },
  { value: "ml", label: "ミリリットル（ml）" },
  { value: "l", label: "リットル（L）" },
  { value: "個", label: "個" },
  { value: "枚", label: "枚" },
  { value: "cm", label: "センチメートル（cm）" },
  { value: "m", label: "メートル（m）" },
];

export function UnitPriceComparator({}: ToolComponentProps) {
  const [priceA, setPriceA] = useState("398");
  const [quantityA, setQuantityA] = useState("500");
  const [unitA, setUnitA] = useState<ComparableUnit>("g");
  const [priceB, setPriceB] = useState("698");
  const [quantityB, setQuantityB] = useState("1");
  const [unitB, setUnitB] = useState<ComparableUnit>("kg");
  const [result, setResult] = useState<UnitPriceResult>();
  const [error, setError] = useState("");

  function calculate() {
    try {
      setResult(
        compareUnitPrices(
          { price: Number(priceA), quantity: Number(quantityA), unit: unitA },
          { price: Number(priceB), quantity: Number(quantityB), unit: unitB },
        ),
      );
      setError("");
    } catch (cause) {
      setResult(undefined);
      setError(cause instanceof Error ? cause.message : "単価を比較できませんでした。");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>商品の価格と内容量を入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <ProductFields
            idPrefix="unit-price-a"
            title="商品A"
            price={priceA}
            quantity={quantityA}
            unit={unitA}
            onPriceChange={setPriceA}
            onQuantityChange={setQuantityA}
            onUnitChange={setUnitA}
          />
          <ProductFields
            idPrefix="unit-price-b"
            title="商品B"
            price={priceB}
            quantity={quantityB}
            unit={unitB}
            onPriceChange={setPriceB}
            onQuantityChange={setQuantityB}
            onUnitChange={setUnitB}
          />
        </div>
        <Button onClick={calculate}>単価を比較する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <div className="space-y-3" aria-live="polite">
            <dl className="grid gap-3 sm:grid-cols-2">
              <ResultItem
                label={`商品Aの単価（${result.baseUnit}あたり）`}
                value={formatYen(result.productAUnitPrice)}
              />
              <ResultItem
                label={`商品Bの単価（${result.baseUnit}あたり）`}
                value={formatYen(result.productBUnitPrice)}
              />
            </dl>
            <p className="rounded-md border border-border bg-surface-muted p-4 font-semibold">
              {result.better === "tie"
                ? "単価は同じです。"
                : `${result.better === "a" ? "商品A" : "商品B"}のほうが単価が安く、約${result.savingRate.toLocaleString("ja-JP", { maximumFractionDigits: 2 })}%お得です。`}
            </p>
          </div>
        )}
        <p className="text-sm leading-6 text-muted">
          gとkg、mlとL、cmとmは自動でそろえて比較します。価格は税込・割引後など、比較したい金額を入力してください。
        </p>
      </CardContent>
    </Card>
  );
}

type ProductFieldsProps = {
  idPrefix: string;
  title: string;
  price: string;
  quantity: string;
  unit: ComparableUnit;
  onPriceChange: (value: string) => void;
  onQuantityChange: (value: string) => void;
  onUnitChange: (value: ComparableUnit) => void;
};

function ProductFields({
  idPrefix,
  title,
  price,
  quantity,
  unit,
  onPriceChange,
  onQuantityChange,
  onUnitChange,
}: ProductFieldsProps) {
  return (
    <fieldset className="space-y-3 rounded-md border border-border p-4">
      <legend className="px-1 text-sm font-semibold">{title}</legend>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-price`}>価格</Label>
        <Input
          id={`${idPrefix}-price`}
          type="number"
          min="1"
          max="1000000000"
          step="1"
          value={price}
          onChange={(event) => onPriceChange(event.target.value)}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-quantity`}>内容量・個数</Label>
          <Input
            id={`${idPrefix}-quantity`}
            type="number"
            min="0.001"
            max="1000000000"
            step="any"
            value={quantity}
            onChange={(event) => onQuantityChange(event.target.value)}
          />
        </div>
        <label className="block space-y-2 text-sm font-semibold">
          <span className="tool-editor-field-label">単位</span>
          <Select
            value={unit}
            onChange={(event) => onUnitChange(event.target.value as ComparableUnit)}
          >
            {unitOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>
      </div>
    </fieldset>
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
  return `${value.toLocaleString("ja-JP", { maximumFractionDigits: 4 })}円`;
}
