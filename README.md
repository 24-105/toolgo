# ToolGo

ブラウザだけで使える、無料・高速・プライバシー重視のオンラインツール集です。

## Project router

このREADMEをプロジェクト全体のドキュメントルーターとして扱います。実装前に、対象作業に関係する文書だけを確認してください。

### プロジェクトの基本情報

- [プロジェクト計画・Phase](docs/roadmap.md)
- [MVP要件](docs/mvp.md)
- [アーキテクチャ設計](docs/architecture.md)
- [UI・ブランド方針](docs/design-principles.md)
- [日本語UI文言方針](docs/language-policy.md)
- [開発・ツール追加ルール](docs/contributing.md)
- [docs全体の目次](docs/README.md)

### 目的別の読み方

| 作業内容                         | 最初に読む文書                                         |
| -------------------------------- | ------------------------------------------------------ |
| Phaseやリリース計画を確認する    | [docs/roadmap.md](docs/roadmap.md)                     |
| MVPツールを実装する              | [docs/mvp.md](docs/mvp.md)                             |
| ディレクトリや共通基盤を変更する | [docs/architecture.md](docs/architecture.md)           |
| UI、ロゴ、レイアウトを変更する   | [docs/design-principles.md](docs/design-principles.md) |
| UI文言や日本語化を変更する       | [docs/language-policy.md](docs/language-policy.md)     |
| 新しいツールを追加する           | [docs/contributing.md](docs/contributing.md)           |

## プロジェクト概要

ToolGoは、一般ユーザー、エンジニア、デザイナー、学生が日常的に使える小さなツールを一つのWebサイトに集約します。すべての処理をブラウザ内で完結させ、入力データをサーバーへ送信しません。

- 無料で利用可能
- バックエンド不要、ブラウザAPIのみで処理
- Next.js App Router + TypeScript + Tailwind CSS
- GitHub Pagesで静的ホスティング
- 将来的に100〜200以上のツールを追加可能なプラットフォーム設計

## MVP

最初のMVPでは、次の5ツールを提供します。

- JSON Formatter
- Password Generator
- QR Code Generator
- Character Counter
- Age Calculator

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

品質確認には次を使用します。

```bash
npm run format:check
npm run lint
npm run build
```

## 開発方針

ツールごとにmetadata、入力UI、ロジック、テストを分離し、共通レイアウトとデザインシステムを再利用します。新しいツールの追加で既存ツールを変更する必要がないことを重要な設計基準とします。

## ライセンス

ライセンスはプロジェクトの公開方針確定後に設定します。
