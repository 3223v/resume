import Link from "next/link";
import { ArticleCard } from "@/components/content-cards";
import { ProjectVisual, SiteShell } from "@/components/site-shell";
import { getResumeData } from "@/lib/resume-data";

export default function Home() {
  const data = getResumeData();
  const featuredProject = data.projects[0];

  return (
    <SiteShell>
      <section className="hero-shell">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">{data.profile.role}</p>
            <h1 className="mt-6 max-w-4xl text-balance font-display text-6xl font-semibold leading-[0.92] text-[var(--ink)] sm:text-8xl">
              Calm systems for ambitious digital products.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)]">{data.profile.summary}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/portfolio" className="rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-dark)]">
                查看作品
              </Link>
              <Link href="/about" className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent)]">
                了解经历
              </Link>
            </div>
          </div>
          <div className="overview-panel">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm text-[var(--muted)]">Current focus</p>
                <h2 className="mt-2 text-3xl font-semibold">{data.profile.availability}</h2>
              </div>
              <span className="rounded-full bg-[var(--wash)] px-3 py-1 text-xs font-semibold text-[var(--accent-dark)]">2026</span>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {data.stats.map((stat) => (
                <div key={stat.label} className="rounded-[8px] border border-black/6 bg-white p-4">
                  <p className="text-3xl font-semibold">{stat.value}</p>
                  <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 overflow-hidden rounded-[8px] border border-black/8 bg-white">
              <ProjectVisual tone={featuredProject.coverTone} label="Featured project visual" />
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Featured work</p>
                <h3 className="mt-2 text-xl font-semibold">{featuredProject.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{featuredProject.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="section-kicker">Snapshot</p>
            <h2 className="mt-3 text-4xl font-semibold">能快速建立信任的关键信息。</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {data.skills.map((skill) => (
              <div key={skill.group} className="rounded-[8px] border border-black/8 bg-white p-6">
                <h3 className="font-semibold">{skill.group}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {skill.items.slice(0, 5).map((item) => (
                    <span key={item} className="rounded-full bg-[var(--wash)] px-3 py-1 text-xs text-[var(--muted)]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-3">
          {data.articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
