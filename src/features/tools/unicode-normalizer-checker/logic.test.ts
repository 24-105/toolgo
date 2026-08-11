import { describe, expect, it } from "vitest";

import { analyzeUnicode } from "./logic";

describe("analyzeUnicode", () => {
  it("正規化形式とコードポイントを返す", () => {
    const result = analyzeUnicode("か\u3099");

    expect(result.forms).toHaveLength(4);
    expect(result.forms.find((form) => form.form === "NFC")?.changed).toBe(true);
    expect(result.originalCodePoints).toEqual(["U+304B", "U+3099"]);
  });

  it("ラテン文字と似た別スクリプトの文字を検出する", () => {
    expect(analyzeUnicode("aа").suspiciousCharacters).toMatchObject([
      { character: "а", looksLike: "a", codePoint: "U+0430" },
    ]);
  });
});
