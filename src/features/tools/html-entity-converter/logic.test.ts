import { describe, expect, it } from "vitest";

import { convertHtmlEntities, decodeHtmlEntities, encodeHtmlEntities } from "./logic";

describe("HTMLエンティティ変換", () => {
  it("HTMLの特殊文字をエンコードする", () => {
    expect(encodeHtmlEntities('<p class="title">Tom & Jerry</p>')).toBe(
      "&lt;p class=&quot;title&quot;&gt;Tom &amp; Jerry&lt;/p&gt;",
    );
  });

  it("名前付き・10進数・16進数のエンティティをデコードする", () => {
    expect(decodeHtmlEntities("&lt;div&gt;A&nbsp;&#66;&#x43;&lt;/div&gt;")).toBe(
      "<div>A\u00a0BC</div>",
    );
  });

  it("変換モードを切り替えられる", () => {
    expect(convertHtmlEntities("&lt;", "decode")).toBe("<");
    expect(convertHtmlEntities("<", "encode")).toBe("&lt;");
  });

  it("対応していないエンティティはそのまま残す", () => {
    expect(decodeHtmlEntities("&unknown;")).toBe("&unknown;");
  });
});
