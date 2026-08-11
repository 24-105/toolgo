import { describe, expect, it } from "vitest";

import { convertUnit } from "./logic";

describe("convertUnit", () => {
  it("長さ・重量・温度を変換する", () => {
    expect(convertUnit(1, "length", "m", "cm")).toBe(100);
    expect(convertUnit(1, "weight", "kg", "g")).toBe(1_000);
    expect(convertUnit(32, "temperature", "f", "c")).toBe(0);
  });

  it("存在しない単位を拒否する", () => {
    expect(() => convertUnit(1, "length", "kg", "m")).toThrow();
  });
});
