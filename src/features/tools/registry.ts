import { AgeCalculator } from "./age-calculator/AgeCalculator";
import { CharacterCounter } from "./character-counter/CharacterCounter";
import { JsonFormatter } from "./json-formatter/JsonFormatter";
import { PasswordGenerator } from "./password-generator/PasswordGenerator";
import { QrCodeGenerator } from "./qr-code-generator/QrCodeGenerator";
import type { ToolDefinition } from "./types";

export const categoryRegistry = [
  { slug: "development", name: "開発", description: "コードやデータの整形・変換" },
  { slug: "security", name: "セキュリティ", description: "パスワードなどを安全に作成" },
  { slug: "generation", name: "生成", description: "QRコードなどを作成" },
  { slug: "writing", name: "文章", description: "文章の文字数や行数を確認" },
  { slug: "calculation", name: "計算", description: "日付や数値を計算" },
] as const;

const toolMetadata: ToolDefinition[] = [
  {
    slug: "json-formatter",
    name: "JSON整形",
    description: "JSONを読みやすく整形し、構文エラーも確認できます。",
    category: "開発",
    keywords: ["JSON", "整形", "開発ツール"],
    icon: "code",
    isMvp: true,
    status: "available",
    component: JsonFormatter,
    details: {
      overview:
        "JSON整形は、改行やインデントがないJSONを読みやすい形に整えるツールです。設定ファイルやAPIのレスポンスを確認するときに、データの階層や項目の対応関係をすばやく把握できます。入力内容にJSONとして解釈できない部分がある場合は、エラーの内容も確認できます。",
      howToUse: [
        "入力欄にJSONを貼り付けます。入力欄にはサンプルが薄く表示されているため、そのまま上書きできます。",
        "「整形する」を押すと、読みやすいインデント付きのJSONが表示されます。",
        "必要に応じて「コピーする」で結果をクリップボードへコピーします。",
      ],
      notes: [
        "文字列の中身ではなく、JSON全体の構文を確認します。JSON以外のテキストやコメントには対応していません。",
      ],
      faq: [
        {
          question: "JSONのエラー位置は分かりますか？",
          answer:
            "JSONとして読み込めない場合は、ブラウザが返すエラー内容をもとに入力ミスを確認できます。エラー位置の表示方法はブラウザによって異なります。",
        },
        {
          question: "整形したJSONを保存できますか？",
          answer:
            "整形結果はコピーできます。ファイルとして保存したい場合は、コピーした内容をテキストエディターなどに貼り付けて保存してください。",
        },
      ],
    },
  },
  {
    slug: "password-generator",
    name: "パスワード生成",
    description: "安全なパスワードを、このブラウザだけで作れます。",
    category: "セキュリティ",
    keywords: ["パスワード", "生成", "セキュリティ"],
    icon: "key",
    isMvp: true,
    status: "available",
    component: PasswordGenerator,
    details: {
      overview:
        "パスワード生成は、指定した長さと文字の種類から、推測されにくいパスワードを作るツールです。自分で文字を考える必要がないため、サービスごとに異なるパスワードを用意したいときに役立ちます。",
      howToUse: [
        "パスワードの長さを選びます。長くするほど、総当たりで推測されにくくなります。",
        "大文字・小文字・数字・記号の使用有無を選びます。",
        "「生成する」を押し、作成されたパスワードをコピーします。",
      ],
      notes: [
        "使用する記号は `!#$%&()*+,-./:;=?@[]^_{|}~` です。環境によって入力できない記号がある場合は、記号を外して作り直してください。",
        "作成したパスワードは、パスワード管理アプリなどで安全に保管してください。",
      ],
      faq: [
        {
          question: "どのくらい長いパスワードにすればよいですか？",
          answer:
            "サービスのルールが許す範囲で、12文字以上を目安に長くすることをおすすめします。サービスごとに別のパスワードを使うことも大切です。",
        },
        {
          question: "生成したパスワードをToolGoが保存することはありますか？",
          answer:
            "生成したパスワードをToolGoのサーバーへ送信したり、保存したりすることはありません。画面を閉じると、表示中の結果も失われます。",
        },
      ],
    },
  },
  {
    slug: "qr-code-generator",
    name: "QRコード生成",
    description: "文字やURLをQRコードに変換します。",
    category: "生成",
    keywords: ["QRコード", "生成", "URL"],
    icon: "qr",
    isMvp: true,
    status: "available",
    component: QrCodeGenerator,
    details: {
      overview:
        "QRコード生成は、文字やURLをスマートフォンなどで読み取れるQRコードに変換するツールです。WebページのURL、連絡先、短いメッセージなどを、画像として共有したいときに利用できます。",
      howToUse: [
        "入力欄にURLやメッセージを入力します。URLを使う場合は `https://` から入力してください。",
        "「生成する」を押すと、入力内容をもとにQRコードが表示されます。",
        "表示されたQRコードを確認し、必要に応じて画像としてダウンロードします。",
      ],
      notes: [
        "QRコードを配布する前に、スマートフォンで正しく読み取れることと、移動先が正しいことを確認してください。",
        "入力できる情報量には上限があります。長い文章や複雑なデータは、短いURLなどにまとめると読み取りやすくなります。",
      ],
      faq: [
        {
          question: "作ったQRコードはどの形式で保存できますか？",
          answer:
            "表示されたQRコードを画像としてダウンロードできます。印刷や共有の前に、保存した画像も読み取れるか確認してください。",
        },
        {
          question: "QRコードの中身を後から変更できますか？",
          answer:
            "QRコード自体を書き換えることはできません。内容を変更したい場合は、新しい内容を入力してもう一度生成してください。",
        },
      ],
    },
  },
  {
    slug: "character-counter",
    name: "文字数カウント",
    description: "文章の文字数や行数を数えます。",
    category: "文章",
    keywords: ["文字数", "カウント", "文章"],
    icon: "text",
    isMvp: true,
    status: "available",
    component: CharacterCounter,
    details: {
      overview:
        "文字数カウントは、入力した文章の文字数や行数を確認するツールです。レポート、応募書類、SNS投稿、記事など、文字数の上限や目安が決まっている文章の確認に使えます。",
      howToUse: [
        "入力欄に文章を貼り付けるか、その場で入力します。",
        "文字数、空白を除いた文字数、行数などの集計結果を確認します。",
        "文章を修正すると、集計結果は自動的に更新されます。",
      ],
      notes: [
        "改行は行数として数えます。空白や改行を文字数に含めるかどうかは、表示される項目ごとに確認してください。",
        "実際の応募フォームやサービス側の数え方と異なる場合があるため、提出前に入力先でも確認してください。",
      ],
      faq: [
        {
          question: "空白や改行も文字数に含まれますか？",
          answer:
            "通常の文字数と、空白を除いた文字数を分けて確認できます。改行は行数として集計されます。",
        },
        {
          question: "日本語と英数字で数え方は変わりますか？",
          answer:
            "入力された文字を同じ1文字として数えます。提出先に文字数の定義がある場合は、その規定を優先してください。",
        },
      ],
    },
  },
  {
    slug: "age-calculator",
    name: "年齢計算",
    description: "誕生日から、今日の年齢と次の誕生日までの日数を計算します。",
    category: "計算",
    keywords: ["年齢", "計算", "生年月日"],
    icon: "calendar",
    isMvp: true,
    status: "available",
    component: AgeCalculator,
    details: {
      overview:
        "年齢計算は、生年月日と基準日から満年齢、次の誕生日までの日数、次の誕生日を計算するツールです。誕生日を入力して、今日時点の年齢を確認したいときに利用できます。基準日を変更すれば、特定の日付時点の年齢も確認できます。",
      howToUse: [
        "「誕生日」に生年月日を入力します。",
        "「今日」に基準日を入力します。初期値は現在の日付です。",
        "「計算する」を押すと、満年齢と次の誕生日までの日数が表示されます。",
      ],
      notes: [
        "入力した日付を日本時間の暦日として計算します。",
        "2月29日生まれの方は、うるう年でない年も2月28日を誕生日として計算します。",
        "公的な手続きや契約で必要な年齢判定には使用せず、提出先の基準を確認してください。",
      ],
      faq: [
        {
          question: "今日の日付は自動で入りますか？",
          answer:
            "基準日には、ページを開いた時点の日本時間の日付が初期値として入ります。別の日付を指定して計算することもできます。",
        },
        {
          question: "2月29日生まれの場合はどう計算しますか？",
          answer:
            "うるう年でない年は、2月28日を誕生日として満年齢と次の誕生日までの日数を計算します。",
        },
      ],
    },
  },
];

export const toolRegistry: ToolDefinition[] = toolMetadata;

export function getTools() {
  return toolRegistry;
}

export function getToolBySlug(slug: string) {
  return toolRegistry.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string) {
  return toolRegistry.filter((tool) => tool.category === category);
}

export function getCategories() {
  return categoryRegistry;
}

export function getCategoryBySlug(slug: string) {
  return categoryRegistry.find((category) => category.slug === slug);
}
