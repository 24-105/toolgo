import { describe, expect, it } from "vitest";

import { getRecentlyAddedTools } from "./registry-utils";

describe("getRecentlyAddedTools", () => {
  it("returns available tools from the end of the registry in newest-first order", () => {
    const tools = [
      { slug: "planned-tool", status: "planned" as const },
      { slug: "older-tool", status: "available" as const },
      { slug: "newest-tool", status: "available" as const },
    ];
    const recentTools = getRecentlyAddedTools(tools, 2);

    expect(recentTools.map((tool) => tool.slug)).toEqual(["newest-tool", "older-tool"]);
    expect(recentTools.every((tool) => tool.status === "available")).toBe(true);
  });

  it("returns no tools when the requested limit is zero or negative", () => {
    const tools = [{ slug: "tool", status: "available" as const }];

    expect(getRecentlyAddedTools(tools, 0)).toEqual([]);
    expect(getRecentlyAddedTools(tools, -1)).toEqual([]);
  });
});
