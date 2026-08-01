# ToolGo

ブラウザだけで使える、無料・高速・プライバシー重視のオンラインツール集です。

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

各ツールの範囲は [docs/mvp.md](docs/mvp.md)、全体計画は [docs/roadmap.md](docs/roadmap.md) を参照してください。

## 開発方針

ツールごとに独立したmetadata、入力UI、ロジック、テストを持たせ、共通レイアウトとデザインシステムを再利用します。新しいツールの追加で既存ツールを変更する必要がないことを重要な設計基準とします。

## ドキュメント

- [ロードマップ](docs/roadmap.md)
- [アーキテクチャ](docs/architecture.md)
- [コントリビューションガイド](docs/contributing.md)
- [MVP仕様](docs/mvp.md)

## ローカル開発

実装基盤はPhase 1で追加します。基盤完成後は、次のコマンドを想定しています。

```bash
npm install
npm run dev
```

本番用静的ファイルの生成と確認方法は、Next.js基盤導入時にREADMEへ追記します。

## ライセンス

ライセンスはプロジェクトの公開方針確定後に設定します。
　