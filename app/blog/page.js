import { ArticleCard } from "@/components/content-cards";
import { SectionIntro, SiteShell } from "@/components/site-shell";
import { getResumeData } from "@/lib/resume-data";

export default function BlogPage() {
  const { articles } = getResumeData();

  return (
    <SiteShell>
      <section className="page-section">
        <SectionIntro eyebrow="Writing" title="博客文章">
          一些杂七杂八的记录，展示，吐槽。
        </SectionIntro>
      </section>
      <section className="mx-auto grid max-w-5xl gap-5 px-5 pb-20 sm:px-8">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </section>
    </SiteShell>
  );
}
