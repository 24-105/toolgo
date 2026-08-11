import { describe, expect, it } from "vitest";

import { MAX_FILE_SIZE, validateCompressionInput } from "./logic";

describe("validateCompressionInput", () => {
  it("画像・画質・サイズの正常値を受け付ける", () => {
    expect(() =>
      validateCompressionInput({ type: "image/png", size: 1_000 }, 0.8, 800, 600),
    ).not.toThrow();
  });

  it("画像以外、大きすぎるファイル、範囲外の画質を拒否する", () => {
    expect(() =>
      validateCompressionInput({ type: "text/plain", size: 1 }, 0.8),
    ).toThrow();
    expect(() =>
      validateCompressionInput({ type: "image/png", size: MAX_FILE_SIZE + 1 }, 0.8),
    ).toThrow();
    expect(() =>
      validateCompressionInput({ type: "image/png", size: 1 }, 0.05),
    ).toThrow();
  });
});
