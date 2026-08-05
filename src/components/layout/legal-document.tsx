import type { LegalSection } from "@/content/legal";

export function LegalDocument({ sections }: { sections: LegalSection[] }) {
  return (
    <article className="legal-document">
      {sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.items && (
            <ul>
              {section.items.map((item) => (
                <li key={item}>{renderLegalItem(item)}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}

function renderLegalItem(item: string) {
  const match = item.match(/^(.*?)(https?:\/\/\S+)$/u);

  if (!match) {
    return item;
  }

  return (
    <>
      {match[1]}
      <a href={match[2]} target="_blank" rel="noreferrer">
        {match[2]}
      </a>
    </>
  );
}
