import { describe, expect, it } from "vitest";

import { countCharacters } from "./logic";

describe("countCharacters", () => {
  it("文字数、空白を除く文字数、単語数、行数を数える", () => {
    expect(countCharacters("A あ\nB")).toEqual({
      withSpaces: 5,
      withoutSpaces: 3,
      words: 3,
      lines: 2,
    });
  });

  it("空文字列では0を返す", () => {
    expect(countCharacters("")).toEqual({
      withSpaces: 0,
      withoutSpaces: 0,
      words: 0,
      lines: 0,
    });
  });
});
