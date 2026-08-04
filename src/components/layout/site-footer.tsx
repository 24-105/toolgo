import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <p>© {new Date().getFullYear()} ToolGo</p>
        <nav className="site-footer-nav" aria-label="フッターナビゲーション">
          <Link href="/">ホーム</Link>
          <Link href="/tools">ツール一覧</Link>
          <Link href="/terms">利用規約</Link>
          <Link href="/privacy-policy">プライバシーポリシー</Link>
        </nav>
      </div>
    </footer>
  );
}
