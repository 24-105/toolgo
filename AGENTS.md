# ToolGo Agent Instructions

## Repository scope

ToolGoは、ブラウザ内だけで処理を完結する無料のWebツール集です。バックエンド、API Routes、Server Actions、ユーザー入力のサーバー送信は原則として使用しません。

想定スタックは次のとおりです。

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/uiの設計思想
- Lucide Icons
- Static Export
- GitHub Pages

## Documentation workflow

ルートの`README.md`をドキュメントのルーターとして扱います。作業開始時は次の順序で必要な情報だけを読みます。

1. `AGENTS.md`
2. `README.md`
3. `docs/README.md`
4. 変更対象に対応する文書

すべてのdocsを毎回読む必要はありません。対象別の参照先は次のとおりです。

- プロジェクト計画・Phase: `docs/roadmap.md`
- MVPの機能要件: `docs/mvp.md`
- ディレクトリ・レイヤー・静的export: `docs/architecture.md`
- UI・ブランド・アクセシビリティの方針: `docs/design-principles.md`
- UI文言、日本語化、専門用語の扱い: `docs/language-policy.md`
- ツール追加・レビュー・品質ルール: `docs/contributing.md`

対象ディレクトリに、より深い階層の`AGENTS.md`が追加された場合は、その指示を優先して確認します。

## Source of truth

文書間で矛盾がある場合は、次の優先順位で判断します。

1. ユーザーの現在の依頼
2. 対象に最も近い`AGENTS.md`
3. `docs/`内の要件・設計・方針・ルール
4. `README.md`
5. 既存の実装

矛盾を黙って解消せず、最終報告で判断と影響を説明します。

## Implementation rules

- 実装言語はTypeScriptを使用する
- 既存のレイヤーと命名規則に従う
- 新しい依存ライブラリは必要性を説明してから追加する
- 共通UIやユーティリティを重複実装しない
- 変更範囲を依頼内容に限定する
- ツール固有ロジックは`src/features/tools/<slug>/`へ分離する
- ユーザー入力はブラウザ内で処理し、外部送信しない
- 静的exportで動作しないサーバー依存機能を追加しない
- UI変更ではアクセシビリティ、モバイル表示、フォーカス状態を確認する

## Documentation rules

次の変更を行った場合は、同じ作業で関連ドキュメントも更新します。

- ユーザー向けの挙動
- 要件、MVP範囲、Phase
- ディレクトリやコンポーネント構成
- npm scripts、依存関係、環境変数
- デザイン、ブランド、アクセシビリティ方針
- UI文言や対応言語
- ツール追加やレビュー手順

大きな設計判断を行った場合は、まず既存の`docs/`文書へ記録します。将来ADRが必要な規模になった場合は`docs/architecture/adr/`を作成して追加します。

## Validation

実装後は、変更内容に応じて次のコマンドを実行します。

```bash
npm run format:check
npm run lint
npm run build
```

テストスクリプトを追加した場合は`npm test`も実行します。現時点では専用のテストスクリプトは未導入です。

最終報告には次を含めます。

- 読んだ文書
- 変更ファイル
- 実行したコマンド
- 検証結果
- 更新したドキュメント
- 未解決の懸念
