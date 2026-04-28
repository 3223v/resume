import { SectionIntro, SiteShell } from "@/components/site-shell";
import { getResumeData } from "@/lib/resume-data";

export default function AboutPage() {
  const data = getResumeData();

  return (
    <SiteShell>
      <section className="page-section">
        <SectionIntro eyebrow="Profile" title="详细信息">
          实习/其他经历、技能和教育背景。
        </SectionIntro>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="space-y-6">
          <div className="rounded-[8px] border border-black/8 bg-white p-7">
            <h2 className="text-2xl font-semibold">{data.profile.name}</h2>
            <p className="mt-2 text-[var(--muted)]">{data.profile.role}</p>
            <div className="mt-6 space-y-3 text-sm text-[var(--muted)]">
              <p>{data.profile.location}</p>
              <p>{data.profile.email}</p>
              <p>{data.profile.phone}</p>
            </div>
          </div>
          <div className="rounded-[8px] border border-black/8 bg-white p-7">
            <h3 className="font-semibold">教育经历</h3>
            {data.education.map((item) => (
              <div key={item.school} className="mt-5">
                <p className="font-medium">{item.school}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.degree}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{item.period}</p>
              </div>
            ))}
          </div>
          <div className="space-y-10">
            <div className="space-y-5">
            {data.thing.map((tig) => (
              <article key={`${tig.name}-${tig.role}`} className="rounded-[8px] border border-black/8 bg-white p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{tig.role}</h2>
                    <p className="mt-1 text-[var(--muted)]">{tig.name}</p>
                  </div>
                  <span className="text-sm text-[var(--muted)]">{tig.time}</span>
                </div>
                <p className="mt-5 leading-7 text-[var(--muted)]">{tig.description}</p>
                <ul className="mt-5 space-y-3">
                  {tig.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)]" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
            </div>
          </div>
        </aside>
        <div className="space-y-10">
          <div className="rounded-[8px] border border-black/8 bg-white p-8">
            <h2 className="text-3xl font-semibold">详细信息</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-[var(--muted)]">
              {data.profile.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            {data.experience.map((job) => (
              <article key={`${job.company}-${job.role}`} className="rounded-[8px] border border-black/8 bg-white p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{job.role}</h2>
                    <p className="mt-1 text-[var(--muted)]">{job.company}</p>
                  </div>
                  <span className="text-sm text-[var(--muted)]">{job.period}</span>
                </div>
                <p className="mt-5 leading-7 text-[var(--muted)]">{job.description}</p>
                <ul className="mt-5 space-y-3">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)]" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
