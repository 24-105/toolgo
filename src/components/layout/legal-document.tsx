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
                <li key={item}>
                  {item.startsWith("http") ? (
                    <a href={item} target="_blank" rel="noreferrer">
                      {item}
                    </a>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
