import Link from "next/link";

export function DetailLead({ backHref, backLabel, eyebrow, title, description, meta = [] }) {
  return (
    <section className="detail-lead">
      <Link href={backHref} className="detail-back-link">
        {backLabel}
      </Link>
      <div className="detail-lead-copy">
        <p className="section-kicker">{eyebrow}</p>
        <h1 className="detail-title font-display">{title}</h1>
        {description ? <p className="detail-description">{description}</p> : null}
      </div>
      {meta.length ? (
        <ul className="detail-meta-list" aria-label="page metadata">
          {meta.map((item) => (
            <li key={item} className="detail-meta-chip">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function DetailSection({ title, children }) {
  return (
    <section className="detail-block">
      <h2 className="detail-block-title">{title}</h2>
      {children}
    </section>
  );
}
