export function generateUuidList(count: number) {
  if (!Number.isInteger(count) || count < 1 || count > 100) {
    throw new Error("生成する個数は1〜100の範囲で指定してください。");
  }

  return Array.from({ length: count }, () => crypto.randomUUID()).join("\n");
}
