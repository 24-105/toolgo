import type { ComponentType } from "react";

export type ToolIcon =
  | "code"
  | "key"
  | "qr"
  | "text"
  | "calendar"
  | "link"
  | "binary"
  | "hash"
  | "palette"
  | "regex"
  | "diff"
  | "table"
  | "image"
  | "markdown"
  | "wallet"
  | "split"
  | "tax"
  | "date"
  | "ruler"
  | "percent";
export type ToolStatus = "available" | "planned";

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolDetails = {
  overview: string;
  example?: string;
  howToUse: string[];
  notes?: string[];
  faq?: ToolFaq[];
};

export type ToolMetadata = {
  slug: string;
  name: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  category: string;
  keywords: string[];
  icon: ToolIcon;
  isMvp: boolean;
  status: ToolStatus;
  details: ToolDetails;
};

export type ToolComponentProps = {
  metadata: ToolMetadata;
};

export type ToolDefinition = ToolMetadata & {
  component?: ComponentType<ToolComponentProps>;
};
