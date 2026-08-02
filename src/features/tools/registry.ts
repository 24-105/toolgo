import type { ToolDefinition, ToolMetadata } from "./types";

const toolMetadata: ToolMetadata[] = [
  {
    slug: "json-formatter",
    name: "JSON整形",
    description: "JSONを読みやすく整形し、入力ミスを確認できます。",
    category: "開発",
    keywords: ["JSON", "整形", "開発ツール"],
    icon: "code",
    isMvp: true,
    status: "planned",
  },
  {
    slug: "password-generator",
    name: "パスワード生成",
    description: "安全なパスワードをブラウザ内で生成できます。",
    category: "セキュリティ",
    keywords: ["パスワード", "生成", "セキュリティ"],
    icon: "key",
    isMvp: true,
    status: "planned",
  },
  {
    slug: "qr-code-generator",
    name: "QRコード生成",
    description: "文字やURLからQRコードを生成できます。",
    category: "生成",
    keywords: ["QRコード", "生成", "URL"],
    icon: "qr",
    isMvp: true,
    status: "planned",
  },
  {
    slug: "character-counter",
    name: "文字数カウント",
    description: "文章の文字数や行数をブラウザ内で数えられます。",
    category: "文章",
    keywords: ["文字数", "カウント", "文章"],
    icon: "text",
    isMvp: true,
    status: "planned",
  },
  {
    slug: "age-calculator",
    name: "年齢計算",
    description: "生年月日から現在の年齢や経過日数を計算できます。",
    category: "計算",
    keywords: ["年齢", "計算", "生年月日"],
    icon: "calendar",
    isMvp: true,
    status: "planned",
  },
];

export const toolRegistry: ToolDefinition[] = toolMetadata.map((metadata) => ({
  ...metadata,
}));

export function getTools() {
  return toolRegistry;
}

export function getToolBySlug(slug: string) {
  return toolRegistry.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string) {
  return toolRegistry.filter((tool) => tool.category === category);
}

export function getCategories() {
  return [...new Set(toolRegistry.map((tool) => tool.category))];
}
