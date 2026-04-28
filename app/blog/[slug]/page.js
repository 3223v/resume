import { notFound } from "next/navigation";
import Link from "next/link";
import { ArticleCard } from "@/components/content-cards";
import { DetailLead, DetailSection } from "@/components/detail-shell";
import { SiteShell } from "@/components/site-shell";
import { getArticleBySlug, getResumeData } from "@/lib/resume-data";

export function generateStaticParams() {
  return getResumeData().articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticleDetailPage({ params }) {
  const data = getResumeData();
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const siblingArticles = data.articles.filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <SiteShell>
      <article className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-20">
        <DetailLead
          backHref="/blog"
          backLabel="返回博客"
          eyebrow="Writing"
          title={article.title}
          description={article.excerpt}
          meta={[article.date, article.readTime, ...article.tags]}
        />

        <div className="mt-10 rounded-[8px] border border-black/8 bg-white p-8 sm:p-10">
          <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        <DetailSection title="继续阅读">
          <div className="grid gap-5 lg:grid-cols-2">
            {siblingArticles.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
          <div className="mt-6">
            <Link href="/blog" className="text-sm font-semibold text-[var(--accent-dark)]">
              查看全部文章
            </Link>
          </div>
        </DetailSection>
      </article>
    </SiteShell>
  );
}
