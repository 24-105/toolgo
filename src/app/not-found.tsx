import Link from "next/link";

export default function NotFound() {
  return (
    <main className="legal-page not-found-page">
      <div className="site-container">
        <p className="eyebrow">ページが見つかりません</p>
        <h1 className="page-title">お探しのページはありません</h1>
        <p className="not-found-description">
          URLが変更されたか、入力したページが公開されていない可能性があります。
        </p>
        <div className="not-found-actions">
          <Link className="button-link" href="/">
            ホームへ戻る
          </Link>
          <Link className="text-link" href="/tools/">
            ツール一覧を見る
          </Link>
        </div>
      </div>
    </main>
  );
}
