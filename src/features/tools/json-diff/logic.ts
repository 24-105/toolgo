export type JsonDiffLine = {
  type: "same" | "added" | "removed";
  text: string;
};

const MAX_LINES = 1_000;

export function compareJson(leftInput: string, rightInput: string): JsonDiffLine[] {
  const left = formatJson(leftInput, "左側のJSON");
  const right = formatJson(rightInput, "右側のJSON");

  if (left.length > MAX_LINES || right.length > MAX_LINES) {
    throw new Error("比較できるJSONは、それぞれ1,000行以内にしてください。");
  }

  const table = Array.from({ length: left.length + 1 }, () =>
    Array<number>(right.length + 1).fill(0),
  );
  for (let row = left.length - 1; row >= 0; row -= 1) {
    for (let column = right.length - 1; column >= 0; column -= 1) {
      table[row][column] =
        left[row] === right[column]
          ? table[row + 1][column + 1] + 1
          : Math.max(table[row + 1][column], table[row][column + 1]);
    }
  }

  const result: JsonDiffLine[] = [];
  let row = 0;
  let column = 0;
  while (row < left.length && column < right.length) {
    if (left[row] === right[column]) {
      result.push({ type: "same", text: left[row] });
      row += 1;
      column += 1;
    } else if (table[row + 1][column] >= table[row][column + 1]) {
      result.push({ type: "removed", text: left[row] });
      row += 1;
    } else {
      result.push({ type: "added", text: right[column] });
      column += 1;
    }
  }
  while (row < left.length) {
    result.push({ type: "removed", text: left[row] });
    row += 1;
  }
  while (column < right.length) {
    result.push({ type: "added", text: right[column] });
    column += 1;
  }
  return result;
}

export function diffLinesToText(lines: JsonDiffLine[]) {
  return lines
    .map(
      (line) =>
        `${line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}${line.text}`,
    )
    .join("\n");
}

function formatJson(input: string, label: string) {
  if (!input.trim()) throw new Error(`${label}を入力してください。`);
  try {
    return JSON.stringify(JSON.parse(input), null, 2).split("\n");
  } catch {
    throw new Error(`${label}の構文を確認してください。`);
  }
}
