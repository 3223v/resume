import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectVisual, SiteShell } from "@/components/site-shell";
import { getProjectBySlug, getResumeData } from "@/lib/resume-data";

export function generateStaticParams() {
  return getResumeData().projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectDetailPage({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
        <Link href="/portfolio" className="text-sm font-semibold text-[var(--accent-dark)]">返回作品集</Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="section-kicker">{project.category} / {project.year}</p>
            <h1 className="mt-4 text-balance font-display text-6xl font-semibold leading-none sm:text-8xl">{project.title}</h1>
            <p className="mt-7 text-lg leading-8 text-[var(--muted)]">{project.description}</p>
          </div>
          <div className="overflow-hidden rounded-[8px] border border-black/8 bg-white shadow-xl shadow-black/6">
            <ProjectVisual tone={project.coverTone} label={`${project.title} visual`} />
            <div className="grid gap-5 p-7 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Role</p>
                <p className="mt-2 font-medium">{project.role}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Stack</p>
                <p className="mt-2 font-medium">{project.stack.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {project.impact.map((item) => (
            <div key={item} className="rounded-[8px] border border-black/8 bg-white p-6">
              <p className="text-sm font-semibold text-[var(--accent-dark)]">Impact</p>
              <p className="mt-3 text-2xl font-semibold leading-tight">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
