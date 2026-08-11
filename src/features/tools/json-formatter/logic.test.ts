import { describe, expect, it } from "vitest";

import { formatJson, minifyJson } from "./logic";

describe("formatJson", () => {
  it("JSONを指定したインデントで整形する", () => {
    expect(formatJson('{"name":"ToolGo"}', 2)).toEqual({
      ok: true,
      value: '{\n  "name": "ToolGo"\n}',
    });
  });

  it("空入力と不正なJSONをエラーにする", () => {
    expect(formatJson("", 2)).toEqual({ ok: false, message: "JSONを入力してください。" });
    expect(formatJson("{", 2)).toMatchObject({ ok: false });
  });
});

describe("minifyJson", () => {
  it("JSONを1行に圧縮する", () => {
    expect(minifyJson('{\n  "name": "ToolGo"\n}')).toEqual({
      ok: true,
      value: '{"name":"ToolGo"}',
    });
  });
});
