"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setError(false);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
      setError(true);
      window.setTimeout(() => setError(false), 2400);
    }
  }

  return (
    <Button type="button" size="sm" variant="secondary" onClick={copy} disabled={!value}>
      {error ? (
        "コピーできませんでした"
      ) : copied ? (
        <Check size={15} aria-hidden="true" />
      ) : (
        <Copy size={15} aria-hidden="true" />
      )}
      {!error && (copied ? "コピーしました" : "コピー")}
    </Button>
  );
}
