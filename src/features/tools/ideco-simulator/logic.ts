export const IDECO_RULES = {
  currentAsOf: "2026年8月8日",
  minContribution: 5_000,
  contributionUnit: 1_000,
  selfEmployedLimit: 68_000,
  employeeWithoutPensionLimit: 23_000,
  employeeWithPensionLimit: 20_000,
  thirdCategoryLimit: 23_000,
  voluntaryInsuredLimit: 68_000,
  corporatePensionCombinedLimit: 55_000,
  residentTaxRate: 0.1,
  contributionFee: 105,
  initialFee: 2_829,
  contributionAgeLimit: 65,
  scheduledRevisionDate: "2026年12月1日",
  scheduledFirstCategoryLimit: 75_000,
  scheduledSecondCategoryLimit: 62_000,
  reconstructionIncomeTaxRate: 0.021,
  reconstructionIncomeTaxEndYear: 2037,
} as const;

export const IDECO_INPUT_LIMITS = {
  minCurrentAge: 20,
  maxCurrentAge: 64,
  minReceivingAge: 60,
  maxReceivingAge: 75,
  maxInitialAsset: 100_000_000,
  maxInitialCostBasis: 100_000_000,
  maxAnnualIncome: 100_000_000,
  maxCorporatePensionAmount: IDECO_RULES.corporatePensionCombinedLimit,
  maxOtherPublicPensionContribution: IDECO_RULES.selfEmployedLimit,
  maxMonthlyFee: 10_000,
  minAnnualRate: -99.9,
  maxAnnualRate: 100,
  maxIncomeTaxRate: 45,
  maxFamilyMembers: 8,
  maxFamilyAge: 100,
} as const;

export type IdecoCategory =
  | "self-employed"
  | "employee-no-pension"
  | "employee-with-pension"
  | "public-servant"
  | "third-category"
  | "voluntary-insured";

export type IdecoTaxCalculationMode = "income" | "rate";

export type IdecoSimulationInput = {
  currentAge: number;
  receivingAge: number;
  category: IdecoCategory;
  monthlyContribution: number;
  annualRate: number;
  taxCalculationMode: IdecoTaxCalculationMode;
  annualIncome?: number;
  hasDependentSpouse?: boolean;
  dependentFamilyAges?: number[];
  incomeTaxRate?: number;
  initialAsset?: number;
  initialCostBasis?: number;
  corporatePensionAmount?: number;
  otherPublicPensionContribution?: number;
  monthlyFee?: number;
};

export type IdecoTaxSavingBreakdown = {
  incomeTaxSaving: number;
  residentTaxSaving: number;
  total: number;
};

export type IdecoSimulationPoint = {
  year: number;
  age: number;
  value: number;
  principal: number;
  contributed: number;
  gain: number;
  annualContribution: number;
  annualTaxSaving: number;
  cumulativeTaxSaving: number;
  feePaid: number;
};

export type IdecoSimulationResult = {
  currentAge: number;
  receivingAge: number;
  contributionEndAge: number;
  monthlyContributionLimit: number;
  taxCalculationMode: IdecoTaxCalculationMode;
  firstYearTaxSaving: IdecoTaxSavingBreakdown;
  initialAsset: number;
  initialCostBasis: number;
  totalContribution: number;
  totalPrincipal: number;
  totalFees: number;
  finalValue: number;
  gain: number;
  totalTaxSaving: number;
  points: IdecoSimulationPoint[];
};

type TaxableIncome = {
  incomeTax: number;
  residentTax: number;
};

type TaxSavingInput = {
  category: IdecoCategory;
  annualContribution: number;
  annualIncome: number;
  hasDependentSpouse: boolean;
  dependentFamilyAges: number[];
  age: number;
  yearOffset: number;
};

export function getIdecoContributionLimit(
  category: IdecoCategory,
  corporatePensionAmount = 0,
  otherPublicPensionContribution = 0,
) {
  switch (category) {
    case "self-employed":
      return Math.max(IDECO_RULES.selfEmployedLimit - otherPublicPensionContribution, 0);
    case "employee-no-pension":
    case "third-category":
      return IDECO_RULES.employeeWithoutPensionLimit;
    case "employee-with-pension":
    case "public-servant":
      return Math.min(
        IDECO_RULES.employeeWithPensionLimit,
        Math.max(IDECO_RULES.corporatePensionCombinedLimit - corporatePensionAmount, 0),
      );
    case "voluntary-insured":
      return Math.max(
        IDECO_RULES.voluntaryInsuredLimit - otherPublicPensionContribution,
        0,
      );
  }
}

/**
 * 年収・控除をもとにした、1年分の拠出時税軽減額を計算します。
 * 所得税は課税所得の累進税率、住民税は10%として、税額差を100円未満切り捨てします。
 */
export function calculateIncomeBasedTaxSaving(
  input: TaxSavingInput,
): IdecoTaxSavingBreakdown {
  if (input.annualContribution <= 0) {
    return { incomeTaxSaving: 0, residentTaxSaving: 0, total: 0 };
  }

  const taxableIncome = getTaxableIncome(input);
  const incomeTaxBefore = calculateIncomeTax(taxableIncome.incomeTax, input.yearOffset);
  const incomeTaxAfter = calculateIncomeTax(
    Math.max(taxableIncome.incomeTax - input.annualContribution, 0),
    input.yearOffset,
  );
  const incomeTaxSaving = roundDownHundred(incomeTaxBefore - incomeTaxAfter);

  const residentTaxBefore = taxableIncome.residentTax * IDECO_RULES.residentTaxRate;
  const residentTaxAfter =
    Math.max(taxableIncome.residentTax - input.annualContribution, 0) *
    IDECO_RULES.residentTaxRate;
  const residentTaxSaving = roundDownHundred(residentTaxBefore - residentTaxAfter);

  return {
    incomeTaxSaving,
    residentTaxSaving,
    total: incomeTaxSaving + residentTaxSaving,
  };
}

export function simulateIdeco(input: IdecoSimulationInput): IdecoSimulationResult {
  validateInteger(
    input.currentAge,
    "現在の年齢",
    IDECO_INPUT_LIMITS.minCurrentAge,
    IDECO_INPUT_LIMITS.maxCurrentAge,
  );
  validateInteger(
    input.receivingAge,
    "受け取り開始年齢",
    IDECO_INPUT_LIMITS.minReceivingAge,
    IDECO_INPUT_LIMITS.maxReceivingAge,
  );
  if (input.receivingAge < input.currentAge) {
    throw new Error("受け取り開始年齢は、現在の年齢以上で入力してください。");
  }

  const initialAsset = input.initialAsset ?? 0;
  const initialCostBasis = input.initialCostBasis ?? initialAsset;
  const corporatePensionAmount = input.corporatePensionAmount ?? 0;
  const otherPublicPensionContribution = input.otherPublicPensionContribution ?? 0;
  const monthlyFee = input.monthlyFee ?? IDECO_RULES.contributionFee;
  const annualIncome = input.annualIncome ?? 0;
  const hasDependentSpouse = input.hasDependentSpouse ?? false;
  const dependentFamilyAges = input.dependentFamilyAges ?? [];

  validateAmount(initialAsset, "現在のiDeCo資産", IDECO_INPUT_LIMITS.maxInitialAsset);
  validateAmount(
    initialCostBasis,
    "現在の取得価額",
    IDECO_INPUT_LIMITS.maxInitialCostBasis,
  );
  validateAmount(annualIncome, "年収または課税所得", IDECO_INPUT_LIMITS.maxAnnualIncome);
  validateAmount(
    corporatePensionAmount,
    "企業年金等の月額",
    IDECO_INPUT_LIMITS.maxCorporatePensionAmount,
  );
  validateAmount(
    otherPublicPensionContribution,
    "国民年金基金等の月額",
    IDECO_INPUT_LIMITS.maxOtherPublicPensionContribution,
  );
  validateAmount(monthlyFee, "毎月の手数料", IDECO_INPUT_LIMITS.maxMonthlyFee);
  validateFamilyAges(dependentFamilyAges);

  if (
    !Number.isFinite(input.annualRate) ||
    input.annualRate < IDECO_INPUT_LIMITS.minAnnualRate ||
    input.annualRate > IDECO_INPUT_LIMITS.maxAnnualRate
  ) {
    throw new Error("想定年率は-99.9%〜100%の範囲で入力してください。");
  }
  if (input.taxCalculationMode !== "income" && input.taxCalculationMode !== "rate") {
    throw new Error("税軽減額の計算方法を選択してください。");
  }
  const incomeTaxRate = input.incomeTaxRate;
  if (
    input.taxCalculationMode === "rate" &&
    (incomeTaxRate === undefined ||
      !Number.isFinite(incomeTaxRate) ||
      incomeTaxRate < 0 ||
      incomeTaxRate > IDECO_INPUT_LIMITS.maxIncomeTaxRate)
  ) {
    throw new Error("所得税率の目安は0%〜45%の範囲で入力してください。");
  }

  const monthlyContributionLimit = getIdecoContributionLimit(
    input.category,
    corporatePensionAmount,
    otherPublicPensionContribution,
  );
  validateContribution(input.monthlyContribution, monthlyContributionLimit);

  const monthlyRate = Math.pow(1 + input.annualRate / 100, 1 / 12) - 1;
  const totalMonths = (input.receivingAge - input.currentAge) * 12;
  const contributionEndAge = Math.min(
    input.receivingAge,
    IDECO_RULES.contributionAgeLimit,
  );
  const contributionMonths = Math.max((contributionEndAge - input.currentAge) * 12, 0);

  let balance = initialAsset;
  let totalContribution = 0;
  let totalFees = 0;
  let annualContribution = 0;
  let annualFee = 0;
  let cumulativeTaxSaving = 0;
  let firstYearTaxSaving: IdecoTaxSavingBreakdown = {
    incomeTaxSaving: 0,
    residentTaxSaving: 0,
    total: 0,
  };
  const points: IdecoSimulationPoint[] = [
    createPoint(0, input.currentAge, balance, initialCostBasis, 0, 0, 0, 0),
  ];

  for (let month = 1; month <= totalMonths; month += 1) {
    const contribution = month <= contributionMonths ? input.monthlyContribution : 0;
    const availableBeforeFee = balance + contribution;
    const fee = Math.min(monthlyFee, Math.max(availableBeforeFee, 0));

    totalContribution += contribution;
    totalFees += fee;
    annualContribution += contribution;
    annualFee += fee;
    balance = (availableBeforeFee - fee) * (1 + monthlyRate);

    if (!Number.isFinite(balance) || !Number.isSafeInteger(Math.round(balance))) {
      throw new Error(
        "入力値が大きすぎて正確に計算できません。金額や年率、受け取り開始年齢を小さくしてください。",
      );
    }

    if (month % 12 === 0) {
      const year = month / 12;
      const taxSaving = calculateTaxSaving({
        input,
        annualContribution,
        annualIncome,
        hasDependentSpouse,
        dependentFamilyAges,
        age: input.currentAge + year - 1,
        yearOffset: year - 1,
      });
      cumulativeTaxSaving += taxSaving.total;
      if (year === 1) {
        firstYearTaxSaving = taxSaving;
      }
      points.push(
        createPoint(
          year,
          input.currentAge + year,
          balance,
          initialCostBasis + totalContribution,
          annualContribution,
          taxSaving.total,
          cumulativeTaxSaving,
          annualFee,
        ),
      );
      annualContribution = 0;
      annualFee = 0;
    }
  }

  const finalPoint = points.at(-1);
  if (!finalPoint) {
    throw new Error("計算結果を作成できませんでした。");
  }

  return {
    currentAge: input.currentAge,
    receivingAge: input.receivingAge,
    contributionEndAge,
    monthlyContributionLimit,
    taxCalculationMode: input.taxCalculationMode,
    firstYearTaxSaving,
    initialAsset,
    initialCostBasis,
    totalContribution,
    totalPrincipal: initialCostBasis + totalContribution,
    totalFees,
    finalValue: finalPoint.value,
    gain: finalPoint.gain,
    totalTaxSaving: cumulativeTaxSaving,
    points,
  };
}

function calculateTaxSaving({
  input,
  annualContribution,
  annualIncome,
  hasDependentSpouse,
  dependentFamilyAges,
  age,
  yearOffset,
}: Omit<TaxSavingInput, "category"> & {
  input: IdecoSimulationInput;
}): IdecoTaxSavingBreakdown {
  if (input.taxCalculationMode === "rate") {
    const incomeTaxSaving = annualContribution * ((input.incomeTaxRate ?? 0) / 100);
    const residentTaxSaving = annualContribution * IDECO_RULES.residentTaxRate;
    return {
      incomeTaxSaving,
      residentTaxSaving,
      total: incomeTaxSaving + residentTaxSaving,
    };
  }

  return calculateIncomeBasedTaxSaving({
    category: input.category,
    annualContribution,
    annualIncome,
    hasDependentSpouse,
    dependentFamilyAges,
    age,
    yearOffset,
  });
}

function getTaxableIncome({
  category,
  annualIncome,
  hasDependentSpouse,
  dependentFamilyAges,
  age,
  yearOffset,
}: Omit<TaxSavingInput, "annualContribution">): TaxableIncome {
  const basicDeduction = getBasicDeduction(annualIncome);
  const spouseDeduction = hasDependentSpouse
    ? getSpouseDeduction(annualIncome)
    : { incomeTax: 0, residentTax: 0 };
  const familyDeduction = getFamilyDeduction(dependentFamilyAges, yearOffset);

  if (isFirstCategory(category)) {
    return {
      incomeTax: Math.max(annualIncome, 0),
      residentTax: Math.max(
        annualIncome +
          (basicDeduction.incomeTax - basicDeduction.residentTax) +
          (spouseDeduction.incomeTax - spouseDeduction.residentTax) +
          (familyDeduction.incomeTax - familyDeduction.residentTax),
        0,
      ),
    };
  }

  const salaryDeduction = getSalaryIncomeDeduction(annualIncome);
  const salaryIncome = Math.max(annualIncome - salaryDeduction, 0);
  const socialInsuranceDeduction = getSocialInsuranceDeduction(annualIncome, age);

  return {
    incomeTax: Math.max(
      salaryIncome -
        basicDeduction.incomeTax -
        socialInsuranceDeduction -
        spouseDeduction.incomeTax -
        familyDeduction.incomeTax,
      0,
    ),
    residentTax: Math.max(
      salaryIncome -
        basicDeduction.residentTax -
        socialInsuranceDeduction -
        spouseDeduction.residentTax -
        familyDeduction.residentTax,
      0,
    ),
  };
}

function getBasicDeduction(annualIncome: number) {
  const deductions = [
    { threshold: -1, incomeTax: 950_000, residentTax: 430_000 },
    { threshold: 2_003_999, incomeTax: 880_000, residentTax: 430_000 },
    { threshold: 4_751_999, incomeTax: 680_000, residentTax: 430_000 },
    { threshold: 6_655_556, incomeTax: 630_000, residentTax: 430_000 },
    { threshold: 8_500_000, incomeTax: 580_000, residentTax: 430_000 },
    { threshold: 25_450_000, incomeTax: 0, residentTax: 430_000 },
  ];
  return findIncomeThreshold(deductions, annualIncome);
}

function getSpouseDeduction(annualIncome: number) {
  const deductions = [
    { threshold: -1, incomeTax: 380_000, residentTax: 330_000 },
    { threshold: 10_950_000, incomeTax: 260_000, residentTax: 220_000 },
    { threshold: 11_450_000, incomeTax: 130_000, residentTax: 110_000 },
    { threshold: 11_950_000, incomeTax: 0, residentTax: 0 },
  ];
  return findIncomeThreshold(deductions, annualIncome);
}

function getFamilyDeduction(familyAges: number[], yearOffset: number) {
  return familyAges.reduce(
    (total, inputAge) => {
      const age = inputAge + yearOffset;
      const deduction =
        inputAge < 23
          ? findAgeThreshold(
              [
                { threshold: 0, incomeTax: 0, residentTax: 0 },
                { threshold: 16, incomeTax: 380_000, residentTax: 330_000 },
                { threshold: 19, incomeTax: 630_000, residentTax: 450_000 },
                { threshold: 23, incomeTax: 0, residentTax: 0 },
              ],
              age,
            )
          : findAgeThreshold(
              [
                { threshold: 23, incomeTax: 380_000, residentTax: 330_000 },
                { threshold: 70, incomeTax: 480_000, residentTax: 380_000 },
              ],
              age,
            );
      return {
        incomeTax: total.incomeTax + deduction.incomeTax,
        residentTax: total.residentTax + deduction.residentTax,
      };
    },
    { incomeTax: 0, residentTax: 0 },
  );
}

function getSalaryIncomeDeduction(annualIncome: number) {
  const deductions = [
    { threshold: 0, rate: 0, fixed: 650_000 },
    { threshold: 1_900_000, rate: 0.3, fixed: 80_000 },
    { threshold: 3_600_000, rate: 0.2, fixed: 440_000 },
    { threshold: 6_600_000, rate: 0.1, fixed: 1_100_000 },
    { threshold: 8_500_000, rate: 0, fixed: 1_950_000 },
  ];
  const deduction = findIncomeThreshold(deductions, annualIncome);
  return annualIncome * deduction.rate + deduction.fixed;
}

function getSocialInsuranceDeduction(annualIncome: number, age: number) {
  const pension = Math.min(annualIncome * 0.0915, 1_125_450);
  const health = Math.min(annualIncome * 0.05065, 1_120_500);
  const employment = annualIncome * 0.005;
  const care = age >= 40 ? Math.min(annualIncome * 0.0081, 181_521) : 0;
  return Math.floor(pension + health + employment + care);
}

function calculateIncomeTax(taxableIncome: number, yearOffset: number) {
  const brackets = [
    { threshold: 999, rate: 0.05, deduction: 0 },
    { threshold: 1_949_000, rate: 0.1, deduction: 97_500 },
    { threshold: 3_300_000, rate: 0.2, deduction: 427_500 },
    { threshold: 6_950_000, rate: 0.23, deduction: 636_000 },
    { threshold: 9_000_000, rate: 0.33, deduction: 1_536_000 },
    { threshold: 18_000_000, rate: 0.4, deduction: 2_796_000 },
    { threshold: 40_000_000, rate: 0.45, deduction: 4_796_000 },
  ];
  const bracket = findIncomeThreshold(brackets, Math.max(taxableIncome, 0));
  const tax = Math.max(taxableIncome, 0) * bracket.rate - bracket.deduction;
  const currentYear = new Date().getFullYear() + yearOffset;
  return (
    tax *
    (currentYear <= IDECO_RULES.reconstructionIncomeTaxEndYear
      ? 1 + IDECO_RULES.reconstructionIncomeTaxRate
      : 1)
  );
}

function findIncomeThreshold<T extends { threshold: number }>(
  values: T[],
  income: number,
): T {
  let selected = values[0];
  for (const value of values) {
    if (income <= value.threshold) {
      break;
    }
    selected = value;
  }
  return selected;
}

function findAgeThreshold<T extends { threshold: number }>(values: T[], age: number): T {
  let selected = values[0];
  for (const value of values) {
    if (age < value.threshold) {
      break;
    }
    selected = value;
  }
  return selected;
}

function isFirstCategory(category: IdecoCategory) {
  return category === "self-employed" || category === "voluntary-insured";
}

function roundDownHundred(value: number) {
  return Math.floor(Math.max(value, 0) / 100) * 100;
}

function createPoint(
  year: number,
  age: number,
  value: number,
  principal: number,
  annualContribution: number,
  annualTaxSaving: number,
  cumulativeTaxSaving: number,
  feePaid: number,
): IdecoSimulationPoint {
  return {
    year,
    age,
    value,
    principal,
    contributed: principal,
    gain: value - principal,
    annualContribution,
    annualTaxSaving,
    cumulativeTaxSaving,
    feePaid,
  };
}

function validateInteger(value: number, label: string, minimum: number, maximum: number) {
  if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
    throw new Error(`${label}は${minimum}〜${maximum}歳の整数で入力してください。`);
  }
}

function validateAmount(value: number, label: string, maximum: number) {
  if (!Number.isSafeInteger(value) || value < 0 || value > maximum) {
    throw new Error(
      `${label}は0円〜${maximum.toLocaleString("ja-JP")}円の整数で入力してください。`,
    );
  }
}

function validateFamilyAges(familyAges: number[]) {
  if (familyAges.length > IDECO_INPUT_LIMITS.maxFamilyMembers) {
    throw new Error(
      `扶養親族は${IDECO_INPUT_LIMITS.maxFamilyMembers}人まで入力してください。`,
    );
  }
  if (
    familyAges.some(
      (age) =>
        !Number.isSafeInteger(age) || age < 0 || age > IDECO_INPUT_LIMITS.maxFamilyAge,
    )
  ) {
    throw new Error(
      `扶養親族の年齢は0〜${IDECO_INPUT_LIMITS.maxFamilyAge}歳の整数で入力してください。`,
    );
  }
}

function validateContribution(value: number, maximum: number) {
  if (!Number.isSafeInteger(value) || value < 0 || value > maximum) {
    throw new Error(
      `毎月の掛金は0円〜${maximum.toLocaleString("ja-JP")}円の範囲で入力してください。`,
    );
  }
  if (value > 0 && value < IDECO_RULES.minContribution) {
    throw new Error(
      `毎月の掛金は、拠出する場合は${IDECO_RULES.minContribution.toLocaleString("ja-JP")}円以上で入力してください。`,
    );
  }
  if (value % IDECO_RULES.contributionUnit !== 0) {
    throw new Error(
      `毎月の掛金は${IDECO_RULES.contributionUnit.toLocaleString("ja-JP")}円単位で入力してください。`,
    );
  }
}
