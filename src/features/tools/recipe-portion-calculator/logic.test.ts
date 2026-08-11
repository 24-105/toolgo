import { describe, expect, it } from "vitest";

import { scaleRecipe } from "./logic";

describe("scaleRecipe", () => {
  it("人数に合わせて分量を拡大する", () => {
    const result = scaleRecipe(
      [
        { name: "小麦粉", amount: "100", unit: "g" },
        { name: "塩", amount: "1/2", unit: "小さじ" },
      ],
      2,
      4,
    );

    expect(result.ratio).toBe(2);
    expect(result.ingredients).toEqual([
      { name: "小麦粉", amount: "200", unit: "g" },
      { name: "塩", amount: "1", unit: "小さじ" },
    ]);
  });

  it("材料が空の場合を拒否する", () => {
    expect(() => scaleRecipe([], 2, 4)).toThrow();
  });
});
