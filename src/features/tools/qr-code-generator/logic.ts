export const MAX_INPUT_LENGTH = 2_000;

export function getQrCodeInputError(value: string) {
  if (value.length <= MAX_INPUT_LENGTH) return "";
  return `入力は${MAX_INPUT_LENGTH.toLocaleString("ja-JP")}文字以内にしてください。`;
}
