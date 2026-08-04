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
import { calculateTakeHome, PREFECTURE_RATES, type SalaryResult } from "./logic";

const prefectures = Object.keys(PREFECTURE_RATES);

export function SalaryTakeHome({}: ToolComponentProps) {
  const [mode, setMode] = useState<"simple" | "detail">("simple");
  const [gross, setGross] = useState("300000");
  const [prefecture, setPrefecture] = useState("東京都");
  const [residentTax, setResidentTax] = useState("0");
  const [dependents, setDependents] = useState("0");
  const [age40Plus, setAge40Plus] = useState(false);
  const [actualSocialInsurance, setActualSocialInsurance] = useState("");
  const [actualIncomeTax, setActualIncomeTax] = useState("");
  const [otherDeductions, setOtherDeductions] = useState("");
  const [result, setResult] = useState<SalaryResult>();
  const [error, setError] = useState("");

  function calculate() {
    try {
      setResult(
        calculateTakeHome({
          monthlyGross: Number(gross),
          prefecture,
          residentTax: Number(residentTax),
          dependents: Number(dependents),
          age40Plus,
          actualSocialInsurance: optionalNumber(actualSocialInsurance),
          actualIncomeTax: optionalNumber(actualIncomeTax),
          otherDeductions: optionalNumber(otherDeductions),
        }),
      );
      setError("");
    } catch (cause) {
      setResult(undefined);
      setError(
        cause instanceof Error ? cause.message : "手取り額を計算できませんでした。",
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>給与を入力</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold">計算方法</legend>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={mode === "simple" ? "secondary" : "ghost"}
              onClick={() => setMode("simple")}
            >
              かんたん
            </Button>
            <Button
              type="button"
              variant={mode === "detail" ? "secondary" : "ghost"}
              onClick={() => setMode("detail")}
            >
              詳しく入力
            </Button>
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="salary-gross">額面月収</Label>
            <Input
              id="salary-gross"
              type="number"
              min="1"
              max="10000000"
              value={gross}
              onChange={(event) => setGross(event.target.value)}
            />
            <p className="text-xs text-muted">税金や社会保険料が引かれる前の金額</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary-prefecture">健康保険の都道府県支部</Label>
            <Select
              id="salary-prefecture"
              value={prefecture}
              onChange={(event) => setPrefecture(event.target.value)}
            >
              {prefectures.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
            <p className="text-xs text-muted">
              居住地ではなく、加入している支部を選びます
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="salary-resident-tax">住民税（月額・任意）</Label>
            <Input
              id="salary-resident-tax"
              type="number"
              min="0"
              max="1000000"
              value={residentTax}
              onChange={(event) => setResidentTax(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary-dependents">扶養人数</Label>
            <Input
              id="salary-dependents"
              type="number"
              min="0"
              max="20"
              value={dependents}
              onChange={(event) => setDependents(event.target.value)}
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            checked={age40Plus}
            onChange={(event) => setAge40Plus(event.target.checked)}
          />
          40歳以上（介護保険料を考慮）
        </label>

        {mode === "detail" && (
          <section
            className="space-y-4 rounded-md border border-border bg-surface-muted p-4"
            aria-label="詳しい控除額"
          >
            <div>
              <h3 className="font-semibold">給与明細の控除額（任意）</h3>
              <p className="mt-1 text-sm text-muted">
                分かる項目だけ入力すると、概算値より入力値を優先します。
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="salary-social">社会保険料（月額）</Label>
                <Input
                  id="salary-social"
                  type="number"
                  min="0"
                  max="1000000"
                  value={actualSocialInsurance}
                  onChange={(event) => setActualSocialInsurance(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary-income-tax">所得税（月額）</Label>
                <Input
                  id="salary-income-tax"
                  type="number"
                  min="0"
                  max="1000000"
                  value={actualIncomeTax}
                  onChange={(event) => setActualIncomeTax(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary-other-deductions">その他控除（月額）</Label>
                <Input
                  id="salary-other-deductions"
                  type="number"
                  min="0"
                  max="1000000"
                  value={otherDeductions}
                  onChange={(event) => setOtherDeductions(event.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        <Button onClick={calculate}>計算する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <div className="grid gap-3 sm:grid-cols-2" aria-live="polite">
            <ResultItem label="概算手取り（月額）" value={result.takeHome} />
            <ResultItem label="社会保険料" value={result.socialInsurance} />
            <ResultItem label="所得税" value={result.incomeTax} />
            <ResultItem label="住民税" value={result.residentTax} />
            <ResultItem label="その他控除" value={result.otherDeductions} />
          </div>
        )}
        <p className="text-sm leading-6 text-muted">
          現在の制度を前提にした概算です。健康保険の種類、勤務先、賞与、各種控除などで実際の手取り額は変わります。正確な金額は給与明細や勤務先の案内を確認してください。
        </p>
      </CardContent>
    </Card>
  );
}

function optionalNumber(value: string) {
  return value.trim() ? Number(value) : undefined;
}

function ResultItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border bg-surface-muted p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value.toLocaleString("ja-JP")}円</p>
    </div>
  );
}
