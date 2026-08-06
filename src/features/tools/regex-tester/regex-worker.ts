import { testRegex, type RegexMatch } from "./logic";

type RegexRequest = {
  pattern: string;
  flags: string;
  input: string;
};

type RegexResponse = { ok: true; matches: RegexMatch[] } | { ok: false; message: string };

const workerScope = self as unknown as {
  onmessage: ((event: MessageEvent<RegexRequest>) => void) | null;
  postMessage: (message: RegexResponse) => void;
};

workerScope.onmessage = ({ data }) => {
  try {
    workerScope.postMessage({
      ok: true,
      matches: testRegex(data.pattern, data.flags, data.input),
    });
  } catch (cause) {
    workerScope.postMessage({
      ok: false,
      message:
        cause instanceof Error &&
        (cause.message.includes("文字以内") || cause.message.includes("入力してください"))
          ? cause.message
          : "正規表現またはフラグが正しくありません。",
    });
  }
};

export {};
