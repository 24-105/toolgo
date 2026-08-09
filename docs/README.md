# ToolGo Documentation Index

`docs/` は、ToolGoの要件、設計書、方針、開発ルールを管理するディレクトリです。

ルートの [README.md](../README.md) がプロジェクト全体の入口であり、このファイルはdocs内部の目次です。作業対象に関係する文書だけを読み、文書を増やした場合はこの目次も更新します。

## 要件・計画

| 文書                                                               | 内容                                                         |
| ------------------------------------------------------------------ | ------------------------------------------------------------ |
| [roadmap.md](roadmap.md)                                           | Phase 0〜10、MVP、将来拡張、次に実施するPhase                |
| [release-checklist.md](release-checklist.md)                       | GitHub Pages公開前後の確認項目                               |
| [adsense-readiness.md](adsense-readiness.md)                       | AdSense審査中の確認、対応、運用チェック                      |
| [terms.md](terms.md)                                               | ToolGo利用規約の本文と公開時の確認事項                       |
| [privacy-policy.md](privacy-policy.md)                             | ToolGoプライバシーポリシーの本文と確認事項                   |
| [nisa-simulator.md](nisa-simulator.md)                             | NISA積立シミュレーターの制度前提、入力、計算ルール           |
| [taxable-investment-simulator.md](taxable-investment-simulator.md) | 課税口座の投資信託シミュレーターの税制前提、入力、計算ルール |
| [ideco-simulator.md](ideco-simulator.md)                           | iDeCoの制度前提、掛金上限、税軽減額、計算ルール              |

## 設計書

| 文書                               | 内容                                                                 |
| ---------------------------------- | -------------------------------------------------------------------- |
| [architecture.md](architecture.md) | ディレクトリ構成、レイヤー、ToolLayout、metadata、SEO、Static Export |

## 方針

| 文書                                                             | 内容                                                                  |
| ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| [design-principles.md](design-principles.md)                     | 公開WebツールとしてのUI、ブランド、ナビゲーション、マスコット利用方針 |
| [language-policy.md](language-policy.md)                         | 日本語UIを基本とする文言、翻訳、専門用語の扱い                        |
| [japanese-writing-guidelines.md](japanese-writing-guidelines.md) | AIエージェント向けの自然な日本語、UI文言のレビュー基準                |
| [advertising-policy.md](advertising-policy.md)                   | 広告の掲載場所、プライバシー方針、人間側の導入確認事項                |

## ルール・手順

| 文書                               | 内容                                           |
| ---------------------------------- | ---------------------------------------------- |
| [contributing.md](contributing.md) | 新しいツールの追加、テスト、レビュー、禁止事項 |

## 文書の追加ルール

- 要件は要件・計画に分類する
- 技術構成や責務分担は設計書に分類する
- ブランドやUXの判断基準は方針に分類する
- 開発手順やレビュー基準はルール・手順に分類する
- 新しい文書を追加したら、この一覧とルートREADMEの該当リンクを更新する
- 同じ内容を複数文書へコピーせず、参照リンクでつなぐ
