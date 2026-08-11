const encodedEntities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const decodedEntities: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: "\u00a0",
  quot: '"',
};

export type HtmlEntityMode = "encode" | "decode";

export function encodeHtmlEntities(input: string) {
  return input.replace(/[&<>"']/gu, (character) => encodedEntities[character]);
}

export function decodeHtmlEntities(input: string) {
  return input.replace(
    /&(?:#(\d+)|#x([\da-f]+)|([a-z]+));/giu,
    (entity, decimal, hexadecimal, named) => {
      if (decimal) {
        return decodeCodePoint(Number(decimal), entity);
      }

      if (hexadecimal) {
        return decodeCodePoint(Number.parseInt(hexadecimal, 16), entity);
      }

      return decodedEntities[named.toLowerCase()] ?? entity;
    },
  );
}

function decodeCodePoint(codePoint: number, fallback: string) {
  try {
    return codePoint > 0 && codePoint <= 0x10ffff
      ? String.fromCodePoint(codePoint)
      : fallback;
  } catch {
    return fallback;
  }
}

export function convertHtmlEntities(input: string, mode: HtmlEntityMode) {
  return mode === "encode" ? encodeHtmlEntities(input) : decodeHtmlEntities(input);
}
