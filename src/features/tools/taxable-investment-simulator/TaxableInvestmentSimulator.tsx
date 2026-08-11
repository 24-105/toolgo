"use client";

import { useMemo, useState } from "react";

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import {
  TAXABLE_INVESTMENT_INPUT_LIMITS,
  TAXABLE_INVESTMENT_RULES,
  simulateTaxableInvestment,
  type TaxableInvestmentPoint,
  type TaxableInvestmentResult,
} from "./logic";

type TaxableInvestmentMode = "simple" | "detail";

const RATE_PRESETS = [
  { value: "all-world", label: "全世界株式（オルカン）", rate: 5 },
  { value: "us-equity", label: "米国株式（S&P500）", rate: 6 },
  { value: "developed-equity", label: "先進国株式", rate: 4 },
  { value: "balanced", label: "8資産均等バランス", rate: 3 },
  { value: "domestic-bond", label: "国内債券", rate: 1 },
] as const;

export function TaxableInvestmentSimulator({}: ToolComponentProps) {
  const [mode, setMode] = useState<TaxableInvestmentMode>("simple");
  const [monthlyAmount, setMonthlyAmount] = useState("30000");
  const [years, setYears] = useState("20");
  const [annualRate, setAnnualRate] = useState("5.0");
  const [ratePreset, setRatePreset] = useState("all-world");
  const [initialValue, setInitialValue] = useState("0");
  const [initialCostBasis, setInitialCostBasis] = useState("0");
  const [bonusAmount, setBonusAmount] = useState("0");
  const [bonusMonths, setBonusMonths] = useState<number[]>([6, 12]);

  const calculation = useMemo(() => {
    const monthly = toNumber(monthlyAmount);
    const period = toNumber(years);
    const rate = toNumber(annualRate);

    if (monthly === undefined || period === undefined || rate === undefined) {
      return {
        result: undefined,
        error: "毎月の積立額・運用期間・想定年率を入力してください。",
      };
    }

    try {
      return {
        result: simulateTaxableInvestment({
          monthlyAmount: monthly,
          years: period,
          annualRate: rate,
          initialValue: toNumber(initialValue) ?? 0,
          initialCostBasis:
            mode === "simple"
              ? (toNumber(initialValue) ?? 0)
              : (toNumber(initialCostBasis) ?? 0),
          bonusAmount: toNumber(bonusAmount) ?? 0,
          bonusMonths,
        }),
        error: "",
      };
    } catch (cause) {
      return {
        result: undefined,
        error: cause instanceof Error ? cause.message : "計算できませんでした。",
      };
    }
  }, [
    annualRate,
    bonusAmount,
    bonusMonths,
    initialCostBasis,
    initialValue,
    monthlyAmount,
    mode,
    years,
  ]);

  function changeRatePreset(value: string) {
    setRatePreset(value);
    const preset = RATE_PRESETS.find((item) => item.value === value);
    if (preset) {
      setAnnualRate(String(preset.rate));
    }
  }

  function toggleBonusMonth(month: number) {
    setBonusMonths((current) =>
      current.includes(month)
        ? current.filter((item) => item !== month)
        : [...current, month].sort((left, right) => left - right),
    );
  }

  const selectedRate = toNumber(annualRate);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>積立条件を入力</CardTitle>
              <p className="mt-1 text-sm text-muted">
                課税口座で投資信託を運用し、売却した場合の受取額を見積もります。
              </p>
            </div>
            <Badge variant="warning">売却時の税金を反映</Badge>
          </div>
          <div
            className="grid grid-cols-2 gap-2 rounded-md bg-surface-muted p-1"
            role="group"
            aria-label="計算モード"
          >
            <ModeButton active={mode === "simple"} onClick={() => setMode("simple")}>
              かんたん
            </ModeButton>
            <ModeButton active={mode === "detail"} onClick={() => setMode("detail")}>
              詳細
            </ModeButton>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
            <MoneyField
              id="taxable-monthly"
              label="毎月の積立額"
              value={monthlyAmount}
              onChange={setMonthlyAmount}
              hint="課税口座のため、NISAの投資上限は反映しません"
              maxAmount={TAXABLE_INVESTMENT_INPUT_LIMITS.maxMonthlyAmount}
            />
            <div className="space-y-2">
              <Label htmlFor="taxable-years">運用期間</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="taxable-years"
                  type="number"
                  min="1"
                  max={TAXABLE_INVESTMENT_INPUT_LIMITS.maxYears}
                  step="1"
                  value={years}
                  onChange={(event) => setYears(event.target.value)}
                  inputMode="numeric"
                />
                <span className="shrink-0 text-sm text-muted">年</span>
              </div>
            </div>
          </div>

          <div className="sm:max-w-[calc(50%-0.5rem)]">
            <MoneyField
              id="taxable-initial-value"
              label="現在の評価額（任意）"
              value={initialValue}
              onChange={setInitialValue}
              hint="保有中の投資信託の評価額。かんたんでは取得価額も同額と仮定"
              maxAmount={TAXABLE_INVESTMENT_INPUT_LIMITS.maxCurrentValue}
            />
          </div>

          <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="taxable-rate-preset">参考する運用タイプ</Label>
              <Select
                id="taxable-rate-preset"
                value={ratePreset}
                onChange={(event) => changeRatePreset(event.target.value)}
              >
                <option value="custom">自分で入力</option>
                {RATE_PRESETS.map((preset) => (
                  <option key={preset.value} value={preset.value}>
                    {preset.label}（年{preset.rate}%）
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxable-rate">想定年率</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="taxable-rate"
                  type="number"
                  min={TAXABLE_INVESTMENT_INPUT_LIMITS.minAnnualRate}
                  max={TAXABLE_INVESTMENT_INPUT_LIMITS.maxAnnualRate}
                  step="0.1"
                  value={annualRate}
                  onChange={(event) => {
                    setRatePreset("custom");
                    setAnnualRate(event.target.value);
                  }}
                  inputMode="decimal"
                  aria-describedby="taxable-rate-help"
                />
                <span className="shrink-0 text-sm text-muted">%</span>
              </div>
              <p id="taxable-rate-help" className="text-xs leading-5 text-muted">
                過去の実績や将来の利益を保証する数字ではありません。
              </p>
            </div>
          </div>

          {mode === "detail" && (
            <div className="space-y-5 rounded-lg border border-border bg-surface-muted/60 p-4">
              <div>
                <h3 className="text-sm font-semibold">詳細オプション</h3>
                <p className="mt-1 text-xs leading-5 text-muted">
                  保有中の投資信託や、毎月以外の追加投資も計算できます。
                </p>
              </div>
              <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
                <MoneyField
                  id="taxable-cost-basis"
                  label="現在の取得価額（任意）"
                  value={initialCostBasis}
                  onChange={setInitialCostBasis}
                  hint="保有分を買った金額。評価額を入力したら必須"
                  maxAmount={TAXABLE_INVESTMENT_INPUT_LIMITS.maxAcquisitionCost}
                />
              </div>
              <div className="space-y-4">
                <MoneyField
                  id="taxable-bonus"
                  label="ボーナス投資額（1回分）"
                  value={bonusAmount}
                  onChange={setBonusAmount}
                  hint="選択した月に毎月の積立へ加算"
                  maxAmount={TAXABLE_INVESTMENT_INPUT_LIMITS.maxBonusAmount}
                />
              </div>
              <fieldset className="space-y-2">
                <legend className="text-sm font-semibold">ボーナス投資の月</legend>
                <p className="text-xs leading-5 text-muted">
                  投資する月を選んでください。
                </p>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                    <label
                      key={month}
                      className="flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-2 text-sm transition-colors hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                    >
                      <input
                        type="checkbox"
                        checked={bonusMonths.includes(month)}
                        onChange={() => toggleBonusMonth(month)}
                      />
                      {month}月
                    </label>
                  ))}
                </div>
                <p className="text-xs leading-5 text-muted">
                  {bonusMonths.length > 0
                    ? `${bonusMonths.length}か月を選択中`
                    : "月を選択するとボーナス投資が計算されます"}
                </p>
              </fieldset>
            </div>
          )}

          <div className="rounded-md border border-border bg-surface-muted p-4 text-sm leading-6">
            <p className="font-semibold">税金は売却時に概算</p>
            <p className="mt-1 text-muted">
              課税対象の利益（評価額−投資元本）がプラスの場合に、税率
              {TAXABLE_INVESTMENT_RULES.taxRateLabel}（所得税等
              {formatPercent(TAXABLE_INVESTMENT_RULES.incomeTaxAndReconstructionRate)}
              ＋住民税
              {formatPercent(TAXABLE_INVESTMENT_RULES.residentTaxRate)}
              ）を掛けます。課税口座のため、NISAの上限は適用しません。
            </p>
          </div>

          <p className="text-xs leading-5 text-muted">
            一般的な公募投資信託を課税口座で保有し、計算した年に売却する簡易モデルです。制度の詳細は
            <a
              className="text-link"
              href="https://www.nta.go.jp/publication/pamph/koho/kurashi/html/04_5.htm"
              target="_blank"
              rel="noreferrer"
            >
              国税庁の案内
            </a>
            や利用する金融機関の情報を確認してください。
          </p>
        </CardContent>
      </Card>

      {calculation.error ? (
        <Card>
          <CardContent className="pt-6">
            <p role="alert" className="text-sm font-semibold text-danger">
              {calculation.error}
            </p>
          </CardContent>
        </Card>
      ) : (
        calculation.result && (
          <SimulationResult result={calculation.result} annualRate={selectedRate ?? 0} />
        )
      )}
    </div>
  );
}

function ModeButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`min-h-10 rounded-md px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
        active ? "bg-surface text-primary shadow-sm" : "text-muted hover:text-foreground"
      }`}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function MoneyField({
  id,
  label,
  value,
  onChange,
  hint,
  maxAmount,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint: string;
  maxAmount: number;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type="number"
          min="0"
          max={maxAmount}
          step="1000"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          inputMode="numeric"
        />
        <span className="shrink-0 text-sm text-muted">円</span>
      </div>
      <p className="text-xs leading-5 text-muted">{hint}</p>
    </div>
  );
}

function SimulationResult({
  result,
  annualRate,
}: {
  result: TaxableInvestmentResult;
  annualRate: number;
}) {
  const finalYear = result.points.at(-1)?.year ?? 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>税引き後の見込み結果</CardTitle>
            <p className="mt-1 text-sm text-muted">
              想定年率{formatRate(annualRate)}・月初積立・複利・{finalYear}
              年後に売却する想定
            </p>
          </div>
          <Badge variant="warning">税率20.315%の概算</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg bg-primary p-5 text-primary-foreground">
          <p className="text-sm opacity-85">{finalYear}年後に売却した場合の受取額</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">
            {formatYen(result.afterTaxValue)}
          </p>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ResultItem label="税引前評価額" value={formatYen(result.finalValue)} />
          <ResultItem label="投資元本" value={formatYen(result.totalPrincipal)} />
          <ResultItem label="課税対象の利益" value={formatYen(result.taxableGain)} />
          <ResultItem label="税金（売却時）" value={formatYen(result.tax)} />
        </dl>

        <TaxableGrowthChart points={result.points} />

        {result.gain < 0 && (
          <p className="rounded-md border border-border bg-surface-muted p-4 text-sm leading-6">
            投資元本を下回る想定のため、課税対象の利益は0円として計算しています。
          </p>
        )}

        <p className="text-xs leading-5 text-muted">
          月初に積立額を加え、その後に月次の値動きを反映する簡易計算です。実際の価格変動、信託報酬、売買手数料、分配金、損益通算、繰越控除、取得価額の計算方法は反映していません。
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

function TaxableGrowthChart({ points }: { points: TaxableInvestmentPoint[] }) {
  const width = 720;
  const height = 280;
  const left = 52;
  const right = 18;
  const top = 20;
  const bottom = 42;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const maxValue = Math.max(
    ...points.flatMap((point) => [point.principal, point.value, point.afterTaxValue]),
    1,
  );
  const principalPath = createPath(
    points,
    "principal",
    left,
    top,
    plotWidth,
    plotHeight,
    maxValue,
  );
  const valuePath = createPath(
    points,
    "value",
    left,
    top,
    plotWidth,
    plotHeight,
    maxValue,
  );
  const afterTaxPath = createPath(
    points,
    "afterTaxValue",
    left,
    top,
    plotWidth,
    plotHeight,
    maxValue,
  );
  const labelIndexes = [
    ...new Set([0, Math.floor((points.length - 1) / 2), points.length - 1]),
  ];
  const [selectedIndex, setSelectedIndex] = useState(points.length - 1);
  const safeSelectedIndex = Math.min(selectedIndex, points.length - 1);
  const selectedPoint = points[safeSelectedIndex];
  const selectedX =
    left + (plotWidth * safeSelectedIndex) / Math.max(points.length - 1, 1);
  const selectedY =
    top + plotHeight - (selectedPoint.afterTaxValue / maxValue) * plotHeight;

  return (
    <figure aria-labelledby="taxable-chart-caption">
      <figcaption id="taxable-chart-caption" className="mb-3 text-sm font-semibold">
        資産の増え方
      </figcaption>
      <div className="overflow-hidden rounded-md border border-border bg-surface-muted/60 p-2">
        <svg
          className="h-auto w-full"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="投資元本、税引前評価額、売却時の税引後受取額の推移"
        >
          {[0, 0.5, 1].map((ratio) => {
            const y = top + plotHeight * ratio;
            return (
              <g key={ratio}>
                <line
                  x1={left}
                  y1={y}
                  x2={width - right}
                  y2={y}
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={left - 8}
                  y={y + 4}
                  fill="var(--muted)"
                  fontSize="11"
                  textAnchor="end"
                >
                  {formatCompactYen(maxValue * (1 - ratio))}
                </text>
              </g>
            );
          })}
          <path
            d={principalPath}
            fill="none"
            stroke="var(--muted)"
            strokeDasharray="5 5"
            strokeWidth="2.5"
          />
          <path
            d={valuePath}
            fill="none"
            stroke="var(--primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.5"
          />
          <path
            d={afterTaxPath}
            fill="none"
            stroke="var(--success)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <line
            x1={selectedX}
            y1={top}
            x2={selectedX}
            y2={top + plotHeight}
            stroke="var(--primary)"
            strokeDasharray="3 4"
            strokeOpacity="0.55"
          />
          <circle
            cx={selectedX}
            cy={selectedY}
            r="5"
            fill="var(--surface)"
            stroke="var(--success)"
            strokeWidth="3"
          >
            <title>
              {`${formatYearLabel(selectedPoint.year)}の税引後受取額：${formatYen(selectedPoint.afterTaxValue)}`}
            </title>
          </circle>
          {labelIndexes.map((index) => {
            const point = points[index];
            const x = left + (plotWidth * index) / Math.max(points.length - 1, 1);
            return (
              <text
                key={`${point.year}-${index}`}
                x={x}
                y={height - 12}
                fill="var(--muted)"
                fontSize="12"
                textAnchor={
                  index === 0 ? "start" : index === points.length - 1 ? "end" : "middle"
                }
              >
                {formatChartYear(point.year)}
              </text>
            );
          })}
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
          税引前評価額
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-success" aria-hidden="true" />
          売却時の税引後受取額
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-3 bg-muted" aria-hidden="true" />
          投資元本
        </span>
      </div>
      <div className="mt-4 rounded-md border border-border bg-surface-muted/60 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="taxable-chart-year" className="text-sm font-semibold">
            表示する年
          </label>
          <span className="text-sm font-semibold text-primary">
            {formatYearLabel(selectedPoint.year)}
          </span>
        </div>
        <input
          id="taxable-chart-year"
          className="mt-3 h-2 w-full cursor-pointer accent-primary"
          type="range"
          min="0"
          max={points.length - 1}
          step="1"
          value={safeSelectedIndex}
          onChange={(event) => setSelectedIndex(Number(event.target.value))}
          aria-label="グラフで表示する年"
          aria-valuetext={formatYearLabel(selectedPoint.year)}
        />
        <dl className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
          <ResultItem label="税引前評価額" value={formatYen(selectedPoint.value)} />
          <ResultItem label="投資元本" value={formatYen(selectedPoint.principal)} />
          <ResultItem
            label="課税対象の利益"
            value={formatYen(selectedPoint.taxableGain)}
          />
          <ResultItem label="税金（売却時）" value={formatYen(selectedPoint.tax)} />
          <ResultItem
            label="税引後受取額"
            value={formatYen(selectedPoint.afterTaxValue)}
          />
        </dl>
      </div>
      <details className="mt-4 rounded-md border border-border px-3">
        <summary className="cursor-pointer py-3 text-sm font-semibold">
          年ごとの数字を見る
        </summary>
        <div className="overflow-x-auto pb-3">
          <table className="w-full min-w-[44rem] text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="px-2 py-2 font-semibold">年数</th>
                <th className="px-2 py-2 font-semibold">投資元本</th>
                <th className="px-2 py-2 font-semibold">税引前評価額</th>
                <th className="px-2 py-2 font-semibold">課税対象の利益</th>
                <th className="px-2 py-2 font-semibold">税金</th>
                <th className="px-2 py-2 font-semibold">税引後受取額</th>
              </tr>
            </thead>
            <tbody>
              {points.map((point) => (
                <tr key={point.year} className="border-b border-border last:border-0">
                  <td className="px-2 py-2">{formatYearLabel(point.year)}</td>
                  <td className="px-2 py-2">{formatYen(point.principal)}</td>
                  <td className="px-2 py-2">{formatYen(point.value)}</td>
                  <td className="px-2 py-2">{formatYen(point.taxableGain)}</td>
                  <td className="px-2 py-2">{formatYen(point.tax)}</td>
                  <td className="px-2 py-2">{formatYen(point.afterTaxValue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}

function createPath(
  points: TaxableInvestmentPoint[],
  key: "principal" | "value" | "afterTaxValue",
  left: number,
  top: number,
  plotWidth: number,
  plotHeight: number,
  maxValue: number,
) {
  return points
    .map((point, index) => {
      const x = left + (plotWidth * index) / Math.max(points.length - 1, 1);
      const y = top + plotHeight - (point[key] / maxValue) * plotHeight;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function toNumber(value: string) {
  if (!value.trim()) return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function formatYen(value: number) {
  return `${Math.round(value).toLocaleString("ja-JP")}円`;
}

function formatCompactYen(value: number) {
  if (value >= 100_000_000) {
    return `${(value / 100_000_000).toLocaleString("ja-JP", {
      maximumFractionDigits: 1,
    })}億円`;
  }
  if (value >= 10_000) {
    return `${(value / 10_000).toLocaleString("ja-JP", {
      maximumFractionDigits: 1,
    })}万円`;
  }
  return formatYen(value);
}

function formatRate(value: number) {
  return `${value.toLocaleString("ja-JP", {
    maximumFractionDigits: 1,
  })}%`;
}

function formatPercent(value: number) {
  return `${(value * 100).toLocaleString("ja-JP", {
    maximumFractionDigits: 3,
  })}%`;
}

function formatYearLabel(year: number) {
  return year === 0 ? "開始時" : `${year}年目`;
}

function formatChartYear(year: number) {
  return year === 0 ? "開始" : `${year}年`;
}
