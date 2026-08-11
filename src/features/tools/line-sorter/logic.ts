export type LineSortOrder = "ascending" | "descending";

export type LineSortOptions = {
  order: LineSortOrder;
  removeEmptyLines: boolean;
  removeDuplicates: boolean;
};

export function sortAndDeduplicateLines(input: string, options: LineSortOptions) {
  let lines = input.replace(/\r\n?/gu, "\n").split("\n");

  if (options.removeEmptyLines) {
    lines = lines.filter((line) => line.trim().length > 0);
  }

  if (options.removeDuplicates) {
    const seen = new Set<string>();
    lines = lines.filter((line) => {
      if (seen.has(line)) {
        return false;
      }

      seen.add(line);
      return true;
    });
  }

  lines.sort((left, right) =>
    left.localeCompare(right, "ja", { numeric: true, sensitivity: "base" }),
  );

  if (options.order === "descending") {
    lines.reverse();
  }

  return lines.join("\n");
}
