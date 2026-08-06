import type { LabelHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "block min-h-4 text-sm font-semibold leading-4 text-foreground",
        className,
      )}
      {...props}
    />
  );
}
