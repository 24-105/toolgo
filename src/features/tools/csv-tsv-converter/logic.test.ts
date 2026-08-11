import { describe, expect, it } from "vitest";

import { parseDelimited, stringifyDelimited } from "./logic";

describe("区切り文字変換", () => {
  it("引用符と改行を含むCSVを解析して文字列化する", () => {
    const rows = parseDelimited('name,note\n"ToolGo","便利,無料"', ",");
    expect(rows).toEqual([
      ["name", "note"],
      ["ToolGo", "便利,無料"],
    ]);
    expect(stringifyDelimited(rows, ",")).toBe('name,note\nToolGo,"便利,無料"');
  });

  it("閉じていない引用符を拒否する", () => {
    expect(() => parseDelimited('"未完了', ",")).toThrow();
  });
});
