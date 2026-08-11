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
import { calculateAge } from "./logic";

export function AgeCalculator({}: ToolComponentProps) {
  const [birthDate, setBirthDate] = useState("");
  const [referenceDate, setReferenceDate] = useState(() => toInputDate(new Date()));
  const [result, setResult] = useState<{
    age: number;
    daysUntilBirthday: number;
    nextBirthday: string;
  }>();
  const [error, setError] = useState("");

  function calculate() {
    try {
      setResult(calculateAge(birthDate, referenceDate));
      setError("");
    } catch (cause) {
      setResult(undefined);
      setError(cause instanceof Error ? cause.message : "年齢を計算できませんでした。");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>日付を入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="birth-date">誕生日</Label>
            <Input
              id="birth-date"
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference-date">基準日</Label>
            <Input
              id="reference-date"
              type="date"
              value={referenceDate}
              onChange={(event) => setReferenceDate(event.target.value)}
            />
          </div>
        </div>
        <Button type="button" onClick={calculate}>
          計算する
        </Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <div className="grid gap-3 sm:grid-cols-3" aria-live="polite">
            <ResultItem label="満年齢" value={`${result.age}歳`} />
            <ResultItem label="次の誕生日まで" value={`${result.daysUntilBirthday}日`} />
            <ResultItem label="次の誕生日" value={result.nextBirthday} />
          </div>
        )}
        <p className="text-sm leading-6 text-muted">
          入力した日付を日本時間の暦日として計算します。2月29日生まれの場合は、うるう年ではない年の誕生日を2月28日として計算します。制度上の年齢判定には使わないでください。
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

function toInputDate(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Tokyo",
    year: "numeric",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}
