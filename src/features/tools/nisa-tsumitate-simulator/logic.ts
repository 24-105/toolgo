export const NISA_RULES = {
  annualTsumitateLimit: 1_200_000,
  lifetimeLimit: 18_000_000,
  nonTaxableHoldingPeriod: "無期限",
} as const;

export const NISA_INPUT_LIMITS = {
  maxCurrentValue: 100_000_000,
  maxMonthlyAmount: 100_000,
  maxBonusAmount: NISA_RULES.annualTsumitateLimit,
  maxYears: 50,
  minAnnualRate: -99.9,
  maxAnnualRate: 100,
} as const;

export type NisaSimulationInput = {
  years: number;
  monthlyAmount: number;
  annualRate: number;
  initialAmount?: number;
  bonusAmount?: number;
  bonusMonths?: number[];
};

export type NisaSimulationPoint = {
  year: number;
  invested: number;
  baseValue: number;
  value: number;
  gain: number;
};

export type NisaSimulationResult = {
  startingValue: number;
  finalValue: number;
  totalInvested: number;
  totalScheduledContribution: number;
  excludedContribution: number;
  gain: number;
  lifetimeLimitReached: boolean;
  lifetimeLimitReachYear?: number;
  points: NisaSimulationPoint[];
};

export function simulateNisa(input: NisaSimulationInput): NisaSimulationResult {
  validateInteger(input.years, "運用期間", 1, NISA_INPUT_LIMITS.maxYears);
  validateAmount(input.monthlyAmount, "毎月の積立額", NISA_INPUT_LIMITS.maxMonthlyAmount);
  validateAmount(
    input.initialAmount ?? 0,
    "現在のNISA運用額",
    NISA_INPUT_LIMITS.maxCurrentValue,
  );
  validateAmount(
    input.bonusAmount ?? 0,
    "ボーナス投資額",
    NISA_INPUT_LIMITS.maxBonusAmount,
  );

  if (
    !Number.isFinite(input.annualRate) ||
    input.annualRate < NISA_INPUT_LIMITS.minAnnualRate ||
    input.annualRate > NISA_INPUT_LIMITS.maxAnnualRate
  ) {
    throw new Error("想定年率は-99.9%〜100%の範囲で入力してください。");
  }

  const bonusMonths = [...new Set(input.bonusMonths ?? [])];
  if (bonusMonths.some((month) => !Number.isInteger(month) || month < 1 || month > 12)) {
    throw new Error("ボーナス月は1月〜12月から選択してください。");
  }

  if (input.bonusAmount && input.bonusAmount > 0 && bonusMonths.length === 0) {
    throw new Error(
      "ボーナス投資額を入力した場合は、投資する月を1つ以上選択してください。",
    );
  }

  const monthlyRate = Math.pow(1 + input.annualRate / 100, 1 / 12) - 1;
  const startingValue = input.initialAmount ?? 0;
  const bonusAmount = input.bonusAmount ?? 0;

  let balance = startingValue;
  let totalInvested = 0;
  let totalScheduledContribution = 0;
  let excludedContribution = 0;
  let annualContribution = 0;
  let currentYear = 1;
  let lifetimeLimitReachYear: number | undefined;

  const points: NisaSimulationPoint[] = [
    createPoint(0, totalInvested, startingValue, balance),
  ];

  for (let month = 1; month <= input.years * 12; month += 1) {
    const year = Math.ceil(month / 12);
    if (year !== currentYear) {
      currentYear = year;
      annualContribution = 0;
    }

    const monthOfYear = ((month - 1) % 12) + 1;
    const scheduledContribution =
      input.monthlyAmount + (bonusMonths.includes(monthOfYear) ? bonusAmount : 0);
    const annualRemaining = Math.max(
      NISA_RULES.annualTsumitateLimit - annualContribution,
      0,
    );
    const lifetimeRemaining = Math.max(NISA_RULES.lifetimeLimit - totalInvested, 0);
    const acceptedContribution = Math.min(
      scheduledContribution,
      annualRemaining,
      lifetimeRemaining,
    );

    totalScheduledContribution += scheduledContribution;
    excludedContribution += scheduledContribution - acceptedContribution;
    annualContribution += acceptedContribution;
    totalInvested += acceptedContribution;

    if (
      lifetimeLimitReachYear === undefined &&
      totalInvested >= NISA_RULES.lifetimeLimit
    ) {
      lifetimeLimitReachYear = year;
    }

    // 月初に積立額を加え、その月の値動きを反映します。
    balance = (balance + acceptedContribution) * (1 + monthlyRate);
    if (!Number.isFinite(balance)) {
      throw new Error(
        "入力値が大きすぎて計算できません。金額や年率を小さくしてください。",
      );
    }

    if (month % 12 === 0) {
      points.push(createPoint(year, totalInvested, startingValue, balance));
    }
  }

  return {
    startingValue,
    finalValue: balance,
    totalInvested,
    totalScheduledContribution,
    excludedContribution,
    gain: balance - (startingValue + totalInvested),
    lifetimeLimitReached: totalInvested >= NISA_RULES.lifetimeLimit,
    lifetimeLimitReachYear,
    points,
  };
}

function createPoint(
  year: number,
  invested: number,
  startingValue: number,
  value: number,
): NisaSimulationPoint {
  return {
    year,
    invested,
    baseValue: startingValue + invested,
    value,
    gain: value - (startingValue + invested),
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
