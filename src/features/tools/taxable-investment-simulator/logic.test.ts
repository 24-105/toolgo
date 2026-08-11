import { describe, expect, it } from "vitest";

import { simulateTaxableInvestment } from "./logic";

describe("simulateTaxableInvestment", () => {
  it("年率0%の課税口座積立を計算する", () => {
    const result = simulateTaxableInvestment({
      years: 1,
      monthlyAmount: 10_000,
      annualRate: 0,
    });

    expect(result.totalFutureContribution).toBe(120_000);
    expect(result.totalPrincipal).toBe(120_000);
    expect(result.finalValue).toBe(120_000);
    expect(result.tax).toBe(0);
  });

  it("評価額だけを指定した入力を拒否する", () => {
    expect(() =>
      simulateTaxableInvestment({
        years: 1,
        monthlyAmount: 0,
        annualRate: 0,
        initialValue: 1,
      }),
    ).toThrow();
  });
});
