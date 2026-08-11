import { describe, expect, it } from "vitest";

import { splitBill } from "./logic";

describe("splitBill", () => {
  it("余りを先頭の人に配分する", () => {
    expect(splitBill(1_000, 3)).toEqual({
      baseAmount: 333,
      remainder: 1,
      amounts: [334, 333, 333],
    });
  });

  it("人数の範囲外を拒否する", () => {
    expect(() => splitBill(1_000, 0)).toThrow();
  });
});
