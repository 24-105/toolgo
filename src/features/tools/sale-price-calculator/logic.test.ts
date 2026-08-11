import { describe, expect, it } from "vitest";

import { calculateSalePrice } from "./logic";

describe("calculateSalePrice", () => {
  it("割引と消費税を計算する", () => {
    expect(
      calculateSalePrice({ price: 1_000, quantity: 2, discountRate: 10, taxRate: 0.1 }),
    ).toEqual({
      originalTotal: 2_000,
      discountAmount: 200,
      discountedTotal: 1_800,
      taxAmount: 180,
      total: 1_980,
    });
  });

  it("税率の選択値を検証する", () => {
    expect(() =>
      calculateSalePrice({ price: 1_000, quantity: 1, discountRate: 0, taxRate: 0.05 }),
    ).toThrow();
  });
});
