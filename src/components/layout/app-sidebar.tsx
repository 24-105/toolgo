"use client";

import { Grid2X2, LayoutDashboard, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MascotMark } from "@/components/brand/mascot-mark";

type NavigationItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
};

const primaryNavigation: NavigationItem[] = [
  { label: "ホーム", href: "/", icon: LayoutDashboard },
  { label: "ツール一覧", href: "/tools", icon: Wrench },
  { label: "カテゴリ", href: "/categories", icon: Grid2X2 },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="app-sidebar" aria-label="アプリケーションナビゲーション">
      <div className="sidebar-brand-wrap">
        <Link className="sidebar-brand" href="/" aria-label="ToolGoホーム">
          <MascotMark priority />
          <span>ToolGo</span>
        </Link>
      </div>

      <nav className="sidebar-nav" aria-label="メインナビゲーション">
        <p className="sidebar-section-label">メニュー</p>
        {primaryNavigation.map((item) => (
          <SidebarLink key={item.href} item={item} active={pathname === item.href} />
        ))}
      </nav>
    </aside>
  );
}

function SidebarLink({
  item,
  active = false,
  disabled = false,
}: {
  item: NavigationItem;
  active?: boolean;
  disabled?: boolean;
}) {
  const Icon = item.icon;

  if (disabled) {
    return (
      <span className="sidebar-link sidebar-link-disabled" aria-disabled="true">
        <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
        <span>{item.label}</span>
      </span>
    );
  }

  return (
    <Link
      className={`sidebar-link${active ? " sidebar-link-active" : ""}`}
      href={item.href}
    >
      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
      <span>{item.label}</span>
    </Link>
  );
}
