import { AgeCalculator } from "./age-calculator/AgeCalculator";
import { BusinessDayCalculator } from "./business-day-calculator/BusinessDayCalculator";
import { CharacterCounter } from "./character-counter/CharacterCounter";
import { FuelCostCalculator } from "./fuel-cost-calculator/FuelCostCalculator";
import { HouseholdBudgetCalculator } from "./household-budget-calculator/HouseholdBudgetCalculator";
import { JsonFormatter } from "./json-formatter/JsonFormatter";
import { PasswordGenerator } from "./password-generator/PasswordGenerator";
import { QrCodeGenerator } from "./qr-code-generator/QrCodeGenerator";
import { Base64Converter } from "./base64-converter/Base64Converter";
import { ColorConverter } from "./color-converter/ColorConverter";
import { CsvTsvConverter } from "./csv-tsv-converter/CsvTsvConverter";
import { HashGenerator } from "./hash-generator/HashGenerator";
import { ImageCompressor } from "./image-compressor/ImageCompressor";
import { ImageResizer } from "./image-resizer/ImageResizer";
import { JsonDiff } from "./json-diff/JsonDiff";
import { MarkdownPreview } from "./markdown-preview/MarkdownPreview";
import { HolidayCalendar } from "./holiday-calendar/HolidayCalendar";
import { PercentageCalculator } from "./percentage-calculator/PercentageCalculator";
import { PhotoPrintLayout } from "./photo-print-layout/PhotoPrintLayout";
import { QrCodeReader } from "./qr-code-reader/QrCodeReader";
import { RegexTester } from "./regex-tester/RegexTester";
import { RecipePortionCalculator } from "./recipe-portion-calculator/RecipePortionCalculator";
import { SalePriceCalculator } from "./sale-price-calculator/SalePriceCalculator";
import { TextDiff } from "./text-diff/TextDiff";
import { TextTransformer } from "./text-transformer/TextTransformer";
import { TravelBudgetCalculator } from "./travel-budget-calculator/TravelBudgetCalculator";
import { UnitPriceComparator } from "./unit-price-comparator/UnitPriceComparator";
import { UrlEncoderDecoder } from "./url-encoder-decoder/UrlEncoderDecoder";
import { UuidGenerator } from "./uuid-generator/UuidGenerator";
import { BillSplitter } from "./bill-splitter/BillSplitter";
import { CronDebugger } from "./cron-debugger/CronDebugger";
import { CssClampGenerator } from "./css-clamp-generator/CssClampGenerator";
import { DateCalculator } from "./date-calculator/DateCalculator";
import { SalaryTakeHome } from "./salary-take-home/SalaryTakeHome";
import { SavingsGoalCalculator } from "./savings-goal-calculator/SavingsGoalCalculator";
import { SleepTimeCalculator } from "./sleep-time-calculator/SleepTimeCalculator";
import { TaxCalculator } from "./tax-calculator/TaxCalculator";
import { UnitConverter } from "./unit-converter/UnitConverter";
import { UnicodeNormalizerChecker } from "./unicode-normalizer-checker/UnicodeNormalizerChecker";
import { VlsmSubnetPlanner } from "./vlsm-subnet-planner/VlsmSubnetPlanner";
import { NisaTsumitateSimulator } from "./nisa-tsumitate-simulator/NisaTsumitateSimulator";
import { TaxableInvestmentSimulator } from "./taxable-investment-simulator/TaxableInvestmentSimulator";
import { IdecoSimulator } from "./ideco-simulator/IdecoSimulator";
import type { ToolDefinition, ToolPurpose } from "./types";

export const categoryRegistry = [
  {
    slug: "development",
    name: "開発",
    description: "コードやデータの整形・変換",
    seoHeading: "開発者向け無料ツール",
    seoTitle: "開発者向け無料ツール集｜JSON・URL・Base64変換",
    seoDescription:
      "JSON整形、URLエンコード、Base64変換、UUID生成など、開発作業に使える無料ブラウザツールをまとめています。入力データは外部へ送信しません。",
    seoIntro:
      "APIレスポンスや設定ファイルのJSONを読みやすく整えたり、URL・Base64の変換、UUIDやCSVの確認をしたりできます。開発中のちょっとした確認を、ソフトウェアを追加せずブラウザだけで進められます。",
    seoKeywords: ["開発者向け無料ツール", "開発ツール 無料", "JSON整形", "URLエンコード"],
  },
  {
    slug: "security",
    name: "セキュリティ",
    description: "パスワードなどを安全に作成",
    seoHeading: "セキュリティ向け無料ツール",
    seoTitle: "セキュリティ向け無料ツール｜パスワード・ハッシュ生成",
    seoDescription:
      "パスワード生成とSHA-256・SHA-512ハッシュ生成など、ブラウザ内で使える無料のセキュリティツールをまとめています。",
    seoIntro:
      "サービスごとのパスワード作成や、入力文字列からハッシュ値を確認する作業に使えます。生成・計算はブラウザ内で行いますが、ハッシュ化は暗号化や秘密情報の保管そのものではないため、用途を確認して利用してください。",
    seoKeywords: ["セキュリティツール 無料", "パスワード生成", "ハッシュ生成", "SHA-256"],
  },
  {
    slug: "generation",
    name: "生成",
    description: "QRコードなどを作成",
    seoHeading: "無料生成ツール",
    seoTitle: "無料生成ツール｜QRコード・文字列を作成",
    seoDescription:
      "URLや文字列からQRコードを作成できる、無料のブラウザ生成ツールを紹介します。入力データは外部へ送信しません。",
    seoIntro:
      "URLや任意の文字列からQRコードを作成し、画像として保存できます。手元の画像に含まれるQRコードを読み取る機能もあり、イベント案内や資料共有などの準備をブラウザ内で行えます。",
    seoKeywords: [
      "生成ツール 無料",
      "QRコード生成",
      "QRコード作成",
      "オンライン生成ツール",
    ],
  },
  {
    slug: "writing",
    name: "文章",
    description: "文章の文字数や行数を確認",
    seoHeading: "文章作成・確認に使える無料ツール",
    seoTitle: "文章作成・確認に使える無料ツール",
    seoDescription:
      "文字数カウント、テキスト差分比較、Markdownプレビューなど、文章の作成と確認に使える無料ツールをまとめています。",
    seoIntro:
      "応募書類や投稿文の文字数を確認したり、文章・コードの変更箇所を比べたりできます。Markdownの見出しや装飾もその場で確認でき、下書きの整理から提出前のチェックまで使えます。",
    seoKeywords: [
      "文章作成ツール 無料",
      "文字数カウント",
      "文章比較",
      "Markdownプレビュー",
    ],
  },
  {
    slug: "calculation",
    name: "計算",
    description: "日付や数値を計算",
    seoHeading: "無料計算ツール",
    seoTitle: "無料計算ツール集｜年齢・日付・税金を計算",
    seoDescription:
      "年齢、日付、税込・税抜、割り勘など、日常の計算に使える無料オンラインツールを目的別に探せます。",
    seoIntro:
      "生年月日からの年齢、日付の差、割合、税込・税抜金額など、手計算しにくい数字を目的別に確認できます。制度や取引条件が関係する計算には注意事項も掲載しているため、結果の前提を確認して利用してください。",
    seoKeywords: ["計算ツール 無料", "年齢計算", "日付計算", "税金計算"],
  },
  {
    slug: "design",
    name: "デザイン",
    description: "色や画像を扱う",
    seoHeading: "デザイン向け無料ツール",
    seoTitle: "デザイン向け無料ツール｜カラーコード・画像圧縮",
    seoDescription:
      "HEX・RGB・HSLのカラーコード変換と画像圧縮を、インストール不要のブラウザ上で利用できます。",
    seoIntro:
      "HEX・RGB・HSLのカラーコードを相互に変換し、画像の容量削減やサイズ変更もできます。デザイン作業の途中で形式や数値を確認したいときに、インストール不要で利用できます。",
    seoKeywords: ["デザインツール 無料", "カラーコード変換", "画像圧縮", "HEX RGB変換"],
  },
  {
    slug: "daily",
    name: "日常生活",
    description: "暮らしの計算や換算",
    seoHeading: "暮らしの計算・換算ツール",
    seoTitle: "暮らしの計算・換算ツール｜無料オンラインツール",
    seoDescription:
      "給料の手取り、割り勘、貯金、営業日、燃料費、家計予算、単価比較など、暮らしに役立つ無料計算ツールをまとめています。",
    seoIntro:
      "給料の手取り、家計の残り予算、旅行費、燃料費、単価比較など、暮らしの見通しを立てる計算に使えます。制度や料金が変わるものは目安として結果を確認し、契約や申告では最新の公式情報を優先してください。",
    seoKeywords: [
      "生活計算ツール",
      "手取り計算",
      "割り勘計算",
      "貯金計算",
      "睡眠時間計算",
      "祝日カレンダー",
      "営業日計算",
      "燃料費計算",
      "家計予算",
      "単価比較",
      "旅行予算",
    ],
  },
] as const;

const toolMetadata: ToolDefinition[] = [
  {
    slug: "json-formatter",
    name: "JSON整形",
    description: "JSONを読みやすく整形し、構文エラーも確認できます。",
    seoTitle: "JSON整形ツール｜無料JSON Formatter・構文チェック",
    seoDescription:
      "JSONを貼り付けて、インデント付きに整形・圧縮できる無料ツールです。構文エラーの確認と結果のコピーまでブラウザ内で行え、入力データは外部へ送信しません。",
    seoKeywords: [
      "json formatter",
      "JSON整形",
      "JSON整形ツール",
      "JSON beautifier",
      "JSON構文チェック",
      "JSON online",
    ],
    category: "開発",
    keywords: ["JSON", "整形", "開発ツール"],
    icon: "code",
    isMvp: true,
    status: "available",
    component: JsonFormatter,
    details: {
      overview:
        "JSON整形は、改行やインデントがないJSONを読みやすい形に整えるツールです。設定ファイルやAPIのレスポンスを確認するときに、データの階層や項目の対応関係を把握できます。入力内容にJSONとして解釈できない部分がある場合は、エラーの内容も確認できます。",
      example:
        "APIから返ってきた一行のJSONを貼り付け、インデント付きに整えて項目の抜けや括弧の閉じ忘れを確認します。",
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
    slug: "json-diff",
    name: "JSON差分比較",
    description: "2つのJSONを整形し、追加・削除された部分を比較します。",
    seoTitle: "JSON差分比較｜無料JSON Diff・変更箇所を確認",
    seoDescription:
      "変更前と変更後のJSONを貼り付けて、追加・削除された項目を比較できる無料ツールです。JSONを整形して差分を表示し、入力データは外部へ送信しません。",
    seoKeywords: [
      "JSON差分比較",
      "JSON diff",
      "JSON比較",
      "JSON変更箇所",
      "JSON Diff online",
    ],
    category: "開発",
    keywords: ["JSON", "差分", "比較", "Diff", "開発ツール"],
    icon: "diff",
    isMvp: false,
    status: "available",
    component: JsonDiff,
    details: {
      overview:
        "JSON差分比較は、2つのJSONを整形して、追加・削除された行や共通部分を確認するツールです。APIレスポンスや設定ファイルの変更を確認するときに役立ちます。",
      example:
        "APIの変更前後のレスポンスを貼り付け、新しく追加された項目や削除された項目を確認します。",
      howToUse: [
        "変更前のJSONを左側に、変更後のJSONを右側に貼り付けます。",
        "「差分を比較する」を押します。",
        "+が追加、-が削除された部分として表示される結果を確認します。",
      ],
      notes: [
        "比較前にJSONを整形するため、項目の並び順が変わっている場合も差分として表示されることがあります。",
        "比較できるJSONは、それぞれ1,000行以内です。",
      ],
      faq: [
        {
          question: "JSONの構文エラーも確認できますか？",
          answer:
            "はい。変更前と変更後のどちらかが正しいJSONでない場合は、比較せずに入力の構文を確認するよう案内します。",
        },
        {
          question: "JSONの項目の順番が違う場合も比較できますか？",
          answer:
            "JSONとして整形してから行単位で比較します。項目の順番が変わっている場合は、その部分が差分として表示されます。",
        },
      ],
    },
  },
  {
    slug: "password-generator",
    name: "パスワード生成",
    description: "推測されにくいパスワードを、このブラウザだけで作れます。",
    seoTitle: "パスワードジェネレーター｜無料パスワード生成ツール",
    seoDescription:
      "長さと大文字・小文字・数字・記号を指定して、推測されにくいパスワードを作れます。生成とコピーはブラウザ内で完結し、結果をサーバーへ送信・保存しません。",
    seoKeywords: [
      "パスワード生成",
      "パスワードジェネレーター",
      "ランダムパスワード",
      "強力なパスワード",
      "password generator",
    ],
    category: "セキュリティ",
    keywords: ["パスワード", "生成", "セキュリティ"],
    icon: "key",
    isMvp: true,
    status: "available",
    component: PasswordGenerator,
    details: {
      overview:
        "パスワード生成は、指定した長さと文字の種類から、推測されにくいパスワードを作るツールです。自分で文字を考える必要がないため、サービスごとに異なるパスワードを用意したいときに役立ちます。",
      example:
        "新しく登録するサービスの条件に合わせて16文字以上・数字と記号を含む設定にし、生成結果をパスワード管理アプリへ保存します。",
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
    seoTitle: "QRコード生成｜無料でURL・文字列をQR化",
    seoDescription:
      "URLや文字列を入力してQRコードを作成し、画像としてダウンロードできる無料ツールです。入力内容はブラウザ内で処理し、外部へ送信しません。",
    seoKeywords: [
      "QRコード生成",
      "QRコード作成",
      "QRコード 無料",
      "URL QRコード",
      "QR code generator",
    ],
    category: "生成",
    keywords: ["QRコード", "生成", "URL"],
    icon: "qr",
    isMvp: true,
    status: "available",
    component: QrCodeGenerator,
    details: {
      overview:
        "QRコード生成は、文字やURLをスマートフォンなどで読み取れるQRコードに変換するツールです。WebページのURL、連絡先、短いメッセージなどを、画像として共有したいときに利用できます。",
      example:
        "イベント案内ページのURLを入力してQRコードを作成し、チラシや資料へ貼り付けます。",
      howToUse: [
        "入力欄にURLやメッセージを入力します。URLを使う場合は `https://` から入力してください。",
        "入力内容をもとにQRコードが自動で表示されます。",
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
    slug: "qr-code-reader",
    name: "QRコード読み取り",
    description: "画像からQRコードの内容を読み取ります。",
    seoTitle: "QRコード読み取り｜無料で画像からQRコードを解析",
    seoDescription:
      "QRコードが含まれた画像を選択して、内容を読み取れる無料ツールです。画像の解析はブラウザ内で行い、入力データを外部へ送信しません。",
    seoKeywords: [
      "QRコード読み取り",
      "QRコード解析",
      "QRコード リーダー",
      "QR code reader",
      "画像 QRコード 読み取り",
    ],
    category: "生成",
    keywords: ["QRコード", "読み取り", "解析", "画像"],
    icon: "qr",
    isMvp: false,
    status: "available",
    component: QrCodeReader,
    details: {
      overview:
        "QRコード読み取りは、保存した画像に含まれるQRコードの内容を確認するツールです。URLやテキストを手入力せずに確認したいときに使えます。",
      example:
        "スクリーンショットや保存した案内画像を選択し、QRコードに含まれるURLやメッセージを確認します。",
      howToUse: [
        "QRコードが含まれた画像を選択します。",
        "「読み取る」を押します。",
        "表示された内容を確認し、必要に応じてコピーします。",
      ],
      notes: [
        "現在は保存済み画像の読み取りに対応しています。カメラ撮影には対応していません。",
        "ブラウザのBarcodeDetector APIに対応していない環境では利用できません。",
      ],
      faq: [
        {
          question: "カメラでQRコードを読み取れますか？",
          answer: "現在はカメラ撮影ではなく、保存済みの画像を選択して読み取る方式です。",
        },
        {
          question: "読み取った画像はサーバーへ送信されますか？",
          answer:
            "画像の解析はブラウザ内で行います。選択した画像や読み取り結果をToolGoのサーバーへ送信・保存しません。",
        },
      ],
    },
  },
  {
    slug: "character-counter",
    name: "文字数カウント",
    description: "文章の文字数や行数を数えます。",
    seoTitle: "文字数カウント｜無料で文字数・単語数・行数を計測",
    seoDescription:
      "文章を貼り付けるだけで、文字数、空白を除く文字数、単語数、行数を確認できます。応募書類やSNS投稿の文字数確認に使え、入力データは外部へ送信しません。",
    seoKeywords: [
      "文字数カウント",
      "文字数計算",
      "文字数制限",
      "単語数カウント",
      "行数カウント",
    ],
    category: "文章",
    keywords: ["文字数", "カウント", "文章"],
    icon: "text",
    isMvp: true,
    status: "available",
    component: CharacterCounter,
    details: {
      overview:
        "文字数カウントは、入力した文章の文字数や行数を確認するツールです。レポート、応募書類、SNS投稿、記事など、文字数の上限や目安が決まっている文章の確認に使えます。",
      example:
        "応募フォームに貼り付ける文章を入力し、空白を含む文字数と含まない文字数を確認してから提出します。",
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
    slug: "text-transformer",
    name: "全角半角・文字変換",
    description: "全角半角、大文字小文字、空白や改行を変換します。",
    seoTitle: "全角半角変換・文字変換｜無料テキスト変換ツール",
    seoDescription:
      "文章の全角・半角、大文字・小文字、行頭行末の空白、改行を変換できる無料ツールです。入力内容はブラウザ内で処理し、外部へ送信しません。",
    seoKeywords: [
      "全角半角変換",
      "全角 半角 変換",
      "大文字 小文字 変換",
      "文字変換",
      "テキスト変換",
    ],
    category: "文章",
    keywords: ["全角", "半角", "大文字", "小文字", "文字変換"],
    icon: "text",
    isMvp: false,
    status: "available",
    component: TextTransformer,
    details: {
      overview:
        "全角半角・文字変換は、文章の文字幅や英字の大文字・小文字、空白と改行をまとめて整えるツールです。入力フォームやデータを貼り付ける前の整形に使えます。",
      example:
        "全角で入力された英数字を半角へ変換し、申込フォームやCSVへ貼り付けやすい状態に整えます。",
      howToUse: [
        "変換する文章を入力欄に貼り付けます。",
        "変換方法を選びます。",
        "「変換する」を押して、結果をコピーします。",
      ],
      notes: [
        "全角・半角変換は英数字と記号を中心に変換します。漢字やひらがなの字体は変わりません。",
        "入力内容はブラウザ内で処理し、ToolGoのサーバーへ送信しません。",
      ],
      faq: [
        {
          question: "日本語の文章も変換できますか？",
          answer:
            "はい。日本語を含む文章を入力できます。全角・半角変換では英数字と記号、空白などが変換対象になります。",
        },
        {
          question: "変換結果を保存できますか？",
          answer:
            "結果をコピーして、テキストエディターや入力先へ貼り付けられます。ToolGoは入力内容を保存しません。",
        },
      ],
    },
  },
  {
    slug: "age-calculator",
    name: "年齢計算",
    description:
      "誕生日から、指定した基準日時点の年齢と次の誕生日までの日数を計算します。",
    seoTitle: "年齢計算｜生年月日から満年齢・次の誕生日を計算",
    seoDescription:
      "生年月日と基準日を入力して、満年齢、次の誕生日、誕生日までの日数を計算できます。入力した日付はブラウザ内で処理し、外部へ送信しません。",
    seoKeywords: [
      "年齢計算",
      "年齢計算ツール",
      "満年齢計算",
      "生年月日 計算",
      "誕生日までの日数",
    ],
    category: "計算",
    keywords: ["年齢", "計算", "生年月日"],
    icon: "calendar",
    isMvp: true,
    status: "available",
    component: AgeCalculator,
    details: {
      overview:
        "年齢計算は、生年月日と基準日から満年齢、次の誕生日までの日数、次の誕生日を計算するツールです。誕生日を入力して、基準日時点の年齢を確認したいときに利用できます。基準日を変更すれば、特定の日付時点の年齢も確認できます。",
      example:
        "生年月日と確認したい基準日を入力し、旅行や記念日までの年齢と次の誕生日を確認します。",
      howToUse: [
        "「誕生日」に生年月日を入力します。",
        "「基準日」に確認したい日付を入力します。初期値は現在の日付です。",
        "「計算する」を押すと、満年齢と次の誕生日までの日数が表示されます。",
      ],
      notes: [
        "入力した日付を日本時間の暦日として計算します。",
        "2月29日生まれの方は、うるう年でない年も2月28日を誕生日として計算します。",
        "公的な手続きや契約で必要な年齢判定には使用せず、提出先の基準を確認してください。",
      ],
      faq: [
        {
          question: "基準日は自動で入りますか？",
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
  {
    slug: "percentage-calculator",
    name: "パーセント計算",
    description: "割合、増減率、割引後の価格を計算します。",
    seoTitle: "パーセント計算｜割合・増減率・割引を無料で計算",
    seoDescription:
      "割合、何パーセントかの計算、増減率、割引後の価格を入力して計算できる無料ツールです。買い物や売上の比較などに使え、処理はブラウザ内で完結します。",
    seoKeywords: [
      "パーセント計算",
      "割合 計算",
      "増減率 計算",
      "割引 計算",
      "何パーセント 計算",
    ],
    category: "計算",
    keywords: ["割合", "パーセント", "増減率", "割引", "計算"],
    icon: "percent",
    isMvp: false,
    status: "available",
    component: PercentageCalculator,
    details: {
      overview:
        "パーセント計算は、ある数が全体の何%か、指定した割合の数、増減率、割引後の価格を計算するツールです。買い物、売上、成績などの割合を確認できます。",
      example:
        "商品の価格と割引率を入力し、セール後の支払額を確認します。前月と今月の売上から増減率を求めることもできます。",
      howToUse: [
        "計算方法を選びます。",
        "画面に表示された2つの数値を入力します。",
        "「計算する」を押して結果を確認します。",
      ],
      notes: [
        "増減率は、変化前の数を基準に計算します。小数の結果は最大8桁まで表示します。",
        "金額の端数処理や実際の請求条件がある場合は、利用するサービスや店舗の規定を優先してください。",
      ],
      faq: [
        {
          question: "割合と増減率は何が違いますか？",
          answer:
            "割合は部分の数が全体に占める比率です。増減率は、変化前の数を基準にどれだけ増えたか、減ったかを表します。",
        },
        {
          question: "割引後の価格を計算できますか？",
          answer:
            "はい。「AのB%引き価格」を選び、元の価格と割引率を入力すると、割引後の価格を計算できます。",
        },
      ],
    },
  },
  {
    slug: "url-encoder-decoder",
    name: "URL変換",
    description: "URLや文字列をエンコード・デコードします。",
    seoTitle: "URLエンコード・デコード｜無料URL変換ツール",
    seoDescription:
      "URLや日本語を含む文字列をエンコード・デコードできる無料ツールです。URL全体とパラメーターの一部を切り替えて変換でき、入力データは外部へ送信しません。",
    seoKeywords: [
      "url encode",
      "url decode",
      "URLエンコード",
      "URLデコード",
      "パーセントエンコード",
      "URL変換",
    ],
    category: "開発",
    keywords: ["URL", "エンコード", "デコード"],
    icon: "link",
    isMvp: false,
    status: "available",
    component: UrlEncoderDecoder,
    details: {
      overview:
        "URL変換は、URLで扱える形式へ文字列を変換したり、変換済みの文字列を元に戻したりするツールです。日本語を含む検索語やクエリ文字列を確認するときに使えます。",
      example:
        "検索語「東京 おすすめ」をURLの一部としてエンコードし、クエリパラメーターに貼り付けられる形にします。",
      howToUse: [
        "URLまたは文字列を入力します。",
        "エンコードまたはデコードを押します。",
        "結果をコピーして利用します。",
      ],
      notes: [
        "URL全体では https:// や / などの区切り文字を保持します。検索語やパラメーターだけを変換するときは「URLの一部」を選んでください。",
      ],
      faq: [
        {
          question: "URL全体を変換できますか？",
          answer:
            "はい。変換する範囲で「URL全体」を選ぶと、https:// や / などを保持したまま変換できます。検索語やパラメーターだけを変換するときは「URLの一部」を選んでください。",
        },
      ],
    },
  },
  {
    slug: "base64-converter",
    name: "Base64変換",
    description: "文字列をBase64へ変換し、元の文字列へ戻します。",
    seoTitle: "Base64エンコード・デコード｜無料変換ツール",
    seoDescription:
      "文字列をBase64へエンコードし、Base64文字列を元へデコードできる無料ツールです。日本語にも対応し、入力データはブラウザ内だけで処理します。",
    seoKeywords: [
      "base64 encode",
      "base64 decode",
      "Base64変換",
      "Base64エンコード",
      "Base64デコード",
      "Base64 online",
    ],
    category: "開発",
    keywords: ["Base64", "変換", "エンコード"],
    icon: "binary",
    isMvp: false,
    status: "available",
    component: Base64Converter,
    details: {
      overview:
        "Base64変換は、文字列をBase64形式へ変換したり、Base64形式の文字列を元に戻したりするツールです。APIの値やデータ形式を確認するときに役立ちます。",
      example: "ログや設定に含まれるBase64文字列をデコードし、元のテキストを確認します。",
      howToUse: [
        "入力欄に文字列を貼り付けます。",
        "Base64に変換するか、Base64から戻すを押します。",
        "結果をコピーします。",
      ],
      notes: [
        "Base64は暗号化ではありません。秘密情報を隠す目的では使用しないでください。",
      ],
      faq: [
        {
          question: "日本語にも対応していますか？",
          answer: "UTF-8として扱うため、日本語を含む文字列にも対応しています。",
        },
      ],
    },
  },
  {
    slug: "uuid-generator",
    name: "UUID生成",
    description: "UUIDを必要な個数だけブラウザ内で生成します。",
    seoTitle: "UUID生成｜無料UUID v4ジェネレーター",
    seoDescription:
      "UUID v4を必要な個数だけ生成できる無料ツールです。テストデータや一時的な識別子の作成に使え、生成処理はブラウザ内で完結します。",
    seoKeywords: [
      "uuid generator",
      "UUID生成",
      "UUID生成ツール",
      "UUID v4",
      "UUID online",
      "ランダムUUID",
    ],
    category: "開発",
    keywords: ["UUID", "識別子", "生成"],
    icon: "binary",
    isMvp: false,
    status: "available",
    component: UuidGenerator,
    details: {
      overview:
        "UUID生成は、データや処理を識別するためのUUIDをまとめて作成するツールです。テストデータや一時的な識別子が必要なときに使えます。",
      example:
        "データベースのテスト用レコードに使うUUIDを10個生成し、一覧をコピーしてテストデータへ貼り付けます。",
      howToUse: [
        "生成する個数を入力します。",
        "生成するを押します。",
        "結果をコピーして利用します。",
      ],
      notes: ["生成したUUIDを重要な認証情報や秘密情報の代わりに使わないでください。"],
      faq: [
        {
          question: "UUID v4とは何ですか？",
          answer:
            "UUID v4は、ランダムな値をもとに作られる128ビットの識別子です。テストデータや一時的な識別子に使えますが、認証情報の代わりにはしないでください。",
        },
        {
          question: "生成したUUIDを保存できますか？",
          answer:
            "生成結果はコピーできます。ToolGoがUUIDをサーバーへ送信・保存することはありません。",
        },
      ],
    },
  },
  {
    slug: "hash-generator",
    name: "ハッシュ生成",
    description: "文字列からSHA-256またはSHA-512のハッシュを生成します。",
    seoTitle: "SHA-256・SHA-512ハッシュ生成｜無料オンラインツール",
    seoDescription:
      "文字列からSHA-256またはSHA-512のハッシュ値を計算できます。チェックサムの比較に使える無料ツールで、入力データはブラウザ内だけで処理します。",
    seoKeywords: [
      "ハッシュ生成",
      "SHA-256",
      "SHA-512",
      "ハッシュ値 計算",
      "チェックサム",
      "SHA512",
    ],
    category: "セキュリティ",
    keywords: ["ハッシュ", "SHA-256", "SHA-512", "チェックサム"],
    icon: "hash",
    isMvp: false,
    status: "available",
    component: HashGenerator,
    details: {
      overview:
        "ハッシュ生成は、入力した文字列からSHA-256またはSHA-512のハッシュ値を計算するツールです。文字列の同一性を確認するチェックサムの比較に使えます。",
      example:
        "配布前後のファイル情報から得たハッシュ値を比較し、同じ内容かを確認します。",
      howToUse: [
        "文字列を入力します。",
        "アルゴリズムを選びます。",
        "生成するを押して結果を確認します。",
      ],
      notes: [
        "ハッシュは暗号化ではなく、元の文字列を復元するためのものではありません。パスワードの保管には利用しないでください。",
      ],
      faq: [
        {
          question: "SHA-256とSHA-512は何が違いますか？",
          answer:
            "どちらも入力からハッシュ値を作る方式ですが、SHA-512の方が長いハッシュ値になります。比較対象と同じ方式を選んでください。",
        },
        {
          question: "ハッシュから元の文字列を復元できますか？",
          answer:
            "ハッシュは暗号化ではないものの、元の文字列を復元するための機能ではありません。入力と結果の比較やチェックサム確認に利用してください。",
        },
      ],
    },
  },
  {
    slug: "color-converter",
    name: "カラーコード変換",
    description: "HEXとRGB、HSLの色指定を相互に確認します。",
    seoTitle: "カラーコード変換｜HEX・RGB・HSLを無料で相互変換",
    seoDescription:
      "HEX、RGB、HSLのカラーコードを相互に変換できる無料ツールです。Webサイトや資料の色を確認し、必要な形式をコピーできます。入力はブラウザ内で処理します。",
    seoKeywords: [
      "カラーコード変換",
      "HEX RGB変換",
      "HSL変換",
      "カラーコード 変換",
      "色コード",
    ],
    category: "デザイン",
    keywords: ["カラーコード", "HEX", "RGB", "HSL", "色"],
    icon: "palette",
    isMvp: false,
    status: "available",
    component: ColorConverter,
    details: {
      overview:
        "カラーコード変換は、HEX、RGB、HSLで指定した色を相互に変換するツールです。Webサイトや資料の色を調整するときに役立ちます。",
      example:
        "デザイン案のHEXカラーをRGBに変換し、別のソフトへ貼り付けて同じ色を再現します。",
      howToUse: [
        "HEX、RGBまたはHSLの色指定を入力します。",
        "変換するを押します。",
        "必要な形式の色指定をコピーして利用します。",
      ],
      notes: ["表示や印刷の色は、画面や環境によって見え方が異なる場合があります。"],
      faq: [
        {
          question: "HEX、RGB、HSLは相互に変換できますか？",
          answer:
            "はい。対応する形式を入力して変換すると、HEX、RGB、HSLの値を相互に確認できます。",
        },
        {
          question: "変換した色が同じように見えないのはなぜですか？",
          answer:
            "画面、カラープロファイル、表示環境によって色の見え方が変わる場合があります。変換結果は色指定の値として利用してください。",
        },
      ],
    },
  },
  {
    slug: "regex-tester",
    name: "正規表現テスター",
    description: "正規表現が文字列に一致するかを確認します。",
    seoTitle: "正規表現テスター｜無料でJavaScriptの正規表現を確認",
    seoDescription:
      "正規表現と対象文字列を入力し、一致した部分と位置を確認できます。JavaScriptのフラグに対応した無料テスターで、入力内容は外部へ送信しません。",
    seoKeywords: [
      "正規表現テスター",
      "正規表現 チェック",
      "regex tester",
      "JavaScript 正規表現",
      "正規表現 テスト",
    ],
    category: "開発",
    keywords: ["正規表現", "RegExp", "テスト"],
    icon: "regex",
    isMvp: false,
    status: "available",
    component: RegexTester,
    details: {
      overview:
        "正規表現テスターは、正規表現と対象の文字列を入力して、一致した部分と位置を確認するツールです。入力チェックや検索条件を試すときに使えます。",
      example:
        "メールアドレスの入力チェック用パターンを試し、どの文字列が一致するかを確認します。",
      howToUse: [
        "正規表現とフラグを入力します。",
        "対象の文字列を入力します。",
        "一致した部分と位置を確認します。",
      ],
      notes: [
        "JavaScriptの正規表現として解釈します。正規表現は500文字以内、フラグは20文字以内、対象の文字列は10,000文字以内で入力してください。書き方やフラグによって結果が変わります。",
      ],
      faq: [
        {
          question: "この正規表現テスターはどの仕様に対応していますか？",
          answer:
            "JavaScriptの正規表現として判定します。利用できる構文やフラグは、実行するブラウザのJavaScript仕様に従います。",
        },
        {
          question: "一致しないときは何を確認すればよいですか？",
          answer:
            "正規表現、対象文字列、フラグの指定を確認してください。特に大文字・小文字の区別や、行頭・行末を表す記号の有無で結果が変わります。",
        },
      ],
    },
  },
  {
    slug: "text-diff",
    name: "テキスト差分比較",
    description: "2つの文章を行単位で比較し、変更箇所を確認します。",
    seoTitle: "テキスト差分比較｜無料で文章・コードの変更を確認",
    seoDescription:
      "変更前と変更後の文章やコードを貼り付け、追加・削除された行を比較できる無料ツールです。入力内容はブラウザ内で処理し、外部へ送信しません。",
    seoKeywords: [
      "テキスト差分",
      "差分比較",
      "diffツール",
      "文章比較",
      "コード比較",
      "テキスト比較",
    ],
    category: "文章",
    keywords: ["差分", "比較", "文章", "コード"],
    icon: "diff",
    isMvp: false,
    status: "available",
    component: TextDiff,
    details: {
      overview:
        "テキスト差分比較は、変更前と変更後の文章を行単位で比べ、追加・削除された行を確認するツールです。文章や設定ファイルの変更を確認するときに使えます。",
      example:
        "設定ファイルの変更前と変更後を貼り付け、追加・削除された行だけを確認します。",
      howToUse: [
        "変更前の文章を左側に入力します。",
        "変更後の文章を右側に入力します。",
        "下に表示される差分を確認します。",
      ],
      notes: [
        "行の追加・削除を中心に比較します。文字単位の細かな差分には対応していません。",
      ],
      faq: [
        {
          question: "文章とコードのどちらを比較できますか？",
          answer:
            "文章、コード、設定ファイルなど、行に分けて入力できるテキストを比較できます。入力内容はブラウザ内で処理します。",
        },
        {
          question: "文字単位の差分も確認できますか？",
          answer:
            "このツールは行単位の追加・削除を中心に比較します。1行内の文字単位の変更表示には対応していません。",
        },
      ],
    },
  },
  {
    slug: "csv-tsv-converter",
    name: "CSV・TSV変換",
    description: "CSVとTSVを相互に変換します。",
    seoTitle: "CSV・TSV変換｜無料で区切り文字を相互変換",
    seoDescription:
      "CSVとTSVを相互に変換し、表データを別のアプリへ貼り付けやすく整えられる無料ツールです。UTF-8の入力をブラウザ内で処理し、外部へ送信しません。",
    seoKeywords: [
      "CSV TSV変換",
      "CSV変換",
      "TSV変換",
      "CSV 変換 online",
      "区切り文字 変換",
      "表データ 変換",
    ],
    category: "開発",
    keywords: ["CSV", "TSV", "表", "変換"],
    icon: "table",
    isMvp: false,
    status: "available",
    component: CsvTsvConverter,
    details: {
      overview:
        "CSV・TSV変換は、カンマ区切りのCSVとタブ区切りのTSVを相互に変換するツールです。表データを別のアプリケーションへ貼り付ける前の整形に使えます。",
      example:
        "表計算ソフトからコピーしたTSVをCSVへ変換し、別のシステムへインポートできる形式に整えます。",
      howToUse: [
        "表データを貼り付けます。",
        "入力形式と出力形式を選びます。",
        "変換するを押して結果をコピーします。",
      ],
      notes: [
        "UTF-8のテキストを対象にしています。先頭行を見出しとして特別には扱いません。引用符が閉じていないデータは変換できません。",
      ],
      faq: [
        {
          question: "CSVとTSVの違いは何ですか？",
          answer:
            "CSVはカンマ、TSVはタブで列を区切るテキスト形式です。表データを利用するアプリケーションに合わせて変換できます。",
        },
        {
          question: "日本語を含むCSVを変換できますか？",
          answer:
            "UTF-8のテキストに対応しています。別の文字コードや、引用符が正しく閉じていないデータは正しく変換できない場合があります。",
        },
      ],
    },
  },
  {
    slug: "image-compressor",
    name: "画像圧縮",
    description: "画像の容量を減らし、ダウンロードできます。",
    seoTitle: "画像圧縮｜無料で画像容量を削減するオンラインツール",
    seoDescription:
      "JPEG・PNG・WebP画像の画質を調整し、容量を減らしてダウンロードできます。処理はブラウザ内で完結し、元画像を外部へ送信しません。",
    seoKeywords: ["画像圧縮", "画像容量削減", "画像圧縮 online", "JPEG圧縮", "PNG圧縮"],
    category: "デザイン",
    keywords: ["画像圧縮", "画像", "容量削減", "JPEG"],
    icon: "image",
    isMvp: false,
    status: "available",
    component: ImageCompressor,
    details: {
      overview:
        "画像圧縮は、選択したJPEG・PNG・WebP画像をブラウザ内でJPEGへ変換し、容量を減らすツールです。Webサイトへ掲載する画像を軽くしたいときに使えます。",
      example:
        "スマートフォンで撮影した画像を選び、画質を調整してWeb掲載用の軽いJPEGとして保存します。",
      howToUse: [
        "画像ファイルを選択します。",
        "画質を選びます。",
        "圧縮した画像をダウンロードします。",
      ],
      notes: [
        "10MB以下、縦横4,096px以内の画像に対応しています。JPEGへ変換するため、透過部分は白い背景になります。圧縮後の画質と容量は画像の内容によって変わります。",
      ],
      faq: [
        {
          question: "対応している画像形式は何ですか？",
          answer:
            "JPEG、PNG、WebPの画像を選択できます。圧縮後はJPEGとしてダウンロードされ、透過部分は白い背景になります。",
        },
        {
          question: "画像をサーバーへアップロードしますか？",
          answer:
            "画像の読み込みと圧縮はブラウザ内で行います。元画像をToolGoのサーバーへ送信・保存しません。",
        },
      ],
    },
  },
  {
    slug: "image-resizer",
    name: "画像リサイズ・形式変換",
    description: "画像の幅・高さを変更し、JPEG・PNG・WebPに変換します。",
    seoTitle: "画像リサイズ・形式変換｜無料で画像サイズを変更",
    seoDescription:
      "画像の幅と高さを指定してサイズを変更し、JPEG・PNG・WebPへ変換できる無料ツールです。縦横比の維持にも対応し、画像はブラウザ内で処理します。",
    seoKeywords: [
      "画像リサイズ",
      "画像サイズ変更",
      "画像形式変換",
      "JPEG PNG WebP変換",
      "画像 縮小",
    ],
    category: "デザイン",
    keywords: ["画像", "リサイズ", "サイズ変更", "JPEG", "PNG", "WebP"],
    icon: "image",
    isMvp: false,
    status: "available",
    component: ImageResizer,
    details: {
      overview:
        "画像リサイズ・形式変換は、画像の幅と高さを変更し、JPEG・PNG・WebPの形式へ変換するツールです。Webサイト用の画像や、アップロード前の画像を指定サイズに整えられます。",
      example:
        "スマートフォンで撮影した画像の幅を1,200pxに変更し、Web掲載用のWebP画像として保存します。",
      howToUse: [
        "画像ファイルを選択します。",
        "幅と高さを入力し、必要に応じて縦横比の維持や保存形式を選びます。",
        "「サイズを変更する」を押して、変換した画像をダウンロードします。",
      ],
      notes: [
        "JPEG・PNG・WebPに対応しています。20MB以下、縦横8,192px以内の画像を処理できます。",
        "JPEGへ変換すると、画像の透過部分は白い背景になります。",
      ],
      faq: [
        {
          question: "縦横比を維持して画像を縮小できますか？",
          answer:
            "はい。「縦横比を維持する」を選ぶと、幅または高さの変更に合わせてもう一方の値を自動調整します。",
        },
        {
          question: "画像をサーバーへアップロードしますか？",
          answer:
            "画像の読み込み、リサイズ、形式変換はブラウザ内で行います。元画像や変換結果をToolGoのサーバーへ送信・保存しません。",
        },
      ],
    },
  },
  {
    slug: "markdown-preview",
    name: "Markdownプレビュー",
    description: "Markdownの見出しや装飾を表示形式で確認します。",
    seoTitle: "Markdownプレビュー｜無料で見出し・装飾を確認",
    seoDescription:
      "Markdownを入力して、見出し、箇条書き、太字、インラインコードの表示を確認できます。READMEやメモの見た目をブラウザ内でプレビューできます。",
    seoKeywords: [
      "Markdownプレビュー",
      "Markdown viewer",
      "Markdown 確認",
      "README プレビュー",
      "Markdown editor",
    ],
    category: "文章",
    keywords: ["Markdown", "プレビュー", "文章", "見出し"],
    icon: "markdown",
    isMvp: false,
    status: "available",
    component: MarkdownPreview,
    details: {
      overview:
        "Markdownプレビューは、見出し、箇条書き、太字、インラインコードなどの基本的なMarkdownを表示形式で確認するツールです。READMEやメモの見た目を確認するときに使えます。",
      example:
        "READMEのMarkdownを貼り付け、見出しや箇条書きが意図した見た目になるかを確認します。",
      howToUse: [
        "Markdownを入力欄へ貼り付けます。",
        "右側のプレビューを確認します。",
        "文章を修正しながら表示を確認します。",
      ],
      notes: [
        "見出し、箇条書き、太字、インラインコードに対応しています。HTMLやスクリプトは安全のため、そのまま実行しません。",
      ],
      faq: [
        {
          question: "どのMarkdown記法に対応していますか？",
          answer:
            "見出し、箇条書き、太字、インラインコードなど、基本的なMarkdown記法に対応しています。対応範囲は入力内容によって異なる場合があります。",
        },
        {
          question: "入力したMarkdownは保存されますか？",
          answer:
            "入力内容はブラウザ内でプレビューします。ToolGoのサーバーへ送信・保存する機能はありません。",
        },
      ],
    },
  },
  {
    slug: "salary-take-home",
    name: "給料の手取り計算",
    description: "額面月収から、現行制度を前提に手取り額を概算します。",
    seoTitle: "給料の手取り計算｜額面から手取り額を無料で概算",
    seoDescription:
      "額面月収、扶養人数、健康保険などを入力し、社会保険料・所得税を差し引いた月の手取り額を概算できます。現行制度を前提とした目安で、正確な金額は給与明細を確認してください。",
    seoKeywords: [
      "手取り計算",
      "給与手取り計算",
      "給料 手取り",
      "手取り額",
      "社会保険料計算",
      "所得税計算",
    ],
    category: "日常生活",
    keywords: ["給料", "手取り", "給与", "税金", "社会保険"],
    icon: "wallet",
    isMvp: false,
    status: "available",
    component: SalaryTakeHome,
    details: {
      overview:
        "給料の手取り計算は、額面月収から社会保険料と所得税を差し引き、月の手取り額を概算するツールです。給与明細を受け取る前の目安を知りたいときに利用できます。",
      example:
        "転職先の額面月収と扶養人数を入力し、給与明細を受け取る前の月額手取りの目安を比較します。",
      howToUse: [
        "税金や社会保険料が引かれる前の額面月収を入力します。",
        "健康保険の都道府県支部、扶養人数、40歳以上かどうかを選びます。",
        "住民税が分かる場合は月額を入力して、計算するを押します。詳しく入力する場合は給与明細の控除額も入力できます。",
      ],
      notes: [
        "現行制度と協会けんぽの都道府県別料率を前提にした概算です。健康保険組合、賞与、年末調整、各種控除には完全対応していません。",
      ],
      faq: [
        {
          question: "住民税を入力しないとどうなりますか？",
          answer:
            "住民税を0円として計算します。給与明細などで住民税の月額が分かる場合は入力すると、より実際に近い目安になります。",
        },
        {
          question: "正確な手取り額が分かりますか？",
          answer:
            "健康保険料率、勤務先の制度、賞与、扶養や各種控除などによって変わるため、正確な金額は給与明細や勤務先の案内を確認してください。",
        },
      ],
    },
  },
  {
    slug: "bill-splitter",
    name: "割り勘計算",
    description: "合計金額を人数で割り、1人ずつの支払額を計算します。",
    seoTitle: "割り勘計算｜飲み会・食事会の支払額を無料計算",
    seoDescription:
      "合計金額と人数を入力して、1人あたりの支払額と端数の分け方を計算できます。食事会や旅行の割り勘に使える無料ツールです。",
    seoKeywords: [
      "割り勘計算",
      "割り勘ツール",
      "飲み会 割り勘",
      "一人当たり 計算",
      "支払額 計算",
    ],
    category: "日常生活",
    keywords: ["割り勘", "飲み会", "支払い", "計算"],
    icon: "split",
    isMvp: false,
    status: "available",
    component: BillSplitter,
    details: {
      overview:
        "割り勘計算は、食事会や旅行などの合計金額を人数で分けるツールです。1円単位の余りは、先頭の人から1円ずつ加算して合計額が合うようにします。",
      example:
        "食事会の合計金額と参加人数を入力し、1人あたりの支払額と端数の配分を確認します。",
      howToUse: [
        "合計金額を入力します。",
        "人数を入力します。",
        "計算結果を確認します。",
      ],
      notes: ["特定の人だけ多く払う、幹事を無料にするなどの分け方には対応していません。"],
      faq: [
        {
          question: "割り切れない金額はどう分けますか？",
          answer:
            "1円単位の余りは、先頭の人から1円ずつ加算して、全員分の合計が入力した金額と一致するように分けます。",
        },
        {
          question: "支払う人ごとに金額を変えられますか？",
          answer:
            "均等に割る計算に対応しています。幹事を無料にするなど、支払う人ごとに異なる金額を指定する機能はありません。",
        },
      ],
    },
  },
  {
    slug: "savings-goal-calculator",
    name: "貯金目標計算",
    description: "毎月の積立額から貯金の達成時期や必要額を計算します。",
    seoTitle: "貯金目標計算｜毎月の積立額と達成時期を無料計算",
    seoDescription:
      "目標金額と現在の貯金額を入力して、毎月の積立額から達成時期、または目標日から必要な積立額を計算できます。入力内容はブラウザ内で処理します。",
    seoKeywords: [
      "貯金目標計算",
      "貯金計画",
      "積立額 計算",
      "貯金 いつ貯まる",
      "目標金額 計算",
    ],
    category: "日常生活",
    keywords: ["貯金", "貯金計画", "積立", "目標金額", "家計"],
    icon: "wallet",
    isMvp: false,
    status: "available",
    component: SavingsGoalCalculator,
    details: {
      overview:
        "貯金目標計算は、目標金額と現在の貯金額から、毎月の積立額でいつ目標に届くか、または目標日までに毎月いくら積み立てればよいかを計算するツールです。",
      example:
        "旅行や引っ越しの目標金額と現在の貯金額を入力し、毎月の積立額から達成予定を確認します。",
      howToUse: [
        "目標金額と現在の貯金額を入力します。",
        "毎月の積立額から達成時期を計算するか、目標日から必要な積立額を計算するかを選びます。",
        "計算するを押して、残りの金額や積立回数を確認します。",
      ],
      notes: [
        "月1回の積立を前提にした目安です。利息、臨時収入、途中の支出、積立日のずれは考慮しません。",
      ],
      faq: [
        {
          question: "目標金額より現在の貯金額が多い場合はどうなりますか？",
          answer:
            "目標金額に到達していると表示します。追加の積立額や回数は計算しません。",
        },
        {
          question: "利息や投資による増加も計算できますか？",
          answer:
            "いいえ。毎月の積立額だけで計算するため、利息、投資による増減、臨時収入は含めません。",
        },
      ],
    },
  },
  {
    slug: "nisa-tsumitate-simulator",
    name: "NISA積立シミュレーター",
    description: "毎月の積立額と想定年率から、NISAの資産形成をグラフで確認します。",
    seoTitle: "NISA積立シミュレーター｜毎月の積立額と運用益を無料計算",
    seoDescription:
      "毎月の積立額、運用期間、想定年率を入力して、NISAの将来評価額と運用益をグラフで確認できます。かんたん・詳細モードに対応し、つみたて投資枠の上限も反映します。",
    seoKeywords: [
      "NISA積立シミュレーター",
      "NISA シミュレーション",
      "積立投資 計算",
      "オルカン 積立 シミュレーション",
      "投資信託 利回り 計算",
    ],
    category: "日常生活",
    keywords: ["NISA", "積立", "投資信託", "運用益", "資産形成"],
    icon: "wallet",
    isMvp: false,
    status: "available",
    component: NisaTsumitateSimulator,
    details: {
      overview:
        "NISA積立シミュレーターは、毎月の積立額、運用期間、想定年率から、将来の評価額と運用益の目安を計算するツールです。かんたんモードで現在のNISA評価額を入力でき、詳細モードでは取得価額やボーナス投資も指定できます。",
      example:
        "毎月3万円を20年間、想定年率5%で積み立てたときの評価額と、積立元本との差を確認します。",
      howToUse: [
        "かんたんモードで毎月の積立額、運用期間、想定年率を入力します。",
        "全世界株式（オルカン）などの参考年率を選ぶか、想定年率を自分で入力します。",
        "必要に応じてかんたんモードで現在のNISA評価額を入力し、詳細モードでは取得価額やボーナス投資を追加します。",
        "評価額、積立元本、運用益とグラフを確認します。",
      ],
      notes: [
        "このツールはつみたて投資枠の年間120万円、NISA全体の非課税保有限度額1,800万円を計算に反映します。上限を超える積立予定分は、NISAの計算から除外して表示します。",
        "かんたんモードでは現在の評価額を取得価額と同額と仮定します。詳細モードで取得価額を入力すると、生涯投資枠の使用額に反映します。",
        "参考年率は比較用の仮定であり、特定の投資信託の実績や将来の利益を示すものではありません。実際の価格変動、信託報酬、手数料、売却、分配金は別途確認してください。",
        "NISAの制度や対象商品は変更されることがあります。申込みや投資判断をする前に、金融庁や利用する金融機関の最新情報を確認してください。",
      ],
      faq: [
        {
          question: "参考年率は実際の投資信託の利率ですか？",
          answer:
            "いいえ。全世界株式（オルカン）などの名称は、資産の種類をイメージしやすくするための参考プリセットです。過去の実績や将来の利益を保証するものではないため、自分の見通しに合わせて変更してください。",
        },
        {
          question: "NISAの上限を超えた積立はどうなりますか？",
          answer:
            "つみたて投資枠の年間120万円と、NISA全体の非課税保有限度額1,800万円を超えた分は、NISAの計算に含めません。除外した金額は結果の下に表示します。",
        },
        {
          question: "実際の利益や税金まで分かりますか？",
          answer:
            "分かりません。一定の年率で値動きする簡易計算です。実際の運用では価格が上下し、信託報酬や手数料などもかかるため、結果は資産形成の目安として利用してください。",
        },
      ],
    },
  },
  {
    slug: "taxable-investment-simulator",
    name: "投資信託の税引き後シミュレーター",
    description:
      "課税口座で投資信託を積み立てたときの、売却時の税引き後受取額を見積もります。",
    seoTitle: "投資信託の税引き後シミュレーター｜課税口座の運用益を計算",
    seoDescription:
      "毎月の積立額、運用期間、想定年率から、課税口座で投資信託を運用した場合の税引前評価額、売却時の税金、税引き後受取額を計算できます。",
    seoKeywords: [
      "投資信託 税引き後 シミュレーター",
      "投資信託 税金 計算",
      "課税口座 積立 シミュレーション",
      "投資信託 運用益 税金",
      "投資信託 利回り 計算",
    ],
    category: "日常生活",
    keywords: ["投資信託", "税金", "課税口座", "積立", "運用益", "資産形成"],
    icon: "wallet",
    isMvp: false,
    status: "available",
    component: TaxableInvestmentSimulator,
    details: {
      overview:
        "投資信託の税引き後シミュレーターは、課税口座で毎月積み立てた場合の評価額と、計算した年に売却した場合の税引き後受取額を見積もるツールです。かんたんモードで現在の評価額を入力でき、詳細モードでは取得価額やボーナス投資を指定できます。",
      example:
        "毎月3万円を20年間、想定年率5%で積み立てたとき、売却時に税金を差し引くといくら受け取れるかを確認します。",
      howToUse: [
        "かんたんモードで毎月の積立額、運用期間、想定年率を入力します。",
        "全世界株式（オルカン）などの参考年率を選ぶか、想定年率を自分で入力します。",
        "すでに保有している資産を含める場合は、かんたんモードで評価額を入力し、含み益・含み損も反映する場合は詳細モードで取得価額を入力します。",
        "税引前評価額、課税対象の利益、売却時の税金、税引き後受取額と年ごとのグラフを確認します。",
      ],
      notes: [
        "一般的な公募投資信託を課税口座で保有し、各年の時点で全部売却する簡易モデルです。課税対象の利益がない場合、税金は0円としています。",
        "現行の一般的な税率として20.315%（所得税等15.315%・住民税5%）を使います。税率や制度の根拠は国税庁の案内を確認してください。",
        "分配金、信託報酬、売買手数料、他の金融商品の損益通算、損失の繰越控除、口座ごとの取得価額計算、個別の確定申告は反映していません。",
        "参考年率は比較用の仮定であり、特定の投資信託の実績や将来の利益を示すものではありません。結果は資産形成の目安として利用してください。",
      ],
      faq: [
        {
          question: "NISAとの違いは何ですか？",
          answer:
            "このツールは課税口座を前提に、売却時の利益へ税率20.315%を掛けます。NISAの非課税枠や上限を計算したい場合は、NISA積立シミュレーターを利用してください。",
        },
        {
          question: "現在の評価額だけで計算できますか？",
          answer:
            "かんたんモードで評価額だけを入力した場合は、取得価額も同額と仮定します。含み益・含み損を反映する場合は、詳細モードで取得価額を入力してください。税金は評価額ではなく、取得価額との差である利益をもとに計算します。",
        },
        {
          question: "分配金や損失の繰越も反映されますか？",
          answer:
            "いいえ。分配金、損益通算、損失の繰越控除、信託報酬や手数料は対象外です。これらを含む税務上の金額は、金融機関の年間取引報告書や税務の専門家へ確認してください。",
        },
      ],
    },
  },
  {
    slug: "ideco-simulator",
    name: "iDeCoシミュレーター",
    description:
      "年齢と加入区分から、iDeCoの運用資産と掛金による税軽減額を見積もります。",
    seoTitle: "iDeCoシミュレーター｜掛金・運用益・税軽減額を計算",
    seoDescription:
      "現在の年齢、加入区分、毎月の掛金、想定年率から、iDeCoの掛金上限、受け取り時の見込み資産、掛金の所得控除による税軽減額を計算できます。",
    seoKeywords: [
      "iDeCo シミュレーター",
      "iDeCo 計算",
      "iDeCo 掛金 上限",
      "iDeCo 税金 控除",
      "iDeCo 運用益",
    ],
    category: "日常生活",
    keywords: ["iDeCo", "個人型確定拠出年金", "掛金", "税金", "所得控除", "老後資金"],
    icon: "wallet",
    isMvp: false,
    status: "available",
    component: IdecoSimulator,
    details: {
      overview:
        "iDeCoシミュレーターは、現在の年齢、加入区分、毎月の掛金、想定年率から、受け取り開始年齢時点の見込み資産と掛金の所得控除による税軽減額を計算するツールです。かんたんモードで現在のiDeCo評価額を入力でき、年収・控除から税額差を計算する標準方式にも対応しています。詳細モードでは取得価額、扶養親族、企業年金、手数料も指定できます。",
      example:
        "30歳の会社員が毎月2万3,000円を60歳まで、想定年率5%で拠出した場合の資産額と税軽減額を確認します。",
      howToUse: [
        "現在の年齢と受け取り開始年齢を入力します。",
        "自営業、会社員、公務員、専業主婦・主夫などの加入区分を選びます。",
        "毎月の掛金、想定年率、年収または課税所得を入力します。必要に応じて所得税率を指定する簡易方式へ切り替えます。",
        "かんたんモードで現在のiDeCo評価額を入力し、扶養配偶者がいる場合は指定します。詳細モードでは取得価額、扶養親族の年齢、企業年金等、国民年金基金等、手数料を追加します。",
        "受け取り時点の資産、運用益、累計掛金、年間・累計の税軽減額をグラフと表で確認します。",
      ],
      notes: [
        "2026年8月8日時点の現行制度を前提に、掛金上限は第1号・任意加入者6万8,000円、企業年金なしの会社員2万3,000円、企業年金ありの会社員・公務員2万円、専業主婦・主夫2万3,000円として計算します。",
        "企業年金等や国民年金基金等がある場合は合算枠を使うため、詳細モードで入力した金額を上限計算に反映します。",
        "詳細モードの取得価額は元本・運用益の表示に使います。iDeCoの節税額や受け取り時の税金には影響しません。",
        "標準方式では、給与所得控除・社会保険料控除・基礎控除・扶養控除・累進税率・復興特別所得税を反映し、拠出前後の税額差を100円未満切り捨てで計算します。税額は概算であり、実際の年末調整・確定申告とは異なる場合があります。",
        "2026年12月1日に拠出限度額と加入可能年齢の引き上げが施行予定です。施行後の制度は、最新情報を確認してから利用してください。",
        "受け取り時の一時金・年金にかかる税金、退職金や公的年金との重複、運用商品の信託報酬、個別の加入資格は計算していません。",
      ],
      faq: [
        {
          question: "加入区分で掛金の上限が変わるのはなぜですか？",
          answer:
            "iDeCoの拠出限度額は、国民年金の被保険者区分や、勤務先の企業型DC・確定給付企業年金などの有無によって決まります。企業年金等の金額が分かる場合は詳細モードへ入力してください。",
        },
        {
          question: "税軽減額は実際に戻ってくる金額ですか？",
          answer:
            "標準方式では年収・控除から拠出前後の税額差を計算します。社会保険料率や他の控除などは概算のため、実際の年末調整・確定申告とは異なる場合があります。簡易方式では所得税率を直接指定します。",
        },
        {
          question: "受け取り時の税金も計算できますか？",
          answer:
            "このツールでは計算していません。一時金は退職所得控除、年金は公的年金等控除の対象になりますが、退職金や公的年金との受け取り時期などで税額が変わるためです。",
        },
        {
          question: "60歳になれば必ず受け取れますか？",
          answer:
            "通算加入者等期間が10年以上なら原則60歳から受け取れます。10年未満の場合は受給開始年齢が61〜65歳へ繰り下がることがあります。60歳以上で初めて加入した場合は、加入から5年経過後が目安です。",
        },
      ],
    },
  },
  {
    slug: "tax-calculator",
    name: "税込・税抜計算",
    description: "税込価格、税抜価格、消費税額を相互に計算します。",
    seoTitle: "税込・税抜計算｜消費税と税込価格を無料で計算",
    seoDescription:
      "税込価格、税抜価格、消費税額を税率から相互に計算できます。見積書や買い物の金額確認に使える無料ツールで、入力内容はブラウザ内で処理します。",
    seoKeywords: [
      "税込税抜計算",
      "消費税計算",
      "税込価格 計算",
      "税抜価格 計算",
      "消費税8%",
    ],
    category: "日常生活",
    keywords: ["税込", "税抜", "消費税", "計算"],
    icon: "tax",
    isMvp: false,
    status: "available",
    component: TaxCalculator,
    details: {
      overview:
        "税込・税抜計算は、商品の価格から税抜価格、消費税額、税込価格を計算するツールです。買い物や見積書の金額を確認するときに使えます。",
      example: "見積書の税抜金額と税率を入力し、請求時の税込金額と消費税額を確認します。",
      howToUse: [
        "金額を入力します。",
        "税率と、入力した金額が税込か税抜かを選びます。",
        "計算結果を確認します。",
      ],
      notes: [
        "軽減税率の対象品目は8%です。実際の取引では、取引内容と端数処理の方法を確認してください。",
      ],
      faq: [
        {
          question: "税込価格から税抜価格を計算できますか？",
          answer:
            "はい。税込価格と税率を入力すると、税抜価格と消費税額を計算できます。税率と端数処理は実際の取引条件を確認してください。",
        },
        {
          question: "軽減税率8%に対応していますか？",
          answer:
            "税率を指定して計算できます。軽減税率の対象品目を計算する場合は8%を選び、実際の請求や申告では取引内容を優先してください。",
        },
      ],
    },
  },
  {
    slug: "date-calculator",
    name: "日付計算",
    description: "日付に日数を足したり引いたり、2つの日付の差を計算します。",
    seoTitle: "日付計算｜日数を足し引き・2つの日付の差を計算",
    seoDescription:
      "基準日に日数を足した後・前の日付や、2つの日付の差を計算できます。締め切りや予定日の確認に使える無料ツールで、営業日は考慮しません。",
    seoKeywords: ["日付計算", "日数計算", "日付の差", "何日後 計算", "締め切り 計算"],
    category: "日常生活",
    keywords: ["日付", "日数", "期間", "計算"],
    icon: "date",
    isMvp: false,
    status: "available",
    component: DateCalculator,
    details: {
      overview:
        "日付計算は、基準日から指定した日数後または前の日付と、2つの日付の差を計算するツールです。締め切りや予定日までの日数を確認するときに使えます。",
      example: "開始日から30日後の日付を計算し、申込後の確認期限や作業予定日を決めます。",
      howToUse: [
        "基準日と比較する日付を入力します。",
        "足し引きする日数を入力します。",
        "日数を足すか引くかを選んで計算します。",
      ],
      notes: ["暦日で計算するため、土日祝日や営業日は考慮しません。"],
      faq: [
        {
          question: "土日祝日を除いた営業日で計算できますか？",
          answer: "いいえ。暦日で計算するため、土日祝日や会社独自の休日は除外しません。",
        },
        {
          question: "何日後・何日前の日付を計算できますか？",
          answer:
            "基準日と日数、足すか引くかを指定して、指定日数後または前の日付を計算できます。2つの日付の差も確認できます。",
        },
      ],
    },
  },
  {
    slug: "unit-converter",
    name: "単位換算",
    description: "長さ、重さ、温度、容量の単位を相互に換算します。",
    seoTitle: "単位換算｜長さ・重さ・温度・容量を無料で変換",
    seoDescription:
      "長さ、重さ、温度、容量の単位を相互に換算できます。料理や海外の情報、DIYで使える無料オンラインツールで、入力データは外部へ送信しません。",
    seoKeywords: ["単位換算", "単位変換", "長さ 単位換算", "重さ 単位換算", "温度変換"],
    category: "日常生活",
    keywords: ["単位換算", "長さ", "重さ", "温度", "容量"],
    icon: "ruler",
    isMvp: false,
    status: "available",
    component: UnitConverter,
    details: {
      overview:
        "単位換算は、長さ、重さ、温度、容量の単位を別の単位へ換算するツールです。料理、買い物、DIY、海外の情報を確認するときに使えます。",
      example:
        "海外レシピの華氏温度やカップ表記を、使っているオーブンや計量カップの単位へ換算します。",
      howToUse: [
        "換算する種類を選びます。",
        "数値と変換前・変換後の単位を選びます。",
        "表示された結果を確認します。",
      ],
      notes: [
        "一般的な単位の換算に対応しています。専門分野固有の定義や測定誤差は考慮していません。",
      ],
      faq: [
        {
          question: "どの単位を換算できますか？",
          answer:
            "長さ、重さ、温度、容量の一般的な単位を相互に換算できます。換算する種類を選ぶと、対応する単位を選択できます。",
        },
        {
          question: "料理や海外の単位換算に使えますか？",
          answer:
            "はい。海外レシピの温度や容量、DIYで使う長さなど、一般的な単位の目安を確認する用途に使えます。",
        },
      ],
    },
  },
  {
    slug: "recipe-portion-calculator",
    name: "料理の分量換算",
    description: "レシピの人数を変えて、材料ごとの分量をまとめて換算します。",
    seoTitle: "料理の分量換算｜レシピを人数分に合わせて計算",
    seoDescription:
      "レシピの人数と作りたい人数を入力し、材料ごとの分量を必要な人数分へ換算できます。料理の分量はブラウザ内で計算し、入力内容を外部へ送信しません。",
    seoKeywords: [
      "料理 分量換算",
      "レシピ 人数変更",
      "料理 分量 計算",
      "レシピ 倍量",
      "材料 分量換算",
    ],
    category: "日常生活",
    keywords: ["料理", "レシピ", "分量", "人数", "換算"],
    icon: "table",
    isMvp: false,
    status: "available",
    component: RecipePortionCalculator,
    details: {
      overview:
        "料理の分量換算は、2人分のレシピを4人分にするなど、レシピの人数を作りたい人数に合わせて材料の分量を計算するツールです。",
      example:
        "レシピが2人分なのに5人分作りたいとき、材料を入力して必要な分量を確認します。",
      howToUse: [
        "レシピに書かれている人数と、作りたい人数を入力します。",
        "材料名・分量・単位を、材料ごとの入力欄に入力します。",
        "材料が足りなければ「材料を追加」で入力欄を増やします。",
        "分量を換算するを押し、結果を確認またはコピーします。",
      ],
      notes: [
        "数字や分数は人数に合わせて換算します。少々、適量など数字でない分量はそのまま表示します。",
      ],
      faq: [
        {
          question: "材料はどのように入力しますか？",
          answer:
            "材料ごとに、材料名・分量・単位をそれぞれの入力欄へ入力します。単位は任意で、g、ml、大さじ、個などを入力できます。",
        },
        {
          question: "大さじや小さじも換算できますか？",
          answer:
            "はい。大さじや小さじを単位欄に入力すると、分量の数値だけを人数に合わせて換算します。大さじをmlへ変換する機能ではありません。",
        },
        {
          question: "少々や適量は入力できますか？",
          answer:
            "はい。分量欄に少々や適量などを入力すると、数値としては換算せず、そのまま結果に表示します。",
        },
      ],
    },
  },
  {
    slug: "sleep-time-calculator",
    name: "睡眠時間計算",
    description: "就寝時刻と起床時刻から、睡眠時間を計算します。",
    seoTitle: "睡眠時間計算｜就寝・起床時刻から睡眠時間を計算",
    seoDescription:
      "就寝時刻と起床時刻を入力して、日付をまたぐ睡眠時間を計算できます。入力内容はブラウザ内で処理する無料ツールです。",
    seoKeywords: [
      "睡眠時間計算",
      "睡眠時間 計算",
      "就寝 起床 時刻",
      "何時間寝たか",
      "睡眠 時間計算",
    ],
    category: "日常生活",
    keywords: ["睡眠", "就寝", "起床", "時間", "生活"],
    icon: "date",
    isMvp: false,
    status: "available",
    component: SleepTimeCalculator,
    details: {
      overview:
        "睡眠時間計算は、就寝時刻と起床時刻から、日付をまたぐ場合も含めた経過時間を計算するツールです。",
      example: "23時に寝て7時に起きたとき、睡眠時間が8時間あるか確認します。",
      howToUse: [
        "就寝時刻を入力します。",
        "起床時刻を入力します。",
        "睡眠時間を計算するを押して、経過時間を確認します。",
      ],
      notes: [
        "就寝から起床までの経過時間だけを計算します。昼寝、入眠までの時間、途中で起きた時間、睡眠の質は考慮しません。",
      ],
      faq: [
        {
          question: "23時から7時のように日付をまたいでも計算できますか？",
          answer: "はい。起床時刻が就寝時刻より前の場合は、翌日の時刻として計算します。",
        },
        {
          question: "睡眠時間が足りているか判定できますか？",
          answer:
            "いいえ。年齢や体調によって必要な睡眠時間は異なるため、このツールは経過時間の計算だけを行います。",
        },
      ],
    },
  },
  {
    slug: "sale-price-calculator",
    name: "セール価格計算",
    description: "個数・割引率・税率から、買い物の支払合計を計算します。",
    seoTitle: "セール価格計算｜割引後の税込価格と合計金額を計算",
    seoDescription:
      "商品の価格、個数、割引率、消費税率から、割引額と支払合計を計算できます。まとめ買いの金額確認をブラウザ内で行える無料ツールです。",
    seoKeywords: [
      "セール価格計算",
      "割引後価格 計算",
      "値引き 計算",
      "買い物 合計 計算",
      "税込 セール価格",
    ],
    category: "日常生活",
    keywords: ["セール", "割引", "買い物", "価格", "税込"],
    icon: "percent",
    isMvp: false,
    status: "available",
    component: SalePriceCalculator,
    details: {
      overview:
        "セール価格計算は、1個あたりの価格と個数、割引率、消費税率から、割引額と支払合計を計算するツールです。",
      example: "3,000円の商品を2個、20%引きで買うときの税込み支払額を確認します。",
      howToUse: [
        "1個あたりの価格と個数を入力します。",
        "割引率と消費税率を入力または選択します。",
        "セール価格を計算するを押して、支払合計を確認します。",
      ],
      notes: [
        "個数分の合計に割引を適用し、割引後の価格へ消費税を加えます。店舗ごとの端数処理や、2個目半額などの個別条件は考慮しません。",
      ],
      faq: [
        {
          question: "複数個買った場合の合計を計算できますか？",
          answer:
            "はい。1個あたりの価格と個数を入力すると、個数分の通常価格、割引額、支払合計を表示します。",
        },
        {
          question: "2個目半額にも対応していますか？",
          answer:
            "いいえ。入力した割引率を合計金額へ適用する計算です。2個目半額などの商品ごとに条件が異なる場合は、商品ごとに分けて計算してください。",
        },
      ],
    },
  },
  {
    slug: "holiday-calendar",
    name: "祝日・連休カレンダー",
    description: "日本の祝日・休日と3連休以上の日程を年ごとに確認します。",
    seoTitle: "祝日・連休カレンダー｜日本の祝日と3連休を確認",
    seoDescription:
      "年を選ぶと、日本の祝日・振替休日・祝日に挟まれた休日と、3連休以上の日程を一覧で確認できます。カレンダーはブラウザ内で生成します。",
    seoKeywords: [
      "祝日カレンダー",
      "日本の祝日",
      "連休カレンダー",
      "祝日 一覧",
      "3連休 いつ",
    ],
    category: "日常生活",
    keywords: ["祝日", "休日", "連休", "カレンダー", "予定"],
    icon: "calendar",
    isMvp: false,
    status: "available",
    component: HolidayCalendar,
    details: {
      overview:
        "祝日・連休カレンダーは、指定した年の日本の祝日・休日と、土日を含めた3連休以上の日程を一覧で確認するツールです。",
      example: "旅行や帰省の予定を立てる前に、指定した年の祝日と連休を確認します。",
      howToUse: [
        "確認したい年を入力します。",
        "カレンダーを表示するを押します。",
        "祝日・休日の一覧と3連休以上の日程を確認します。",
      ],
      notes: [
        "2000〜2099年に対応しています。春分の日・秋分の日は天文計算による目安で、正式な日付は内閣府などの公表情報を確認してください。",
        "地域独自の記念日、学校や勤務先の休日、臨時の休日は含みません。",
      ],
      faq: [
        {
          question: "振替休日も表示されますか？",
          answer:
            "はい。祝日が日曜日に当たる場合の振替休日と、祝日に挟まれた休日を表示します。",
        },
        {
          question: "土日を含めた連休を確認できますか？",
          answer: "はい。土日と祝日・休日が連続する3連休以上の日程をまとめて表示します。",
        },
      ],
    },
  },
  {
    slug: "business-day-calculator",
    name: "営業日計算",
    description: "土日と日本の祝日・休日を除いて、指定日数後・前の日付を計算します。",
    seoTitle: "営業日計算｜土日祝日を除いた日付を計算",
    seoDescription:
      "基準日と営業日数を入力して、土日と日本の祝日・休日を除いた日付を計算できます。締め切りや納期の確認をブラウザ内で行える無料ツールです。",
    seoKeywords: [
      "営業日計算",
      "営業日 何日後",
      "土日祝日を除く日付計算",
      "納期計算",
      "締め切り 営業日",
    ],
    category: "日常生活",
    keywords: ["営業日", "祝日", "納期", "締め切り", "日付"],
    icon: "date",
    isMvp: false,
    status: "available",
    component: BusinessDayCalculator,
    details: {
      overview:
        "営業日計算は、土日と日本の祝日・休日を除いて、指定した営業日数後または前の日付を計算するツールです。",
      example:
        "申込日から10営業日後の確認期限や、納品予定日から5営業日前の準備開始日を確認します。",
      howToUse: [
        "基準日と営業日数を入力します。",
        "営業日を足すか引くかを選びます。",
        "営業日を計算するを押して、結果の日付を確認します。",
      ],
      notes: [
        "2000〜2099年に対応しています。土日と日本の祝日・休日を除き、基準日は営業日数に含めません。",
        "会社独自の休日、地域の休日、臨時休業日は含みません。",
      ],
      faq: [
        {
          question: "祝日も除いて計算できますか？",
          answer: "はい。日本の祝日・振替休日・祝日に挟まれた休日を除いて計算します。",
        },
        {
          question: "基準日を1営業日目として数えられますか？",
          answer:
            "基準日は含めず、翌日以降の営業日を1日目として数えます。基準日を含める場合は、営業日数を1日少なくして確認してください。",
        },
      ],
    },
  },
  {
    slug: "fuel-cost-calculator",
    name: "ガソリン代・燃費計算",
    description: "走行距離、燃費、燃料単価から、移動にかかる燃料費を計算します。",
    seoTitle: "ガソリン代・燃費計算｜走行距離から燃料費を計算",
    seoDescription:
      "走行距離、車の燃費、ガソリン単価を入力して、片道・往復の燃料費と必要な燃料の量を計算できます。ドライブや通勤の費用確認に使える無料ツールです。",
    seoKeywords: [
      "ガソリン代計算",
      "燃費計算",
      "燃料費計算",
      "車 交通費 計算",
      "往復 ガソリン代",
    ],
    category: "日常生活",
    keywords: ["ガソリン", "燃費", "燃料費", "車", "交通費"],
    icon: "fuel",
    isMvp: false,
    status: "available",
    component: FuelCostCalculator,
    details: {
      overview:
        "ガソリン代・燃費計算は、走行距離、燃費、燃料単価から、必要な燃料の量と燃料費の目安を計算するツールです。",
      example:
        "片道50kmの場所へ車で出かけるとき、燃費とガソリン単価から往復の費用を確認します。",
      howToUse: [
        "片道の走行距離を入力します。",
        "往復か片道かを選び、燃費と燃料単価を入力します。",
        "燃料費を計算するを押して、費用の目安を確認します。",
      ],
      notes: [
        "実際の燃料費は、渋滞、運転方法、エアコン使用、道路状況などによって変わります。",
      ],
      faq: [
        {
          question: "往復のガソリン代を計算できますか？",
          answer: "はい。走行方法で往復を選ぶと、入力した片道距離を2倍にして計算します。",
        },
        {
          question: "電気自動車の電気代も計算できますか？",
          answer:
            "現在は燃費をkm/L、単価を円/Lとして計算します。電費や充電料金を使う場合は、同じ単位に換算して目安として入力してください。",
        },
      ],
    },
  },
  {
    slug: "household-budget-calculator",
    name: "家計予算計算",
    description: "手取り、支出、貯金額から、1か月に使える残りの予算を計算します。",
    seoTitle: "家計予算計算｜手取りと支出から残りの予算を計算",
    seoDescription:
      "月の手取り、固定費、変動費、貯金額を入力して、残りの予算と1日あたりの支出目安を計算できます。入力内容はブラウザ内で処理します。",
    seoKeywords: [
      "家計予算計算",
      "家計簿 予算",
      "手取り 支出 計算",
      "1日いくら使えるか",
      "生活費 予算計算",
    ],
    category: "日常生活",
    keywords: ["家計", "予算", "手取り", "支出", "生活費"],
    icon: "wallet",
    isMvp: false,
    status: "available",
    component: HouseholdBudgetCalculator,
    details: {
      overview:
        "家計予算計算は、月の手取りから固定費、変動費、貯金額を差し引き、残りの予算と1日あたりの目安を計算するツールです。",
      example:
        "今月の手取りと家賃などの固定費、食費などの変動費、貯金額を入力して、自由に使える残りの予算を確認します。",
      howToUse: [
        "対象月と月の手取りを入力します。",
        "固定費、変動費、今月の貯金額を入力します。",
        "家計の予算を計算するを押して、残りの予算を確認します。",
      ],
      notes: [
        "1日あたりの金額は、残りの予算を対象月の日数で割った単純な目安です。家計の状況や支出の優先順位を判断するものではありません。",
      ],
      faq: [
        {
          question: "支出が手取りを超えた場合も計算できますか？",
          answer: "はい。不足している金額をマイナスの結果として表示します。",
        },
        {
          question: "給料の手取り計算と何が違いますか？",
          answer:
            "給料の手取り計算は額面から手取り額を概算するツールです。家計予算計算は、すでに分かっている手取り額から月の支出予算を計算します。",
        },
      ],
    },
  },
  {
    slug: "unit-price-comparator",
    name: "買い物の単価比較",
    description: "商品の価格と内容量をそろえて、どちらが割安か比較します。",
    seoTitle: "買い物の単価比較｜100g・1Lあたりの価格を計算",
    seoDescription:
      "2つの商品の価格と内容量を入力して、g、kg、ml、Lなどの単位あたりの価格を比較できます。まとめ買いの割安さを確認する無料ツールです。",
    seoKeywords: [
      "単価比較",
      "100gあたり 価格",
      "どっちが安い 計算",
      "商品の単価計算",
      "買い物 比較",
    ],
    category: "日常生活",
    keywords: ["単価", "買い物", "比較", "価格", "内容量"],
    icon: "ruler",
    isMvp: false,
    status: "available",
    component: UnitPriceComparator,
    details: {
      overview:
        "買い物の単価比較は、商品の価格と内容量を同じ基準にそろえ、単位あたりの価格が安い商品を比較するツールです。",
      example: "500gで398円の商品と1kgで698円の商品を比べ、どちらが安いか確認します。",
      howToUse: [
        "商品Aと商品Bの価格、内容量、単位を入力します。",
        "単価を比較するを押します。",
        "単位あたりの価格と、安い商品の結果を確認します。",
      ],
      notes: [
        "gとkg、mlとL、cmとmは自動で換算します。単位の種類が異なる商品、税込・割引条件が異なる商品は比較できません。",
      ],
      faq: [
        {
          question: "500gと1kgの商品を比較できますか？",
          answer: "はい。gとkgを自動でそろえて、同じ重さあたりの単価を比較します。",
        },
        {
          question: "税込価格と税抜価格を混ぜて比較できますか？",
          answer:
            "入力した価格をそのまま比較するため、税込・税抜などの条件をそろえてから入力してください。",
        },
      ],
    },
  },
  {
    slug: "travel-budget-calculator",
    name: "旅行予算計算",
    description: "人数、宿泊数、交通費、宿泊費などから旅行費用を見積もります。",
    seoTitle: "旅行予算計算｜交通費・宿泊費・食費の合計を見積もり",
    seoDescription:
      "旅行の人数と宿泊数、1人あたりの交通費・食費、宿泊費、レジャー費を入力して、旅行費用の合計と1人あたりの目安を計算できます。",
    seoKeywords: [
      "旅行予算計算",
      "旅行費用 計算",
      "旅行 いくらかかる",
      "宿泊旅行 予算",
      "旅行費 1人あたり",
    ],
    category: "日常生活",
    keywords: ["旅行", "予算", "交通費", "宿泊費", "食費"],
    icon: "wallet",
    isMvp: false,
    status: "available",
    component: TravelBudgetCalculator,
    details: {
      overview:
        "旅行予算計算は、人数と宿泊数、交通費、宿泊費、食費などから旅行費用の合計と1人あたりの目安を計算するツールです。",
      example:
        "2人2泊の旅行で、交通費、ホテル代、食費、レジャー費を入力し、予算内に収まるか確認します。",
      howToUse: [
        "人数と宿泊数を入力します。",
        "交通費、宿泊費、食費、レジャー費などの目安を入力します。",
        "必要に応じて予算上限を入力し、旅行の予算を計算するを押します。",
      ],
      notes: [
        "食費は宿泊数＋1日分、宿泊費は1泊あたりとして計算します。料金、為替、季節による変動やキャンセル料は考慮しません。",
      ],
      faq: [
        {
          question: "日帰り旅行も計算できますか？",
          answer: "はい。宿泊数を0泊にすると、食費は1日分、宿泊費は0円として計算します。",
        },
        {
          question: "予算上限を入力しなくても使えますか？",
          answer:
            "はい。予算上限を空欄にすると、費用の合計と1人あたりの目安だけを表示します。",
        },
      ],
    },
  },
  {
    slug: "photo-print-layout",
    name: "写真印刷レイアウト",
    description: "複数の写真をA4やL判の印刷用レイアウトに配置します。",
    seoTitle: "写真印刷レイアウト｜A4・L判に複数写真を配置する無料ツール",
    seoDescription:
      "複数の写真をA4、L判、2L判の印刷用レイアウトに配置できます。写真は外部へ送信せず、ブラウザ内でSVGを作成します。",
    seoKeywords: [
      "写真 印刷 レイアウト",
      "A4 写真 並べて印刷",
      "L判 写真 配置",
      "写真 印刷 無料",
      "コンビニ写真 レイアウト",
    ],
    category: "デザイン",
    keywords: ["写真", "印刷", "A4", "L判", "レイアウト", "画像"],
    icon: "image",
    isMvp: false,
    status: "available",
    component: PhotoPrintLayout,
    details: {
      overview:
        "写真印刷レイアウトは、複数の画像をA4、L判、2L判の用紙に並べて、印刷しやすいSVGにまとめるツールです。写真の縦横比を保ったまま枠に合わせ、必要に応じて複数ページに分けます。",
      example: "旅行写真をA4用紙に4枚ずつ配置し、作成したSVGを開いて印刷します。",
      howToUse: [
        "画像ファイルを選択します。JPEG、PNG、WebPに対応しています。",
        "用紙サイズと、1ページに配置する枚数を選びます。",
        "「印刷レイアウトを作成する」を押し、プレビューを確認してダウンロードします。",
      ],
      notes: [
        "写真は中央で切り抜いて、選択した枠に合わせます。元の画像は変更しません。",
        "印刷時は、プリンターの用紙サイズと拡大縮小の設定を確認してください。",
      ],
      faq: [
        {
          question: "写真はサーバーへ送信されますか？",
          answer:
            "いいえ。写真の読み込みとレイアウト作成はブラウザ内で行い、外部へ送信しません。",
        },
        {
          question: "PDFとして保存できますか？",
          answer:
            "現在はSVGをダウンロードできます。SVGをブラウザで開き、印刷画面からPDFとして保存することもできます。",
        },
      ],
    },
  },
  {
    slug: "vlsm-subnet-planner",
    name: "VLSMサブネット設計",
    description: "必要なホスト数から、CIDRサブネットを効率よく分割します。",
    seoTitle: "VLSMサブネット設計｜必要ホスト数からCIDRを自動計算",
    seoDescription:
      "元のIPv4ネットワークと必要なホスト数を入力して、VLSM方式のサブネット分割を計算できます。入力データはブラウザ内で処理します。",
    seoKeywords: [
      "VLSM 計算",
      "サブネット設計",
      "サブネット分割",
      "CIDR 計算",
      "サブネットマスク 計算",
    ],
    category: "開発",
    keywords: ["VLSM", "サブネット", "CIDR", "IPv4", "ネットワーク", "開発ツール"],
    icon: "code",
    isMvp: false,
    status: "available",
    component: VlsmSubnetPlanner,
    details: {
      overview:
        "VLSMサブネット設計は、元のIPv4ネットワークと各サブネットに必要なホスト数から、無駄の少ないCIDR範囲を計算するツールです。必要なホスト数が多い順にサブネットを割り当てます。",
      example:
        "192.168.0.0/24に、100台、50台、20台のネットワークを作るための範囲を確認します。",
      howToUse: [
        "元のネットワークを「192.168.0.0/24」のように入力します。",
        "各サブネットで必要なホスト数を1行ずつ入力します。",
        "「サブネットを設計する」を押し、各範囲と残りのアドレス数を確認します。",
      ],
      notes: [
        "IPv4の標準的なサブネット計算に対応しています。各サブネットではネットワークアドレスとブロードキャストアドレスを予約します。",
        "VPCやクラウドサービス固有の予約アドレスは考慮していません。実際の設定ではサービスの仕様を確認してください。",
      ],
      faq: [
        {
          question: "VLSMとは何ですか？",
          answer:
            "VLSMは、必要なホスト数に合わせて異なる大きさのサブネットを割り当てる方法です。すべてを同じ大きさに分けるより、アドレスを効率よく使える場合があります。",
        },
        {
          question: "入力したネットワークに収まらない場合はどうなりますか？",
          answer:
            "すべてのサブネットを配置できない場合はエラーを表示します。元のネットワークを大きくするか、必要なホスト数を見直してください。",
        },
      ],
    },
  },
  {
    slug: "cron-debugger",
    name: "Cron式デバッガー",
    description: "Cron式を日本語で説明し、次回の実行時刻を表示します。",
    seoTitle: "Cron式デバッガー｜Cronの意味と次回実行時刻を確認",
    seoDescription:
      "5項目のCron式を解析し、日本語の実行内容と次回5回分の実行時刻を表示します。入力データは外部へ送信しません。",
    seoKeywords: [
      "Cron式 確認",
      "Cron デバッガー",
      "Cron 次回実行時刻",
      "Cron式 意味",
      "crontab 確認",
    ],
    category: "開発",
    keywords: ["Cron", "crontab", "スケジュール", "デバッグ", "開発ツール"],
    icon: "calendar",
    isMvp: false,
    status: "available",
    component: CronDebugger,
    details: {
      overview:
        "Cron式デバッガーは、分、時、日、月、曜日の5項目で構成されたCron式を解析し、実行される条件と次回の実行時刻を確認するツールです。",
      example:
        "「*/15 9-17 * * 1-5」を入力し、平日の9時から17時まで15分ごとに実行されることを確認します。",
      howToUse: [
        "Cron式を入力します。項目の順番は「分 時 日 月 曜日」です。",
        "「Cron式を解析する」を押します。",
        "日本語の説明と、端末のタイムゾーンで計算した次回の実行時刻を確認します。",
      ],
      notes: [
        "標準的な5項目のCron式に対応しています。秒を含む6項目形式や、サービス固有の拡張構文には対応していません。",
        "曜日の0と7は日曜日として扱います。日と曜日を両方指定した場合は、一般的なCronのOR条件で計算します。",
      ],
      faq: [
        {
          question: "実際のサーバー時刻で計算できますか？",
          answer:
            "端末のローカル時刻で計算します。サーバーのタイムゾーンと異なる場合は、実行環境の設定を確認してください。",
        },
        {
          question: "Cron式を生成できますか？",
          answer:
            "このツールは既存のCron式の意味と実行時刻を確認するためのものです。式を組み立てる場合は、各項目を指定してから別のツールへコピーしてください。",
        },
      ],
    },
  },
  {
    slug: "css-clamp-generator",
    name: "CSS clamp()生成",
    description: "画面幅に応じて変化するCSSのclamp()を計算します。",
    seoTitle: "CSS clamp()生成｜レスポンシブなサイズ指定を無料計算",
    seoDescription:
      "最小・最大の画面幅とサイズから、font-sizeやpaddingなどに使えるCSS clamp()を生成します。プレビューとコピーに対応しています。",
    seoKeywords: [
      "CSS clamp 生成",
      "clamp 計算",
      "レスポンシブ font-size",
      "CSS vw 計算",
      "fluid typography",
    ],
    category: "デザイン",
    keywords: ["CSS", "clamp", "レスポンシブ", "vw", "font-size", "デザイン"],
    icon: "code",
    isMvp: false,
    status: "available",
    component: CssClampGenerator,
    details: {
      overview:
        "CSS clamp()生成は、画面幅に応じて滑らかに変化するCSSの値を計算するツールです。最小値と最大値の間をvwで補間したclamp()を作成できます。",
      example:
        "スマートフォンで16px、デスクトップで24pxになる見出しのfont-sizeを計算します。",
      howToUse: [
        "CSSプロパティと値の単位を選びます。",
        "最小・最大の画面幅と、最小・最大の値を入力します。",
        "「CSSを生成する」を押し、コードをコピーします。",
      ],
      notes: [
        "入力した画面幅の範囲では、最小値から最大値まで直線的に変化する式を生成します。",
        "生成結果は計算値です。実際のレイアウトでは、親要素の幅やブラウザの設定も確認してください。",
      ],
      faq: [
        {
          question: "font-size以外にも使えますか？",
          answer:
            "はい。padding、margin、gap、line-heightなど、長さや数値を指定するプロパティにも使えます。",
        },
        {
          question: "clamp()は古いブラウザでも使えますか？",
          answer:
            "現行の主要ブラウザで利用できます。対応ブラウザを限定している場合は、対象環境のCSS対応状況も確認してください。",
        },
      ],
    },
  },
  {
    slug: "unicode-normalizer-checker",
    name: "Unicode正規化チェック",
    description: "Unicodeの正規化結果と、見た目が似た文字を確認します。",
    seoTitle: "Unicode正規化チェック｜NFC・NFD・NFKC・NFKDを比較",
    seoDescription:
      "文字列をUnicodeのNFC、NFD、NFKC、NFKDで正規化し、コードポイントの違いを比較できます。似た文字の混在もブラウザ内で確認します。",
    seoKeywords: [
      "Unicode 正規化",
      "NFC NFD 変換",
      "NFKC NFKD 比較",
      "Unicode コードポイント",
      "似た文字 チェック",
    ],
    category: "開発",
    keywords: ["Unicode", "正規化", "NFC", "NFD", "コードポイント", "文字比較"],
    icon: "text",
    isMvp: false,
    status: "available",
    component: UnicodeNormalizerChecker,
    details: {
      overview:
        "Unicode正規化チェックは、見た目が同じでも内部の文字列が異なる問題を確認するツールです。4種類の正規化形式とコードポイントを並べて比較できます。",
      example:
        "検索やファイル名の比較で一致しない文字列を入力し、NFCやNFKCで変化するか確認します。",
      howToUse: [
        "確認したい文字列を入力します。",
        "「文字の違いを確認する」を押します。",
        "NFC、NFD、NFKC、NFKDの結果とコードポイントを比較します。",
      ],
      notes: [
        "NFKCとNFKDは互換文字を置き換えるため、識別子やパスワードを変換する前に用途を確認してください。",
        "似た文字の検出は代表的なラテン文字・ギリシャ文字・キリル文字を対象にした目安です。安全性を保証するものではありません。",
      ],
      faq: [
        {
          question: "NFCとNFDの違いは何ですか？",
          answer:
            "どちらも文字を同値な形にそろえる方式ですが、NFCは可能な場合に合成し、NFDは分解した形を使います。",
        },
        {
          question: "入力した文字列は保存されますか？",
          answer:
            "いいえ。文字列の解析はブラウザ内で行い、外部へ送信したり保存したりしません。",
        },
      ],
    },
  },
];

export const toolRegistry: ToolDefinition[] = toolMetadata;

export const purposeRegistry: ToolPurpose[] = [
  {
    slug: "write-and-check",
    name: "文章や文字を整える",
    description: "文字数を数えたり、文章の違いを確認します。",
    icon: "text",
    toolSlugs: [
      "character-counter",
      "text-transformer",
      "text-diff",
      "markdown-preview",
      "unicode-normalizer-checker",
    ],
  },
  {
    slug: "calculate-daily",
    name: "数字・お金・日付を計算する",
    description: "年齢、割合、手取り、割り勘などを計算します。",
    icon: "wallet",
    toolSlugs: [
      "age-calculator",
      "percentage-calculator",
      "salary-take-home",
      "bill-splitter",
      "savings-goal-calculator",
      "nisa-tsumitate-simulator",
      "taxable-investment-simulator",
      "ideco-simulator",
      "tax-calculator",
      "date-calculator",
      "unit-converter",
      "recipe-portion-calculator",
      "sleep-time-calculator",
      "sale-price-calculator",
      "holiday-calendar",
      "business-day-calculator",
      "fuel-cost-calculator",
      "household-budget-calculator",
      "unit-price-comparator",
      "travel-budget-calculator",
    ],
  },
  {
    slug: "work-with-data",
    name: "データやコードを扱う",
    description: "JSON、URL、CSV、Cron、ネットワーク設定などを確認・整形します。",
    icon: "code",
    toolSlugs: [
      "json-formatter",
      "json-diff",
      "url-encoder-decoder",
      "base64-converter",
      "uuid-generator",
      "regex-tester",
      "csv-tsv-converter",
      "vlsm-subnet-planner",
      "cron-debugger",
    ],
  },
  {
    slug: "work-with-images",
    name: "画像や色を扱う",
    description: "画像のサイズや容量、カラーコードを調整します。",
    icon: "image",
    toolSlugs: [
      "color-converter",
      "image-compressor",
      "image-resizer",
      "photo-print-layout",
      "css-clamp-generator",
    ],
  },
  {
    slug: "use-qr-codes",
    name: "QRコードを作る・読む",
    description: "URLや文字列をQRコードに変換し、画像から読み取ります。",
    icon: "qr",
    toolSlugs: ["qr-code-generator", "qr-code-reader"],
  },
  {
    slug: "protect-strings",
    name: "パスワードやハッシュを作る",
    description: "推測されにくい文字列を作り、ハッシュ値を確認します。",
    icon: "key",
    toolSlugs: ["password-generator", "hash-generator"],
  },
];

export function getTools() {
  return toolRegistry;
}

export function getPurposeGroups() {
  return purposeRegistry.map((purpose) => ({
    ...purpose,
    tools: purpose.toolSlugs
      .map((slug) => getToolBySlug(slug))
      .filter((tool): tool is ToolDefinition => Boolean(tool)),
  }));
}

export function getToolBySlug(slug: string) {
  return toolRegistry.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string) {
  return toolRegistry.filter((tool) => tool.category === category);
}

export function getRelatedTools(tool: ToolDefinition, limit = 3) {
  return [...toolRegistry]
    .filter((candidate) => candidate.slug !== tool.slug)
    .sort((left, right) => relatedToolScore(right, tool) - relatedToolScore(left, tool))
    .slice(0, limit);
}

function relatedToolScore(candidate: ToolDefinition, tool: ToolDefinition) {
  const keywordOverlap = candidate.keywords.filter((keyword) =>
    tool.keywords.includes(keyword),
  ).length;

  return Number(candidate.category === tool.category) * 100 + keywordOverlap * 10;
}

export function getCategories() {
  return categoryRegistry;
}

export function getCategoryBySlug(slug: string) {
  return categoryRegistry.find((category) => category.slug === slug);
}

export function getCategoryByName(name: string) {
  return categoryRegistry.find((category) => category.name === name);
}
