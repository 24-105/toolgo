# ToolGo

**ToolGo｜手軽な便利ツール**

ブラウザだけで使える、無料の便利ツール集です。

## Project router

このREADMEをプロジェクト全体のドキュメントルーターとして扱います。実装前に、対象作業に関係する文書だけを確認してください。

### プロジェクトの基本情報

- [プロジェクト計画・Phase](docs/roadmap.md)
- [アーキテクチャ設計](docs/architecture.md)
- [UI・ブランド方針](docs/design-principles.md)
- [日本語UI文言方針](docs/language-policy.md)
- [自然な日本語の書き方](docs/japanese-writing-guidelines.md)
- [広告方針](docs/advertising-policy.md)
- [利用規約](docs/terms.md)
- [プライバシーポリシー](docs/privacy-policy.md)
- [本番公開チェックリスト](docs/release-checklist.md)
- [AdSense審査・運用チェック](docs/adsense-readiness.md)
- [開発・ツール追加ルール](docs/contributing.md)
- [NISA積立シミュレーター仕様](docs/nisa-simulator.md)
- [投資信託の税引き後シミュレーター仕様](docs/taxable-investment-simulator.md)
- [iDeCoシミュレーター仕様](docs/ideco-simulator.md)
- [docs全体の目次](docs/README.md)

### 目的別の読み方

| 作業内容                           | 最初に読む文書                                                             |
| ---------------------------------- | -------------------------------------------------------------------------- |
| Phaseやリリース計画を確認する      | [docs/roadmap.md](docs/roadmap.md)                                         |
| ディレクトリや共通基盤を変更する   | [docs/architecture.md](docs/architecture.md)                               |
| UI、ロゴ、レイアウトを変更する     | [docs/design-principles.md](docs/design-principles.md)                     |
| UI文言や日本語化を変更する         | [docs/language-policy.md](docs/language-policy.md)                         |
| 自然な日本語の文言を追加・修正する | [docs/japanese-writing-guidelines.md](docs/japanese-writing-guidelines.md) |
| 新しいツールを追加する             | [docs/contributing.md](docs/contributing.md)                               |

## プロジェクト概要

ToolGoは、一般ユーザー、エンジニア、デザイナー、学生が日常的に使える小さなツールを一つのWebサイトに集約します。すべての処理をブラウザ内で完結させ、入力データをサーバーへ送信しません。

- 無料で利用可能
- バックエンド不要、ブラウザAPIのみで処理
- Next.js App Router + TypeScript + Tailwind CSS
- GitHub Pagesで静的ホスティング
- 将来的に100〜200以上のツールを追加可能なプラットフォーム設計

## MVP（完了済み）

最初のMVPでは、次の5ツールを提供します。

- JSON整形
- パスワード生成
- QRコード生成
- 文字数カウント
- 年齢計算

## ローカル開発

必要なNode.jsバージョンは`package.json`の`engines`を確認してください。

```bash
npm install
npm run dev
```

静的exportを生成して確認する場合は、次を実行します。

```bash
npm run build
npm run start
```

本番のcanonical、OGP、sitemap、robotsのURLを正しく生成するには、`.env.example` を参考に `NEXT_PUBLIC_SITE_URL` と `NEXT_PUBLIC_BASE_PATH` を設定します。

Google Analyticsは`NEXT_PUBLIC_GA_MEASUREMENT_ID`を設定した場合だけ読み込みます。広告は本番デプロイ設定を用意していますが、現在は審査中のため、掲載状況と同意要件を確認して運用します。

品質確認には次を使用します。

```bash
npm run format:check
npm run lint
npm run test
npm run build
```

依存関係はDependabotで定期的に確認します。npmパッケージとGitHub Actionsを対象に、毎週月曜9:00（日本時間）に更新PRを作成します。未処理のPRは対象ごとに最大15件です。

## 開発方針

MVPの5ツールは実装済みです。ツールごとにmetadata、入力UI、ロジック、テストを分離し、`src/features/tools/registry.ts` へ登録します。共通レイアウトとデザインシステムを再利用し、新しいツールの追加で既存ツールや一覧ページを変更する必要がないことを重要な設計基準とします。

## ライセンス

ライセンスはプロジェクトの公開方針確定後に設定します。
