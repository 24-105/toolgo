import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex min-h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors",
        "placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-muted",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
