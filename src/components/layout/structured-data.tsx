import type { ToolFaq } from "@/features/tools/types";
import { absoluteUrl, siteDescription, siteName } from "@/lib/seo";

type JsonLdValue = Record<string, unknown>;

type BreadcrumbItem = {
  label: string;
  href?: string;
};

function JsonLd({ data }: { data: JsonLdValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function WebsiteStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        url: absoluteUrl("/"),
        name: siteName,
        description: siteDescription,
        inLanguage: "ja-JP",
      }}
    />
  );
}

export function PageStructuredData({
  title,
  description,
  currentPath,
  breadcrumbs,
}: {
  title: string;
  description: string;
  currentPath: string;
  breadcrumbs: BreadcrumbItem[];
}) {
  const pageUrl = absoluteUrl(currentPath);
  const items = breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: absoluteUrl(item.href ?? currentPath),
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: title,
          description,
          inLanguage: "ja-JP",
          isPartOf: { "@id": `${absoluteUrl("/")}#website` },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items,
        }}
      />
    </>
  );
}

export function FaqStructuredData({ faqs }: { faqs: ToolFaq[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}
