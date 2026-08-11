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
import { calculateFuelCost, type FuelCostResult, type FuelTripType } from "./logic";

export function FuelCostCalculator({}: ToolComponentProps) {
  const [distance, setDistance] = useState("100");
  const [fuelEfficiency, setFuelEfficiency] = useState("15");
  const [fuelPrice, setFuelPrice] = useState("170");
  const [tripType, setTripType] = useState<FuelTripType>("roundTrip");
  const [result, setResult] = useState<FuelCostResult>();
  const [error, setError] = useState("");

  function calculate() {
    try {
      setResult(
        calculateFuelCost({
          distance: Number(distance),
          fuelEfficiency: Number(fuelEfficiency),
          fuelPrice: Number(fuelPrice),
          tripType,
        }),
      );
      setError("");
    } catch (cause) {
      setResult(undefined);
      setError(cause instanceof Error ? cause.message : "燃料費を計算できませんでした。");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>走行条件を入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fuel-distance">片道の走行距離（km）</Label>
            <Input
              id="fuel-distance"
              type="number"
              min="0.1"
              max="1000000"
              step="0.1"
              value={distance}
              onChange={(event) => setDistance(event.target.value)}
            />
          </div>
          <label className="block space-y-2 text-sm font-semibold">
            <span className="tool-editor-field-label">走行方法</span>
            <Select
              value={tripType}
              onChange={(event) => setTripType(event.target.value as FuelTripType)}
            >
              <option value="roundTrip">往復</option>
              <option value="oneWay">片道</option>
            </Select>
          </label>
        </div>
        <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fuel-efficiency">燃費（km/L）</Label>
            <Input
              id="fuel-efficiency"
              type="number"
              min="0.1"
              max="100"
              step="0.1"
              value={fuelEfficiency}
              onChange={(event) => setFuelEfficiency(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fuel-price">燃料単価（円/L）</Label>
            <Input
              id="fuel-price"
              type="number"
              min="1"
              max="10000"
              step="1"
              value={fuelPrice}
              onChange={(event) => setFuelPrice(event.target.value)}
            />
          </div>
        </div>
        <Button onClick={calculate}>燃料費を計算する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <dl className="grid gap-3 sm:grid-cols-2" aria-live="polite">
            <ResultItem
              label="走行距離"
              value={`${formatNumber(result.totalDistance)}km`}
            />
            <ResultItem
              label="必要な燃料"
              value={`${formatNumber(result.fuelAmount, 2)}L`}
            />
            <ResultItem label="燃料費の目安" value={formatYen(result.fuelCost)} />
            <ResultItem
              label="1kmあたりの費用"
              value={`${formatNumber(result.costPerKilometer, 2)}円`}
            />
          </dl>
        )}
        <p className="text-sm leading-6 text-muted">
          入力した燃費と燃料単価から計算した目安です。渋滞、運転方法、エアコン使用などによる実際の差は考慮しません。
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

function formatNumber(value: number, maximumFractionDigits = 1) {
  return value.toLocaleString("ja-JP", { maximumFractionDigits });
}

function formatYen(value: number) {
  return `${value.toLocaleString("ja-JP")}円`;
}
