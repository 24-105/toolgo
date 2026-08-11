import { describe, expect, it } from "vitest";

import { decodeUrl, encodeUrl } from "./logic";

describe("URL変換", () => {
  it("URL全体と構成要素をエンコード・デコードする", () => {
    const url = "https://example.com/検索語?q=hello world";
    expect(decodeUrl(encodeUrl(url, "url"), "url")).toBe(url);
    expect(decodeUrl(encodeUrl("hello world", "component"), "component")).toBe(
      "hello world",
    );
  });

  it("不正なパーセントエンコードを拒否する", () => {
    expect(() => decodeUrl("%", "component")).toThrow();
  });
});
