export function parseDelimited(value: string, delimiter: "," | "\t") {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  let fieldStart = true;
  let justClosedQuote = false;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];

    if (quoted) {
      if (character === '"' && value[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
        justClosedQuote = true;
      } else {
        cell += character;
      }
      continue;
    }

    if (justClosedQuote) {
      if (character === delimiter) {
        row.push(cell);
        cell = "";
        fieldStart = true;
        justClosedQuote = false;
      } else if (character === "\n" || character === "\r") {
        if (character === "\r" && value[index + 1] === "\n") index += 1;
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
        fieldStart = true;
        justClosedQuote = false;
      } else {
        throw new Error("引用符の後に区切り文字がありません。");
      }
      continue;
    }

    if (fieldStart && character === '"') {
      quoted = true;
      fieldStart = false;
    } else if (character === delimiter) {
      row.push(cell);
      cell = "";
      fieldStart = true;
    } else if (character === "\n" || character === "\r") {
      if (character === "\r" && value[index + 1] === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      fieldStart = true;
    } else {
      cell += character;
      fieldStart = false;
    }
  }

  if (quoted) throw new Error("引用符が閉じられていません。");
  if (justClosedQuote || cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

export function stringifyDelimited(rows: string[][], delimiter: "," | "\t") {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const needsQuotes =
            cell.includes(delimiter) || cell.includes("\n") || cell.includes('"');
          return needsQuotes ? `"${cell.replaceAll('"', '""')}"` : cell;
        })
        .join(delimiter),
    )
    .join("\n");
}
