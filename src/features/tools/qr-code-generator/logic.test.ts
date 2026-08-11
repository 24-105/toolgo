import { describe, expect, it } from "vitest";

import { getQrCodeInputError, MAX_INPUT_LENGTH } from "./logic";

describe("QRコード入力の検証", () => {
  it("上限以内の入力を受け付ける", () => {
    expect(getQrCodeInputError("文字列")).toBe("");
  });

  it("上限を超えた入力にエラーを返す", () => {
    expect(getQrCodeInputError("a".repeat(MAX_INPUT_LENGTH + 1))).toContain("文字以内");
  });
});
