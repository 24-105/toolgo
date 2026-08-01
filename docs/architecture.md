# ToolGo Architecture

## 設計思想

ToolGoは「ツールを増やすほど共通コードが複雑になる」状態を避けます。ツール固有のロジックと、全ツールで共有する表示・メタデータ・品質基準を分離します。新しいツールは登録と独立した実装の追加で完結し、他ツールのコードを直接変更しないことを基本にします。

## ディレクトリ構成

Phase 1以降の想定構成です。

```text
src/
  app/
    layout.tsx
    page.tsx
    tools/[slug]/page.tsx
    categories/[category]/page.tsx
    sitemap.ts
    robots.ts
  components/
    layout/          # Header, Footer, ToolLayout
    ui/              # Button, Input, Card, Tabsなど
    tools/           # ツール画面の共通補助UI
  features/
    tools/
      registry.ts    # 全ツールの登録点
      types.ts       # ToolMetadataなどの型
      json-formatter/
        metadata.ts
        JsonFormatter.tsx
        logic.ts
        logic.test.ts
      password-generator/
        ...
  lib/
    seo.ts
    utils.ts
  styles/
    globals.css
public/
  og/
  icons/
```

ツール数が増えても `features/tools/<slug>/` 内で関心を閉じ込め、`registry.ts` を登録点とします。汎用部品をツールフォルダへコピーせず、`components/ui` または `components/tools` に昇格させます。

## レイヤー構成

1. `app`: ルーティング、静的ページ生成、metadataの接続
2. `components`: レイアウトと再利用可能なUI
3. `features/tools`: ツールのmetadata、画面、純粋なロジック、テスト
4. `lib`: SEOや共通ユーティリティ
5. ブラウザAPI: Clipboard、Web Crypto、Canvas等。外部サーバーAPIは使用しない

計算・変換ロジックは可能な限り純粋関数にし、Reactコンポーネントから分離します。これにより単体テストと将来のWeb Worker化が容易になります。

## コンポーネント設計

共通UIは見た目とアクセシビリティを一元管理します。フォーム部品はlabel、フォーカス表示、エラー表示、キーボード操作を標準で持たせます。ツール固有の状態管理は各ツール内に置き、グローバル状態管理は必要になるまで導入しません。

## ToolLayout

`ToolLayout` は全ツールが利用するページシェルです。次を責務とします。

- パンくずまたはカテゴリ表示
- ツール名、概要、プライバシー説明
- 入力エリアと結果エリアの配置
- ヘルプ・使い方・注意事項の表示枠
- 関連ツール枠
- モバイル、タブレット、デスクトップのレスポンシブ対応

ツール本体は `ToolLayout` の内部レイアウトを直接再実装せず、定められたslotやpropsで内容を渡します。

## Tool Metadata

metadataは検索・一覧・ルーティング・OGPで共有します。最低限、次の型を想定します。

```ts
export type ToolMetadata = {
  slug: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  icon?: string;
  isMvp: boolean;
};
```

`slug` は英小文字とハイフンに統一し、変更時はリダイレクトまたは旧URLの扱いを決めます。SEO文言を画面コンポーネントへ重複記述せず、metadataを情報源にします。

## SEO設計

ツールごとに一意のtitle、description、canonical、OGPを生成します。静的exportで生成できる情報のみを使い、ユーザー入力をmetadataへ含めません。`sitemap.ts` と `robots.ts` は公開対象の静的ルートから生成し、noindexにすべき内部ページは明示します。

## Static Export方針

Next.jsの `output: 'export'` を使用し、サーバー専用機能、API Routes、Server Actions、動的な外部データ取得に依存しません。動的ルートはビルド時に全ツールのslugから静的生成します。GitHub Pagesのサブパス配信を考慮して `basePath` と `assetPrefix` を環境変数で管理し、リンクにはNext.jsのルーティングを使います。

ブラウザAPIを使う処理はClient Component内で実行し、SSR時に `window` や `navigator` を参照しません。重い処理は必要に応じて遅延ロードまたはWeb Workerへ分離します。

## 品質・運用上の原則

- 外部送信、外部フォント、不要な追跡をデフォルトで行わない
- ツールごとに入力境界値とエラー状態を定義する
- 依存ライブラリは追加理由と静的export対応を確認する
- 共通化は2〜3個以上の実例がある場合を基本とする
- UI、ロジック、metadata、テストを同じツールフォルダでレビューできるようにする
