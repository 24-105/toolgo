import { describe, expect, it } from "vitest";

import {
  calculateIncomeBasedTaxSaving,
  getIdecoContributionLimit,
  simulateIdeco,
} from "./logic";

describe("iDeCoシミュレーター", () => {
  it("加入区分ごとの掛金上限を返す", () => {
    expect(getIdecoContributionLimit("self-employed")).toBe(68_000);
    expect(getIdecoContributionLimit("employee-with-pension", 50_000)).toBe(5_000);
  });

  it("所得控除による税軽減額を計算する", () => {
    const result = calculateIncomeBasedTaxSaving({
      category: "employee-no-pension",
      annualContribution: 120_000,
      annualIncome: 5_000_000,
      hasDependentSpouse: false,
      dependentFamilyAges: [],
      age: 30,
      yearOffset: 0,
    });

    expect(result.total).toBeGreaterThan(0);
  });

  it("1年分の運用結果を作成する", () => {
    const result = simulateIdeco({
      currentAge: 59,
      receivingAge: 60,
      category: "employee-no-pension",
      monthlyContribution: 10_000,
      annualRate: 0,
      taxCalculationMode: "rate",
      incomeTaxRate: 10,
    });

    expect(result.totalContribution).toBe(120_000);
    expect(result.points).toHaveLength(2);
  });
});
