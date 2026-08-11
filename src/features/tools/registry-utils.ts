type AvailableTool = {
  status: "available" | "planned";
};

export function getRecentlyAddedTools<T extends AvailableTool>(tools: T[], limit = 3) {
  if (limit <= 0) {
    return [];
  }

  return tools
    .filter((tool) => tool.status === "available")
    .slice(-limit)
    .reverse();
}
