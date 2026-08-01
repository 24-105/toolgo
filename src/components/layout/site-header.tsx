import Link from "next/link";

import { Button } from "@/components/ui";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container site-header-inner">
        <Link className="brand" href="/" aria-label="ToolGo ホーム">
          <span className="brand-mark" aria-hidden="true">
            T
          </span>
          <span>ToolGo</span>
        </Link>

        <nav className="site-nav" aria-label="メインナビゲーション">
          <Link className="site-nav-link" href="/">
            ホーム
          </Link>
          <Link className="site-nav-link" href="/tools">
            ツール一覧
          </Link>
          <Button size="sm" variant="secondary" disabled>
            カテゴリ
          </Button>
        </nav>
      </div>
    </header>
  );
}
