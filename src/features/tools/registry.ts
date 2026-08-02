import { AgeCalculator } from "./age-calculator/AgeCalculator";
import { CharacterCounter } from "./character-counter/CharacterCounter";
import { JsonFormatter } from "./json-formatter/JsonFormatter";
import { PasswordGenerator } from "./password-generator/PasswordGenerator";
import { QrCodeGenerator } from "./qr-code-generator/QrCodeGenerator";
import type { ToolDefinition } from "./types";

const toolMetadata: ToolDefinition[] = [
  {
    slug: "json-formatter",
    name: "JSON整形",
    description: "JSONを読みやすく整形し、構文エラーも確認できます。",
    category: "開発",
    keywords: ["JSON", "整形", "開発ツール"],
    icon: "code",
    isMvp: true,
    status: "available",
    component: JsonFormatter,
  },
  {
    slug: "password-generator",
    name: "パスワード生成",
    description: "安全なパスワードを、このブラウザだけで作れます。",
    category: "セキュリティ",
    keywords: ["パスワード", "生成", "セキュリティ"],
    icon: "key",
    isMvp: true,
    status: "available",
    component: PasswordGenerator,
  },
  {
    slug: "qr-code-generator",
    name: "QRコード生成",
    description: "文字やURLをQRコードに変換します。",
    category: "生成",
    keywords: ["QRコード", "生成", "URL"],
    icon: "qr",
    isMvp: true,
    status: "available",
    component: QrCodeGenerator,
  },
  {
    slug: "character-counter",
    name: "文字数カウント",
    description: "文章の文字数や行数を数えます。",
    category: "文章",
    keywords: ["文字数", "カウント", "文章"],
    icon: "text",
    isMvp: true,
    status: "available",
    component: CharacterCounter,
  },
  {
    slug: "age-calculator",
    name: "年齢計算",
    description: "誕生日から、今日の年齢と次の誕生日までの日数を計算します。",
    category: "計算",
    keywords: ["年齢", "計算", "生年月日"],
    icon: "calendar",
    isMvp: true,
    status: "available",
    component: AgeCalculator,
  },
];

export const toolRegistry: ToolDefinition[] = toolMetadata;

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
