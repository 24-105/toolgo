import { describe, expect, it } from "vitest";

import { compareUnitPrices } from "./logic";

describe("compareUnitPrices", () => {
  it("単価を同じ基準単位で比較する", () => {
    expect(
      compareUnitPrices(
        { price: 200, quantity: 1, unit: "kg" },
        { price: 150, quantity: 500, unit: "g" },
      ),
    ).toMatchObject({
      baseUnit: "g",
      productAUnitPrice: 0.2,
      productBUnitPrice: 0.3,
      better: "a",
    });
  });

  it("異なる種類の単位を拒否する", () => {
    expect(() =>
      compareUnitPrices(
        { price: 100, quantity: 1, unit: "kg" },
        { price: 100, quantity: 1, unit: "l" },
      ),
    ).toThrow();
  });
});
