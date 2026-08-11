import { describe, expect, it } from "vitest";

import { buildPrintSvg, getGrid } from "./logic";

describe("写真印刷レイアウト", () => {
  it("写真枚数に応じたグリッドを返す", () => {
    expect(getGrid(6)).toEqual({ columns: 2, rows: 3 });
  });

  it("写真を配置したSVGを生成する", () => {
    const svg = buildPrintSvg(
      [
        {
          name: "sample.png",
          dataUrl: "data:image/png;base64,abc",
          width: 100,
          height: 100,
        },
      ],
      "a4-portrait",
      1,
    );

    expect(svg).toContain("<svg");
    expect(svg).not.toContain("sample.png");
    expect(svg).toContain("data:image/png;base64,abc");
  });
});
