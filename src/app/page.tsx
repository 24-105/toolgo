import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
} from "@/components/ui";

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="page-content">
        <header className="page-header">
          <div>
            <p className="eyebrow">ToolGo · Phase 2</p>
            <h1 id="page-title" className="page-title">
              ブラウザだけで使える、シンプルなツール集。
            </h1>
            <p className="lede">
              入力データをサーバーへ送信せずに使える無料ツール集です。
              共通デザインシステムを準備しています。
            </p>
          </div>
          <Badge variant="success">基盤準備中</Badge>
        </header>

        <section className="component-grid" aria-label="デザインシステムのプレビュー">
          <Card>
            <CardHeader>
              <CardTitle>フォーム部品</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="stack">
                <div className="stack">
                  <Label htmlFor="sample-input">入力ラベル</Label>
                  <Input id="sample-input" placeholder="入力してください" />
                </div>
                <div className="stack">
                  <Label htmlFor="sample-textarea">テキストエリア</Label>
                  <Textarea id="sample-textarea" placeholder="複数行の入力" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>操作と状態</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="stack">
                <p className="text-sm leading-6 text-muted">
                  共通コンポーネントは、フォーカス表示、無効状態、レスポンシブ表示を標準で備えます。
                </p>
                <div className="inline-actions">
                  <Button>実行する</Button>
                  <Button variant="secondary">キャンセル</Button>
                  <Button variant="ghost">詳細を見る</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
