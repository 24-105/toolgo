export async function createHash(value: string, algorithm: "SHA-256" | "SHA-512") {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest(algorithm, data);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}
