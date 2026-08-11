import { describe, expect, it } from "vitest";

import { transformText } from "./logic";

describe("transformText", () => {
  it("全角・半角と大文字小文字を変換する", () => {
    expect(transformText("ＡＢＣ １２３", "full-to-half")).toBe("ABC 123");
    expect(transformText("abc", "upper")).toBe("ABC");
    expect(transformText("ABC", "lower")).toBe("abc");
  });

  it("行の空白と改行を整理する", () => {
    expect(transformText(" a \n b ", "trim-lines")).toBe("a\nb");
    expect(transformText("a\n b", "remove-line-breaks")).toBe("a b");
  });
});
