import { AgeCalculator } from "./age-calculator/AgeCalculator";
import { CharacterCounter } from "./character-counter/CharacterCounter";
import { JsonFormatter } from "./json-formatter/JsonFormatter";
import { PasswordGenerator } from "./password-generator/PasswordGenerator";
import { QrCodeGenerator } from "./qr-code-generator/QrCodeGenerator";
import { Base64Converter } from "./base64-converter/Base64Converter";
import { ColorConverter } from "./color-converter/ColorConverter";
import { CsvTsvConverter } from "./csv-tsv-converter/CsvTsvConverter";
import { HashGenerator } from "./hash-generator/HashGenerator";
import { ImageCompressor } from "./image-compressor/ImageCompressor";
import { MarkdownPreview } from "./markdown-preview/MarkdownPreview";
import { RegexTester } from "./regex-tester/RegexTester";
import { TextDiff } from "./text-diff/TextDiff";
import { UrlEncoderDecoder } from "./url-encoder-decoder/UrlEncoderDecoder";
import { UuidGenerator } from "./uuid-generator/UuidGenerator";
import { BillSplitter } from "./bill-splitter/BillSplitter";
import { DateCalculator } from "./date-calculator/DateCalculator";
import { SalaryTakeHome } from "./salary-take-home/SalaryTakeHome";
import { TaxCalculator } from "./tax-calculator/TaxCalculator";
import { UnitConverter } from "./unit-converter/UnitConverter";
import type { ToolDefinition } from "./types";

export const categoryRegistry = [
  {
    slug: "development",
    name: "開発",
    description: "コードやデータの整形・変換",
    seoHeading: "開発者向け無料ツール",
    seoTitle: "開発者向け無料ツール集｜JSON・URL・Base64変換",
    seoDescription:
      "JSON整形、URLエンコード、Base64変換、UUID生成など、開発作業に使える無料ブラウザツールをまとめています。入力データは外部へ送信しません。",
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
    seoKeywords: ["デザインツール 無料", "カラーコード変換", "画像圧縮", "HEX RGB変換"],
  },
  {
    slug: "daily",
    name: "日常生活",
    description: "暮らしの計算や換算",
    seoHeading: "暮らしの計算・換算ツール",
    seoTitle: "暮らしの計算・換算ツール｜無料オンラインツール",
    seoDescription:
      "給料の手取り、割り勘、税込・税抜、日付、単位換算など、暮らしに役立つ無料計算ツールをまとめています。",
    seoKeywords: ["生活計算ツール", "手取り計算", "割り勘計算", "単位換算"],
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
        "JavaScriptの正規表現として解釈します。正規表現は500文字以内、対象の文字列は10,000文字以内で入力してください。書き方やフラグによって結果が変わります。",
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

export function getRelatedTools(tool: ToolDefinition, limit = 3) {
  return [...toolRegistry]
    .filter((candidate) => candidate.slug !== tool.slug)
    .sort(
      (left, right) =>
        Number(right.category === tool.category) -
        Number(left.category === tool.category),
    )
    .slice(0, limit);
}

export function getCategories() {
  return categoryRegistry;
}

export function getCategoryBySlug(slug: string) {
  return categoryRegistry.find((category) => category.slug === slug);
}
