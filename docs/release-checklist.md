# ToolGo本番公開チェックリスト

ToolGoをGitHub Pagesへ本番公開するときに確認するチェックリストです。広告やアクセス解析を有効にする場合は、実際の設定とプライバシー表示が一致していることも確認します。

## リポジトリ側で確認すること

- [ ] 公開対象の変更が`main`に入っている
- [ ] `main`上のコミットからリリースタグを作成している
- [ ] `npm run format:check` が成功する
- [ ] `npm run lint` が成功する
- [ ] `npm run build` が成功する
- [ ] registryのavailableツール43件が静的HTMLとして生成される
- [ ] `sitemap.xml` と `robots.txt` が生成される
- [ ] 広告を有効にする場合、Publisher ID・広告枠ID・同意要件を確認している
- [ ] ユーザー入力を送信する外部APIがない。Analyticsを有効化する場合は測定ID、プライバシー記載、送信内容を確認する

## GitHub側で必要な設定

- [ ] リポジトリのSettings → Pagesで、公開元をGitHub Actionsに設定する
- [ ] Actionsが使用できる状態になっている
- [ ] `GITHUB_TOKEN`にPagesへの書き込み権限がある
- [ ] GitHub Actionsの「Run workflow」でリリースタグを選択して実行する
- [ ] `Deploy to GitHub Pages` が成功する
- [ ] 公開URLでトップページを開ける
- [ ] 公開URLで各ツールを直接開ける
- [ ] ツールページを再読み込みしても表示できる

## URL設定

標準設定では、プロジェクトサイトとして次のURLを使います。

```text
https://toolgo.jp/
```

独自ドメイン `toolgo.jp` を使う場合は、デプロイワークフローの `NEXT_PUBLIC_SITE_URL` を `https://toolgo.jp` に設定し、`NEXT_PUBLIC_BASE_PATH` は空にします。GitHub PagesのCustom domainにも `toolgo.jp` を設定し、canonical、OGP、sitemap、robotsのURLが本番URLになっていることを確認します。

## 公開後のブラウザ確認

- [ ] Chrome、Safari、Firefoxで表示できる
- [ ] スマートフォン幅で入力欄とボタンを操作できる
- [ ] キーボードだけで入力・実行・コピーができる
- [ ] 主要カテゴリから代表ツールを選び、入力・結果・エラー表示を確認する
- [ ] コピー、ダウンロード、ファイル入力など、各ツール固有の操作を確認する
- [ ] NISA、投資信託、iDeCoのシミュレーターで入力上限、計算結果、グラフ表示を確認する
- [ ] 広告スクリプトが読み込まれ、広告枠が設定されている場合だけ広告が表示される
- [ ] ブラウザのコンソールにエラーがない
- [ ] Search Consoleでsitemapを送信し、主要ページをURL検査する
- [ ] 本番ページのtitle、description、canonical、robots、sitemap、OGPを確認する
- [ ] Analyticsを使う場合だけ、タグが本番URLで読み込まれ、意図した測定IDに送信される。使わない場合はタグがない

## 人間側で確定すること

- [ ] 公開URLと独自ドメインの有無
- [ ] プライバシーに関する公開文書の内容
- [ ] 利用規約・免責事項の内容
- [ ] 問い合わせ先
- [ ] ライセンス表記

法律や広告に関する文章、広告・解析の設定は、公開前に運営者が内容を確認してください。
