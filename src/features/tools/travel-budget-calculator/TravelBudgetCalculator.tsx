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
import { calculateTravelBudget, type TravelBudgetResult } from "./logic";

export function TravelBudgetCalculator({}: ToolComponentProps) {
  const [people, setPeople] = useState("2");
  const [nights, setNights] = useState("2");
  const [transportPerPerson, setTransportPerPerson] = useState("5000");
  const [lodgingPerNight, setLodgingPerNight] = useState("10000");
  const [foodPerPersonPerDay, setFoodPerPersonPerDay] = useState("4000");
  const [activitiesTotal, setActivitiesTotal] = useState("10000");
  const [otherTotal, setOtherTotal] = useState("5000");
  const [budgetLimit, setBudgetLimit] = useState("100000");
  const [result, setResult] = useState<TravelBudgetResult>();
  const [error, setError] = useState("");

  function calculate() {
    try {
      setResult(
        calculateTravelBudget({
          people: Number(people),
          nights: Number(nights),
          transportPerPerson: Number(transportPerPerson),
          lodgingPerNight: Number(lodgingPerNight),
          foodPerPersonPerDay: Number(foodPerPersonPerDay),
          activitiesTotal: Number(activitiesTotal),
          otherTotal: Number(otherTotal),
          budgetLimit: budgetLimit.trim() ? Number(budgetLimit) : undefined,
        }),
      );
      setError("");
    } catch (cause) {
      setResult(undefined);
      setError(
        cause instanceof Error ? cause.message : "旅行の予算を計算できませんでした。",
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>旅行の条件を入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="travel-people">人数</Label>
            <Input
              id="travel-people"
              type="number"
              min="1"
              max="100"
              step="1"
              value={people}
              onChange={(event) => setPeople(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="travel-nights">宿泊数</Label>
            <Input
              id="travel-nights"
              type="number"
              min="0"
              max="365"
              step="1"
              value={nights}
              onChange={(event) => setNights(event.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <MoneyField
            id="travel-transport"
            label="交通費（1人分）"
            value={transportPerPerson}
            onChange={setTransportPerPerson}
          />
          <MoneyField
            id="travel-lodging"
            label="宿泊費（1泊分）"
            value={lodgingPerNight}
            onChange={setLodgingPerNight}
          />
          <MoneyField
            id="travel-food"
            label="食費（1人1日分）"
            value={foodPerPersonPerDay}
            onChange={setFoodPerPersonPerDay}
          />
          <MoneyField
            id="travel-activities"
            label="レジャー費（全員分）"
            value={activitiesTotal}
            onChange={setActivitiesTotal}
          />
          <MoneyField
            id="travel-other"
            label="その他の費用（全員分）"
            value={otherTotal}
            onChange={setOtherTotal}
          />
          <MoneyField
            id="travel-limit"
            label="予算上限（任意）"
            value={budgetLimit}
            onChange={setBudgetLimit}
            optional
          />
        </div>
        <Button onClick={calculate}>旅行の予算を計算する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <div className="space-y-3" aria-live="polite">
            <dl className="grid gap-3 sm:grid-cols-2">
              <ResultItem label="交通費の合計" value={formatYen(result.transportTotal)} />
              <ResultItem label="宿泊費の合計" value={formatYen(result.lodgingTotal)} />
              <ResultItem label="食費の合計" value={formatYen(result.foodTotal)} />
              <ResultItem label="レジャー費" value={formatYen(result.activitiesTotal)} />
              <ResultItem label="その他の費用" value={formatYen(result.otherTotal)} />
              <ResultItem label="旅行費の合計" value={formatYen(result.total)} />
              <ResultItem label="1人あたりの目安" value={formatYen(result.perPerson)} />
            </dl>
            {result.budgetDifference !== undefined && (
              <p className="rounded-md border border-border bg-surface-muted p-4 font-semibold">
                {result.budgetDifference >= 0
                  ? `予算内です。残り${formatYen(result.budgetDifference)}です。`
                  : `予算を${formatYen(Math.abs(result.budgetDifference))}超えています。`}
              </p>
            )}
          </div>
        )}
        <p className="text-sm leading-6 text-muted">
          食費は「宿泊数＋1日分」、宿泊費は「1泊あたり」で計算します。料金や為替、季節による変動は考慮しない目安です。
        </p>
      </CardContent>
    </Card>
  );
}

function MoneyField({
  id,
  label,
  value,
  onChange,
  optional = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        min="0"
        max="1000000000"
        step="1"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={optional ? "空欄でも計算できます" : undefined}
      />
    </div>
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
