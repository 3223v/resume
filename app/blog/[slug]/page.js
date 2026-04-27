import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { getArticleBySlug, getResumeData } from "@/lib/resume-data";

export function generateStaticParams() {
  return getResumeData().articles.map((article) => ({ slug: article.slug }));
}

export default function ArticleDetailPage({ params }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:py-20">
        <Link href="/blog" className="text-sm font-semibold text-[var(--accent-dark)]">返回博客</Link>
        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
            <span>{article.date}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
            <span>{article.readTime}</span>
          </div>
          <h1 className="mt-5 text-balance font-display text-6xl font-semibold leading-none sm:text-8xl">{article.title}</h1>
          <p className="mt-7 text-xl leading-8 text-[var(--muted)]">{article.excerpt}</p>
        </div>
        <div className="article-body mt-12">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </SiteShell>
  );
}
