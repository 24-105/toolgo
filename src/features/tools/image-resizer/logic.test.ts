import { describe, expect, it } from "vitest";

import { outputExtension, validateResizeInput } from "./logic";

describe("画像リサイズの入力ロジック", () => {
  it("画像サイズと出力形式を検証する", () => {
    expect(() => validateResizeInput(800, 600)).not.toThrow();
    expect(outputExtension("image/jpeg")).toBe("jpg");
    expect(outputExtension("image/webp")).toBe("webp");
  });

  it("0以下の画像サイズを拒否する", () => {
    expect(() => validateResizeInput(0, 600)).toThrow();
  });
});
