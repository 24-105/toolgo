export const legalLastUpdated = "2026年8月5日";

export const toolgoRepositoryUrl = "https://github.com/24-105/toolgo";
export const toolgoIssuesUrl = `${toolgoRepositoryUrl}/issues`;

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export const aboutSections: LegalSection[] = [
  {
    heading: "運営主体とToolGoについて",
    paragraphs: [
      "ToolGoは、開発、文章、画像、計算などの日常的な作業に使える無料のブラウザツール集です。必要なツールを選び、入力と結果の確認をこのサイトだけで行えるようにしています。",
      "運営主体は、ToolGoプロジェクトとして本サイトの公開・保守を行う運営者です。公開ソースコードと更新履歴は、次のGitHubリポジトリで確認できます。",
    ],
    items: [toolgoRepositoryUrl],
  },
  {
    heading: "提供している機能",
    paragraphs: [
      "JSONやCSVの整形・変換、パスワードやUUIDの生成、QRコードの作成、文章の文字数・差分確認、画像圧縮、給与・税金・日付・単位の計算などを提供しています。",
      "各ツールのページには、用途、使い方、利用例、注意事項を掲載しています。計算結果や変換結果は、必要に応じて利用先の仕様も確認してください。",
    ],
  },
  {
    heading: "入力データの扱い",
    paragraphs: [
      "ツールの処理は原則として利用者のブラウザ内で行います。入力した文章、ファイル、URL、日付、数値などをToolGoのサーバーへ送信・保存する機能は実装していません。",
      "テーマ設定は表示のためにブラウザのlocalStorageへ保存します。アクセス解析や将来追加する外部サービスについては、プライバシーポリシーに実際の設定を記載します。",
    ],
  },
  {
    heading: "お問い合わせ",
    paragraphs: [
      "機能の不具合、改善提案、掲載内容に関する連絡は、お問い合わせページに記載したGitHub Issuesから受け付けています。",
    ],
  },
];

export const contactSections: LegalSection[] = [
  {
    heading: "お問い合わせ窓口",
    paragraphs: [
      "ToolGoへの連絡は、GitHubリポジトリのIssuesをご利用ください。機能の不具合、改善提案、プライバシーや掲載内容に関する連絡を受け付けています。",
    ],
    items: [toolgoIssuesUrl],
  },
  {
    heading: "投稿時のお願い",
    paragraphs: [
      "公開Issueへ投稿する内容には、パスワード、個人情報、非公開の業務データなどの秘密情報を入力しないでください。入力データはこのサイトのツール内で処理し、問い合わせへの投稿はGitHubへ送信されます。",
      "緊急の連絡、個別のサポート、返信期限の指定には対応できない場合があります。",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "1. はじめに",
    paragraphs: [
      "ToolGo（以下「本サイト」）は、ブラウザで使える無料ツールを提供しています。本サイトを利用した時点で、この利用規約に同意したものとします。",
      "利用者は、法令と公序良俗を守り、自分の責任で本サイトを利用するものとします。アカウント登録や有料契約は必要ありません。",
    ],
  },
  {
    heading: "2. サービスと免責事項",
    paragraphs: [
      "本サイトのツールは、入力内容の整形、変換、計算などを補助するものです。結果の正確性や完全性を保証するものではありません。契約、申請、医療、金融など重要な判断に使う場合は、別の方法でも確認してください。",
      "本サイトの利用、または利用できなかったことによって生じた損害について、運営者に故意または重過失がある場合を除き、運営者は責任を負いません。",
    ],
  },
  {
    heading: "3. 禁止事項",
    paragraphs: ["本サイトの利用にあたり、次の行為を禁止します。"],
    items: [
      "法令または公序良俗に反する行為",
      "本サイトに過度な負荷をかける行為や、不正アクセス、脆弱性の悪用",
      "本サイトの文章、画像、プログラムなどを無断で転載・再配布する行為",
      "他人の権利や利益を侵害する行為",
    ],
  },
  {
    heading: "4. 著作権と外部リンク",
    paragraphs: [
      "本サイトの名称、ロゴ、文章、画像、プログラムなどの権利は、別途表示がある場合を除き、ToolGoまたは正当な権利者に帰属します。利用者は、法令で認められる範囲を超えて、これらを無断で転載・改変・再配布しないものとします。",
      "本サイトからリンクしている外部サイトの内容やサービスについて、運営者は責任を負いません。",
    ],
  },
  {
    heading: "5. サービスの変更・停止",
    paragraphs: [
      "運営者は、保守、障害、セキュリティ対応などのため、本サイトの内容を変更・停止・終了することがあります。",
    ],
  },
  {
    heading: "6. 規約の変更",
    paragraphs: [
      "この規約は、必要に応じて変更することがあります。変更後の規約は、本サイトに掲載した時点で効力を生じます。",
    ],
  },
  {
    heading: "7. 準拠法",
    paragraphs: ["この規約は日本法に準拠します。"],
  },
];

export const privacySections: LegalSection[] = [
  {
    heading: "1. 基本方針",
    paragraphs: [
      "ToolGo（以下「本サイト」）は、個人情報の保護に関する法令を守り、利用者の情報を適切に扱います。",
      "本サイトにはアカウント登録やお問い合わせフォームがなく、氏名、住所、メールアドレスなどの個人情報を直接取得していません。",
    ],
  },
  {
    heading: "2. ツールへの入力内容",
    paragraphs: [
      "ツールに入力したJSON、文章、URL、生年月日などは、利用者のブラウザ内だけで処理されます。入力内容が本サイトのサーバーへ送信・保存されることはありません。",
    ],
  },
  {
    heading: "3. Cookieとブラウザへの保存",
    paragraphs: [
      "本サイトは、テーマ設定（ライト・ダーク）をブラウザのlocalStorageに保存します。この情報は表示設定にのみ使われ、本サイトのサーバーへ送信されません。",
      "Google Analyticsを有効にした公開ビルドでは、利用状況を把握するためGoogle Analyticsを使用します。Google AnalyticsはCookieなどを利用して、閲覧したページ、利用環境、アクセス日時などの情報を収集します。収集された情報はGoogleのプライバシーポリシーに基づいて管理されます。無効にしたビルドでは、Google Analyticsのスクリプトを読み込みません。",
    ],
    items: [
      "Google Analytics: https://policies.google.com/technologies/partner-sites",
      "Google プライバシーポリシー: https://policies.google.com/privacy",
    ],
  },
  {
    heading: "4. GitHub Pagesについて",
    paragraphs: [
      "本サイトはGitHub Pagesで公開しています。アクセスに伴うIPアドレス、ブラウザ情報、アクセス日時などの扱いについては、GitHubのプライバシーポリシーが適用されます。",
    ],
    items: [
      "GitHub Privacy Statement: https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement",
    ],
  },
  {
    heading: "5. 広告について",
    paragraphs: [
      "現在、本サイトではGoogle AdSenseなどの広告を配信していません。将来、Google AdSenseなどを導入する場合は、広告用Cookie、第三者配信事業者による情報利用、パーソナライズド広告の扱い、必要な同意方法について、このポリシーを更新してから開始します。第三者配信事業者は、広告の配信や効果測定のためにCookieを使用する可能性があります。",
    ],
  },
  {
    heading: "6. 個人情報、お問い合わせ、変更",
    paragraphs: [
      "本サイトにはアカウント登録や問い合わせフォームがないため、ToolGoのツール入力を通じて氏名、住所、メールアドレスなどの個人情報を直接取得することはありません。お問い合わせをGitHub Issuesへ投稿する場合は、その情報がGitHubへ送信されます。",
      "本ポリシーに関するお問い合わせは、お問い合わせページに記載したToolGoのGitHubリポジトリのIssueで受け付けます。",
      "本サイトの機能や利用する外部サービスの変更に応じて、このポリシーを変更することがあります。変更後の内容は、本サイトに掲載した時点で適用します。",
    ],
    items: [toolgoIssuesUrl],
  },
];
