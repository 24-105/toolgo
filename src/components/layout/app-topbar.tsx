import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ToolSearchBox, type ToolSearchItem } from "@/components/search";

export function AppTopbar({ tools }: { tools: ToolSearchItem[] }) {
  return (
    <header className="app-topbar">
      <ToolSearchBox tools={tools} />

      <div className="topbar-actions">
        <ThemeToggle />
      </div>
    </header>
  );
}
