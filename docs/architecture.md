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
    layout/          # AppShell, Sidebar, Topbar, Footer, ToolLayout
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

アプリケーション全体は `AppShell`、永続左サイドバー、Topbar、コンテンツ領域、Footerで構成します。サイドバーは情報階層と現在地を示し、Topbarは検索とテーマ切替を提供します。通知やユーザーメニューなど実体のないSaaS要素は追加せず、繰り返し利用する操作を短い導線で提供します。

画面固有のアイコンはLucide Iconsを使い、意味を持たない装飾アイコンには `aria-hidden` を付けます。配色はToolGo固有のBlue/Cyanを基準にし、既存サービスのブランド表現を模倣しません。

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
  icon: ToolIcon;
  isMvp: boolean;
  status: "planned" | "available";
};
```

`slug` は英小文字とハイフンに統一し、変更時はリダイレクトまたは旧URLの扱いを決めます。SEO文言を画面コンポーネントへ重複記述せず、metadataを情報源にします。`status` は `planned` と `available` を持ち、実装前のMVPツールも同じregistryで公開予定として扱えます。

`src/features/tools/registry.ts` が一覧、カテゴリ、動的ルート、metadata、sitemapの共通情報源です。ツール画面は `ToolDefinition.component` に登録し、未実装の場合は詳細ページが準備中表示を出します。新しいツールの追加で `app/tools/page.tsx` や `sitemap.ts` を個別に変更しないことを基準にします。

QRコード生成には `qrcode` を使います。エンコードとPNG生成をブラウザ内で行い、外部APIや入力データの送信に依存しません。その他のMVPツールはブラウザ標準APIと純粋なTypeScriptロジックで実装します。

## SEO設計

ツールごとに一意のtitle、description、canonical、OGPを生成します。静的exportで生成できる情報のみを使い、ユーザー入力をmetadataへ含めません。共通のURL生成とページmetadataは `src/lib/seo.ts` に集約します。

`src/app/sitemap.ts` と `src/app/robots.ts` は公開対象の静的ルートから生成します。現在の公開対象はホーム、ツール一覧、カテゴリ、registryに登録されたツール詳細ページです。noindexにすべき内部ページは公開対象へ追加しません。

canonical、OGP、sitemap、robotsの絶対URLは `NEXT_PUBLIC_SITE_URL` と `NEXT_PUBLIC_BASE_PATH` から生成します。GitHub Pagesへ公開するときは `.env.example` を参考に本番URLを設定し、ローカルでは未設定時の `http://localhost:3000` を使います。

## 検索設計

検索データはregistryから、slug、ツール名、説明、カテゴリ、キーワード、公開状態だけを取り出してヘッダーへ渡します。ツール画面のClient Componentを検索欄へ読み込まず、ツール数が増えても検索欄の初期負荷を抑えます。

検索は入力途中のキーワードを、ツール名、カテゴリ、説明、keywordsへ照合します。候補を選ぶとツール詳細へ移動し、検索結果をすべて見ると `/tools?q=...` の一覧へ移動します。検索結果はブラウザ内で絞り込み、サーバーや外部APIへ入力を送信しません。

検索欄は `⌘ K` または `Ctrl K` でフォーカスできます。新しいツールを追加するときは、metadataのname、description、category、keywordsを検索結果で使う日本語として整えます。

## Static Export方針

Next.jsの `output: 'export'` を使用し、サーバー専用機能、API Routes、Server Actions、動的な外部データ取得に依存しません。動的ルートはビルド時にregistryの全slugから静的生成します。GitHub Pagesのサブパス配信を考慮して `basePath` と `assetPrefix` を環境変数で管理し、リンクにはNext.jsのルーティングを使います。

ブラウザAPIを使う処理はClient Component内で実行し、SSR時に `window` や `navigator` を参照しません。重い処理は必要に応じて遅延ロードまたはWeb Workerへ分離します。

## 品質・運用上の原則

- 外部送信、外部フォント、不要な追跡をデフォルトで行わない
- ツールごとに入力境界値とエラー状態を定義する
- 依存ライブラリは追加理由と静的export対応を確認する
- 共通化は2〜3個以上の実例がある場合を基本とする
- UI、ロジック、metadata、テストを同じツールフォルダでレビューできるようにする
