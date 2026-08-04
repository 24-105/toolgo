export type UrlEncodeMode = "url" | "component";

export function encodeUrl(value: string, mode: UrlEncodeMode) {
  return mode === "url" ? encodeURI(value) : encodeURIComponent(value);
}

export function decodeUrl(value: string, mode: UrlEncodeMode) {
  return mode === "url" ? decodeURI(value) : decodeURIComponent(value);
}
