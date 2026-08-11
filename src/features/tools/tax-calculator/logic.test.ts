import { describe, expect, it } from "vitest";

import { calculateTax } from "./logic";

describe("calculateTax", () => {
  it("税抜価格から税込価格を計算する", () => {
    expect(calculateTax(1_000, 0.1, "beforeTax")).toEqual({
      beforeTax: 1_000,
      tax: 100,
      afterTax: 1_100,
    });
  });

  it("税込価格から税額を逆算する", () => {
    expect(calculateTax(1_100, 0.1, "afterTax")).toEqual({
      beforeTax: 1_000,
      tax: 100,
      afterTax: 1_100,
    });
  });
});
