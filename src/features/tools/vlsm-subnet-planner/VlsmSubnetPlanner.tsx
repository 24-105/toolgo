"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { formatVlsmPlan, planVlsm, type VlsmPlan } from "./logic";

export function VlsmSubnetPlanner({}: ToolComponentProps) {
  const [network, setNetwork] = useState("192.168.0.0/24");
  const [hostCounts, setHostCounts] = useState("100\n50\n20");
  const [result, setResult] = useState<VlsmPlan | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    try {
      setResult(planVlsm(network, hostCounts));
      setError("");
    } catch (cause) {
      setResult(null);
      setError(
        cause instanceof Error ? cause.message : "サブネットを計算できませんでした。",
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>VLSMサブネットを設計</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="vlsm-network">元のネットワーク（CIDR）</Label>
          <Input
            id="vlsm-network"
            value={network}
            onChange={(event) => setNetwork(event.target.value)}
            placeholder="192.168.0.0/24"
            spellCheck={false}
            className="font-mono"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vlsm-host-counts">各サブネットで必要なホスト数</Label>
          <Textarea
            id="vlsm-host-counts"
            value={hostCounts}
            onChange={(event) => setHostCounts(event.target.value)}
            placeholder="100\n50\n20"
            className="min-h-32 font-mono"
          />
          <p className="text-xs text-muted">
            1行に1つ入力します。空白区切りやカンマ区切りも使えます。
          </p>
        </div>
        <Button onClick={calculate}>サブネットを設計する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <div className="space-y-4" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-3 text-sm">
              <span>
                {result.network}/{result.prefix}・残り
                {result.remainingAddresses.toLocaleString("ja-JP")}アドレス
              </span>
              <CopyButton value={formatVlsmPlan(result)} />
            </div>
            <div className="overflow-x-auto rounded-md border border-border">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <caption className="sr-only">VLSMサブネットの計算結果</caption>
                <thead className="border-b border-border bg-surface-muted">
                  <tr>
                    <th className="px-3 py-2">必要台数</th>
                    <th className="px-3 py-2">サブネット</th>
                    <th className="px-3 py-2">利用可能範囲</th>
                    <th className="px-3 py-2">ブロードキャスト</th>
                  </tr>
                </thead>
                <tbody>
                  {result.allocations.map((allocation) => (
                    <tr
                      key={`${allocation.network}/${allocation.prefix}`}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-3 py-2">
                        {allocation.request.toLocaleString("ja-JP")}台
                      </td>
                      <td className="px-3 py-2 font-mono">
                        {allocation.network}/{allocation.prefix}
                      </td>
                      <td className="px-3 py-2 font-mono">
                        {allocation.firstHost}〜{allocation.lastHost}
                      </td>
                      <td className="px-3 py-2 font-mono">{allocation.broadcast}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
