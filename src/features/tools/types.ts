import type { ComponentType } from "react";

export type ToolIcon = "code" | "key" | "qr" | "text" | "calendar";
export type ToolStatus = "available" | "planned";

export type ToolMetadata = {
  slug: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  icon: ToolIcon;
  isMvp: boolean;
  status: ToolStatus;
};

export type ToolComponentProps = {
  metadata: ToolMetadata;
};

export type ToolDefinition = ToolMetadata & {
  component?: ComponentType<ToolComponentProps>;
};
