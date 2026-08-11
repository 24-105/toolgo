import { describe, expect, it } from "vitest";

import { colorFromHsl, colorFromRgb, convertColor } from "./logic";

describe("色変換", () => {
  it("3桁HEXをRGBとHSLへ変換する", () => {
    expect(convertColor("#0f0")).toEqual({
      hex: "#00FF00",
      rgb: "rgb(0, 255, 0)",
      hsl: "hsl(120, 100%, 50%)",
    });
  });

  it("RGBとHSLの入力を受け付ける", () => {
    expect(colorFromRgb("rgb(255, 0, 0)").hex).toBe("#FF0000");
    expect(colorFromHsl("hsl(240, 100%, 50%)").rgb).toBe("rgb(0, 0, 255)");
  });

  it("不正な色を拒否する", () => {
    expect(() => convertColor("#xyz")).toThrow();
  });
});
