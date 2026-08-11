"use client";

import { useState } from "react";

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
  getIdecoContributionLimit,
  IDECO_INPUT_LIMITS,
  IDECO_RULES,
  simulateIdeco,
  type IdecoCategory,
  type IdecoTaxCalculationMode,
  type IdecoSimulationPoint,
  type IdecoSimulationResult,
} from "./logic";

type IdecoMode = "simple" | "detail";

const RATE_PRESETS = [
  { value: "all-world", label: "全世界株式（オルカン）", rate: 5 },
  { value: "us-equity", label: "米国株式（S&P500）", rate: 6 },
  { value: "developed-equity", label: "先進国株式", rate: 4 },
  { value: "balanced", label: "8資産均等バランス", rate: 3 },
  { value: "domestic-bond", label: "国内債券", rate: 1 },
] as const;

const CATEGORY_OPTIONS: Array<{ value: IdecoCategory; label: string }> = [
  { value: "self-employed", label: "自営業・フリーランス（第1号）" },
  { value: "employee-no-pension", label: "会社員（企業年金なし）" },
  { value: "employee-with-pension", label: "会社員（企業年金あり）" },
  { value: "public-servant", label: "公務員・私学共済" },
  { value: "third-category", label: "専業主婦・主夫（第3号）" },
  { value: "voluntary-insured", label: "国民年金の任意加入者" },
];

const INCOME_TAX_RATE_OPTIONS = [0, 5, 10, 20, 23, 33, 40, 45] as const;

export function IdecoSimulator({}: ToolComponentProps) {
  const [mode, setMode] = useState<IdecoMode>("simple");
  const [currentAge, setCurrentAge] = useState("30");
  const [receivingAge, setReceivingAge] = useState("60");
  const [category, setCategory] = useState<IdecoCategory>("employee-no-pension");
  const [monthlyContribution, setMonthlyContribution] = useState("23000");
  const [annualRate, setAnnualRate] = useState("5.0");
  const [ratePreset, setRatePreset] = useState("all-world");
  const [taxCalculationMode, setTaxCalculationMode] =
    useState<IdecoTaxCalculationMode>("income");
  const [annualIncome, setAnnualIncome] = useState("700");
  const [hasDependentSpouse, setHasDependentSpouse] = useState("なし");
  const [incomeTaxRate, setIncomeTaxRate] = useState("10");
  const [dependentFamilyAges, setDependentFamilyAges] = useState("");
  const [initialAsset, setInitialAsset] = useState("0");
  const [initialCostBasis, setInitialCostBasis] = useState("");
  const [corporatePensionAmount, setCorporatePensionAmount] = useState("0");
  const [otherPublicPensionContribution, setOtherPublicPensionContribution] =
    useState("0");
  const [monthlyFee, setMonthlyFee] = useState(String(IDECO_RULES.contributionFee));

  const calculatedLimit = getIdecoContributionLimit(
    category,
    toNumber(corporatePensionAmount) ?? 0,
    toNumber(otherPublicPensionContribution) ?? 0,
  );

  const calculation = (() => {
    const age = toNumber(currentAge);
    const startReceivingAge = toNumber(receivingAge);
    const contribution = toNumber(monthlyContribution);
    const rate = toNumber(annualRate);
    const income = toNumber(annualIncome);
    const incomeRate = toNumber(incomeTaxRate);
    const familyAges = mode === "detail" ? parseFamilyAges(dependentFamilyAges) : [];

    if (
      age === undefined ||
      startReceivingAge === undefined ||
      contribution === undefined ||
      rate === undefined ||
      (taxCalculationMode === "income" && income === undefined) ||
      (taxCalculationMode === "rate" && incomeRate === undefined) ||
      familyAges === undefined
    ) {
      return {
        result: undefined,
        error:
          taxCalculationMode === "income"
            ? "年齢・毎月の掛金・想定年率・年収を入力してください。"
            : "年齢・毎月の掛金・想定年率・所得税率の目安を入力してください。",
      };
    }

    try {
      return {
        result: simulateIdeco({
          currentAge: age,
          receivingAge: startReceivingAge,
          category,
          monthlyContribution: contribution,
          annualRate: rate,
          taxCalculationMode,
          annualIncome: (income ?? 0) * 10_000,
          hasDependentSpouse: hasDependentSpouse === "あり",
          dependentFamilyAges: familyAges,
          incomeTaxRate: incomeRate,
          initialAsset: toNumber(initialAsset) ?? 0,
          initialCostBasis:
            mode === "detail" ? (toNumber(initialCostBasis) ?? undefined) : undefined,
          corporatePensionAmount: toNumber(corporatePensionAmount) ?? 0,
          otherPublicPensionContribution: toNumber(otherPublicPensionContribution) ?? 0,
          monthlyFee: toNumber(monthlyFee) ?? IDECO_RULES.contributionFee,
        }),
        error: "",
      };
    } catch (cause) {
      return {
        result: undefined,
        error: cause instanceof Error ? cause.message : "計算できませんでした。",
      };
    }
  })();

  function changeRatePreset(value: string) {
    setRatePreset(value);
    const preset = RATE_PRESETS.find((item) => item.value === value);
    if (preset) {
      setAnnualRate(String(preset.rate));
    }
  }

  function changeCategory(value: string) {
    const nextCategory = CATEGORY_OPTIONS.find((item) => item.value === value)?.value;
    if (!nextCategory) return;

    setCategory(nextCategory);
    const nextLimit = getIdecoContributionLimit(
      nextCategory,
      toNumber(corporatePensionAmount) ?? 0,
      toNumber(otherPublicPensionContribution) ?? 0,
    );
    const currentContribution = toNumber(monthlyContribution);
    if (currentContribution !== undefined && currentContribution > nextLimit) {
      setMonthlyContribution(String(nextLimit));
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>iDeCoの条件を入力</CardTitle>
              <p className="mt-1 text-sm text-muted">
                年齢と加入区分から、掛金上限・運用資産・税軽減額を見積もります。
              </p>
            </div>
            <Badge variant="success">掛金の所得控除を反映</Badge>
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
            <AgeField
              id="ideco-current-age"
              label="現在の年齢"
              value={currentAge}
              onChange={setCurrentAge}
              min={IDECO_INPUT_LIMITS.minCurrentAge}
              max={IDECO_INPUT_LIMITS.maxCurrentAge}
              hint="現行制度の簡易計算は20〜64歳に対応"
            />
            <AgeField
              id="ideco-receiving-age"
              label="受け取り開始年齢"
              value={receivingAge}
              onChange={setReceivingAge}
              min={IDECO_INPUT_LIMITS.minReceivingAge}
              max={IDECO_INPUT_LIMITS.maxReceivingAge}
              hint="60歳〜75歳。通算加入期間により開始年齢が変わる場合があります"
            />
          </div>

          <div className="sm:max-w-[calc(50%-0.5rem)]">
            <MoneyField
              id="ideco-initial-asset"
              label="現在のiDeCo評価額（任意）"
              value={initialAsset}
              onChange={setInitialAsset}
              hint="保有中のiDeCo資産の評価額"
              maxAmount={IDECO_INPUT_LIMITS.maxInitialAsset}
            />
          </div>

          <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ideco-category">加入区分</Label>
              <Select
                id="ideco-category"
                value={category}
                onChange={(event) => changeCategory(event.target.value)}
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <MoneyField
              id="ideco-contribution"
              label="毎月の掛金"
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              hint={`この区分の上限：${formatYen(calculatedLimit)}（5,000円以上・1,000円単位）`}
              maxAmount={calculatedLimit}
            />
          </div>

          <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ideco-rate-preset">参考する運用タイプ</Label>
              <Select
                id="ideco-rate-preset"
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
              <Label htmlFor="ideco-rate">想定年率</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="ideco-rate"
                  type="number"
                  min={IDECO_INPUT_LIMITS.minAnnualRate}
                  max={IDECO_INPUT_LIMITS.maxAnnualRate}
                  step="0.1"
                  value={annualRate}
                  onChange={(event) => {
                    setRatePreset("custom");
                    setAnnualRate(event.target.value);
                  }}
                  inputMode="decimal"
                />
                <span className="shrink-0 text-sm text-muted">%</span>
              </div>
              <p className="text-xs leading-5 text-muted">
                過去の実績や将来の利益を保証する数字ではありません。
              </p>
            </div>
          </div>

          <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ideco-tax-calculation-mode">節税額の計算方法</Label>
              <Select
                id="ideco-tax-calculation-mode"
                value={taxCalculationMode}
                onChange={(event) =>
                  setTaxCalculationMode(event.target.value as IdecoTaxCalculationMode)
                }
              >
                <option value="income">年収・控除から計算（標準方式）</option>
                <option value="rate">所得税率を指定（簡易計算）</option>
              </Select>
              <p className="text-xs leading-5 text-muted">
                標準方式は、年収から課税所得と所得税・住民税の差額を計算します。
              </p>
            </div>
            {taxCalculationMode === "income" ? (
              <IncomeField
                id="ideco-annual-income"
                label={
                  category === "self-employed" || category === "voluntary-insured"
                    ? "課税所得（標準方式）"
                    : "年収（標準方式）"
                }
                value={annualIncome}
                onChange={setAnnualIncome}
                hint="会社員等は給与収入、自営業等は課税所得を万円単位で入力"
                maxAmount={IDECO_INPUT_LIMITS.maxAnnualIncome / 10_000}
              />
            ) : (
              <div className="space-y-2">
                <Label htmlFor="ideco-income-tax-rate">所得税率の目安</Label>
                <Select
                  id="ideco-income-tax-rate"
                  value={incomeTaxRate}
                  onChange={(event) => setIncomeTaxRate(event.target.value)}
                >
                  {INCOME_TAX_RATE_OPTIONS.map((rate) => (
                    <option key={rate} value={rate}>
                      所得税{rate}%（住民税10%と仮定）
                    </option>
                  ))}
                </Select>
                <p className="text-xs leading-5 text-muted">
                  課税所得がない場合、掛金の所得控除による税軽減はありません。
                </p>
              </div>
            )}
          </div>

          {taxCalculationMode === "income" && (
            <div className="tool-form-grid grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ideco-dependent-spouse">扶養配偶者</Label>
                <Select
                  id="ideco-dependent-spouse"
                  value={hasDependentSpouse}
                  onChange={(event) => setHasDependentSpouse(event.target.value)}
                >
                  <option value="なし">なし</option>
                  <option value="あり">あり</option>
                </Select>
                <p className="text-xs leading-5 text-muted">
                  配偶者控除の対象となる扶養配偶者を指定します。
                </p>
              </div>
              <div className="rounded-md border border-border bg-surface-muted p-4 text-sm leading-6">
                <p className="font-semibold">税額の計算範囲</p>
                <p className="mt-1 text-muted">
                  所得税は累進税率、住民税は10%として、iDeCo拠出前後の税額差を計算します。
                </p>
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-border bg-surface-muted p-4 text-sm leading-6">
              <p className="font-semibold">現在の掛金上限</p>
              <p className="mt-1 text-muted">
                {formatYen(calculatedLimit)}／月（{formatYen(calculatedLimit * 12)}／年）
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">
                企業年金や国民年金基金等の掛金がある場合は、詳細モードで入力してください。
              </p>
            </div>
          </div>

          {mode === "detail" && (
            <div className="space-y-5 rounded-lg border border-border bg-surface-muted/60 p-4">
              <div>
                <h3 className="text-sm font-semibold">詳細オプション</h3>
                <p className="mt-1 text-xs leading-5 text-muted">
                  現在の取得価額、扶養親族、企業年金等との合算、金融機関の手数料を反映します。
                </p>
              </div>
              <MoneyField
                id="ideco-initial-cost-basis"
                label="現在の取得価額（任意）"
                value={initialCostBasis}
                onChange={setInitialCostBasis}
                hint="現在のiDeCo評価額に対応する拠出元本の目安。元本・運用益の表示に使用"
                maxAmount={IDECO_INPUT_LIMITS.maxInitialCostBasis}
              />
              {taxCalculationMode === "income" && (
                <div className="space-y-2">
                  <Label htmlFor="ideco-dependent-family-ages">
                    扶養親族の年齢（任意）
                  </Label>
                  <Input
                    id="ideco-dependent-family-ages"
                    type="text"
                    inputMode="numeric"
                    placeholder="例：10, 16"
                    value={dependentFamilyAges}
                    onChange={(event) => setDependentFamilyAges(event.target.value)}
                  />
                  <p className="text-xs leading-5 text-muted">
                    年齢をカンマ区切りで入力（最大8人）。扶養控除の年齢変化も反映します。
                  </p>
                </div>
              )}
              <MoneyField
                id="ideco-monthly-fee"
                label="毎月の手数料（合計）"
                value={monthlyFee}
                onChange={setMonthlyFee}
                hint={`初期値は連合会分${formatYen(IDECO_RULES.contributionFee)}。金融機関等の手数料を含む合計を確認`}
                maxAmount={IDECO_INPUT_LIMITS.maxMonthlyFee}
                step="1"
              />
              {(category === "employee-with-pension" ||
                category === "public-servant") && (
                <MoneyField
                  id="ideco-corporate-pension"
                  label="企業年金等の月額（任意）"
                  value={corporatePensionAmount}
                  onChange={setCorporatePensionAmount}
                  hint="企業型DCの事業主掛金・DB等の掛金相当額の合計"
                  maxAmount={IDECO_INPUT_LIMITS.maxCorporatePensionAmount}
                />
              )}
              {(category === "self-employed" || category === "voluntary-insured") && (
                <MoneyField
                  id="ideco-other-pension"
                  label="国民年金基金等の月額（任意）"
                  value={otherPublicPensionContribution}
                  onChange={setOtherPublicPensionContribution}
                  hint="国民年金基金または国民年金の付加保険料。iDeCoと合算して上限を計算"
                  maxAmount={IDECO_INPUT_LIMITS.maxOtherPublicPensionContribution}
                />
              )}
            </div>
          )}

          <div className="rounded-md border border-border bg-surface-muted p-4 text-sm leading-6">
            <p className="font-semibold">iDeCoの税制メリットを概算</p>
            <p className="mt-1 text-muted">
              掛金の全額が所得控除の対象になる前提で、拠出前後の所得税・住民税の差額を計算します。受け取り時の税金は、受け取り方や退職金・公的年金との関係で変わるため、このツールでは計算しません。
            </p>
          </div>

          <p className="text-xs leading-5 text-muted">
            {IDECO_RULES.currentAsOf}
            時点の現行制度を前提にしています。2026年12月1日には拠出限度額と加入可能年齢の引き上げが施行予定のため、最新情報は
            <a
              className="text-link"
              href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/nenkin/nenkin/kyoshutsu/2025kaisei.html"
              target="_blank"
              rel="noreferrer"
            >
              厚生労働省の制度改正案内
            </a>
            と
            <a
              className="text-link"
              href="https://www.ideco-koushiki.jp/start/entry.html"
              target="_blank"
              rel="noreferrer"
            >
              iDeCo公式サイト
            </a>
            で確認してください。
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
        calculation.result && <SimulationResult result={calculation.result} />
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

function AgeField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  hint: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type="number"
          min={min}
          max={max}
          step="1"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          inputMode="numeric"
        />
        <span className="shrink-0 text-sm text-muted">歳</span>
      </div>
      <p className="text-xs leading-5 text-muted">{hint}</p>
    </div>
  );
}

function IncomeField({
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
          step="1"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          inputMode="numeric"
        />
        <span className="shrink-0 text-sm text-muted">万円</span>
      </div>
      <p className="text-xs leading-5 text-muted">{hint}</p>
    </div>
  );
}

function MoneyField({
  id,
  label,
  value,
  onChange,
  hint,
  maxAmount,
  step = "1000",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint: string;
  maxAmount: number;
  step?: string;
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
          step={step}
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

function SimulationResult({ result }: { result: IdecoSimulationResult }) {
  const currentCategory = formatYearLabel(result.currentAge);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>iDeCoの見込み結果</CardTitle>
            <p className="mt-1 text-sm text-muted">
              {currentCategory}から{result.receivingAge}歳まで・月初拠出・複利で計算
            </p>
            <p className="mt-1 text-xs leading-5 text-muted">
              {result.taxCalculationMode === "income"
                ? `標準方式：初年度の節税額は所得税${formatYen(result.firstYearTaxSaving.incomeTaxSaving)}＋住民税${formatYen(result.firstYearTaxSaving.residentTaxSaving)}`
                : "簡易計算：指定した所得税率と住民税10%から算出"}
            </p>
          </div>
          <Badge variant="success">税軽減額は概算</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg bg-primary p-5 text-primary-foreground">
          <p className="text-sm opacity-85">{result.receivingAge}歳時点の見込み資産額</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">
            {formatYen(result.finalValue)}
          </p>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ResultItem label="累計掛金" value={formatYen(result.totalContribution)} />
          <ResultItem label="運用益" value={formatYen(result.gain)} />
          <ResultItem label="累計税軽減額" value={formatYen(result.totalTaxSaving)} />
          <ResultItem label="累計手数料" value={formatYen(result.totalFees)} />
        </dl>

        <IdecoGrowthChart points={result.points} />

        <div className="rounded-md border border-border bg-surface-muted p-4 text-sm leading-6">
          <p className="font-semibold">上限と積立期間</p>
          <p className="mt-1 text-muted">
            この区分の掛金上限は{formatYen(result.monthlyContributionLimit)}
            ／月です。掛金は
            {result.contributionEndAge}歳まで拠出し、{result.contributionEndAge}
            歳以降は受け取り開始まで運用のみとしています。
          </p>
        </div>

        <p className="text-xs leading-5 text-muted">
          月初に掛金を加え、手数料を差し引いた後に月次の値動きを反映する簡易計算です。受け取り時の税金、実際の金融機関手数料、運用商品の信託報酬、加入資格の個別条件は反映していません。
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

function IdecoGrowthChart({ points }: { points: IdecoSimulationPoint[] }) {
  const width = 720;
  const height = 280;
  const left = 52;
  const right = 18;
  const top = 20;
  const bottom = 42;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const maxValue = Math.max(
    ...points.flatMap((point) => [point.principal, point.value]),
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
    <figure aria-labelledby="ideco-chart-caption">
      <figcaption id="ideco-chart-caption" className="mb-3 text-sm font-semibold">
        資産の増え方
      </figcaption>
      <div className="overflow-hidden rounded-md border border-border bg-surface-muted/60 p-2">
        <svg
          className="h-auto w-full"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="iDeCoの掛金元本と運用資産の推移"
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
              {`${selectedPoint.age}歳時点の資産額：${formatYen(selectedPoint.value)}`}
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
                {point.age}歳
              </text>
            );
          })}
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
          運用資産
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-3 bg-muted" aria-hidden="true" />
          掛金元本＋現在の資産
        </span>
      </div>
      <div className="mt-4 rounded-md border border-border bg-surface-muted/60 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="ideco-chart-year" className="text-sm font-semibold">
            表示する年
          </label>
          <span className="text-sm font-semibold text-primary">
            {selectedPoint.age}歳時点
          </span>
        </div>
        <input
          id="ideco-chart-year"
          className="mt-3 h-2 w-full cursor-pointer accent-primary"
          type="range"
          min="0"
          max={points.length - 1}
          step="1"
          value={safeSelectedIndex}
          onChange={(event) => setSelectedIndex(Number(event.target.value))}
          aria-label="グラフで表示する年"
          aria-valuetext={`${selectedPoint.age}歳時点`}
        />
        <dl className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <ResultItem label="運用資産" value={formatYen(selectedPoint.value)} />
          <ResultItem label="累計掛金" value={formatYen(selectedPoint.contributed)} />
          <ResultItem
            label="年間の税軽減額"
            value={formatYen(selectedPoint.annualTaxSaving)}
          />
          <ResultItem
            label="累計の税軽減額"
            value={formatYen(selectedPoint.cumulativeTaxSaving)}
          />
        </dl>
      </div>
      <details className="mt-4 rounded-md border border-border px-3">
        <summary className="cursor-pointer py-3 text-sm font-semibold">
          年ごとの数字を見る
        </summary>
        <div className="overflow-x-auto pb-3">
          <table className="w-full min-w-[58rem] text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="px-2 py-2 font-semibold">年数</th>
                <th className="px-2 py-2 font-semibold">年齢</th>
                <th className="px-2 py-2 font-semibold">年間掛金</th>
                <th className="px-2 py-2 font-semibold">累計掛金</th>
                <th className="px-2 py-2 font-semibold">運用資産</th>
                <th className="px-2 py-2 font-semibold">年間税軽減額</th>
                <th className="px-2 py-2 font-semibold">累計税軽減額</th>
              </tr>
            </thead>
            <tbody>
              {points.map((point) => (
                <tr key={point.year} className="border-b border-border last:border-0">
                  <td className="px-2 py-2">
                    {point.year === 0 ? "開始時" : `${point.year}年目`}
                  </td>
                  <td className="px-2 py-2">{point.age}歳</td>
                  <td className="px-2 py-2">{formatYen(point.annualContribution)}</td>
                  <td className="px-2 py-2">{formatYen(point.contributed)}</td>
                  <td className="px-2 py-2">{formatYen(point.value)}</td>
                  <td className="px-2 py-2">{formatYen(point.annualTaxSaving)}</td>
                  <td className="px-2 py-2">{formatYen(point.cumulativeTaxSaving)}</td>
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
  points: IdecoSimulationPoint[],
  key: "principal" | "value",
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

function parseFamilyAges(value: string) {
  if (!value.trim()) return [];
  const ages = value
    .split(/[、,，\s]+/)
    .filter(Boolean)
    .map((item) => Number(item));
  return ages.every((age) => Number.isFinite(age)) ? ages : undefined;
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

function formatYearLabel(age: number) {
  return `${age}歳`;
}
