export type RegexMatch = { value: string; index: number };

const MAX_PATTERN_LENGTH = 500;
const MAX_INPUT_LENGTH = 10_000;
const MAX_FLAGS_LENGTH = 20;

export function testRegex(pattern: string, flags: string, input: string): RegexMatch[] {
  if (!pattern) throw new Error("正規表現を入力してください。");
  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new Error(`正規表現は${MAX_PATTERN_LENGTH}文字以内で入力してください。`);
  }
  if (flags.length > MAX_FLAGS_LENGTH) {
    throw new Error("フラグが長すぎます。JavaScriptのフラグを確認してください。");
  }
  if (input.length > MAX_INPUT_LENGTH) {
    throw new Error(
      `対象の文字列は${MAX_INPUT_LENGTH.toLocaleString("ja-JP")}文字以内で入力してください。`,
    );
  }
  const regex = new RegExp(pattern, flags.includes("g") ? flags : `${flags}g`);
  return Array.from(input.matchAll(regex), (match) => ({
    value: match[0],
    index: match.index ?? 0,
  }));
}
