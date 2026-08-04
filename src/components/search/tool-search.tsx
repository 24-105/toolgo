"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { FormEvent } from "react";

import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export type ToolSearchItem = {
  slug: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  status: "available" | "planned";
};

export function searchTools(tools: ToolSearchItem[], query: string) {
  const tokens = normalize(query).split(/\s+/u).filter(Boolean);
  if (tokens.length === 0) return tools;

  return tools
    .map((tool, index) => ({ tool, index, score: scoreTool(tool, tokens) }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map((item) => item.tool);
}

export function ToolSearchBox({ tools }: { tools: ToolSearchItem[] }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestions = useMemo(
    () => searchTools(tools, query).slice(0, 6),
    [query, tools],
  );
  const showSuggestions = focused && query.trim().length > 0;

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    if (!query.trim()) event.preventDefault();
  }

  return (
    <div className="topbar-search-wrap">
      <Search
        className="topbar-search-icon"
        size={17}
        strokeWidth={1.8}
        aria-hidden="true"
      />
      <form action="/tools" role="search" onSubmit={submit}>
        <input
          className="topbar-search"
          name="q"
          type="search"
          placeholder="ツールを検索…"
          aria-label="ツールを検索"
          role="combobox"
          aria-haspopup="listbox"
          aria-controls="tool-search-suggestions"
          aria-expanded={showSuggestions}
          autoComplete="off"
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 120)}
        />
      </form>
      <kbd className="topbar-shortcut">⌘ K</kbd>
      {showSuggestions && (
        <div
          id="tool-search-suggestions"
          className="tool-search-suggestions"
          role="listbox"
          aria-label="検索候補"
        >
          {suggestions.length > 0 ? (
            <>
              {suggestions.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}/`}
                  className="tool-search-suggestion"
                  role="option"
                >
                  <span>
                    <strong>{tool.name}</strong>
                    <small>{tool.category}</small>
                  </span>
                  {tool.status === "planned" && <Badge>準備中</Badge>}
                </Link>
              ))}
              <Link
                className="tool-search-all"
                href={`/tools?q=${encodeURIComponent(query.trim())}`}
              >
                「{query.trim()}」の検索結果をすべて見る
              </Link>
            </>
          ) : (
            <p className="tool-search-empty">一致するツールがありません。</p>
          )}
        </div>
      )}
    </div>
  );
}

export function ToolSearchResults({ tools }: { tools: ToolSearchItem[] }) {
  const query = useSyncExternalStore(
    subscribeToLocation,
    getSearchQuery,
    getServerSearchQuery,
  );

  const results = searchTools(tools, query);
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle>{query ? `「${query}」の検索結果` : "ツール一覧"}</CardTitle>
          <Badge variant="success">{results.length}種類</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {results.length > 0 ? (
          <div className="tool-list" aria-label={query ? "検索結果" : "ツール一覧"}>
            {results.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                className="tool-list-item"
              >
                <span>
                  {tool.name}
                  <span className="tool-list-item-description">{tool.description}</span>
                </span>
                {tool.status === "planned" && <Badge>準備中</Badge>}
              </Link>
            ))}
          </div>
        ) : (
          <p className="tool-search-page-empty">
            「{query}」に一致するツールはありません。別のキーワードで検索してください。
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function normalize(value: string) {
  return value.toLocaleLowerCase("ja-JP").trim();
}

function subscribeToLocation() {
  return () => undefined;
}

function getSearchQuery() {
  return new URLSearchParams(window.location.search).get("q") ?? "";
}

function getServerSearchQuery() {
  return "";
}

function scoreTool(tool: ToolSearchItem, tokens: string[]) {
  const name = normalize(tool.name);
  const searchable = normalize(
    [tool.name, tool.description, tool.category, ...tool.keywords].join(" "),
  );
  if (!tokens.every((token) => searchable.includes(token))) return 0;
  return tokens.reduce(
    (score, token) =>
      score +
      (name === token
        ? 100
        : name.startsWith(token)
          ? 80
          : name.includes(token)
            ? 60
            : 30),
    0,
  );
}
