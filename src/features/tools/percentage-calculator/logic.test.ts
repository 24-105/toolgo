import { describe, expect, it } from "vitest";

import { calculatePercentage } from "./logic";

describe("calculatePercentage", () => {
  it("割合、割合からの値、増減率、割引後価格を計算する", () => {
    expect(calculatePercentage("ratio", 25, 100).value).toBe(25);
    expect(calculatePercentage("of", 200, 25).value).toBe(50);
    expect(calculatePercentage("change", 100, 120).value).toBe(20);
    expect(calculatePercentage("discount", 1_000, 20).value).toBe(800);
  });

  it("0で割る割合計算を拒否する", () => {
    expect(() => calculatePercentage("ratio", 1, 0)).toThrow();
  });
});
