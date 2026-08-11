import { describe, expect, it } from "vitest";

import { NISA_RULES, simulateNisa } from "./logic";

describe("simulateNisa", () => {
  it("年率0%の積立を計算する", () => {
    const result = simulateNisa({ years: 1, monthlyAmount: 10_000, annualRate: 0 });

    expect(result.totalInvested).toBe(120_000);
    expect(result.finalValue).toBe(120_000);
    expect(result.points).toHaveLength(2);
    expect(result.lifetimeLimitReached).toBe(false);
  });

  it("ボーナス額に対する月指定を必須にする", () => {
    expect(() =>
      simulateNisa({
        years: 1,
        monthlyAmount: 10_000,
        annualRate: 0,
        bonusAmount: 10_000,
      }),
    ).toThrow();
    expect(NISA_RULES.lifetimeLimit).toBe(18_000_000);
  });
});
