import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { getTools } from "@/features/tools/registry";

export function AppShell({ children }: { children: ReactNode }) {
  const searchTools = getTools().map(
    ({ slug, name, description, category, keywords, icon, status }) => ({
      slug,
      name,
      description,
      category,
      keywords,
      icon,
      status,
    }),
  );

  return (
    <div className="app-shell">
      <AppSidebar />
      <div className="app-main">
        <AppTopbar tools={searchTools} />
        <div className="app-content">{children}</div>
        <SiteFooter />
      </div>
    </div>
  );
}
