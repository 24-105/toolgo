import { describe, expect, it } from "vitest";

import { decodeBase64, encodeBase64 } from "./logic";

describe("Base64変換", () => {
  it("日本語を含む文字列を往復変換する", () => {
    const encoded = encodeBase64("ToolGo 便利ツール");
    expect(decodeBase64(encoded)).toBe("ToolGo 便利ツール");
  });

  it("不正なBase64を拒否する", () => {
    expect(() => decodeBase64("not base64!")).toThrow();
  });
});
