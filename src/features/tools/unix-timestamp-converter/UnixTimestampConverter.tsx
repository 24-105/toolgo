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
  Select,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import {
  dateTimeLocalToTimestamp,
  timestampToDate,
  type DateTimeToTimestampResult,
  type TimestampToDateResult,
  type TimestampUnit,
} from "./logic";

export function UnixTimestampConverter({}: ToolComponentProps) {
  const [timestamp, setTimestamp] = useState("");
  const [timestampUnit, setTimestampUnit] = useState<TimestampUnit>("seconds");
  const [timestampResult, setTimestampResult] = useState<TimestampToDateResult | null>(
    null,
  );
  const [timestampError, setTimestampError] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [dateResult, setDateResult] = useState<DateTimeToTimestampResult | null>(null);
  const [dateError, setDateError] = useState("");
  const [dateValue, timeValue = ""] = dateTime.split("T");

  function convertTimestamp() {
    try {
      setTimestampResult(timestampToDate(timestamp, timestampUnit));
      setTimestampError("");
    } catch (error) {
      setTimestampResult(null);
      setTimestampError(
        error instanceof Error ? error.message : "変換できませんでした。",
      );
    }
  }

  function convertDateTime() {
    try {
      setDateResult(dateTimeLocalToTimestamp(dateTime));
      setDateError("");
    } catch (error) {
      setDateResult(null);
      setDateError(error instanceof Error ? error.message : "変換できませんでした。");
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="min-w-0">
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">タイムスタンプから変換</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="unix-timestamp-input">Unixタイムスタンプ</Label>
            <Input
              id="unix-timestamp-input"
              inputMode="numeric"
              value={timestamp}
              onChange={(event) => setTimestamp(event.target.value)}
              placeholder="1719792000"
            />
          </div>
          <label className="block space-y-2 text-sm font-semibold">
            <span>単位</span>
            <Select
              value={timestampUnit}
              onChange={(event) => setTimestampUnit(event.target.value as TimestampUnit)}
            >
              <option value="seconds">秒（10桁）</option>
              <option value="milliseconds">ミリ秒（13桁）</option>
            </Select>
          </label>
          <Button onClick={convertTimestamp}>日時に変換</Button>
          {timestampError && (
            <p role="alert" className="text-sm font-semibold text-danger">
              {timestampError}
            </p>
          )}
          {timestampResult && (
            <div className="space-y-3 rounded-md border border-border bg-muted/30 p-4 text-sm">
              <div>
                <p className="font-semibold">日本時間</p>
                <p>{timestampResult.local}</p>
              </div>
              <div>
                <p className="font-semibold">ISO 8601</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="break-all">{timestampResult.iso}</code>
                  <CopyButton value={timestampResult.iso} />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">日時から変換</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            <div className="min-w-0 space-y-2">
              <Label htmlFor="unix-date-input">日付（お使いの端末の現地時間）</Label>
              <Input
                id="unix-date-input"
                className="min-w-0 max-w-full"
                type="date"
                value={dateValue}
                onChange={(event) => setDateTime(`${event.target.value}T${timeValue}`)}
              />
            </div>
            <div className="min-w-0 space-y-2">
              <Label htmlFor="unix-time-input">時刻</Label>
              <Input
                id="unix-time-input"
                className="min-w-0 max-w-full"
                type="time"
                value={timeValue}
                onChange={(event) => setDateTime(`${dateValue}T${event.target.value}`)}
              />
            </div>
          </div>
          <Button onClick={convertDateTime}>タイムスタンプに変換</Button>
          {dateError && (
            <p role="alert" className="text-sm font-semibold text-danger">
              {dateError}
            </p>
          )}
          {dateResult && (
            <div className="space-y-3 rounded-md border border-border bg-muted/30 p-4 text-sm">
              <div>
                <p className="font-semibold">秒</p>
                <div className="flex items-center justify-between gap-2">
                  <code>{dateResult.seconds}</code>
                  <CopyButton value={String(dateResult.seconds)} />
                </div>
              </div>
              <div>
                <p className="font-semibold">ミリ秒</p>
                <div className="flex items-center justify-between gap-2">
                  <code>{dateResult.milliseconds}</code>
                  <CopyButton value={String(dateResult.milliseconds)} />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
