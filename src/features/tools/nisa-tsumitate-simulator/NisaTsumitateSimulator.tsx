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
  NISA_INPUT_LIMITS,
  NISA_RULES,
  simulateNisa,
  type NisaSimulationPoint,
  type NisaSimulationResult,
} from "./logic";

type NisaMode = "simple" | "detail";

const RATE_PRESETS = [
  { value: "all-world", label: "全世界株式（オルカン）", rate: 5 },
  { value: "us-equity", label: "米国株式（S&P500）", rate: 6 },
  { value: "developed-equity", label: "先進国株式", rate: 4 },
  { value: "balanced", label: "8資産均等バランス", rate: 3 },
  { value: "domestic-bond", label: "国内債券", rate: 1 },
] as const;

export function NisaTsumitateSimulator({}: ToolComponentProps) {
  const [mode, setMode] = useState<NisaMode>("simple");
  const [monthlyAmount, setMonthlyAmount] = useState("30000");
  const [years, setYears] = useState("20");
  const [annualRate, setAnnualRate] = useState("5.0");
  const [ratePreset, setRatePreset] = useState("all-world");
  const [initialAmount, setInitialAmount] = useState("0");
  const [initialCostBasis, setInitialCostBasis] = useState("");
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
        result: simulateNisa({
          monthlyAmount: monthly,
          years: period,
          annualRate: rate,
          initialAmount: toNumber(initialAmount) ?? 0,
          initialCostBasis:
            mode === "detail" ? (toNumber(initialCostBasis) ?? undefined) : undefined,
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
    initialAmount,
    initialCostBasis,
    mode,
    monthlyAmount,
    years,
  ]);

  function changeRatePreset(value: string) {
    setRatePreset(value);
    const preset = RATE_PRESETS.find((item) => item.value === value);
    if (preset) {
      setAnnualRate(String(preset.rate));
    }
  }

  function changeMode(nextMode: NisaMode) {
    setMode(nextMode);
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
                入力すると結果が自動で更新されます。
              </p>
            </div>
            <Badge variant="success">つみたて投資枠に対応</Badge>
          </div>
          <div
            className="grid grid-cols-2 gap-2 rounded-md bg-surface-muted p-1"
            role="group"
            aria-label="計算モード"
          >
            <ModeButton active={mode === "simple"} onClick={() => changeMode("simple")}>
              かんたん
            </ModeButton>
            <ModeButton active={mode === "detail"} onClick={() => changeMode("detail")}>
              詳細
            </ModeButton>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
            <MoneyField
              id="nisa-monthly"
              label="毎月の積立額"
              value={monthlyAmount}
              onChange={setMonthlyAmount}
              hint="つみたて投資枠の目安は月10万円まで"
              maxAmount={NISA_INPUT_LIMITS.maxMonthlyAmount}
            />
            <div className="space-y-2">
              <Label htmlFor="nisa-years">運用期間</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="nisa-years"
                  type="number"
                  min="1"
                  max={NISA_INPUT_LIMITS.maxYears}
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
              id="nisa-initial"
              label="現在のNISA評価額（任意）"
              value={initialAmount}
              onChange={setInitialAmount}
              hint="保有中のNISA資産の評価額。最大1億円"
              maxAmount={NISA_INPUT_LIMITS.maxCurrentValue}
            />
          </div>

          <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nisa-rate-preset">参考する運用タイプ</Label>
              <Select
                id="nisa-rate-preset"
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
              <Label htmlFor="nisa-rate">想定年率</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="nisa-rate"
                  type="number"
                  min={NISA_INPUT_LIMITS.minAnnualRate}
                  max={NISA_INPUT_LIMITS.maxAnnualRate}
                  step="0.1"
                  value={annualRate}
                  onChange={(event) => {
                    setRatePreset("custom");
                    setAnnualRate(event.target.value);
                  }}
                  inputMode="decimal"
                  aria-describedby="nisa-rate-help"
                />
                <span className="shrink-0 text-sm text-muted">%</span>
              </div>
              <p id="nisa-rate-help" className="text-xs leading-5 text-muted">
                過去の実績や将来の利益を保証する数字ではありません。
              </p>
            </div>
          </div>

          {mode === "detail" && (
            <div className="space-y-5 rounded-lg border border-border bg-surface-muted/60 p-4">
              <div>
                <h3 className="text-sm font-semibold">詳細オプション</h3>
                <p className="mt-1 text-xs leading-5 text-muted">
                  現在の取得価額や、毎月の積立に加えるボーナス投資を設定できます。
                </p>
              </div>
              <div className="space-y-4">
                <MoneyField
                  id="nisa-initial-cost-basis"
                  label="現在の取得価額（任意）"
                  value={initialCostBasis}
                  onChange={setInitialCostBasis}
                  hint="現在のNISA評価額を購入したときの金額。生涯投資枠の計算に使用"
                  maxAmount={NISA_INPUT_LIMITS.maxAcquisitionCost}
                />
                <MoneyField
                  id="nisa-bonus"
                  label="ボーナス投資額（1回分）"
                  value={bonusAmount}
                  onChange={setBonusAmount}
                  hint="選択した月に毎月の積立へ加算"
                  maxAmount={NISA_INPUT_LIMITS.maxBonusAmount}
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
            <p className="font-semibold">NISAの上限を自動で反映</p>
            <p className="mt-1 text-muted">
              つみたて投資枠は年間{formatYen(NISA_RULES.annualTsumitateLimit)}
              、これからの積立に使える計算上の総枠は{formatYen(NISA_RULES.lifetimeLimit)}
              です。現在の取得価額を入力した場合は、その分も生涯投資枠の使用額に反映し、上限を超える新しい積立分は除外します。非課税保有期間は
              {NISA_RULES.nonTaxableHoldingPeriod}です。
            </p>
          </div>

          <p className="text-xs leading-5 text-muted">
            参考年率は比較用の入力例です。特定の投資信託の運用実績や、将来の利益を示すものではありません。対象商品は金融機関によって異なるため、購入前に
            <a
              className="text-link"
              href="https://www.fsa.go.jp/policy/nisa2/products/"
              target="_blank"
              rel="noreferrer"
            >
              金融庁のつみたて投資枠対象商品一覧
            </a>
            を確認してください。
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
  result: NisaSimulationResult;
  annualRate: number;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>積立の見込み結果</CardTitle>
            <p className="mt-1 text-sm text-muted">
              想定年率{formatRate(annualRate)}・月1回の積立・複利で計算
            </p>
          </div>
          <Badge variant="success">運用益は非課税の想定</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg bg-primary p-5 text-primary-foreground">
          <p className="text-sm opacity-85">{result.points.at(-1)?.year}年後の評価額</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">
            {formatYen(result.finalValue)}
          </p>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ResultItem label="現在の運用額" value={formatYen(result.startingValue)} />
          <ResultItem
            label="これからの積立元本"
            value={formatYen(result.totalInvested)}
          />
          <ResultItem label="これからの運用益" value={formatYen(result.gain)} />
          <ResultItem
            label="NISA枠から外れた額"
            value={formatYen(result.excludedContribution)}
          />
        </dl>

        <GrowthChart points={result.points} />

        {result.excludedContribution > 0 && (
          <p className="rounded-md border border-warning/30 bg-warning/10 p-4 text-sm leading-6 text-foreground">
            入力した積立予定のうち{formatYen(result.excludedContribution)}
            は、年間または総額のNISA上限を超えるため計算に含めていません。
          </p>
        )}

        {result.lifetimeLimitReached && (
          <p className="rounded-md border border-border bg-surface-muted p-4 text-sm leading-6">
            これからの積立に対する計算上のNISA枠は
            {result.lifetimeLimitReachYear === 0
              ? "開始時点"
              : `${result.lifetimeLimitReachYear}年目`}
            に達する想定です。その後も保有中の資産は運用されますが、新しい積立は計算に含めていません。
          </p>
        )}

        <p className="text-xs leading-5 text-muted">
          毎月の積立を月初に行い、その後に月次の値動きを反映する簡易計算です。実際の価格変動、信託報酬、税金、売却、分配金、手数料は考慮していません。
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

function GrowthChart({ points }: { points: NisaSimulationPoint[] }) {
  const width = 720;
  const height = 280;
  const left = 52;
  const right = 18;
  const top = 20;
  const bottom = 42;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const maxValue = Math.max(
    ...points.flatMap((point) => [point.value, point.baseValue]),
    1,
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
  const investedPath = createPath(
    points,
    "baseValue",
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
  const selectedY = top + plotHeight - (selectedPoint.value / maxValue) * plotHeight;

  return (
    <figure aria-labelledby="nisa-chart-caption">
      <figcaption id="nisa-chart-caption" className="mb-3 text-sm font-semibold">
        資産の増え方
      </figcaption>
      <div className="overflow-hidden rounded-md border border-border bg-surface-muted/60 p-2">
        <svg
          className="h-auto w-full"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="現在の資産と積立額、運用後の評価額の推移"
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
            d={investedPath}
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
            stroke="var(--primary)"
            strokeWidth="3"
          >
            <title>
              {`${selectedPoint.year}年目の評価額：${formatYen(selectedPoint.value)}`}
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
                {point.year}年
              </text>
            );
          })}
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
          運用後の評価額
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-3 bg-muted" aria-hidden="true" />
          現在の資産＋積立額
        </span>
      </div>
      <div className="mt-4 rounded-md border border-border bg-surface-muted/60 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="nisa-chart-year" className="text-sm font-semibold">
            表示する年
          </label>
          <span className="text-sm font-semibold text-primary">
            {selectedPoint.year}年目
          </span>
        </div>
        <input
          id="nisa-chart-year"
          className="mt-3 h-2 w-full cursor-pointer accent-primary"
          type="range"
          min="0"
          max={points.length - 1}
          step="1"
          value={safeSelectedIndex}
          onChange={(event) => setSelectedIndex(Number(event.target.value))}
          aria-label="グラフで表示する年"
          aria-valuetext={`${selectedPoint.year}年目`}
        />
        <dl className="mt-3 grid gap-2 sm:grid-cols-3">
          <ResultItem label="評価額" value={formatYen(selectedPoint.value)} />
          <ResultItem
            label="現在の資産＋積立額"
            value={formatYen(selectedPoint.baseValue)}
          />
          <ResultItem label="運用益" value={formatYen(selectedPoint.gain)} />
        </dl>
      </div>
      <details className="mt-4 rounded-md border border-border px-3">
        <summary className="cursor-pointer py-3 text-sm font-semibold">
          年ごとの数字を見る
        </summary>
        <div className="overflow-x-auto pb-3">
          <table className="w-full min-w-[28rem] text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="px-2 py-2 font-semibold">年数</th>
                <th className="px-2 py-2 font-semibold">積立額</th>
                <th className="px-2 py-2 font-semibold">現在の資産＋積立額</th>
                <th className="px-2 py-2 font-semibold">評価額</th>
                <th className="px-2 py-2 font-semibold">運用益</th>
              </tr>
            </thead>
            <tbody>
              {points.map((point) => (
                <tr key={point.year} className="border-b border-border last:border-0">
                  <td className="px-2 py-2">{point.year}年目</td>
                  <td className="px-2 py-2">{formatYen(point.invested)}</td>
                  <td className="px-2 py-2">{formatYen(point.baseValue)}</td>
                  <td className="px-2 py-2">{formatYen(point.value)}</td>
                  <td className="px-2 py-2">{formatYen(point.gain)}</td>
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
  points: NisaSimulationPoint[],
  key: "baseValue" | "value",
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
