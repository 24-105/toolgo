import { describe, expect, it } from "vitest";

import { testRegex } from "./logic";

describe("testRegex", () => {
  it("一致した文字列と位置を返す", () => {
    expect(testRegex("go", "", "ToolGo go")).toEqual([{ value: "go", index: 7 }]);
  });

  it("空の正規表現を拒否する", () => {
    expect(() => testRegex("", "", "text")).toThrow();
  });
});
