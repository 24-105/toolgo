import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "min-h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-sm outline-none",
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
      {...props}
    />
  ),
);

Select.displayName = "Select";
