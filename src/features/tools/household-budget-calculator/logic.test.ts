import { describe, expect, it } from "vitest";

import { calculateHouseholdBudget } from "./logic";

describe("calculateHouseholdBudget", () => {
  it("月の残り予算と貯金率を計算する", () => {
    const result = calculateHouseholdBudget({
      month: "2024-02",
      monthlyIncome: 300_000,
      fixedExpenses: 100_000,
      variableExpenses: 50_000,
      monthlySavings: 50_000,
    });

    expect(result).toMatchObject({
      daysInMonth: 29,
      remainingBudget: 100_000,
    });
    expect(result.savingsRate).toBeCloseTo(16.666666666666668);
  });

  it("対象月の形式を検証する", () => {
    expect(() =>
      calculateHouseholdBudget({
        month: "2024-13",
        monthlyIncome: 1,
        fixedExpenses: 0,
        variableExpenses: 0,
        monthlySavings: 0,
      }),
    ).toThrow();
  });
});
