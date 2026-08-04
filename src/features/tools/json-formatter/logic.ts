export type JsonFormatResult =
  { ok: true; value: string } | { ok: false; message: string };

function formatJsonError(error: unknown) {
  if (!(error instanceof SyntaxError)) {
    return "JSONとして読み取れませんでした。";
  }

  const message = error.message.replace(/^JSON\.parse:\s*/u, "");
  return `JSONの構文を確認してください。\n${message}`;
}

export function formatJson(input: string, indent: number): JsonFormatResult {
  if (!input.trim()) {
    return { ok: false, message: "JSONを入力してください。" };
  }

  try {
    return { ok: true, value: JSON.stringify(JSON.parse(input), null, indent) };
  } catch (error) {
    return { ok: false, message: formatJsonError(error) };
  }
}

export function minifyJson(input: string): JsonFormatResult {
  if (!input.trim()) {
    return { ok: false, message: "JSONを入力してください。" };
  }

  try {
    return { ok: true, value: JSON.stringify(JSON.parse(input)) };
  } catch (error) {
    return { ok: false, message: formatJsonError(error) };
  }
}
