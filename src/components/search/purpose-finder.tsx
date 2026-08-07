"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { ToolIcon } from "@/components/tools";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import type { ToolIcon as ToolIconName } from "@/features/tools/types";

export type PurposeFinderTool = {
  slug: string;
  name: string;
  description: string;
  icon: ToolIconName;
  status: "available" | "planned";
};

export type PurposeFinderGroup = {
  slug: string;
  name: string;
  description: string;
  icon: ToolIconName;
  tools: PurposeFinderTool[];
};

export function PurposeFinder({ purposes }: { purposes: PurposeFinderGroup[] }) {
  const [selectedSlug, setSelectedSlug] = useState(purposes[0]?.slug ?? "");
  const selectedPurpose =
    purposes.find((purpose) => purpose.slug === selectedSlug) ?? purposes[0];

  if (!selectedPurpose) {
    return null;
  }

  return (
    <Card className="purpose-finder-card">
      <CardHeader>
        <p className="section-kicker">目的から探す</p>
        <CardTitle>やりたいことを選ぶ</CardTitle>
        <p className="purpose-finder-description">
          目的を選ぶと、すぐに使えるツールを表示します。
        </p>
      </CardHeader>
      <CardContent className="purpose-finder-content">
        <div className="purpose-option-grid" role="group" aria-label="目的の選択">
          {purposes.map((purpose) => {
            const isSelected = purpose.slug === selectedPurpose.slug;

            return (
              <button
                key={purpose.slug}
                type="button"
                className="purpose-option"
                aria-pressed={isSelected}
                onClick={() => setSelectedSlug(purpose.slug)}
              >
                <span className="purpose-option-icon" aria-hidden="true">
                  <ToolIcon icon={purpose.icon} />
                </span>
                <span className="purpose-option-copy">
                  <strong>{purpose.name}</strong>
                  <span>{purpose.description}</span>
                </span>
                <span className="purpose-option-count">{purpose.tools.length}件</span>
              </button>
            );
          })}
        </div>

        <div
          className="purpose-results"
          aria-live="polite"
          aria-labelledby={"purpose-result-" + selectedPurpose.slug}
        >
          <div className="purpose-results-heading">
            <div>
              <p className="section-kicker">おすすめツール</p>
              <h3 id={"purpose-result-" + selectedPurpose.slug}>
                {selectedPurpose.name}
              </h3>
              <p>{selectedPurpose.description}</p>
            </div>
            <Badge variant="success">{selectedPurpose.tools.length}件</Badge>
          </div>

          <div className="tool-list" aria-label={selectedPurpose.name + "に合うツール"}>
            {selectedPurpose.tools.map((tool) => (
              <Link
                key={tool.slug}
                href={"/tools/" + tool.slug + "/"}
                className="tool-list-item"
              >
                <span className="tool-list-item-icon" aria-hidden="true">
                  <ToolIcon icon={tool.icon} />
                </span>
                <span className="tool-list-item-content">
                  {tool.name}
                  <span className="tool-list-item-description">{tool.description}</span>
                </span>
                {tool.status === "planned" && <Badge>準備中</Badge>}
                <ArrowRight className="purpose-tool-arrow" size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
