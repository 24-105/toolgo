# ToolGo MVP公開チェックリスト

Phase 8では、広告を無効にした状態でToolGoをGitHub Pagesへ公開します。公開前にこのチェックリストを確認します。

## リポジトリ側で確認すること

- [ ] 公開対象の変更が`main`に入っている
- [ ] `main`上のコミットからリリースタグを作成している
- [ ] `npm run format:check` が成功する
- [ ] `npm run lint` が成功する
- [ ] `npm run build` が成功する
- [ ] 5つのMVPツールが静的HTMLとして生成される
- [ ] `sitemap.xml` と `robots.txt` が生成される
- [ ] `NEXT_PUBLIC_ADS_ENABLED=false` のままになっている
- [ ] ユーザー入力を送信する外部APIや解析処理がない

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
https://<GitHubユーザー名>.github.io/<リポジトリ名>/
```

独自ドメインを使う場合は、デプロイワークフローの `NEXT_PUBLIC_SITE_URL` と `NEXT_PUBLIC_BASE_PATH` を変更し、GitHub PagesのCustom domainも設定します。canonical、OGP、sitemap、robotsのURLが本番URLになっていることを確認します。

## 公開後のブラウザ確認

- [ ] Chrome、Safari、Firefoxで表示できる
- [ ] スマートフォン幅で入力欄とボタンを操作できる
- [ ] キーボードだけで入力・実行・コピーができる
- [ ] JSON整形のエラーが分かりやすい
- [ ] パスワード生成結果をコピーできる
- [ ] QRコードをPNGで保存できる
- [ ] 文字数が入力中に更新される
- [ ] 年齢計算の日付エラーが分かりやすい
- [ ] 広告が表示されていない
- [ ] ブラウザのコンソールにエラーがない

## 人間側で確定すること

- [ ] 公開URLと独自ドメインの有無
- [ ] プライバシーに関する公開文書の内容
- [ ] 利用規約・免責事項の内容
- [ ] 問い合わせ先
- [ ] ライセンス表記

法律や広告に関する文章は、公開前に運営者が内容を確認してください。
