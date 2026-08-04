export type DiffLine = { type: "same" | "added" | "removed"; value: string };

const MAX_LINES = 1_000;

export function compareLines(left: string, right: string): DiffLine[] {
  const a = splitLines(left);
  const b = splitLines(right);

  if (a.length + b.length > MAX_LINES) {
    throw new Error(
      `比較できる行数は合計${MAX_LINES.toLocaleString("ja-JP")}行までです。`,
    );
  }

  const table = Array.from({ length: a.length + 1 }, () =>
    new Array<number>(b.length + 1).fill(0),
  );

  for (let leftIndex = a.length - 1; leftIndex >= 0; leftIndex -= 1) {
    for (let rightIndex = b.length - 1; rightIndex >= 0; rightIndex -= 1) {
      table[leftIndex][rightIndex] =
        a[leftIndex] === b[rightIndex]
          ? table[leftIndex + 1][rightIndex + 1] + 1
          : Math.max(table[leftIndex + 1][rightIndex], table[leftIndex][rightIndex + 1]);
    }
  }

  const rows: DiffLine[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < a.length && rightIndex < b.length) {
    if (a[leftIndex] === b[rightIndex]) {
      rows.push({ type: "same", value: a[leftIndex] });
      leftIndex += 1;
      rightIndex += 1;
    } else if (table[leftIndex + 1][rightIndex] >= table[leftIndex][rightIndex + 1]) {
      rows.push({ type: "removed", value: a[leftIndex] });
      leftIndex += 1;
    } else {
      rows.push({ type: "added", value: b[rightIndex] });
      rightIndex += 1;
    }
  }

  while (leftIndex < a.length) {
    rows.push({ type: "removed", value: a[leftIndex] });
    leftIndex += 1;
  }
  while (rightIndex < b.length) {
    rows.push({ type: "added", value: b[rightIndex] });
    rightIndex += 1;
  }

  return rows;
}

function splitLines(value: string) {
  return value.replace(/\r\n?/gu, "\n").split("\n");
}
