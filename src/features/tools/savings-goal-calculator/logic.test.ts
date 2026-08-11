import { describe, expect, it } from "vitest";

import { calculateSavings } from "./logic";

describe("calculateSavings", () => {
  it("毎月の積立から目標日と月数を計算する", () => {
    expect(
      calculateSavings({
        mode: "monthly",
        targetAmount: 100_000,
        currentAmount: 20_000,
        monthlyAmount: 20_000,
        today: "2024-01-15",
      }),
    ).toMatchObject({
      remainingAmount: 80_000,
      monthlyAmount: 20_000,
      months: 4,
      targetDate: "2024年5月15日",
    });
  });

  it("目標達成済みの場合を返す", () => {
    expect(
      calculateSavings({
        mode: "monthly",
        targetAmount: 100,
        currentAmount: 100,
        monthlyAmount: 1,
        today: "2024-01-01",
      }),
    ).toMatchObject({ achieved: true, remainingAmount: 0, months: 0 });
  });
});
