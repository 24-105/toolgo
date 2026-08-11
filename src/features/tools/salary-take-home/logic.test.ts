import { describe, expect, it } from "vitest";

import { calculateTakeHome } from "./logic";

describe("calculateTakeHome", () => {
  it("明細の実額を使って手取りを計算する", () => {
    expect(
      calculateTakeHome({
        monthlyGross: 300_000,
        prefecture: "東京都",
        age40Plus: false,
        dependents: 0,
        residentTax: 10_000,
        actualSocialInsurance: 30_000,
        actualIncomeTax: 5_000,
        otherDeductions: 1_000,
      }),
    ).toEqual({
      socialInsurance: 30_000,
      incomeTax: 5_000,
      residentTax: 10_000,
      otherDeductions: 1_000,
      takeHome: 254_000,
    });
  });

  it("存在しない都道府県を拒否する", () => {
    expect(() =>
      calculateTakeHome({
        monthlyGross: 300_000,
        prefecture: "海外",
        age40Plus: false,
        dependents: 0,
        residentTax: 0,
      }),
    ).toThrow();
  });
});
