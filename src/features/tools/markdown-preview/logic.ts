function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderMarkdown(value: string) {
  const lines = value.split(/\r?\n/u);
  const output: string[] = [];
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      output.push(`<ul>${listItems.join("")}</ul>`);
      listItems = [];
    }
  }

  for (const line of lines) {
    const escaped = escapeHtml(line);
    if (escaped.startsWith("- ")) {
      listItems.push(`<li>${formatInline(escaped.slice(2))}</li>`);
      continue;
    }
    flushList();
    if (escaped.startsWith("### "))
      output.push(`<h3>${formatInline(escaped.slice(4))}</h3>`);
    else if (escaped.startsWith("## "))
      output.push(`<h2>${formatInline(escaped.slice(3))}</h2>`);
    else if (escaped.startsWith("# "))
      output.push(`<h1>${formatInline(escaped.slice(2))}</h1>`);
    else if (!escaped.trim()) output.push("");
    else output.push(`<p>${formatInline(escaped)}</p>`);
  }
  flushList();
  return output.join("\n");
}

function formatInline(value: string) {
  return value
    .replace(/\*\*(.+?)\*\*/gu, "<strong>$1</strong>")
    .replace(/`([^`]+)`/gu, "<code>$1</code>");
}
