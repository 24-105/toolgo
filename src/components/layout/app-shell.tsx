import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";
import { SiteFooter } from "@/components/layout/site-footer";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <AppSidebar />
      <div className="app-main">
        <AppTopbar />
        <div className="app-content">{children}</div>
        <SiteFooter />
      </div>
    </div>
  );
}
