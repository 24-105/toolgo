import { describe, expect, it } from "vitest";

import { renderMarkdown } from "./logic";

describe("renderMarkdown", () => {
  it("MarkdownとGFMをHTMLへ変換する", () => {
    const html = renderMarkdown(
      "# 見出し\n\n**太字**\n\n| A | B |\n| - | - |\n| 1 | 2 |",
    );

    expect(html).toContain("<h1>見出し</h1>");
    expect(html).toContain("<strong>太字</strong>");
    expect(html).toContain("<table>");
  });

  it("危険なHTMLをサニタイズする", () => {
    expect(renderMarkdown('<script>alert("x")</script>')).not.toContain("<script>");
  });
});
