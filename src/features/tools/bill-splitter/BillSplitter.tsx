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
import { splitBill, type BillSplitResult } from "./logic";

export function BillSplitter({}: ToolComponentProps) {
  const [total, setTotal] = useState("10000");
  const [people, setPeople] = useState("3");
  const [result, setResult] = useState<BillSplitResult>();
  const [error, setError] = useState("");
  function calculate() {
    try {
      setResult(splitBill(Number(total), Number(people)));
      setError("");
    } catch (cause) {
      setResult(undefined);
      setError(cause instanceof Error ? cause.message : "割り勘を計算できませんでした。");
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>金額と人数を入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="bill-total">合計金額</Label>
            <Input
              id="bill-total"
              type="number"
              min="0"
              max="100000000"
              value={total}
              onChange={(event) => setTotal(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bill-people">人数</Label>
            <Input
              id="bill-people"
              type="number"
              min="1"
              max="100"
              value={people}
              onChange={(event) => setPeople(event.target.value)}
            />
          </div>
        </div>
        <Button onClick={calculate}>計算する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <div className="space-y-3" aria-live="polite">
            <p className="text-lg font-semibold">
              基本は1人 {result.baseAmount.toLocaleString("ja-JP")}円
            </p>
            <p className="text-sm text-muted">
              余りの{result.remainder}円は、先頭から1円ずつ加算しています。
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {result.amounts.map((amount, index) => (
                <li
                  key={index}
                  className="rounded-md border border-border bg-surface-muted p-3"
                >
                  {index + 1}人目: {amount.toLocaleString("ja-JP")}円
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
