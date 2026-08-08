export const TAXABLE_INVESTMENT_RULES = {
  capitalGainsTaxRate: 0.20315,
  incomeTaxAndReconstructionRate: 0.15315,
  residentTaxRate: 0.05,
  taxRateLabel: "20.315%",
} as const;

export const TAXABLE_INVESTMENT_INPUT_LIMITS = {
  maxCurrentValue: 100_000_000,
  maxAcquisitionCost: 100_000_000,
  maxMonthlyAmount: 1_000_000,
  maxBonusAmount: 1_000_000,
  maxYears: 50,
  minAnnualRate: -99.9,
  maxAnnualRate: 100,
} as const;

export type TaxableInvestmentInput = {
  years: number;
  monthlyAmount: number;
  annualRate: number;
  initialValue?: number;
  initialCostBasis?: number;
  bonusAmount?: number;
  bonusMonths?: number[];
};

export type TaxableInvestmentPoint = {
  year: number;
  principal: number;
  value: number;
  gain: number;
  taxableGain: number;
  tax: number;
  afterTaxValue: number;
};

export type TaxableInvestmentResult = {
  startingValue: number;
  startingCostBasis: number;
  totalFutureContribution: number;
  totalPrincipal: number;
  finalValue: number;
  gain: number;
  taxableGain: number;
  tax: number;
  afterTaxValue: number;
  points: TaxableInvestmentPoint[];
};

export function simulateTaxableInvestment(
  input: TaxableInvestmentInput,
): TaxableInvestmentResult {
  validateInteger(input.years, "運用期間", 1, TAXABLE_INVESTMENT_INPUT_LIMITS.maxYears);
  validateAmount(
    input.monthlyAmount,
    "毎月の積立額",
    TAXABLE_INVESTMENT_INPUT_LIMITS.maxMonthlyAmount,
  );
  validateAmount(
    input.initialValue ?? 0,
    "現在の評価額",
    TAXABLE_INVESTMENT_INPUT_LIMITS.maxCurrentValue,
  );
  validateAmount(
    input.initialCostBasis ?? 0,
    "現在の取得価額",
    TAXABLE_INVESTMENT_INPUT_LIMITS.maxAcquisitionCost,
  );
  validateAmount(
    input.bonusAmount ?? 0,
    "ボーナス投資額",
    TAXABLE_INVESTMENT_INPUT_LIMITS.maxBonusAmount,
  );

  if (
    !Number.isFinite(input.annualRate) ||
    input.annualRate < TAXABLE_INVESTMENT_INPUT_LIMITS.minAnnualRate ||
    input.annualRate > TAXABLE_INVESTMENT_INPUT_LIMITS.maxAnnualRate
  ) {
    throw new Error("想定年率は-99.9%〜100%の範囲で入力してください。");
  }

  const startingValue = input.initialValue ?? 0;
  const startingCostBasis = input.initialCostBasis ?? 0;
  if ((startingValue === 0) !== (startingCostBasis === 0)) {
    throw new Error(
      "現在の評価額を入力した場合は、現在の取得価額も0円より大きい金額で入力してください。",
    );
  }

  const bonusMonths = [...new Set(input.bonusMonths ?? [])];
  if (bonusMonths.some((month) => !Number.isInteger(month) || month < 1 || month > 12)) {
    throw new Error("ボーナス月は1月〜12月から選択してください。");
  }

  const bonusAmount = input.bonusAmount ?? 0;
  if (bonusAmount > 0 && bonusMonths.length === 0) {
    throw new Error(
      "ボーナス投資額を入力した場合は、投資する月を1つ以上選択してください。",
    );
  }

  const monthlyRate = Math.pow(1 + input.annualRate / 100, 1 / 12) - 1;
  let balance = startingValue;
  let totalFutureContribution = 0;
  let principal = startingCostBasis;

  const points: TaxableInvestmentPoint[] = [createPoint(0, principal, balance)];

  for (let month = 1; month <= input.years * 12; month += 1) {
    const monthOfYear = ((month - 1) % 12) + 1;
    const scheduledContribution =
      input.monthlyAmount + (bonusMonths.includes(monthOfYear) ? bonusAmount : 0);

    totalFutureContribution += scheduledContribution;
    principal += scheduledContribution;

    // 月初に積立額を加え、その月の値動きを反映します。
    balance = (balance + scheduledContribution) * (1 + monthlyRate);
    if (!Number.isFinite(balance) || !Number.isSafeInteger(Math.round(balance))) {
      throw new Error(
        "入力値が大きすぎて正確に計算できません。金額や年率、運用期間を小さくしてください。",
      );
    }

    if (month % 12 === 0) {
      points.push(createPoint(month / 12, principal, balance));
    }
  }

  const finalPoint = points.at(-1);
  if (!finalPoint) {
    throw new Error("計算結果を作成できませんでした。");
  }

  return {
    startingValue,
    startingCostBasis,
    totalFutureContribution,
    totalPrincipal: principal,
    finalValue: finalPoint.value,
    gain: finalPoint.gain,
    taxableGain: finalPoint.taxableGain,
    tax: finalPoint.tax,
    afterTaxValue: finalPoint.afterTaxValue,
    points,
  };
}

function createPoint(
  year: number,
  principal: number,
  value: number,
): TaxableInvestmentPoint {
  const gain = value - principal;
  const taxableGain = Math.max(gain, 0);
  const tax = taxableGain * TAXABLE_INVESTMENT_RULES.capitalGainsTaxRate;

  return {
    year,
    principal,
    value,
    gain,
    taxableGain,
    tax,
    afterTaxValue: value - tax,
  };
}

function validateInteger(value: number, label: string, minimum: number, maximum: number) {
  if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
    throw new Error(`${label}は${minimum}〜${maximum}年の整数で入力してください。`);
  }
}

function validateAmount(value: number, label: string, maximum: number) {
  if (!Number.isSafeInteger(value) || value < 0 || value > maximum) {
    throw new Error(
      `${label}は0円〜${maximum.toLocaleString("ja-JP")}円の整数で入力してください。`,
    );
  }
}
