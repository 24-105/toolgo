import {
  Binary,
  CalendarDays,
  CalendarRange,
  Code2,
  Coins,
  GitCompare,
  Hash,
  Image,
  KeyRound,
  Link as LinkIcon,
  Palette,
  QrCode,
  Regex,
  Ruler,
  Table,
  Type,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { ToolIcon as ToolIconName } from "@/features/tools/types";

const iconMap = {
  code: Code2,
  key: KeyRound,
  qr: QrCode,
  text: Type,
  calendar: CalendarDays,
  link: LinkIcon,
  binary: Binary,
  hash: Hash,
  palette: Palette,
  regex: Regex,
  diff: GitCompare,
  table: Table,
  image: Image,
  markdown: Code2,
  wallet: Wallet,
  split: Coins,
  tax: Coins,
  date: CalendarRange,
  ruler: Ruler,
} satisfies Record<ToolIconName, LucideIcon>;

export function ToolIcon({ icon }: { icon: ToolIconName }) {
  const Icon = iconMap[icon];

  return <Icon aria-hidden="true" />;
}
