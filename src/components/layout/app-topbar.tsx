import { Search } from "lucide-react";

import { ThemeToggle } from "@/components/layout/theme-toggle";

export function AppTopbar() {
  return (
    <header className="app-topbar">
      <div className="topbar-search-wrap">
        <Search
          className="topbar-search-icon"
          size={17}
          strokeWidth={1.8}
          aria-hidden="true"
        />
        <form action="/tools" role="search">
          <input
            className="topbar-search"
            name="q"
            type="search"
            placeholder="ツールを検索…"
            aria-label="ツールを検索"
          />
        </form>
        <kbd className="topbar-shortcut">⌘ K</kbd>
      </div>

      <div className="topbar-actions">
        <ThemeToggle />
      </div>
    </header>
  );
}
