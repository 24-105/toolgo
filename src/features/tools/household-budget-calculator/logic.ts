export type HouseholdBudgetInput = {
  month: string;
  monthlyIncome: number;
  fixedExpenses: number;
  variableExpenses: number;
  monthlySavings: number;
};

export type HouseholdBudgetResult = {
  daysInMonth: number;
  remainingBudget: number;
  dailyBudget: number;
  savingsRate: number;
};

export function calculateHouseholdBudget(
  input: HouseholdBudgetInput,
): HouseholdBudgetResult {
  const daysInMonth = parseMonth(input.month);
  if (!daysInMonth) throw new Error("対象月を正しく入力してください。");
  validateYen(input.monthlyIncome, "月の手取り", 1);
  validateYen(input.fixedExpenses, "固定費", 0);
  validateYen(input.variableExpenses, "変動費", 0);
  validateYen(input.monthlySavings, "貯金額", 0);

  const remainingBudget =
    input.monthlyIncome -
    input.fixedExpenses -
    input.variableExpenses -
    input.monthlySavings;

  return {
    daysInMonth,
    remainingBudget,
    dailyBudget: remainingBudget / daysInMonth,
    savingsRate: (input.monthlySavings / input.monthlyIncome) * 100,
  };
}

function validateYen(value: number, label: string, minimum: number) {
  if (!Number.isSafeInteger(value) || value < minimum || value > 1_000_000_000) {
    throw new Error(
      `${label}は${minimum.toLocaleString("ja-JP")}円〜10億円の整数で入力してください。`,
    );
  }
}

function parseMonth(value: string) {
  if (!/^\d{4}-\d{2}$/u.test(value)) return undefined;
  const [year, month] = value.split("-").map(Number);
  if (year < 2000 || year > 2099 || month < 1 || month > 12) return undefined;
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}
