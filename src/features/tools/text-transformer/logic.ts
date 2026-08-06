export type TextTransform =
  | "full-to-half"
  | "half-to-full"
  | "upper"
  | "lower"
  | "trim-lines"
  | "remove-line-breaks";

export function transformText(input: string, transform: TextTransform) {
  switch (transform) {
    case "full-to-half":
      return input
        .replace(/[！-～]/g, (character) =>
          String.fromCharCode(character.charCodeAt(0) - 0xfee0),
        )
        .replace(/　/g, " ");
    case "half-to-full":
      return input
        .replace(/[!-~]/g, (character) =>
          String.fromCharCode(character.charCodeAt(0) + 0xfee0),
        )
        .replace(/ /g, "　");
    case "upper":
      return input.toUpperCase();
    case "lower":
      return input.toLowerCase();
    case "trim-lines":
      return input
        .split(/\r?\n/u)
        .map((line) => line.trim())
        .join("\n");
    case "remove-line-breaks":
      return input.replace(/\s*\r?\n\s*/gu, " ").trim();
  }
}
