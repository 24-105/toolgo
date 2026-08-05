import { unified } from "unified";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

type MarkdownNode = {
  children?: MarkdownNode[];
  type: string;
  value?: string;
};

function allowBreakTags() {
  return (tree: MarkdownNode) => {
    convertBreakTags(tree);
  };
}

function convertBreakTags(node: MarkdownNode) {
  for (const child of node.children ?? []) {
    if (
      child.type === "html" &&
      /^<br\s*\/?>(?:\s*)$/iu.test(child.value?.trim() ?? "")
    ) {
      child.type = "break";
      delete child.value;
    }
    convertBreakTags(child);
  }
}

const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(allowBreakTags)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify);

export function renderMarkdown(value: string) {
  return String(markdownProcessor.processSync(value));
}
