import { describe, expect, it } from "vitest";

import { createClamp } from "./logic";

describe("createClamp", () => {
  it("clamp()式を生成する", () => {
    expect(
      createClamp({
        minViewport: 320,
        maxViewport: 1_280,
        minValue: 16,
        maxValue: 32,
        unit: "px",
      }).value,
    ).toBe("clamp(16px, 10.6667px + 1.6667vw, 32px)");
  });

  it("最大画面幅が小さい場合を拒否する", () => {
    expect(() =>
      createClamp({
        minViewport: 1_000,
        maxViewport: 500,
        minValue: 1,
        maxValue: 2,
        unit: "px",
      }),
    ).toThrow();
  });
});
