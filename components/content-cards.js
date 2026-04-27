import Link from "next/link";
import { ProjectVisual } from "./site-shell";

export function ProjectCard({ project }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block overflow-hidden rounded-[8px] border border-black/8 bg-white shadow-sm shadow-black/4 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/8">
      <ProjectVisual tone={project.coverTone} label={`${project.title} preview`} />
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold">{project.title}</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.summary}</p>
        <p className="mt-5 text-sm font-semibold text-[var(--accent-dark)]">查看详情</p>
      </div>
    </Link>
  );
}

export function ArticleCard({ article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block rounded-[8px] border border-black/8 bg-white p-6 transition hover:border-[var(--accent)] hover:shadow-xl hover:shadow-black/7">
      <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
        <span>{article.date}</span>
        <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
        <span>{article.readTime}</span>
      </div>
      <h2 className="mt-4 text-2xl font-semibold leading-tight">{article.title}</h2>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{article.excerpt}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[var(--wash)] px-3 py-1 text-xs text-[var(--accent-dark)]">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
