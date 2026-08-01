export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">ToolGo · Phase 1</p>
        <h1 id="page-title">ブラウザだけで使える、シンプルなツール集。</h1>
        <p className="lede">
          ToolGoは、入力データをサーバーへ送信せずに使える無料ツール集です。
          ツールはこれから順番に追加していきます。
        </p>
        <div className="status-card" role="status">
          <span className="status-dot" aria-hidden="true" />
          <span>プロジェクト基盤を準備中です</span>
        </div>
      </section>
    </main>
  );
}
